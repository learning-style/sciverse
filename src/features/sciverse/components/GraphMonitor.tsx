import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface GraphMonitorProps {
    simStateRef: React.MutableRefObject<any>;
}

export const GraphMonitor = ({ simStateRef }: GraphMonitorProps) => {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        // Polling loop to update graph data from the Ref
        // This decouples the high-freq physics loop from the graph render loop (e.g. 10fps for graph)
        const interval = setInterval(() => {
            if (simStateRef.current?.primaryObject) {
                setData(prev => {
                    const now = simStateRef.current.timestamp;
                    const velY = simStateRef.current.primaryObject.velocity.y;
                    
                    // Keep last 100 points
                    const newData = [...prev, { time: now, v_y: velY }];
                    if (newData.length > 100) newData.shift();
                    return newData;
                });
            }
        }, 100); // Update every 100ms

        return () => clearInterval(interval);
    }, [simStateRef]);

    return (
        <div className="bg-slate-900 rounded-lg border border-slate-800 p-4 h-64 w-full flex flex-col">
            <h3 className="text-xs font-bold text-slate-500 uppercase mb-2">Real-time Telemetry: Velocity (Y)</h3>
            <div className="flex-grow">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="time" hide />
                        <YAxis stroke="#64748b" fontSize={10} domain={['auto', 'auto']} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }}
                            itemStyle={{ color: '#cbd5e1' }}
                            labelStyle={{ display: 'none' }}
                        />
                        <Line 
                            type="monotone" 
                            dataKey="v_y" 
                            stroke="#10b981" 
                            strokeWidth={2} 
                            dot={false} 
                            isAnimationActive={false} 
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
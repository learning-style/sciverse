import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SimSnapshot } from '../types';

interface GraphMonitorProps {
    latestSnapshot: SimSnapshot | null;
}

export const GraphMonitor = ({ latestSnapshot }: GraphMonitorProps) => {
    const [data, setData] = useState<{ time: string, vy: number }[]>([]);

    useEffect(() => {
        if (!latestSnapshot) return;

        const primary = latestSnapshot.entities.find(e => e.label === 'Projectile');
        if (primary) {
            setData(prev => {
                const now = (latestSnapshot.system.timeElapsed).toFixed(1);
                // Invert Y because canvas Y is down, physics Y is usually Up
                const vy = -primary.velocity.y; 
                
                // Add new point
                const newData = [...prev, { time: now, vy }];
                
                // Keep only last 50 points to prevent memory leak / graph clutter
                if (newData.length > 50) return newData.slice(newData.length - 50);
                return newData;
            });
        }
    }, [latestSnapshot]);

    return (
        <div className="bg-white rounded-xl border border-slate-200 p-4 h-64 w-full flex flex-col shadow-inner">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-bold text-slate-600 uppercase tracking-widest">Velocity-Time Graph (Y-Axis)</h3>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            
            <div className="flex-grow w-full h-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                        <XAxis 
                            dataKey="time" 
                            stroke="#475569" 
                            fontSize={10} 
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis 
                            stroke="#475569" 
                            fontSize={10} 
                            tickLine={false}
                            axisLine={false}
                            domain={['auto', 'auto']}
                        />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '12px' }}
                            itemStyle={{ color: '#10b981' }}
                            formatter={(value: number) => [value.toFixed(2) + ' m/s', 'Velocity Y']}
                            labelStyle={{ color: '#94a3b8' }}
                        />
                        <Line 
                            type="monotone" 
                            dataKey="vy" 
                            stroke="#10b981" 
                            strokeWidth={2} 
                            dot={false} 
                            activeDot={{ r: 4, fill: '#10b981' }}
                            isAnimationActive={false} 
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
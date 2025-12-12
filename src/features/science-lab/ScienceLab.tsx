import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ScienceLab = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
            {/* Custom Header for the App */}
            <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link to="/showcase" className="text-slate-400 hover:text-white transition-colors">
                            <ArrowLeft size={20} />
                        </Link>
                        <h1 className="text-xl font-bold text-emerald-400 tracking-wider">
                            INQUIRY<span className="text-white">ENGINE</span>
                        </h1>
                    </div>
                    <div className="text-xs font-mono text-slate-500">
                        V1.0.0 // STATUS: INITIALIZING
                    </div>
                </div>
            </header>

            {/* Main Workspace Area */}
            <main className="flex-grow flex items-center justify-center p-8">
                <div className="max-w-2xl w-full text-center space-y-8">
                    <div className="inline-block p-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
                        <div className="w-16 h-16 rounded-full bg-emerald-500/20 animate-pulse flex items-center justify-center">
                            <div className="w-8 h-8 rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.5)]"></div>
                        </div>
                    </div>
                    
                    <h2 className="text-3xl font-bold">Lab Environment Loading...</h2>
                    
                    <p className="text-slate-400 text-lg">
                        You have entered the "Inquiry Engine" prototype. 
                        This environment will facilitate directional thinking through Socratic dialogue and interactive experimentation.
                    </p>

                    <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 text-left max-w-md mx-auto">
                        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-4">Current Module</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500">Subject:</span>
                                <span className="text-emerald-400 font-mono">Cell Biology</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500">Mode:</span>
                                <span className="text-blue-400 font-mono">Socratic Diagnostic</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500">Status:</span>
                                <span className="text-orange-400 font-mono">Design Phase</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
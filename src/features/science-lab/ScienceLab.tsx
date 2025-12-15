import { ArrowLeft, Beaker, MessageSquare, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ScienceLab = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-mono">
            {/* Sciverse Header */}
            <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur z-10">
                <div className="max-w-screen-2xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link to="/showcase" className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-full">
                            <ArrowLeft size={20} />
                        </Link>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                <span className="font-bold text-white">S</span>
                            </div>
                            <span className="text-xl font-bold tracking-tight">
                                SCI<span className="text-purple-400">VERSE</span>
                            </span>
                        </div>
                        <div className="h-6 w-px bg-slate-700 mx-2"></div>
                        <span className="text-sm text-slate-400">Physics Module 01: Forces & Motion</span>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-slate-900 rounded-full border border-slate-800 text-xs">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span>SYSTEM ONLINE</span>
                        </div>
                        <button className="text-slate-400 hover:text-white transition-colors">
                            <Settings size={20} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Split Screen Layout */}
            <main className="flex-grow flex flex-col lg:flex-row overflow-hidden">
                
                {/* Left Panel: Simulation Viewport */}
                <div className="flex-grow lg:w-2/3 bg-slate-900 relative border-r border-slate-800 p-8 flex flex-col items-center justify-center">
                    {/* Placeholder for Canvas */}
                    <div className="w-full max-w-3xl aspect-video bg-slate-950 rounded-xl border border-slate-800 shadow-2xl relative overflow-hidden group">
                        
                        {/* Grid Background */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>

                        {/* Simulation Object Placeholder */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <div className="w-32 h-32 bg-indigo-600 rounded flex items-center justify-center shadow-[0_0_30px_rgba(79,70,229,0.3)] border border-indigo-400">
                                <span className="text-indigo-100 font-bold">10kg</span>
                            </div>
                            {/* Force Vector Arrow Placeholder */}
                            <div className="absolute top-1/2 left-full w-24 h-1 bg-emerald-500 origin-left transform -translate-y-1/2 flex items-center">
                                <span className="absolute -top-6 left-1/2 text-emerald-400 text-xs font-bold">F = 0N</span>
                                <div className="absolute right-0 w-3 h-3 border-t-2 border-r-2 border-emerald-500 transform rotate-45"></div>
                            </div>
                        </div>

                        {/* UI Overlay */}
                        <div className="absolute top-4 left-4 flex gap-2">
                             <span className="px-2 py-1 bg-slate-900/80 rounded border border-slate-700 text-xs text-slate-300">v: 0.0 m/s</span>
                             <span className="px-2 py-1 bg-slate-900/80 rounded border border-slate-700 text-xs text-slate-300">a: 0.0 m/s²</span>
                        </div>
                    </div>

                    <div className="mt-8 flex gap-4 w-full max-w-3xl">
                        <div className="flex-1 bg-slate-950 p-4 rounded-lg border border-slate-800 opacity-50 cursor-not-allowed">
                            <label className="text-xs text-slate-500 uppercase font-bold mb-2 block">Applied Force</label>
                            <input type="range" className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer" disabled />
                        </div>
                        <div className="flex-1 bg-slate-950 p-4 rounded-lg border border-slate-800 opacity-50 cursor-not-allowed">
                            <label className="text-xs text-slate-500 uppercase font-bold mb-2 block">Friction Coefficient</label>
                            <input type="range" className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer" disabled />
                        </div>
                    </div>
                </div>

                {/* Right Panel: Socratic Dialog Terminal */}
                <div className="lg:w-1/3 bg-slate-950 flex flex-col h-[50vh] lg:h-auto border-t lg:border-t-0 border-slate-800">
                    <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/30">
                        <div className="flex items-center gap-2 text-indigo-400">
                            <MessageSquare size={18} />
                            <span className="font-bold text-sm">MENTOR LINK</span>
                        </div>
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    </div>

                    {/* Chat History */}
                    <div className="flex-grow p-6 overflow-y-auto space-y-6">
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/50 flex-shrink-0 flex items-center justify-center text-indigo-300 font-bold text-xs">
                                AI
                            </div>
                            <div className="bg-slate-900 p-4 rounded-tr-xl rounded-br-xl rounded-bl-xl border border-slate-800 text-slate-300 text-sm leading-relaxed">
                                <p>Welcome to the lab. We have a standard 10kg shipping crate sitting here on the floor. It's perfectly still.</p>
                                <p className="mt-2 text-indigo-300 font-semibold">Why isn't it moving?</p>
                            </div>
                        </div>

                        <div className="flex gap-4 flex-row-reverse">
                            <div className="w-8 h-8 rounded-full bg-slate-700 flex-shrink-0 flex items-center justify-center text-white font-bold text-xs">
                                ME
                            </div>
                            <div className="bg-indigo-600/10 p-4 rounded-tl-xl rounded-bl-xl rounded-br-xl border border-indigo-500/30 text-indigo-100 text-sm">
                                <p>Because no unbalanced forces are acting on it?</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/50 flex-shrink-0 flex items-center justify-center text-indigo-300 font-bold text-xs">
                                AI
                            </div>
                            <div className="bg-slate-900 p-4 rounded-tr-xl rounded-br-xl rounded-bl-xl border border-slate-800 text-slate-300 text-sm leading-relaxed">
                                <p>Exactly. The forces are balanced. <br/><br/>Now, I want you to give it a shove. Use the controls to apply <strong>50 Newtons</strong> of force.</p>
                            </div>
                        </div>
                    </div>

                    {/* Interaction Area */}
                    <div className="p-4 border-t border-slate-800 bg-slate-900/20">
                         <div className="grid grid-cols-1 gap-2">
                             <button className="p-3 rounded bg-slate-800 border border-slate-700 hover:bg-slate-700 hover:border-indigo-500 hover:text-indigo-300 text-slate-400 text-sm text-left transition-all flex items-center justify-between group">
                                 <span>1. Okay, applying force now.</span>
                                 <ArrowLeft className="opacity-0 group-hover:opacity-100 rotate-180 transition-opacity" size={16} />
                             </button>
                             <button className="p-3 rounded bg-slate-800 border border-slate-700 hover:bg-slate-700 hover:border-indigo-500 hover:text-indigo-300 text-slate-400 text-sm text-left transition-all flex items-center justify-between group">
                                 <span>2. What if I apply 100N instead?</span>
                                 <ArrowLeft className="opacity-0 group-hover:opacity-100 rotate-180 transition-opacity" size={16} />
                             </button>
                         </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
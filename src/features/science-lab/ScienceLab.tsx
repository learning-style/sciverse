import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, FlaskConical } from 'lucide-react';
import { SciverseProvider } from '../sciverse/context/SciverseContext';
import { KinematicsLab } from '../sciverse/labs/KinematicsLab';
import { KinematicsLesson } from '../sciverse/modules/KinematicsLesson';

export const ScienceLab = () => {
    const [mode, setMode] = useState<'lesson' | 'lab'>('lesson');

    return (
        <div className="min-h-screen bg-white text-slate-900 flex flex-col font-mono">
            {/* Global Nav & Mode Switcher */}
            <div className="h-16 border-b border-slate-200 bg-white/90 backdrop-blur z-20 flex items-center justify-between px-4">
                <div className="flex items-center gap-4">
                    <Link to="/showcase" className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <div className="hidden md:block">
                        <span className="font-bold text-lg tracking-tight">SCI<span className="text-indigo-500">VERSE</span></span>
                    </div>
                </div>

                {/* Mode Toggles */}
                <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
                    <button 
                        onClick={() => setMode('lesson')}
                        className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                            mode === 'lesson' 
                                ? 'bg-indigo-600 text-white shadow-lg' 
                                : 'text-slate-600 hover:text-slate-900'
                        }`}
                    >
                        <BookOpen size={14} /> Lesson
                    </button>
                    <button 
                        onClick={() => setMode('lab')}
                        className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                            mode === 'lab' 
                                ? 'bg-emerald-700 text-white shadow-lg' 
                                : 'text-slate-600 hover:text-slate-900'
                        }`}
                    >
                        <FlaskConical size={14} /> Lab
                    </button>
                </div>

                <div className="w-8"></div> {/* Spacer for balance */}
            </div>

            {/* Main Content Area */}
            <div className="flex-grow relative overflow-hidden">
                <SciverseProvider>
                    {mode === 'lesson' ? <KinematicsLesson /> : <KinematicsLab />}
                </SciverseProvider>
            </div>
        </div>
    );
};
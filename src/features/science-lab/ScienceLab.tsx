import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { KinematicsLab } from '@/features/sciverse/labs/KinematicsLab';

export const ScienceLab = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
            {/* Global Nav Back Link (Optional, could be part of layout) */}
            <div className="absolute top-4 left-4 z-50 lg:hidden">
                <Link to="/showcase" className="p-2 bg-slate-900 rounded-full border border-slate-800 text-slate-400">
                    <ArrowLeft size={20} />
                </Link>
            </div>

            <KinematicsLab />
        </div>
    );
};
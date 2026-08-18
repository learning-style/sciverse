import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const HomePage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                Citizen Architect
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mb-10">
                Building digital experiences with the precision of an architect and the heart of a maker.
            </p>
            <div className="flex gap-4">
                <Link 
                    to="/showcase" 
                    className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors"
                >
                    View Projects <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link 
                    to="/about" 
                    className="inline-flex items-center px-6 py-3 rounded-lg border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 font-medium transition-colors"
                >
                    About Me
                </Link>
            </div>
        </div>
    );
};
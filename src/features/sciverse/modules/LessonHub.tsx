import { Link } from 'react-router-dom';
import { ArrowLeft, Atom, Beaker, Dna } from 'lucide-react';
import { LESSON_REGISTRY } from '../content/lessons';
import { Discipline } from '../types';

const DISCIPLINE_BADGE: Record<Discipline, { icon: typeof Atom; label: string; bg: string; text: string }> = {
    physics: { icon: Atom, label: 'Physics', bg: 'bg-indigo-50 border-indigo-200', text: 'text-indigo-700' },
    chemistry: { icon: Beaker, label: 'Chemistry', bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-700' },
    biology: { icon: Dna, label: 'Biology', bg: 'bg-rose-50 border-rose-200', text: 'text-rose-700' },
};

const BIG_IDEA_COLORS = [
    'from-indigo-600/20 to-indigo-900/10',
    'from-cyan-600/20 to-cyan-900/10',
    'from-amber-600/20 to-amber-900/10',
    'from-purple-600/20 to-purple-900/10',
    'from-teal-600/20 to-teal-900/10',
    'from-sky-600/20 to-sky-900/10',
    'from-yellow-600/20 to-yellow-900/10',
    'from-pink-600/20 to-pink-900/10',
    'from-lime-600/20 to-lime-900/10',
    'from-orange-600/20 to-orange-900/10',
    'from-red-600/20 to-red-900/10',
    'from-violet-600/20 to-violet-900/10',
    'from-emerald-600/20 to-emerald-900/10',
    'from-blue-600/20 to-blue-900/10',
    'from-fuchsia-600/20 to-fuchsia-900/10',
    'from-cyan-700/20 to-cyan-900/10',
    'from-stone-600/20 to-stone-900/10',
    'from-sky-700/20 to-sky-900/10',
    'from-amber-700/20 to-amber-900/10',
    'from-violet-700/20 to-violet-900/10',
    'from-emerald-700/20 to-emerald-900/10',
    'from-blue-700/20 to-blue-900/10',
    'from-rose-700/20 to-rose-900/10',
    'from-lime-700/20 to-lime-900/10',
    'from-orange-700/20 to-orange-900/10',
    'from-indigo-700/20 to-indigo-900/10',
    'from-teal-700/20 to-teal-900/10',
    'from-pink-700/20 to-pink-900/10',
    'from-yellow-700/20 to-yellow-900/10',
    'from-purple-700/20 to-purple-900/10',
    'from-cyan-600/20 to-cyan-800/10',
    'from-red-700/20 to-red-900/10',
    'from-lime-600/20 to-lime-800/10',
    'from-amber-600/20 to-amber-800/10',
    'from-teal-600/20 to-teal-800/10',
    'from-sky-600/20 to-sky-800/10',
    'from-violet-600/20 to-violet-800/10',
    'from-fuchsia-600/20 to-fuchsia-800/10',
    'from-slate-600/20 to-slate-800/10',
    'from-emerald-600/20 to-emerald-800/10',
    'from-purple-600/20 to-purple-800/10',
];

export const LessonHub = () => {
    const bigIdeas = Array.from({ length: 41 }, (_, i) => i + 1);

    return (
        <div className="min-h-screen bg-white text-slate-900 font-mono">
            {/* Header */}
            <div className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-20 flex items-center justify-between px-6">
                <div className="flex items-center gap-4">
                    <Link to="/showcase" className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <span className="font-bold text-lg tracking-tight">SCI<span className="text-indigo-600">VERSE</span></span>
                </div>
                <span className="text-xs text-slate-600 tracking-widest uppercase">123 Interactive Lessons</span>
            </div>

            {/* Hero */}
            <div className="px-6 py-10 text-center border-b border-slate-200">
                <h1 className="text-3xl md:text-4xl font-bold mb-3">
                    Explore Science Across <span className="text-indigo-600">Disciplines</span>
                </h1>
                <p className="text-slate-600 text-sm max-w-xl mx-auto">
                    41 Big Ideas. 3 Disciplines. 123 Lessons connecting Physics, Chemistry, and Biology.
                </p>
                <div className="flex justify-center gap-6 mt-6">
                    {Object.entries(DISCIPLINE_BADGE).map(([key, d]) => {
                        const Icon = d.icon;
                        return (
                            <span key={key} className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium ${d.bg} ${d.text}`}>
                                <Icon size={14} /> {d.label}
                            </span>
                        );
                    })}
                </div>
            </div>

            {/* Big Ideas */}
            <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
                {bigIdeas.map(bigIdeaNum => {
                    const lessons = LESSON_REGISTRY.filter(l => l.bigIdea === bigIdeaNum);
                    const title = lessons[0]?.bigIdeaTitle || '';

                    return (
                        <section key={bigIdeaNum} className={`rounded-xl border border-slate-200 bg-gradient-to-br ${BIG_IDEA_COLORS[bigIdeaNum - 1]} overflow-hidden`}>
                            {/* Big Idea Header */}
                            <div className="px-6 py-4 border-b border-slate-200">
                                <div className="flex items-baseline gap-3">
                                    <span className="text-xs font-bold tracking-widest text-slate-600 uppercase">Big Idea {bigIdeaNum}</span>
                                    <h2 className="text-lg font-bold text-slate-900">{title}</h2>
                                </div>
                            </div>

                            {/* Lesson Cards Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                                {lessons.map(lesson => {
                                    const badge = DISCIPLINE_BADGE[lesson.discipline];
                                    const BadgeIcon = badge.icon;

                                    return (
                                        <Link
                                            key={lesson.id}
                                            to={`/projects/science-lab/lesson/${lesson.id}`}
                                            className="group block p-4 rounded-lg bg-white/80 border border-slate-200 hover:border-slate-400 hover:bg-white hover:shadow-md transition-all"
                                        >
                                            <div className="flex items-start gap-3">
                                                <span className="text-3xl">{lesson.icon}</span>
                                                <div className="flex-grow min-w-0">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${badge.bg} ${badge.text}`}>
                                                            <BadgeIcon size={10} /> {lesson.id.toUpperCase()}
                                                        </span>
                                                    </div>
                                                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">{lesson.title}</h3>
                                                    <p className="text-xs text-slate-600 mt-1">{lesson.subtitle}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>

                            {/* Assessment Link */}
                            <div className="px-4 pb-4">
                                <Link
                                    to={`/projects/science-lab/assessment/${bigIdeaNum}`}
                                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100 transition-colors text-sm font-bold"
                                >
                                    📝 Take Big Idea {bigIdeaNum} Assessment
                                </Link>
                            </div>
                        </section>
                    );
                })}
            </div>
        </div>
    );
};


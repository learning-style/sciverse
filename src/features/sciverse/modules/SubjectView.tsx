import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Atom, Beaker, Dna } from 'lucide-react';
import { LESSON_REGISTRY } from '../content/lessons';
import { LessonList } from '../components/LessonList';
import { ALL_TAGS } from '../content/tags';
import { Discipline } from '../types';

/**
 * One subject, every lesson. The blurb states the role the subject plays in a
 * Big Idea, which is the reason the three exist in a fixed order.
 */
const SUBJECTS: Record<Discipline, { icon: typeof Atom; label: string; blurb: string; accent: string; ring: string }> = {
    physics: {
        icon: Atom,
        label: 'Physics',
        blurb: 'The mechanism: what makes the thing happen at all.',
        accent: 'text-indigo-600',
        ring: 'bg-indigo-50 border-indigo-200 text-indigo-700',
    },
    chemistry: {
        icon: Beaker,
        label: 'Chemistry',
        blurb: 'The materials: what it is made of, and why that decides how it behaves.',
        accent: 'text-emerald-600',
        ring: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    },
    biology: {
        icon: Dna,
        label: 'Biology',
        blurb: 'Living systems, where the mechanism and the materials meet. Each Big Idea closes here.',
        accent: 'text-rose-600',
        ring: 'bg-rose-50 border-rose-200 text-rose-700',
    },
};

const isDiscipline = (value: string | undefined): value is Discipline =>
    !!value && Object.prototype.hasOwnProperty.call(SUBJECTS, value);

const SubjectLinks = ({ except }: { except?: Discipline }) => (
    <div className="flex flex-wrap justify-center gap-3">
        {(Object.keys(SUBJECTS) as Discipline[])
            .filter(d => d !== except)
            .map(d => {
                const Icon = SUBJECTS[d].icon;
                return (
                    <Link
                        key={d}
                        to={`/projects/science-lab/subject/${d}`}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium hover:brightness-95 transition-all ${SUBJECTS[d].ring}`}
                    >
                        <Icon size={14} /> {SUBJECTS[d].label}
                    </Link>
                );
            })}
    </div>
);

export const SubjectView = () => {
    const { discipline } = useParams<{ discipline: string }>();
    const active: Discipline | null = isDiscipline(discipline) ? discipline : null;

    const lessons = useMemo(
        () => (active ? LESSON_REGISTRY.filter(l => l.discipline === active) : []),
        [active]
    );
    const bigIdeaCount = useMemo(() => new Set(lessons.map(l => l.bigIdea)).size, [lessons]);

    return (
        <div className="min-h-screen bg-white text-slate-900 font-mono">
            <div className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-20 flex items-center justify-between px-6">
                <Link to="/projects/science-lab" className="font-bold text-lg tracking-tight">
                    SCI<span className="text-indigo-600">VERSE</span>
                </Link>
                <Link to="/projects/science-lab" className="text-xs text-slate-600 hover:text-slate-900">
                    ← All Big Ideas
                </Link>
            </div>

            {!active ? (
                <div className="px-6 py-16 text-center">
                    <h1 className="text-2xl font-bold mb-3">No such subject</h1>
                    <p className="text-slate-600 text-sm mb-8">Pick one of these instead.</p>
                    <SubjectLinks />
                </div>
            ) : (
                <>
                    <div className="px-6 py-10 text-center border-b border-slate-200">
                        <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">Subject</span>
                        <h1 className={`text-3xl md:text-4xl font-bold mt-2 mb-3 ${SUBJECTS[active].accent}`}>
                            {SUBJECTS[active].label}
                        </h1>
                        <p className="text-slate-700 text-sm max-w-xl mx-auto">{SUBJECTS[active].blurb}</p>
                        <p className="text-slate-500 text-xs max-w-xl mx-auto mt-3">
                            {lessons.length} lesson{lessons.length === 1 ? '' : 's'} across {bigIdeaCount} Big Idea
                            {bigIdeaCount === 1 ? '' : 's'}, at every level that has been built.
                        </p>
                    </div>

                    <LessonList lessons={lessons} />

                    <div className="max-w-5xl mx-auto px-4 pb-12 space-y-6">
                        <div>
                            <p className="text-center text-xs text-slate-500 mb-3">The other subjects</p>
                            <SubjectLinks except={active} />
                        </div>
                        <div>
                            <p className="text-center text-xs text-slate-500 mb-3">Or cut across all three</p>
                            <div className="flex flex-wrap justify-center gap-2">
                                {ALL_TAGS.map(t => (
                                    <Link
                                        key={t}
                                        to={`/projects/science-lab/tag/${t}`}
                                        className="px-2.5 py-1 rounded-full border border-slate-200 bg-white text-slate-600 text-xs hover:border-slate-400 hover:text-slate-900 transition-colors"
                                    >
                                        #{t}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

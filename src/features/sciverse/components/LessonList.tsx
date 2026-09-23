import { Link } from 'react-router-dom';
import { Discipline, LessonMeta } from '../types';
import { BIG_IDEA_TAGS, Tag } from '../content/tags';

/** Subject chip. Mirrors the hub's palette; the word is always shown, never
 *  left to colour alone. */
const SUBJECT: Record<Discipline, { label: string; chip: string }> = {
    physics: { label: 'Physics', chip: 'bg-indigo-50 border-indigo-200 text-indigo-700' },
    chemistry: { label: 'Chemistry', chip: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
    biology: { label: 'Biology', chip: 'bg-rose-50 border-rose-200 text-rose-700' },
};

const LEVEL_LABEL: Record<1 | 2 | 3, string> = { 1: 'L1', 2: 'L2', 3: 'L3' };

interface LessonListProps {
    lessons: LessonMeta[];
    /** The page's own thread, left out of each Big Idea's chip row. */
    exceptTag?: Tag;
}

/**
 * Lessons grouped by Big Idea, used by both the thread pages and the subject
 * pages so the two read identically.
 */
export const LessonList = ({ lessons, exceptTag }: LessonListProps) => {
    const bigIdeas = Array.from(new Set(lessons.map(l => l.bigIdea))).sort((a, b) => a - b);

    return (
        <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
            {bigIdeas.map(num => {
                const here = lessons.filter(l => l.bigIdea === num);
                const title = here[0]?.bigIdeaTitle ?? '';
                const threads = (BIG_IDEA_TAGS[num] ?? []).filter(t => t !== exceptTag);

                return (
                    <section key={num} className="rounded-xl border border-slate-200 overflow-hidden">
                        <div className="px-5 py-3 border-b border-slate-200 bg-slate-50 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                            <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">
                                Big Idea {num}
                            </span>
                            <h2 className="text-base font-bold text-slate-900">{title}</h2>
                            {threads.length > 0 && (
                                <span className="flex flex-wrap gap-2 ml-auto">
                                    {threads.map(t => (
                                        <Link
                                            key={t}
                                            to={`/projects/science-lab/tag/${t}`}
                                            className="text-[11px] text-slate-500 hover:text-indigo-700 hover:underline"
                                        >
                                            #{t}
                                        </Link>
                                    ))}
                                </span>
                            )}
                        </div>

                        <div className="divide-y divide-slate-100">
                            {here.map(lesson => {
                                const subject = SUBJECT[lesson.discipline];
                                return (
                                    <Link
                                        key={lesson.id}
                                        to={`/projects/science-lab/lesson/${lesson.id}`}
                                        className="group flex items-start gap-3 px-5 py-3 hover:bg-slate-50 transition-colors"
                                    >
                                        <span className="text-2xl">{lesson.icon}</span>
                                        <span className="flex-grow min-w-0">
                                            <span className="flex flex-wrap items-center gap-2 mb-0.5">
                                                <span className={`px-2 py-0.5 rounded border text-[10px] font-bold uppercase tracking-wider ${subject.chip}`}>
                                                    {subject.label}
                                                </span>
                                                <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-bold">
                                                    {LEVEL_LABEL[lesson.level ?? 1]} · {lesson.id.toUpperCase()}
                                                </span>
                                            </span>
                                            <span className="block text-sm font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                                                {lesson.title}
                                            </span>
                                            <span className="block text-xs text-slate-600">{lesson.subtitle}</span>
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                    </section>
                );
            })}
        </div>
    );
};

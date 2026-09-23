import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { LESSON_REGISTRY } from '../content/lessons';
import { Discipline } from '../types';
import { ALL_TAGS, BIG_IDEA_TAGS, TAG_BLURBS, TAG_LABELS, Tag, bigIdeasWithTag, tagsFor } from '../content/tags';

/** Mirrors the hub's badge palette. Kept local so the two surfaces can diverge. */
const SUBJECT: Record<Discipline, { label: string; chip: string }> = {
    physics: { label: 'Physics', chip: 'bg-indigo-50 border-indigo-200 text-indigo-700' },
    chemistry: { label: 'Chemistry', chip: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
    biology: { label: 'Biology', chip: 'bg-rose-50 border-rose-200 text-rose-700' },
};

const LEVEL_LABEL: Record<1 | 2 | 3, string> = { 1: 'L1', 2: 'L2', 3: 'L3' };

const isTag = (value: string | undefined): value is Tag =>
    !!value && (ALL_TAGS as string[]).includes(value);

const ThreadLinks = ({ except }: { except?: Tag }) => (
    <div className="flex flex-wrap justify-center gap-2">
        {ALL_TAGS.filter(t => t !== except).map(t => (
            <Link
                key={t}
                to={`/projects/science-lab/tag/${t}`}
                className="px-2.5 py-1 rounded-full border border-slate-200 bg-white text-slate-600 text-xs hover:border-slate-400 hover:text-slate-900 transition-colors"
            >
                #{t}
            </Link>
        ))}
    </div>
);

export const TagView = () => {
    const { tag } = useParams<{ tag: string }>();
    // Narrowed to a const union, so the guards inside the closures below hold
    const active: Tag | null = isTag(tag) ? tag : null;

    const bigIdeas = useMemo(() => (active ? bigIdeasWithTag(active) : []), [active]);
    const lessons = useMemo(
        () => (active ? LESSON_REGISTRY.filter(l => tagsFor(l).includes(active)) : []),
        [active]
    );

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
                    <h1 className="text-2xl font-bold mb-3">No such thread</h1>
                    <p className="text-slate-600 text-sm mb-8">Pick one of these instead.</p>
                    <ThreadLinks />
                </div>
            ) : (
                <>
                    <div className="px-6 py-10 text-center border-b border-slate-200">
                        <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">Thread</span>
                        <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-3">
                            #<span className="text-indigo-600">{active}</span>
                        </h1>
                        <p className="text-slate-700 text-sm max-w-xl mx-auto">{TAG_BLURBS[active]}</p>
                        <p className="text-slate-500 text-xs max-w-xl mx-auto mt-3">
                            {TAG_LABELS[active]} runs through {bigIdeas.length} Big Idea{bigIdeas.length === 1 ? '' : 's'} and{' '}
                            {lessons.length} lesson{lessons.length === 1 ? '' : 's'}, across all three subjects.
                        </p>
                    </div>

                    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
                        {bigIdeas.map(num => {
                            const here = lessons.filter(l => l.bigIdea === num);
                            const title = here[0]?.bigIdeaTitle ?? '';
                            const others = (BIG_IDEA_TAGS[num] ?? []).filter(t => t !== active);

                            return (
                                <section key={num} className="rounded-xl border border-slate-200 overflow-hidden">
                                    <div className="px-5 py-3 border-b border-slate-200 bg-slate-50 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                                        <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">
                                            Big Idea {num}
                                        </span>
                                        <h2 className="text-base font-bold text-slate-900">{title}</h2>
                                        {others.length > 0 && (
                                            <span className="flex gap-2 ml-auto">
                                                {others.map(t => (
                                                    <Link
                                                        key={t}
                                                        to={`/projects/science-lab/tag/${t}`}
                                                        className="text-[11px] text-slate-500 hover:text-indigo-700"
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
                                                                {LEVEL_LABEL[lesson.level ?? 1]}
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

                    <div className="max-w-5xl mx-auto px-4 pb-12">
                        <p className="text-center text-xs text-slate-500 mb-3">Other threads</p>
                        <ThreadLinks except={active} />
                    </div>
                </>
            )}
        </div>
    );
};

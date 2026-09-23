import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { LESSON_REGISTRY } from '../content/lessons';
import { LessonList } from '../components/LessonList';
import { ALL_TAGS, TAG_BLURBS, TAG_LABELS, Tag, bigIdeasWithTag, tagsFor } from '../content/tags';

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

                    <LessonList lessons={lessons} exceptTag={active} />

                    <div className="max-w-5xl mx-auto px-4 pb-12">
                        <p className="text-center text-xs text-slate-500 mb-3">Other threads</p>
                        <ThreadLinks except={active} />
                    </div>
                </>
            )}
        </div>
    );
};

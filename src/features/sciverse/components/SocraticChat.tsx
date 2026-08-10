import { useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { DialogNode, DialogOption, LessonMeta } from '../types';
import { User, Cpu, ArrowRight, ArrowLeft, RotateCcw } from 'lucide-react';

interface SocraticChatProps {
    currentNode: DialogNode;
    history: DialogNode[];
    onOptionSelect: (option: DialogOption) => void;
    onRewindTo?: (historyIndex: number) => void;
    nextLesson?: LessonMeta;
    prevLesson?: LessonMeta;
}

export const SocraticChat = ({ currentNode, history, onOptionSelect, onRewindTo, nextLesson, prevLesson }: SocraticChatProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history, currentNode]);

    return (
        <div className="flex flex-col h-full bg-slate-950 border-t border-slate-800 lg:border-t-0 lg:border-l">
            {/* Header */}
            <div className="p-4 border-b border-slate-800 flex items-center gap-2 bg-slate-900/50 backdrop-blur-sm">
                <Cpu size={18} className="text-indigo-400" />
                <span className="font-bold text-sm text-slate-200 tracking-wide">MENTOR LINK</span>
                <span className="ml-auto w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            </div>

            {/* Message Stream */}
            <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-6">
                {/* History — clickable to rewind */}
                {history.map((node, i) => (
                    <div key={i} className="relative group">
                        <ChatMessage node={node} isHistory />
                        {onRewindTo && node.speaker === 'AI' && node.options && node.options.length > 0 && (
                            <button
                                onClick={() => onRewindTo(i)}
                                className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full bg-slate-800 border border-slate-600 hover:border-indigo-500 hover:bg-slate-700 text-slate-400 hover:text-indigo-300"
                                title="Go back to this point"
                            >
                                <RotateCcw size={12} />
                            </button>
                        )}
                    </div>
                ))}
                
                {/* Current Node */}
                <ChatMessage node={currentNode} />
            </div>

            {/* Input Area (Options) */}
            <div className="p-4 bg-slate-900 border-t border-slate-800">
                <div className="grid grid-cols-1 gap-2">
                    {currentNode.options?.map((opt) => (
                        <button
                            key={opt.id}
                            onClick={() => onOptionSelect(opt)}
                            className="w-full text-left px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700 hover:border-indigo-500 hover:text-indigo-200 transition-all text-sm text-slate-300 group"
                        >
                            <span className="font-mono text-indigo-500 mr-2 opacity-50 group-hover:opacity-100">{`>`}</span>
                            {opt.label}
                        </button>
                    ))}
                    {(!currentNode.options || currentNode.options.length === 0) && (
                        <div className="space-y-3">
                            <div className="text-center text-slate-500 text-xs italic">
                                [End of Lesson Module]
                            </div>
                            <div className="flex gap-2">
                                {prevLesson && (
                                    <Link
                                        to={`/projects/science-lab/lesson/${prevLesson.id}`}
                                        className="flex items-center justify-center gap-2 flex-1 py-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:border-slate-500 transition-colors text-sm font-bold"
                                    >
                                        <ArrowLeft size={16} /> {prevLesson.icon} Prev
                                    </Link>
                                )}
                                {nextLesson && (
                                    <Link
                                        to={`/projects/science-lab/lesson/${nextLesson.id}`}
                                        className="flex items-center justify-center gap-2 flex-1 py-3 rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-600/30 transition-colors text-sm font-bold"
                                    >
                                        Next: {nextLesson.icon} {nextLesson.title} <ArrowRight size={16} />
                                    </Link>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

/** Lightweight renderer: markdown tables → styled <table>, **bold** → <strong>, rest → whitespace-pre-wrap spans */
function renderContent(content: string): React.ReactNode {
    const lines = content.split('\n');
    const blocks: React.ReactNode[] = [];
    let textBuf: string[] = [];
    let blockKey = 0;

    const flushText = () => {
        if (textBuf.length === 0) return;
        blocks.push(
            <span key={blockKey++} className="whitespace-pre-wrap">
                {inlineBold(textBuf.join('\n'))}
            </span>,
        );
        textBuf = [];
    };

    const inlineBold = (text: string): React.ReactNode[] => {
        const parts = text.split(/(\*\*[^*]+\*\*)/g);
        return parts.map((p, i) =>
            p.startsWith('**') && p.endsWith('**')
                ? <strong key={i} className="font-semibold text-slate-100">{p.slice(2, -2)}</strong>
                : <span key={i}>{p}</span>,
        );
    };

    let i = 0;
    while (i < lines.length) {
        if (lines[i].trim().startsWith('|')) {
            flushText();
            // Collect all consecutive table lines
            const tableLines: string[] = [];
            while (i < lines.length && lines[i].trim().startsWith('|')) {
                tableLines.push(lines[i].trim());
                i++;
            }
            // Parse: first row = headers, skip separator row (---), rest = data
            const parseRow = (row: string) =>
                row.split('|').slice(1, -1).map((c) => c.trim());
            const headers = parseRow(tableLines[0]);
            const dataStart = tableLines[1]?.match(/^[\s|:-]+$/) ? 2 : 1;
            const rows = tableLines.slice(dataStart).map(parseRow);

            blocks.push(
                <div key={blockKey++} className="overflow-x-auto my-2 rounded-lg border border-slate-700">
                    <table className="w-full text-xs">
                        <thead>
                            <tr className="bg-slate-800/80">
                                {headers.map((h, hi) => (
                                    <th key={hi} className="px-2 py-1.5 text-left font-semibold text-indigo-300 border-b border-slate-700">
                                        {inlineBold(h)}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, ri) => (
                                <tr key={ri} className={ri % 2 === 0 ? 'bg-slate-900/50' : 'bg-slate-800/30'}>
                                    {row.map((cell, ci) => (
                                        <td key={ci} className="px-2 py-1.5 border-b border-slate-800/50 text-slate-300">
                                            {inlineBold(cell)}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>,
            );
        } else {
            textBuf.push(lines[i]);
            i++;
        }
    }
    flushText();
    return <>{blocks}</>;
}

const ChatMessage = ({ node, isHistory = false }: { node: DialogNode, isHistory?: boolean }) => {
    const isAI = node.speaker === 'AI';

    const rendered = useMemo(() => renderContent(node.content), [node.content]);
    
    return (
        <div className={`flex gap-3 ${!isAI ? 'flex-row-reverse' : ''} ${isHistory ? 'opacity-60' : ''}`}>
            {/* Avatar */}
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border ${
                isAI 
                    ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400' 
                    : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
            }`}>
                {isAI ? <Cpu size={14} /> : <User size={14} />}
            </div>

            {/* Bubble */}
            <div className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed border ${
                isAI 
                    ? 'bg-slate-900 border-slate-800 text-slate-200 rounded-tl-none' 
                    : 'bg-indigo-600/10 border-indigo-500/20 text-indigo-100 rounded-tr-none'
            }`}>
                <div className="mb-2">{rendered}</div>
                
                {/* Image Attachment (Responsive) */}
                {node.image && (
                    <div className="mt-3 mb-1">
                        <img 
                            src={node.image.url} 
                            alt={node.image.alt} 
                            loading="lazy"
                            className="rounded-lg border border-slate-700 w-full h-auto object-cover max-h-60 shadow-md hover:shadow-lg transition-shadow"
                        />
                        {node.image.caption && (
                            <p className="text-xs text-slate-500 mt-2 italic text-center border-t border-slate-800 pt-2">
                                {node.image.caption}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

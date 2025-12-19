import { useEffect, useRef } from 'react';
import { DialogNode, DialogOption } from '../types';
import { User, Cpu } from 'lucide-react';

interface SocraticChatProps {
    currentNode: DialogNode;
    history: DialogNode[];
    onOptionSelect: (option: DialogOption) => void;
}

export const SocraticChat = ({ currentNode, history, onOptionSelect }: SocraticChatProps) => {
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
                {/* History */}
                {history.map((node, i) => (
                    <ChatMessage key={i} node={node} isHistory />
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
                        <div className="text-center text-slate-500 text-xs italic">
                            [End of Lesson Module]
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const ChatMessage = ({ node, isHistory = false }: { node: DialogNode, isHistory?: boolean }) => {
    const isAI = node.speaker === 'AI';
    
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
            <div className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed border ${
                isAI 
                    ? 'bg-slate-900 border-slate-800 text-slate-200 rounded-tl-none' 
                    : 'bg-indigo-600/10 border-indigo-500/20 text-indigo-100 rounded-tr-none'
            }`}>
                <div className="whitespace-pre-wrap">{node.content}</div>
                
                {/* Image Attachment */}
                {node.image && (
                    <div className="mt-3 mb-1">
                        <img 
                            src={node.image.url} 
                            alt={node.image.alt} 
                            className="rounded-lg border border-slate-700 w-full h-auto object-cover max-h-48"
                        />
                        {node.image.caption && (
                            <p className="text-xs text-slate-500 mt-1 italic text-center">{node.image.caption}</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
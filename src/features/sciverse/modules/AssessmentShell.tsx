import { useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAssessment } from '../content/assessments';
import type { AssessmentQuestion, Difficulty } from '../types';

const DIFFICULTY_COLORS: Record<Difficulty, string> = {
    easy: 'bg-green-100 text-green-700 border-green-300',
    medium: 'bg-amber-100 text-amber-700 border-amber-300',
    hard: 'bg-red-100 text-red-700 border-red-300',
};

const DISCIPLINE_LABELS: Record<string, { label: string; color: string }> = {
    physics: { label: 'Physics', color: 'bg-indigo-100 text-indigo-700' },
    chemistry: { label: 'Chemistry', color: 'bg-emerald-100 text-emerald-700' },
    biology: { label: 'Biology', color: 'bg-rose-100 text-rose-700' },
    cross: { label: 'Cross-Disciplinary', color: 'bg-purple-100 text-purple-700' },
};

type AnswerState = 'unanswered' | 'correct' | 'wrong' | 'hint';

interface ShuffledQ extends AssessmentQuestion {
    shuffledOptions: string[];
    shuffledCorrectIndex: number;
    shuffledOptionExplanations?: string[];
}

function formatChoiceLabel(option: string): string {
    return option.split(/\s+[—–-]\s+/)[0].trim();
}

function shuffleOptions(questions: AssessmentQuestion[]): ShuffledQ[] {
    return questions.map(q => {
        const indices = q.options.map((_, i) => i);
        for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indices[i], indices[j]] = [indices[j], indices[i]];
        }
        return {
            ...q,
            shuffledOptions: indices.map(i => q.options[i]),
            shuffledCorrectIndex: indices.indexOf(q.correctIndex),
            shuffledOptionExplanations: q.optionExplanations ? indices.map(i => q.optionExplanations![i]) : undefined,
        };
    });
}

export const AssessmentShell = () => {
    const { bigIdeaId } = useParams<{ bigIdeaId: string }>();
    const bigIdea = Number(bigIdeaId);
    const assessment = getAssessment(bigIdea);

    const [currentQ, setCurrentQ] = useState(0);
    const [selected, setSelected] = useState<number | null>(null);
    const [answerState, setAnswerState] = useState<AnswerState>('unanswered');
    const [showHint, setShowHint] = useState(false);
    const [score, setScore] = useState(0);
    const [hintUsed, setHintUsed] = useState(false);
    const [finished, setFinished] = useState(false);
    const [history, setHistory] = useState<{ qId: number; correct: boolean; hintUsed: boolean }[]>([]);
    const [shuffledQs, setShuffledQs] = useState<ShuffledQ[]>(() =>
        assessment ? shuffleOptions(assessment.questions) : []
    );

    if (!assessment) {
        return (
            <div className="min-h-screen bg-slate-50 text-slate-800 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-2xl font-bold text-slate-700">Assessment not found</p>
                    <Link to="/projects/science-lab" className="text-blue-600 underline mt-4 block">← Back to Sciverse</Link>
                </div>
            </div>
        );
    }

    const q = shuffledQs[currentQ];
    const total = shuffledQs.length;

    const handleSelect = useCallback((idx: number) => {
        if (answerState === 'correct' || answerState === 'wrong') return;
        setSelected(idx);
        if (idx === q.shuffledCorrectIndex) {
            setAnswerState('correct');
            setScore(s => s + (hintUsed ? 0.5 : 1));
            setHistory(h => [...h, { qId: q.id, correct: true, hintUsed }]);
        } else {
            setAnswerState('wrong');
        }
    }, [answerState, q, hintUsed]);

    const handleHint = useCallback(() => {
        if (answerState === 'correct') return;
        setShowHint(true);
        setHintUsed(true);
    }, [answerState]);

    const handleTryAgain = useCallback(() => {
        setSelected(null);
        setAnswerState('unanswered');
    }, []);

    const handleGiveUp = useCallback(() => {
        setSelected(q.shuffledCorrectIndex);
        setAnswerState('correct');
        setHistory(h => [...h, { qId: q.id, correct: false, hintUsed }]);
    }, [q, hintUsed]);

    const handleNext = useCallback(() => {
        if (currentQ + 1 >= total) {
            setFinished(true);
            return;
        }
        setCurrentQ(c => c + 1);
        setSelected(null);
        setAnswerState('unanswered');
        setShowHint(false);
        setHintUsed(false);
    }, [currentQ, total]);

    // ── Finished screen ──
    if (finished) {
        const pct = Math.round((score / total) * 100);
        const stars = pct >= 90 ? 3 : pct >= 60 ? 2 : pct >= 30 ? 1 : 0;
        return (
            <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-800 flex items-center justify-center p-6">
                <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                    <div className="text-5xl mb-4">{assessment.icon}</div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-1">{assessment.title}</h2>
                    <p className="text-slate-500 mb-6">Assessment Complete!</p>

                    <div className="text-6xl mb-3">{'⭐'.repeat(stars)}{'☆'.repeat(3 - stars)}</div>
                    <p className="text-3xl font-bold text-slate-800 mb-1">{score} / {total}</p>
                    <p className="text-slate-500 mb-6">{pct}% correct</p>

                    <div className="bg-slate-50 rounded-xl p-4 mb-6 text-left">
                        <p className="text-sm font-bold text-slate-600 mb-2">Question Breakdown:</p>
                        <div className="grid grid-cols-6 gap-2">
                            {history.map((h, i) => (
                                <div key={i} className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${h.correct ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {h.correct ? '✓' : '✗'}
                                </div>
                            ))}
                        </div>
                    </div>

                    {pct >= 80 && <p className="text-green-600 font-bold mb-4">🎉 Outstanding! You've mastered this Big Idea!</p>}
                    {pct >= 50 && pct < 80 && <p className="text-amber-600 font-bold mb-4">👍 Good job! Review the lessons to strengthen weak spots.</p>}
                    {pct < 50 && <p className="text-red-600 font-bold mb-4">📚 Keep learning! Revisit the lessons and try again.</p>}

                    <div className="flex gap-3 justify-center">
                        <Link to="/projects/science-lab" className="px-5 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors">
                            ← Sciverse Hub
                        </Link>
                        <button onClick={() => { setCurrentQ(0); setSelected(null); setAnswerState('unanswered'); setShowHint(false); setHintUsed(false); setScore(0); setFinished(false); setHistory([]); setShuffledQs(shuffleOptions(assessment.questions)); }} className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors">
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ── Question screen ──
    const disc = DISCIPLINE_LABELS[q.discipline] || DISCIPLINE_LABELS.cross;
    const diffClass = DIFFICULTY_COLORS[q.difficulty];

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-800">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-4">
                <Link to="/projects/science-lab" className="text-slate-400 hover:text-slate-600 font-bold text-lg">←</Link>
                <div className="flex-1">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Assessment</p>
                    <p className="text-sm font-bold text-slate-700">{assessment.icon} Big Idea {bigIdea}: {assessment.title}</p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-slate-400">Score</p>
                    <p className="text-sm font-bold text-blue-600">{score}/{total}</p>
                </div>
            </div>

            {/* Progress bar */}
            <div className="h-1.5 bg-slate-100">
                <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${((currentQ + (answerState === 'correct' ? 1 : 0)) / total) * 100}%` }} />
            </div>

            <div className="max-w-2xl mx-auto p-6">
                {/* Question number + badges */}
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm font-bold text-slate-400">Q{currentQ + 1}/{total}</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${diffClass}`}>{q.difficulty.toUpperCase()}</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${disc.color}`}>{disc.label}</span>
                </div>

                {/* Question text */}
                <h2 className="text-xl font-bold text-slate-800 mb-6 leading-relaxed">{q.question}</h2>

                {/* Options */}
                <div className="space-y-3 mb-6">
                    {q.shuffledOptions.map((opt, idx) => {
                        let optClass = 'bg-white border-slate-200 text-slate-800 hover:border-blue-400 hover:bg-blue-50 cursor-pointer';
                        if (answerState === 'correct') {
                            if (idx === q.shuffledCorrectIndex) {
                                optClass = 'bg-green-50 border-green-500 ring-2 ring-green-200';
                            } else {
                                optClass = 'bg-slate-50 border-slate-200 opacity-50';
                            }
                        } else if (answerState === 'wrong') {
                            if (idx === selected) {
                                optClass = 'bg-red-50 border-red-400 ring-2 ring-red-200';
                            }
                        } else if (idx === selected) {
                            optClass = 'bg-blue-50 border-blue-500 ring-2 ring-blue-200';
                        }

                        return (
                            <button
                                key={idx}
                                onClick={() => handleSelect(idx)}
                                disabled={answerState === 'correct'}
                                className={`w-full text-left px-5 py-3.5 rounded-xl border-2 font-medium transition-all ${optClass}`}
                            >
                                <span className="font-bold text-slate-400 mr-3">{String.fromCharCode(65 + idx)}.</span>
                                {formatChoiceLabel(opt)}
                                {answerState === 'correct' && idx === q.shuffledCorrectIndex && <span className="ml-2 text-green-600">✓</span>}
                                {answerState === 'wrong' && idx === selected && <span className="ml-2 text-red-500">✗</span>}
                            </button>
                        );
                    })}
                </div>

                {/* Wrong-answer explanation */}
                {answerState === 'wrong' && selected !== null && q.shuffledOptionExplanations && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
                        <p className="text-sm font-bold text-red-700 mb-1">❌ Not quite!</p>
                        <p className="text-sm text-red-800">{q.shuffledOptionExplanations[selected]}</p>
                    </div>
                )}

                {/* Hint area */}
                {showHint && answerState !== 'correct' && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
                        <p className="text-sm font-bold text-amber-700 mb-1">💡 Hint:</p>
                        <p className="text-sm text-amber-800">{q.hint}</p>
                    </div>
                )}

                {/* Explanation (after answering) */}
                {answerState === 'correct' && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
                        <p className="text-sm font-bold text-green-700 mb-1">
                            {history[history.length - 1]?.correct ? '🎉 Correct!' : '📖 The correct answer:'}
                        </p>
                        <p className="text-sm text-green-800">{q.explanation}</p>
                    </div>
                )}

                {/* Action buttons */}
                <div className="flex gap-3 justify-between items-center">
                    <div className="flex gap-2">
                        {answerState === 'unanswered' && !showHint && (
                            <button onClick={handleHint} className="px-4 py-2 bg-amber-100 text-amber-700 rounded-xl text-sm font-bold hover:bg-amber-200 transition-colors">
                                💡 Show Hint
                            </button>
                        )}
                        {answerState === 'wrong' && (
                            <>
                                <button onClick={handleTryAgain} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl text-sm font-bold hover:bg-blue-200 transition-colors">
                                    🔄 Try Again
                                </button>
                                <button onClick={handleGiveUp} className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-200 transition-colors">
                                    Show Answer
                                </button>
                            </>
                        )}
                    </div>
                    {answerState === 'correct' && (
                        <button onClick={handleNext} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors ml-auto">
                            {currentQ + 1 >= total ? '🏁 See Results' : 'Next →'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};


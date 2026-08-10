import { useState, useCallback, useEffect, useRef } from 'react';
import { DialogNode, DialogOption, SimAction } from '../types';

interface UseDialogEngineProps {
    script: Record<string, DialogNode>;
    onSimAction: (action: SimAction) => void;
    isReady?: boolean;
    resetKey?: string; // Change this to force a full reset (e.g. lessonId)
}

export const useDialogEngine = ({ script, onSimAction, isReady = true, resetKey }: UseDialogEngineProps) => {
    const [currentNode, setCurrentNode] = useState<DialogNode>(script['root']);
    const [history, setHistory] = useState<DialogNode[]>([]);
    
    // Track if we have processed the entry action for the current node
    // to prevent double-firing or firing before ready.
    const actionProcessedRef = useRef<string | null>(null);

    // Full reset when resetKey changes (e.g. navigating to a different lesson)
    useEffect(() => {
        setCurrentNode(script['root']);
        setHistory([]);
        actionProcessedRef.current = null;
    }, [resetKey]);

    // Reset if script changes and current node is no longer valid
    useEffect(() => {
        if (!script[currentNode.id]) {
            setCurrentNode(script['root']);
            setHistory([]);
            actionProcessedRef.current = null;
        }
    }, [script]);

    // Handle "On Enter" Actions
    useEffect(() => {
        // Only proceed if engine is ready
        if (!isReady) return;

        // Check if we have an action and haven't processed it for this specific node instance
        if (currentNode.onEnterAction && actionProcessedRef.current !== currentNode.id) {
            onSimAction(currentNode.onEnterAction);
            actionProcessedRef.current = currentNode.id;
        }
    }, [currentNode, onSimAction, isReady]);

    const handleOptionSelect = useCallback((option: DialogOption) => {
        if (option.simAction) {
            onSimAction(option.simAction);
        } 
        
        const nextNode = script[option.nextNodeId];
        if (nextNode) {
            setHistory(prev => [...prev, currentNode]);
            setCurrentNode(nextNode);
            // Reset processed flag for the new node so its action can fire
            // (UseRef update happens immediately, but Effect will catch the new node id)
            // Note: We don't nullify it here, we rely on the id check in the Effect.
        }
    }, [currentNode, script, onSimAction]);

    const rewindTo = useCallback((historyIndex: number) => {
        if (historyIndex < 0 || historyIndex >= history.length) return;
        const targetNode = history[historyIndex];
        // Trim history to everything before the clicked node
        setHistory(history.slice(0, historyIndex));
        setCurrentNode(targetNode);
        // Allow onEnterAction to re-fire for the rewound node
        actionProcessedRef.current = null;
    }, [history]);

    return {
        currentNode,
        setCurrentNode,
        history,
        handleOptionSelect,
        rewindTo
    };
};
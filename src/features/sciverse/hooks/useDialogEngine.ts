import { useState, useCallback, useEffect } from 'react';
import { DialogNode, DialogOption, SimAction } from '../types';

interface UseDialogEngineProps {
    script: Record<string, DialogNode>;
    onSimAction: (action: SimAction) => void;
}

export const useDialogEngine = ({ script, onSimAction }: UseDialogEngineProps) => {
    // Current active node
    const [currentNode, setCurrentNode] = useState<DialogNode>(script['root']);
    const [history, setHistory] = useState<DialogNode[]>([]);

    // Reset if script changes significantly (optional safety)
    useEffect(() => {
        if (!script[currentNode.id]) {
            setCurrentNode(script['root']);
            setHistory([]);
        }
    }, [script]);

    // Handle "On Enter" Actions for the current node
    useEffect(() => {
        if (currentNode.onEnterAction) {
            onSimAction(currentNode.onEnterAction);
        }
    }, [currentNode, onSimAction]);

    const handleOptionSelect = useCallback((option: DialogOption) => {
        // 1. Trigger Sim Action if present
        if (option.simAction) {
            onSimAction(option.simAction);
        } 
        
        // 2. Advance Dialog
        const nextNode = script[option.nextNodeId];
        if (nextNode) {
            setHistory(prev => [...prev, currentNode]);
            setCurrentNode(nextNode);
        }
    }, [currentNode, script, onSimAction]);

    return {
        currentNode,
        setCurrentNode,
        history,
        handleOptionSelect
    };
};
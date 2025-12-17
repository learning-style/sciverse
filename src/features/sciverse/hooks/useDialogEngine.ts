import { useState, useCallback, useEffect } from 'react';
import { DialogNode, DialogOption, SimAction } from '../types';
import { kinematicsScript } from '../content/kinematicsScript';

interface UseDialogEngineProps {
    onSimAction: (action: SimAction) => void;
}

export const useDialogEngine = ({ onSimAction }: UseDialogEngineProps) => {
    // Current active node
    const [currentNode, setCurrentNode] = useState<DialogNode>(kinematicsScript['root']);
    const [history, setHistory] = useState<DialogNode[]>([]);

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
        const nextNode = kinematicsScript[option.nextNodeId];
        if (nextNode) {
            setHistory(prev => [...prev, currentNode]);
            setCurrentNode(nextNode);
        }
    }, [currentNode, onSimAction]);

    return {
        currentNode,
        history,
        handleOptionSelect
    };
};
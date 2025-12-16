import { useState, useCallback } from 'react';
import { DialogNode, DialogOption, SimAction } from '../types';
import { kinematicsScript } from '../content/kinematicsScript';

interface UseDialogEngineProps {
    onSimAction: (action: SimAction) => void;
}

export const useDialogEngine = ({ onSimAction }: UseDialogEngineProps) => {
    // Current active node
    const [currentNode, setCurrentNode] = useState<DialogNode>(kinematicsScript['root']);
    const [history, setHistory] = useState<DialogNode[]>([]);

    const handleOptionSelect = useCallback((option: DialogOption) => {
        // 1. Trigger Sim Action if present
        if (option.simAction) {
            onSimAction(option.simAction);
        } 
        // Hack for the custom gravity action in script
        // In a real engine, we'd have a parser for this. 
        // For MVP, we map specific IDs or extend the type.
        // Let's assume standard SimAction covers most, but we can emit custom events.
        if (option.id === 'fire_gravity') {
             // We'll treat this as a generic SimAction in the parent handler
             // The payload in script was pseudo-code, we need to ensure it matches types
             onSimAction({ type: 'RESET' }); // Clear old
             setTimeout(() => {
                 onSimAction({ type: 'APPLY_FORCE', payload: { id: 'GRAVITY_ON', force: {x:0, y:1} } }); // Signal to enable gravity
                 onSimAction({ 
                     type: 'SPAWN_OBJECT', 
                     payload: { label: 'Projectile', position: {x:1, y:4}, velocity: {x:10, y:0} } 
                 });
             }, 100);
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
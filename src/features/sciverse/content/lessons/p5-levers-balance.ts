import { DialogNode } from '../../types';

/**
 * P5 — Levers & Balance: The Playground Seesaw
 * Big Idea 5: "How Can a Small Force Do a Big Job?"
 * Scenario: "Playground Seesaw"
 * Target Misconception: "Heavier side always goes down"
 */
export const getP5Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Welcome to the Playground Physics Lab! 🎪\n\nI've set up a **seesaw** (a lever) with a pivot in the middle. On the left sits a heavy 10 kg box. On the right sits a light 5 kg box.\n\nRight now the heavy side is down. Can we lift it?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', leftWeight: 10, rightWeight: 5, pivotPos: 50 } },
        options: [
            { id: 'add_weight', label: "Add more weight to the right!", nextNodeId: 'naive_add' },
            { id: 'move_pivot', label: "Move the pivot point?", nextNodeId: 'clever_pivot' }
        ]
    },

    'naive_add': {
        id: 'naive_add',
        speaker: 'AI',
        content: "Sure — I added another 5 kg to the right. Now both sides weigh 10 kg and the seesaw is **balanced**! ⚖️\n\nBut we had to double the weight. What if we want to lift the heavy box with LESS weight?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'balanced', leftWeight: 10, rightWeight: 10, pivotPos: 50 } },
        options: [
            { id: 'pivot', label: "Is there a way without adding weight?", nextNodeId: 'clever_pivot' }
        ]
    },

    'clever_pivot': {
        id: 'clever_pivot',
        speaker: 'AI',
        content: "Great thinking! 💡 Let's move the **pivot** (fulcrum) closer to the heavy box.\n\nI've put the pivot 25% from the left and 75% from the right. Now watch!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'offset_pivot', leftWeight: 10, rightWeight: 5, pivotPos: 25 } },
        options: [
            { id: 'observe', label: "What happens?", nextNodeId: 'pivot_result' }
        ]
    },

    'pivot_result': {
        id: 'pivot_result',
        speaker: 'AI',
        content: "The 5 kg box pushed the 10 kg box UP! 🤯\n\n**Why?** It's not just about weight — it's about **torque** (turning force).\n\nTorque = Weight × Distance from pivot\n\n- Left: 10 kg × 2.5 m = 25 torque units\n- Right: 5 kg × 7.5 m = 37.5 torque units ← **BIGGER!**\n\nThe lighter box wins because it's FARTHER from the pivot!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'torque_reveal', leftWeight: 10, rightWeight: 5, pivotPos: 25 } },
        options: [
            { id: 'checkpoint', label: "Distance matters, not just weight!", nextNodeId: 'checkpoint_torque' }
        ]
    },

    'checkpoint_torque': {
        id: 'checkpoint_torque',
        speaker: 'AI',
        content: "⏸️ **Prediction Time!**\n\nI have a 20 kg boulder on the left, 2 m from the pivot. You have a 5 kg rock on the right. How far from the pivot must you place it to balance?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint', leftWeight: 20, rightWeight: 5, pivotPos: 20 } },
        options: [
            { id: 'two', label: "2 meters", nextNodeId: 'torque_wrong_2' },
            { id: 'eight', label: "8 meters", nextNodeId: 'torque_correct', sentiment: 'positive' },
            { id: 'twenty', label: "20 meters", nextNodeId: 'torque_wrong_20' }
        ]
    },

    'torque_wrong_2': {
        id: 'torque_wrong_2',
        speaker: 'AI',
        content: "Let's check: 5 kg × 2 m = 10. But the boulder has 20 kg × 2 m = 40. That's still not balanced! We need more distance.\n\n40 = 5 × ? → ? = **8 meters!**",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint_wrong', leftWeight: 20, rightWeight: 5, pivotPos: 20 } },
        options: [
            { id: 'try_8', label: "Place it at 8 meters!", nextNodeId: 'torque_demo' }
        ]
    },

    'torque_wrong_20': {
        id: 'torque_wrong_20',
        speaker: 'AI',
        content: "That would give: 5 kg × 20 m = 100 — way too much! The boulder only has 20 × 2 = 40 torque units.\n\nWe need: 40 = 5 × ? → ? = **8 meters!**",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint_wrong', leftWeight: 20, rightWeight: 5, pivotPos: 20 } },
        options: [
            { id: 'try_8', label: "Place it at 8 meters!", nextNodeId: 'torque_demo' }
        ]
    },

    'torque_correct': {
        id: 'torque_correct',
        speaker: 'AI',
        content: "Nailed it! ✅ 5 kg × 8 m = 40, which perfectly balances 20 kg × 2 m = 40. Let's see it in action!",
        options: [
            { id: 'demo', label: "Show me!", nextNodeId: 'torque_demo' }
        ]
    },

    'torque_demo': {
        id: 'torque_demo',
        speaker: 'AI',
        content: "It's perfectly level! ⚖️\n\nThis is the principle behind **every lever tool**: crowbars, wheelbarrows, bottle openers, even your arm! Move the effort farther from the pivot, and a small force does a big job.",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'balanced_demo', leftWeight: 20, rightWeight: 5, pivotPos: 20 } },
        options: [
            { id: 'real_world', label: "What about real tools?", nextNodeId: 'tools_example' }
        ]
    },

    'tools_example': {
        id: 'tools_example',
        speaker: 'AI',
        content: "Think about prying a nail out with a hammer 🔨:\n- The nail grips tight (big resistance)\n- Your hand pushes with small force WAY far from the pivot\n- Torque formula makes your small force win!\n\nOr a wheelbarrow 🏗️:\n- Heavy load sits near the wheel (pivot)\n- Your hands are far from the wheel\n- Easy lift!",
        options: [
            { id: 'misconception', label: "So heavy doesn't always go down!", nextNodeId: 'misconception_bust' }
        ]
    },

    'misconception_bust': {
        id: 'misconception_bust',
        speaker: 'AI',
        content: "⚡ **Misconception Busted!**\n\n\"Heavier always goes down\" is WRONG for levers!\n\nThe real rule:\n> **The side with more TORQUE (weight × distance) goes down.**\n\nA feather can out-torque a boulder if it's far enough from the pivot!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'misconception' } },
        options: [
            { id: 'discovery', label: "Torque is the real boss!", nextNodeId: 'discovery' }
        ]
    },

    'discovery': {
        id: 'discovery',
        speaker: 'AI',
        content: "🎉 **Big Discovery!**\n\n**Levers** are simple machines that let a small force overcome a big resistance by playing with distance.\n\nThe physics trick: **Torque = Force × Distance**\n\nWhen you increase the distance from the pivot, you \"multiply\" your force. This is mechanical advantage!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
        options: [
            { id: 'complete', label: "Small force, big result!", nextNodeId: 'complete' }
        ]
    },

    'complete': {
        id: 'complete',
        speaker: 'AI',
        content: "🔗 **Big Idea 5 Complete — How a Small Force Does a Big Job!**\n\n- Physics (P5) showed how levers multiply force using torque\n- Chemistry (C5) shows how small amounts of solvent dissolve mountains of material\n- Biology (B5) reveals how tiny enzymes amplify chemical reactions in your body\n\nForce multiplication is everywhere! ⚖️\n\n✅ **Lesson P5 Complete!**",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});


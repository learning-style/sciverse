import { DialogNode } from '../../types';

/**
 * P13 — Gears & Pulleys
 * Big Idea 13: "How Does Structure Shape Function?"
 * Scenario: Clock gears and pulley system
 * Target Misconception: "Machines create energy — a pulley makes things truly weightless"
 */
export const getP13Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Welcome to the Mechanical Advantage Lab! ⚙️\n\nYou can see a large gear (20 teeth) connected to a small gear (5 teeth). A small gear is spinning the large gear.\n\nHere's the question: if the small gear makes 4 full rotations, how many full rotations does the large gear make?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', smallTeeth: 5, largeTeeth: 20, inputSpeed: 4 } },
        options: [
            { id: 'four', label: "4 rotations — same as the input gear.", nextNodeId: 'misconception_same', sentiment: 'negative' },
            { id: 'one', label: "1 rotation — the gear ratio is 4:1.", nextNodeId: 'correct_ratio', sentiment: 'positive' },
            { id: 'sixteen', label: "16 rotations — larger gear goes faster.", nextNodeId: 'misconception_faster', sentiment: 'negative' }
        ]
    },

    'misconception_same': {
        id: 'misconception_same',
        speaker: 'AI',
        content: "Not quite! Think about the teeth meshing together — each tooth on the small gear must push exactly one tooth on the large gear.\n\nThe small gear has 5 teeth. The large gear has 20. So the small gear must turn 4 times to push all 20 teeth of the large gear once around. 🔄",
        options: [
            { id: 'i_see', label: "The large gear only makes 1 rotation — the ratio is 1/4!", nextNodeId: 'correct_ratio' }
        ]
    },

    'misconception_faster': {
        id: 'misconception_faster',
        speaker: 'AI',
        content: "The large gear actually spins *slower*, not faster! 🐢\n\nTeeth must mesh perfectly — the small gear's teeth push the large gear's teeth. With 4× more teeth, the large gear turns 4× slower. But there's a trade-off — something else gets 4× bigger. Any idea what?",
        options: [
            { id: 'torque', label: "Torque? The large gear gets more turning force.", nextNodeId: 'correct_ratio' },
            { id: 'dont_know', label: "I'm not sure…", nextNodeId: 'correct_ratio' }
        ]
    },

    'correct_ratio': {
        id: 'correct_ratio',
        speaker: 'AI',
        content: "Yes! This is the golden rule of simple machines:\n\n⚡ **You can't create energy — you can only trade speed for force (or force for speed).**\n\n- Large gear driven by small → **slower but more torque** (great for lifting heavy things!)\n- Small gear driven by large → **faster but less torque** (great for bicycle wheels!)\n\nSpin the gears in the sim and observe the speed difference!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'spinning', showSpeedLabels: true, gearRunning: true } },
        options: [
            { id: 'saw_spinning', label: "I see! Small gear spins 4× faster than large gear.", nextNodeId: 'pulleys' }
        ]
    },

    'pulleys': {
        id: 'pulleys',
        speaker: 'AI',
        content: "Now switch to the **Pulley** system in the sim. You have a 100 kg block hanging from a rope over a pulley.\n\nWith a **single fixed pulley**, how much force do you need to lift the 100 kg block?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'pulley_intro', pulleyType: 'single', blockMass: 100 } },
        options: [
            { id: 'same_100', label: "100 kg worth of force — it just changes direction.", nextNodeId: 'single_pulley_correct' },
            { id: 'half', label: "50 kg — the pulley halves the force needed.", nextNodeId: 'single_pulley_hint' },
            { id: 'any', label: "Almost nothing — pulleys eliminate the weight.", nextNodeId: 'misconception_pulley' }
        ]
    },

    'misconception_pulley': {
        id: 'misconception_pulley',
        speaker: 'AI',
        content: "A single fixed pulley only changes the *direction* of your force, not its size — you still pull with 100 kg of force! 💪\n\nMachines don't eliminate effort — they redirect or trade force/distance. Think of it as: Work = Force × Distance. Less force always means more distance traveled.",
        options: [
            { id: 'understood_energy', label: "Same work, just different force and distance!", nextNodeId: 'single_pulley_correct' }
        ]
    },

    'single_pulley_hint': {
        id: 'single_pulley_hint',
        speaker: 'AI',
        content: "The block half part is for a **movable pulley** (compound pulley). A single fixed pulley only changes direction, not force magnitude!",
        options: [
            { id: 'ok', label: "So single fixed pulley still needs 100 kg of pull?", nextNodeId: 'single_pulley_correct' }
        ]
    },

    'single_pulley_correct': {
        id: 'single_pulley_correct',
        speaker: 'AI',
        content: "Exactly! A single fixed pulley = 1:1 force but changed direction (you pull down instead of up — much easier for humans).\n\nNow switch to the **compound pulley** (3 ropes supporting the load) — how much force do you predict you'll need now?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'compound_pulley', pulleyType: 'compound', ropesCount: 3 } },
        options: [
            { id: 'third', label: "About 33 kg — the load is shared across 3 ropes!", nextNodeId: 'summary' },
            { id: 'same2', label: "Still 100 kg — more ropes don't help.", nextNodeId: 'confirm_compound' }
        ]
    },

    'confirm_compound': {
        id: 'confirm_compound',
        speaker: 'AI',
        content: "Actually, with 3 supporting rope segments, each takes 1/3 of the load! You'd only need ~33 kg of force — but you'd pull the rope 3 times as far. Energy conserved! ✅",
        options: [
            { id: 'understood_compound', label: "More ropes = less force needed, more rope to pull!", nextNodeId: 'summary' }
        ]
    },

    'summary': {
        id: 'summary',
        speaker: 'AI',
        content: "🌟 **Mechanical Advantage Mastered:**\n\n✅ Machines trade force ↔ speed or force ↔ distance\n✅ Energy is never created or destroyed (Work = F × d always conserved)\n✅ Gear ratio = tooth ratio (large/small)\n✅ More support ropes in a pulley = less force × more distance\n✅ Fixed pulley = direction change only; movable pulley = force multiplication\n\n**Examples:** Bicycle gears, car engines, construction cranes — all use these principles!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: [{ id: 'done', label: "Machines make sense now!", nextNodeId: 'done' }]
    },

    'done': {
        id: 'done',
        speaker: 'AI',
        content: "Engineering champion! 🏆\n\nSee how **C13 (Polymers)** explains the materials gears are made from, or **B13 (Photosynthesis)** to learn about nature's own energy machine — the leaf!",
        options: []
    }
});

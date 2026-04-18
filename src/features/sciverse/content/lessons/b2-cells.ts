import { DialogNode } from '../../types';

/**
 * B2 — Cells: The Tiny Factories
 * Big Idea 2: "What Is Everything Made Of?"
 * Scenario: "Zooming Into Your Skin"
 * Target Misconception: "Cells are like tiny blobs of jelly with nothing inside"
 */
export const getB2Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Welcome back to Biology! 🧬\n\nLook at the back of your hand. Your skin looks pretty smooth, right? Maybe a few wrinkles or freckles.\n\nBut what if we could zoom in... REALLY far in? Let's use our **Zoom Slider**!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', zoomLevel: 1, showLabels: false } },
        options: [
            { id: 'zoom', label: "Let's zoom in!", nextNodeId: 'zoom_1000', simAction: { type: 'SET_VISUAL', payload: { zoomLevel: 1000 } } }
        ]
    },

    'zoom_1000': {
        id: 'zoom_1000',
        speaker: 'AI',
        content: "WHOA! 🔍 At 1000x zoom, your skin isn't smooth at all! It's made of millions of tiny **boxes** — those are **CELLS**!\n\nEach one is ALIVE. They eat, they grow, they make copies of themselves, and eventually they die and get replaced.",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'cells_grid', zoomLevel: 1000 } },
        options: [
            { id: 'bricks', label: "They look like bricks in a wall!", nextNodeId: 'bricks_analogy' },
            { id: 'inside', label: "What's inside them?", nextNodeId: 'zoom_inside' }
        ]
    },

    'bricks_analogy': {
        id: 'bricks_analogy',
        speaker: 'AI',
        content: "They DO look like bricks! 🧱 Just like a wall is made of bricks, your body is made of cells.\n\nBut unlike bricks, these are **alive**. Each cell is a tiny factory doing hundreds of jobs every second.\n\nLet's zoom into ONE cell and see what's inside!",
        options: [
            { id: 'zoom_more', label: "Zoom into one cell!", nextNodeId: 'zoom_inside', simAction: { type: 'SET_VISUAL', payload: { zoomLevel: 10000 } } }
        ]
    },

    'zoom_inside': {
        id: 'zoom_inside',
        speaker: 'AI',
        content: "At 10,000x zoom, you can see INSIDE a single cell. It's NOT empty jelly! There's all sorts of stuff in here!\n\nLet me turn on the **labels** so you can see what each part is called...",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'inside_cell', zoomLevel: 10000, showLabels: true } },
        options: [
            { id: 'labels', label: "Show me the parts!", nextNodeId: 'organelles' }
        ]
    },

    'organelles': {
        id: 'organelles',
        speaker: 'AI',
        content: "Each part has a special name — **organelles** (little organs). Here are the big three:\n\n🧠 **Nucleus** — \"The Brain\" — holds the instructions (DNA)\n⚡ **Mitochondria** — \"The Power Plant\" — turns food into energy\n🚪 **Cell Membrane** — \"The Security Gate\" — controls what enters and exits\n\nEvery cell is a miniature factory with its own brain, power plant, and security!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'organelles', highlightOrganelle: 'all' } },
        options: [
            { id: 'quiz', label: "That's a lot going on in something so tiny!", nextNodeId: 'checkpoint_energy' }
        ]
    },

    'checkpoint_energy': {
        id: 'checkpoint_energy',
        speaker: 'AI',
        content: "⏸️ **Quick Quiz:**\n\nYou just ate lunch 🍔. The molecules from your food enter the cell. Which organelle uses those molecules to make energy?",
        options: [
            { id: 'nucleus', label: "The Nucleus.", nextNodeId: 'not_nucleus' },
            { id: 'mito', label: "The Mitochondria.", nextNodeId: 'correct_mito', sentiment: 'positive' },
            { id: 'membrane', label: "The Cell Membrane.", nextNodeId: 'not_membrane' }
        ]
    },

    'not_nucleus': {
        id: 'not_nucleus',
        speaker: 'AI',
        content: "Close! The Nucleus holds the instructions — think of it as the recipe book 📖. But the actual COOKING (energy conversion) happens somewhere else.\n\nWhich organelle is called \"The Power Plant\"?",
        options: [
            { id: 'mito_retry', label: "The Mitochondria!", nextNodeId: 'correct_mito' }
        ]
    },

    'not_membrane': {
        id: 'not_membrane',
        speaker: 'AI',
        content: "The Membrane lets the food molecules IN — like a security gate opening the door 🚪. But it doesn't do the energy conversion itself.\n\nWhich organelle actually makes the energy?",
        options: [
            { id: 'mito_retry', label: "The Mitochondria!", nextNodeId: 'correct_mito' }
        ]
    },

    'correct_mito': {
        id: 'correct_mito',
        speaker: 'AI',
        content: "✅ **The Mitochondria!** It's literally the power plant of the cell.\n\nIt takes glucose (a sugar molecule — remember C₆H₁₂O₆ from Chemistry?) and breaks it apart to release energy. That energy powers EVERYTHING your cell does.",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'mito_highlight', highlightOrganelle: 'mitochondria', showEnergyFlow: true } },
        options: [
            { id: 'connection', label: "Wait — that's the sugar from my food?", nextNodeId: 'energy_connection' }
        ]
    },

    'energy_connection': {
        id: 'energy_connection',
        speaker: 'AI',
        content: "YES! 🔗 Here's how it all connects:\n\n1. You eat food (a sandwich)\n2. Your stomach breaks it down into molecules (glucose)\n3. Glucose enters your cells through the membrane\n4. Mitochondria break glucose apart\n5. Energy is released — powering your muscles, brain, everything!\n\nThat's why you need to eat — your cells need fuel!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'energy_flow', showEnergyChain: true } },
        options: [
            { id: 'amazing', label: "My cells are like tiny engines!", nextNodeId: 'discovery' }
        ]
    },

    'discovery': {
        id: 'discovery',
        speaker: 'AI',
        content: "🎉 **Big Picture Discovery:**\n\n**Atoms** (from Chemistry C2) → combine into **Molecules** → enter **Cells** (that's us!) → get broken down for **Energy**\n\nEach level is built from the one below it. That's the most powerful pattern in all of science!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery', showHierarchy: true } },
        options: [
            { id: 'crosslink', label: "Atoms → Molecules → Cells!", nextNodeId: 'complete' }
        ]
    },

    'complete': {
        id: 'complete',
        speaker: 'AI',
        content: "🔗 **Big Idea 2 Complete!**\n- Physics (P2): Particles behave differently based on energy\n- Chemistry (C2): Different atoms combine into different molecules\n- Biology (B2): Cells are tiny machines built FROM those molecules\n\n✅ **Lesson B2 Complete!** You've unlocked Big Idea 3: Energy! 🎊",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});


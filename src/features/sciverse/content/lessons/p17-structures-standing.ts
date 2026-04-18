import { DialogNode } from '../../types';

/**
 * P17 — Structures Stay Standing
 * Big Idea 17: "How Do Structures Stay Standing?"
 * Scenario: Two bridges with equal mass but different survival
 * Target Misconception: "Heavier structures are always stronger"
 */
export const getP17Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Welcome to the Structure Test Bench! 🏗️\n\nImagine two bridges built across the same river. They weigh about the same, use the same concrete, and carry the same traffic. But after 10 years, one is still solid — the other is full of cracks. 😱\n\nHow is that possible? If they have the same **mass** and the same **material**, why does one survive and the other fail?\n\nThe answer lies in three words: **load path**, **bracing**, and **geometry**.",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', load: 10, bridgeType: 'beam' } },
        options: [
            { id: 'mass_only', label: "Heavier structures are always stronger — just add more material!", nextNodeId: 'misconception' },
            { id: 'load_path', label: "It's about how force flows through the structure, not just total weight.", nextNodeId: 'correct', sentiment: 'positive' },
            { id: 'material_only', label: "Only material type matters; the shape doesn't really change things.", nextNodeId: 'misconception_shape' }
        ]
    },

    'misconception': {
        id: 'misconception',
        speaker: 'AI',
        content: "That's a very common misconception! 🤔\n\nThink about it this way: a solid block of steel sitting flat can hold enormous weight. But that same block balanced on a thin edge? It topples easily!\n\n**Mass alone is NOT a design guarantee.** A poorly braced heavy structure can fail _before_ a lighter but well-designed one. The secret is **how forces travel through the structure** — engineers call this the **load path**.\n\nThe Tacoma Narrows Bridge (1940) was massive — but wind made it twist and collapse because its shape couldn't handle the forces! 🌊",
        options: [{ id: 'next', label: "So it's about force distribution, not just weight!", nextNodeId: 'correct' }]
    },

    'misconception_shape': {
        id: 'misconception_shape',
        speaker: 'AI',
        content: "Material matters, but shape is actually more important than most people realize! 🔺\n\nHere's proof: a flat sheet of paper can't even hold a pencil. But fold that SAME paper into a tube or an accordion shape, and it can support a heavy book. Same material — totally different **geometry**.\n\nEngineers use this principle every day. **Triangles** are the strongest shape because they resist deformation. That's why you see triangular **trusses** in bridges, cranes, and roof structures everywhere!",
        options: [{ id: 'next2', label: "So geometry and load path are central to design!", nextNodeId: 'correct' }]
    },

    'correct': {
        id: 'correct',
        speaker: 'AI',
        content: "Exactly! 🎯 Here's the key physics:\n\n- 🔺 **Triangular bracing** resists shape change — triangles are the only polygon that can't deform without breaking a side\n- ⚡ **Stress concentration** happens at weak joints — force piles up where the path narrows\n- ↔️ **Load distribution** spreads force across many members so no single one is overloaded\n\nUse the lab controls to vary **base width**, **load**, and **bracing**, then watch the **stability score** change.\n\n**Fun fact:** The Eiffel Tower uses over 18,000 iron members arranged in triangular trusses — that's why it's still standing after 135 years despite being mostly empty air! 🗼",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'analysis', showStressMap: true } },
        options: [
            { id: 'checkpoint', label: "I understand — test me with a checkpoint!", nextNodeId: 'checkpoint' },
            { id: 'experiment_first', label: "Let me experiment with the controls first.", nextNodeId: 'experiment_prompt' }
        ]
    },

    'experiment_prompt': {
        id: 'experiment_prompt',
        speaker: 'AI',
        content: "🔬 **Mini Engineering Experiment:**\n\n1. Keep **load** steady and increase **bracing** → watch the stability score rise\n2. Keep **bracing** fixed and crank up the **load** → see when the safety margin drops into the danger zone\n3. Widen the **base** and check if stability improves even without more bracing\n\nNotice how the visual shows more **cross-braces** appearing as you increase bracing? Each one creates a new triangular path for force to travel through! 🔺",
        options: [{ id: 'to_checkpoint', label: "I tested it — ask me the checkpoint!", nextNodeId: 'checkpoint' }]
    },

    'checkpoint': {
        id: 'checkpoint',
        speaker: 'AI',
        content: "⏸️ **Checkpoint — Think Like An Engineer!**\n\nA truck twice the normal weight needs to cross a bridge. The city can only afford ONE upgrade. Which design survives better?\n\n🔗 **Link to C17:** The material chemistry of concrete vs. steel affects _which_ stress types each can handle!",
        options: [
            { id: 'truss', label: "A truss with many distributed triangular members.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
            { id: 'single', label: "A single thick beam with no bracing at all.", nextNodeId: 'checkpoint_wrong' },
            { id: 'same', label: "Both designs perform identically if total mass is the same.", nextNodeId: 'checkpoint_wrong2' }
        ]
    },

    'checkpoint_wrong': {
        id: 'checkpoint_wrong',
        speaker: 'AI',
        content: "Not quite! A single unbraced beam puts ALL the bending stress on one member. 😬\n\nWhen load doubles, that single beam's **peak stress** also roughly doubles — and it has zero **redundancy** (no backup paths if it starts to crack).\n\nA truss spreads the same load across many members. Each one carries a fraction. Even if one member weakens, others share the load. That's **structural redundancy**!",
        options: [{ id: 'retry', label: "Distributed members reduce peak stress — got it!", nextNodeId: 'checkpoint_correct' }]
    },

    'checkpoint_wrong2': {
        id: 'checkpoint_wrong2',
        speaker: 'AI',
        content: "This is the key insight: **equal mass ≠ equal strength!** ⚖️\n\nImagine 10 kg of steel. You could make one thick bar (single load path) or a web of thin rods forming triangles (multiple load paths). Same mass, VERY different behavior under load.\n\nThe **topology** — how members connect — and the **support conditions** change failure risk dramatically. Geometry is the engineer's most powerful tool!",
        options: [{ id: 'retry2', label: "Geometry can outperform raw mass — makes sense!", nextNodeId: 'checkpoint_correct' }]
    },

    'checkpoint_correct': {
        id: 'checkpoint_correct',
        speaker: 'AI',
        content: "✅ **Exactly right!** Strong structures spread force so no single connection carries excessive **stress**.\n\nThis is called the **principle of load distribution** — and it's why real bridges use hundreds of members instead of one giant beam.\n\n**Did you know?** Engineers use computer **finite element analysis** (FEA) to simulate millions of force paths before a single bolt is placed! 💻",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint', bestDesign: 'truss' } },
        options: [
            { id: 'discovery', label: "Show me the big discovery!", nextNodeId: 'discovery' },
            { id: 'summary_now', label: "Show summary table first.", nextNodeId: 'summary_table' }
        ]
    },

    'discovery': {
        id: 'discovery',
        speaker: 'AI',
        content: "🎉 **Discovery: Structures & Load Paths!**\n\n| Concept | What it means |\n|---------|---------------|\n| 🏗️ **Load path** | The route force takes from applied load through members to the ground |\n| 🔺 **Bracing** | Triangular members that resist shape change and spread force |\n| ⚡ **Stress concentration** | Danger zones where force piles up at weak joints or narrow sections |\n| ↔️ **Load distribution** | Spreading force across many members so none is overloaded |\n| 🔄 **Redundancy** | Backup load paths that prevent total failure if one member cracks |\n\n**Key Insight:** Structures stay standing when **geometry**, **support conditions**, and **material limits** work as one system. Engineers model load paths, not just total weight!",
        options: [
            { id: 'summary', label: "Show the lab data summary table.", nextNodeId: 'summary_table' },
            { id: 'reflect', label: "Ask me reflection questions!", nextNodeId: 'reflection_questions' }
        ]
    },

    'summary_table': {
        id: 'summary_table',
        speaker: 'AI',
        content: "📊 **Lab Results Summary:**\n\n| **Design Factor** | **Why It Matters** | **What You Saw in the Lab** |\n|---|---|---|\n| 🏗️ **Base width** | Wider base improves **stability margin** | Wider base → higher stability score |\n| 🔺 **Bracing** | Spreads and redirects **force** through triangles | More bracing → lower overload risk |\n| ⚖️ **Load** | Increases demand on every member | Higher load → lower safety margin |\n| ➡️ **Load path** | Controls where **stress concentrates** | Better distribution → lower peak stress |",
        options: [
            { id: 'reflect_after_table', label: "Now ask me reflection questions!", nextNodeId: 'reflection_questions' },
            { id: 'to_complete', label: "Wrap up P17.", nextNodeId: 'complete' }
        ]
    },

    'reflection_questions': {
        id: 'reflection_questions',
        speaker: 'AI',
        content: "🧠 **Think Like A Structural Engineer**\n\n1. If budget allows only ONE upgrade, when is added **bracing** more useful than added **mass**?\n2. Why can a high-strength material still fail in a poor **geometry**?\n3. How should you test a design before full-scale deployment?\n\n**Real-world connection:** When the I-35W bridge in Minneapolis collapsed in 2007, investigators found that a single **gusset plate** (connection point) was undersized. The entire bridge had too much load concentrated on too few paths. 🔍",
        options: [
            { id: 'reflect_good', label: "Force distribution and weak-point control are more valuable than just adding mass.", nextNodeId: 'reflection_feedback', sentiment: 'positive' },
            { id: 'reflect_bad', label: "Just pile on more material — mass always wins.", nextNodeId: 'reflection_retry' }
        ]
    },

    'reflection_retry': {
        id: 'reflection_retry',
        speaker: 'AI',
        content: "Think again! The I-35W bridge was plenty heavy — it failed because force was **concentrated** at undersized connections. 💡\n\nGood engineering balances **material**, **geometry**, and **uncertainty**. More mass can help, but poor force pathways can still cause catastrophic failure.",
        options: [{ id: 'retry_to_feedback', label: "Understood — design is about force pathways, not just weight!", nextNodeId: 'reflection_feedback' }]
    },

    'reflection_feedback': {
        id: 'reflection_feedback',
        speaker: 'AI',
        content: "Excellent reasoning! 🌟 You're evaluating **systems**, not just components — and that's exactly how real structural engineers think.\n\nEvery bridge, building, and tower you see is a carefully designed network of **load paths**, **redundancy**, and **stress management**.",
        options: [{ id: 'finish', label: "Finish P17!", nextNodeId: 'complete' }]
    },

    'complete': {
        id: 'complete',
        speaker: 'AI',
        content: "🔗 **Cross-Links**\n- In **C17**, you'll discover the **material chemistry** behind why concrete handles **compression** while steel handles **tension** — and why combining them creates super-strong **reinforced concrete**!\n- In **B17**, you'll see how **bone architecture** is nature's version of efficient load-bearing design — hollow tubes with internal **trabecular bracing**! 🦴\n\n✅ **Lesson P17 Complete!**",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});

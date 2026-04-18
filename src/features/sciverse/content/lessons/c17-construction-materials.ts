import { DialogNode } from '../../types';

/**
 * C17 — Construction Materials
 * Big Idea 17: "How Do Structures Stay Standing?"
 * Scenario: Choosing materials for a building in harsh weather
 * Target Misconception: "One material works for everything"
 */
export const getC17Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Welcome to the Construction Materials Mixer! 🧱\n\nImagine you're building a bridge that must survive 50 years of rain, frost, heat waves, and heavy trucks. You need it to handle being **squeezed** (compression) AND **stretched** (tension) — all at once!\n\nWhy do engineers combine materials like **concrete** and **steel** instead of using just one \"perfect\" material?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', material: 'concrete' } },
        options: [
            { id: 'single_best', label: "There must be one super-material that does everything!", nextNodeId: 'misconception' },
            { id: 'combine', label: "Different materials handle different stress types — combining them covers more modes.", nextNodeId: 'correct', sentiment: 'positive' },
            { id: 'cost_only', label: "It's just about cost — cheaper materials are chosen regardless of mechanics.", nextNodeId: 'misconception_cost' }
        ]
    },

    'misconception': {
        id: 'misconception',
        speaker: 'AI',
        content: "That's the dream — but no such material exists! 🤔\n\nEvery material has trade-offs in the real world:\n- **Concrete** is amazing at resisting **compression** (squeezing) but terrible at **tension** (stretching) — it cracks!\n- **Steel** handles **tension** brilliantly but can **corrode** in moisture and is expensive in bulk\n- **Wood** is lightweight and renewable but **rots** in wet conditions and burns 🔥\n\nSo engineers create **composite** systems — combining materials so each one covers the other's weakness.\n\n**Fun fact:** Romans discovered this 2,000 years ago! They mixed volcanic ash into concrete, and some Roman structures are STILL standing today! 🏛️",
        options: [{ id: 'next', label: "Show me how concrete + steel work together!", nextNodeId: 'correct' }]
    },

    'misconception_cost': {
        id: 'misconception_cost',
        speaker: 'AI',
        content: "Cost matters, but it's not the only factor! A cheap bridge that collapses costs far more than a well-designed one. 💸\n\n**Lifecycle cost** includes:\n- 🔨 Initial construction\n- 🔧 Decades of **maintenance** and repair\n- ⚠️ **Failure risk** — a collapsed structure can cost lives\n- 🌧️ **Environmental exposure** — rain, frost, heat, salt\n\nEngineers optimize for the TOTAL picture, not just the upfront price tag. The right material in the right place saves money AND lives!",
        options: [{ id: 'next2', label: "So material design is multi-objective optimization!", nextNodeId: 'correct' }]
    },

    'correct': {
        id: 'correct',
        speaker: 'AI',
        content: "Exactly! Here's the chemistry behind it: 🔬\n\n- 🪨 **Concrete** = cement + water + aggregate → creates a hard crystalline matrix that resists **compression** (squeezing forces)\n- 🔩 **Steel rebar** = iron + carbon alloy → provides **tensile strength** (stretching forces) and **ductility** (bending without snapping)\n- Together they form **reinforced concrete** — the world's most-used construction material!\n\nThe **moisture** and **heat wave** indicators (\ud83d\udca7💨) in the visual show environmental stress. Watch how the **strength gauge** responds as you change material and conditions.\n\n**Did you know?** The Hoover Dam contains 3.25 million cubic meters of concrete. Without steel rebar, it would crumble under the water's pushing force! 🏗️",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'composite', showRebar: true } },
        options: [
            { id: 'checkpoint', label: "Test me with a checkpoint!", nextNodeId: 'checkpoint' },
            { id: 'experiment_first', label: "Let me test the material controls first.", nextNodeId: 'experiment_prompt' }
        ]
    },

    'experiment_prompt': {
        id: 'experiment_prompt',
        speaker: 'AI',
        content: "🔬 **Materials Lab Experiment:**\n\n1. Keep conditions fixed and compare **concrete**, **steel**, and **wood** baseline strength values\n2. Crank up **moisture** 💧 → which material degrades fastest? (Watch the blue droplets appear!)\n3. Raise **temperature** 🔥 → compare how heat affects each material differently\n\nPay attention to the **strength gauge** on the right side of the visual — it shows real-time material performance!\n\n**Hint:** Notice how moisture affects steel (rust/corrosion) differently than wood (rot/swelling).",
        options: [{ id: 'to_checkpoint', label: "I tested it — bring on the checkpoint!", nextNodeId: 'checkpoint' }]
    },

    'checkpoint': {
        id: 'checkpoint',
        speaker: 'AI',
        content: "⏸️ **Checkpoint — Think Like A Materials Engineer!**\n\nPicture a concrete beam sagging downward under a heavy load. The top gets squeezed shorter. The bottom gets stretched longer.\n\nWhere is **tensile stress** (stretching) usually highest?\n\n🔗 **Link to P17:** Load path design from P17 determines WHERE stress appears. Material chemistry from C17 determines HOW the material responds!",
        options: [
            { id: 'bottom', label: "The bottom — it's being stretched as the beam sags!", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
            { id: 'top', label: "The top side only.", nextNodeId: 'checkpoint_wrong' },
            { id: 'none', label: "Bending doesn't create different stress zones.", nextNodeId: 'checkpoint_wrong2' }
        ]
    },

    'checkpoint_wrong': {
        id: 'checkpoint_wrong',
        speaker: 'AI',
        content: "Almost! Think about what happens when you bend a ruler: 📏\n\n- The **top** (inside of the curve) gets **compressed** — squeezed shorter\n- The **bottom** (outside of the curve) gets **stretched** — pulled longer\n\nThat's why engineers place steel **rebar** at the BOTTOM of concrete beams — exactly where **tension** is highest. Concrete handles the compression on top; steel handles the tension on the bottom! 🔩",
        options: [{ id: 'retry', label: "Bottom tension explains steel rebar placement — clever!", nextNodeId: 'checkpoint_correct' }]
    },

    'checkpoint_wrong2': {
        id: 'checkpoint_wrong2',
        speaker: 'AI',
        content: "Actually, bending creates a beautiful **stress gradient**! 📊\n\nIn every bent beam there's a **neutral axis** in the middle where stress is zero. Above it: **compression**. Below it: **tension**.\n\nIgnoring these zones leads to putting reinforcement in the wrong place — like wearing a helmet on your elbow! 😄\n\nThis is why **material placement** matters as much as **material choice**.",
        options: [{ id: 'retry2', label: "Bending zones guide where each material should go!", nextNodeId: 'checkpoint_correct' }]
    },

    'checkpoint_correct': {
        id: 'checkpoint_correct',
        speaker: 'AI',
        content: "✅ **Perfect!** Now you understand why engineers don't just pick a material — they pick the right material for the right LOCATION in the structure. 🎯\n\n- **Concrete** goes where **compression** dominates (top of a sagging beam)\n- **Steel rebar** goes where **tension** dominates (bottom of a sagging beam)\n- **Coatings** protect where **moisture** and **corrosion** threaten\n\n**Chemistry + geometry = structural intelligence!**",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint', stressCase: 'bending' } },
        options: [
            { id: 'discovery', label: "Show me the big discovery!", nextNodeId: 'discovery' },
            { id: 'summary_now', label: "Show summary table first.", nextNodeId: 'summary_table' }
        ]
    },

    'discovery': {
        id: 'discovery',
        speaker: 'AI',
        content: "🎉 **Discovery: Construction Chemistry!**\n\n| Concept | What it means |\n|---------|---------------|\n| 🪨 **Compression** | Squeezing force — concrete excels here |\n| 🔩 **Tension** | Stretching force — steel rebar excels here |\n| 🏗️ **Reinforced concrete** | Combining materials for both stress modes |\n| 💧 **Corrosion** | Chemical degradation from moisture — steel's weakness |\n| 🔥 **Thermal stress** | Heat expansion/contraction that can crack materials |\n| ⚖️ **Lifecycle cost** | Total cost including maintenance, not just initial build |\n\n**Key Insight:** Construction chemistry is **design chemistry**. Material behavior must be mapped to **stress patterns**, **environmental exposure**, and **maintenance constraints**!",
        options: [
            { id: 'summary', label: "Show the lab data summary.", nextNodeId: 'summary_table' },
            { id: 'reflect', label: "Ask me reflection questions!", nextNodeId: 'reflection_questions' }
        ]
    },

    'summary_table': {
        id: 'summary_table',
        speaker: 'AI',
        content: "📊 **Lab Results Summary:**\n\n| **Material Factor** | **Design Meaning** | **What You Saw in the Lab** |\n|---|---|---|\n| 🪨 **Concrete** | Strong **compression** performance | High baseline when squeezed; cracked under tension |\n| 🔩 **Steel rebar** | Excellent **tensile** response and **ductility** | Supported bending zones where stretching was high |\n| 💧 **Moisture** | **Corrosion** and degradation risk | Higher moisture → dropping strength gauge |\n| 🔥 **Temperature** | **Thermal penalty** and expansion | High heat shifted material behavior |",
        options: [
            { id: 'reflect_after_table', label: "Now ask me reflection questions!", nextNodeId: 'reflection_questions' },
            { id: 'to_complete', label: "Wrap up C17.", nextNodeId: 'complete' }
        ]
    },

    'reflection_questions': {
        id: 'reflection_questions',
        speaker: 'AI',
        content: "🧠 **Think Like A Materials Designer**\n\n1. Why might the best material in a desert climate FAIL in a tropical rainforest? 🌴\n2. How do **moisture** and **temperature cycles** change the total cost of a 50-year building?\n3. Why does rebar **placement** matter as much as rebar **amount**?\n\n**Real-world connection:** The Millau Viaduct in France (world's tallest bridge) uses steel cables for tension and concrete towers for compression — each material doing what it does BEST! 🌉",
        options: [
            { id: 'reflect_good', label: "Environment, stress patterns, and lifecycle all drive smart material choices.", nextNodeId: 'reflection_feedback', sentiment: 'positive' },
            { id: 'reflect_bad', label: "Just pick the strongest material — context doesn't matter.", nextNodeId: 'reflection_retry' }
        ]
    },

    'reflection_retry': {
        id: 'reflection_retry',
        speaker: 'AI',
        content: "Think about steel in a saltwater environment — it's incredibly strong, but **corrosion** can eat through it in years without protection! 🌊\n\nGood engineering is always **contextual**. Materials, geometry, and environment must be considered together for structures that last decades.",
        options: [{ id: 'retry_to_feedback', label: "Understood — material + context = the real design!", nextNodeId: 'reflection_feedback' }]
    },

    'reflection_feedback': {
        id: 'reflection_feedback',
        speaker: 'AI',
        content: "Excellent! 🌟 You're evaluating **full-lifecycle performance**, not just initial strength numbers. That's real engineering thinking!\n\nEvery skyscraper, bridge, and dam you see represents thousands of chemistry decisions made to match materials to their exact stress and environmental conditions.",
        options: [{ id: 'finish', label: "Finish C17!", nextNodeId: 'complete' }]
    },

    'complete': {
        id: 'complete',
        speaker: 'AI',
        content: "🔗 **Cross-Links**\n- In **P17**, you saw how **load paths** and **geometry** determine WHERE stress appears in a structure — now you know HOW materials respond to it!\n- In **B17**, you'll discover how **bone** is nature's version of **reinforced concrete** — a hard mineral matrix reinforced with flexible **collagen** fibers! 🦴\n\n✅ **Lesson C17 Complete!**",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});

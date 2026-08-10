import { DialogNode } from '../../types';

/**
 * P18 - Rivers Shape Land
 * Big Idea 18: "How Do Rivers Shape the Land?"
 * Scenario: Why some bends erode while others deposit
 * Target Misconception: "River erosion is random"
 */
export const getP18Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Welcome to the River Channel Model! \ud83c\udf0a\n\nLook at ANY river on a map and you will see it curves and bends instead of flowing in a straight line. The Mississippi River, the Amazon, the Nile \u2014 all of them **meander** in huge S-shaped loops.\n\nHere\u2019s the puzzle: on one side of a river bend, the bank is being **eroded** (eaten away). On the other side, sand and gravel are being **deposited** (piled up). Why do some bends erode while others deposit?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', flowSpeed: 3, bend: 'moderate' } },
        options: [
            { id: 'random', label: "It\u2019s random \u2014 erosion just happens wherever it wants each season.", nextNodeId: 'misconception' },
            { id: 'speed', label: "Flow speed controls it! Fast water erodes, slow water deposits.", nextNodeId: 'correct', sentiment: 'positive' }
        ]
    },

    'misconception': {
        id: 'misconception',
        speaker: 'AI',
        content: "It might LOOK random from the surface, but there\u2019s actually a beautiful physics pattern underneath! \ud83d\udd0d\n\nWhen water flows around a bend:\n- The **outer bank** gets the FAST water (like a car on the outside of a turn)\n- The **inner bank** gets the SLOW water (sheltered inside the curve)\n\n**Fast water = erosion.** It has enough energy to rip particles from the bank.\n**Slow water = deposition.** It loses energy and drops its sediment.\n\nThis isn\u2019t random at all \u2014 it\u2019s **predictable physics** that geologists use to map river changes decades in advance! \ud83d\uddfa\ufe0f",
        options: [{ id: 'continue', label: "Fast outside, slow inside \u2014 that\u2019s why rivers meander!", nextNodeId: 'correct' }]
    },

    'correct': {
        id: 'correct',
        speaker: 'AI',
        content: "Exactly! \ud83c\udfaf Here\u2019s the key physics:\n\n- \u2b06\ufe0f **Fast flow** lifts and carries particles \u2014 this is **erosion**\n- \u2b07\ufe0f **Slow flow** drops particles \u2014 this is **deposition**\n- \ud83d\udd04 **Outer bends** erode (fast water cuts the bank)\n- \ud83c\udfd6\ufe0f **Inner bends** deposit (slow water drops sediment \u2014 forming **point bars**)\n\nIn the visual, you can see terrain tilting with the **slope** slider, eroded zones marked in yellow, and flowing current arrows showing water speed.\n\nUse the **Terrain Slope** slider to change how steep the landscape is \u2014 steeper = faster flow = MORE erosion! \u26a1\n\n**Fun fact:** The Grand Canyon was carved by the Colorado River over 5-6 MILLION years of erosion \u2014 one grain of sand at a time! \ud83c\udfdc\ufe0f",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'transport', showVelocityBands: true } },
        options: [
            { id: 'checkpoint', label: "Test me with a checkpoint!", nextNodeId: 'checkpoint' },
            { id: 'experiment_first', label: "Let me play with the slope and flow controls first.", nextNodeId: 'experiment_prompt' }
        ]
    },

    'experiment_prompt': {
        id: 'experiment_prompt',
        speaker: 'AI',
        content: "\ud83d\udd2c **River Physics Experiment:**\n\n1. Set **slope** high \u2192 watch how erosion zones (yellow) expand and current arrows speed up\n2. Set **slope** low \u2192 see deposition increase and sediment load grow at the river bed\n3. Check the **RIVER SUMMARY** box below the sun \u2014 it shows real-time data for flow, slope, sediment, and erosion\n\n**Prediction challenge:** Before moving the slider, predict whether erosion or deposition will dominate. Then check! \ud83e\udde0",
        options: [{ id: 'to_checkpoint', label: "I tested it \u2014 bring on the checkpoint!", nextNodeId: 'checkpoint' }]
    },

    'checkpoint': {
        id: 'checkpoint',
        speaker: 'AI',
        content: "\u23f8\ufe0f **Checkpoint \u2014 Think Like A Geologist!**\n\nA major flood doubles the river\u2019s speed overnight. What happens to the **sediment**?\n\n\ud83d\udd17 **Link to C18:** The chemistry of dissolved minerals in flood water also changes \u2014 faster flow dissolves MORE rock!",
        options: [
            { id: 'carry_more', label: "The river carries LARGER particles downstream \u2014 flood power increases transport!", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
            { id: 'carry_less', label: "The river drops all its particles immediately.", nextNodeId: 'checkpoint_wrong' }
        ]
    },

    'checkpoint_wrong': {
        id: 'checkpoint_wrong',
        speaker: 'AI',
        content: "Think again! Faster water has MORE energy, not less. \ud83d\udca8\n\nWhen flow speed doubles, the river\u2019s carrying capacity increases dramatically \u2014 it can pick up particles that were too heavy before! Boulders that sat still for years get rolled downstream in floods.\n\n**Deposition** happens LATER, when the flood recedes and flow slows back down. That\u2019s why you find layers of sand and gravel where floodwaters finally lost their energy. \ud83c\udf0a",
        options: [{ id: 'retry', label: "Fast flow first carries, then deposition happens when it slows \u2014 got it!", nextNodeId: 'checkpoint_correct' }]
    },

    'checkpoint_correct': {
        id: 'checkpoint_correct',
        speaker: 'AI',
        content: "\u2705 **Exactly!** Flow energy decides when sediment is picked up versus dropped.\n\nGeologists call this the **Hjulstr\u00f6m curve** \u2014 it predicts exactly which particle sizes a river can **erode**, **transport**, or **deposit** at any given speed.\n\n**Did you know?** After the 2011 Mississippi River floods, satellite images showed NEW islands and sandbars created by massive sediment deposits! \ud83d\udef0\ufe0f\ud83c\udfd6\ufe0f",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint', flood: true } },
        options: [
            { id: 'discovery', label: "Show me the big discovery!", nextNodeId: 'discovery' },
            { id: 'summary_now', label: "Show summary table first.", nextNodeId: 'summary_table' }
        ]
    },

    'discovery': {
        id: 'discovery',
        speaker: 'AI',
        content: "\ud83c\udf89 **Discovery: Rivers as Landscape Sculptors!**\n\n| Concept | What it means |\n|---------|---------------|\n| \ud83c\udf0a **Erosion** | Fast water rips particles from banks and beds |\n| \ud83c\udfd6\ufe0f **Deposition** | Slow water drops sediment, building bars and deltas |\n| \ud83d\udd04 **Meanders** | S-curves that grow as outer banks erode and inner banks deposit |\n| \u26f0\ufe0f **Terrain slope** | Steeper gradient = faster flow = more erosive power |\n| \ud83d\udcca **Hjulstr\u00f6m curve** | Predicts which particles move at any flow speed |\n| \ud83c\udf0d **Floodplains** | Flat areas built from centuries of flood deposits |\n\n**Key Insight:** Rivers are **moving energy systems** that reshape landscapes by sorting sediment with speed. Fast outer-bend flow erodes; slow inner-bend flow deposits. Over time this creates **meanders**, **floodplains**, and **deltas**!",
        options: [
            { id: 'summary', label: "Show the lab data summary.", nextNodeId: 'summary_table' },
            { id: 'reflect', label: "Ask me reflection questions!", nextNodeId: 'reflection_questions' }
        ]
    },

    'summary_table': {
        id: 'summary_table',
        speaker: 'AI',
        content: "\ud83d\udcca **Lab Results Summary:**\n\n| **Factor** | **How It Works** | **What You Saw in the Lab** |\n|---|---|---|\n| \ud83c\udf0a **Flow speed** | Faster water lifts and carries larger particles | Higher slope \u2192 faster arrows \u2192 more erosion |\n| \u26f0\ufe0f **Terrain slope** | Steeper gradient increases flow **energy** | Raising slope increased sediment load |\n| \ud83d\udfe1 **Erosion zones** | Outer bends and steep reaches lose bank material | Yellow eroded faces appeared where flow was fastest |\n| \ud83c\udfd6\ufe0f **Deposition** | Inner bends and flat reaches accumulate sediment | Sediment settled where current arrows slowed |\n| \ud83e\udea8 **Sediment size** | Larger particles need faster flow to move | Fine silt travels farther than gravel |",
        options: [
            { id: 'reflect_after_table', label: "Now ask me reflection questions!", nextNodeId: 'reflection_questions' },
            { id: 'to_complete', label: "Wrap up P18.", nextNodeId: 'complete' }
        ]
    },

    'reflection_questions': {
        id: 'reflection_questions',
        speaker: 'AI',
        content: "\ud83e\udde0 **Think Like A Geologist**\n\n1. Why do rivers **meander** more over centuries instead of cutting straight lines? \ud83d\udd04\n2. After a **dam** is built upstream, what happens to sediment supply downstream?\n3. How could you predict where a flood will deposit the most material?\n\n**Real-world connection:** When the Aswan Dam was built on the Nile, Egypt\u2019s fertile floodplain stopped receiving annual sediment deposits \u2014 farmers now need artificial fertilizer instead of free river soil! \ud83c\udf3e",
        options: [
            { id: 'reflect_good', label: "Meanders grow because erosion on outer bends and deposition on inner bends shift the channel sideways!", nextNodeId: 'reflection_feedback', sentiment: 'positive' },
            { id: 'reflect_bad', label: "Rivers meander randomly with no predictable pattern.", nextNodeId: 'reflection_retry' }
        ]
    },

    'reflection_retry': {
        id: 'reflection_retry',
        speaker: 'AI',
        content: "Remember the physics! \ud83d\udd04\n\nFaster flow on the **outer bend** erodes the bank. Slower flow on the **inner bend** deposits sediment. This **feedback loop** pushes the curve further sideways with each flood cycle.\n\nOver centuries, small bends become huge meanders. Sometimes they even cut off entirely, forming **oxbow lakes**! \ud83d\udca7",
        options: [{ id: 'retry_to_feedback', label: "Erosion and deposition create a self-reinforcing feedback loop!", nextNodeId: 'reflection_feedback' }]
    },

    'reflection_feedback': {
        id: 'reflection_feedback',
        speaker: 'AI',
        content: "Excellent reasoning! \ud83c\udf1f You\u2019re connecting **flow dynamics** to **long-term landscape change** \u2014 exactly how geomorphologists think.\n\nEvery river valley, canyon, and delta on Earth was sculpted by this same physics over millions of years! \ud83c\udf0d",
        options: [{ id: 'finish', label: "Finish P18!", nextNodeId: 'complete' }]
    },

    'complete': {
        id: 'complete',
        speaker: 'AI',
        content: "\ud83d\udd17 **Cross-Links**\n- In **C18**, you\u2019ll discover the **invisible chemistry** of rivers \u2014 how water dissolves rock and carries **ions** even when it looks crystal clear! \ud83e\uddea\n- In **B18**, you\u2019ll see how river **flow patterns** create distinct habitats where different species thrive! \ud83d\udc1f\n\n\u2705 **Lesson P18 Complete!**",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});

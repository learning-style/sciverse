import { DialogNode } from '../../types';

/**
 * P19 - Soil Supports Life
 * Big Idea 19: "How Does Soil Support Life?"
 * Scenario: How soil porosity affects water movement
 * Target Misconception: "Soil is just dirt"
 */
export const getP19Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Welcome to the Soil Physics Lab! \ud83c\udf31\n\nGrab a handful of soil. It looks like plain old dirt, right? But zoom in 1000\u00d7 and you\u2019d see a hidden world of **pores** \u2014 tiny air-filled spaces between particles that control EVERYTHING about how soil works.\n\n**Porosity** is the fraction of soil volume that\u2019s empty space. Sandy soil has LARGE pores between big grains. \ud83c\udfd6\ufe0f Clay soil has TINY pores between microscopic plates. \ud83e\uddf1\n\nHere\u2019s the key question: if you pour a glass of water on each type, which one drains faster?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', soilType: 'loam' } },
        options: [
            { id: 'clay_fast', label: "Clay \u2014 it has smaller particles packed tighter, so water squeezes through the tiny gaps faster!", nextNodeId: 'misconception' },
            { id: 'sand_fast', label: "Sand \u2014 larger pores let water flow through more easily even though there are fewer of them!", nextNodeId: 'correct', sentiment: 'positive' }
        ]
    },

    'misconception': {
        id: 'misconception',
        speaker: 'AI',
        content: "Great reasoning, but it\u2019s actually the opposite! \ud83e\udd14\n\nYes, clay has MORE total pore space than sand (higher **porosity**), but those pores are SO tiny that water molecules get STUCK. The water clings to clay particle surfaces through **surface tension** and **capillary forces**.\n\nThink of it like this:\n- \ud83c\udfd6\ufe0f **Sand pores** = highway tunnels \u2014 water zooms right through\n- \ud83e\uddf1 **Clay pores** = drinking straws \u2014 water barely moves due to friction\n\nThe physics term is **permeability** \u2014 how easily water flows through a material. Sand has LOW porosity but HIGH permeability. Clay has HIGH porosity but LOW permeability.\n\n**Fun fact:** This is why construction sites use clay liners under landfills \u2014 water (and pollutants) can\u2019t get through! \ud83d\udea7",
        options: [{ id: 'continue', label: "Porosity \u2260 permeability \u2014 pore SIZE matters more than total space!", nextNodeId: 'correct' }]
    },

    'correct': {
        id: 'correct',
        speaker: 'AI',
        content: "Exactly right! \ud83c\udfaf The key insight is that **porosity** and **permeability** are DIFFERENT things:\n\n- \ud83d\udcca **Porosity** = total empty space (% of volume that\u2019s air/water)\n- \ud83c\udf0a **Permeability** = how easily water flows through (depends on pore SIZE and connectivity)\n\nIn the visual, you can see soil particles with pore spaces between them. The **Density** slider changes how tightly packed the particles are. Watch how water **saturation** and **drainage** change!\n\n- \ud83c\udfd6\ufe0f **Sandy soil**: Large, connected pores \u2192 high permeability \u2192 fast drainage\n- \ud83e\uddf1 **Clay soil**: Tiny, disconnected pores \u2192 low permeability \u2192 slow drainage\n- \ud83c\udf3e **Loam** (the best!): A MIX of sand, silt, and clay \u2014 drains well but holds enough water for plants\n\n**Did you know?** Farmers pay thousands of dollars for soil permeability testing because it determines which crops can grow! \ud83c\udf3d",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'pores', showWaterFlow: true } },
        options: [
            { id: 'experiment', label: "Let me experiment with the density slider!", nextNodeId: 'experiment_prompt' },
            { id: 'checkpoint', label: "Test me with a checkpoint!", nextNodeId: 'checkpoint' }
        ]
    },

    'experiment_prompt': {
        id: 'experiment_prompt',
        speaker: 'AI',
        content: "\ud83d\udd2c **Soil Permeability Experiment:**\n\n1. Set **Density** LOW \u2192 particles spread apart, big pores, fast drainage (like sand)\n2. Set **Density** HIGH \u2192 particles packed tight, tiny pores, slow drainage (like clay)\n3. Watch the **saturation zone** \u2014 clay soil stays waterlogged much longer!\n\n**Prediction challenge:** At what density does water start pooling on the surface instead of draining through? This is the **infiltration limit** \u2014 above it, you get puddles and runoff! \ud83d\udca7",
        options: [{ id: 'to_checkpoint', label: "I see how pore size controls drainage \u2014 bring on the checkpoint!", nextNodeId: 'checkpoint' }]
    },

    'checkpoint': {
        id: 'checkpoint',
        speaker: 'AI',
        content: "\u23f8\ufe0f **Checkpoint \u2014 Think Like A Soil Scientist!**\n\nAfter a heavy rainstorm, one farmer\u2019s field drains in 30 minutes while the neighbor\u2019s stays flooded for 2 days. \ud83c\udf27\ufe0f\n\nWhat\u2019s the most likely difference between their soils?\n\n\ud83d\udd17 **Link to C19:** The chemistry of what\u2019s dissolved in soil water affects plant growth even more than drainage!",
        options: [
            { id: 'permeability', label: "The first field has sandier soil with higher permeability \u2014 bigger pores drain faster!", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
            { id: 'more_rain', label: "The second field just got more rain.", nextNodeId: 'checkpoint_wrong' }
        ]
    },

    'checkpoint_wrong': {
        id: 'checkpoint_wrong',
        speaker: 'AI',
        content: "They\u2019re neighbors \u2014 they got the same rain! \ud83c\udf27\ufe0f\n\nThe difference is in the SOIL. **Clay-heavy soil** has low permeability: water infiltrates slowly and pools on the surface. **Sandy soil** drains quickly through its large, connected pores.\n\nThis is why soil mapping is SO important for agriculture:\n- Fields with clay need **drainage tiles** (underground pipes) to prevent waterlogging\n- Fields with sand may need **irrigation** because water drains away too fast\n\n**Real example:** The Netherlands has built an entire nation on clay soils, using an elaborate system of **polders** (drained land) and **dikes** to manage water! \ud83c\uddf3\ud83c\uddf1",
        options: [{ id: 'retry', label: "Soil permeability \u2014 not rainfall amount \u2014 controls drainage speed!", nextNodeId: 'checkpoint_correct' }]
    },

    'checkpoint_correct': {
        id: 'checkpoint_correct',
        speaker: 'AI',
        content: "\u2705 **Perfect!** Soil **permeability** is the key factor controlling field drainage.\n\nSoil scientists classify soils into **textural classes** (sand, sandy loam, silt loam, clay loam, clay) based on their mix of particle sizes. Each class has predictable permeability \u2014 and therefore predictable drainage behavior.\n\n**Fun fact:** NASA uses satellite radar to measure soil moisture from SPACE! The SMAP satellite maps global soil water content every 2-3 days to help predict droughts and floods! \ud83d\udef0\ufe0f\ud83c\udf0d",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint', showDrainage: true } },
        options: [
            { id: 'discovery', label: "Show me the big discovery!", nextNodeId: 'discovery' },
            { id: 'summary_now', label: "Show summary table first.", nextNodeId: 'summary_table' }
        ]
    },

    'discovery': {
        id: 'discovery',
        speaker: 'AI',
        content: "\ud83c\udf89 **Discovery: Soil is A Hidden Engineering System!**\n\n| Concept | What it means |\n|---------|---------------|\n| \ud83d\udcca **Porosity** | Fraction of soil that\u2019s empty space (air + water) |\n| \ud83c\udf0a **Permeability** | How easily water flows through (depends on pore SIZE) |\n| \ud83c\udfd6\ufe0f **Sand** | Large particles, big pores \u2192 high permeability |\n| \ud83e\uddf1 **Clay** | Tiny particles, micro-pores \u2192 low permeability |\n| \ud83c\udf3e **Loam** | Balanced mix \u2192 ideal for plant roots |\n| \ud83d\udca7 **Infiltration** | Rate water enters soil from the surface |\n| \ud83d\udeb0 **Capillary action** | Water clinging and rising through tiny pores |\n\n**Key Insight:** Soil isn\u2019t just \u201cdirt\u201d \u2014 it\u2019s a **porous medium** where particle size controls water storage, drainage, aeration, and root growth. The physics of **pore space** determines whether land floods, drains, or supports life!",
        options: [
            { id: 'summary', label: "Show the lab data summary.", nextNodeId: 'summary_table' },
            { id: 'reflect', label: "Ask me reflection questions!", nextNodeId: 'reflection_questions' }
        ]
    },

    'summary_table': {
        id: 'summary_table',
        speaker: 'AI',
        content: "\ud83d\udcca **Lab Results Summary:**\n\n| **Soil Type** | **Porosity** | **Permeability** | **Drainage Speed** |\n|---|---|---|---|\n| \ud83c\udfd6\ufe0f **Sand** | ~35-40% | \u2b06\ufe0f High | Fast (minutes) |\n| \ud83c\udf3e **Loam** | ~45-50% | \u2194\ufe0f Medium | Moderate (hours) |\n| \ud83e\uddf1 **Clay** | ~50-60% | \u2b07\ufe0f Low | Slow (days) |\n\n| **Density Setting** | **Pore Size** | **What You Observed** |\n|---|---|---|\n| Low density | Large pores | Water drained quickly, low saturation |\n| Medium density | Mixed pores | Balanced drainage and retention |\n| High density | Micro-pores | Water pooled, high saturation, slow drain |",
        options: [
            { id: 'reflect_after_table', label: "Now ask me reflection questions!", nextNodeId: 'reflection_questions' },
            { id: 'to_complete', label: "Wrap up P19.", nextNodeId: 'complete' }
        ]
    },

    'reflection_questions': {
        id: 'reflection_questions',
        speaker: 'AI',
        content: "\ud83e\udde0 **Think Like A Soil Physicist**\n\n1. Why do gardeners add **compost** to clay soil? What does it do to pore structure? \ud83c\udf3f\n2. Why do desert cacti grow in sandy soil but most vegetables prefer loam?\n3. How could **compaction** from heavy machinery destroy farmland productivity?\n\n**Real-world connection:** In California\u2019s Central Valley, decades of heavy irrigation compacted clay subsoil so severely that some areas sank over 8 meters! This \u201c**land subsidence**\u201d cracked roads, broke aqueducts, and permanently reduced the soil\u2019s ability to store water. \ud83d\ude9c",
        options: [
            { id: 'reflect_good', label: "Compost creates larger pore spaces in clay, improving both drainage and root penetration!", nextNodeId: 'reflection_feedback', sentiment: 'positive' },
            { id: 'reflect_bad', label: "Compost just adds nutrients \u2014 it doesn\u2019t change pore structure.", nextNodeId: 'reflection_retry' }
        ]
    },

    'reflection_retry': {
        id: 'reflection_retry',
        speaker: 'AI',
        content: "Nutrients are a bonus, but the MAIN effect is physical! \ud83c\udf3f\n\n**Compost** adds organic matter that acts as a **structural scaffold** between clay particles. It:\n- Creates LARGER pore channels for water and air \ud83d\udca8\n- Prevents clay plates from sticking together and forming impermeable layers\n- Improves **aggregate structure** \u2014 clumps of particles with pores between them\n\nResult: better drainage, more oxygen, easier root growth. That\u2019s why garden centers sell compost by the truckload! \ud83d\ude9a",
        options: [{ id: 'retry_to_feedback', label: "Compost changes pore structure, not just chemistry \u2014 it\u2019s a physical improvement!", nextNodeId: 'reflection_feedback' }]
    },

    'reflection_feedback': {
        id: 'reflection_feedback',
        speaker: 'AI',
        content: "Excellent reasoning! \ud83c\udf1f You\u2019re thinking about soil as a **physical system** where particle arrangement controls everything \u2014 from drainage to root growth to crop yield.\n\nSoil physicists use CT scanners (like hospital MRIs!) to create 3D maps of pore networks inside soil samples. The physics of soil pores is literally the foundation of all terrestrial life! \ud83c\udf0d",
        options: [{ id: 'finish', label: "Finish P19!", nextNodeId: 'complete' }]
    },

    'complete': {
        id: 'complete',
        speaker: 'AI',
        content: "\ud83d\udd17 **Cross-Links**\n- In **C19**, you\u2019ll discover the **chemical nutrients** dissolved in soil water \u2014 nitrogen, phosphorus, potassium \u2014 and how pH controls their availability to roots! \ud83e\uddea\n- In **B19**, you\u2019ll explore the incredible **biodiversity** hidden in soil \u2014 more organisms live in a teaspoon of healthy soil than there are people on Earth! \ud83d\udc1b\n\n\u2705 **Lesson P19 Complete!**",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});

import { DialogNode } from '../../types';

/**
 * B18 - River Habitats
 * Big Idea 18: "How Do Rivers Shape the Land?"
 * Scenario: How flow speed creates unique habitats
 * Target Misconception: "Fish live anywhere in a river"
 */
export const getB18Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Welcome to the River Ecology Lab! \ud83d\udc1f\n\nImagine snorkeling down a river from its mountain headwaters to the wide, slow estuary where it meets the sea. You\u2019d see COMPLETELY different animals at each point!\n\nNear the top: **trout** and **mayfly larvae** clinging to rocks in freezing rapids. \u2744\ufe0f\nIn the middle: **bass** and **crayfish** cruising between boulders. \ud83e\udde9\nNear the bottom: **catfish** and **mussels** in warm, silty water. \u2600\ufe0f\n\n\ud83e\udd14 Why can\u2019t a trout just swim downstream and live in the warm, slow section?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', flowSpeed: 3 } },
        options: [
            { id: 'anywhere', label: "Fish can live anywhere in a river \u2014 they just prefer certain spots.", nextNodeId: 'misconception' },
            { id: 'adapted', label: "Each species is adapted to specific flow, oxygen, and temperature conditions!", nextNodeId: 'correct', sentiment: 'positive' }
        ]
    },

    'misconception': {
        id: 'misconception',
        speaker: 'AI',
        content: "It seems like fish should be able to just swim somewhere else, but they physically CAN\u2019T survive outside their zone! \ud83d\udeab\n\nHere\u2019s why: each species is **adapted** to a narrow range of conditions:\n\n- \ud83c\udf21\ufe0f **Temperature**: Trout need water below ~20\u00b0C. Above that, they literally can\u2019t extract enough **oxygen** through their gills.\n- \ud83c\udf0a **Flow speed**: Mayfly larvae have flat bodies and hooks to grip rocks in rapids. In slow water, they\u2019d be outcompeted by species that don\u2019t need those adaptations.\n- \ud83d\udca8 **Dissolved oxygen**: Fast-flowing water absorbs more oxygen from the air. Slow, warm water holds LESS oxygen.\n\nMoving a trout to warm, slow water is like moving a polar bear to the Sahara! \ud83d\udc3b\u200d\u2744\ufe0f\u2192\ud83c\udfdc\ufe0f",
        options: [{ id: 'continue', label: "Each species has a specific habitat window \u2014 they can\u2019t just go anywhere!", nextNodeId: 'correct' }]
    },

    'correct': {
        id: 'correct',
        speaker: 'AI',
        content: "Exactly! \ud83c\udfaf A river is like a long corridor of DIFFERENT habitats:\n\n- \u26a1 **Headwaters** (fast, cold, high O\u2082): Trout, stoneflies, mosses \u2014 adapted to turbulence\n- \ud83c\udf0a **Mid-reach** (moderate flow, variable temp): Bass, dragonflies, water plants \u2014 versatile hunters\n- \ud83c\udfd6\ufe0f **Lowlands** (slow, warm, low O\u2082): Catfish, mussels, algae mats \u2014 adapted to still, murky conditions\n\nIn the visual, the blue wavy lines show **flow current** direction and speed. The \u201cFlow X% \u2192\u201d label tells you how fast the current is moving. Different fish icons appear in different zones based on flow conditions!\n\n**Fun fact:** Salmon are one of the very few fish that travel the ENTIRE river \u2014 born in cold headwaters, they migrate to the ocean, then return upstream to spawn! They literally fight the current for hundreds of miles! \ud83d\udc1f\u27a1\ufe0f\ud83c\udf0a",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'zones', showFlowLabel: true } },
        options: [
            { id: 'experiment', label: "Let me adjust the flow and see what changes!", nextNodeId: 'experiment_prompt' },
            { id: 'checkpoint', label: "Test me with a checkpoint!", nextNodeId: 'checkpoint' }
        ]
    },

    'experiment_prompt': {
        id: 'experiment_prompt',
        speaker: 'AI',
        content: "\ud83d\udd2c **Habitat Zone Experiment:**\n\n1. Set **Flow** HIGH \u2192 see which species appear near the fast rapids section (blue lines intensify)\n2. Set **Flow** LOW \u2192 watch slow-water species take over (blue lines weaken)\n3. Notice how **dissolved oxygen** changes with flow speed \u2014 faster flow = more O\u2082\n\n**Prediction challenge:** If you set flow to MAXIMUM, which habitat zone dominates the river? What species would you expect? \ud83e\udde0",
        options: [{ id: 'to_checkpoint', label: "I see the zone changes \u2014 bring on the checkpoint!", nextNodeId: 'checkpoint' }]
    },

    'checkpoint': {
        id: 'checkpoint',
        speaker: 'AI',
        content: "\u23f8\ufe0f **Checkpoint \u2014 Think Like A River Ecologist!**\n\nA factory dumps warm water into a cool, fast-flowing stream. \ud83c\udfed What would happen to the trout population?\n\n\ud83d\udd17 **Link to C18:** The dissolved mineral chemistry changes with temperature too \u2014 warm water dissolves different amounts of minerals!",
        options: [
            { id: 'trout_die', label: "Trout would decline or die \u2014 warm water holds less dissolved oxygen, and trout need cold, oxygen-rich water!", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
            { id: 'trout_fine', label: "Trout would be fine \u2014 they\u2019d just adapt to the warmer water.", nextNodeId: 'checkpoint_wrong' }
        ]
    },

    'checkpoint_wrong': {
        id: 'checkpoint_wrong',
        speaker: 'AI',
        content: "Fish can\u2019t adapt that quickly! \ud83d\udea8 Evolutionary **adaptation** takes generations (thousands of years), but the factory\u2019s warm water arrives in days.\n\nHere\u2019s the lethal chain:\n1. \ud83c\udf21\ufe0f **Temperature rises** above trout tolerance (~20\u00b0C)\n2. \ud83d\udca8 **Dissolved oxygen drops** (warm water holds less O\u2082)\n3. \ud83d\udc1f **Trout gills** can\u2019t extract enough oxygen \u2192 stress, disease, death\n\nThis is called **thermal pollution** \u2014 one of the most common threats to river ecosystems worldwide. \ud83c\udf0d",
        options: [{ id: 'retry', label: "Thermal pollution kills cold-adapted species by reducing oxygen!", nextNodeId: 'checkpoint_correct' }]
    },

    'checkpoint_correct': {
        id: 'checkpoint_correct',
        speaker: 'AI',
        content: "\u2705 **Exactly!** You identified the core problem: **thermal pollution** disrupts the delicate relationship between temperature, dissolved oxygen, and species survival.\n\nPower plants and factories that discharge warm water often have to build **cooling towers** or **retention ponds** to let the water cool before it enters the river. \ud83c\udfed\n\n**Did you know?** The Clean Water Act (1972) requires monitoring of river temperatures at thousands of points across the U.S. \u2014 specifically to protect cold-water fish like trout and salmon! \ud83d\udcdc",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint', thermalStress: true } },
        options: [
            { id: 'discovery', label: "Show me the big discovery!", nextNodeId: 'discovery' },
            { id: 'summary_now', label: "Show summary table first.", nextNodeId: 'summary_table' }
        ]
    },

    'discovery': {
        id: 'discovery',
        speaker: 'AI',
        content: "\ud83c\udf89 **Discovery: Rivers are Habitat Corridors!**\n\n| Zone | Conditions | Key Species |\n|------|-----------|-------------|\n| \u26a1 **Headwaters** | Cold, fast, high O\u2082 | Trout, stoneflies, mosses |\n| \ud83c\udf0a **Mid-reach** | Moderate flow + temp | Bass, dragonflies, crayfish |\n| \ud83c\udfd6\ufe0f **Lowlands** | Warm, slow, low O\u2082 | Catfish, mussels, algae |\n| \ud83c\udf0d **Estuary** | Brackish, tidal | Shrimp, mullet, mangroves |\n\n| Stress Factor | Habitat Effect |\n|--------------|----------------|\n| \ud83c\udf21\ufe0f **Thermal pollution** | Drives out cold-water species |\n| \ud83c\udfed **Nutrient runoff** | Algal blooms deplete O\u2082 (eutrophication) |\n| \ud83d\udea7 **Dams** | Block fish migration corridors |\n\n**Key Insight:** Rivers are not uniform habitats \u2014 they\u2019re **gradients** of temperature, flow, oxygen, and substrate. Each zone supports a unique **community** of organisms adapted to those exact conditions!",
        options: [
            { id: 'summary', label: "Show the lab data summary.", nextNodeId: 'summary_table' },
            { id: 'reflect', label: "Ask me reflection questions!", nextNodeId: 'reflection_questions' }
        ]
    },

    'summary_table': {
        id: 'summary_table',
        speaker: 'AI',
        content: "\ud83d\udcca **Lab Results Summary:**\n\n| **Variable** | **Ecological Effect** | **What You Saw** |\n|---|---|---|\n| \ud83c\udf0a **Flow speed** | Determines which species survive in each zone | Blue current lines showed flow intensity |\n| \ud83c\udf21\ufe0f **Temperature** | Cold-adapted vs warm-adapted species | Higher temp shifted species composition |\n| \ud83d\udca8 **Dissolved O\u2082** | Controlled by flow + temperature | Fast cold water = high O\u2082 = trout habitat |\n| \ud83d\udc1f **Species zonation** | Headwater \u2192 mid \u2192 lowland communities | Different fish icons appeared per zone |",
        options: [
            { id: 'reflect_after_table', label: "Now ask me reflection questions!", nextNodeId: 'reflection_questions' },
            { id: 'to_complete', label: "Wrap up B18.", nextNodeId: 'complete' }
        ]
    },

    'reflection_questions': {
        id: 'reflection_questions',
        speaker: 'AI',
        content: "\ud83e\udde0 **Think Like A River Ecologist**\n\n1. Why do river **restoration** projects often focus on planting trees along riverbanks? \ud83c\udf33\n2. If climate change warms mountain streams by 3\u00b0C, what happens to trout populations?\n3. Why do **dams** affect fish populations even if they don\u2019t change water chemistry?\n\n**Real-world connection:** Removing the Elwha Dam in Washington state (2011-2014) allowed salmon to return to 70 miles of river they hadn\u2019t accessed in over 100 years. Within 3 years, the salmon population surged! \ud83d\udc1f\ud83c\udf1f",
        options: [
            { id: 'reflect_good', label: "Trees shade the water, keeping it cool \u2014 protecting cold-water species from thermal stress!", nextNodeId: 'reflection_feedback', sentiment: 'positive' },
            { id: 'reflect_bad', label: "Trees are just for preventing erosion, not habitat.", nextNodeId: 'reflection_retry' }
        ]
    },

    'reflection_retry': {
        id: 'reflection_retry',
        speaker: 'AI',
        content: "Erosion control is ONE benefit, but there\u2019s a bigger one! \ud83c\udf33\n\n**Riparian vegetation** (streamside trees and plants) provides critical **shade** that keeps water temperatures cool. Studies show that removing streamside trees can raise water temperature by 5-10\u00b0C \u2014 enough to make the habitat uninhabitable for trout!\n\nTrees also:\n- Drop **leaf litter** that feeds invertebrates (trout food!) \ud83c\udf42\n- Provide **root structure** that creates hiding spots \ud83e\udeb5\n- Filter **runoff** before it reaches the stream \ud83d\udca7",
        options: [{ id: 'retry_to_feedback', label: "Shade, food, shelter, and filtration \u2014 trees are essential river habitat!", nextNodeId: 'reflection_feedback' }]
    },

    'reflection_feedback': {
        id: 'reflection_feedback',
        speaker: 'AI',
        content: "Brilliant ecological thinking! \ud83c\udf1f\n\nYou\u2019re connecting **physical habitat variables** (temperature, shade, current) to **biological outcomes** (species survival, community structure). This is exactly how conservation biologists design river restoration projects! \ud83c\udf0d\n\n**Key takeaway:** Protecting river life means protecting the PHYSICAL conditions that species depend on.",
        options: [{ id: 'finish', label: "Finish B18!", nextNodeId: 'complete' }]
    },

    'complete': {
        id: 'complete',
        speaker: 'AI',
        content: "\ud83d\udd17 **Cross-Links**\n- In **P18**, you saw how **flow physics** creates different erosion and deposition zones \u2014 those same zones create different habitats! \ud83c\udf0a\n- In **C18**, you measured **dissolved minerals** \u2014 the chemical foundation that supports aquatic food webs! \ud83e\uddea\n\n\u2705 **Lesson B18 Complete!**",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});

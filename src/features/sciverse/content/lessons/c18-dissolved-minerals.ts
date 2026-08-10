import { DialogNode } from '../../types';

/**
 * C18 - Dissolved Minerals
 * Big Idea 18: "How Do Rivers Shape the Land?"
 * Scenario: What\u2019s really dissolved in river water?
 * Target Misconception: "Clear water has nothing in it"
 */
export const getC18Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Welcome to the River Chemistry Lab! \ud83e\uddea\n\nHold up a glass of perfectly CLEAR river water. It looks pure, right? But there\u2019s an invisible world inside that glass \u2014 **dissolved minerals**, **ions**, and **salts** that you can\u2019t see.\n\nEvery river on Earth is a natural chemistry experiment: water dissolves rock as it flows, picking up **calcium**, **magnesium**, **bicarbonate**, and dozens of other **dissolved solids**.\n\n\ud83e\udd14 How would YOU test whether clear water has invisible chemicals in it?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', dissolvedLevel: 0.3 } },
        options: [
            { id: 'taste', label: "Taste it \u2014 pure water has no flavor, so any taste means something\u2019s there!", nextNodeId: 'misconception' },
            { id: 'conductivity', label: "Use an electrical conductivity meter \u2014 dissolved ions carry current!", nextNodeId: 'correct', sentiment: 'positive' }
        ]
    },

    'misconception': {
        id: 'misconception',
        speaker: 'AI',
        content: "Tasting random water is NEVER safe in a lab! \u26a0\ufe0f But the instinct isn\u2019t bad \u2014 mineral water DOES taste different because of dissolved ions.\n\nThe scientific method is better: **electrical conductivity**! \ud83d\udd0c\n\nPure distilled water doesn\u2019t conduct electricity well. But water with **dissolved ions** (like Ca\u00b2\u207a, Mg\u00b2\u207a, Na\u207a, Cl\u207b) acts like a wire \u2014 the ions carry charge between electrodes.\n\nMore dissolved minerals = **higher conductivity** = more ions in solution!\n\n**Fun fact:** Tap water conducts electricity about 100\u00d7 better than pure distilled water because of dissolved minerals from the treatment plant! \ud83d\udca1",
        options: [{ id: 'continue', label: "Conductivity measures invisible ions \u2014 smart!", nextNodeId: 'correct' }]
    },

    'correct': {
        id: 'correct',
        speaker: 'AI',
        content: "Exactly right! \u26a1 Here\u2019s how river chemistry works:\n\n- \ud83e\udea8 **Chemical weathering**: Water slowly dissolves rock, releasing **ions** into solution\n- \ud83d\udd0c **Conductivity**: A probe measures how well water conducts electricity \u2014 more ions = higher reading\n- \ud83c\udf21\ufe0f **Temperature** affects dissolution: warmer water dissolves minerals faster\n- \ud83c\udf0a **Flow speed** matters too: faster flow exposes more fresh rock surface\n\nIn the visual, watch the **\u26a1 Conductivity** meter at the bottom \u2014 it changes as you adjust the **Minerals** slider! The molecules bouncing around in the water represent dissolved ions.\n\nThe blue bar is your **conductivity reading** \u2014 it rises as mineral concentration increases. \ud83d\udcca\n\n**Did you know?** The Dead Sea has conductivity 50\u00d7 higher than normal seawater because it\u2019s packed with dissolved salts! That\u2019s why you float so easily in it. \ud83c\udfca",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'dissolving', showConductivity: true } },
        options: [
            { id: 'experiment', label: "Let me experiment with the mineral slider!", nextNodeId: 'experiment_prompt' },
            { id: 'checkpoint', label: "Test me with a checkpoint!", nextNodeId: 'checkpoint' }
        ]
    },

    'experiment_prompt': {
        id: 'experiment_prompt',
        speaker: 'AI',
        content: "\ud83d\udd2c **Mineral Dissolution Experiment:**\n\n1. Slide **Minerals** to LOW \u2192 watch the conductivity meter drop and fewer molecules bounce around\n2. Slide **Minerals** to HIGH \u2192 conductivity rises, more dissolved particles appear\n3. Change **Temperature** \u2192 warmer water speeds up molecular motion and dissolves more rock\n\n**Prediction challenge:** What combination of settings will produce the HIGHEST conductivity reading? Try to max it out! \ud83c\udfc6",
        options: [{ id: 'to_checkpoint', label: "I found the max conductivity \u2014 bring on the checkpoint!", nextNodeId: 'checkpoint' }]
    },

    'checkpoint': {
        id: 'checkpoint',
        speaker: 'AI',
        content: "\u23f8\ufe0f **Checkpoint \u2014 Think Like A Hydrochemist!**\n\nTwo rivers meet at a **confluence**. River A drains limestone bedrock (\ud83e\udea8 soft, dissolves easily). River B drains granite bedrock (\ud83e\udea8 hard, resists dissolving).\n\nWhich river has HIGHER conductivity?\n\n\ud83d\udd17 **Link to P18:** The flow speed you explored in P18 also affects how much rock gets dissolved!",
        options: [
            { id: 'limestone', label: "River A (limestone) \u2014 limestone dissolves easily, releasing more Ca\u00b2\u207a and HCO\u2083\u207b ions!", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
            { id: 'granite', label: "River B (granite) \u2014 harder rock means more ions are forced out.", nextNodeId: 'checkpoint_wrong' }
        ]
    },

    'checkpoint_wrong': {
        id: 'checkpoint_wrong',
        speaker: 'AI',
        content: "Think about what \u201csofter\u201d rock means chemically! \ud83e\udea8\n\n**Limestone** (CaCO\u2083) is a **carbonate rock** \u2014 it dissolves readily in slightly acidic rainwater. The chemical equation:\n\nCaCO\u2083 + H\u2082O + CO\u2082 \u2192 Ca\u00b2\u207a + 2HCO\u2083\u207b\n\n**Granite** is made of quartz, feldspar, and mica \u2014 minerals that resist dissolution. It takes thousands of times longer to dissolve granite than limestone!\n\nThat\u2019s why cave systems (like Mammoth Cave \ud83e\uddeb) form in limestone regions \u2014 water literally dissolves the rock away.",
        options: [{ id: 'retry', label: "Limestone dissolves more easily, releasing more ions \u2014 higher conductivity!", nextNodeId: 'checkpoint_correct' }]
    },

    'checkpoint_correct': {
        id: 'checkpoint_correct',
        speaker: 'AI',
        content: "\u2705 **Perfect!** Bedrock type is one of the biggest controls on river chemistry.\n\n**Limestone rivers** are rich in **calcium** (Ca\u00b2\u207a) and **bicarbonate** (HCO\u2083\u207b) \u2014 often called \u201chard water\u201d because of all the dissolved calcium. This is why some areas get limescale buildup in pipes! \ud83d\udeb0\n\nGeochemists can tell what ROCKS a river flows through just by measuring its dissolved ion concentrations. It\u2019s like a chemical fingerprint! \ud83d\udd0d",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint', showIonLabels: true } },
        options: [
            { id: 'discovery', label: "Show me the big discovery!", nextNodeId: 'discovery' },
            { id: 'summary_now', label: "Show summary table first.", nextNodeId: 'summary_table' }
        ]
    },

    'discovery': {
        id: 'discovery',
        speaker: 'AI',
        content: "\ud83c\udf89 **Discovery: Every River is a Chemistry Experiment!**\n\n| Concept | What it means |\n|---------|---------------|\n| \ud83e\udea8 **Chemical weathering** | Water dissolves rock, releasing ions into solution |\n| \u26a1 **Conductivity** | Measures dissolved ionic concentration via electrical current |\n| \ud83e\uddea **Dissolved ions** | Ca\u00b2\u207a, Mg\u00b2\u207a, Na\u207a, Cl\u207b, HCO\u2083\u207b \u2014 invisible but measurable |\n| \ud83c\udf21\ufe0f **Temperature** | Warmer water dissolves minerals faster |\n| \ud83e\udea8 **Bedrock type** | Limestone releases more ions than granite |\n| \ud83d\udca7 **Hard vs soft water** | More Ca\u00b2\u207a/Mg\u00b2\u207a = \u201chard\u201d water (causes limescale) |\n\n**Key Insight:** Clear water isn\u2019t empty \u2014 it\u2019s a **dilute solution** of rock! The type and amount of dissolved minerals reveals the invisible chemistry of a river\u2019s entire journey.",
        options: [
            { id: 'summary', label: "Show the lab data summary.", nextNodeId: 'summary_table' },
            { id: 'reflect', label: "Ask me reflection questions!", nextNodeId: 'reflection_questions' }
        ]
    },

    'summary_table': {
        id: 'summary_table',
        speaker: 'AI',
        content: "\ud83d\udcca **Lab Results Summary:**\n\n| **Variable** | **Effect on Conductivity** | **What You Saw** |\n|---|---|---|\n| \ud83e\udea8 **Mineral concentration** | More minerals \u2192 more ions \u2192 higher \u26a1 reading | Raising slider increased blue conductivity bar |\n| \ud83c\udf21\ufe0f **Temperature** | Warmer \u2192 faster dissolution \u2192 more ions | Heat boosted molecular motion and conductivity |\n| \ud83c\udf0a **Flow speed** | Faster \u2192 fresher rock surfaces exposed \u2192 more dissolving | Combined with P18\u2019s flow model |\n| \ud83d\udca7 **Bedrock type** | Limestone > granite for ion release | Checkpoint reasoning confirmed |",
        options: [
            { id: 'reflect_after_table', label: "Now ask me reflection questions!", nextNodeId: 'reflection_questions' },
            { id: 'to_complete', label: "Wrap up C18.", nextNodeId: 'complete' }
        ]
    },

    'reflection_questions': {
        id: 'reflection_questions',
        speaker: 'AI',
        content: "\ud83e\udde0 **Think Like A Hydrochemist**\n\n1. Why do hot springs have MORE dissolved minerals than cold mountain streams? \ud83c\udf21\ufe0f\n2. If a city\u2019s tap water has very HIGH conductivity, what does that tell you about the source?\n3. How would **acid rain** (lower pH) change conductivity downstream?\n\n**Real-world connection:** The Flint, Michigan water crisis happened partly because the city switched water sources \u2014 the new source\u2019s chemistry was different enough to corrode lead pipes, dissolving toxic **lead ions** (Pb\u00b2\u207a) into drinking water! \ud83d\udea8",
        options: [
            { id: 'reflect_good', label: "Hot springs dissolve more minerals because higher temperature increases dissolution rate!", nextNodeId: 'reflection_feedback', sentiment: 'positive' },
            { id: 'reflect_bad', label: "Hot springs have the same minerals as cold ones, just warmer water.", nextNodeId: 'reflection_retry' }
        ]
    },

    'reflection_retry': {
        id: 'reflection_retry',
        speaker: 'AI',
        content: "Temperature is a key factor! \ud83c\udf21\ufe0f\n\nHigher **temperature** gives water molecules MORE kinetic energy. They collide harder and more often with rock surfaces, breaking chemical bonds faster.\n\nResult: hot water dissolves minerals at a much higher rate than cold water. That\u2019s why hot springs are often rich in **sulfur**, **silica**, and **calcium carbonate** \u2014 they\u2019ve had time and temperature to dissolve a lot of rock! \u267b\ufe0f",
        options: [{ id: 'retry_to_feedback', label: "Higher temperature = more kinetic energy = faster dissolution!", nextNodeId: 'reflection_feedback' }]
    },

    'reflection_feedback': {
        id: 'reflection_feedback',
        speaker: 'AI',
        content: "Outstanding chemistry reasoning! \ud83c\udf1f\n\nYou\u2019ve connected **temperature**, **dissolution kinetics**, and **conductivity** into a complete model of how water interacts with rock. This is exactly how environmental scientists monitor water quality worldwide! \ud83c\udf0d",
        options: [{ id: 'finish', label: "Finish C18!", nextNodeId: 'complete' }]
    },

    'complete': {
        id: 'complete',
        speaker: 'AI',
        content: "\ud83d\udd17 **Cross-Links**\n- In **P18**, you saw how **flow speed** shapes land physically \u2014 now you know it affects chemistry too! \ud83c\udf0a\n- In **B18**, you\u2019ll discover how dissolved minerals create different **habitats** for aquatic life! \ud83d\udc1f\n\n\u2705 **Lesson C18 Complete!**",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});

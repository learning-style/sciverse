import { DialogNode } from '../../types';

/**
 * C19 - Soil Chemistry
 * Big Idea 19: "How Does Soil Support Life?"
 * Scenario: How soil nutrients and pH control plant growth
 * Target Misconception: "Plants just need water and sunlight"
 */
export const getC19Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Welcome to the Soil Chemistry Lab! \ud83e\uddea\n\nAsk most people what plants need and they\u2019ll say \u201csunlight and water.\u201d But that\u2019s only HALF the story!\n\nPlant roots are actually **chemical scavengers** \u2014 they absorb **nitrogen** (N), **phosphorus** (P), **potassium** (K), and dozens of other **mineral nutrients** dissolved in soil water. Without these invisible chemicals, even perfectly watered plants in full sun will turn yellow and die. \ud83c\udf3f\u2192\ud83c\udf42\n\nLook at the visual \u2014 you can see green **nitrogen** (\u25c7 N) diamonds and orange **salt** (\u25cb S) circles floating in the soil solution. These represent dissolved nutrients available to roots!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', nitrogen: 50, salinity: 30 } },
        options: [
            { id: 'just_water', label: "But plants DO just need water and sunlight \u2014 they make their own food through photosynthesis!", nextNodeId: 'misconception' },
            { id: 'nutrients', label: "Plants need dissolved mineral nutrients from soil too \u2014 not just light and water!", nextNodeId: 'correct', sentiment: 'positive' }
        ]
    },

    'misconception': {
        id: 'misconception',
        speaker: 'AI',
        content: "You\u2019re right that **photosynthesis** makes sugar from CO\u2082 + H\u2082O + sunlight! \ud83c\udf1e But sugar alone isn\u2019t enough to build a plant.\n\nThink about what plants are MADE of:\n- \ud83e\uddec **DNA and proteins** need **nitrogen** and **phosphorus**\n- \ud83d\udfe2 **Chlorophyll** (the green molecule) needs **magnesium** at its center\n- \ud83d\udcaa **Cell walls** need **calcium** for structural strength\n- \u26a1 **Enzymes** need **potassium** to function\n\nNone of these minerals come from air or water \u2014 they come from **dissolved ions** in the soil! That\u2019s why farmers add **fertilizer** (N-P-K) to boost soil nutrients.\n\n**Fun fact:** The Haber-Bosch process, which manufactures nitrogen fertilizer from air, is estimated to support the food supply of nearly HALF the world\u2019s population! \ud83c\udf0d\ud83c\udf3e",
        options: [{ id: 'continue', label: "Photosynthesis makes sugar, but minerals from soil build everything else!", nextNodeId: 'correct' }]
    },

    'correct': {
        id: 'correct',
        speaker: 'AI',
        content: "Exactly! \ud83c\udfaf Here\u2019s the soil chemistry that controls plant life:\n\n- \ud83d\udfe2 **Nitrogen (N)**: Essential for proteins, chlorophyll, and DNA \u2014 makes leaves GREEN\n- \ud83d\udfe0 **Phosphorus (P)**: Powers energy transfer (ATP) and root growth \ud83c\udf31\n- \ud83d\udfe3 **Potassium (K)**: Regulates water balance and enzyme activity \ud83d\udca7\n- \ud83d\udcca **Soil pH**: Controls which nutrients dissolve and stay available to roots\n\nIn the visual, the \u25c7 **N** diamonds (green) show nitrogen concentration and the \u25cb **S** circles (orange) show salinity. The legend in the top-right explains each symbol.\n\nUse the **Nitrogen** and **Salinity** sliders to see how changing soil chemistry affects the nutrient solution! Too much salt (\ud83e\uddc2) is actually TOXIC to most plants.\n\n**Did you know?** Soil pH below 5.5 locks up phosphorus so tightly that plant roots can\u2019t absorb it, even when there\u2019s plenty in the soil! \ud83d\udd12",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'nutrients', showLabels: true } },
        options: [
            { id: 'experiment', label: "Let me play with the nitrogen and salinity sliders!", nextNodeId: 'experiment_prompt' },
            { id: 'checkpoint', label: "Test me with a checkpoint!", nextNodeId: 'checkpoint' }
        ]
    },

    'experiment_prompt': {
        id: 'experiment_prompt',
        speaker: 'AI',
        content: "\ud83d\udd2c **Soil Nutrient Experiment:**\n\n1. Set **Nitrogen** HIGH \u2192 watch green \u25c7 N diamonds multiply (nutrient-rich solution)\n2. Set **Salinity** HIGH \u2192 watch orange \u25cb S circles flood the field (salt stress!)\n3. Try HIGH nitrogen + LOW salt \u2192 ideal growth conditions\n4. Try LOW nitrogen + HIGH salt \u2192 worst-case scenario for plants\n\n**Prediction challenge:** What happens when salt concentration exceeds nitrogen? (Hint: think about **osmotic stress** \u2014 roots can\u2019t absorb water when salt is too high!) \ud83e\udde0",
        options: [{ id: 'to_checkpoint', label: "I tested the combinations \u2014 bring on the checkpoint!", nextNodeId: 'checkpoint' }]
    },

    'checkpoint': {
        id: 'checkpoint',
        speaker: 'AI',
        content: "\u23f8\ufe0f **Checkpoint \u2014 Think Like An Agrochemist!**\n\nA farmer adds TONS of nitrogen fertilizer to boost crop yields. The next year, the river downstream has a massive **algal bloom** that kills fish. \ud83d\udc1f\u2620\ufe0f\n\nWhat caused the fish kill?\n\n\ud83d\udd17 **Link to P19:** The soil porosity you explored in P19 controls how fast excess fertilizer washes out of the field!",
        options: [
            { id: 'eutrophication', label: "Excess nitrogen washed into the river, causing algae to grow out of control \u2014 when the algae died, decomposition consumed all the dissolved oxygen!", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
            { id: 'toxic', label: "Nitrogen fertilizer is directly toxic to fish.", nextNodeId: 'checkpoint_wrong' }
        ]
    },

    'checkpoint_wrong': {
        id: 'checkpoint_wrong',
        speaker: 'AI',
        content: "Nitrogen itself isn\u2019t the direct killer \u2014 the chain reaction is more complex! \ud83d\udd17\n\nHere\u2019s the deadly sequence called **eutrophication**:\n1. \ud83c\udf3e Excess **nitrogen** (and phosphorus) washes into the river as **runoff**\n2. \ud83c\udf3f **Algae** feast on the nutrients and grow explosively (the \u201cbloom\u201d)\n3. \u2620\ufe0f Algae die and sink to the bottom in massive quantities\n4. \ud83e\udda0 **Bacteria** decompose the dead algae, consuming dissolved **oxygen** in the process\n5. \ud83d\udc1f Fish and other aquatic life **suffocate** in the low-oxygen water (\u201cdead zone\u201d)\n\nThe Gulf of Mexico has a dead zone the size of NEW JERSEY caused by agricultural runoff from the entire Mississippi River basin! \ud83c\udf0a",
        options: [{ id: 'retry', label: "Eutrophication: excess nutrients \u2192 algal bloom \u2192 oxygen depletion \u2192 fish kill!", nextNodeId: 'checkpoint_correct' }]
    },

    'checkpoint_correct': {
        id: 'checkpoint_correct',
        speaker: 'AI',
        content: "\u2705 **Exactly!** You identified **eutrophication** \u2014 one of the world\u2019s biggest water quality problems.\n\nThe solution? **Precision agriculture** \ud83c\udf3e \u2014 using GPS, soil sensors, and data analysis to apply EXACTLY the right amount of fertilizer in exactly the right spot. No excess = no runoff = no dead zones.\n\n**Fun fact:** Some farmers now use **drone-mounted sensors** that scan fields for nitrogen-deficient patches and apply fertilizer only where it\u2019s needed \u2014 reducing waste by 30-40%! \ud83d\ude81",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint', showRunoff: true } },
        options: [
            { id: 'discovery', label: "Show me the big discovery!", nextNodeId: 'discovery' },
            { id: 'summary_now', label: "Show summary table first.", nextNodeId: 'summary_table' }
        ]
    },

    'discovery': {
        id: 'discovery',
        speaker: 'AI',
        content: "\ud83c\udf89 **Discovery: Soil is a Chemical Buffet for Plants!**\n\n| Nutrient | Symbol | Role in Plants |\n|----------|--------|---------------|\n| \ud83d\udfe2 **Nitrogen** | N | Proteins, chlorophyll, DNA |\n| \ud83d\udfe0 **Phosphorus** | P | Energy (ATP), root growth |\n| \ud83d\udfe3 **Potassium** | K | Water balance, enzymes |\n| \u26aa **Calcium** | Ca | Cell wall strength |\n| \ud83d\udfe4 **Magnesium** | Mg | Chlorophyll center |\n\n| Problem | Cause | Effect |\n|---------|-------|--------|\n| \ud83c\udf42 **Nutrient deficiency** | Low N, P, or K | Yellow leaves, stunted growth |\n| \ud83e\uddc2 **Salt stress** | High salinity | Osmotic damage, root death |\n| \ud83e\uddea **pH lock-up** | Extreme soil pH | Nutrients present but unavailable |\n| \ud83c\udf0a **Eutrophication** | Excess nutrient runoff | Algal blooms, dead zones |\n\n**Key Insight:** Plant growth depends on the **chemical balance** of dissolved nutrients in soil water. Too little = deficiency. Too much = toxicity or pollution. The perfect balance is agriculture\u2019s greatest challenge!",
        options: [
            { id: 'summary', label: "Show the lab data summary.", nextNodeId: 'summary_table' },
            { id: 'reflect', label: "Ask me reflection questions!", nextNodeId: 'reflection_questions' }
        ]
    },

    'summary_table': {
        id: 'summary_table',
        speaker: 'AI',
        content: "\ud83d\udcca **Lab Results Summary:**\n\n| **Slider Setting** | **Visual Change** | **What It Represents** |\n|---|---|---|\n| \ud83d\udfe2 **Nitrogen HIGH** | Many green \u25c7 N diamonds | Rich nutrient solution |\n| \ud83d\udfe2 **Nitrogen LOW** | Few green diamonds | Nutrient-deficient soil |\n| \ud83d\udfe0 **Salinity HIGH** | Many orange \u25cb S circles | Salt-stressed soil |\n| \ud83d\udfe0 **Salinity LOW** | Few orange circles | Healthy low-salt conditions |\n| \ud83c\udf3f **Best combo** | High N + Low S | Optimal plant growth conditions |\n| \u2620\ufe0f **Worst combo** | Low N + High S | Nutrient-poor + salt-stressed |",
        options: [
            { id: 'reflect_after_table', label: "Now ask me reflection questions!", nextNodeId: 'reflection_questions' },
            { id: 'to_complete', label: "Wrap up C19.", nextNodeId: 'complete' }
        ]
    },

    'reflection_questions': {
        id: 'reflection_questions',
        speaker: 'AI',
        content: "\ud83e\udde0 **Think Like An Agrochemist**\n\n1. Why do organic farmers use **cover crops** (like clover) instead of synthetic nitrogen fertilizer? \ud83c\udf3f\n2. Why does **liming** (adding calcium carbonate) help acidic soils support better plant growth?\n3. How might **climate change** affect soil nutrient availability in your region?\n\n**Real-world connection:** The \u201cDust Bowl\u201d of the 1930s happened because farmers stripped prairie grasslands of their deep-rooted plants, destroying soil structure and nutrient cycling. When drought hit, the exposed soil simply blew away \u2014 millions of tons of topsoil lost forever! \ud83c\udf2c\ufe0f",
        options: [
            { id: 'reflect_good', label: "Clover has nitrogen-fixing bacteria in root nodules that convert N\u2082 gas into plant-usable ammonium \u2014 free fertilizer!", nextNodeId: 'reflection_feedback', sentiment: 'positive' },
            { id: 'reflect_bad', label: "Cover crops just prevent erosion, not add nutrients.", nextNodeId: 'reflection_retry' }
        ]
    },

    'reflection_retry': {
        id: 'reflection_retry',
        speaker: 'AI',
        content: "Erosion prevention is one benefit, but the CHEMISTRY is even more important! \ud83c\udf3f\n\n**Legumes** (clover, beans, peas) have a symbiotic partnership with **Rhizobium** bacteria living in special root nodules. These bacteria perform **nitrogen fixation**:\n\nN\u2082 (gas) \u2192 NH\u2084\u207a (ammonium) \u2192 plant-available nitrogen!\n\nThis is nature\u2019s version of the Haber-Bosch process \u2014 but powered by biology instead of fossil fuels. A good clover crop can add 100-200 kg of nitrogen per hectare per year \u2014 FOR FREE! \ud83d\udcb0",
        options: [{ id: 'retry_to_feedback', label: "Nitrogen-fixing bacteria in legume roots provide free natural fertilizer!", nextNodeId: 'reflection_feedback' }]
    },

    'reflection_feedback': {
        id: 'reflection_feedback',
        speaker: 'AI',
        content: "Outstanding chemistry thinking! \ud83c\udf1f\n\nYou\u2019ve connected **biological nitrogen fixation** to **soil nutrient management** \u2014 exactly how sustainable agriculture works. By rotating legumes with other crops, farmers can maintain soil nitrogen without synthetic fertilizer or the risk of eutrophication. \ud83c\udf0d",
        options: [{ id: 'finish', label: "Finish C19!", nextNodeId: 'complete' }]
    },

    'complete': {
        id: 'complete',
        speaker: 'AI',
        content: "\ud83d\udd17 **Cross-Links**\n- In **P19**, you explored how **soil pore structure** controls water movement \u2014 that same water carries the dissolved nutrients you just studied! \ud83d\udca7\n- In **B19**, you\u2019ll discover the incredible **soil food web** \u2014 billions of organisms that cycle nutrients through the ecosystem! \ud83d\udc1b\n\n\u2705 **Lesson C19 Complete!**",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});

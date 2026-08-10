import { DialogNode } from '../../types';

/**
 * B19 - Soil Biodiversity
 * Big Idea 19: "How Does Soil Support Life?"
 * Scenario: The hidden world of soil organisms
 * Target Misconception: "Soil is lifeless dirt"
 */
export const getB19Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Welcome to the Soil Biodiversity Lab! \ud83d\udc1b\n\nReach down and pick up a single teaspoon of healthy garden soil. In that tiny handful you\u2019re holding:\n- \ud83e\udda0 **Billions** of bacteria\n- \ud83c\udf44 Meters of **fungal** threads (hyphae)\n- \ud83d\udc1b Hundreds of **nematodes** (microscopic worms)\n- \ud83d\udc1e Dozens of **arthropods** (mites, springtails)\n\nMore organisms live in that teaspoon of soil than there are people on Planet Earth! \ud83c\udf0d\n\nIn the visual, you can see worms, insects, and microorganisms moving through the soil. This is the **soil food web** \u2014 the hidden engine that recycles ALL dead material back into nutrients for new life.\n\n\ud83e\udd14 What do you think would happen if all soil organisms disappeared overnight?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', biodiversity: 80 } },
        options: [
            { id: 'nothing', label: "Not much \u2014 plants get nutrients from water and fertilizer anyway.", nextNodeId: 'misconception' },
            { id: 'collapse', label: "Plant life would collapse because dead material would stop being recycled into nutrients!", nextNodeId: 'correct', sentiment: 'positive' }
        ]
    },

    'misconception': {
        id: 'misconception',
        speaker: 'AI',
        content: "Actually, without soil organisms, life on land would collapse within YEARS! \ud83d\udea8\n\nHere\u2019s why: when a leaf falls or an animal dies, **decomposers** break it down:\n\n1. \ud83d\udc1b **Earthworms** shred large organic matter into smaller pieces\n2. \ud83c\udf44 **Fungi** secrete enzymes that dissolve tough plant fibers (lignin, cellulose)\n3. \ud83e\udda0 **Bacteria** perform the final chemical breakdown, releasing **nitrogen**, **phosphorus**, and **potassium** back into the soil solution\n\nWithout this recycling, dead leaves and animals would just PILE UP. Nutrients would stay locked in dead tissue forever. Plants would starve even in nutrient-rich soil because the nutrients wouldn\u2019t be in a form roots can absorb!\n\n**Fun fact:** Earth\u2019s soil organisms process an estimated 100 BILLION tons of dead organic matter every year! Without them, forests would be buried under meters of undecomposed leaves. \ud83c\udf42\ud83c\udf42\ud83c\udf42",
        options: [{ id: 'continue', label: "Decomposers are essential \u2014 they recycle dead matter into plant nutrients!", nextNodeId: 'correct' }]
    },

    'correct': {
        id: 'correct',
        speaker: 'AI',
        content: "Exactly right! \ud83c\udfaf The **soil food web** is the most important recycling system on Earth:\n\n- \ud83d\udc1b **Earthworms** = the bulldozers. They eat dead leaves, digest them, and excrete nutrient-rich **castings** (worm poop!). Charles Darwin called them \u201cthe most important animal in the history of the world.\u201d\n- \ud83c\udf44 **Mycorrhizal fungi** = the internet. Their thread-like **hyphae** connect to plant roots, trading minerals for sugar. A single fungal network can connect hundreds of trees! Scientists call it the \u201c**Wood Wide Web**.\u201d \ud83c\udf10\n- \ud83e\udda0 **Bacteria** = the chemists. They perform **nitrogen fixation** (N\u2082 \u2192 NH\u2084\u207a), **nitrification** (NH\u2084\u207a \u2192 NO\u2083\u207b), and decomposition reactions.\n- \ud83d\udc1e **Arthropods** (mites, springtails) = the shredders. They break down debris into smaller pieces for bacteria and fungi to finish.\n\n**Did you know?** A single earthworm can process its own body weight in soil EVERY DAY! \ud83d\udc1b\u2696\ufe0f",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'food_web', showConnections: true } },
        options: [
            { id: 'experiment', label: "Let me explore the soil organisms in the visual!", nextNodeId: 'experiment_prompt' },
            { id: 'checkpoint', label: "Test me with a checkpoint!", nextNodeId: 'checkpoint' }
        ]
    },

    'experiment_prompt': {
        id: 'experiment_prompt',
        speaker: 'AI',
        content: "\ud83d\udd2c **Soil Food Web Experiment:**\n\n1. Watch the **worms** tunnel through soil, creating channels for water and air\n2. Look for **fungal networks** (thin white lines) connecting organisms\n3. Notice how **microorganisms** cluster near decaying organic matter\n4. Adjust the **Moisture** slider \u2014 soil organisms need water to survive but too much drowns them!\n\n**Prediction challenge:** What happens to decomposition speed when the soil is waterlogged? (Hint: most decomposers need OXYGEN!) \ud83e\udde0",
        options: [{ id: 'to_checkpoint', label: "I explored the food web \u2014 bring on the checkpoint!", nextNodeId: 'checkpoint' }]
    },

    'checkpoint': {
        id: 'checkpoint',
        speaker: 'AI',
        content: "\u23f8\ufe0f **Checkpoint \u2014 Think Like A Soil Ecologist!**\n\nA farmer sprays **broad-spectrum pesticide** on a field to kill crop-eating insects. A year later, the soil becomes hard, compacted, and plant growth declines badly. \ud83d\ude9c\n\nWhat went wrong?\n\n\ud83d\udd17 **Link to C19:** The nutrients released by decomposers are the same N, P, K you studied in soil chemistry!",
        options: [
            { id: 'killed_web', label: "The pesticide killed soil organisms too \u2014 without earthworms and decomposers, the soil lost its structure and nutrient cycling!", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
            { id: 'too_dry', label: "The soil just dried out from lack of rain.", nextNodeId: 'checkpoint_wrong' }
        ]
    },

    'checkpoint_wrong': {
        id: 'checkpoint_wrong',
        speaker: 'AI',
        content: "Weather could be a factor, but the PESTICIDE is the key! \ud83d\udea8\n\n**Broad-spectrum pesticides** don\u2019t just kill target pests \u2014 they kill beneficial soil organisms too:\n\n- \ud83d\udc1b **Earthworms die** \u2192 no more tunneling \u2192 soil compacts \u2192 water can\u2019t infiltrate\n- \ud83c\udf44 **Fungi die** \u2192 mycorrhizal networks collapse \u2192 plants can\u2019t access distant nutrients\n- \ud83e\udda0 **Bacteria die** \u2192 decomposition stops \u2192 nutrient recycling halts\n\nIt\u2019s a **cascade failure**: losing the soil food web destroys soil structure, nutrient cycling, AND water infiltration all at once.\n\n**Real example:** Studies show that fields treated with heavy pesticides can lose 50-80% of their earthworm populations, leading to measurably harder, less productive soil within 2-3 years! \ud83d\udcc9",
        options: [{ id: 'retry', label: "Pesticides killed the soil food web, causing cascading soil degradation!", nextNodeId: 'checkpoint_correct' }]
    },

    'checkpoint_correct': {
        id: 'checkpoint_correct',
        speaker: 'AI',
        content: "\u2705 **Exactly!** The soil food web provides **ecosystem services** worth trillions of dollars globally:\n\n- \ud83d\udd04 **Nutrient cycling** (decomposition \u2192 available nutrients)\n- \ud83d\udca8 **Soil aeration** (worm tunnels let air and water penetrate)\n- \ud83c\udfd7\ufe0f **Soil structure** (organisms create aggregates that resist compaction)\n- \ud83e\uddf9 **Disease suppression** (beneficial microbes outcompete pathogens)\n\nThat\u2019s why **regenerative agriculture** focuses on building soil biology instead of treating soil as just a chemical container! \ud83c\udf31",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint', showDamage: true } },
        options: [
            { id: 'discovery', label: "Show me the big discovery!", nextNodeId: 'discovery' },
            { id: 'summary_now', label: "Show summary table first.", nextNodeId: 'summary_table' }
        ]
    },

    'discovery': {
        id: 'discovery',
        speaker: 'AI',
        content: "\ud83c\udf89 **Discovery: Soil is the Most Biodiverse Habitat on Earth!**\n\n| Organism | Role | Scale |\n|----------|------|-------|\n| \ud83d\udc1b **Earthworms** | Shred, tunnel, mix | 1-3 million per hectare |\n| \ud83c\udf44 **Fungi** | Decompose, network, trade | km of hyphae per gram |\n| \ud83e\udda0 **Bacteria** | Fix N\u2082, decompose, nitrify | Billions per teaspoon |\n| \ud83d\udc1e **Arthropods** | Shred, hunt, aerate | Thousands per m\u00b2 |\n| \ud83d\udc0c **Nematodes** | Graze bacteria, cycle nutrients | Millions per m\u00b2 |\n\n| Ecosystem Service | How Soil Organisms Provide It |\n|-------------------|------------------------------|\n| \ud83d\udd04 **Nutrient recycling** | Break down dead matter \u2192 available ions |\n| \ud83c\udf3f **Plant nutrition** | Mycorrhizae deliver minerals to roots |\n| \ud83d\udca7 **Water infiltration** | Worm tunnels create drainage channels |\n| \ud83e\uddf1 **Soil structure** | Organisms bind particles into aggregates |\n| \ud83d\udee1\ufe0f **Disease suppression** | Beneficial microbes outcompete pathogens |\n\n**Key Insight:** Healthy soil is a **living ecosystem**, not lifeless dirt! The organisms within it provide essential services that support ALL terrestrial plant life \u2014 and by extension, all life on land.",
        options: [
            { id: 'summary', label: "Show the lab data summary.", nextNodeId: 'summary_table' },
            { id: 'reflect', label: "Ask me reflection questions!", nextNodeId: 'reflection_questions' }
        ]
    },

    'summary_table': {
        id: 'summary_table',
        speaker: 'AI',
        content: "\ud83d\udcca **Lab Results Summary:**\n\n| **Organism Group** | **What You Observed** | **Ecological Function** |\n|---|---|---|\n| \ud83d\udc1b **Worms** | Tunneling through soil layers | Create air channels, mix nutrients |\n| \ud83c\udf44 **Fungi** | White network threads connecting roots | Mycorrhizal nutrient exchange |\n| \ud83e\udda0 **Microorganisms** | Clusters near decaying matter | Chemical decomposition and N-cycling |\n| \ud83d\udc1e **Arthropods** | Moving through soil surface | Physical shredding of organic debris |\n\n| **Condition** | **Biodiversity** | **Soil Health** |\n|---|---|---|\n| Healthy forest soil | Very high | Excellent structure, fast nutrient cycling |\n| Agricultural soil | Moderate | Depends on management practices |\n| Pesticide-treated soil | Low | Compacted, slow nutrient cycling |\n| Waterlogged soil | Low (anaerobic) | Slow decomposition, nutrient lock-up |",
        options: [
            { id: 'reflect_after_table', label: "Now ask me reflection questions!", nextNodeId: 'reflection_questions' },
            { id: 'to_complete', label: "Wrap up B19.", nextNodeId: 'complete' }
        ]
    },

    'reflection_questions': {
        id: 'reflection_questions',
        speaker: 'AI',
        content: "\ud83e\udde0 **Think Like A Soil Ecologist**\n\n1. Why is **no-till farming** better for soil biodiversity than conventional plowing? \ud83d\ude9c\n2. How does the \u201c**Wood Wide Web**\u201d (mycorrhizal fungal network) help young seedlings survive in a forest?\n3. Why are **peat bogs** such important carbon stores, even though they\u2019re NOT biodiverse?\n\n**Real-world connection:** Scientists recently discovered that underground **mycorrhizal networks** can transfer warning chemicals between trees \u2014 when one tree is attacked by insects, it sends chemical signals through fungal connections to alert neighboring trees to boost their defenses! \ud83c\udf33\u27a1\ufe0f\ud83c\udf33 Trees literally TALK through fungi!",
        options: [
            { id: 'reflect_good', label: "No-till farming preserves worm tunnels, fungal networks, and soil structure that plowing destroys!", nextNodeId: 'reflection_feedback', sentiment: 'positive' },
            { id: 'reflect_bad', label: "No-till just saves fuel costs \u2014 the soil organisms are fine either way.", nextNodeId: 'reflection_retry' }
        ]
    },

    'reflection_retry': {
        id: 'reflection_retry',
        speaker: 'AI',
        content: "Fuel savings are nice, but the BIOLOGICAL impact is the real benefit! \ud83c\udf31\n\n**Conventional plowing** is a disaster for soil organisms:\n- \ud83d\udc1b Worm tunnels are destroyed \u2192 must be rebuilt from scratch\n- \ud83c\udf44 Fungal networks are shredded \u2192 mycorrhizal connections severed\n- \ud83e\udda0 Bacterial communities are disrupted \u2192 nutrient cycling slows\n- \ud83c\udf2c\ufe0f Exposed soil surface dries out and erodes\n\n**No-till farming** leaves the soil structure INTACT. After several years of no-till, earthworm populations can be 3-5\u00d7 higher, fungal networks fully established, and soil infiltration rates dramatically improved! \ud83d\udcc8",
        options: [{ id: 'retry_to_feedback', label: "No-till preserves the entire soil food web and its structure!", nextNodeId: 'reflection_feedback' }]
    },

    'reflection_feedback': {
        id: 'reflection_feedback',
        speaker: 'AI',
        content: "Brilliant ecological reasoning! \ud83c\udf1f\n\nYou understand that soil health isn\u2019t just about CHEMISTRY (N-P-K) \u2014 it\u2019s about the **living biological community** that processes, cycles, and delivers those nutrients. Protect the organisms, and the soil takes care of itself! \ud83c\udf0d\n\n**Key takeaway:** Soil biodiversity is the foundation of sustainable agriculture.",
        options: [{ id: 'finish', label: "Finish B19!", nextNodeId: 'complete' }]
    },

    'complete': {
        id: 'complete',
        speaker: 'AI',
        content: "\ud83d\udd17 **Cross-Links**\n- In **P19**, you explored the **physical pore structure** that gives soil organisms their habitat \u2014 tunnels, air spaces, and water films! \ud83d\udca7\n- In **C19**, you studied the **dissolved nutrients** that decomposers release and plants absorb! \ud83e\uddea\n\n\u2705 **Lesson B19 Complete!**",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});

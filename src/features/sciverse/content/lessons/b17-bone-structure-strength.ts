import { DialogNode } from '../../types';

/**
 * B17 - Bone Structure and Strength
 * Big Idea 17: "How Do Structures Stay Standing?"
 * Scenario: Why bones are hollow tubes, not solid rods
 * Target Misconception: "Solid bone is always stronger"
 */
export const getB17Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Welcome to the Bone Mechanics Lab! \ud83e\uddb4\n\nHere\u2019s a mind-blowing fact: your **femur** (thigh bone) can support up to 30 times your body weight during a jump! That\u2019s stronger per gram than concrete! \ud83c\udfcb\ufe0f\n\nBut bones are NOT solid rods. Cut one open and you\u2019ll see it\u2019s more like a hollow tube filled with a spongy lattice. Why would biology choose a HOLLOW design instead of a solid one?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', model: 'femur' } },
        options: [
            { id: 'solid_best', label: "Solid bone would obviously be stronger \u2014 more material means more strength!", nextNodeId: 'misconception' },
            { id: 'optimized', label: "Bone balances strength, weight, repair, and blood supply \u2014 hollow is smarter!", nextNodeId: 'correct', sentiment: 'positive' },
            { id: 'static', label: "Bone structure is fixed after you grow up and barely changes.", nextNodeId: 'misconception_static' }
        ]
    },

    'misconception': {
        id: 'misconception',
        speaker: 'AI',
        content: "That seems logical, but biology disagrees! \ud83e\udd14\n\nIf your bones were completely solid, you\u2019d weigh about 3-4 times more \u2014 imagine trying to run with legs made of solid rock! \ud83e\udea8\n\nNature\u2019s solution is brilliant **engineering**:\n- The **outer shell** (called **compact bone** or **cortical bone**) is dense and hard \u2014 it handles most of the load\n- The **inner lattice** (called **trabecular** or **spongy** bone) is a lightweight mesh that absorbs shock and directs force\n- The **hollow center** holds **bone marrow** \u2014 the factory that makes your blood cells!\n\nA hollow tube is actually STRONGER per unit weight than a solid rod of the same material. Engineers copy this in bicycle frames and airplane wings! \u2708\ufe0f",
        options: [{ id: 'next', label: "So hollow + lattice is stronger AND lighter \u2014 amazing!", nextNodeId: 'correct' }]
    },

    'misconception_static': {
        id: 'misconception_static',
        speaker: 'AI',
        content: "Actually, bone is one of the most dynamic tissues in your body! \ud83d\udd04\n\nRight now, as you sit reading this, specialized cells are reshaping your bones:\n- **Osteoblasts** BUILD new bone where stress is high (like an exercise zone)\n- **Osteoclasts** REMOVE bone where it\u2019s not needed (use-it-or-lose-it!)\n\nThis process is called **remodeling**, and it means your skeleton is completely rebuilt about every 10 years! Astronauts lose bone mass in space because without gravity, bones sense less load and start removing material. \ud83d\ude80",
        options: [{ id: 'next2', label: "Bone is alive and always adapting \u2014 that\u2019s incredible!", nextNodeId: 'correct' }]
    },

    'correct': {
        id: 'correct',
        speaker: 'AI',
        content: "Exactly! \ud83c\udfaf Bone has TWO structural layers working together:\n\n- \ud83e\uddb4 **Compact bone** (outer shell) \u2014 dense, hard cortical layer that carries most bending and compression loads\n- \ud83e\uddf1 **Trabecular bone** (inner sponge) \u2014 lightweight lattice of tiny beams called **trabeculae** that absorb impact and distribute force\n\nIn the visual, the grid pattern inside the bone IS the **trabecular network**. The \u201cBone Strength\u201d label above the bone changes as you adjust:\n- **Calcium** \u2014 the mineral that hardens the bone matrix\n- **Activity** \u2014 the loading stimulus that triggers **remodeling**\n- **Age factor** \u2014 affects how fast bone can rebuild itself\n\n**Fun fact:** Wolff\u2019s Law says bone adapts its structure to match the forces placed on it. Tennis players have 40% thicker bone in their racket arm! \ud83c\udfbe",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'architecture', showTrabeculae: true } },
        options: [
            { id: 'checkpoint', label: "I get it \u2014 test me with a checkpoint!", nextNodeId: 'checkpoint' },
            { id: 'experiment_first', label: "Let me experiment with the controls first.", nextNodeId: 'experiment_prompt' }
        ]
    },

    'experiment_prompt': {
        id: 'experiment_prompt',
        speaker: 'AI',
        content: "\ud83d\udd2c **Bone Mechanics Experiment:**\n\n1. Set **calcium** to high and increase **activity** \u2192 watch the trabecular grid fill in and strength rise\n2. Drop **calcium** to low \u2192 see how the lattice thins even with good activity (you need building material!)\n3. Raise the **age factor** \u2192 notice how recovery slows and the grid becomes sparse\n\nThe visual shows the trabecular lattice getting denser or thinner in real time \u2014 this is exactly what happens inside your bones! \ud83e\uddb4\n\n**Think about:** Why do doctors recommend BOTH exercise AND calcium for bone health?",
        options: [{ id: 'to_checkpoint', label: "I tested it \u2014 ask me the checkpoint!", nextNodeId: 'checkpoint' }]
    },

    'checkpoint': {
        id: 'checkpoint',
        speaker: 'AI',
        content: "\u23f8\ufe0f **Checkpoint \u2014 Think Like A Bone Biologist!**\n\nA patient shows gradually weakening bones over years. X-rays reveal thinning **trabeculae** and lower **mineral density**.\n\nWhich of these is the MOST direct cause of long-term bone weakening?\n\n\ud83d\udd17 **Link to C17:** The calcium and collagen in bone are like the concrete and steel rebar in buildings \u2014 mineral matrix for **compression**, protein fibers for **flexibility**!",
        options: [
            { id: 'density_loss', label: "Loss of mineral density and trabecular microstructure \u2014 the bone is literally dissolving!", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
            { id: 'skin_color', label: "Changes in skin pigmentation.", nextNodeId: 'checkpoint_wrong' },
            { id: 'height_only', label: "Being tall, regardless of bone tissue quality.", nextNodeId: 'checkpoint_wrong2' }
        ]
    },

    'checkpoint_wrong': {
        id: 'checkpoint_wrong',
        speaker: 'AI',
        content: "Skin pigmentation has nothing to do with bone strength! \ud83d\udeab\n\nBone strength depends on:\n- **Mineral density** \u2014 how much calcium phosphate is packed in\n- **Microarchitecture** \u2014 how well the **trabecular** lattice is organized\n- **Remodeling balance** \u2014 whether osteoblasts (builders) keep up with osteoclasts (removers)\n\nThe condition where this balance tips toward bone loss is called **osteoporosis** \u2014 literally \u201cporous bone.\u201d",
        options: [{ id: 'retry', label: "Bone strength = mineral density + microstructure \u2014 got it!", nextNodeId: 'checkpoint_correct' }]
    },

    'checkpoint_wrong2': {
        id: 'checkpoint_wrong2',
        speaker: 'AI',
        content: "Height affects how much load bones carry, but tall people don\u2019t automatically have weak bones! \ud83d\udccf\n\nWhat matters is **tissue quality**: the **density** of minerals, the **architecture** of the trabecular lattice, and the **remodeling balance** between bone-building and bone-removing cells.\n\nA short person with low calcium and no exercise can have weaker bones than a tall person who eats well and stays active! \ud83c\udfcb\ufe0f",
        options: [{ id: 'retry2', label: "Tissue quality and remodeling matter more than size alone!", nextNodeId: 'checkpoint_correct' }]
    },

    'checkpoint_correct': {
        id: 'checkpoint_correct',
        speaker: 'AI',
        content: "\u2705 **Exactly right!** The condition you described is **osteoporosis** \u2014 one of the most common bone diseases worldwide.\n\nBone follows engineering-like constraints but with a biological twist: it can **repair itself** and **adapt its structure** to match the forces it experiences!\n\n**Did you know?** Astronauts lose about 1-2% of bone mass per MONTH in space. That\u2019s why the International Space Station has a gym \u2014 exercise creates the mechanical signals bones need to stay strong! \ud83d\ude80\ud83c\udfcb\ufe0f",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint', risk: 'osteoporosis' } },
        options: [
            { id: 'discovery', label: "Show me the big discovery!", nextNodeId: 'discovery' },
            { id: 'summary_now', label: "Show summary table first.", nextNodeId: 'summary_table' }
        ]
    },

    'discovery': {
        id: 'discovery',
        speaker: 'AI',
        content: "\ud83c\udf89 **Discovery: Bone \u2014 Nature\u2019s Smart Structure!**\n\n| Concept | What it means |\n|---------|---------------|\n| \ud83e\uddb4 **Compact bone** | Dense outer shell that handles bending and compression |\n| \ud83e\uddf1 **Trabecular bone** | Spongy inner lattice that absorbs shock and distributes force |\n| \ud83d\udd04 **Remodeling** | Osteoblasts build, osteoclasts remove \u2014 skeleton rebuilt every ~10 years |\n| \ud83e\uddea **Mineral density** | Calcium content determines hardness and load capacity |\n| \u26a0\ufe0f **Osteoporosis** | When bone removal outpaces bone building \u2014 porous, fragile bone |\n| \ud83c\udfcb\ufe0f **Wolff\u2019s Law** | Bone adapts its structure to match the forces placed on it |\n\n**Key Insight:** Bones are **dynamic load-bearing structures** tuned for strength, mobility, and repair. The key is not maximum mass \u2014 it\u2019s **adaptive performance** under changing demands!",
        options: [
            { id: 'summary', label: "Show the lab data summary.", nextNodeId: 'summary_table' },
            { id: 'reflect', label: "Ask me reflection questions!", nextNodeId: 'reflection_questions' }
        ]
    },

    'summary_table': {
        id: 'summary_table',
        speaker: 'AI',
        content: "\ud83d\udcca **Lab Results Summary:**\n\n| **Biological Factor** | **Mechanics Meaning** | **What You Saw in the Lab** |\n|---|---|---|\n| \ud83e\uddea **Calcium** | Mineral quality for hard tissue matrix | Low calcium \u2192 thinner grid \u2192 lower strength |\n| \ud83c\udfcb\ufe0f **Activity** | Mechanical stimulus for **remodeling** | Moderate exercise \u2192 denser trabeculae \u2192 higher resilience |\n| \u23f3 **Age factor** | Recovery/remodeling speed constraint | Higher age \u2192 slower rebuilding \u2192 increased vulnerability |\n| \ud83c\udfd7\ufe0f **Architecture** | Compact shell + trabecular lattice | Hollow design = strength without excessive weight |",
        options: [
            { id: 'reflect_after_table', label: "Now ask me reflection questions!", nextNodeId: 'reflection_questions' },
            { id: 'to_complete', label: "Wrap up B17.", nextNodeId: 'complete' }
        ]
    },

    'reflection_questions': {
        id: 'reflection_questions',
        speaker: 'AI',
        content: "\ud83e\udde0 **Think Like A Biomechanics Scientist**\n\n1. Why can BOTH too little loading (bed rest) and too much loading (overtraining) be harmful to bones? \ud83c\udfcb\ufe0f\n2. Why do doctors recommend calcium AND exercise together, not just one?\n3. Why is **fracture prevention** a systems problem involving nutrition, activity, hormones, and age \u2014 not just one number?\n\n**Real-world connection:** NASA spends millions studying bone loss in microgravity. Their research helps treat osteoporosis on Earth too! \ud83d\ude80",
        options: [
            { id: 'reflect_good', label: "Bone health requires balanced loading, nutrition, and remodeling \u2014 it\u2019s a whole system!", nextNodeId: 'reflection_feedback', sentiment: 'positive' },
            { id: 'reflect_bad', label: "Only calcium matters \u2014 just take supplements and ignore everything else.", nextNodeId: 'reflection_retry' }
        ]
    },

    'reflection_retry': {
        id: 'reflection_retry',
        speaker: 'AI',
        content: "Calcium is essential, but it\u2019s only ONE ingredient! \ud83e\uddea\n\nWithout **mechanical loading** (exercise), your bone cells don\u2019t get the signal to BUILD new bone \u2014 the calcium just passes through! And without hormonal balance and adequate vitamin D, calcium can\u2019t even get absorbed properly.\n\nBone health emerges from **long-term balance** across multiple factors, not a single supplement.",
        options: [{ id: 'retry_to_feedback', label: "Understood \u2014 it\u2019s a multi-factor system!", nextNodeId: 'reflection_feedback' }]
    },

    'reflection_feedback': {
        id: 'reflection_feedback',
        speaker: 'AI',
        content: "Excellent reasoning! \ud83c\udf1f You\u2019re applying **systems thinking** to biological structure and function \u2014 exactly how sports medicine doctors and orthopedic surgeons think.\n\nEvery step, jump, and movement you make sends signals that keep your skeleton strong. Your bones are literally shaped by how you live! \ud83e\uddb4\ud83d\udcaa",
        options: [{ id: 'finish', label: "Finish B17!", nextNodeId: 'complete' }]
    },

    'complete': {
        id: 'complete',
        speaker: 'AI',
        content: "\ud83d\udd17 **Big Idea 17 Complete \u2014 How Do Structures Stay Standing?**\n\n- Physics (P17): **Structures & Loads** \u2014 geometry and **load paths** distribute weight to prevent collapse\n- Chemistry (C17): **Construction Materials** \u2014 concrete, steel, and composites have different **compression** and **tension** profiles\n- Biology (B17): **Bone Strength Design** \u2014 living bone uses **compact** shell + **trabecular** lattice for incredible strength-to-weight ratio\n\nIn all three: **smart structure design \u2014 whether bridges, materials, or bones \u2014 resists forces efficiently by distributing load!** \ud83c\udfd7\ufe0f\ud83e\uddf1\ud83e\uddb4\n\n\u2705 **Lesson B17 Complete!**",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});

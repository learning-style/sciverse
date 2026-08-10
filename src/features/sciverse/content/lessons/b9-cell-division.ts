import { DialogNode } from '../../types';

/**
 * B9 — Cell Division: How Your Body Heals and Grows
 * Big Idea 9: "How Do Things Grow?"
 * Scenario: "The Healing Cut"
 * Target Misconception: "Your body just fills in the wound with some goo"
 */
export const getB9Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Welcome to **The Healing Cut!** 🩹🔬\n\nImagine you're riding your bike and — ouch! — you scrape your knee on the pavement. It stings, it bleeds a little, and you can see raw pink skin underneath.\n\nBut here's the amazing part: in just a few days, **brand new skin** appears and the wound closes up. How does your body DO that?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
        options: [
            { id: 'goo', label: "Doesn't the body just fill it in with some goo?", nextNodeId: 'misconception', sentiment: 'negative' },
            { id: 'cells', label: "Maybe the skin grows back somehow?", nextNodeId: 'scrape_zoom', sentiment: 'positive' },
            { id: 'unsure', label: "I've always wondered about that!", nextNodeId: 'scrape_zoom', sentiment: 'neutral' }
        ]
    },

    'misconception': {
        id: 'misconception',
        speaker: 'AI',
        content: "That's what a lot of people think — but it's actually WAY cooler than goo! 🤔\n\nYour body doesn't paste over wounds like spackle on a wall. What really happens is that your **living cells** near the wound start making **copies of themselves** — real, working skin cells!\n\nLet's zoom in with a microscope and watch it happen!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'scrape' } },
        options: [
            { id: 'zoom', label: "Let's zoom in!", nextNodeId: 'cell_intro' }
        ]
    },

    'scrape_zoom': {
        id: 'scrape_zoom',
        speaker: 'AI',
        content: "Good thinking! Let's zoom in on that scrape with a powerful microscope. 🔬\n\nLook at the wound — you can see a **gap** where skin cells have been scraped away. The edges of the wound still have healthy, living cells.\n\nThose healthy cells are about to do something incredible...",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'scrape' } },
        options: [
            { id: 'what', label: "What are those cells going to do?", nextNodeId: 'cell_intro' }
        ]
    },

    'cell_intro': {
        id: 'cell_intro',
        speaker: 'AI',
        content: "Let's look at **one single cell** near the wound edge. 🟢\n\nSee that round shape? That's the **cell membrane** — like a flexible bag holding everything inside. And that darker circle in the middle? That's the **nucleus** — the cell's brain!\n\nInside the nucleus, those squiggly lines are **DNA** — the instruction manual for building an entire copy of this cell.\n\nThis cell is about to go through a process called **mitosis** — it's going to make a perfect copy of itself!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'cell_grow' } },
        options: [
            { id: 'how', label: "How does one cell become two?", nextNodeId: 'cell_grow' },
            { id: 'dna', label: "What does the DNA actually do?", nextNodeId: 'dna_role' }
        ]
    },

    'dna_role': {
        id: 'dna_role',
        speaker: 'AI',
        content: "Great question! **DNA is the instruction manual** for building everything inside a cell! 🧬📖\n\nThink of DNA like a recipe book with thousands of recipes:\n- One recipe says \"how to make skin protein\"\n- Another says \"how to make the chemical that gives you your hair colour\"\n- Another says \"how to build the enzymes that digest your food\"\n\nDNA tells the cell **which proteins to build** — and proteins do almost ALL the work inside your body!\n\nBut here's the key for healing: before a cell can divide, it must **copy ALL its DNA** so both new cells get the complete recipe book. You can't rip it in half — each cell needs every page! 📋✂️📋\n\nLet's see how the cell prepares to divide...",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'cell_grow' } },
        options: [
            { id: 'next', label: "How does the cell prepare to split?", nextNodeId: 'cell_grow' }
        ]
    },

    'cell_grow': {
        id: 'cell_grow',
        speaker: 'AI',
        content: "**Step 1: The cell GROWS bigger!** 📈\n\nWatch — the cell is getting larger! Before it can split, it needs to build up enough material for TWO cells.\n\nIt's absorbing **nutrients** from your blood — proteins, sugars, fats — and using them as building blocks to make more of everything inside it.\n\n🔗 *C9 Connection:* Remember nutrients and elements? Those nitrogen, phosphorus, and carbon atoms from your food are the raw materials each cell needs to grow! Without proper nutrients, healing slows way down.",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'cell_grow' } },
        options: [
            { id: 'next', label: "What happens after it grows?", nextNodeId: 'dna_copy' }
        ]
    },

    'dna_copy': {
        id: 'dna_copy',
        speaker: 'AI',
        content: "**Step 2: The DNA COPIES itself!** 🧬🧬\n\nThis is the most important step! The squiggly DNA strands in the nucleus **unzip** and make an exact duplicate. Now there are TWO complete sets of instructions.\n\nWhy? Because each new cell needs its own full instruction manual. You can't rip a recipe book in half — both kitchens need the complete book!\n\nWatch the nucleus — see how the DNA strands have doubled?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'dna_copy' } },
        options: [
            { id: 'split', label: "Now it splits?!", nextNodeId: 'cell_split' }
        ]
    },

    'cell_split': {
        id: 'cell_split',
        speaker: 'AI',
        content: "**Step 3: The cell SPLITS in two!** ✂️➡️🟢🟢\n\nWatch carefully! The cell membrane **pinches inward** in the middle — like squeezing a balloon until it separates into two!\n\nEach half gets:\n- ✅ One complete set of DNA\n- ✅ Half of the cell's contents\n- ✅ Its own membrane\n\nAnd just like that — **one cell has become two identical cells!** This whole process takes about **24 hours** in human skin cells.",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'cell_split' } },
        options: [
            { id: 'healing', label: "So THAT'S how the wound heals!", nextNodeId: 'healing' }
        ]
    },

    'healing': {
        id: 'healing',
        speaker: 'AI',
        content: "Exactly! Now watch the **healing timeline**! 🩹⏱️\n\nThe cells at the wound edge divide: 1 → 2 → 4 → 8 → 16... Each new cell divides again, slowly **filling the gap** with fresh skin.\n\n🔗 *P9 Connection:* We can **measure** this healing! Skin cells divide roughly once per day. In a small scrape:\n- Day 1: ~100 new cells\n- Day 3: ~1,000 new cells  \n- Day 7: wound mostly closed!\n\nThat's the power of **exponential growth** — the same measuring-change idea from P9!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'healing' } },
        options: [
            { id: 'growth', label: "Is this how kids grow taller too?", nextNodeId: 'growth_vs_repair' }
        ]
    },

    'growth_vs_repair': {
        id: 'growth_vs_repair',
        speaker: 'AI',
        content: "**Great question!** Yes — growth and healing use the SAME process! 📏\n\nA baby starts as just **one single cell**. That cell divides into 2, then 4, then 8... and keeps going until there are **37 TRILLION cells** in an adult body!\n\nBig surprise: **you don't grow because cells get bigger** — you grow because you get **MORE cells!** A baby's cells and an adult's cells are roughly the same size.\n\nWatch the comparison: same-size cells, but WAY more of them in the adult!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'growth_vs_repair' } },
        options: [
            { id: 'checkpoint', label: "I'm ready for a quiz!", nextNodeId: 'checkpoint' }
        ]
    },

    'checkpoint': {
        id: 'checkpoint',
        speaker: 'AI',
        content: "⏸️ **Checkpoint Question!**\n\nKids and teenagers heal from scrapes and cuts FASTER than elderly people.\n\n**Why do younger people heal faster?**",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
        options: [
            { id: 'correct', label: "Their cells divide more quickly, so new skin cells fill the wound faster!", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
            { id: 'wrong1', label: "Because kids have thicker skin", nextNodeId: 'checkpoint_wrong1', sentiment: 'negative' },
            { id: 'wrong2', label: "Because kids have special healing goo that adults lose", nextNodeId: 'checkpoint_wrong2', sentiment: 'negative' }
        ]
    },

    'checkpoint_correct': {
        id: 'checkpoint_correct',
        speaker: 'AI',
        content: "✅ **Spot on!** 🎯\n\nYounger bodies have cells that divide **faster and more reliably**. A child's skin cells might divide every 20 hours, while an older adult's might take 30+ hours.\n\nMore divisions per day = faster gap-filling = quicker healing!\n\n🔗 *C9 Connection:* Good nutrition helps too — young, growing bodies are constantly building new cells, so they already have the nutrient-delivery systems running at full speed!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint', correct: true } },
        options: [
            { id: 'discovery', label: "Let's see everything we learned!", nextNodeId: 'discovery' }
        ]
    },

    'checkpoint_wrong1': {
        id: 'checkpoint_wrong1',
        speaker: 'AI',
        content: "Not quite! Kids actually have thinner, more delicate skin than adults. 🤔\n\nThe real reason is about **cell division speed**. In younger bodies, cells divide faster — producing new skin cells more quickly to fill the wound. As people age, cell division slows down, so healing takes longer.",
        options: [
            { id: 'retry', label: "Oh — it's about cell division speed, not skin thickness!", nextNodeId: 'checkpoint_correct', sentiment: 'positive' }
        ]
    },

    'checkpoint_wrong2': {
        id: 'checkpoint_wrong2',
        speaker: 'AI',
        content: "There's no special healing goo! 😄 Remember — wounds heal through **cell division**, not by filling in with a substance.\n\nThe real reason kids heal faster is that their cells divide more quickly. A young body's cells are in \"growth mode\" — they're already dividing constantly to help the child grow, so they're primed to repair damage fast!",
        options: [
            { id: 'retry', label: "So it's faster cell division, not goo!", nextNodeId: 'checkpoint_correct', sentiment: 'positive' }
        ]
    },

    'discovery': {
        id: 'discovery',
        speaker: 'AI',
        content: "🎉 **Big Discovery!**\n\n🔬 **How Your Body Heals and Grows:**\n1. **Mitosis** — one cell divides into two identical cells\n2. **The process:** cell grows → DNA copies → cell splits\n3. **Healing** = cells dividing to fill gaps in damaged tissue\n4. **Growth** = more cells, not bigger cells (a baby → 37 trillion cells!)\n5. Each new cell needs **nutrients** (C9) as raw building materials\n\n**Misconception busted:** Your body doesn't fill wounds with goo — it builds **real new cells**, one division at a time!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
        options: [
            { id: 'complete', label: "The human body is incredible! 🧬", nextNodeId: 'complete' }
        ]
    },

    'complete': {
        id: 'complete',
        speaker: 'AI',
        content: "🔗 **Big Idea 9 Complete — How Do Things Grow?**\n\n- Physics (P9): Measuring change — track healing rate, cells per day, growth over time\n- Chemistry (C9): Nutrients & elements — the raw materials every new cell needs to build itself\n- Biology (B9): Cell division — mitosis turns one cell into two, powering both healing and growth!\n\nAll three connect: **growth requires raw materials (C9), measured over time (P9), built one cell division at a time (B9).** 🧬🌱\n\n✅ **Lesson B9 Complete!**",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});


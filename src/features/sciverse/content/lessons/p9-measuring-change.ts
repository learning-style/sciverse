import { DialogNode } from '../../types';

/**
 * P9 — Measuring Change: The Growth Tracker
 * Big Idea 9: "How Do Things Grow?"
 * Scenario: "The Growth Tracker" — measuring how a plant and a puppy grow over weeks
 * Target Misconception: "Growing means getting bigger at the same rate"
 */
export const getP9Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Welcome to the Growth Tracker Lab! 🌱🐶\n\nWe have two living things to watch grow over 10 weeks:\n\n1. A **sunflower seedling** (just sprouted!)\n2. A **golden retriever puppy** (8 weeks old)\n\nEach week we'll measure their height and record it. Do you think they'll grow at the same rate?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
        options: [
            { id: 'same', label: "Probably — growth is growth, right?", nextNodeId: 'misconception_hook' },
            { id: 'different', label: "Maybe they grow differently?", nextNodeId: 'good_instinct' }
        ]
    },

    'misconception_hook': {
        id: 'misconception_hook',
        speaker: 'AI',
        content: "That's what most people think! \"Growing\" just means getting bigger, so everything should get bigger at the same speed, right? 🤔\n\nLet's test that idea by **measuring** carefully. I've set up a ruler next to our sunflower. Let's record its height each week!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'measuring' } },
        options: [
            { id: 'measure', label: "Let's start measuring!", nextNodeId: 'plant_measure' }
        ]
    },

    'good_instinct': {
        id: 'good_instinct',
        speaker: 'AI',
        content: "Interesting hunch! 🧠 You're already thinking like a scientist — not assuming, but asking.\n\nLet's find out by **measuring** carefully. I've set up a ruler next to our sunflower. We'll record its height each week and see what the data tells us.",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'measuring' } },
        options: [
            { id: 'measure', label: "Time to collect data!", nextNodeId: 'plant_measure' }
        ]
    },

    'plant_measure': {
        id: 'plant_measure',
        speaker: 'AI',
        content: "Here are the sunflower's heights over 10 weeks:\n\n| Week | Height (cm) |\n|------|------------|\n| 1 | 2 |\n| 2 | 3 |\n| 3 | 5 |\n| 4 | 12 |\n| 5 | 25 |\n| 6 | 42 |\n| 7 | 55 |\n| 8 | 60 |\n| 9 | 62 |\n| 10 | 63 |\n\nLook at those numbers. Something interesting is happening. Let's turn this into a **line graph** to see it clearly! 📈",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'plant_graph', week: 10 } },
        options: [
            { id: 'see_graph', label: "Show me the graph!", nextNodeId: 'plant_scurve' }
        ]
    },

    'plant_scurve': {
        id: 'plant_scurve',
        speaker: 'AI',
        content: "Look at that shape! The plant's growth forms an **S-curve** 🪴:\n\n- **Weeks 1–3**: Slow start — the seedling was building roots underground\n- **Weeks 4–6**: ZOOM! Rapid growth — cells dividing fast with plenty of sunlight\n- **Weeks 7–10**: Slowing down — approaching its maximum height\n\nThe plant did NOT grow at the same rate each week. Some weeks it barely grew, other weeks it shot up like a rocket! 🚀",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'plant_graph', week: 10, showAnnotation: true } },
        options: [
            { id: 'puppy', label: "What about the puppy?", nextNodeId: 'puppy_measure' }
        ]
    },

    'puppy_measure': {
        id: 'puppy_measure',
        speaker: 'AI',
        content: "Now let's check the puppy's height at the shoulder:\n\n| Week | Height (cm) |\n|------|------------|\n| 1 | 22 |\n| 2 | 28 |\n| 3 | 33 |\n| 4 | 37 |\n| 5 | 40 |\n| 6 | 42 |\n| 7 | 44 |\n| 8 | 45 |\n| 9 | 45.5 |\n| 10 | 46 |\n\nThe puppy grew a LOT in the first weeks but less and less as time went on. Let's graph this too! 📊",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'puppy_graph', week: 10 } },
        options: [
            { id: 'see_both', label: "Let me compare both graphs!", nextNodeId: 'rate_compare' }
        ]
    },

    'rate_compare': {
        id: 'rate_compare',
        speaker: 'AI',
        content: "Now both curves are on the same graph! 🔍\n\n🟢 **Sunflower** (green): Slow → Fast → Slow (S-curve)\n🔵 **Puppy** (blue): Fast → Slower → Nearly stopped (decelerating)\n\nThey have completely different growth patterns! The **rate of change** — how FAST something grows per week — is the real story here.\n\n**Rate = How much height changes in one week**\n\nLet's look at the rates side by side.",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'rate_compare' } },
        options: [
            { id: 'rates', label: "Show me the rates!", nextNodeId: 'slope_intro' }
        ]
    },

    'slope_intro': {
        id: 'slope_intro',
        speaker: 'AI',
        content: "On a graph, the **rate** shows up as the **slope** — how steep the line is! 📐\n\n- **Steep line** = fast growth (big change per week)\n- **Flat line** = slow growth (small change per week)\n\nI'm drawing a \"rise over run\" triangle on the plant's steepest part (weeks 4–6). The rise is the height gained, the run is the weeks passed.\n\n**Slope = Rise ÷ Run = (42 - 12) ÷ (6 - 4) = 15 cm/week!** 📏",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'slope', slopeTarget: 'plant', weekStart: 4, weekEnd: 6 } },
        options: [
            { id: 'puppy_slope', label: "What's the puppy's steepest slope?", nextNodeId: 'puppy_slope' }
        ]
    },

    'puppy_slope': {
        id: 'puppy_slope',
        speaker: 'AI',
        content: "The puppy's fastest growth was at the very start (weeks 1–2):\n\n**Slope = (28 - 22) ÷ (2 - 1) = 6 cm/week**\n\nBut by weeks 9–10:\n**Slope = (46 - 45.5) ÷ (10 - 9) = 0.5 cm/week**\n\nThe puppy's growth RATE dropped from 6 cm/week to just 0.5! That's 12 times slower! 🐕‍🦺\n\nNow for the big question…",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'slope', slopeTarget: 'puppy', weekStart: 1, weekEnd: 2 } },
        options: [
            { id: 'checkpoint', label: "I'm ready!", nextNodeId: 'checkpoint' }
        ]
    },

    'checkpoint': {
        id: 'checkpoint',
        speaker: 'AI',
        content: "⏸️ **Prediction Time!**\n\nLook at the sunflower's graph. During which week did the sunflower grow the FASTEST?\n\n(Hint: look for the steepest part of the curve!)",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
        options: [
            { id: 'week2', label: "Week 2", nextNodeId: 'checkpoint_wrong_early' },
            { id: 'week5', label: "Week 5", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
            { id: 'week9', label: "Week 9", nextNodeId: 'checkpoint_wrong_late' }
        ]
    },

    'checkpoint_wrong_early': {
        id: 'checkpoint_wrong_early',
        speaker: 'AI',
        content: "Not quite! In week 2, the sunflower only grew from 2 to 3 cm — that's just 1 cm.\n\nLook at week 5: it grew from 12 to 25 cm — that's **13 cm in one week!** That's the steepest part of the curve. 📈\n\nThe plant was slow at the start because it was building roots first!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint', highlight: 5 } },
        options: [
            { id: 'discovery', label: "Week 5 was the growth explosion!", nextNodeId: 'crosslink' }
        ]
    },

    'checkpoint_correct': {
        id: 'checkpoint_correct',
        speaker: 'AI',
        content: "Nailed it! ✅ \n\nWeek 5: the sunflower shot from 12 cm to 25 cm — a growth of **13 cm in one week!** That's the steepest slope on the graph.\n\nYou read that graph like a pro! 📊",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint', highlight: 5 } },
        options: [
            { id: 'crosslink', label: "But WHY does growth speed change?", nextNodeId: 'crosslink' }
        ]
    },

    'checkpoint_wrong_late': {
        id: 'checkpoint_wrong_late',
        speaker: 'AI',
        content: "By week 9, growth had almost stopped — only 2 cm that week! The curve is nearly flat there.\n\nThe fastest week was **week 5**: from 12 cm to 25 cm — **13 cm of growth!** That's where the graph is steepest. 📈",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint', highlight: 5 } },
        options: [
            { id: 'discovery', label: "The middle had the biggest jump!", nextNodeId: 'crosslink' }
        ]
    },

    'crosslink': {
        id: 'crosslink',
        speaker: 'AI',
        content: "Great question! Growth rate depends on TWO things from the other sciences:\n\n🧪 **Chemistry (C9)**: Growth needs **nutrients and elements** — carbon, nitrogen, water. When nutrients are plentiful, growth speeds up! When they run low, growth slows.\n\n🧬 **Biology (B9)**: Growth happens because **cells divide** (mitosis). Young organisms have cells dividing rapidly, but the rate slows as they mature.\n\nGraphs help us SEE these invisible processes! 📊",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
        options: [
            { id: 'final', label: "Graphs reveal hidden patterns!", nextNodeId: 'discovery' }
        ]
    },

    'discovery': {
        id: 'discovery',
        speaker: 'AI',
        content: "🎉 **Big Discovery!**\n\n**Graphs are X-ray vision for change!** They reveal patterns invisible in raw numbers.\n\n- **Rate** = how fast something changes per unit of time\n- **Slope** = how steep the line is = the rate on a graph\n- Steep = fast change. Flat = slow change.\n- Different things grow with different curves — S-curves, decelerating curves, and more!\n\n⚡ **Misconception Busted:** Growth is NOT constant — it speeds up and slows down, and graphs show us exactly when!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
        options: [
            { id: 'complete', label: "Measuring change is a superpower!", nextNodeId: 'complete' }
        ]
    },

    'complete': {
        id: 'complete',
        speaker: 'AI',
        content: "🔗 **Big Idea 9 Complete — How Do Things Grow?**\n\n- Physics (P9) showed how to **measure and graph** growth rates over time\n- Chemistry (C9) shows that growth needs **nutrients & elements** as raw materials\n- Biology (B9) reveals that growth happens through **cell division** (mitosis)\n\nGraphs + Nutrients + Cell Division = the full story of growth! 📈🧪🧬\n\n✅ **Lesson P9 Complete!**",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});


import { DialogNode } from '../../types';

/**
 * P26 -- Hot Side, Cold Side
 * Big Idea 26: "How Do We Predict Weather?"
 * Level 1 (Grades 3-8) -- Simple, concrete, 1 slider
 */
export function getP26Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "Look at this landscape! One side is warmed by the sun, the other side is cool and shady.\n\nWhy do you think **wind** blows from one side to the other?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'warm_rises', label: "Warm air rises and cool air fills in.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'wind_random', label: "Wind just blows randomly.", nextNodeId: 'misconception' },
                { id: 'sun_pushes', label: "The sun pushes the air.", nextNodeId: 'partial' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "It might seem random, but **wind** follows a pattern! When the sun heats the ground, the air **molecules** above it speed up and spread apart -- just like we saw in Lesson C1.\n\n**Warm air** with fast-moving spread-out molecules is lighter, so it floats up. Then the **cool air** (with slower, packed-together molecules) rushes over to fill the gap. That rushing air is what we call **wind**!",
            options: [
                { id: 'cont', label: "So warm air rising pulls cool air in?", nextNodeId: 'correct' }
            ]
        },
        partial: {
            id: 'partial',
            speaker: 'AI',
            content: "The sun does heat things up, but it doesn't push air like a fan. Instead, the sun warms the ground, which warms the air above it. That **warm air** rises because it's lighter.\n\n**Cool air** rushes in to take its place. That moving air is what we feel as **wind**!",
            options: [
                { id: 'cont', label: "Oh! So the sun starts it, but it's the air moving by itself.", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "That's it! Remember from Lesson C1 how heat makes **molecules** move faster? Here's the full picture:\n\n1. Sun heats the ground\n2. Ground heats the air -- **molecules speed up** and spread apart\n3. That spread-out air is lighter, so it **rises**\n4. **Cool air** (slower, packed-together molecules) rushes in to fill the gap\n5. We feel that moving air as **wind**!\n\nTry the **Sun Heat** slider to see it happen!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'try', label: "I'll crank up the heat!", nextNodeId: 'experiment' }
            ]
        },
        experiment: {
            id: 'experiment',
            speaker: 'AI',
            content: "Watch the warm side! As you turn up the heat, what happens to the **air particles** and the arrows?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'experiment' } },
            options: [
                { id: 'bigger', label: "The arrows get bigger -- more wind!", nextNodeId: 'checkpoint', sentiment: 'positive' },
                { id: 'nothing', label: "I'm not sure what changed.", nextNodeId: 'hint' }
            ]
        },
        hint: {
            id: 'hint',
            speaker: 'AI',
            content: "Look at the black dots -- those are **air particles**. On the hot side, they rise up. On the cool side, they flow sideways toward the hot side.\n\nSlide the heat all the way up, then all the way down. See the difference? More heat means more **air movement** means stronger **wind**!",
            options: [
                { id: 'see_it', label: "Now I see it! Bigger heat means bigger wind.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Quick check!** On a summer day, the dark parking lot gets super hot but the grassy park stays cool. Which way does the **wind** blow near the ground?",
            options: [
                { id: 'park_to_lot', label: "From the cool park toward the hot parking lot.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'lot_to_park', label: "From the hot parking lot toward the cool park.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Close! This is the tricky part -- it seems backwards! You might think air should blow from hot to cold, since **heat** flows that way.\n\nBut **wind** isn't heat flowing -- it's air **mass** moving. The hot air above the parking lot rises UP, leaving **low pressure** at the ground. The cool park air has **higher pressure**, so it rushes IN to fill the gap.\n\n**Wind follows pressure** (high to low), not temperature!",
            options: [
                { id: 'retry', label: "Oh! Wind follows pressure, not temperature.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Yes! Here's why it seems backwards but isn't:\n\n- **Heat energy** flows hot to cold (that's still true!)\n- But **wind** is about **pressure**, not temperature directly\n- Hot sand heats the air -- **molecules** speed up and spread out (Lesson C1) -- air becomes lighter and rises\n- That creates **low pressure** at the ground on the hot side\n- Cool park air has **higher pressure**, so it rushes toward the **low pressure** zone\n\nThis is a **sea breeze** -- wind follows the **pressure difference**, which temperature created!",
            options: [
                { id: 'disc', label: "So heat makes the pressure, pressure makes the wind!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered how wind works!**\n\nHeat makes **molecules** move fast and spread out (Lesson C1). That light air rises, creating **low pressure**. Denser cool air rushes in from **high pressure** areas.\n\nSo temperature creates the **pressure difference**, and **pressure difference** drives the **wind**. The bigger the temperature gap, the stronger the wind.\n\nThis same loop creates **storms**, **sea breezes**, and even the big **wind patterns** around the whole planet!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Heat -> pressure -> wind. Got it!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Big Idea 26 -- P26 Complete!**\n\nHot Side, Cold Side -- How Do We Predict Weather?\n\nPredicting **wind** is one key part of predicting weather. Meteorologists measure temperature differences across regions to forecast which way the wind will blow and how strong it will be.\n\n**Summary Table:**\n| What You Learned | Key Idea | How It Helps Predict Weather |\n| --- | --- | --- |\n| Warm air rises | Fast molecules spread out, become lighter | Tells us where low pressure forms |\n| Cool air rushes in | High pressure flows toward low pressure | Predicts wind direction |\n| Bigger temp gap = stronger wind | Pressure difference drives wind speed | Forecasts storm strength |\n\n**Up next:** C26 (Cloud Factory) -- predicting clouds and rain, another piece of the weather puzzle!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}

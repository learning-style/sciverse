import { DialogNode } from '../../types';

export function getP38Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "Try this: close your eyes and walk in a straight line across a room. Almost everyone drifts sideways.\n\nWith your eyes open you walk straight easily -- not because you never drift, but because you **see the drift and correct it**, dozens of times a second, without noticing.\n\nThat constant sense-and-correct pattern is called a **feedback loop**. What do you think a robot needs to follow a line?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'loop', label: "It has to keep checking where it is, compare that to where it should be, and steer back -- over and over.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'program', label: "It needs perfect instructions at the start telling it exactly how to move the whole way.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Perfect instructions sound tidy, but they fail in the real world -- exactly like walking with your eyes closed.\n\nWheels slip a little. The floor is not perfectly flat. A tiny motor runs a hair faster than its twin. Each error is small, but errors **add up**, and a robot following blind instructions is lost within metres.\n\nThe fix is not better instructions. It is **feedback**: check reality constantly and correct constantly. A robot with feedback never needs to be perfect -- it only needs to notice when it is wrong.",
            options: [
                { id: 'cont', label: "So it fixes small errors before they grow?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! Every **feedback loop** repeats the same four steps, many times a second:\n\n1. **Sense** -- measure what is actually happening (where is the line?)\n2. **Compare** -- how far is that from where it should be? This gap is the **error**\n3. **Correct** -- steer back, using a bigger push for a bigger error\n4. **Repeat** -- go straight back to step 1\n\nThe key setting is how *hard* the robot corrects, which engineers call the **gain**:\n- **Gain too low** -- lazy corrections, so the robot drifts off the line\n- **Gain too high** -- it overshoots, then over-corrects the other way, wobbling wildly\n- **Just right** -- smooth, quick, stable tracking\n\nSlide **Correction Strength** and try to make the robot follow the line smoothly!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Let me tune the correction strength!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** A robot keeps drifting off the line, so an engineer turns the **correction strength way up** to make it respond harder.\n\nNow the robot swings violently left and right and falls off the line completely. Why did a stronger correction make it worse?",
            options: [
                { id: 'right', label: "It over-corrects past the line, then over-corrects back the other way, and each swing grows bigger.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "The motors were too weak to handle the stronger commands, so they broke down.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The motors are fine -- they are doing precisely what they were told. The problem is that they are being told **too much**.\n\nPicture the robot drifting 1 cm left. With very high gain it swings 3 cm right -- now it is 2 cm off on the *other* side. So it swings 6 cm left. Then 12 cm right. Each correction is bigger than the error it was fixing, so the wobble **grows** instead of shrinking. Engineers call this an **unstable** loop.\n\nYou have felt this yourself in a shower: turn the tap too far to fix cold water, get scalded, yank it back, freeze again. Same loop, same mistake.\n\nGood control is about correcting **just enough**.",
            options: [
                { id: 'retry', label: "Oh -- over-correcting makes the wobble grow!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! **Stability comes from correcting the right amount, not the biggest amount.**\n\n- Too little **gain** -- slow, drifting, never quite arrives\n- Too much gain -- **oscillation**, wobbling that grows out of control\n- The right gain -- fast and steady\n\nThis single loop controls almost every machine around you: a thermostat holding room temperature, a drone hovering, a car's cruise control, a rocket balancing on its own flame.\n\nBut a feedback loop is useless without good **senses**. In C38 you will find out how a robot actually feels the world!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Correct just enough -- not too much, not too little!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered how machines control themselves!**\n\n- A **feedback loop** is sense, compare, correct, repeat\n- The gap between actual and target is the **error**\n- **Gain** sets how hard the machine corrects\n- Too little gain drifts; too much causes **oscillation**\n- Blind instructions fail because small errors add up\n- Thermostats, drones, and cruise control all use this same loop\n\nNext in C38: the materials that let a robot sense anything at all!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Sense, compare, correct, repeat!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**P38 Complete -- The Feedback Loop!**\n\nMachines stay on target by noticing they are wrong and fixing it, over and over.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| Sense, compare, correct, repeat | The **feedback loop** | Runs every self-controlling machine |\n| The gap is the **error** | Measure reality, not hope | Blind plans drift off course |\n| **Gain** sets correction strength | How hard to push back | The critical setting |\n| Too much gain wobbles | **Oscillation** grows | Stronger is not better |\n\n**Up next:** C38 (Materials That Sense) -- how machines feel the world!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}

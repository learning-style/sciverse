import { DialogNode } from '../../types';

export function getB44Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "The inside of a seashell is made of the same mineral as ordinary chalk -- a material so weak you can crush it in your fingers.\n\nYet a shell is about **3,000 times harder to break** than a lump of that chalk.\n\nNature did not use a better ingredient. So what did it do?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "It built the mineral in thin layers with a soft glue between them, so cracks cannot run straight through.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'bad', label: "Shells must contain a secret extra mineral that ordinary chalk does not have.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Scientists have looked very carefully, and there is no secret ingredient. A shell is about **95% the same chalky mineral**, plus a small amount of soft natural glue.\n\nThe trick is the **arrangement** -- exactly the lesson from **C44**.\n\nThe mineral is laid down in thousands of microscopic **layers**, like a brick wall, with a thin layer of soft, stretchy glue between each one. When a crack starts, it races through one hard layer and then hits the soft glue, which **absorbs the energy and stops it**.\n\nTo break the shell, a crack has to be stopped and restarted thousands of times.",
            options: [
                { id: 'cont', label: "So the layers stop the crack travelling?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! Nature solves the **hard versus tough** problem from **P44** by combining both:\n\n1. **Hard layers** resist scratching and denting\n2. **Soft layers** between them stop cracks spreading\n3. Together they are far **tougher** than either material alone\n\nThis is called a **layered material**, and nature uses it everywhere:\n\n- **Shell** -- hard mineral layers with soft glue between\n- **Wood** -- stiff fibres held in a softer surround\n- **Bone** -- hard mineral around flexible fibres, which you met in B17\n- **Silk** -- stiff crystal patches linked by stretchy sections\n\nEngineers now copy this deliberately. Safety glass, plywood and modern body armour are all layered for the same reason.\n\nIn the picture, a **crack** travels down through the layers.\n\nSlide **Number of Layers** and see how far it gets!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Let me see how layers stop the crack!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** An engineer makes a plate from a single thick block of the same hard mineral a shell uses, with no layers at all.\n\nHow will it compare with the shell?",
            options: [
                { id: 'right', label: "It will be just as hard but far easier to shatter, because a crack can run straight through with nothing to stop it.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "It will be stronger than the shell, because a solid block has no weak glue lines in it.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The glue lines look like weak points, and that is exactly why they work!\n\nIn a solid block, a crack that starts anywhere can travel all the way through in one clean run. Nothing interrupts it. The block is hard, and it shatters -- just like the glass bar in **P44**.\n\nIn the shell, that same crack is stopped by soft glue thousands of times. Each stop absorbs a little energy. The **deliberate soft parts** are what make the whole thing tough.\n\nThis is the same lesson as **C43 Materials That Protect**: something that gives way in a controlled manner beats something that simply resists until it fails.",
            options: [
                { id: 'retry', label: "Oh -- the soft layers are the reason it is tough!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! **Toughness comes from structure, not from a tougher ingredient.**\n\nAll three lessons of Big Idea 44 stack into one answer:\n- **P44** -- **hardness** and **toughness** are different, and raising one often lowers the other\n- **C44** -- the same atoms give very different materials depending on how they are joined\n- **B44** -- nature escapes the trade-off by **layering** hard and soft together\n\nSo where do a material's properties come from? Not mainly from what it is made of. From **how it is put together**.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Structure beats ingredients!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered nature's material trick!**\n\n- A shell is mostly the same weak mineral as chalk\n- It is about **3,000 times** harder to break\n- The mineral is built in thousands of thin **layers**\n- Soft glue between the layers **stops cracks spreading**\n- **Layered materials** get hardness and toughness together\n- Shell, wood, bone and silk all use this, and engineers now copy it\n\nP44 separated hard from tough, C44 showed arrangement decides properties, and B44 showed nature using both!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Layers beat any single material!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Big Idea 44 -- B44 Complete!**\n\nNature's Layered Armour -- How Do Everyday Materials Get Their Properties?\n\nProperties come from arrangement far more than from ingredients.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| A shell is mostly chalk | No secret ingredient | 3,000 times tougher anyway |\n| Thousands of thin layers | Hard layers plus soft glue | A **layered material** |\n| Soft glue stops cracks | Each stop absorbs energy | Toughness without losing hardness |\n| Engineers copy this | Safety glass, plywood, armour | Structure beats ingredients |\n\n**Big Idea 44 connections:**\n- P44 (Bend, Scratch, Break) showed that hardness and toughness are separate, and raising one usually lowers the other\n- C44 (Same Atoms, Different Material) showed pencil lead and diamond are both carbon, differing only in how the atoms are joined\n- B44 (Nature's Layered Armour) showed how layering hard and soft together escapes the trade-off entirely!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}

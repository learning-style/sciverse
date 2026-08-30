import { DialogNode } from '../../types';

export function getB46Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "Walk into a dim room at night and something odd happens. You can still see the furniture perfectly well -- but everything looks **grey**. The red cushion and the blue one are both just... grey.\n\nThe cushions have not changed. The room still has some light in it.\n\nSo why does your colour vanish in the dark?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Your eye has two kinds of light detector, and the one that senses colour stops working when the light gets low.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'bad', label: "There is no colour in dim light -- colour needs bright light to exist.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "The colour is still arriving! Point a camera at that dim room, leave the shutter open, and the photograph comes out in full colour. The light entering your eye still carries it.\n\nThe limit is in **you**. The back of your eye holds two different kinds of light-catching cell:\n\n- **Cones** see **colour**, but they only work when there is a decent amount of light\n- **Rods** work in very dim light, but they cannot tell colours apart at all\n\nIn daylight your cones do the work and you see colour. As the light drops, the cones stop working and the rods take over. Rods only tell you how bright something is -- so you get a clear grey picture.\n\nYou are not losing the colour. You are switching to a different set of cells.",
            options: [
                { id: 'cont', label: "So a different kind of cell takes over in the dark?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! And here is where **P46** gets its answer.\n\nYou have **three kinds of cone**, and each responds best to a different part of the light:\n\n1. Cones most sensitive to **red** light\n2. Cones most sensitive to **green** light\n3. Cones most sensitive to **blue** light\n\nThat is it. Just three. Every colour you have ever seen comes from your brain checking **which cones are shouting loudest**. There is no yellow cone at all. Yellow light makes the red and green cones shout about equally, and your brain calls that mixture yellow.\n\nThat is exactly why a screen only needs **red**, **green** and **blue** dots. A screen showing yellow makes no yellow light at all. It just makes your red and green cones shout equally, the same as real yellow would, and your brain cannot tell the difference.\n\n**Screens are built with three colours because your eye is.**\n\nIn the picture you can see the **cone cells** and the **rod cells**, and four colour patches showing what you would see.\n\nSlide **Light Level** from **bright daylight** down to **moonlight** and watch the colour drain away!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Let me turn the light down and watch!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** Someone with red-green colour blindness looks at a red apple on green grass. Most people see a strong contrast; they see very little.\n\nWhat is different about their eye?",
            options: [
                { id: 'right', label: "One of their three cone types is missing or shifted, so red and green fire almost the same pattern and their brain cannot separate them.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Their eyes are damaged, and they see the whole world in grey.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Almost nobody with colour blindness sees in grey -- that condition is extremely rare. Their world is full of colour; it is just missing some **distinctions**.\n\nColour vision works by comparing how loudly the three cone types shout. If one type is missing, or shouts too much like its neighbour, then two colours that should sound different now sound almost the same. The brain has nothing left to tell them apart.\n\nRed-green is the most common case, and it affects roughly **1 boy in 12**. They see reds and greens -- those colours simply look similar to each other.\n\nThis is why good designers never rely on colour alone. Adding a **shape**, a label or a pattern means the information survives whatever cones a reader has -- the same design-for-the-range thinking you met in **B43**.",
            options: [
                { id: 'retry', label: "Oh -- it is about telling colours apart, not losing colour!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! **Colour is a comparison your brain makes, not a property it receives.**\n\nAll three lessons of Big Idea 46 join up here:\n- **P46** -- light **adds**, and three colours of light can build all the rest\n- **C46** -- on paper, colour is a **pigment** molecule that **UV** can break\n- **B46** -- you see colour by comparing **three cone types**, which is why three is the magic number\n\nScreens use red, green and blue because that is the shape of the eye reading them. Colour is not really out in the world -- it is what your brain makes of three signals.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Colour is what my brain does with three signals!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered how your eye makes colour!**\n\n- The **retina** holds two kinds of detector\n- **Cones** see **colour** but need decent light\n- **Rods** work in the dark but report only brightness -- hence grey at night\n- You have **three cone types**: red, green and blue sensitive\n- Every colour is your brain checking which cones shout loudest\n- Screens use three colours because your eye has three cone types\n- Colour blindness means two colours fire nearly the same pattern\n\nP46 mixed the light, C46 broke the pigment, and B46 showed the eye that reads them both!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Three cones is why screens need three colours!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Big Idea 46 -- B46 Complete!**\n\nHow Your Eyes See Colour -- How Do Color and Perception Work in Design?\n\nColour is not a property of light. It is what your brain makes of three signals.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| Two detector types | **Cones** for colour, **rods** for dim light | Night vision is grey |\n| Three kinds of cone | Red, green and blue sensitive | Three is the magic number |\n| Colour is a comparison | Your brain checks which shout loudest | Yellow has no cone of its own |\n| Screens copy the eye | Red, green, blue dots | They fool your cones, not your eyes |\n\n**Big Idea 46 connections:**\n- P46 (Mixing Light) showed that light adds, so red and green light make yellow where paint makes brown\n- C46 (Why Colours Fade) showed that colour on paper is a pigment molecule that UV can break for good\n- B46 (How Your Eyes See Colour) showed why three colours are enough -- because your eye reads colour with exactly three kinds of cone!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}

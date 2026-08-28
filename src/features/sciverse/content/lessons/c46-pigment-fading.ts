import { DialogNode } from '../../types';

export function getC46Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "A poster in a sunny window looks tired after a summer. The reds go pale, the blues turn grey, and the whole thing fades.\n\nA poster in a drawer, printed the same day with the same ink, still looks brand new.\n\nNothing touched the faded poster. So where did its colour go?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Sunlight broke the colour molecules apart, and a broken one cannot throw back its colour any more.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'bad', label: "The colour slowly evaporated off the paper into the air.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Nothing left the paper -- weigh the poster and it is the same. The colour molecules are still sitting there. They have just been **broken**.\n\nColour on paper comes from **pigment** and **dye** molecules. Each one is built to soak up some colours of light and throw back the rest, and the shape of the molecule decides which. A molecule that throws back red looks red.\n\nSunlight carries **ultraviolet**, usually shortened to **UV** -- light with more energy than the colours we can see. When UV strikes a colour molecule, it can snap one of its bonds. The pieces are still on the paper, but the shape has changed, so it no longer throws back the same colour.\n\nBroken molecule, no colour. That is fading.",
            options: [
                { id: 'cont', label: "So the molecules are still there but broken?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! **Fading is a chemical reaction driven by light.** Three things control how fast it happens:\n\n1. **How much UV** arrives -- direct sunlight fades far faster than a shaded room\n2. **How long** it is exposed -- damage adds up and never reverses\n3. **How tough the molecule is** -- some survive UV far better than others\n\nThat third one is why colours do not fade evenly. Many red and yellow dyes are built from fragile molecules and go first, which is why old posters drift towards blue. Some blues and blacks are much tougher and barely move.\n\nChemists fight back in two ways. They design **stable** pigments with sturdier molecules, and they add a **UV blocker** -- a clear coating that soaks up the UV before it reaches the colour, rather like sunscreen for a poster.\n\nA screen never fades this way, because a screen makes its colour with **light** rather than molecules, as you saw in **P46**.\n\nIn the picture, a poster sits in the sun. The **fading bar** shows how much colour is left.\n\nSlide **Days in Sunlight** and watch it go!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Let me leave it in the sun and see!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** A museum keeps its most precious paintings in dim, orange-tinted light, and visitors complain they cannot see them properly.\n\nWhy do the curators insist?",
            options: [
                { id: 'right', label: "Bright light, especially its UV, would slowly break the pigment molecules -- and that damage can never be undone.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Dim light makes the old colours look richer and more dramatic.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "It is nothing to do with appearance -- curators would love you to see the paintings clearly.\n\nEvery hour under bright light snaps a few more pigment molecules, and there is no way to unbreak them. You cannot restore a faded pigment; you can only slow the fading down. A painting that survived 400 years can be visibly damaged by a few decades of bright display.\n\nSo museums make a hard trade: dimmer light and orange-tinted lamps that carry almost no **UV**, so the painting survives for the next few centuries. Some of the most fragile works are shown for only a few weeks a year and rested in the dark between.\n\nThey are choosing the painting's future over your convenience today.",
            options: [
                { id: 'retry', label: "Oh -- every bright hour costs the painting permanently!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! **Fading cannot be reversed, only slowed.**\n\n- **UV** in sunlight snaps **pigment** and **dye** molecules\n- A broken molecule no longer throws back its colour\n- Damage **adds up** and never undoes itself\n- Fragile reds and yellows usually go first\n- **Stable** pigments and **UV blocker** coatings slow it down\n\nThat is the same shape of problem you met in **B45**: something that cannot repair itself, where prevention is the only option.\n\nBut all of this assumes your eye sees colour in the first place. How does it actually do that? That is B46!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "You can only slow fading, never undo it!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered why colours fade!**\n\n- Colour comes from **pigment** and **dye** molecules on the paper\n- The shape of a molecule decides which colour it throws back\n- **UV** light in sunlight can **snap** those molecules apart\n- A broken molecule cannot throw back its colour, so the poster fades\n- Damage builds up and **cannot be undone**\n- **Stable** pigments and a **UV blocker** coating slow it down\n\nNext in B46: how your eye turns light into colour at all!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Fading is sunlight breaking colour molecules!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**C46 Complete -- Why Colours Fade!**\n\nColour on paper is a molecule, and sunlight slowly takes those molecules apart.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| Colour comes from molecules | **Pigments** and **dyes** | Shape decides the colour |\n| UV snaps them apart | Fading is a chemical reaction | Nothing leaves the paper |\n| Damage cannot be undone | It only adds up | Museums keep light dim |\n| Coatings and tough pigments help | **UV blocker**, **stable** pigments | Sunscreen for a poster |\n\n**Up next:** B46 (How Your Eyes See Colour) -- why three colours are enough!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}

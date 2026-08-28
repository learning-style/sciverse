import { DialogNode } from '../../types';

export function getP46Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "Everyone learns that mixing red and green paint makes a muddy brown.\n\nNow shine a **red torch** and a **green torch** onto the same white wall. The overlap is not brown at all -- it is bright **yellow**.\n\nSame two colours. Why does mixing light give a completely different answer from mixing paint?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Mixing lights adds brightness together, while mixing paints takes colours away -- they are opposite processes.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'bad', label: "The torches must be the wrong shade of red and green.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Any red and green torches do this. The difference is not the shade -- it is what mixing actually **does** in each case.\n\nA **paint** works by **removing** colours. Red paint soaks up almost every colour in the light landing on it and throws back only red. Green paint throws back only green. Mix them and you have something that soaks up nearly everything, so very little escapes. That is the muddy brown -- you have taken away more than either paint did alone.\n\n**Light** works the other way. A red torch **adds** red. A green torch **adds** green. Shine both and the wall receives both, so the eye gets more light, not less. Red plus green arrives as **yellow**.\n\nPaint takes away. Light adds.",
            options: [
                { id: 'cont', label: "So paint subtracts colours and light adds them?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! Screens use the adding version, which is why every screen you own is built from just **three** colours:\n\n1. **Red** light\n2. **Green** light\n3. **Blue** light\n\nTurn on red and green together and you get **yellow**. Red and blue give **magenta**, a bright pink. Green and blue give **cyan**, a sky blue. Turn on **all three** and you get **white**.\n\nThat is genuinely all a screen does. Look at a phone screen through a magnifying glass and you will see nothing but tiny red, green and blue dots. Every photograph, every video, every colour you have ever seen on a screen is made from those three.\n\nThe obvious question is why **three**, and why those three. The answer is not in the screen at all -- it is in your eye, and it is waiting in **B46**.\n\nIn the picture, each circle is a coloured **light** shining on a white wall. Where they overlap, the light adds.\n\nSlide **Lights Switched On** and watch the colours combine!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Let me switch the lights on one at a time!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** A stage designer wants a pure white spotlight. She only has red, green and blue lamps.\n\nCan she make white?",
            options: [
                { id: 'right', label: "Yes -- shining all three together at full brightness gives white, because the light adds up.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "No -- white is not a colour you can make, so she needs a separate white lamp.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "She can absolutely make it, and theatres do exactly this every night.\n\nWith **paint**, white is impossible to mix -- you cannot take colours away and end up with all of them. That is why you buy white paint rather than mixing it.\n\nWith **light** it is the opposite. **White** is not the absence of colour; it is what your eye reports when **all** the colours arrive together. Red plus green plus blue covers enough of them that your eye calls it white.\n\nThis is why stage lighting rigs are built from coloured lamps, and why a screen with only red, green and blue dots can still show a white page.",
            options: [
                { id: 'retry', label: "Oh -- white is all the colours arriving at once!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! **Adding light and mixing paint work in opposite directions.**\n\n- **Paint** removes colours -- mixing gets darker and muddier\n- **Light** adds colours -- mixing gets brighter\n- **Red**, **green** and **blue** light together make **white**\n- Every screen is built from just those three\n\nSo screens add light. But a poster, a shirt or a painted wall has no light of its own -- it has **pigment**, and pigment behaves the paint way.\n\nWhat happens to those pigments over time? That is C46!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Light adds, paint takes away!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered why screens use three colours!**\n\n- **Paint** works by **removing** colours from the light landing on it\n- **Light** works by **adding** colours together\n- That is why red and green paint make brown, but red and green **light** make **yellow**\n- Red and blue light make **magenta**; green and blue make **cyan**\n- All three together make **white**\n- Every screen is built from tiny **red**, **green** and **blue** dots\n\nNext in C46: why those colours fade on a poster but never on a screen!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Screens add light; paint takes it away!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**P46 Complete -- Mixing Light!**\n\nMixing light and mixing paint are opposite operations, which is why they give opposite answers.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| Paint removes colours | Mixing gets darker | Red and green make brown |\n| Light adds colours | Mixing gets brighter | Red and green make **yellow** |\n| Three lights are enough | **Red**, **green**, **blue** | Every screen is built this way |\n| All three make white | White is all colours at once | Stage lights and screens both use it |\n\n**Up next:** C46 (Why Colours Fade) -- what sunlight does to a poster!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}

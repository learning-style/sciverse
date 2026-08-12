import { DialogNode } from '../../types';

export function getP40Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "Measure your desk with a ruler. Now measure it again. And again.\n\nYou will not get exactly the same number every time. Maybe 82.1 cm, then 82.3, then 82.0. Nobody made a mistake -- this is simply how measuring works.\n\nSo which of those numbers is the **real** length of the desk?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'range', label: "None of them exactly -- the true length sits somewhere in a small range, and more measurements narrow that range down.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'careful', label: "The most careful measurement is the right one -- the others were just done sloppily.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Careful work helps, but even a perfect scientist with a perfect ruler gets slightly different numbers. The wobble is real and it never fully goes away.\n\nWhy? The ruler's marks have a width. Your eye judges \"just past the line\" slightly differently each time. The desk itself expands a hair when the room warms up.\n\nSo scientists stopped chasing the one true number. Instead they report a **range**: \"82.1 cm, plus or minus 0.2 cm.\" That little **plus or minus** is called the **uncertainty**, and a measurement without it is incomplete.",
            options: [
                { id: 'cont', label: "So every measurement needs a plus-or-minus?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! There are two different kinds of error, and they behave very differently:\n\n**Random error** -- the small wobble that goes up as often as it goes down\n- Caused by tiny unpredictable things\n- **More measurements shrink it**, because the highs and lows cancel out\n\n**Systematic error** -- a mistake that leans the same way every time\n- Example: a ruler missing its first 2 mm, so *every* reading is 2 mm too short\n- **More measurements do NOT help** -- you get the same wrong answer, more precisely\n\nThat second one is the dangerous one. It hides behind confident-looking data.\n\nSlide **Number of Measurements** and watch the spread narrow around the true value!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Let me take more measurements and watch!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** A scientist weighs a rock 500 times on a digital scale and gets almost exactly 250.0 grams every single time. She is delighted by how consistent it is.\n\nBut the scale was never zeroed -- it reads 10 grams heavy. Do her 500 measurements help?",
            options: [
                { id: 'right', label: "No -- repeating cannot fix a **systematic error**, so all 500 readings are wrong by the same 10 grams.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Yes -- averaging 500 measurements makes the result far more accurate.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "This is the trap that catches even professional scientists.\n\nAveraging cancels out **random** errors, because they scatter in both directions. But this error does not scatter -- it pushes **every single reading 10 grams up**. Average 500 readings that are all 10 grams too high and you get an answer that is... 10 grams too high.\n\nSo her result is extremely **precise** (all the readings agree tightly) but not **accurate** (they all agree on the wrong number). Those two words mean different things, and confusing them is a classic mistake.\n\nThe only cure for **systematic error** is to **check the instrument itself** -- zero the scale, or measure something whose true weight you already know. This is called **calibration**.",
            options: [
                { id: 'retry', label: "Oh -- precise and accurate are not the same thing!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! Here is the difference in one picture: think of arrows on a target.\n\n- **Precise but not accurate** -- all arrows clustered tightly, but off to one side\n- **Accurate but not precise** -- arrows scattered widely, but centred on the bullseye\n- **Both** -- tight cluster, right on the bullseye\n\nSo:\n- Repeating measurements fixes **random error**\n- **Calibration** is the only thing that fixes **systematic error**\n- Always report your **uncertainty** -- a number without it is only half an answer\n\nMeasuring one thing well is the easy part. In C40 you will see how to prove that one thing actually **caused** another!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Precise is not the same as accurate!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered why every measurement has wiggle room!**\n\n- No measurement is exact -- always report the **uncertainty** (plus or minus)\n- **Random error** wobbles both ways and shrinks when you repeat\n- **Systematic error** leans one way every time and repeating never helps\n- **Precise** means readings agree; **accurate** means they are correct\n- Only **calibration** cures systematic error\n\nNext in C40: designing an experiment that can actually prove a cause!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Every measurement needs a plus-or-minus!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**P40 Complete -- Measure It Again!**\n\nHonest science starts by admitting exactly how much you do not know.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| No measurement is exact | Report the **uncertainty** | A bare number hides the truth |\n| Some errors wobble both ways | **Random error** | Repeating shrinks it |\n| Some errors always lean one way | **Systematic error** | Repeating never helps |\n| Tight is not the same as correct | **Precise** vs **accurate** | Only **calibration** fixes bias |\n\n**Up next:** C40 (The Fair Test) -- how to prove that one thing caused another!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}

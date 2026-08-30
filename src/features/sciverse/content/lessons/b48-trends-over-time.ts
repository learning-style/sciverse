import { DialogNode } from '../../types';

export function getB48Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "You now have two ways of finding animals. Camera traps from P48 catch whatever walks past. Water traces from C48 catch whatever swam past.\n\nSo you spend a summer working in a park and you come back with a number. **40 hedgehogs.**\n\nIs that good news or bad news?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "You cannot possibly tell yet, because you have nothing to compare it against -- you need to know what the number used to be.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'bad', label: "Good news, because 40 is a fairly big number and that means plenty of hedgehogs are living there.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Forty on its own means nothing at all. Watch what happens when you add the missing piece.\n\nIf the park held **300** hedgehogs five years ago, then 40 is a catastrophe.\n\nIf the park held **5** hedgehogs five years ago, then 40 is a triumph and whatever they did there is working beautifully.\n\nSame 40. Opposite meanings.\n\nOne count on its own is only a **snapshot** -- a single moment, frozen. What scientists actually want is the **trend**, which just means **which way the numbers are heading over time**. Up, down, or steady.\n\nAnd you cannot get a trend from one number, however carefully you counted it. You need the same count, done again and again, year after year.",
            options: [
                { id: 'cont', label: "So one number tells you nothing without the years before it?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! Watching a trend has three rules.\n\n**1. Count many times.** One count is a snapshot. A trend needs years of them.\n\n**2. Count the same way every time.** If you use 5 cameras one year and 20 the next, your number will leap upwards -- but no new animals arrived. You just looked harder. Change your method and you have measured your method, not the wildlife.\n\n**3. Expect the numbers to wobble.** Counts jump around on their own. A cold spring, a good berry year, a wet week during the count -- all of these push a number up or down without anything real having changed. That jumping about is called the **wobble**.\n\nThis is why two years is never enough. A drop from one year to the next might be a genuine fall, or it might be nothing but wobble. Only after many years does the wobble average itself out and the real direction show through.\n\nIn the picture, each dot is one year's butterfly count.\n\nSlide **Years of Watching** and see when the truth appears!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Let me watch for more years!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** A park counts its butterflies the same way every summer.\n\nYear 1: **100 butterflies.** Year 2: **60 butterflies.**\n\nThe local newspaper prints: \"Butterflies halved -- disaster in our park!\"\n\nWhat should a scientist say?",
            options: [
                { id: 'right', label: "That two years is nowhere near enough -- counts wobble on their own, so you need many more years before you can tell a real fall from an ordinary wobble.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "That the newspaper is right, because 60 really is far fewer than 100 and the counts were done properly.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The counts are honest. Nobody miscounted. But **two dots do not make a line**.\n\nThink about what else changed between those two summers. Perhaps year 1 was warm and still, perfect for butterflies. Perhaps year 2 was wet, and butterflies stay hidden in the rain. The counters counted correctly both times and got very different numbers.\n\nYear 3 might come back at 110 and the disaster vanishes.\n\nThis is exactly why one bad year should never be reported as a crash -- and, just as importantly, why one good year should never be reported as a recovery. **A trend needs enough years for the wobble to average out.**\n\nA scientist looking at 100 and then 60 says something quite boring: \"Interesting. Ask me again in ten years.\"",
            options: [
                { id: 'retry', label: "Oh -- two dots do not make a line!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! **A trend needs many years, counted the same way, before it can be trusted.**\n\nAnd now the three pieces fit together into one job.\n\n- **P48** taught you **where** to look -- spread your samples out, or you only learn about one path\n- **C48** taught you **how** to find the hidden ones -- traces in the water, which stay readable for days\n- **B48** taught you **when** to believe it -- not one year, but many\n\nGet any one of the three wrong and the answer is worthless. Bunch your cameras and you miss half the wood. Ignore how fast traces break down and you announce an animal is gone when it swam past last month. Trust a single year and you turn an ordinary wobble into a headline.\n\nGet all three right and you can say something genuinely useful: **this wood is getting richer, or it is getting poorer, and here is how we know.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Only many years can tell a real fall from a wobble!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered how we really keep track of wildlife!**\n\n- One count is only a **snapshot**\n- A **trend** is which way the numbers are heading over time\n- Count **the same way** every year, or you measure your method instead\n- Counts **wobble** on their own -- weather, food, luck\n- Two years can never separate a real fall from a wobble\n- Many years let the wobble average out and the truth show\n- **P48** gave you where to look, **C48** how to find the hidden ones, **B48** when to believe it\n\nThat is how the health of a whole wood gets measured!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Many years, counted the same way, reveal the truth!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**B48 Complete -- Counting What You Cannot See!**\n\nYou can now say whether a place is getting better or worse -- and explain why anyone should believe you.\n\n**Summary Table:**\n| Lesson | Key Idea | What It Gave You |\n| --- | --- | --- |\n| **P48** Where to Put the Camera | Each camera is one **sample** | Spread out, or you only learn about one path |\n| **C48** Traces in the Water | Animals leave **DNA** behind | Find the hidden ones -- but only recent visitors |\n| **B48** Counting What You Cannot See | One count is a **snapshot** | A **trend** needs many years of counting |\n\n**The big idea:** you cannot count every animal, so you sample carefully, you sample the same way each time, and you watch for long enough that the **wobble** averages out.\n\n**Big Idea 48 complete!** Next: how we use what the Earth gives us without using it up.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}

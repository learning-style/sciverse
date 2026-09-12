import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) companion to B4 "The Senses".
 *
 * B4 followed a signal from ear or eye to the brain. This lesson asks how the
 * brain decides a change has happened, and answers with Weber's rule: the just
 * noticeable difference is a fixed fraction of what was already there.
 *
 * Nerve signal speed was avoided on purpose -- Big Idea 7's biology lesson owns
 * nerve signals and myelin. Weber's rule also closes the Level 2 theme for
 * Big Idea 4: all three lessons turn out to be about ratios.
 */
export function getL2B4Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "In B4 you followed a signal from your eye or ear, along a nerve, to your brain. The brain is what finally decides whether you sensed something.\n\nHere is a test of how it decides.\n\nYou are holding an envelope weighing **100 g**. Someone slips a **5 g** coin inside. You notice straight away -- it feels heavier.\n\nNow you are holding a shopping bag weighing **5,000 g**. Someone slips the very same **5 g** coin inside.\n\nWill you notice?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Almost certainly not. The same 5 g is a big share of the envelope but a tiny share of the heavy bag, and it is the share that the brain notices.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "Yes. 5 g is 5 g, and your hand is just as sensitive to it whatever you are already holding.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "The coin really is the same 5 g either way, and it presses on your hand with the same extra force. Yet you would not notice it in the bag. People have tested this carefully, thousands of times.\n\nThe explanation is that the brain does **not** judge the extra amount on its own. It judges the extra amount **compared with what was already there**.\n\n- 5 g added to 100 g is **5%** more\n- 5 g added to 5,000 g is **0.1%** more\n\nThe first is easy to feel. The second is lost completely.\n\nThis is not a flaw. A sense that measured amounts would be useless across the huge range of things you meet -- a feather and a suitcase, a whisper and a shout. Judging changes as a **share** lets one sense work across all of them.",
            options: [
                { id: 'cont', label: "So what share does it take before I notice?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "That was measured in the 1830s by a scientist named **Ernst Weber**.\n\nThe **just noticeable difference** is the smallest change a person can reliably detect.\n\nWeber found that it is not a fixed amount. It is always the same **share** of the starting amount. That discovery is called **Weber's rule**:\n\n**just noticeable difference = k x starting amount**\n\nThe number **k** in the rule is called the **Weber fraction**. It is the share itself, written as a decimal: k = 0.03 means **3%**.\n\nSo there are two names, and they are two parts of one idea:\n\n| Name | What it is | Example |\n| --- | --- | --- |\n| **Weber's rule** | The pattern: a change is noticed only when it is a big enough share of what was already there | Works for weight, brightness and loudness |\n| **Weber fraction, k** | The number in the rule: how big that share must be, for one sense | 0.03 for weight |\n\nThink of a sale in two shops. In both shops the rule is the same: *every price is cut by the same share*. But one shop takes 10% off, and the other takes 25% off. Same rule, different fraction. Your senses work like that: **one rule, and a different k for each sense**.\n\nBecause k is one amount divided by another of the same kind, it has **no units** -- like L2C2's relative atomic masses.\n\nEach sense has its own k. These are typical values:\n\n| Sense | Weber fraction, k |\n| --- | --- |\n| Weight lifted in the hand | about **0.03** (3%) |\n| Brightness of light | about **0.08** (8%) |\n| Loudness of sound | about **0.1** (10%) |\n\nA condition belongs right here. **Weber's rule works well in the middle of a sense's range**, but not at the extremes. For something very faint -- a single candle in a dark field -- you need more than k predicts, and for something overwhelming the rule breaks down again. The values also vary from person to person.",
            options: [
                { id: 'cont', label: "Then work out the envelope and the bag.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "Use the value for weight, **k = 0.03**.\n\n**The envelope, 100 g:**\njust noticeable difference = 0.03 x 100 = **3 g**\n\nThe coin is 5 g, more than 3 g, so you **notice** it.\n\n**The bag, 5,000 g:**\njust noticeable difference = 0.03 x 5,000 = **150 g**\n\nThe coin is 5 g, far less than 150 g, so you **do not notice** it. Someone would have to add about **150 g** -- roughly the weight of an apple -- before the bag felt heavier.\n\nSame coin. Same hand. The difference is entirely in what you were already holding.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** For brightness, **k is about 0.08**.\n\nA room is lit by **50 candles**. How many **extra** candles must be lit before the room looks noticeably brighter?",
            options: [
                { id: 'right', label: "4 candles, because the just noticeable difference is 0.08 x 50 = 4.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'percent', label: "8 candles, because the Weber fraction for brightness is 8%.", nextNodeId: 'math_wrong' },
                { id: 'any', label: "1 candle, because any extra light can be seen.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**8 candles** read the 8% as 8 of something. But k is a **fraction of the starting amount**, not a number of candles. It has to be multiplied by how much you started with: 0.08 x 50 = **4**. With 100 candles the answer would be 8; with 25 it would be 2.\n\n**1 candle** assumes any extra light is noticed. In a completely dark room that is nearly true -- which is the condition from before, where Weber's rule breaks down for very faint signals. But a room already lit by 50 candles is well into the middle of the range. One more candle there is only a **2%** increase, well under the 8% you need.\n\njust noticeable difference = 0.08 x 50 = **4 candles**",
            options: [
                { id: 'retry', label: "Multiply the fraction by the starting amount.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials, both in **grams**.\n\n**Starting Weight** is what you are already holding. **Added Weight** is the extra that gets slipped in.\n\nThe lab uses **k = 0.03** for lifted weights, works out the just noticeable difference, and shows whether you would feel the change.\n\nTry this. Set **Added Weight** to 5 g and leave it there. Then slide **Starting Weight** upwards. At first the coin is easy to feel. Somewhere past about **170 g** it stops being noticeable -- even though nothing about the coin changed.\n\nNow do the reverse. Hold 2,000 g and find how much has to be added before it registers. You should need about **60 g**.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Same coin, gone past 170 g. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A light dimmer is turned up twice.\n\n**First:** from **10 lamps** to **20 lamps**.\n**Later:** from **100 lamps** to **110 lamps**.\n\nBoth times, exactly **10 lamps** were added. Using **k = 0.08** for brightness, which change looks bigger -- and would the second one be noticed at all?",
            options: [
                { id: 'right', label: "The first looks far bigger: it doubles the light, and the 0.8-lamp threshold is easily passed. The second adds only 10%, just past its 8-lamp threshold, so it is barely noticeable.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "They look the same. Both changes added exactly 10 lamps, so both brightened the room by the same amount.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Both added 10 lamps -- that is true of the **lamps**. It is not true of what your eyes and brain report.\n\nWork out the just noticeable difference each time, with **k = 0.08**:\n\n| Change | Starting amount | Just noticeable difference | Added | Share added |\n| --- | --- | --- | --- | --- |\n| First | 10 lamps | 0.08 x 10 = **0.8 lamps** | 10 lamps | **100%** |\n| Later | 100 lamps | 0.08 x 100 = **8 lamps** | 10 lamps | **10%** |\n\nThe first change is **more than twelve times** the smallest change you could notice. It is dramatic -- the room doubles in brightness.\n\nThe second is only just over its threshold. You might notice it; you might not.\n\nIt is the same pattern as L2C4, where two sensor ranges were both 300 nm wide yet covered very different frequencies. **Equal differences are not equal ratios** -- and it is the ratio that your senses report.",
            options: [
                { id: 'retry', label: "Same 10 lamps, very different shares.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **Your senses report the share that changed, not the amount.**\n\nThat completes Big Idea 4 at Level 2, and all three lessons turned out to be about the same thing.\n\n- **L2P4** -- a wave only echoes off things about its own size, so what matters is the wavelength **compared with** the object\n- **L2C4** -- every visible colour fits in a frequency **ratio** of about 1.75, and equal wavelength widths are not equal frequency widths\n- **L2B4** -- the just noticeable difference is a fixed **fraction** of what was already there\n\n**How do we sense the world? In ratios.** Your ears, your eyes and your brain all compare one thing with another rather than measuring amounts.\n\nIt is also why a whisper that is easy to hear in a silent room disappears at a busy party. The whisper did not get quieter. The share it adds to the noise around it got smaller.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "The share, not the amount!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found how the brain decides something changed.**\n\n- The brain judges a change **compared with** what was already there\n- The **just noticeable difference** is the smallest change you can reliably detect\n- **Weber's rule**, found by **Ernst Weber**: the just noticeable difference is always the same share of the starting amount\n- **just noticeable difference = k x starting amount**\n- The number in the rule, **k**, is the **Weber fraction** -- how big the share is for one sense -- and it has **no units**\n- Weight **about 0.03**; brightness **about 0.08**; loudness **about 0.1**\n- 5 g is noticed on a 100 g envelope (3 g threshold) but not on a 5,000 g bag (150 g threshold)\n- A room lit by 50 candles needs **4** more before it looks brighter\n- Weber's rule works in the **middle** of a sense's range, not for very faint or overwhelming signals\n- Equal differences are not equal ratios, and the ratio is what you sense\n\nBig Idea 4 is complete at Level 2.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "k x starting amount -- the share, not the amount!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- We Notice Ratios, Not Amounts!**\n\nB4 followed a signal to the brain. Level 2 finds the rule the brain uses to decide that something changed.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| The brain compares | share, not amount | 5 g feels different in an envelope and a bag |\n| Just noticeable difference | the smallest change you detect | It depends on the start |\n| Weber's rule | **k x starting amount** | The pattern: a fixed share |\n| Weber fraction | **k**, no units | The number in the rule: weight 0.03, brightness 0.08, loudness 0.1 |\n| The envelope | 0.03 x 100 = **3 g** | A 5 g coin is noticed |\n| The bag | 0.03 x 5,000 = **150 g** | The same coin is not |\n| Its condition | the middle of the range | Breaks down when very faint or very strong |\n| Big Idea 4 at Level 2 | ratios throughout | Waves, colours and the brain all compare |\n\n**The one line to remember:** you never sense how much something changed -- only what share of the original the change was.\n\n**Big Idea 4 is complete at Level 2.** At Level 3, L3B4 uses Weber's rule again and again, one noticeable step after another, to find how many loudnesses you can tell apart."
        }
    };
}

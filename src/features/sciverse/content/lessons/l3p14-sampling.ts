import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 14, physics.
 *
 * Removes L2P14's simplification that the message arrived already digital.
 * A microphone produces a smoothly changing wave, so turning it into bits
 * takes two decisions: how often to measure, and how finely.
 *
 *   samples each second >= 2 x the highest frequency present   (the sampling rule)
 *   bit rate = samples each second x bits in a sample x channels
 *
 * Worked on the CD (44,100 x 16 x 2 = 1,411,200 bit/s) and the telephone
 * (8,000 x 8 = 64,000 bit/s). The checkpoint is aliasing: a 30,000 Hz tone
 * sampled at 44,100 comes back as a 14,100 Hz whistle that was never played.
 *
 * Still standing: the levels are steps, so every sample carries a small
 * rounding error, and nothing here is compressed.
 */
export function getL3P14Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2P14 counted the bits in a message and found that **n** bits make **2ⁿ** patterns. But it assumed something: **the message was already a list of symbols** -- letters, pixels, numbers.\n\nA microphone gives you no such thing. It gives you a **voltage** that rises and falls smoothly, exactly like the wave on P14's oscilloscope. There is no first symbol, no last symbol, and no gap between one value and the next.\n\nA **bit** is one yes-or-no answer, the smallest piece of information a machine stores.\n\nOne dial under the picture is **bits in a sample**: how many of those you spend on each single measurement.\n\nTo store that as bits you have to **measure** it. How often?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Often enough to catch the fastest wiggle in the wave -- and the faster the sound, the more measurements each second it must take.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "It cannot be done properly. A smooth wave has infinitely many values, so any list of measurements must lose the sound.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "That is the natural guess, and it is wrong in a way worth understanding -- it is why digital audio works at all.\n\nYou are right that a smooth wave passes through infinitely many values. But you do not need them. A wave that contains **no frequency above some limit** cannot wiggle faster than that limit allows, and that constrains it enormously: between two close measurements there is only **one** smooth curve of that kind that fits.\n\nSo a finite list of measurements can pin down the whole wave **exactly**, provided you take them fast enough. This is a proved result, not an approximation -- Harry Nyquist and Claude Shannon established it in the 1920s and 1940s.\n\nThe question is what \"fast enough\" means, and that has a precise answer.",
            options: [
                { id: 'cont', label: "How fast is fast enough?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Turning a wave into bits takes **two** decisions, and they are independent.\n\n**1. How often to measure -- the sampling rate.** Each measurement is a **sample**, and the rate is in **samples each second**. The rule:\n\n**samples each second ≥ 2 x the highest frequency in the signal**\n\nTwice, because one full cycle of a wave has both a peak and a trough: fewer than two samples a cycle and you cannot tell them apart. Half the sampling rate -- the highest frequency you can capture -- is the **Nyquist frequency**.\n\n**2. How finely to measure -- the bit depth.** Each sample is stored as a whole number in **bits**, so **bits in a sample = b** gives **2ᵇ** possible levels. That is L2P14's rule, now measuring height instead of counting letters.\n\nPut them together with the number of separate **channels** (1 for mono, 2 for stereo):\n\n**bit rate = samples each second x bits in a sample x channels**\n\nThe conditions are strict and both matter. **The signal must genuinely contain nothing above the Nyquist frequency** -- if it does, the rule does not merely lose that part, it corrupts the rest, as the checkpoint shows. And **the levels are evenly spaced steps**, so each sample is rounded to the nearest one.",
            options: [
                { id: 'cont', label: "Put real numbers through it.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**The compact disc.** Human hearing reaches about **20,000 Hz**.\n\n**Step 1.** The rule needs at least 2 x 20,000 = **40,000 samples each second**. A CD uses **44,100**, the spare 4,100 leaving room for a filter that removes anything higher before sampling.\n\n**Step 2.** Each sample uses **16 bits**, giving 2¹⁶ = **65,536** levels of height.\n\n**Step 3.** Stereo is **2** channels:\n\nbit rate = 44,100 x 16 x 2 = **1,411,200 bits each second**\n\n**Step 4.** A 3-minute song is 180 s:\n\n1,411,200 x 180 = **254,016,000 bits** = 31,752,000 bytes ≈ **31.8 MB** (megabytes)\n\n**The telephone.** Speech stays intelligible below about 4,000 Hz, so the network samples at **8,000** and uses **8** bits, in **1** channel:\n\n8,000 x 8 x 1 = **64,000 bits each second**\n\n| | Samples each second | Bits in a sample | Channels | Bit rate |\n| --- | --- | --- | --- | --- |\n| Telephone | 8,000 | 8 | 1 | **64,000 bit/s** |\n| Compact disc | 44,100 | 16 | 2 | **1,411,200 bit/s** |\n\nThat is a 22-fold difference, and you can hear it: the phone throws away everything above **4,000 Hz**, which is where the sharpness of consonants lives. It is why an unfamiliar name is so often misheard on a call.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A vibration sensor samples **500** times each second, storing **12 bits** in each sample, on **1** channel.\n\nWhat is its bit rate, and what is the highest frequency it can honestly capture?",
            options: [
                { id: 'right', label: "6,000 bits each second, and frequencies up to 250 Hz.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'doubled', label: "6,000 bits each second, and frequencies up to 1,000 Hz.", nextNodeId: 'math_wrong' },
                { id: 'added', label: "512 bits each second, and frequencies up to 250 Hz.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**Up to 1,000 Hz** doubled the sampling rate instead of halving it. The rule runs the other way: the rate must be **at least twice** the frequency, so the frequency can be at most **half** the rate. A sensor cannot capture something faster than itself.\n\n**512 bits each second** added 500 and 12. The units say multiply: samples each second, times bits in each sample, leaves bits each second.\n\n**Bit rate:** 500 x 12 x 1 = **6,000 bits each second**\n\n**Highest frequency:** 500 / 2 = **250 Hz**\n\nThat second number is the one engineers get wrong in the field. A sensor sampling at 500 a second looks fast, but it is blind to anything above 250 Hz -- and worse than blind, as you are about to see.",
            options: [
                { id: 'retry', label: "Multiply for bits, halve for frequency.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials.\n\n**Samples Each Second** sets how often the wave is measured. **Bits in a Sample** sets how finely each measurement is stored.\n\nThe lab draws a smooth wave, the samples taken from it, and the staircase that is actually stored -- plus the bit rate and the Nyquist frequency.\n\nTry this:\n\n- Start high: the staircase sits almost on the wave\n- Drop **Samples Each Second** until fewer than two samples fall in each cycle, and watch the stored wave turn into something slower than the real one\n- Drop **Bits in a Sample** to **3**: only 8 levels, so the staircase becomes visibly coarse even when the timing is fine\n- Notice the two faults are **different**: too few samples gets the **frequency** wrong, too few bits gets the **height** wrong",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Two dials, two different faults. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A recording is sampled at **44,100** samples each second, so its Nyquist frequency is **22,050 Hz**. Into the microphone goes a **30,000 Hz** tone -- far too high for anyone to hear.\n\nPlay the recording back and there is a clear **14,100 Hz** whistle on it. Nobody played a 14,100 Hz tone.\n\nWhere did it come from?",
            options: [
                { id: 'right', label: "From the 30,000 Hz tone itself. Sampled too slowly, it is indistinguishable from a slower wave -- 44,100 − 30,000 = 14,100 Hz -- and once stored, the fake frequency cannot be told from a real one. That is why the rule is a condition, not just advice: breaking it damages the part of the signal you wanted.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "From the equipment -- some fault in the microphone or the converter must be generating an extra tone.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Perfect equipment does this. It follows from the arithmetic of sampling alone.\n\nPicture measuring a fast wave too slowly. By the time you take your next sample, the wave has been round more than once, and you have no way of knowing. The samples you wrote down are **exactly** the samples a slower wave would have given -- so the stored numbers describe that slower wave just as truthfully.\n\nFor a tone between the Nyquist frequency and the sampling rate, the impostor comes out at:\n\n**false frequency = sampling rate − true frequency**\n\n44,100 − 30,000 = **14,100 Hz**, which is squarely inside hearing.\n\nThis is **aliasing**, and it is unfixable after the fact: the false tone is now ordinary data, with nothing to mark it as counterfeit. You have seen its cousin in pictures -- a striped shirt that shimmers on video, or wheels that appear to spin backwards in a film.\n\nWhich is why real converters put a **filter** before the sampler to remove everything above the Nyquist frequency **first**. The 4,100 spare samples a CD takes beyond the 40,000 minimum exist to give that filter somewhere to work.\n\n**A formula's condition is not a warning about lost accuracy. Break this one and it forges data that looks real.**",
            options: [
                { id: 'retry', label: "The fast tone becomes a slow one -- and stays.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **Sample at less than twice the highest frequency and the signal does not merely lose detail -- it acquires frequencies that were never there.**\n\nSo Level 3 removed L2P14's simplification. **The message does not arrive already digital.** Making it digital takes a rate and a depth, and the rate has a hard condition attached.\n\n**What is still standing in this lesson:** the levels are **evenly spaced steps**, so every sample is rounded to the nearest one. That rounding is a real error -- it is the faint hiss under a quiet passage -- and with 16 bits it sits about 96 decibels below full scale. And nothing here is **compressed**: a streamed song carries roughly a tenth of the CD's 1,411,200 bits each second by exploiting what the ear cannot hear.\n\nC14 at Level 3 takes the other simplification apart: how a molecule whose every bond is polar can behave as though it had no polarity at all.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Twice the highest frequency, or it lies!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You turned a wave into bits.**\n\n- A **sample** is one measurement of the wave's height; the **sampling rate** is in **samples each second**\n- **samples each second ≥ 2 x the highest frequency** -- one cycle has a peak and a trough\n- Half the sampling rate is the **Nyquist frequency**, the highest that can be captured\n- **bits in a sample = b** gives **2ᵇ** levels of height: 16 bits is **65,536**\n- **bit rate = samples each second x bits in a sample x channels**\n- Compact disc: 44,100 x 16 x 2 = **1,411,200 bits each second**; a 3-minute song is **31.8 MB**\n- Telephone: 8,000 x 8 x 1 = **64,000 bits each second**, capturing nothing above **4,000 Hz**\n- A sensor at 500 samples each second and 12 bits: **6,000 bit/s**, and blind above **250 Hz**\n- Too few **samples** gets the frequency wrong; too few **bits** gets the height wrong\n- **Aliasing**: a 30,000 Hz tone at 44,100 returns as **44,100 − 30,000 = 14,100 Hz**, and cannot be removed afterwards\n- So converters **filter** the signal before sampling\n- Removed: L2P14's assumption that the message was already digital\n- Still standing: rounding to the nearest level, and no compression",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Rate for frequency, bits for height!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- Turning a Wave into Numbers**\n\nL2P14 counted bits in a message that was already symbols. Level 3 makes the symbols.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| A sample | one measured height | The wave becomes a list |\n| The sampling rule | **rate ≥ 2 x highest frequency** | A cycle has a peak and a trough |\n| Nyquist frequency | **rate / 2** | The highest you can capture |\n| Bit depth | **2ᵇ** levels | 16 bits = 65,536 |\n| Bit rate | **rate x bits x channels** | CD: 1,411,200 bit/s |\n| A 3-minute song | 1,411,200 x 180 | **31.8 MB** |\n| Telephone | 8,000 x 8 x 1 | 64,000 bit/s, dull consonants |\n| Aliasing | **rate − true frequency** | 30,000 Hz returns as 14,100 Hz |\n| Removed | the message was already digital | It has to be made digital |\n| Still standing | rounding to a level, no compression | The faint hiss, and streaming |\n\n**The one line to remember:** measure the wave at least twice as often as its fastest wiggle and the numbers hold the whole sound -- measure any slower and they hold a sound nobody made.\n\n**Up next:** C14 -- four polar bonds, and a molecule with no polarity."
        }
    };
}

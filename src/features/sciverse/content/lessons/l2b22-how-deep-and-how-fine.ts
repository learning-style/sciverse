import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) for Big Idea 22, biology. Biology closes the Big Idea, and
 * its summary table covers all three lessons.
 *
 * B22 said echo timing gives depth. The formula is one line, and it has a factor
 * most people miss:
 *
 *   depth = speed x time / 2
 *
 * The 2 is there because the sound goes down AND comes back. At 1540 m/s in soft
 * tissue, an echo at 26 microseconds is 2.0 cm down.
 *
 * The second dial is the probe's frequency, which forces the trade the whole of
 * medical ultrasound lives with: the finest detail a probe can show is about one
 * wavelength (1540/f), so a high frequency sees better -- and is absorbed sooner,
 * so it cannot see as deep. 5 MHz gives 0.31 mm detail to about 12 cm; 15 MHz
 * gives 0.10 mm to about 4 cm.
 *
 * Still standing: nothing here says why a boundary sends back an echo at all, or
 * why bone and air stop the picture dead. Level 3 answers both from one quantity.
 */
export function getL2B22Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "The first two lessons of this Big Idea waited for a wave. An earthquake had to happen; a star had to shine.\n\n**Ultrasound does not wait.** It sends a wave in on purpose and listens for what comes back -- which means you choose the wave, and that choice turns out to decide what you are able to see.\n\nB22 told you that **echo timing gives depth**. That is right, and it is a sentence rather than a method. Here is the method.\n\nSound travels through soft tissue at about **1540 metres per second** -- roughly four and a half times its speed in air, because tissue is far harder to squeeze than air is. A **probe** on the skin sends a short pulse down and then goes quiet and listens. When the pulse meets a **boundary** between two different tissues, part of it comes back as an **echo**. Time the echo, and you know how far it went.\n\nYour two dials:\n\n- **Echo Time**, in **microseconds (µs)** -- millionths of a second, because these journeys are short and sound is quick.\n- **Probe Frequency**, in **megahertz (MHz)** -- millions of wave cycles each second.\n\nBefore the arithmetic, one trap. An echo arriving after 26 µs has travelled for 26 µs at 1540 m/s, which is 4.0 cm.\n\nIs the boundary 4.0 cm down?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "No -- 4.0 cm is the whole round trip, down and back, so the boundary is half that: 2.0 cm.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "Yes -- the sound travelled for 26 µs at 1540 m/s, so the boundary is 4.0 cm down.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "The 4.0 cm is right. What it measures is not.\n\nFollow the pulse. It leaves the probe, goes **down** to the boundary, bounces, and comes **back up** to the probe. The clock runs for the whole journey, because the probe is both the sender and the listener -- it cannot start timing at the boundary.\n\nSo 4.0 cm is **there and back**. The boundary is at half of it: **2.0 cm**.\n\nThis is the single most common mistake in echo measurements of every kind, and it is worth noticing that it always errs the same way -- it puts things **twice as far away as they are**. A ship's depth sounder, a bat, a parking sensor and a medical scanner all divide by two.\n\nIf you ever forget the 2, there is a quick check. Ultrasound reaches perhaps 20 cm into a body. If an arithmetic answer says a boundary is 40 cm inside a person, you have found the missing 2 rather than a remarkable patient.",
            options: [
                { id: 'cont', label: "Down and back. So divide by two.", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "**depth = speed x time / 2**\n\nThe speed is **1540 m/s** in soft tissue. **The condition:** that figure is an average for soft tissue, and the scanner assumes it everywhere. It is close for liver, muscle and blood; it is wrong for fat (about 1450 m/s) and badly wrong for bone (about 4080 m/s), which is one reason a scan of a joint is harder to read than a scan of a liver.\n\nWatch the units, because this is where the arithmetic usually goes wrong. 1540 m/s is **1.54 mm per microsecond** -- a much friendlier number here, since it turns microseconds straight into millimetres.\n\n**depth in mm = 1.54 x time in µs / 2 = 0.77 x time in µs**\n\nSo **every microsecond of echo time is 0.77 mm of depth.** A useful thing to carry:\n\n| Echo time | Depth |\n| --- | --- |\n| 13 µs | **1.0 cm** |\n| 26 µs | **2.0 cm** |\n| 65 µs | **5.0 cm** |\n| 130 µs | **10.0 cm** |\n| 260 µs | **20.0 cm** |\n\nAnd read that last row the other way, because it explains something about the machine. A 20 cm depth needs 260 µs of listening before the next pulse can go out -- so the probe can fire about **3,800 times a second** at most. That is what sets how fast the picture can refresh, and it is why a deep scan looks less smooth than a shallow one. **The speed of sound limits the frame rate.**",
            options: [
                { id: 'cont', label: "Work one out.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**A 5 MHz probe records an echo 65 µs after the pulse went out. How deep is the boundary, and how fine is the detail there?**\n\n**The depth:**\n\n1. **Round trip:** 1.54 mm/µs x 65 µs = **100.1 mm**\n2. **Halve it:** 100.1 / 2 = **50 mm = 5.0 cm**\n\n**The detail.** A wave cannot show you anything much smaller than itself, so the finest detail a probe can resolve is roughly one **wavelength** -- the length of a single cycle. Wavelength is speed divided by frequency:\n\n3. **Wavelength:** 1540 m/s / 5,000,000 per s = 0.000308 m = **0.31 mm**\n\nSo this probe sees a boundary at 5.0 cm, and can separate two things about **0.3 mm** apart -- about the thickness of two sheets of paper. Good enough for a kidney stone, not for a single cell.\n\n**Check the depth forwards:** a boundary at 50 mm means a round trip of 100 mm, which at 1.54 mm/µs takes 100 / 1.54 = **65 µs** ✓\n\nNow the awkward part, and it is the reason this lesson has a second dial. You might reasonably want **finer** detail, and the formula says to raise the frequency. A 15 MHz probe gives a wavelength of 0.10 mm -- three times finer.\n\nBut a 15 MHz probe **cannot reach 5 cm.** Higher frequencies are absorbed faster, and the useful depth falls roughly as **60 / frequency in MHz** centimetres -- a rule of thumb from measurement, not a law. At 15 MHz that is about **4 cm**, so a boundary at 5.0 cm is no longer **within** reach -- it is simply not there any more.",
            options: [
                { id: 'try', label: "Let me try one.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** An echo comes back **130 µs** after the pulse left the probe.\n\nHow deep is that boundary?",
            options: [
                { id: 'right', label: "About 10 cm -- 1.54 x 130 is 200 mm for the round trip, so 100 mm down.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'noHalf', label: "About 20 cm, from 1.54 mm/µs multiplied by 130 µs.", nextNodeId: 'math_wrong' },
                { id: 'wrong', label: "About 84 mm, from 130 divided by 1.54.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**20 cm** is the round trip -- the full journey down and back. The boundary is at half of it. That missing 2 is the mistake from the start of this lesson, and it is genuinely the easiest one to make: the arithmetic feels finished before you have halved it.\n\n**Dividing** 130 by 1.54 has the speed upside down. Check the units: you want millimetres, and 1.54 is millimetres **per** microsecond, so it must be multiplied by microseconds. Dividing would leave you with µs² per mm, which is not a length.\n\n**1.54 x 130 = 200 mm, so the depth is 100 mm = 10 cm.**\n\nOr use the shortcut from earlier and skip a step: **0.77 mm per µs of echo time**, so 0.77 x 130 = **100 mm** straight away. The 2 is already inside the 0.77, which is exactly why it is worth carrying that number instead of 1.54.\n\nThat is a general tactic for a formula you use constantly: **fold the constant factors in once**, and the step you keep forgetting disappears.",
            options: [
                { id: 'retry', label: "0.77 mm per microsecond, with the 2 already inside.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "**Try the two dials.** **Echo Time** sets the depth. **Probe Frequency** sets both how fine the detail is and how deep the sound can reach -- and those two pull against each other.\n\n| Frequency | Finest detail | Reaches about |\n| --- | --- | --- |\n| 2 MHz | 0.77 mm | **30 cm** |\n| 5 MHz | 0.31 mm | **12 cm** |\n| 10 MHz | 0.15 mm | **6 cm** |\n| 15 MHz | 0.10 mm | **4 cm** |\n\nRead the two right-hand columns together and the whole of medical ultrasound is in them. **You cannot have fine detail deep down.** Not because the machines are not good enough -- because the same property that makes a short wave able to resolve small things makes it absorbed sooner.\n\nSo the probe is chosen by what you are looking at, and the choice is forced:\n\n- **A baby at 20 weeks**, 10 cm deep: about 3.5 MHz. Detail around 0.4 mm.\n- **A thyroid gland**, 2 cm deep: 12 MHz. Detail around 0.13 mm.\n- **An eye**, 2 cm deep: 20 MHz or more, because it is shallow and worth seeing finely.\n- **A liver** in a large adult, 15 cm deep: 2 MHz, and you accept 0.8 mm.\n\nNotice that the deep organ gets the **worst** picture, which is the opposite of what you would want.\n\nAnd this is the third time this Big Idea has handed you a trade you cannot argue with. L2P22: the gap measures distance only because the two speeds **differ**. L2C22: you can only believe a line if the instrument can **split** it. Here: fine detail and depth are the **same dial** pulling two ways. **Every instrument that sees the invisible is paid for in something.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Fine detail and depth are the same dial. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A doctor needs to see a structure **12 cm** deep and wants detail of **0.1 mm**.\n\nWhat should they do?",
            options: [
                { id: 'right', label: "They cannot have both. 0.1 mm needs about 15 MHz, which only reaches about 4 cm; reaching 12 cm needs about 5 MHz, which gives about 0.31 mm. They must accept 0.31 mm, or reach the structure another way.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Use a 15 MHz probe and turn the power up, so the finer wave reaches the full 12 cm.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Turning the power up is the obvious move, and it does not work. It is worth knowing why, because the reason is the same one that limits the other two instruments in this Big Idea.\n\nAbsorption takes a **fraction** of what is left at every centimetre, not a fixed amount. So doubling the power does not double the depth -- it buys you one more absorption length, a centimetre or two, and then the echo is back in the noise. To reach three times deeper you would need the power up by a factor of thousands.\n\nAnd there is a hard ceiling that arrives first: **ultrasound deposits energy in tissue as heat.** Scanners are limited by safety rules on exactly this, and those limits are tightest for scanning a pregnancy. So the power dial runs out before the physics does.\n\nThe honest answer is the one the table gives. **12 cm means about 5 MHz, and 5 MHz means about 0.31 mm.** If 0.1 mm genuinely matters, ultrasound from the skin is the wrong instrument -- and the real solution is usually to get the probe **closer**, which is why some probes go inside the body rather than on it. Three centimetres away, 15 MHz works beautifully.\n\n**When a trade-off blocks you, moving the instrument often beats pushing it.**",
            options: [
                { id: 'retry', label: "Absorption takes a fraction each centimetre, so power cannot buy depth.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Exactly -- and the reason power cannot rescue it is that absorption takes a **fraction** at every centimetre. Doubling the power buys a centimetre or two, and the safety limit on tissue heating arrives before the physics does.\n\nSo: **12 cm means about 5 MHz, and 5 MHz means about 0.31 mm.** The real fix is to get the probe **closer**, which is why some probes go inside the body -- at 3 cm, 15 MHz works beautifully. **When a trade-off blocks you, moving the instrument often beats pushing it.**\n\nAnd that closes Big Idea 22 at Level 2. Three instruments, three waves, and the same shape in all of them:\n\n| | The wave | What is measured | And what it costs |\n| --- | --- | --- | --- |\n| **L2P22** | seismic, waiting | the **gap** between two arrivals | one station gives a circle, not a point |\n| **L2C22** | light, waiting | the **position** of a line | a blunt instrument looks clear, not confused |\n| **L2B22** | sound, sent on purpose | the **time** to an echo | fine detail and depth fight over one dial |\n\nRead the middle column. Not one of these instruments measures the thing you wanted to know. They measure a **gap**, a **position**, a **time** -- and the thing you wanted is recovered by arithmetic. That is what it means to see the invisible: you never see it, you calculate it, and the calculation is only as good as the one number you measured.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "You never see it -- you calculate it!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You turned an echo into a depth, and found the price of detail.**\n\n- Ultrasound **sends** a wave instead of waiting for one, so you choose the wave -- and the choice decides what you can see\n- Sound travels at about **1540 m/s** in soft tissue, which is **1.54 mm per microsecond**\n- The probe sends **and** listens, so an echo time is the **round trip**: **depth = speed x time / 2**\n- Folding the 2 in gives **0.77 mm per µs**, and the step everyone forgets disappears\n- So **26 µs is 2.0 cm**, **130 µs is 10 cm**, **260 µs is 20 cm**\n- Which also caps the **frame rate**: 20 cm of listening is 260 µs, so about 3,800 pulses a second at most\n- The finest detail is about one **wavelength** = 1540 / frequency, so **5 MHz gives 0.31 mm**\n- But a short wave is absorbed sooner, and the useful depth falls roughly as **60 / MHz** cm -- a rule of thumb from measurement, not a law\n- **So fine detail and depth are the same dial pulling two ways**: 15 MHz sees 0.10 mm but only 4 cm deep\n- Which forces the probe to the job: 3.5 MHz for a baby at 10 cm, 12 MHz for a thyroid at 2 cm, 2 MHz for a deep liver -- and **the deep organ gets the worst picture**\n- Power cannot fix it, because absorption takes a **fraction** every centimetre and tissue heating is capped. **Moving the instrument beats pushing it**\n- Removed: B22's \"echo timing gives depth\", a true sentence with no method and no factor of 2\n- Still standing: **why a boundary sends back an echo at all.** Nothing here says what makes one, why liver against muscle is nearly invisible while bone is a wall, or why the probe needs gel. Level 3 answers all three from a single quantity -- and finds the same **difference** that P22 and C22 both turned on",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Down and back, so halve it!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- How Do Waves Help Us See the Invisible?**\n\n**Summary Table:**\n| | Physics (L2P22) | Chemistry (L2C22) | Biology (L2B22) |\n| --- | --- | --- | --- |\n| **The wave** | seismic, from an earthquake | light, from a hot gas | sound, sent in on purpose |\n| **What you time or read** | the **gap** between P and S | the **position** of a line | the **time** to an echo |\n| **The formula** | **d = gap x (Vp Vs)/(Vp - Vs)** | **E = 1240 / wavelength** | **depth = speed x time / 2** |\n| **The handy number** | **10.3 km** per second of gap | **1240** eV nm | **0.77 mm** per µs |\n| **A worked case** | 60 s gap = **617 km** | 656.3 nm = **1.889 eV** | 130 µs = **10 cm** |\n| **Why it works** | the start time **cancels** | the gap belongs to the **atom** | the probe sends **and** listens |\n| **What it costs** | a circle, not a point | resolving power **982** to split sodium | detail and depth share one dial |\n| **Still standing** | straight lines, one speed | why **these** energy gaps? | why an **echo** at all? |\n\n**The one line to remember:** none of these instruments measures what you wanted to know -- they measure a gap, a position or a time, and the invisible thing is recovered by arithmetic from that one number.\n\n**Where this leaves Big Idea 22:** the question was how waves help us see the invisible, and the three answers agree on something unexpected. A wave is useful not because it reaches the hidden thing but because it comes back **changed**, and every one of these methods reads a change rather than a value -- a difference in arrival, a difference in energy, a difference between tissues. Level 3 takes that word seriously in all three."
        }
    };
}

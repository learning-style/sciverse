import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 27, biology. The synthesis lesson. Mechanism.
 *
 * L3C27 ended on a specific handover: 3% of starch's bonds are alpha-1,6, amylase cannot
 * touch them, and the enzyme that can is FIXED to the wall of the gut. Fixed means the
 * food has to come to it. This lesson asks what that costs, and the answer reorganises
 * the whole Big Idea.
 *
 * The gut runs two kinds of chemistry and they are paid for in different things:
 *
 *   a FREE enzyme (amylase, loose in the fluid) is paid in TIME     -- time = length/speed
 *   a FIXED enzyme (on the wall) is paid in CONTACT                 -- contacts = time x rate
 *
 * L2B27's margin of 8.6 was computed for the free job only. Time alone does nothing for
 * the fixed job: food sitting in the middle of the tube is not being finished however
 * long it sits there. What buys contact is squeezing, so the second dial is the
 * contraction rate -- and it moves the contacts without moving the time margin at all,
 * which makes the two-currency structure visible rather than asserted.
 *
 * The count: contractions about every 6 s over 15,000 s is about 2,500 presses against
 * the wall for every bit of food. Halve the rate and that halves to 1,250 while the
 * transit time and L2B27's margin are UNCHANGED -- so a normal transit time proves
 * nothing about the last 3%.
 *
 * And the tie that closes the Big Idea is a reversal, the same shape as L3B21 and L3B22.
 * L3P27 found that only 1 contraction in 75 travels and called the other 74 mixing. Those
 * 74 are exactly the ones pressing the contents against the wall. **The squeezing that
 * looked like waste is the entire mechanism of the final step** -- it is not a by-product
 * of transport, it is the other half of the job.
 *
 * Frames stated: contacts are counted per parcel of food over one journey through the
 * small intestine, and the margin is the amylase job's as L2B27 defined it.
 *
 * Still standing: one contraction is taken to give one press, which is a convention
 * rather than a measurement; the contraction rate varies along the tube and with what
 * was eaten; and nothing here counts how much of the last 3% a single press achieves,
 * which would need the wall's enzyme density.
 */
export function getL3B27Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L3C27 finished with a problem it could not solve. Three percent of the bonds in starch are **α-1,6** -- the joins at a branch point, facing sideways -- and amylase cannot cut them however much of it there is. The enzyme that can is a different one, and here is the awkward part:\n\n**it is bolted to the wall of the gut.**\n\nNot floating in the fluid like amylase. Built into the membrane of the cells lining the tube, facing inwards, fixed in place. Which means it cannot go and find its food. **The food has to come to it.**\n\nAnd that changes what the gut has to provide. Look at what each kind of enzyme actually needs:\n\n| | where it is | what it needs |\n| --- | --- | --- |\n| **amylase** | loose in the fluid | **time** |\n| the **α-1,6** enzyme | **fixed** to the wall | **contact** |\n\nA free enzyme drifting in the fluid is already next to its food, everywhere, all the time. Give it longer and it cuts more -- which is exactly what L2B27 counted when it divided the time available by the time needed and got a margin of **8.6**.\n\n**A fixed enzyme is not helped by time at all.** A lump of food sitting in the middle of the tube is not being finished, and it will not be finished in an hour or in a week, because nothing it needs is where it is. It has to be **pushed against the wall**.\n\nSo your two dials are **Tube Length** in centimetres and **Contraction Rate** in squeezes per minute.\n\nBefore any arithmetic. L2B27 found a comfortable margin of 8.6 and concluded the 600 cm was there for bad days. **Was that margin about the right job?**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'free', label: "Only the free one — it divided two times, and time is not what a fixed enzyme needs.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'both', label: "Yes — it was the margin for digesting the meal, so it covers all of it.", nextNodeId: 'misconception' }
            ]
        },

        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "It was the margin for digesting the meal **as L2C27 had modelled it**, and that model had one enzyme in it, loose in the fluid.\n\nLook at what went into the calculation:\n\nmargin = time available / time needed = (length / speed) / (bonds / cutters x cuts per second)\n\n**Every term is about time or about the fluid.** The length and the speed set how long the food is in there. The bonds, the cutters and the cutting rate set how long the job takes. Nothing in it mentions the wall, and nothing in it could -- because L2C27 had no fixed enzyme in its picture.\n\nSo the 8.6 is a true number about a real job. It is just a complete answer to **97%** of the question:\n\n| | the job | the margin | what it is paid in |\n| --- | --- | --- | --- |\n| **97%** of the bonds | amylase, in the fluid | **8.6** | **time** |\n| the other **3%** | a fixed enzyme, on the wall | **not yet counted** | **contact** |\n\n**And a margin is only ever a margin for the job you computed it for.** That was the lesson L2B27 itself nearly reached when it pointed out that the villi of Big Idea 2 solve a different problem from the length -- but it then went on to measure only the time.\n\nSo the question *why is the tube 600 cm* is still open. L2B27 answered *for the bad days*, and we are about to find that the bad days barely scratch the time margin. **Something else is setting the length.**",
            options: [
                { id: 'cont', label: "So how do you count contact?", nextNodeId: 'defining' }
            ]
        },

        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "By counting the squeezes, because that is what puts the contents against the wall.\n\nA **segmenting contraction** is a ring of muscle that tightens and then lets go without travelling -- L3P27's seventy-four-in-seventy-five. When it tightens, the fluid and food in that stretch have nowhere to go but outwards and along, which presses them against the lining. When it releases, they fall back. Then it happens again.\n\nSo each squeeze is **one press of the contents against the wall**, and the number of presses a mouthful gets is simply how many squeezes happen while it is in there:\n\n**contacts = time in the tube x contraction rate**\n\nand the time in the tube is L2P27's own figure, length over speed. Put the two together:\n\n**contacts = (length / speed) x rate**\n\nTaking one press per contraction is a convention rather than a measurement, and it is the main thing still standing at the end of this lesson.\n\nNow the healthy numbers. The small intestine is about **600 cm**, food advances at **0.04 cm/s**, and segmenting contractions come at roughly **10 a minute**:\n\ntime = 600 / 0.04 = **15,000 s**\n\ncontacts = 15,000 s x 10 per minute / 60 = **about 2,500 presses**\n\n**Two and a half thousand times**, every bit of a meal is pushed up against the wall on its way down. And watch what each dial does to that, because they are not the same:\n\n- **length** sets the time, so it buys **both** the time margin and the contacts\n- **contraction rate** sets neither the length nor the speed, so it buys **contacts only** -- and leaves the time margin exactly where it was",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'network' } },
            options: [
                { id: 'work', label: "So what does that tell you about the 600 cm?", nextNodeId: 'worked' }
            ]
        },

        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**It tells you the two jobs fail in completely different ways**, and only one of them was being watched.\n\nTake somebody whose contractions have weakened to **5 a minute** -- half the normal rate. Everything else is intact: 600 cm of tube, food advancing at the usual 0.04 cm/s.\n\n| | healthy | weak contractions |\n| --- | --- | --- |\n| transit time | 15,000 s | **15,000 s** |\n| amylase margin | 8.6 | **8.6** |\n| presses on the wall | 2,500 | **1,250** |\n\n**Look at the first two rows.** The transit time is identical. The margin L2B27 computed is identical. Every number a clinician would reach for by timing a marker through the gut is **completely normal** -- and half the contact with the wall has gone.\n\n**A normal transit time proves nothing about the last 3%.**\n\nNow the other failure, and compare them. Somebody with **100 cm** of bowel left after surgery, with normal contractions:\n\n| | healthy | 100 cm left |\n| --- | --- | --- |\n| transit time | 15,000 s | **2,500 s** |\n| amylase margin | 8.6 | **1.4** |\n| presses on the wall | 2,500 | **417** |\n\nHere **both** collapse, because the length was buying both. The margin drops to 1.4, which L2B27 already found -- and the contact drops to a sixth, which it could not see.\n\n**So the length is doing two jobs and the squeezing is doing one**, and that finally answers the question L2B27 left open. The 600 cm is not mostly there to give amylase spare time; amylase has eight times what it needs and does not want more. **The length is there to buy contact with the wall**, and the way you can tell is that the job needing contact is the one with no margin to spare.",
            options: [
                { id: 'check', label: "Let me try one.", nextNodeId: 'math_check' }
            ]
        },

        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "Your turn. A patient has **300 cm** of small intestine -- half the usual -- but unusually **vigorous** contractions at **20 a minute**, double the normal rate.\n\nHow do their two figures compare with a healthy gut?",
            options: [
                { id: 'both', label: "Margin halved to 4.3, but contacts back to 2,500 — the fast squeezing makes up the contact and cannot touch the time", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'allfine', label: "Both are normal, because half the length times double the rate cancels out", nextNodeId: 'math_wrong' },
                { id: 'allbad', label: "Both are halved, because the length halved", nextNodeId: 'math_wrong' }
            ]
        },

        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Work the two quantities separately, which is the entire habit this lesson is teaching.\n\n**Time, and so the margin:** time = 300 / 0.04 = **7,500 s**, and 7,500 / 1,736 = **4.3**. The contraction rate is nowhere in that calculation, so doubling it changes nothing. **Halved.**\n\n**Contacts:** 7,500 s x 20 per minute / 60 = **2,500 presses**. Half the time, twice the rate, and the product is exactly what it was. **Normal.**\n\n| | healthy | this patient |\n| --- | --- | --- |\n| amylase margin | 8.6 | **4.3** |\n| presses on the wall | 2,500 | **2,500** |\n\nSo *both normal* is half right and the dangerous half. The cancelling is real -- but it only happens in the **product**, and the margin is not a product. **Vigorous squeezing cannot buy time.** Nothing about how often the gut contracts changes how long food stays in it, because the advance speed is set elsewhere.\n\nAnd *both halved* misses the cancelling entirely, which is the useful part: this patient has genuinely recovered their contact with the wall, and a treatment that increased contractions would be doing something real for the last 3% while doing nothing at all for the first 97%.\n\n**Two different payments, two separate bills.** One quantity is a ratio of times and the other is a count of events, and no amount of one buys the other.",
            options: [
                { id: 'retry', label: "Margin halved, contacts restored.", nextNodeId: 'explore' }
            ]
        },

        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Both dials are live. The picture is a stretch of gut seen from the side: the lining with its **fixed enzymes** drawn on it, food in the middle, and a ring of muscle squeezing the contents against the wall and letting go. The two readings beneath are the amylase margin and the count of presses.\n\nThings worth doing:\n\n- Start healthy: **600 cm** and **10** squeezes a minute. Margin **8.6**, and **2,500** presses on the wall\n- Now move **only the Contraction Rate**. Watch the squeezing speed up and the press count climb -- 20 a minute gives 5,000, 2 a minute gives 500 -- and watch the **margin not move at all**. It sits at 8.6 the whole way. **The rate dial cannot buy time**\n- Then move **only the Tube Length** and watch both readings move together, because the length was buying both\n- Set up the dangerous case: **600 cm** and **5** a minute. The margin reads a perfectly healthy **8.6** while the presses have halved to 1,250. **Everything a stopwatch can measure is normal**\n- And find the pair that looks the same from outside: **300 cm at 20 a minute** gives 2,500 presses, exactly the healthy count, on half the margin. Two guts with identical contact and very different reserves\n- Take the rate to its lowest with full length. The food still arrives on time, still fully exposed to amylase, and barely touches the wall on the way",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Checkpoint", nextNodeId: 'checkpoint' }
            ]
        },

        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "Now put this next to what L3P27 found.\n\nL3P27 worked out that only about **one contraction in seventy-five travels**. The other seventy-four tighten and let go without going anywhere, moving no food at all. It called them mixing, and they look like the gut running at 1.3% efficiency.\n\nGiven what this lesson has just counted, what are those seventy-four actually doing?",
            options: [
                { id: 'contact', label: "They are the presses. A contraction that goes nowhere is exactly one push of the contents against the wall — so the 74 are doing the whole of the last 3%.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'waste', label: "They are genuinely wasted effort — the price of having muscle that fires unreliably.", nextNodeId: 'checkpoint_wrong' },
                { id: 'backup', label: "They are spares, in case the travelling contractions fail.", nextNodeId: 'checkpoint_wrong' }
            ]
        },

        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Count what a non-travelling contraction **does**, rather than what it fails to do.\n\nIt tightens. The contents are pressed outwards against the lining -- where the fixed enzymes are. It releases. The contents fall back and are replaced by their neighbours. **That is one press, and this lesson counted 2,500 of them.**\n\nSo the seventy-four are not failing at transport. **They were never doing transport.** They are doing the other job, the one amylase cannot do and time cannot buy, and they are the only thing in the gut that does it.\n\nWhich turns L3P27's efficiency figure inside out:\n\n| | | |\n| --- | --- | --- |\n| what L3P27 saw | 1 in 75 travels | looks like **1.3% efficient** |\n| what it actually is | 1 in 75 transports, 74 press | **two jobs, fully staffed** |\n\n**Judging the gut by how far its squeezes move food is like judging a mixer by how far it carries the cake.** A contraction that goes nowhere has not wasted itself; going nowhere is the mechanism.\n\nAnd *spares* has it backwards -- they are not idle reserves waiting for a failure, they are working continuously on a job of their own. The travelling ones are the minority precisely because transport is the easy half: it only has to happen once per mouthful, while contact has to happen two and a half thousand times.",
            options: [
                { id: 'retry', label: "Going nowhere is the mechanism.", nextNodeId: 'checkpoint_correct' }
            ]
        },

        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "**And that closes Big Idea 27, because all three Level 3 lessons turn out to be about the same seventy-four contractions.**\n\nFollow the chain backwards. L3C27 showed 3% of the bonds need an enzyme fixed to the wall. A fixed enzyme is paid in contact. Contact is bought by squeezes that go nowhere. And L3P27 showed that going nowhere is what seventy-four contractions in every seventy-five are doing.\n\n| | found | which turns out to be |\n| --- | --- | --- |\n| **L3P27** | 1 contraction in 75 travels | the **transport** half |\n| **L3C27** | 3% of bonds need a **fixed** enzyme | why **contact** is needed at all |\n| **L3B27** | contacts = time x rate = **2,500** | the **other** 74, doing the rest |\n\nSo the answer to *how does food become usable energy* has a shape that none of the Level 2 lessons could see. **The gut does not have one process with a side effect. It has two jobs with one muscle**, and it divides the muscle between them by choosing, contraction by contraction, whether the squeeze travels.\n\nAnd this is the third time in these lessons that an apparent weakness has turned out to be the mechanism. **L3B21:** a cell's tiny store of **ATP** -- adenosine triphosphate, the molecule it spends to do anything -- looked like a design flaw and is what makes its sensor sharp. **L3B22:** ultrasound echoes are faint, and that faintness is why the pulse reaches the bottom. **Here:** 74 contractions in 75 look wasted, and they are doing the half of digestion that nothing else can do.\n\n**When a biological system looks badly designed, check what the apparent waste is paid for.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Two jobs with one muscle!", nextNodeId: 'discovery' }
            ]
        },

        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found the job the length was really doing.**\n\n- L3C27 left 3% of starch's bonds -- the **α-1,6** joins -- needing an enzyme amylase cannot replace, and that enzyme is **bolted to the wall** of the gut. Fixed means it cannot go to the food, so **the food has to come to it**\n- **Two kinds of enzyme, and they are paid in different things.** A **free** enzyme drifting in the fluid is already beside its food everywhere, so it is paid in **time**. A **fixed** enzyme is paid in **contact**, and time buys it nothing: food sitting mid-tube is not being finished in an hour or in a week\n- So **L2B27's margin of 8.6 was a complete answer to 97% of the question.** Every term in it -- length, speed, bonds, cutters -- is about time or about the fluid. Nothing in it mentions the wall, and nothing in it could. **A margin is only a margin for the job you computed it for**\n- **Contact is counted in squeezes:** a **segmenting contraction** tightens, presses the contents against the lining and lets go. So **contacts = (length / speed) x rate**, which for 600 cm, 0.04 cm/s and 10 a minute is **about 2,500 presses** per mouthful\n- **And the two dials do different things.** Length sets the time, so it buys **both**. Contraction rate sets neither length nor speed, so it buys **contacts only** and leaves the margin exactly where it was\n- **Which makes the two failures look nothing alike.** Weak contractions at 5 a minute: transit **15,000 s unchanged**, margin **8.6 unchanged**, presses **halved**. Everything a stopwatch can measure is normal. **A normal transit time proves nothing about the last 3%**\n- A short bowel at 100 cm collapses **both** -- margin 1.4 and presses 417 -- because the length was buying both\n- **So the 600 cm is not there to give amylase spare time.** Amylase has eight times what it needs and wants no more. The length is there to buy **contact**, and you can tell because the job needing contact is the one with no spare\n- **No amount of one payment buys the other.** 300 cm at 20 a minute restores the presses to a healthy 2,500 on half the margin: the cancelling happens in the **product** and the margin is not a product. **Vigorous squeezing cannot buy time**\n- **Then the close, and it is a reversal.** L3P27 found only 1 contraction in 75 travels and called the other 74 mixing -- which looks like 1.3% efficiency. Those 74 are the **presses**. They were never doing transport; they are doing the half of digestion amylase cannot do and time cannot buy. **Going nowhere is the mechanism**\n- **Judging the gut by how far its squeezes move food is like judging a mixer by how far it carries the cake.** Transport has to happen once per mouthful; contact has to happen two and a half thousand times, which is why the travelling ones are the minority\n- **Third time in these lessons that an apparent weakness has turned out to be the mechanism** -- L3B21's tiny store of ATP, which is what makes its sensor sharp, L3B22's faint echoes letting the pulse reach the bottom, and now this. **When a biological system looks badly designed, check what the apparent waste is paid for**\n- **Still standing:** one contraction is taken to be one press, which is a convention and not a measurement. The contraction rate varies along the tube and with what was eaten. And nothing here counts how much of the last 3% a single press achieves -- that would need to know how densely the wall is covered in enzyme, which is **Big Idea 2's** surface, not this one's.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Complete Big Idea 27, Level 3", nextNodeId: 'complete' }
            ]
        },

        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- How Does Food Become Usable Energy?**\n\nThree lessons, and all three turn out to be about the same contractions.\n\n**Summary Table:**\n| | Physics (L3P27) | Chemistry (L3C27) | Biology (L3B27) |\n| --- | --- | --- | --- |\n| What Level 2 asserted | the muscle is **mixing** | **5.6 x 10²²** bonds, looked up | the length buys **time** |\n| The mechanism | a **travelling ring that seals** | joining **releases a water** | fixed enzymes are paid in **contact** |\n| The arithmetic | strength > height; 80 vs 25 | 180 − 18 = 162, then ÷ and × | contacts = (length/speed) × rate |\n| In numbers | margin **3.2**; a **8 s** swallow | **5.6 x 10²²**, and **3%** stuck | **2,500** presses per mouthful |\n| The reinterpretation | 75 is a **count**, not a ratio | 162/180 = **0.900 exactly** | the **74** are the presses |\n| The limit | the ring is taken as **sealing** | **not able**, not *not enough* | one press per squeeze is a **convention** |\n\n**What ties them together:** the physics found that most of the gut's squeezing goes nowhere, the chemistry found a job that cannot be done in the fluid at all, and the biology found that these are the same fact. The squeezing that transports nothing is what presses food against the wall, and the wall is where the last 3% is finished.\n\n**The one line to remember:** a free enzyme is paid in time and a fixed one in contact, and no amount of either one buys the other -- so a gut with a perfectly normal transit time can still be failing at the job that needs pressing, and seventy-four contractions in every seventy-five are doing exactly that while appearing to achieve nothing.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}

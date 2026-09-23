import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) companion to B16 "Migration Sensing". The synthesis
 * lesson for Big Idea 16.
 *
 * B16 said animals combine cues and left it as a principle. This lesson prices
 * it: independent errors partly cancel, so
 *
 *   combined error = single error / sqrt(number of cues)
 *
 * Two cues of +-12 degrees give +-8.5, four give +-6. Turned into distance with
 * L2P16's own tangent, a 1,000 km flight misses by 213 km on one cue and 149 km
 * on two.
 *
 * Condition stated: the cues must be independent and unbiased -- averaging
 * cancels scatter, never bias. Held fixed and named for Level 3: every cue is
 * trusted equally.
 */
export function getL2B16Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "B16 showed that a migrating bird does not rely on one sense. It has a magnetic sense, it reads the Sun and the stars, it knows landmarks, and some species use smell. When cloud hides the sky, the magnetic sense carries more of the load.\n\nEach of those senses is a **cue**: one independent reading of which way north is. The two dials under the picture are the number of **cues** the bird combines, and the **error** of each cue -- how many degrees either side of true north a single cue can land.\n\nThat is the principle. Here is the arithmetic nobody gave you.\n\nSuppose a bird's magnetic sense gives a bearing good to about **±12°**, and its star sense is also good to about **±12°**. It uses both, and averages them.\n\nHow good is the answer?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Better than ±12°, but not twice as good. The two mistakes are unrelated, so they partly cancel -- sometimes one is high while the other is low.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "Still ±12°. Averaging two equally wobbly numbers cannot give you anything sharper than the numbers you started with.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "It can, and this is one of the most useful facts in measurement.\n\nThe two senses do not make the *same* mistake. On a given night the magnetic reading might be 9° too far east while the star reading is 7° too far west. Average them and the two errors work against each other: the answer comes out 1° east, far better than either.\n\nSometimes they agree and you gain nothing. But **on average** the disagreements cancel more often than they add, and the arithmetic says by exactly how much.\n\n| Cues used, each ±12° | Combined error |\n| --- | --- |\n| 1 | ±12.0° |\n| **2** | **±8.5°** |\n| 3 | ±6.9° |\n| 4 | ±6.0° |\n\nTwo cues buy you nearly a third off. Four cues halve it. And you can see the shape of it: the gains get smaller each time, because you are dividing by the square root, not by the count.",
            options: [
                { id: 'cont', label: "Give me the rule.", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "A cue's **bearing error** is how far off its direction typically is, in **degrees**. Write it with a ± because it scatters either way -- sometimes east of the truth, sometimes west.\n\nWhen you average several cues:\n\n**combined error = single cue error / √(number of cues)**\n\nSo two cues divide the error by **√2 = 1.41**, and four divide it by **√4 = 2**.\n\nThe conditions are the whole story here, and there are two.\n\n**The cues must be independent.** Their mistakes have to be unrelated. Two magnetic senses in the same bird, both fooled by the same lump of magnetic rock, are not two cues -- they are one cue counted twice, and averaging them buys nothing.\n\n**The cues must be unbiased.** Averaging cancels **scatter** -- random wobble either side of the truth. It does nothing whatever about **bias**, a mistake that leans the same way every time. Average a hundred readings from a compass sitting next to a steel girder and you get a beautifully precise wrong answer.\n\nAnd to turn a bearing error into a distance, use the tangent from L2P16:\n\n**distance off = distance flown x tan(error)**",
            options: [
                { id: 'cont', label: "Put a flight through it.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**One cue.** A bird flies **1,000 km** using its magnetic sense alone, good to **±12°**.\n\n**Step 1.** tan 12° = **0.213**\n\n**Step 2.** distance off = 1,000 x 0.213 = **213 km**\n\nTwo hundred kilometres is not a near miss. It is a different estuary, a different valley, a different island.\n\n**Two cues.** Add the star sense, also ±12°.\n\n**Step 1.** combined error = 12 / √2 = 12 / 1.414 = **8.5°**\n\n**Step 2.** tan 8.5° = **0.149**\n\n**Step 3.** distance off = 1,000 x 0.149 = **149 km**\n\n**Step 4.** saved by the second cue: 213 − 149 = **64 km**\n\n| Cues | Combined error | Miss after 1,000 km |\n| --- | --- | --- |\n| magnetic only | ±12.0° | **213 km** |\n| magnetic + stars | ±8.5° | **149 km** |\n| four cues | ±6.0° | **105 km** |\n\nSixty-four kilometres, from a sense the bird already had. That is why evolution keeps paying for a second way of knowing which way is north, even when the first way works.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A young bird's cues are rougher: its magnetic sense and its star sense are each good to only **±20°**.\n\nWhat is its combined error when it uses both?",
            options: [
                { id: 'right', label: "About ±14.1°. 20 / √2 = 20 / 1.414 = 14.1.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'halved', label: "±10°, because two cues halve the error.", nextNodeId: 'math_wrong' },
                { id: 'added', label: "±40°, because the two errors add together.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**±10°** divided by the number of cues. It is the **square root** of the number, which is why the second cue helps a lot and the sixth barely registers.\n\n**±40°** added the errors. Adding would mean the mistakes always pile up in the same direction -- but they are independent, so they cancel as often as they compound. Adding is what happens to **bias**, not to scatter.\n\n**Step 1.** √2 = **1.414**\n\n**Step 2.** combined error = 20 / 1.414 = **14.1°**\n\nSense-check it: the answer must be smaller than 20° (two cues are better than one) and bigger than 10° (two cues are not twice as good). 14.1° sits between, as it must.",
            options: [
                { id: 'retry', label: "Divide by the root, not the count.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials.\n\n**Number of Cues** is how many independent senses the bird averages. **Error of Each Cue** is how good one of them is, in degrees.\n\nThe lab scatters the individual bearings, draws the averaged one, and works out the miss after a 1,000 km flight.\n\nTry this:\n\n- **1** cue at **±12°**: a **213 km** miss\n- Add a second: the error drops to **±8.5°** and the miss to **149 km** -- the biggest single gain you will see\n- Go to **4** cues: **±6.0°** and **105 km**. Going from 3 to 4 saves far less than going from 1 to 2\n- Push to **6** cues and watch the improvement almost stall: the square root is flattening out\n- Now set the error to **±30°** with one cue and watch a 1,000 km flight end **577 km** away -- rough cues fail in a way no amount of averaging quite rescues",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Divide by the square root of the count. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A bird crosses a region of magnetic rock that pulls every magnetic reading **8° east** — not randomly, but the same 8° east, every single time it checks.\n\nThe night is completely overcast, so its star sense is unavailable. It has only the magnetic sense, and it is a careful bird: it takes the reading **twenty times** and averages them.\n\nHow much does all that averaging help?",
            options: [
                { id: 'right', label: "Not at all. Averaging removes scatter, and this error is a bias -- every reading is wrong in the same direction, so the average is wrong by the same 8°. Twenty readings give a very precise 8° error.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "A lot: twenty readings divide the error by √20, so the 8° becomes about 1.8°.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "That would be right if the 8° were **scatter**. It is not -- and the difference between scatter and bias is the most important distinction in this lesson.\n\n| | What it is | What averaging does |\n| --- | --- | --- |\n| **Scatter** | wobble either side of the truth | shrinks it by √n |\n| **Bias** | a lean the same way every time | **nothing at all** |\n\nWork it through. The rock adds 8° east to every reading. Reading one: 8° east. Reading two: 8° east. Reading twenty: 8° east. The average of twenty identical errors is that same error. √20 never enters the arithmetic, because there is nothing random to cancel.\n\nAnd over a 1,000 km flight, tan 8° = 0.141, so the bird finishes **141 km** off — having measured very carefully indeed.\n\nThis is precisely L2P16's declination wearing feathers. There, a compass read 10° off because magnetic north is not true north, and walking further only made the miss bigger; taking more compass readings would not have helped either. Same fault, same reason.\n\n**More measurements buy precision, never accuracy. A bias has to be corrected, not averaged — which is why the bird needs a cue of a different kind, not more of the same one.**",
            options: [
                { id: 'retry', label: "Averaging cancels scatter, not bias.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **Averaging independent cues divides the scatter by the square root of how many you have, and does nothing at all about a bias — which is exactly why a second cue of a different kind is worth more than twenty repeats of the first.**\n\nThat closes Big Idea 16 at Level 2, and all three lessons turned out to be about the same question: **how much can you trust a direction?**\n\n- **L2P16** — **total field x cos(dip)** says how much of Earth's field is even available to turn your needle, and **distance x tan(declination)** prices the bias you get from trusting magnetic north as true north\n- **L2C16** — **the Curie temperature** says when a material stops being able to hold a direction at all: 770 °C for iron, and Earth's 5,000 °C core proves the planet's own field must come from moving iron rather than magnetised rock\n- **L2B16** — **single error / √n** says what a second independent cue is worth: 64 km saved on a 1,000 km flight, and nothing whatever against a bias\n\n**How do magnets help us navigate and build machines? By giving a direction you can measure — and every one of the three lessons is really about the size of the error in that measurement, and which kind of error it is.**\n\nOne thing this lesson held fixed: **every cue was trusted equally.** A real bird does not weigh a sharp cue and a vague one the same, and neither should you. Level 3 works out the right weighting, and finds it beats plain averaging by nearly a factor of two.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Divide by the root of the count!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You priced a second sense.**\n\n- A cue's **bearing error** is written ± so many **degrees**, because it scatters either side of the truth\n- **combined error = single cue error / √(number of cues)**\n- Two cues divide by **√2 = 1.41**; four divide by **√4 = 2**\n- Each ±12°: one cue **±12.0°**, two **±8.5°**, three **±6.9°**, four **±6.0°**\n- The gains shrink, because it is the **square root** of the count, not the count\n- Two rough cues at ±20° each give **±14.1°** — better than 20, worse than 10\n- Distance uses L2P16's tangent: **distance flown x tan(error)**\n- Over 1,000 km: one cue misses by **213 km**, two by **149 km** — the second cue saves **64 km**\n- Condition: the cues must be **independent**. Two senses fooled by the same rock are one cue counted twice\n- Condition: the cues must be **unbiased**. Averaging cancels **scatter**, never **bias**\n- Twenty readings of an 8°-east bias give a very precise 8° error, and a **141 km** miss\n- Which is L2P16's declination again: a bias needs correcting, not repeating\n- Held fixed: every cue trusted equally",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "A second cue beats twenty repeats!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- Two Cues Beat One**\n\nB16 said animals combine cues. Level 2 says what the combining is worth.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Bearing error | ± degrees | It scatters both ways |\n| Averaging cues | **error / √n** | Root of the count, not the count |\n| Two cues | 12 / √2 | **±8.5°** from ±12° |\n| Four cues | 12 / √4 | **±6.0°** |\n| Into distance | **distance x tan(error)** | L2P16's tangent again |\n| One cue, 1,000 km | tan 12° | **213 km** off |\n| Two cues, 1,000 km | tan 8.5° | **149 km** off, saving 64 km |\n| Independence | same rock fools both | Then it is one cue, not two |\n| Scatter | wobble either side | Averaging shrinks it |\n| **Bias** | leans one way always | Averaging does **nothing** |\n| Twenty readings of an 8° bias | still 8° | A precise wrong answer |\n| Held fixed | all cues weighted equally | Level 3 weights them |\n\n**The one line to remember:** averaging independent cues divides the scatter by the square root of their number — so a second cue of a different kind is worth far more than repeating the first one twenty times, because repetition cannot touch a bias.\n\n**Big Idea 16 is complete at Level 2.**"
        }
    };
}

import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) for Big Idea 28, biology. The synthesis lesson.
 *
 * B28 put P28's pushing and C28's messages on one job -- oxygen to a sprinting leg --
 * and described it. This counts it, and the first factor is L2P28's own answer:
 *
 *   oxygen used = blood flow x oxygen taken from each litre
 *
 * Resting: 5 L/min x 50 mL/L = 250 mL a minute. Sprinting: 20 x 170 = 3,400, which is
 * 13.6 times as much -- and the two factors multiply, 4.0 x 3.4 = 13.6.
 *
 * The point of the lesson is the ceiling. A litre of blood only carries about 200 mL of
 * oxygen, so the second factor cannot pass 200 however hard the muscle pulls: it has at
 * most 4 times its resting 50 in it and then nothing. The first factor has no such hard
 * stop. So once extraction is near its ceiling the only thing left is flow -- which is
 * exactly what training raises, by making each beat bigger (L2P28).
 *
 * That completes the Big Idea's spine. All three lessons are a product of two factors,
 * and each one asks which factor has run out of room: L2P28's volume per beat (1.6x
 * against the rate's 2.6x), L2C28's blood (no room at all, 5.5 g against 15 g), and
 * here a hard ceiling at 200 mL/L.
 *
 * Frame of reference stated: the oxygen counted is what the muscle takes out of the
 * blood passing through it, measured per minute, and 'taken from each litre' is the
 * difference between what arrives and what leaves.
 *
 * Still standing: 200 mL/L assumes a normal amount of haemoglobin, and anaemia lowers
 * it; the extraction figure is an average over a whole body when a sprinting leg and a
 * resting arm differ enormously; and nothing here says what the muscle does with the
 * oxygen once it has it.
 */
export function getL2B28Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "B28 followed oxygen to a sprinting leg and showed two systems doing it together: the heart pushing blood, and chemical messages telling the body to breathe harder. It never counted the oxygen.\n\nSo count it, and the first number is already yours. **L2P28** worked out how much blood the heart moves: about **5 litres a minute** at rest, up to about **20** in a sprint.\n\nNow the second number, which is about the blood rather than the heart. Blood arrives at a muscle carrying oxygen and leaves still carrying some -- it never gives up all of it. The useful quantity is the difference:\n\n**oxygen taken from each litre** -- what went in minus what came out, in **millilitres per litre (mL/L)**\n\nAt rest a muscle takes only about **50 mL** out of every litre that passes. So:\n\n**oxygen used = blood flow x oxygen taken from each litre**\n\n5 L/min x 50 mL/L = **250 mL of oxygen a minute**\n\nCheck the units: litres a minute times millilitres per litre leaves **millilitres a minute**, because the litres cancel.\n\nAnd 250 mL a minute is right -- a resting adult really does use about a quarter of a litre of oxygen every minute, which is roughly 15 litres an hour.\n\nYour two dials are **Blood Flow** in litres a minute and **Oxygen Taken Per Litre** in mL/L.\n\nBefore any arithmetic. A sprinting leg has the flow at **20 L/min** and takes **170 mL** from each litre. How much oxygen a minute is that?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'thirty', label: "3,400 mL a minute — about 13 times the resting figure.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'four', label: "About 1,000 mL — the flow went up four times, so the oxygen does too.", nextNodeId: 'misconception' }
            ]
        },

        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "The flow did go up four times. But so did the other factor, and they **multiply** -- the same shape L2P28 found in the heart.\n\n20 L/min x 170 mL/L = **3,400 mL a minute**\n\nagainst 250 at rest, which is **13.6 times as much.**\n\n| | flow | taken per litre | oxygen a minute |\n| --- | --- | --- | --- |\n| resting | 5 | 50 | **250 mL** |\n| more flow only | 20 | 50 | **1,000 mL** |\n| more taking only | 5 | 170 | **850 mL** |\n| **both** | 20 | 170 | **3,400 mL** |\n\nNeither change alone gets close. **Flow alone buys 4 times, taking alone buys 3.4 times, and together they buy 4.0 x 3.4 = 13.6.**\n\nThat is the body's answer to a sprint: not one system working much harder, but **two systems each working somewhat harder**, multiplied. Thirteen-fold from two changes of about four and three.\n\nAnd it explains something B28 only hinted at. The reason a sprint needs **both** the heart and the breathing to change is that neither could do it alone -- a heart that somehow quadrupled its flow while the muscle kept taking only 50 mL a litre would deliver 1,000 mL a minute, which is nowhere near enough.",
            options: [
                { id: 'cont', label: "So can either factor just keep rising?", nextNodeId: 'defining' }
            ]
        },

        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "**No, and the two of them fail in completely different ways. This is the lesson.**\n\nStart with the second factor, because it has a hard stop. Oxygen taken from each litre cannot exceed the oxygen that was **in** each litre -- and a litre of blood only carries about **200 mL** of oxygen. That is set by how much **haemoglobin** it contains, the red protein that oxygen attaches to.\n\nSo:\n\n**oxygen taken per litre can never exceed about 200 mL/L**\n\nNot as a practical difficulty, but as arithmetic. You cannot take 250 mL out of a litre that only brought 200. At rest the muscle takes 50 of the 200, so **it has at most four times that available, and then nothing at all.**\n\nNow the first factor. Flow has no equivalent wall. L2P28 found the heart can go from about 5 to about 20 litres a minute, and a trained heart further -- its limit is a compromise between beating faster and having time to refill, not a hard ceiling in the arithmetic.\n\n| | at rest | the most available | what kind of limit |\n| --- | --- | --- | --- |\n| **flow** | 5 L/min | about 20, more if trained | a **soft** limit |\n| **taken per litre** | 50 mL/L | **200 mL/L**, and that is all | a **hard** ceiling |\n\n**So once a muscle is taking nearly all the oxygen out of the blood, the only thing left to change is the flow.** That single sentence explains a great deal, and the next node shows what.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'network' } },
            options: [
                { id: 'work', label: "What does it explain?", nextNodeId: 'worked' }
            ]
        },

        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**What training does, and why it does that and not something else.**\n\nTake a trained runner and an untrained one, both sprinting as hard as they can. Both muscles are doing the same thing chemically, so both take about the same **170 mL** from each litre -- near the ceiling, with little left to gain.\n\nSo the difference has to be flow, and from L2P28 we know how a heart raises flow: **bigger beats.** A trained heart pushes maybe 160 mL a beat instead of 110.\n\n| | flow | taken per litre | oxygen a minute |\n| --- | --- | --- | --- |\n| untrained sprint | 20 L/min | 170 | **3,400 mL** |\n| trained sprint | **30 L/min** | 170 | **5,100 mL** |\n\n**Fifty percent more oxygen, entirely from the flow factor**, because the other one had nowhere left to go.\n\nAnd now the reverse case, which is the one that matters medically. **Anaemia** is a shortage of haemoglobin, so each litre of blood carries less oxygen -- say **150 mL** instead of 200. The ceiling itself drops.\n\nA person with anaemia sprinting, taking nearly all of a smaller load, might manage **130 mL/L**:\n\n20 L/min x 130 mL/L = **2,600 mL a minute** instead of 3,400\n\nThey can compensate the only way left -- by raising the flow, which means a **faster heart** -- and that is exactly what anaemia feels like: breathless, racing pulse, tired on stairs. **The body is pushing on the one factor it still has.**",
            options: [
                { id: 'check', label: "Let me try one.", nextNodeId: 'math_check' }
            ]
        },

        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "Your turn. Someone is already sprinting at **20 L/min** and taking **190 mL** from each litre -- almost everything there is.\n\nThey need **20% more oxygen**. What has to change, and by how much?",
            options: [
                { id: 'flow', label: "The flow, by 20% to 24 L/min — the taking is nearly at its 200 ceiling and has only 5% left in it", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'taking', label: "The taking, by 20% to 228 mL/L", nextNodeId: 'math_wrong' },
                { id: 'both', label: "Both, by 10% each, sharing the increase", nextNodeId: 'math_wrong' }
            ]
        },

        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Check the second factor against its ceiling before doing anything else.\n\n190 mL/L is already almost all of the roughly **200 mL/L** a litre carries. Raising it 20% would mean **228 mL/L** -- taking more oxygen out of a litre than the litre contains, which is not a hard thing to do but an impossible one.\n\nThe most it could ever rise is from 190 to 200, which is about **5%**. So:\n\n- **taking** can supply at most 5% more. Not enough\n- **flow** must supply the rest, and since 20% is needed overall: 20 x 1.2 = **24 L/min**\n\nAnd *both by 10% each* has the same problem in a quieter form. Ten percent of 190 is 209, still past the ceiling. **A factor near its limit cannot take its share of an increase**, which is the whole reason it matters which factor has room.\n\n**This is the habit the Big Idea is teaching.** When a result is a product, you cannot decide how to raise it by looking at the factors' sizes -- 190 is a much bigger number than 20, and it is the useless one. You have to look at the **room each one has left**, and the arithmetic is what tells you.",
            options: [
                { id: 'retry', label: "Only the flow has room.", nextNodeId: 'explore' }
            ]
        },

        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Both dials are live. Blood arrives at the muscle carrying its oxygen -- **each litre is drawn as 20 units, one for every 10 mL** -- the muscle takes out the number you dial, and whatever is left carries on out through the vein.\n\nThings worth doing:\n\n- Start resting: **5 L/min** and **50 mL/L**. The muscle takes **5 of the 20** units and 15 carry on past. **250 mL a minute**, which is what a resting adult really uses\n- Now the sprint: **20 L/min** and **170 mL/L**. Seventeen of twenty taken, and the flow four times faster. **3,400 mL a minute**\n- Push the **Oxygen Taken Per Litre** dial to its top, **200**. All twenty units taken, nothing leaving in the vein -- and the dial stops, because **there is no twenty-first unit.** That is the ceiling, and it is drawn rather than asserted\n- With the taking at 200, the only dial that still does anything is the **flow**. Move it and watch the oxygen climb; that is the trained athlete's route, and the only one left\n- Then make the anaemia case: drop the taking to **130** and notice it is near the ceiling of a *smaller* load. The oxygen falls to 2,600 mL and the only fix available is more flow -- a faster heart\n- And compare the two single-factor moves from rest: **20 and 50** gives 1,000, while **5 and 170** gives 850. **Neither is close to 3,400**, which is what multiplying buys",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Checkpoint", nextNodeId: 'checkpoint' }
            ]
        },

        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "Put the three Level 2 lessons of this Big Idea side by side. Each one is a product of two factors:\n\n- **L2P28**: blood a minute = heart rate x volume per beat\n- **L2C28**: sugar in the blood = concentration x volume\n- **L2B28**: oxygen used = flow x taken per litre\n\nWhat is the question that all three turned out to be about?",
            options: [
                { id: 'room', label: "Which factor has run out of room — because a product is held back by its most constrained factor, not its smallest.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'bigger', label: "Which factor is bigger, since the bigger one contributes more.", nextNodeId: 'checkpoint_wrong' },
                { id: 'multiply', label: "That body systems multiply, which is all there is to it.", nextNodeId: 'checkpoint_wrong' }
            ]
        },

        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "*Body systems multiply* is true and it is only half the lesson, because on its own it would tell you that raising either factor is equally good. Every one of the three lessons found that it is not.\n\nAnd *the bigger factor contributes more* is the one to drop hardest, because the check question just disproved it. **190 mL/L is a far bigger number than 20 L/min, and it was the useless one.** Size tells you nothing; what matters is the distance to the limit:\n\n| | the product | the factor with no room |\n| --- | --- | --- |\n| **L2P28** | rate x volume per beat | **volume per beat**: 1.6x against the rate's 2.6x |\n| **L2C28** | concentration x volume | **the blood itself**: a 5.5 g gap against a 15 g slice |\n| **L2B28** | flow x taken per litre | **taken per litre**: a hard ceiling at 200 |\n\nThree different systems, three different products, and in each case **the arithmetic was the only way to find which factor was stuck.** You could not tell by looking at the numbers, and you certainly could not tell from the words -- C28's story reads as though the body simply deals with sugar, and the grams say it has no room to deal with anything.\n\nWhich is also why each one implied a different fix: beat more often, run the signal during the meal, and raise the flow because the taking is full.",
            options: [
                { id: 'retry', label: "Which one has run out of room.", nextNodeId: 'checkpoint_correct' }
            ]
        },

        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "**And that is the answer to the Big Idea, in a form none of the Level 1 lessons could give.**\n\n*How do body systems work together?* They **multiply** -- which is why two modest changes buy a thirteenfold increase, and why no single system has to do anything heroic. That is the good news, and it is the whole reason a body is built from several systems rather than one enormous one.\n\nThe price is that a product is only as free to grow as its **tightest** factor, and the three lessons found three different kinds of tightness:\n\n| | the limit | what the body does about it |\n| --- | --- | --- |\n| **volume per beat** | runs out of **filling time** | beats more often instead |\n| **the blood's sugar gap** | has **no room at all** | runs the signal *during* the meal |\n| **oxygen per litre** | a **hard ceiling** at 200 | raises the flow instead |\n\nNotice that in every case **the body's answer is to push on the other factor.** It does not try to break the limit; it routes around it. The heart cannot refill faster, so it beats more often. The blood cannot hold a meal, so the clearing runs alongside the arriving. A litre cannot carry more than 200 mL, so a trained heart moves more litres.\n\n**Working together means having another factor to push on.** A system with only one way to change has no second move -- and that is what this Big Idea is really about.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "It routes around the limit!", nextNodeId: 'discovery' }
            ]
        },

        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You counted the oxygen B28 only followed.**\n\n- **oxygen used = blood flow x oxygen taken from each litre.** The flow is L2P28's own answer; the taking is what the muscle pulls out, measured as what went in minus what came out\n- At rest, 5 L/min x 50 mL/L = **250 mL a minute** -- which is genuinely what a resting adult uses, about 15 litres an hour. Units: litres a minute times mL per litre leaves **mL a minute**\n- Sprinting, 20 x 170 = **3,400 mL a minute**, **13.6 times** the resting figure -- and the factors multiply: flow alone buys **4.0x**, taking alone **3.4x**, together **13.6x**\n- **Neither alone is close.** 20 x 50 is 1,000; 5 x 170 is 850. A sprint needs both systems because neither could do it by itself\n- **And the two factors fail in completely different ways.** Oxygen taken per litre cannot exceed what the litre carried, and a litre carries about **200 mL**, set by its **haemoglobin**. So taking has at most **4x** its resting 50 in it and then **nothing** -- a hard ceiling, not a difficulty\n- Flow has no such wall: its limit is L2P28's compromise between beating faster and having time to refill. **Soft limit against hard ceiling**\n- **So once a muscle is taking nearly all the oxygen out, the only thing left is flow** -- which is what **training** raises, by making each beat bigger. 30 L/min at the same 170 gives **5,100 mL**, fifty percent more, entirely from the factor that still had room\n- **And the reverse is anaemia**: less haemoglobin, so the ceiling itself drops. 20 x 130 = **2,600 mL**, and the only compensation available is more flow -- a racing pulse and breathlessness on stairs, which is the body pushing the one factor it has left\n- **A factor near its limit cannot take its share of an increase.** At 190 mL/L, needing 20% more oxygen, the taking can supply about 5% and the flow must do the rest: 20 x 1.2 = **24 L/min**. **190 is a far bigger number than 20 and it is the useless one**\n- **So all three Level 2 lessons were one question.** Each is a product, and each asks which factor has run out of room: **volume per beat** (1.6x against 2.6x), **the blood** (a 5.5 g gap against 15 g), and **oxygen per litre** (a ceiling at 200)\n- **Body systems work together by multiplying**, so two modest changes buy thirteenfold and nothing has to be heroic. The price is that the product is only as free as its **tightest** factor\n- **And in every case the body routes around the limit rather than breaking it.** Cannot refill faster, so beat more often. Cannot hold a meal, so clear it during. Cannot carry more than 200 mL a litre, so move more litres. **Working together means having another factor to push on**\n- **Still standing:** 200 mL/L assumes a normal amount of haemoglobin. The taking figure is an average over a whole body, while a sprinting leg and a resting arm differ enormously. And what the muscle **does** with the oxygen once it has it is not counted here at all.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Complete Big Idea 28, Level 2", nextNodeId: 'complete' }
            ]
        },

        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- How Do Body Systems Work Together?**\n\nThree lessons, three products, and the same question asked three times.\n\n**Summary Table:**\n| | Physics (L2P28) | Chemistry (L2C28) | Biology (L2B28) |\n| --- | --- | --- | --- |\n| The product | rate x **volume per beat** | concentration x **volume** | flow x **taken per litre** |\n| At rest | 70 x 70 = **4.9 L/min** | 0.9 x 5 = **4.5 g** | 5 x 50 = **250 mL/min** |\n| Stretched | 180 x 110 = **19.8 L/min** | danger at **10 g** | 20 x 170 = **3,400 mL/min** |\n| How much more | **4x**, as 2.6 x 1.6 | -- | **13.6x**, as 4.0 x 3.4 |\n| The tight factor | **volume per beat**, 1.6x | **the blood**, 5.5 g of room | **per litre**, capped at 200 |\n| Kind of limit | runs out of **filling time** | **no room at all** | a **hard ceiling** |\n| What the body does | beats **more often** | clears **during** the meal | moves **more litres** |\n\n**What ties them together:** every one of these is two systems multiplied, which is why a body gets large changes out of small ones. And every one is held back by whichever factor has least room left -- never by the smallest number, which is why the arithmetic is not optional.\n\n**The one line to remember:** body systems work together by multiplying, so the useful question is never how big a factor is but how much room it has left -- and when a factor runs out, a body never breaks the limit, it pushes on the other factor instead.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}

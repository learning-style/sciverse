import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) for Big Idea 28, physics.
 *
 * P28 named three things that change how much blood arrives somewhere -- heart rate,
 * vessel width and flow -- and put a number on only one of them, the fourth-power
 * result for width. This lesson takes the heart itself:
 *
 *   blood moved per minute = heart rate x volume per beat
 *
 * 70 beats a minute x 70 mL is 4,900 mL, about 4.9 litres. Sprinting: 180 x 110 mL is
 * 19.8 litres, four times as much.
 *
 * It deliberately stays off vessel radius and flow resistance, which L3P11 owns
 * comprehensively -- pressure drop = flow x resistance, resistance as 1/radius^4, the
 * 85 mmHg drop over 5 L/min. This is the pump, not the pipes, and the two multiply.
 *
 * The finding is that the two factors have very different room. Rate goes 70 -> 180,
 * which is 2.6x. Volume per beat goes 70 -> 110, only 1.6x. So most of the fourfold
 * increase is bought by beating faster, and the checkpoint is why: the heart refills
 * between beats, and beating faster leaves less time to refill, so the two factors work
 * against each other at the top.
 *
 * Frame of reference stated: the volume is what leaves the heart on each beat, measured
 * on its way out, and the rate is beats of the whole heart per minute.
 *
 * Still standing: past about 180 beats a minute the filling time runs so short that the
 * volume per beat falls, so the product stops rising -- which this lesson states but
 * does not model.
 */
export function getL2P28Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "P28 said three things decide how much blood arrives somewhere: how fast the heart beats, how wide the vessels are, and the flow that results. It put a number on the **width** -- halve it and about a sixteenth gets through -- and left the heart itself as *faster or slower*.\n\nSo here is the heart, with a number on it.\n\nEvery beat, the heart squeezes and pushes out a certain amount of blood. That amount has a name and a size. It is the **volume per beat**, and for a resting adult it is about **70 millilitres (mL)** -- a bit more than a tablespoon, each and every beat.\n\nSo the blood moved in a minute is simply how many beats there are times how much each one pushes:\n\n**blood per minute = heart rate x volume per beat**\n\nAt rest, about **70 beats a minute**:\n\n70 beats x 70 mL = **4,900 mL**, which is about **4.9 litres a minute**\n\nStop on that for a second, because it is a surprising amount. An adult holds about **5 litres of blood in total.** So the heart pushes your entire blood supply out and around in **about a minute**, all day, without stopping. You are not storing blood; you are circulating it.\n\nYour two dials are **Heart Rate** in beats a minute and **Volume Per Beat** in millilitres.\n\nBefore any arithmetic. Sprinting, a heart might reach **180 beats a minute** while the volume per beat rises to **110 mL**. Roughly how much blood a minute is that?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'twenty', label: "About 20 litres — 180 x 110 is 19,800 mL.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'ten', label: "About 10 litres — roughly double, since the heart rate roughly doubled.", nextNodeId: 'misconception' }
            ]
        },

        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "The rate did roughly double. But it is not the only thing that changed, and the two changes **multiply** rather than taking turns.\n\n180 beats x 110 mL = **19,800 mL**, about **19.8 litres a minute**\n\nagainst 4.9 at rest. That is **four times as much**, not two.\n\nThe reason is worth seeing properly, because it is the shape of the whole Big Idea. Each beat is bigger **and** there are more of them, so the gains stack:\n\n| | beats a minute | mL per beat | litres a minute |\n| --- | --- | --- | --- |\n| resting | 70 | 70 | **4.9** |\n| faster beats only | 180 | 70 | **12.6** |\n| bigger beats only | 70 | 110 | **7.7** |\n| **both** | 180 | 110 | **19.8** |\n\nNeither change on its own gets anywhere near 19.8. **Rate alone buys 2.6 times, volume alone buys 1.6 times, and together they buy 2.6 x 1.6 = 4.0.**\n\nThat is what a product does, and it is why the body bothers to change both. If only one could change, a sprinting leg would get a fraction of what it needs.",
            options: [
                { id: 'cont', label: "So which one does more of the work?", nextNodeId: 'defining' }
            ]
        },

        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "**Not the one most people guess**, and the table above already shows it.\n\nLook at how far each factor can actually move:\n\n| | resting | sprinting | how many times |\n| --- | --- | --- | --- |\n| **heart rate** | 70 | 180 | **2.6x** |\n| **volume per beat** | 70 mL | 110 mL | **1.6x** |\n\n**The rate has far more room in it.** It can nearly triple. The volume per beat manages barely more than half again -- and that is the trained, athletic version of the figure.\n\nSo of the fourfold increase, most is bought by **beating faster**. The heart does not mainly solve the problem by squeezing harder; it solves it by squeezing **more often**.\n\nAnd this is the thing to carry into the rest of the Big Idea. **When a result is a product, the useful question is not how big each factor is but how much room each one has left.** A factor already near its limit cannot help you, however important it looks.\n\nThe condition on the formula, stated where it belongs: this is the blood leaving the heart, measured on its way out, and the rate is beats of the whole heart per minute. **It holds while the volume per beat keeps up** -- and at the very top it stops doing so, which is the last thing we will come to.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'network' } },
            options: [
                { id: 'work', label: "Work one through properly.", nextNodeId: 'worked' }
            ]
        },

        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**A worked example, and then the thing it buys you.**\n\nSomebody climbing stairs: **120 beats a minute**, **90 mL** a beat.\n\n120 x 90 = **10,800 mL**, so **10.8 litres a minute**\n\nagainst 4.9 at rest -- a little over double. Check the units as you go: beats a minute times millilitres per beat leaves **millilitres a minute**, because the beats cancel. Then 10,800 mL / 1,000 = 10.8 L.\n\n**Now turn the formula round**, which is how it is actually used. A doctor can measure the blood a patient moves per minute and can count their pulse. What they cannot easily see is the volume per beat -- so they divide:\n\n**volume per beat = blood per minute / heart rate**\n\nA patient moving 4.2 litres a minute with a pulse of 100:\n\n4,200 mL / 100 beats = **42 mL a beat**\n\nThat is well under the normal 70, and it is the useful finding. **Their heart is beating fast and still moving less blood than a resting one** -- 4.2 litres against 4.9. The fast pulse is not the problem; it is the body's attempt at a fix, and the arithmetic shows what it is trying to make up for.\n\n**A product can hide a weak factor behind a strong one**, and dividing is how you pull them apart.",
            options: [
                { id: 'check', label: "Let me try one.", nextNodeId: 'math_check' }
            ]
        },

        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "Your turn. A trained runner at rest moves the usual **4.9 litres a minute**, but their resting pulse is only **50 beats a minute**.\n\nWhat is their volume per beat, and what does that tell you?",
            options: [
                { id: 'ninetyeight', label: "98 mL — a much bigger beat, so they need fewer of them", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'low', label: "35 mL — a slow pulse means a weak heart", nextNodeId: 'math_wrong' },
                { id: 'same', label: "70 mL — the volume per beat is the same in everybody", nextNodeId: 'math_wrong' }
            ]
        },

        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Divide, and watch which way the answer has to go:\n\n4,900 mL / 50 beats = **98 mL a beat**\n\nThe body still needs its 4.9 litres a minute, so if the beats are **fewer**, each one has to be **bigger**. The two factors are multiplied, so pushing one down forces the other up to keep the product fixed.\n\n**35 mL has the arithmetic upside down** -- it would give 50 x 35 = 1,750 mL a minute, barely a third of what a resting body needs, and the runner would faint. Whenever an answer comes out, multiply it back and see whether it reproduces the number you started from. 50 x 98 = 4,900 ✓\n\nAnd *the same in everybody* is the assumption worth dropping. **Training does not make the heart beat faster. It makes each beat bigger**, which is why a fit person's resting pulse is low -- the famous example being cyclists with resting pulses in the thirties. Their hearts are moving the same few litres a minute as everyone else, in far fewer, far larger pushes.\n\nWhich also explains something useful: a bigger beat is why a trained heart has **more room at the top.** Starting from 98 mL at rest it has a higher ceiling to work with, so when they sprint the product climbs further.",
            options: [
                { id: 'retry', label: "Fewer beats, so bigger ones.", nextNodeId: 'explore' }
            ]
        },

        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Both dials are live. The heart beats at the rate you set, pushing out a squirt whose size is the volume per beat, and the jug beside it fills with what that adds up to in one minute.\n\nThings worth doing:\n\n- Start at **70 beats** and **70 mL**: **4.9 litres a minute**, and remember that an adult holds about 5 litres in total. **The whole supply, round in a minute**\n- Now set the sprint: **180** and **110**. The jug fills four times as fast -- **19.8 litres a minute** -- and the heart is visibly hammering\n- Take the rate to **180** and the volume back to **70**. Only **12.6 litres**. Then **70** and **110**: only **7.7**. **Neither factor alone gets near 19.8**\n- Make the trained runner: **50 beats** and **98 mL**. The jug fills at the same resting rate as 70 x 70, with the heart beating far more slowly and far more strongly\n- Hunt for pairs that give the same answer. 140 x 70, 70 x 140 and 100 x 98 all land near 4.9 to 9.8 litres -- **only the product matters to the jug**, however different the beating looks\n- And take the rate to its highest with the volume low, which is what a struggling heart looks like: a frantic pulse and a jug that fills no faster than a calm one",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Checkpoint", nextNodeId: 'checkpoint' }
            ]
        },

        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "Here is a fair question about the formula.\n\nIf blood per minute is just rate times volume, why does the heart not simply keep raising the rate? 180 beats a minute gives 19.8 litres, so **400 beats a minute** ought to give over 40.\n\nIt does not. Why not?",
            options: [
                { id: 'filling', label: "Because the heart has to refill between beats, and beating faster leaves less time to refill — so pushing the rate up drags the volume per beat down.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'tired', label: "Because the muscle gets tired and gives up.", nextNodeId: 'checkpoint_wrong' },
                { id: 'vessels', label: "Because the vessels are too narrow to carry 40 litres a minute.", nextNodeId: 'checkpoint_wrong' }
            ]
        },

        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Think about where the 70 or 110 mL **comes from** before each beat.\n\nThe heart is not a syringe with a reservoir behind it. It is a chamber that **fills and then empties**, and the filling happens in the gap between beats. At 70 beats a minute that gap is about **0.86 seconds**. At 180 beats it is **0.33 seconds**. At 400 it would be **0.15 seconds** -- and blood simply cannot flow in fast enough to fill the chamber in that time.\n\nSo the two factors in the formula are **not independent**, and that is the honest limit on it:\n\n**pushing the rate up drags the volume per beat down.**\n\nUp to about 180 beats a minute the loss is small and the product still climbs. Past that the volume falls faster than the rate rises, and **the blood per minute stops increasing and then decreases.** A heart racing at 220 moves less blood than one at 180, which is exactly why some fast heart rhythms are dangerous rather than merely alarming.\n\n*The muscle gets tired* is not it -- the limit bites immediately, not after a while. And *the vessels* is the wrong system: that is P28's width and L3P11's resistance, and it is a separate question from how much the pump can deliver in the first place.\n\n**A product whose factors fight each other has a maximum.** Finding where is a Level 3 job, but knowing that it exists changes how you read the formula.",
            options: [
                { id: 'retry', label: "Less time to refill.", nextNodeId: 'checkpoint_correct' }
            ]
        },

        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "**Exactly -- and notice what that does to the lesson's main finding.**\n\nEarlier we said the rate has more room in it: 2.6 times against 1.6. That is true, and it is now clear **why the room runs out**. The rate can keep rising, but every rise makes the other factor smaller, so the product has a ceiling that neither number shows on its own.\n\nSo the heart's answer to *move four times as much blood* is to push on both, and the two pull against each other:\n\n| | | |\n| --- | --- | --- |\n| raise the **rate** | more pushes a minute | but each refills less |\n| raise the **volume** | more per push | but only about 1.6x is available |\n\nAnd this is the shape to take into the rest of Big Idea 28. **Body systems work together by multiplying**, which is powerful -- 2.6 x 1.6 is a fourfold gain from two modest changes. But it also means **the result is held back by whichever factor has run out of room**, and the arithmetic is the only way to see which one that is.\n\n**C28 asks the same question about a chemical message**: how much room does the blood have to hold the sugar from a meal? The answer there is much less comfortable than 1.6 times.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Which factor has run out of room!", nextNodeId: 'discovery' }
            ]
        },

        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You put a number on the pump P28 only described.**\n\n- Each beat pushes out a **volume per beat**, about **70 mL** at rest -- a bit more than a tablespoon, every beat\n- **blood per minute = heart rate x volume per beat**. At rest, 70 x 70 = **4,900 mL**, about **4.9 litres a minute**\n- An adult holds about **5 litres in total**, so the heart sends the **entire supply** round in about a minute. You do not store blood, you circulate it\n- Check the units: beats a minute times mL per beat leaves **mL a minute**, because the beats cancel\n- Sprinting, 180 x 110 = **19.8 litres**, four times as much. And the two changes **multiply**: rate alone buys **2.6x**, volume alone **1.6x**, and together **2.6 x 1.6 = 4.0**\n- **The two factors have very different room.** The rate nearly triples; the volume per beat manages barely more than half again. So most of the gain comes from beating **more often**, not harder\n- **Turn the formula round and it becomes a diagnosis.** volume per beat = blood per minute / heart rate. A patient at 4.2 litres with a pulse of 100 has **42 mL** a beat -- a fast pulse moving **less** blood than a resting body. The fast pulse is the attempted fix, not the fault\n- **A product can hide a weak factor behind a strong one**, and dividing pulls them apart\n- **Training does not speed the heart up, it makes each beat bigger.** A runner at 4.9 litres on a pulse of 50 is pushing **98 mL** a beat -- which also leaves them more room at the top\n- **And the two factors are not independent**, which is the honest limit. The heart refills between beats: 0.86 s at 70, 0.33 s at 180, 0.15 s at 400. **Raising the rate drags the volume down**, so past about 180 the product stops climbing and then falls -- which is why a very fast rhythm moves *less* blood, not more\n- **So body systems work together by multiplying**, which is powerful and which means **the result is held back by whichever factor has run out of room.** The arithmetic is the only way to see which\n- **Still standing:** where exactly the product peaks, and by how much the volume falls as the rate climbs, are not modelled here -- only stated. This lesson also stayed off the **vessels** entirely: how wide they are is P28's half of the story and a separate question from what the pump can deliver.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Complete L2P28", nextNodeId: 'complete' }
            ]
        },

        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Physics Complete -- How Do Body Systems Work Together?**\n\nP28 said the heart beats faster or slower. This put litres on it.\n\n**Summary Table:**\n| | P28 said | L2P28 says |\n| --- | --- | --- |\n| What a beat does | pushes blood | pushes a **volume per beat**, about **70 mL** |\n| The formula | -- | **rate x volume per beat** |\n| At rest | -- | 70 x 70 = **4.9 litres a minute** |\n| Compared with your blood | -- | about **5 litres total**: the whole lot, round in a minute |\n| Sprinting | the heart beats faster | 180 x 110 = **19.8 litres**, **4x** |\n| How the gains combine | -- | they **multiply**: 2.6 x 1.6 = 4.0 |\n| Which factor has more room | -- | the **rate**, 2.6x against 1.6x |\n| Turned round | -- | **volume per beat = litres per minute / rate** |\n| Why the rate cannot just rise | -- | less time to **refill**, so volume falls with it |\n\n**The one line to remember:** the heart moves your whole blood supply round in about a minute, and when it needs to move four times as much it does so by multiplying two modest changes together -- so the question to ask of any product like this is never how big a factor is, but how much room it has left.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}

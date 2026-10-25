import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 27, physics. Mechanism + Limit.
 *
 * L2P27 measured two speeds -- a squeezing wave at 3 cm/s, food advancing at 0.04 cm/s,
 * 75 times slower -- and concluded the muscle is mixing rather than carrying. It never
 * said how a muscle wave moves food at all, so the conclusion was read off a ratio.
 * This lesson supplies the mechanism and then uses it to EXPLAIN the ratio rather than
 * adding anything to it.
 *
 * The mechanism is a travelling ring of closure, like a hand squeezing down a tube of
 * toothpaste. Because the ring seals behind the mouthful, the food is enclosed, and an
 * enclosed thing does not care which way is up -- which is why you can drink standing
 * on your head. That is the hook and it is testable at the kitchen sink.
 *
 * Pressure is measured in CENTIMETRES OF WATER, deliberately, so the comparison needs no
 * machinery at all: to lift water 25 cm you need a pressure of 25 cm of water. An
 * oesophageal wave makes about 80 cm of water against a 25 cm column, a margin of 3.2 --
 * the same answer as 60 mmHg against 18.4 mmHg, with no rho g h and no unit conversion.
 *
 * Then the two confirmations, and they are what make it Mechanism rather than assertion:
 *
 *   1. A ring that CLOSES and TRAVELS carries food at its own speed. The oesophagus is
 *      25 cm, so a swallow should take 25 / 3 = 8 s -- and a real swallow takes 5 to 10.
 *   2. The small intestine's food advances at 1/75 of the wave speed, so its rings
 *      cannot be doing that. About one contraction in 75 travels; the other 74 squeeze
 *      and release in place and only stir.
 *
 * So L2P27's "mixing, not carrying" is right, and the 75 is now a count of what the
 * squeezing is FOR rather than a bare ratio.
 *
 * Frames stated: every pressure is measured against the atmosphere outside the body,
 * every height is measured upward from the mouthful to where it must arrive, and the
 * speeds are along the tube.
 *
 * Still standing: the ring is treated as closing perfectly, the 80 cm of water is a
 * typical figure and the real range is wide, and the one-in-seventy-five is an average
 * over a tube whose behaviour changes along its length.
 */
export function getL3P27Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "Try this at a sink, because it settles the question faster than any argument. **Bend over, put your head below your waist, and drink a glass of water upside down.**\n\nIt works. People do it as a party trick, and astronauts eat and drink perfectly well with no up at all.\n\nWhich should bother you, because L2P27 never explained how food moves through you in the first place. It measured two speeds -- a squeezing wave travelling at about **3 cm/s**, and food in the small intestine advancing at about **0.04 cm/s**, seventy-five times slower -- and concluded the muscle must be **mixing** rather than carrying. That conclusion was read off a ratio. **Nothing said how a muscle moves food at all.**\n\nSo here is the mechanism, and it is a thing you can do with your hands.\n\n**Peristalsis** is a ring of muscle that tightens around the tube and then travels along it. Not a push from behind -- a **moving pinch**. Squeeze a tube of toothpaste near the bottom and slide your fingers towards the top: the paste ahead of your fingers has nowhere to go but forward, because behind your fingers the tube is shut.\n\nThat is the whole trick, and the upside-down part follows immediately. **The mouthful is enclosed.** There is a sealed ring of muscle behind it and relaxed tube in front, so it is not resting on anything and it is not free to fall -- it goes where the ring pushes it. **An enclosed thing does not care which way is up.**\n\nBut it is not free. Pushing water uphill costs pressure, and we will measure pressure in the most convenient unit there is: **centimetres of water**, which means exactly what it says -- the pressure that will hold up a column of water that many centimetres tall.\n\nSo your two dials are **Wave Strength** in centimetres of water, and **Height Lifted** in centimetres -- how far above the mouthful its destination is. Lying flat that is 0. Standing on your head it is the length of your oesophagus, about 25 cm.\n\nBefore any arithmetic. To push water **25 cm** uphill, how strong must the wave be?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'twentyfive', label: "More than 25 cm of water — that is what the unit means.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'gravity', label: "It cannot be done — gravity will always pull the water back down.", nextNodeId: 'misconception' }
            ]
        },

        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Gravity is certainly pulling on it. It is just not **winning**, and the reason is the seal.\n\nThink about what gravity needs in order to bring the water back down: **a path**. Water falls because there is somewhere below it to fall to. Behind this mouthful there is a ring of muscle squeezed shut against itself, and a closed tube is not a path. The water is not sitting on top of a column of air that it can drop through -- it is **shut in**, between muscle behind and muscle in front.\n\nSo gravity is reduced to a single effect: the wave has to **carry the weight** of the water it is lifting, and that is all. It is a load, not a leak.\n\nAnd a load you can put a number on. The weight of a column of water 25 cm tall is, by definition of the unit, a pressure of **25 cm of water**. So the question is not *can gravity be beaten* but **is the muscle stronger than 25 cm of water**, which is a perfectly ordinary engineering question with a yes or no answer.\n\nThe answer is yes, comfortably, and we will get to the figure in a moment.\n\n**This is worth separating carefully, because it is the common confusion about plumbing of all kinds.** A pump does not fail because gravity exists. It fails when the thing it is pumping can get **back past** it -- and a peristaltic ring is the hardest of all pumps to get back past, because the moving part *is* the seal.",
            options: [
                { id: 'cont', label: "So how strong is the wave?", nextNodeId: 'defining' }
            ]
        },

        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Measured in people, a peristaltic wave in the **oesophagus** -- the tube from throat to stomach -- generates about **80 centimetres of water**. The real range is wide, roughly 40 to 200, and 80 is a fair middle.\n\nSo write the test. The wave lifts the mouthful if\n\n**wave strength (cm of water) > height lifted (cm)**\n\nand the **margin** is just one divided by the other:\n\n**margin = 80 / 25 = 3.2**\n\n**Three times the pressure the job needs**, which is why the party trick works and why nobody has to think about it. This holds while the ring **seals completely** -- an incomplete ring is a leak, and we will come back to that.\n\nNotice what the unit bought you. There was no need to know how heavy water is, no need for gravity, and no conversion: **centimetres against centimetres.** Pressure measured as the height of water it will hold up turns a problem about force into a problem about a ruler.\n\nAnd now the second thing the mechanism predicts, which is the one that matters, because it can be checked against something you have done thousands of times.\n\n**If the ring seals and travels, the food has to travel with it.** It cannot slip backwards -- the tube is shut behind it -- and it cannot outrun the ring. So the mouthful moves at **exactly the speed of the wave**, which L2P27 measured as about 3 cm/s.\n\nYour oesophagus is about 25 cm long. So a swallow should take\n\n**25 cm / 3 cm per second = about 8 seconds**\n\n**Swallow something and count.** A mouthful takes somewhere between five and ten seconds to reach the stomach -- which is the prediction, and nobody had to measure a pressure to get it.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'network' } },
            options: [
                { id: 'work', label: "Then why is food in the intestine so slow?", nextNodeId: 'worked' }
            ]
        },

        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**That is the question this lesson exists for, and the mechanism answers it in one line.**\n\nA sealing, travelling ring carries food at **3 cm/s**. That is not a maximum or an average -- it is what the mechanism *does*. If the small intestine's rings worked like the oesophagus's, food would cross all 600 cm of it in\n\n600 / 3 = **200 seconds**, a little over three minutes\n\nIt takes **4.2 hours**. So the small intestine's rings are **not doing that**, and the ratio tells you how far from it they are:\n\n**0.04 / 3 = 1/75**\n\nFood is advancing at one seventy-fifth of the speed a sealing travelling ring would give it. And read that as a **count** rather than a fraction, because that is what it is:\n\n**about one contraction in seventy-five travels. The other seventy-four squeeze and release on the spot.**\n\nA ring that tightens and then loosens **without going anywhere** moves no food at all. It pushes the contents apart, they flow back when it relaxes, and the net transport is zero -- but the contents have been thoroughly stirred. That is **segmentation**, and it is most of what your small intestine is doing at any moment.\n\n| | the oesophagus | the small intestine |\n| --- | --- | --- |\n| what the rings do | **travel** | mostly **stay put** |\n| so the food moves at | the wave speed, **3 cm/s** | **0.04 cm/s** |\n| time for its length | **8 s** for 25 cm | **4.2 h** for 600 cm |\n| what the muscle is for | **transport** | **mixing** |\n\n**Same muscle, same wave speed, two completely different jobs -- and the only difference is whether the ring goes anywhere.** L2P27 was right that the gap means mixing. This is why.",
            options: [
                { id: 'check', label: "Let me try one.", nextNodeId: 'math_check' }
            ]
        },

        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "Your turn. Somebody's oesophageal waves are weak -- they manage only **20 centimetres of water**.\n\nLying flat they swallow normally, and they have no idea anything is wrong. Then they try the upside-down trick, lifting the mouthful the full **25 cm**.\n\nWhat happens, and what is their margin?",
            options: [
                { id: 'fails', label: "It fails — the margin is 20/25 = 0.8, under 1, so the wave cannot carry the weight", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'slower', label: "It works but more slowly, because the wave still travels at 3 cm/s", nextNodeId: 'math_wrong' },
                { id: 'fine', label: "It works — 20 cm of water is plenty, since the food is sealed in", nextNodeId: 'math_wrong' }
            ]
        },

        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Compare the two numbers in the same unit, which is the whole reason for choosing it:\n\n**20 cm of water against a 25 cm column. 20 / 25 = 0.8.**\n\nUnder 1, so the wave cannot hold the weight, let alone lift it. The mouthful stays where it is or slides back.\n\nThe *works but slower* answer mixes up two different things, and they are worth keeping apart. **The wave speed sets how fast**, and **the wave strength sets whether at all.** A weak wave is not a slow wave. It still travels at 3 cm/s; it simply cannot carry this load while it does, so the seal gives way and the food is left behind.\n\nAnd *20 is plenty* forgets that being sealed in was never a free pass. **The seal removes the leak, not the weight.** Enclosing water stops it finding a path downwards, which is why direction stopped mattering -- but something still has to lift it, and that something is the muscle.\n\n**Now the part worth taking away.** This person is completely fine lying flat, where the height lifted is 0 and any wave at all will do. Their problem only appears when the job gets harder. **A margin of 3.2 is not spare capacity nobody needs** -- it is what lets a 25 cm lift be as unremarkable as a flat one, and when it erodes, the first thing to go is the thing you only do occasionally.",
            options: [
                { id: 'retry', label: "0.8 — the margin is under 1 and it fails.", nextNodeId: 'explore' }
            ]
        },

        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Both dials are live. The picture is the oesophagus with a mouthful in it and a ring of muscle travelling up behind it, and the two columns beside it compare the wave's strength with the height it has to lift -- in the same unit, so the taller column simply wins.\n\nThings worth doing:\n\n- Start at **80 cm of water** and a **25 cm** lift: margin **3.2**, the ring carries the mouthful up, and the arrow at the top says it arrives. That is the party trick\n- Now drop the **Height Lifted** to **0** -- lying flat. The lift column vanishes and **any** wave strength works. **Lying down, the muscle has nothing to beat**\n- Put the height back to 25 and bring the **Wave Strength** down. At 30 it still works. At **25** the two columns are exactly level: the wave can hold the mouthful and not move it. Below 25 the arrow turns and the food slides back\n- Find the switch at each height. It is always at **strength = height**, because the unit was chosen to make it so -- **a pressure measured in centimetres of water beats a column of water exactly when it is taller than it**\n- And watch the ring rather than the columns for a moment. It **seals behind** the mouthful every time, at every setting. That is what makes direction irrelevant, and it is why the failure above is about weight and never about leaking",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Checkpoint", nextNodeId: 'checkpoint' }
            ]
        },

        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "A classmate objects to the whole lesson.\n\n*You say a sealing travelling ring carries food at the wave speed, 3 cm/s. But food in the small intestine moves at 0.04 cm/s. So either the rings there are seventy-five times weaker, or your mechanism is wrong.*\n\nWhich is it?",
            options: [
                { id: 'neither', label: "Neither — the rings there are not weaker, they mostly do not travel. A ring that tightens and loosens in one place moves nothing and only stirs.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'weaker', label: "The rings are genuinely much weaker, which is why the food creeps.", nextNodeId: 'checkpoint_wrong' },
                { id: 'wrong', label: "The mechanism must be wrong, since it gives the wrong answer by a factor of 75.", nextNodeId: 'checkpoint_wrong' }
            ]
        },

        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Look at which part of the mechanism each explanation has to break, because only one of them survives.\n\n**Strength is the wrong lever.** Strength decides *whether* the ring can shift its load, not *how fast* it goes once it does. A weaker ring in a horizontal tube with almost nothing to lift still travels at its own speed and still carries what it seals in. To get food down to 0.04 cm/s by weakening the muscle you would need rings so feeble they could not close at all -- and a ring that cannot close cannot hold the contents in the first place, so nothing would be carried rather than carried slowly.\n\n**And the mechanism is not wrong, it is incomplete, and the missing word is *travel*.** It takes two things to transport: the ring must **close**, and the ring must **go somewhere**. The oesophagus does both. The small intestine does the first and mostly not the second.\n\nA contraction that tightens and then loosens **in one place** squeezes the contents outwards in both directions and lets them flow back as it releases. **Net movement: nothing. Net mixing: a great deal.** Do that a few thousand times on the way down and the contents are stirred thoroughly while barely advancing -- which is exactly what L2C27's formula needed, since an enzyme with no food near it cuts nothing.\n\nSo the 75 is not a strength and not an error. **It is a count: about one contraction in seventy-five is a travelling one.**",
            options: [
                { id: 'retry', label: "They do not travel — close is not the same as carry.", nextNodeId: 'checkpoint_correct' }
            ]
        },

        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "**And that turns L2P27's oddest number into the most useful one in the Big Idea.**\n\nLevel 2 measured a speed gap and read it as a hint: the muscle is probably mixing. It could not do better, because it had no mechanism to compare against. Now there is one, and the gap becomes a measurement:\n\n| | |\n| --- | --- |\n| a sealing travelling ring gives | **3 cm/s** |\n| food actually advances at | **0.04 cm/s** |\n| so the travelling share is | **1 in 75** |\n\n**The gut has one tool and two jobs, and it chooses between them by deciding whether the squeeze goes anywhere.** That is a remarkably cheap way to build an organ -- the same muscle, the same wave, the same speed, and the job is set entirely by whether the contraction travels.\n\nAnd it closes a loop the Big Idea opened. **L2C27's formula only held while every enzyme was busy every second**, and L2B27 pointed out that the mixing is what keeps that true. Now you can see what the mixing physically *is*: seventy-four contractions in every seventy-five, closing and opening on the spot, going nowhere on purpose.\n\nWhich leaves one thing still taken on trust. Every number about the cutting came from L2C27, and the biggest of them -- **5.6 x 10²² bonds in a slice of bread** -- was looked up rather than worked out. **L3C27 goes and gets it.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "One tool, two jobs!", nextNodeId: 'discovery' }
            ]
        },

        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You explained a ratio instead of adding to it.**\n\n- **Peristalsis is a ring of muscle that tightens and then travels** -- a moving pinch, not a push from behind. Squeeze a toothpaste tube near the bottom and slide your fingers up: the paste goes forward because behind your fingers the tube is shut\n- So **the mouthful is enclosed**, with muscle sealed behind it and relaxed tube in front. **An enclosed thing does not care which way is up**, which is why you can drink standing on your head and why astronauts eat normally\n- **Gravity does not go away; it stops having a path.** Water falls because there is somewhere below to fall to, and a closed tube is not somewhere. So gravity is reduced to a **load** the wave must carry, not a leak it must race\n- Measure pressure in **centimetres of water** -- the pressure that holds up a column of water that tall -- and the test needs no machinery: **wave strength (cm of water) > height lifted (cm)**. Nothing about how heavy water is, no gravity, no conversion -- **centimetres against centimetres**\n- An oesophageal wave makes about **80 cm of water**, typical in a range of roughly 40 to 200. Against a 25 cm lift the **margin is 3.2**, which is why the trick is unremarkable. Condition: the ring **seals completely**\n- **A weak wave is not a slow wave.** Strength decides *whether*, speed decides *how fast*. At 20 cm of water the margin is 0.8 and the mouthful does not go up at all -- and that person is perfectly fine lying flat, where the height is 0 and anything works. **Margins are spent on the things you do occasionally**\n- **The mechanism predicts a second thing, and this is what makes it a mechanism.** A sealing travelling ring cannot be slipped past or outrun, so the food moves at **exactly the wave speed**: 25 cm of oesophagus at 3 cm/s is **8 seconds** to swallow. Swallow something and count -- it is five to ten\n- **Then the payoff.** If the small intestine's rings worked that way, food would cross its 600 cm in **200 seconds**. It takes **4.2 hours**, so they do not -- and 0.04/3 = **1/75** says how far off they are\n- Read that as a **count**: about **one contraction in seventy-five travels**, and the other seventy-four tighten and loosen on the spot. A ring that goes nowhere squeezes the contents apart and lets them flow back, so **net transport nothing, net mixing a great deal.** That is **segmentation**\n- **One tool, two jobs, and the job is set by whether the squeeze goes anywhere.** Same muscle, same wave, same 3 cm/s -- transport in the oesophagus, mixing in the intestine\n- And it closes a loop: **L2C27's formula needed every enzyme busy every second**, L2B27 said the mixing is what keeps that true, and now you can see what the mixing *is* -- seventy-four contractions in seventy-five, going nowhere deliberately\n- **Still standing:** the ring was treated as sealing **perfectly**, and a real one leaks. The 80 cm of water is a typical figure across a wide range. The one-in-seventy-five is an **average** over a tube that behaves differently along its length. And every number about the cutting still comes from L2C27, including the **5.6 x 10²² bonds** it looked up -- **L3C27 works that out.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Complete L3P27", nextNodeId: 'complete' }
            ]
        },

        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Physics Complete -- How Does Food Become Usable Energy?**\n\nL2P27 measured two speeds and read a hint off their ratio. This supplied the mechanism, and the ratio became a measurement.\n\n**Summary Table:**\n| | L2P27 said | L3P27 says |\n| --- | --- | --- |\n| How food moves | a wave squeezes it along | a **travelling ring that seals behind it** |\n| Why direction does not matter | -- | the mouthful is **enclosed**: gravity has no path |\n| What gravity costs | -- | a **load**, measured as the height lifted |\n| The unit | -- | **centimetres of water**, so the test is cm vs cm |\n| The test | -- | **strength > height**; 80 against 25 is a margin of **3.2** |\n| A weak wave | -- | fails **whether**, not **how fast**: 20/25 = 0.8 |\n| How fast a sealed ring carries | -- | at the **wave speed**: 25 cm in **8 s**, as a real swallow is |\n| The 75-fold gap | means it is **mixing** | **1 contraction in 75 travels**; 74 go nowhere |\n| What the muscle is for | -- | **one tool, two jobs**, set by whether the squeeze moves |\n\n**The one line to remember:** a peristaltic ring carries food because it seals behind it, which is why up and down stop mattering and why the only thing gravity can still do is add weight -- and the moment you know what a *travelling* ring would achieve, L2P27's mysterious factor of seventy-five stops being a ratio and becomes a count of how many of the gut's squeezes are travelling at all.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}

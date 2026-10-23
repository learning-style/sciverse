import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) for Big Idea 27, physics.
 *
 * P27 named the mechanical half -- teeth grinding, stomach churning -- and said it
 * makes more surface to work on. The surface-area argument belongs to Big Idea 2,
 * which owns 6/L and the villi, so this lesson takes the other half of P27's own
 * title: MOTION.
 *
 *   time in an organ = length / how fast the food advances
 *
 * And the content is the contrast between two speeds that are easy to confuse. A
 * peristaltic WAVE travels at about 3 cm/s. In the oesophagus the food goes with it,
 * so 25 cm takes 8 seconds, which is what a swallow feels like. In the small
 * intestine the food advances at about 0.04 cm/s -- 75 times slower than a wave --
 * so 6 m takes about four hours, which is the measured figure.
 *
 * The food is not slower because the muscle is slower. It is slower because most of
 * those squeezes are MIXING rather than carrying, so comparing the two speeds tells
 * you which job the muscle is doing. Speed reveals the job.
 *
 * Frame of reference stated: both speeds are centimetres along the tube per second,
 * measured in the direction the food travels.
 *
 * Still standing: one speed stands in for a whole organ, when a real gut speeds up
 * and stops; and this says nothing about why the chemistry needs four hours, which
 * is L2C27's question and L2B27's answer.
 */
export function getL2P27Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "Here is something odd you can test at the sink. **Drink a glass of water bent over, with your head below your waist.** It goes down. Lie on your side and eat; that works too. Astronauts in orbit, with no up or down at all, eat perfectly well.\n\nSo whatever moves food along, **it is not falling.** Something is carrying it.\n\nThat something is **peristalsis**: a ring of muscle squeezes shut behind the food and the squeeze travels along the tube, pushing the food ahead of it like a hand sliding down a toothpaste tube. P27 called it churning and squeezing. This lesson puts a speed on it.\n\nAnd there are **two** speeds here, which is the whole lesson, because they are easy to mistake for each other.\n\n- the **wave speed** -- how fast one squeeze travels along the muscle. In the gut this is about **3 centimetres every second**, and it is much the same everywhere, because it is the same kind of muscle doing the same thing\n- the **speed the food advances** -- how fast the food itself actually gets further down the tube\n\nYou might expect those to be the same number. In one place they are. Nearly everywhere else they are not, and the gap is informative.\n\nYour two dials:\n\n- **How Fast the Food Advances**, in **centimetres per second (cm/s)**, measured along the tube in the direction the food is going.\n- **Length**, in **cm** -- how long the stretch of tube is.\n\nSo, before any arithmetic. Your oesophagus -- the tube from throat to stomach -- is about **25 cm** long, and food goes down it with the wave at about **3 cm/s**. How long does a swallow take?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'eight', label: "About 8 seconds -- 25 divided by 3.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'instant', label: "It is instant -- you swallow and it is there.", nextNodeId: 'misconception' }
            ]
        },

        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "It feels instant and it is not, and the arithmetic says how long:\n\n25 cm / 3 cm per s = **about 8 seconds**\n\nEight seconds is a long time to be unaware of. Swallow something and count -- or better, swallow something cold and feel where it is. People having their swallowing tested watch it on a screen, and it really does take that long.\n\nThe reason it feels instant is that **the part you control ends almost immediately.** You push the food past the back of your tongue, and from there the wave takes over and you have no say in it and no sensation of it. **The eight seconds is happening to you rather than being done by you**, and we are not built to notice those.\n\nWhich is worth knowing before the next part, because the numbers get much stranger. If 25 cm takes 8 seconds, how long should 6 metres take?",
            options: [
                { id: 'cont', label: "Work it out for the whole gut.", nextNodeId: 'defining' }
            ]
        },

        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "One division, and it is the same one you would use for a car on a motorway:\n\n**time = length / how fast the food advances**\n\nwith the length in cm and the speed in cm/s, which gives the time in **seconds**. Both measured along the tube, in the direction the food is travelling.\n\nSo the swallow:\n\n25 cm / 3 cm per s = **8.3 seconds**\n\nNow do the small intestine the same way. It is about **6 metres**, which is **600 cm**. If food went down it at the wave's 3 cm/s:\n\n600 / 3 = **200 seconds**, a little over three minutes\n\n**Food takes about four hours to cross the small intestine.** Not three minutes -- four hours, which is roughly **seventy times** longer. So the arithmetic is right and one of the numbers going into it is wrong, and it is not the length.\n\nWork backwards and find the speed that actually fits:\n\n600 cm / 4 hours = 600 cm / 14,400 s = **about 0.04 cm per second**\n\nThat is **75 times slower than a wave**. Four hundredths of a centimetre a second -- less than half a millimetre. And here is the thing to be clear about: **the muscle has not slowed down.** The squeezes are still travelling at roughly 3 cm/s. The food is not keeping up with them.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'network' } },
            options: [
                { id: 'work', label: "How can the food not keep up with the squeezes?", nextNodeId: 'worked' }
            ]
        },

        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "Because most of those squeezes are **not trying to carry it anywhere**.\n\nA squeeze that closes the tube *behind* the food and travels forward pushes the food along. That is what the oesophagus does, and the food advances at the wave's speed.\n\nBut a squeeze that pinches the tube in the *middle* of a stretch of food does something else entirely: it shoves some forward, some backward, and **mixes**. The food sloshes. Averaged over a few minutes it has barely advanced at all, although the muscle has been working the whole time.\n\nSo the two speeds answer two different questions, and **the gap between them tells you which job the muscle is doing**:\n\n| | Wave speed | Food advances at | What the muscle is doing |\n| --- | --- | --- | --- |\n| oesophagus | 3 cm/s | **3 cm/s** | **carrying**. Same number, so every squeeze moves food along |\n| small intestine | 3 cm/s | **0.04 cm/s** | **mixing**. Only about one squeeze in seventy carries |\n\n**That is a measurement you can make from the outside.** You do not need to see inside the gut to know whether a stretch of it is transporting or mixing. Time how long food takes, divide the length by it, and compare the answer with 3 cm/s. Close to 3 means carrying. Far below means mixing.\n\n**Working the numbers the other way.** Suppose a doctor measures food crossing a 600 cm small intestine in **2 hours** rather than 4:\n\n600 / 7,200 = **0.083 cm/s**, twice the usual\n\nThe muscle is not stronger. It is **carrying more and mixing less**, so the food is leaving before the chemistry is finished. That is what it means for food to go through too fast, and it is a real complaint with a real cause.",
            options: [
                { id: 'check', label: "Let me try one.", nextNodeId: 'math_check' }
            ]
        },

        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "Your turn. A stretch of gut is **150 cm** long and food advances along it at **0.01 cm/s**.\n\nHow long does food spend in it?",
            options: [
                { id: 'four', label: "15,000 seconds, which is about 4 hours", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'fifteen', label: "15 seconds", nextNodeId: 'math_wrong' },
                { id: 'onefive', label: "1.5 seconds", nextNodeId: 'math_wrong' }
            ]
        },

        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Divide the length by the speed, and watch the decimal:\n\n150 / 0.01 = **15,000 seconds**\n\nwhich is 15,000/60 = 250 minutes, or a bit over **4 hours**.\n\nBoth wrong answers come from the same place: **dividing by 0.01 makes a number bigger, not smaller**, and it makes it a hundred times bigger. 15 is 150 divided by 10, and 1.5 is 150 divided by 100 -- both of them treat the small number as if it were large.\n\nThere is a sanity check that catches this every time. **A slower speed must give a longer time.** You already know 25 cm at 3 cm/s takes 8 seconds. This is six times the distance at three hundred times less speed, so the answer has to be *much* bigger than 8 seconds -- and 15 seconds is not much bigger. An answer that fails the direction test is wrong before you check the arithmetic.\n\nAnd 4 hours for 150 cm is about right for a large intestine, which is the slowest stretch of all.",
            options: [
                { id: 'retry', label: "Slower means longer. Got it.", nextNodeId: 'explore' }
            ]
        },

        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Both dials are live. The tube is drawn at the length you set, with food travelling along it, and the wave speed is marked for comparison.\n\nThings worth doing:\n\n- Set the length to **25 cm** and the speed to **3 cm/s** -- the oesophagus. **8 seconds**, and the food keeps up with the wave.\n- Now set the length to **600 cm** and walk the speed down. At 3 cm/s it is three minutes. At **0.04** it is four hours. **The length never changed.**\n- Hold the speed at 0.04 and change the length instead. Time and length rise together, in step -- double the length, double the time. That straight-line behaviour is what a division gives you.\n- Find the speed at which 600 cm takes **exactly one hour**. It is about 0.17 cm/s, still far below a wave, so even a gut in a hurry is mostly mixing.\n- Last one. Put the speed at its very slowest and the length at its longest, and look at the number of hours. That is food that will be inside you tomorrow, and the only thing keeping it moving is a muscle squeezing in the dark.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Checkpoint", nextNodeId: 'checkpoint' }
            ]
        },

        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "Someone argues that digestion could be speeded up by strengthening the gut muscle -- train it like any other muscle, get the squeezes moving faster, and get through a meal in an hour instead of a day.\n\nUsing this lesson's two speeds, what is wrong with the plan?",
            options: [
                { id: 'notspeed', label: "The squeezes are already at about 3 cm/s. The food is slow because most squeezes mix rather than carry, so a faster muscle would mix faster, not carry sooner.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'works', label: "Nothing — a faster muscle would move food faster, exactly as described.", nextNodeId: 'checkpoint_wrong' },
                { id: 'cannot', label: "Gut muscle cannot be trained at all, so the plan is impossible.", nextNodeId: 'checkpoint_wrong' }
            ]
        },

        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Look at which of the two speeds the plan would change.\n\nThe **wave speed** is already about **3 cm/s**, and food crosses the small intestine at **0.04**. The muscle is therefore not the slow part -- it is working seventy-five times faster than the food is moving. **There is no shortage of muscle speed to fix.**\n\nWhat sets the food's speed is how many of those squeezes **carry** rather than **mix**, and that is a matter of pattern rather than strength. A stronger, faster muscle doing the same pattern would mix more vigorously and the food would advance at much the same rate.\n\nAnd the plan has a worse problem, which is that it is aiming at the wrong thing. Suppose it worked and food crossed in one hour. **The four hours is not a delay. It is the time the chemistry needs** -- and food that leaves early leaves undigested, which is exactly the two-hour case from earlier in this lesson and a real medical complaint.\n\nSo the honest answer is that the gut is not slow by accident, and **speeding it up is not an improvement**. Why four hours in particular is the question L2C27 and L2B27 answer between them.",
            options: [
                { id: 'retry', label: "The muscle is not the slow part.", nextNodeId: 'checkpoint_correct' }
            ]
        },

        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "**Exactly -- and notice what you were able to rule out without ever looking inside.**\n\nYou had two numbers: how fast a squeeze travels, and how fast food travels. Comparing them told you that the muscle has plenty of speed in hand, so the muscle cannot be what is limiting things. That is a real conclusion from two divisions.\n\nAnd it leaves the question pointing somewhere else. If the four hours is not the muscle being slow, **the four hours must be for something**, and the only other thing happening in there is chemistry.\n\nWhich sets up the rest of this Big Idea. **L2C27** asks how much chemistry there actually is to get through -- and the answer is a number large enough to be worth seeing. **L2B27** then asks why the tube is six metres long, and the answer turns out not to be the one everybody gives.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "The four hours is for something!", nextNodeId: 'discovery' }
            ]
        },

        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You put a speed on the part of digestion nobody can feel.**\n\n- Food is not **falling**. You can drink bent over, lie down to eat, and swallow in orbit -- so something is **carrying** it\n- **Peristalsis** is that something: a squeeze closes behind the food and travels along, pushing it ahead like a hand down a toothpaste tube\n- **time = length / how fast the food advances**, in cm and cm/s, giving seconds. Both measured along the tube in the direction of travel\n- There are **two** speeds and they are easy to confuse. A **wave** travels at about **3 cm/s** nearly everywhere, because it is the same muscle doing the same thing\n- **Oesophagus:** 25 cm at 3 cm/s = **8.3 seconds**. It feels instant because the part you control ends at once -- the eight seconds is happening to you, not done by you\n- **Small intestine:** 600 cm would be 200 seconds at a wave's speed, and food really takes about **four hours**. Working backwards, it advances at **0.04 cm/s** -- **75 times slower than a wave**\n- **The muscle has not slowed down.** A squeeze behind the food **carries** it; a squeeze in the middle of it **mixes**, shoving some forward and some back. Only about one squeeze in seventy carries\n- So **the gap between the two speeds tells you which job the muscle is doing**, and you can measure it from outside: time the food, divide the length by it, compare with 3 cm/s\n- **Dividing by a small number makes the answer bigger.** 150 / 0.01 is 15,000 and not 15 -- and a slower speed **must** give a longer time, which catches that error before the arithmetic does\n- Food crossing in 2 hours instead of 4 means **carrying more and mixing less**, so it leaves before the chemistry is finished. A real complaint with a real cause\n- Which rules out a whole explanation: **the muscle is not the slow part**, because it has seventy-five times the speed in hand. Strengthening it would mix harder, not finish sooner\n- **So the four hours is not a delay -- it is for something**, and the only other thing in there is chemistry\n- **Still standing:** one speed was made to stand for a whole organ, when a real gut speeds up, stops, and sends things back. And nothing here says **why** the chemistry should need four hours. **L2C27 counts the chemistry, and L2B27 explains the length.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Complete L2P27", nextNodeId: 'complete' }
            ]
        },

        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Physics Complete -- How Does Food Become Usable Energy?**\n\nP27 named the crushing and the squeezing. This timed them.\n\n**Summary Table:**\n| | P27 said | L2P27 says |\n| --- | --- | --- |\n| What moves food | churning and squeezing | **peristalsis**, not gravity -- it works upside down |\n| The formula | -- | **time = length / how fast the food advances** |\n| How fast a squeeze travels | -- | about **3 cm/s**, much the same everywhere |\n| A swallow | -- | 25 cm at 3 cm/s = **8.3 seconds** |\n| Across the small intestine | -- | 600 cm at **0.04 cm/s** = about **4 hours** |\n| Which is | -- | **75 times slower than the wave** |\n| Why | -- | most squeezes **mix** rather than **carry** |\n| What the two speeds tell you | -- | **which job the muscle is doing**, measured from outside |\n| Could a stronger muscle help | -- | **no** -- it has 75 times the speed in hand already |\n| Still standing | -- | why the chemistry needs four hours |\n\n**The one line to remember:** food moves because a squeeze travels along the tube behind it, and comparing how fast the squeeze goes with how fast the food goes tells you whether the muscle is carrying or mixing -- which is how you can tell, from the outside, that the four hours is not the muscle being slow.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}

import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 28, biology. Closes the Big Idea, and its summary
 * table covers all three lessons.
 *
 * L2B28 had oxygen used = flow x taken per litre, with a hard ceiling of 200 mL in every
 * litre, and said what it had glossed over: the extraction figure is an average over a
 * whole body when a sprinting leg and a resting arm differ enormously. So the flow
 * reaching one muscle is the thing to look at, and it is not the heart's output -- it is
 * the heart's output TIMES that muscle's share of it.
 *
 * Rest, 5.0 L/min: muscle 1.0, gut and liver 1.4, kidneys 1.1, brain 0.75, heart 0.25,
 * skin 0.5. Hard exercise, 20.0 L/min: the muscle takes 16.6. So the heart multiplied
 * the total by 4.0, the muscle's share went 20% -> 83%, a factor of 4.2, and 4.0 x 4.2
 * is the 16.6-fold rise in supply. Without the redistribution the muscle would have got
 * 20% of 20.0 = 4.0 L/min.
 *
 * The mechanism is the arteriole, a vessel wrapped in a ring of smooth muscle, and it
 * uses L3P11's fourth power rather than re-teaching it: flow goes as radius^4, so
 * DOUBLING an arteriole's radius multiplies its flow by exactly 16 -- which is the
 * muscle's factor, and the reason a change too small to see redirects a fifth of the
 * circulation.
 *
 * The limit is structural and is the close: the brain's flow is 0.75 L/min at rest and
 * 0.75 L/min at maximum effort. It is the one bed never squeezed, which is why fainting
 * is what happens when the total collapses -- as it does in L3P28's heart at 300.
 *
 * Still standing: the split among the other beds is simplified; a trained athlete's
 * numbers are larger throughout; and skin flow is governed by temperature as much as by
 * effort, which this lesson does not model.
 */
export function getL3B28Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2B28 closed Big Idea 28 at Level 2 by multiplying the **flow** by what is **taken from each litre**, and found the factor with no room: a litre of blood carries at most about **200 mL** of oxygen, so once extraction is near its ceiling the only way to use more is to **move more litres**.\n\nThen it named what it had smoothed over. **That extraction figure is an average over a whole body**, at a moment when a sprinting leg and a resting arm could hardly be more different.\n\nSo look at one muscle. The thing that reaches it is not the heart's output. **It is the heart's output times that muscle's share of it** -- and the share is not fixed.\n\nHere is a resting body, moving **5.0 L/min**:\n\n| | Flow | Share |\n| --- | --- | --- |\n| gut and liver | 1.40 L/min | 28% |\n| kidneys | 1.10 | 22% |\n| **muscle** | **1.00** | **20%** |\n| brain | 0.75 | 15% |\n| skin | 0.50 | 10% |\n| heart muscle | 0.25 | 5% |\n\nIn hard exercise the heart gets to about **20 L/min** -- four times as much, which is what L2P28 and L3P28 were about.\n\nYour dials are **Heart Output** and **The Muscle's Share**.\n\nSo: with four times the total, how much more blood can a working muscle have?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'more', label: "More than four times — if the other organs can be persuaded to give up some of their share, the muscle gains twice over.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'four', label: "Four times, the same as the total — everyone's share stays the same, so everyone's flow grows in step.", nextNodeId: 'misconception' }
            ]
        },

        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "That is what would happen if the shares were fixed, and it is worth seeing how far short it falls.\n\n**Four times the total, shares unchanged:** the muscle goes from 1.0 to **4.0 L/min**.\n\nNow L2B28's ceiling. Each litre gives up at most **200 mL** of oxygen, so 4.0 L/min delivers at most **800 mL of oxygen a minute**.\n\nA fit adult sprinting uses more than **3,000**.\n\n| | Flow to muscle | Oxygen at the 200 mL ceiling |\n| --- | --- | --- |\n| shares unchanged | 4.0 L/min | 800 mL/min |\n| **actually needed** | -- | **3,000+ mL/min** |\n\n**Four times the total is not nearly enough**, and nothing done to the heart closes that gap: L3P28 showed the output has a top of its own, near 19 L/min, and beating harder past it makes things worse.\n\nSo the extra has to come from somewhere else, and there is only one place left. **The other organs' shares.**\n\nAt rest, 80% of the circulation is going to things that are not working muscle -- digesting a meal, filtering blood, warming skin. **None of those is urgent during a sprint**, and the body knows it.",
            options: [
                { id: 'cont', label: "So how much can be taken?", nextNodeId: 'defining' }
            ]
        },

        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "**Almost all of it, and the numbers are startling.**\n\nHere is the same body at **20 L/min**, working hard:\n\n| | At rest | Hard exercise | |\n| --- | --- | --- | --- |\n| **muscle** | 1.00 L/min (20%) | **16.6 L/min (83%)** | **x16.6** |\n| gut and liver | 1.40 (28%) | 0.77 (4%) | x0.6 |\n| kidneys | 1.10 (22%) | 0.61 (3%) | x0.6 |\n| **brain** | **0.75 (15%)** | **0.75 (4%)** | **x1.0** |\n| skin | 0.50 (10%) | 0.28 (1%) | x0.6 |\n| heart muscle | 0.25 (5%) | 1.00 (5%) | x4.0 |\n| **total** | **5.0** | **20.0** | **x4.0** |\n\nRead the muscle's row against the total's row. **The total went up four times. The muscle's supply went up sixteen.**\n\nWhere did the other four come from? **Its share**, which went from 20% to 83% -- a factor of **4.2**. And the two multiply:\n\n**flow to a muscle = heart output x that muscle's share**\n\nand four times the total multiplied by 4.2 times the share gives **16.6**\n\nThe condition: this is one body at steady effort, and the split among the other organs is simplified -- a real one also depends on how hot you are and how recently you ate.\n\n**So L2P28's headline turns out to be the smaller half of the story.** It found that a heart's two factors multiply to 4.0. **There is a second pair of factors outside the heart entirely**, and they multiply to the same 4.2 again.\n\nAnd one row did not move at all. **Look at the brain.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'network' } },
            options: [
                { id: 'work', label: "How is the blood actually steered?", nextNodeId: 'worked' }
            ]
        },

        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**By a ring of muscle around a very small vessel, and by the fourth power.**\n\nBetween an artery and a capillary bed sits the **arteriole**: a vessel perhaps a tenth of a millimetre across, wrapped in a ring of **smooth muscle** that can tighten or relax. Relaxing it widens the vessel -- **vasodilation**; tightening narrows it.\n\nThat sounds like a feeble lever until you put it next to L3P11, which found that flow through a tube goes as the **fourth power of the radius**. So:\n\n| Widen the radius by | Flow multiplies by |\n| --- | --- |\n| 19% | **2** |\n| 41% | 4 |\n| 68% | 8 |\n| **100%, a doubling** | **16** |\n\n**A muscle's arterioles roughly double in radius, and that is the entire sixteen-fold rise.** The ring of smooth muscle does not have to do anything dramatic -- a vessel a tenth of a millimetre wide becoming two tenths redirects a fifth of your whole circulation.\n\nAnd behind each arteriole is a **capillary bed**, most of whose vessels are shut at rest. Opening them gives the blood somewhere to go and, just as importantly, far more **surface** to unload oxygen across -- which is what lets the extraction in L2B28's formula rise at the same time as the flow.\n\n**The gut's arterioles do the opposite**, tightening to a fraction of their resting width. Nothing is pushed anywhere: **widen one path and narrow another, and the blood redistributes itself.**\n\nWhich is why hard exercise straight after a large meal feels so bad. **The gut and the legs are asking for the same litres**, the legs win, and a digestive system that Big Idea 27 showed needs hours of steady contraction is left with a third of its usual supply.",
            options: [
                { id: 'check', label: "And the brain?", nextNodeId: 'math_check' }
            ]
        },

        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "The brain's flow is **0.75 L/min** at rest, and **0.75 L/min** at maximum effort. Its *share* collapses from 15% to under 4%, and the litres reaching it do not move at all.\n\nWhat does that tell you?",
            options: [
                { id: 'fixed', label: "Its flow is held fixed — it is the one bed that is never squeezed, whatever else is happening", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'coincidence', label: "It is a coincidence of these particular numbers; at a different effort the brain's flow would rise and fall like everything else", nextNodeId: 'math_wrong' },
                { id: 'low', label: "The brain needs very little blood, so there is never any pressure on its supply", nextNodeId: 'math_wrong' }
            ]
        },

        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**The brain is not a small customer.** It is about 2% of your mass and takes **15%** of a resting circulation -- seven times its share by weight, and it is the most expensive tissue you own per gram.\n\nWhat is unusual is not how little it takes but **how little its demand varies**. Thinking hard, sleeping, sprinting: about 0.75 L/min throughout. And its arterioles are regulated to **hold that flow steady** against whatever the rest of the body is doing.\n\n| | can its share be taken? | why |\n| --- | --- | --- |\n| gut and liver | **yes, most of it** | digestion can wait an hour |\n| kidneys | **yes, most of it** | filtering can wait an hour |\n| skin | yes, unless you are overheating | -- |\n| **brain** | **no** | a few seconds without it and you are unconscious |\n\nSo the brain is not a bed that happens to stay level. **It is a floor**, and every other bed is competing for what is left above it.\n\nAnd that is exactly why **fainting** is the symptom when a circulation fails. L3P28 found a heart at 300 beats a minute moving no blood at all. The muscles can wait, the gut can wait, the kidneys can wait -- **the brain cannot**, so the first visible sign that the total has collapsed is somebody falling over.\n\nFalling over is also, usefully, **the treatment**: lying flat removes the height the blood had to be pushed up, and the brain's 0.75 L/min can be met again at a lower output. **Which is why you lie a fainting person down rather than sitting them up.**",
            options: [
                { id: 'retry', label: "The brain is a floor, not a share.", nextNodeId: 'explore' }
            ]
        },

        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "The bar is the whole circulation. **Its length is the heart's output** and its segments are the organs' shares, so the muscle's own segment is the litres actually reaching it. A tick marks where the muscle would end **if its share had not changed.**\n\nThings worth doing:\n\n- Start at **5.0 L/min** with the muscle on **20%**. This is the resting body in the table: gut biggest, brain a solid slice, muscle modest\n- Raise **Heart Output** to 20 and leave the share alone. The bar grows four times, everything grows with it, and the muscle reaches **4.0** -- the tick and the segment end together. **This is what four times the total buys on its own**\n- Now raise **The Muscle's Share** towards 83%. The bar does not grow at all; the muscle's segment runs away from the tick while the gut and the kidneys are squeezed down to slivers. **Nothing was created. It was taken**\n- Watch the **brain** through all of that. Its slice stays exactly the same width while everything around it changes\n- Now the corner worth finding. Put the share up to **90%** and bring the output back **down** towards 5. The brain's slice goes red: there is no longer enough left over to meet its floor. **The brain is starved**, and a body asking its muscles for more than its heart can supply ends on the ground",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Checkpoint", nextNodeId: 'checkpoint' }
            ]
        },

        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "All three Level 3 lessons in this Big Idea have now found the same shape, in three different materials.\n\n- **L3P28**: one second, divided between squeezing and filling. Take more for one and the other has less\n- **L3C28**: the water inside a cell. Store more sugar and more water follows it in\n- **L3B28**: the litres a heart can move. Give more to a muscle and something else gets less\n\nWhat is the honest answer to *how do body systems work together*?",
            options: [
                { id: 'trade', label: "By trading. Every one of these is a shared thing with no spare, so cooperation means something named gives up its share — and each lesson says what pays.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'harmony', label: "By each organ doing its own job independently, so that the whole works without any one part having to give anything up.", nextNodeId: 'checkpoint_wrong' },
                { id: 'more', label: "By the body making more of whatever is short — more beats, more blood, more storage — whenever a system needs it.", nextNodeId: 'checkpoint_wrong' }
            ]
        },

        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "**Every lesson in this Big Idea has been about something that cannot be made more of.**\n\n| | the shared thing | what wants more of it | what pays |\n| --- | --- | --- | --- |\n| **P28** | one second, split between squeezing and filling | beats per minute | **the filling**: each beat leaves emptier |\n| **C28** | the water inside a cell | grams of sugar stored | **the cell**, unless the count is changed |\n| **B28** | the litres the heart can move | a working muscle | **the gut and the kidneys** |\n\nAnd *making more* is exactly what each lesson showed to be unavailable:\n\n- the heart cannot make more seconds, which is why the output has a **top** near 19 L/min and falls past it\n- the cell cannot make more room for water, which is why the sugar had to be **joined up** instead\n- the body cannot make more litres than the heart moves, which is why the muscle's gain had to be **taken**\n\n**Independently** is the other half of the mistake, and L3P28 settled it first: the heart's two factors were not independent, because the rate set the filling time. Nothing here is independent of anything.\n\nSo the honest answer is not harmony and not abundance. **Systems work together by trading, and the measure of how well they are designed is what each trade costs.** C28 is the one designed best precisely because it found a move that costs nothing: **change the count, and the mass never notices.**",
            options: [
                { id: 'retry', label: "By trading, and something named pays.", nextNodeId: 'checkpoint_correct' }
            ]
        },

        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "**And that closes Big Idea 28.**\n\n| | the shared thing | what wants more of it | what pays |\n| --- | --- | --- | --- |\n| **P28** | one second, split between squeezing and filling | beats per minute | **the filling**: each beat leaves emptier |\n| **C28** | the water inside a cell | grams of sugar stored | **the cell**, unless the count is changed |\n| **B28** | the litres the heart can move | a working muscle | **the gut and the kidneys** |\n\nNotice how Level 2 and Level 3 divide. **L2 asked which factor has room. L3 asks what using that room costs the other factor** -- and in two of the three cases the answer is that the factors were never independent to begin with.\n\n**C28 is the exception, and it is worth sitting with.** It found a move that costs nothing at all: joining glucose into a chain changes the **count** of particles without touching the **mass**, so the store grows and the water never notices. **That is what a good design looks like** -- not a better trade, but a way of not having to trade.\n\nAnd then there is the row that never pays. **The brain takes 0.75 L/min at rest and 0.75 L/min at full effort**, because a few seconds without it ends everything else. So the real architecture is not a committee of equals: **it is one floor that cannot be touched, and everything else negotiating over what is left above it.**\n\nWhich is why the three lessons meet at a single point. L3P28's heart at 300 beats a minute moves no blood; L3B28 says the first thing that fails is the brain's floor; and the person falls over -- **and falling over is the treatment, because lying flat is how a smaller output can still reach a brain.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "One floor, and everything else negotiating!", nextNodeId: 'discovery' }
            ]
        },

        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found where L2B28's litres actually come from.**\n\n- **The flow reaching one muscle is not the heart's output.** It is **heart output x that muscle's share**, and the share is not fixed -- which is the averaging L2B28 admitted to, since a sprinting leg and a resting arm share one number there\n- **At rest, 5.0 L/min**: gut and liver 1.40, kidneys 1.10, muscle 1.00, brain 0.75, skin 0.50, heart 0.25. **80% of it is going to things that are not working muscle**\n- **In hard exercise the heart reaches about 20 L/min**, four times as much -- and the muscle gets **16.6**, sixteen times as much\n- **Because the two factors multiply.** The total went **x4.0** and the muscle's share went 20% to 83%, **x4.2** -- and those two multiplied give the **16.6**. With the shares left alone it would have been **4.0 L/min**, which at L2B28's 200 mL ceiling is 800 mL of oxygen against the 3,000+ a sprint needs\n- **The steering is an arteriole**: a vessel a tenth of a millimetre across wrapped in a ring of **smooth muscle**, relaxing to widen it -- **vasodilation** -- or tightening to narrow it\n- **And L3P11's fourth power does the rest.** Flow goes as radius⁴, so **doubling an arteriole's radius multiplies its flow by exactly 16**. A vessel going from a tenth of a millimetre to two tenths redirects a fifth of the circulation\n- **Behind it, a capillary bed** whose vessels are mostly shut at rest. Opening them gives the blood somewhere to go **and far more surface to unload across**, which is how extraction rises at the same time as flow\n- **Nothing is pushed anywhere.** Widen one path, narrow another, and the blood redistributes itself -- which is why hard exercise after a large meal feels so bad: **the gut and the legs want the same litres**, and the legs win\n- **One row never moves.** The brain takes **0.75 L/min at rest and 0.75 at maximum**. It is about 2% of your mass and 15% of a resting circulation, seven times its share by weight, and what is unusual is **how little its demand varies**\n- **So the brain is a floor, not a share**, and everything else competes for what is left above it. Which is why **fainting** is the sign that a total has collapsed, and why **lying flat is the treatment**: it removes the height the blood had to be pushed up, so a smaller output can still meet the floor\n- **And all three lessons are the same shape.** A second split between squeezing and filling; the water in a cell; the litres a heart can move. **Systems work together by trading, and each lesson names what pays** -- except C28, which found the rare move that costs nothing, because changing a count leaves the mass alone\n- **Still standing:** the split among the other organs is simplified, a trained athlete's figures are larger throughout, and skin flow answers to temperature as much as to effort, which is not modelled here.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Complete Big Idea 28, Level 3", nextNodeId: 'complete' }
            ]
        },

        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- How Do Body Systems Work Together?**\n\nBy trading, and every lesson here names what pays.\n\n**Summary Table:**\n| | L2B28 said | L3B28 says |\n| --- | --- | --- |\n| Oxygen used | flow, times what each litre gives up | **the same rule** |\n| The flow to a muscle | the heart's output | output **x that muscle's share** |\n| At rest | -- | 1.0 of 5.0 L/min, **20%** |\n| In hard exercise | -- | **16.6 of 20.0, 83%** |\n| Why sixteen and not four | -- | **4.0 x 4.2**: the total and the share both rise |\n| If the shares held | -- | 4.0 L/min, only **800 mL** of oxygen |\n| How it is steered | -- | the **arteriole**, a ring of **smooth muscle** |\n| Why so little movement works | -- | flow goes as **radius⁴**: double it, x16 |\n| What pays | -- | the **gut** and the **kidneys** |\n| What never pays | -- | the **brain**: 0.75 L/min, always |\n\n**What ties all three together:** P28's second is divided between squeezing and filling, C28's cell has no room for the water a store drags in, and B28's litres have to be taken from somewhere. Each is a shared thing with no spare, so **cooperation is a trade** -- and C28 is the best designed of the three because joining the sugar changes the particle **count** while leaving the **mass** alone, which is a way of not having to trade at all.\n\n**The one line to remember:** a working muscle gets sixteen times its resting blood from a heart that only quadrupled its output, because the other four came out of the gut and the kidneys -- and the whole negotiation happens above one floor that is never touched, the brain's three-quarters of a litre a minute, which is why the first sign a circulation has failed is somebody falling over.\n\n**Big Idea 28 is complete at Level 3.**"
        }
    };
}

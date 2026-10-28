import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 28, physics.
 *
 * L2P28 multiplied heart rate by volume per beat and watched the gains multiply --
 * 2.6 x 1.6 = 4.0 -- and then said plainly what it could not do: past about 180 beats a
 * minute the filling time runs so short that the volume per beat falls, so the product
 * stops rising, which it states but does not model. This models it.
 *
 * One cycle is 60 / rate seconds and has two parts. The SQUEEZE is a muscular event of
 * roughly fixed length, about 0.20 s, so every second lost to a faster rate comes out of
 * the FILLING. A full 110 mL needs about 0.15 s of filling; less time gives
 * proportionally less blood. So
 *
 *   filling time = 60 / rate - squeeze
 *   volume per beat = 110 x min(1, filling time / 0.15)
 *   output = rate x volume per beat
 *
 * which peaks where the filling time is exactly 0.15 s, at 60 / 0.35 = 171 beats a
 * minute and 18.9 L/min, and reaches ZERO at 60 / 0.20 = 300, where the whole cycle is
 * the squeeze. L2P28's sprint at 180 gives 17.6 rather than its 19.8, because 180 leaves
 * 0.133 s against the 0.15 s a full beat needs -- an 11% correction, and the first time
 * the two factors are shown not to be independent.
 *
 * Condition stated, and it matters: this is HARD EXERCISE, when there is always blood
 * waiting to come in. At rest the binding limit is a different one -- how much returns
 * from the veins -- which is why a resting heart moves 70 mL and not 110 even though it
 * has 0.66 s to fill.
 *
 * Still standing: the squeeze does shorten a little at high rates, which would push the
 * peak slightly higher; filling is treated as a steady rate when it is fast at first and
 * slow later; and nothing here says what sets the 110 mL.
 */
export function getL3P28Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2P28 found a clean rule: **blood per minute = heart rate x volume per beat**, so 70 x 70 gives 4.9 L/min at rest and 180 x 110 gives 19.8 when sprinting. The gains multiply: 2.6 times the rate and 1.6 times the volume make 4.0 times the flow.\n\nAnd it ended by admitting something it could not do. **Past about 180 beats a minute the heart has less time to refill between beats, so the volume per beat falls and the product stops rising.** It stated that. It did not work it out.\n\nSo work it out, because the answer turns out to be sharper than *stops rising*.\n\nStart with what one beat actually is. A cycle has **two parts**, and they are completely different kinds of thing:\n\n- the **squeeze**, where the muscle contracts and drives blood out\n- the **filling**, where the muscle relaxes and blood runs back in\n\nYour dials are **Heart Rate** and **Squeeze Time**.\n\nThe condition, and it matters more than usual here: **everything below is hard exercise**, when blood is always waiting at the door. At rest something else binds -- how much comes back from the veins -- which is why a resting heart moves 70 mL a beat and not 110 although it has two-thirds of a second to fill.\n\nSo: if you could drive a heart to **300** beats a minute, would it pump more than one at 180?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'no', label: "No — each beat has to fill before it can empty, and beating faster takes time away from exactly that.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'yes', label: "Yes — 300 beats is more beats, and each one still sends blood out, so more must leave the heart.", nextNodeId: 'misconception' }
            ]
        },

        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "More beats is more **openings of the valve**, which is not the same as more blood.\n\nHere is the step that makes it clear. **A cycle lasts 60 / rate seconds**, and the squeeze takes a roughly fixed slice out of it.\n\n| Rate | One cycle | The squeeze | Left for filling |\n| --- | --- | --- | --- |\n| 60 | 1.000 s | 0.20 s | **0.800 s** |\n| 120 | 0.500 s | 0.20 s | **0.300 s** |\n| 180 | 0.333 s | 0.20 s | **0.133 s** |\n| 240 | 0.250 s | 0.20 s | **0.050 s** |\n| 300 | 0.200 s | 0.20 s | **nothing at all** |\n\nRead the last column downwards. **Doubling the rate from 60 to 120 did not halve the filling time -- it cut it to under half**, because the squeeze took its 0.20 s first and the filling got whatever was left.\n\nThat is the whole lesson in one table. **The squeeze is a contraction of muscle with its own fixed length**: the muscle has to be set off, shorten, build up pressure, open a valve and push. It cannot be hurried much. So **every second you take off the cycle comes out of the filling**, and the filling is where the next beat's blood comes from.\n\nAt 300 the cycle *is* the squeeze. There is no filling at all, so there is nothing to eject, and a heart beating 300 times a minute moves **nothing**.",
            options: [
                { id: 'cont', label: "Then how much does each beat actually get?", nextNodeId: 'defining' }
            ]
        },

        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Two steps, and then the output falls out.\n\n**Step one: how long is there to fill?**\n\n**filling time = 60 / rate − squeeze**\n\nThe condition: the squeeze is treated as a fixed **0.20 s**. It does shorten a little at high rates, which this lesson ignores and names at the end.\n\n**Step two: how much gets in?**\n\nA ventricle filling from a full vein takes about **0.15 s** to reach its full **110 mL**. Give it less and it gets proportionally less:\n\n**volume per beat = 110 mL x (filling time / 0.15), up to a maximum of 110**\n\nThe condition: this is the exercising heart, with blood always waiting. It also treats filling as a steady trickle when in truth it is quick at first and slow after.\n\nNow L2P28's own rule finishes the job:\n\n**output = rate x volume per beat**\n\nAnd the three columns together do something neither factor does alone:\n\n| Rate | Filling time | Share of a full beat | Volume | Output |\n| --- | --- | --- | --- | --- |\n| 100 | 0.400 s | 100% | 110 mL | 11.0 L/min |\n| 150 | 0.200 s | 100% | 110 mL | 16.5 L/min |\n| **171** | **0.150 s** | **100%** | **110 mL** | **18.9 L/min** |\n| 180 | 0.133 s | 89% | 98 mL | 17.6 L/min |\n| 220 | 0.073 s | 48% | 53 mL | 11.7 L/min |\n| 300 | 0.000 s | 0% | 0 mL | **0 L/min** |\n\n**The output has a top, and it is not at the top of the rate.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'network' } },
            options: [
                { id: 'work', label: "Why exactly 171?", nextNodeId: 'worked' }
            ]
        },

        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**Because that is the last rate at which a beat is still a full beat.**\n\nBelow it, the filling time is longer than the 0.15 s a full 110 mL needs, so **the volume per beat does not change at all** and the output rises in simple proportion to the rate. Beating faster is pure gain.\n\nAbove it, the volume starts falling. And it falls **faster than the rate rises**, which is the part worth seeing:\n\n**output = rate x 110 x (60 / rate − 0.20) / 0.15**\n\nMultiply the rate into the bracket and something remarkable happens -- **the rate cancels out of the first term**:\n\n**output = (110 / 0.15) x (60 − 0.20 x rate)**\n\nSo above the peak the output falls **in a straight line** with the rate, and you can read both ends off it without any more arithmetic:\n\n- put rate = 171 and the bracket gives 25.8, so **18.9 L/min**\n- put rate = 300 and the bracket gives **exactly zero**\n\n| Rate | Output |\n| --- | --- |\n| 171 | **18.9 L/min** |\n| 200 | 14.7 |\n| 250 | 7.3 |\n| 300 | **0** |\n\n**Going from 171 to 250 beats a minute cuts the output by more than half.** Not *stops helping* -- actively reverses, and steeply.\n\nAnd the two boundaries are each a single division:\n\n**best rate = 60 / (squeeze + fill time) = 60 / 0.35 = 171**\n\n**useless rate = 60 / squeeze = 60 / 0.20 = 300**\n\nWhich corrects L2P28's own example, gently. It put the sprint at **180 x 110 = 19.8 L/min**. At 180 the filling time is 0.133 s against the 0.15 s a full beat needs, so the volume is 98 mL and the output is **17.6**. Level 2 was 11% high -- and, more interestingly, **it had already placed its sprint past the best rate without knowing.**",
            options: [
                { id: 'check', label: "Let me test the zero.", nextNodeId: 'math_check' }
            ]
        },

        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "A heart in an abnormal rhythm is beating at **300 a minute**. The squeeze still takes its 0.20 s.\n\nHow much blood is it moving, and why?",
            options: [
                { id: 'zero', label: "Essentially none — one cycle is 60/300 = 0.20 s, which is exactly the squeeze, so there is no filling time left at all", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'lots', label: "A great deal — 300 beats is nearly twice 171, so even at a reduced volume per beat the total should be high", nextNodeId: 'math_wrong' },
                { id: 'half', label: "About half the maximum, since the rate is high but each beat is only partly filled", nextNodeId: 'math_wrong' }
            ]
        },

        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Do the first division before anything else. **60 / 300 = 0.20 s**, and the squeeze is 0.20 s.\n\n**The entire cycle is the squeeze.** The muscle contracts, ejects whatever is in it, and the next contraction begins the instant it finishes. There is **no relaxed interval**, so nothing flows in, so there is nothing to eject.\n\n| | |\n| --- | --- |\n| one cycle at 300 | 0.200 s |\n| the squeeze | 0.200 s |\n| **left for filling** | **0.000 s** |\n| volume per beat | **0 mL** |\n| output | **0 L/min** |\n\n*Half the maximum* is the answer you get by treating the two factors as independent -- a high rate times a middling volume. **They are not independent**, and that is the single most important thing in this lesson. The rate **sets** the volume, through the filling time, so you cannot raise one without lowering the other once you are past the peak.\n\nAnd this is not a thought experiment. A heart racing at 250 or more, which happens in some abnormal rhythms, really does pump very little, and the person really does collapse -- **not because the heart has stopped, but because it is beating too fast to fill.** Treating it means slowing it down, which is a deeply counter-intuitive thing to do to a failing circulation until you have seen this graph.",
            options: [
                { id: 'retry', label: "At 300 the cycle is the squeeze.", nextNodeId: 'explore' }
            ]
        },

        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "The picture is one cardiac cycle drawn to scale: the solid part is the **squeeze**, the pale part is the **filling**, and below it the ventricle shows how full it managed to get.\n\nThings worth doing:\n\n- Start at **100** beats with a **0.20 s** squeeze. The pale part is long, the ventricle fills completely, and the output rises with every beat you add. **This is the region L2P28 described**\n- Now creep up through **160, 171, 180**. Watch the pale part shrink to nothing in particular -- and watch the ventricle stop filling completely at **171**. The best output is exactly there\n- Keep going to **220**, then **250**. The rate is still climbing and the output is **falling**, steeply. Note how much of the ventricle is left unfilled\n- Take it to **300**. The pale part vanishes. **Output zero**, with a heart beating five times a second\n- Now go back to 180 and change the other dial instead. **Shorten the squeeze** to 0.15 s and the filling time grows by the same 0.05 s, for free. The best rate moves up to **200**\n- Lengthen it to **0.30 s** and the best rate drops to **133**. **A slower squeeze is a lower ceiling**, which is what a weakened heart muscle amounts to",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Checkpoint", nextNodeId: 'checkpoint' }
            ]
        },

        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "L2P28's headline was that the two factors **multiply**, so improving either one improves the result.\n\nYou have just watched the output fall from 18.9 to 7.3 L/min while one of those factors went **up**.\n\nWhat has Level 3 actually changed about L2P28's rule?",
            options: [
                { id: 'coupled', label: "The two factors are not independent. The rate sets the filling time, which sets the volume — so past the peak, raising one factor lowers the other by more.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong_rule', label: "The rule itself is wrong — output is not rate times volume per beat after all.", nextNodeId: 'checkpoint_wrong' },
                { id: 'small', label: "Nothing important — the fall only happens at rates a real heart never reaches.", nextNodeId: 'checkpoint_wrong' }
            ]
        },

        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "**The rule is exactly right.** Output really is rate times volume per beat, at every rate in the table, including the one where the answer is zero. Nothing in L2P28's arithmetic needs correcting.\n\nWhat changed is that **one of its factors turned out to be a function of the other**:\n\n| | L2P28 | L3P28 |\n| --- | --- | --- |\n| the rule | output = rate x volume | **the same rule** |\n| the factors | two independent dials | **one dial and its consequence** |\n| raising the rate | always raises the output | raises it to **171**, then lowers it |\n\nThat is a different kind of correction from *the formula was wrong*, and a more common one. **A product of two factors only behaves like a product while the factors are free to move separately.**\n\nAnd *rates a real heart never reaches* is the opposite of true. The peak sits at **171** -- inside the range of ordinary hard exercise, and below the rate a young person can easily reach on a bicycle. A heart in an abnormal rhythm at 250 is a medical emergency precisely because of the fall you have just watched.\n\nWhich is the shape of this whole Big Idea. L2P28 asked **which factor has room**. Level 3 asks the harder question: **what does using that room cost the other factor?**",
            options: [
                { id: 'retry', label: "The factors are coupled.", nextNodeId: 'checkpoint_correct' }
            ]
        },

        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "**And that reframes what L2P28 was measuring.**\n\nIts rule stands, every figure in it stands, and the thing that changes is the relationship between its two factors. **The rate does not merely sit beside the volume per beat in a product. It sets it**, through a quantity L2P28 never named: the time left over after the squeeze.\n\nSo the honest version of *the gains multiply* is:\n\n- **below 171** the gains really do multiply, because the volume is pinned at its maximum and the rate is free\n- **above 171** they fight, and the rate wins the wrong way: the output falls in a straight line to zero at **300**\n\n| | | |\n| --- | --- | --- |\n| **best rate** | 60 / (squeeze + fill) | **60 / 0.35 = 171** |\n| **useless rate** | 60 / squeeze | **60 / 0.20 = 300** |\n\nAnd notice what the second dial did. **Shortening the squeeze raised the peak** -- 0.15 s moves it to 200 -- because the squeeze and the filling are drawing on the same 60 seconds. There is no third place for the time to come from.\n\n**Which is the Big Idea's question, in physics.** Two body systems work together by sharing something that has no spare: here it is a second, divided between contracting and refilling. C28 and B28 will each find the same shape in something else that has run out of spare.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "The rate sets the volume!", nextNodeId: 'discovery' }
            ]
        },

        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You modelled the thing L2P28 could only point at.**\n\n- **A cycle lasts 60 / rate seconds and has two parts**: the **squeeze**, where the muscle contracts and ejects, and the **filling**, where it relaxes and blood runs in\n- **The squeeze is a contraction of muscle with its own fixed length** -- set off, shorten, build pressure, open a valve, push -- about **0.20 s**, and it cannot be hurried much. So **every second taken off the cycle comes out of the filling**\n- **filling time = 60 / rate − squeeze.** Doubling the rate from 60 to 120 cuts the filling from 0.800 s to 0.300 s, far worse than half, because the squeeze takes its share first\n- **A full 110 mL needs about 0.15 s.** Less time gives proportionally less blood: **volume per beat = 110 x (filling time / 0.15)**, capped at 110\n- **Condition:** this is **hard exercise**, with blood always waiting. At rest a different limit binds -- how much returns from the veins -- which is why a resting heart moves 70 mL with 0.66 s available\n- **So the output has a top, and it is not at the top of the rate.** Below the peak the volume is pinned at maximum and beating faster is pure gain; above it the volume falls faster than the rate rises\n- **Above the peak the rate cancels**: output = (110 / 0.15) x (60 − 0.20 x rate), a **straight line down**. 171 gives 18.9 L/min, 250 gives 7.3, and 300 gives **exactly zero**\n- **best rate = 60 / (squeeze + fill) = 60 / 0.35 = 171 beats a minute**\n- **useless rate = 60 / squeeze = 60 / 0.20 = 300**, where the whole cycle is the squeeze, nothing flows in, and nothing comes out\n- **It corrects L2P28 gently and usefully.** Its sprint of 180 x 110 = 19.8 becomes **17.6**, because 180 leaves 0.133 s against the 0.15 s a full beat needs -- and Level 2 had unknowingly put its sprint **past the best rate**\n- **The real change is that the two factors are not independent.** L2P28's rule is right at every rate including zero output; what is new is that **the rate sets the volume** through the filling time, so a product of two factors only behaves like a product while they are free to move separately\n- **And it is not a thought experiment.** A heart racing at 250 pumps very little and the person collapses -- not because it has stopped but because **it is beating too fast to fill**, which is why the treatment is to slow it down\n- **Still standing:** the squeeze does shorten a little at high rates, which would push the peak somewhat higher. Filling is treated as a steady trickle when it is quick at first and slow after. And nothing here says what sets the 110 mL.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "On to the chemistry", nextNodeId: 'complete' }
            ]
        },

        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Physics Complete -- How Do Body Systems Work Together?**\n\nA product of two factors only behaves like a product while the factors are free to move separately.\n\n**Summary Table:**\n| | L2P28 said | L3P28 says |\n| --- | --- | --- |\n| The rule | output = rate x volume per beat | **the same rule, unchanged** |\n| One cycle | -- | **60 / rate** seconds, in two parts |\n| The squeeze | -- | a contraction of muscle, about **0.20 s** long |\n| What shortening costs | -- | **all of it comes out of the filling** |\n| A full beat | 110 mL, fixed | 110 mL **if given 0.15 s** |\n| Sprinting at 180 | 19.8 L/min | **17.6**, and already past the best |\n| The best rate | the highest you can reach | **60 / 0.35 = 171** |\n| Output at 250 | -- | **7.3 L/min**, falling in a straight line |\n| Output at 300 | -- | **zero**: the cycle is the squeeze |\n| The two factors | independent | **the rate sets the volume** |\n\n**The one line to remember:** a heart fills in the time left over after it squeezes, so beating faster buys more beats by making each one emptier -- and past 171 a minute the second effect wins, until at 300 a heart beating five times a second moves no blood at all.\n\n**Up next:** C28 -- where the sugar goes, and why it cannot stay as sugar."
        }
    };
}

import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 26, biology. The synthesis lesson. Mechanism + Limit.
 *
 * Rewritten to be lighter. The first version carried Q10 as an abstract dial, a
 * reference temperature, an exponent, and a line drawn TANGENT at 20 C -- a derivative
 * concept -- which is four pieces of machinery for one idea.
 *
 * The idea survives with almost none of it. One stated fact: a chemical rate roughly
 * doubles for every 10 C, which is empirical and the lesson says so. Anchor the curve
 * to the real cricket at 20 C -- 48 chirps in 25 s, near Dolbear's own 47 -- and the
 * whole curve is whole numbers reached by doubling:
 *
 *   0 C: 12    10 C: 24    20 C: 48    30 C: 96    40 C: 192
 *
 * Dolbear joined MEASUREMENTS with a ruler, so his line is a chord through two points
 * of that curve, not a tangent. And a chord's midpoint is just the AVERAGE of its two
 * ends, so the entire result is one average a learner can do in their head:
 *
 *   24 and 96 average to 60. The truth at 20 C is 48. The line reads 25% high.
 *
 * That is the convexity of an exponential, with no calculus and no exponent. The line
 * crosses the truth exactly at its two anchors, reads high between them and low
 * outside, and at 3.3 C it reaches zero chirps, which is visibly nonsense.
 *
 * The error depends ONLY on the span between the anchors, verified identical at every
 * centre -- which is what makes 'the window is N degrees wide' a well-defined idea.
 * Span 5 C: 1.5%. Span 10 C: 6.1%. Span 20 C: 25%. Within 5% needs a span under about
 * 9 C, so a straight line is worth roughly ten degrees.
 *
 * A result the Q10 version never reached: the chord's slope over a 10 C span is 3.39
 * chirps per C against Dolbear's measured 3, so the doubling rule roughly EXPLAINS the
 * constant Level 2 was handed rather than merely bounding it.
 *
 * The cold limit is a different kind of thing and the lesson says so: below about 13 C
 * the cricket does not get inaccurate, it stops. A mechanism threshold, not curvature.
 *
 * Frames stated: every count is chirps in 25 s for one cricket, as L2B26 counted them,
 * and every error is the line measured against the doubling curve.
 *
 * Still standing: the doubling factor is itself only roughly 2 and varies with species
 * and temperature; above about 35 C the rate reverses as the enzymes come apart, so the
 * real curve has a peak this one does not model; and Dolbear fitted over his whole range
 * rather than through two points, which shifts the window a little.
 */
export function getL3B26Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2B26 was honest about Dolbear's rule. **Count the chirps in 25 seconds, divide by 3, add 4.4** -- and it said plainly that the 3 and the 4.4 were *fitted*, not derived. Somebody sat with a thermometer and drew the line that best matched.\n\nIt left one question open, and it is the sharpest one in the Big Idea. **Why should a straight line fit at all?**\n\nBecause it has no business fitting. A chirp is a muscle contracting, a muscle runs on chemical reactions, and chemical reactions do not speed up in straight lines. They speed up by **multiplying**:\n\n**a chemical rate roughly doubles for every 10 °C**\n\nThat is a measured rule of thumb rather than a law -- it is near enough to 2 for a great many reactions and it varies -- but it is the right shape, and the shape is what matters here.\n\nSo take one real cricket. At **20 °C** it gives about **48 chirps in 25 seconds**, which is what Dolbear's rule says too. Now get the rest of the curve by doubling and halving -- no formula needed:\n\n| Temperature | Chirps in 25 s |\n| --- | --- |\n| 0 °C | **12** |\n| 10 °C | **24** |\n| 20 °C | **48** |\n| 30 °C | **96** |\n| 40 °C | **192** |\n\nEvery number there came from the one beside it. **That is the truth about the cricket, and it is plainly not a straight line** -- the steps are 12, 24, 48, getting bigger each time, where a straight line would add the same amount every ten degrees.\n\nYour dials are **Temperature** in °C, and **Span** in °C -- how far apart the two temperatures were that Dolbear drew his line through.\n\nBefore any arithmetic. He measured at **10 °C** and at **30 °C** and joined the two with a ruler. What does his line say at 20 °C, halfway between?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'average', label: "The average of 24 and 96 — so 60, which is too high.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'right', label: "48 — the line is fitted to the cricket, so it gets the middle right.", nextNodeId: 'misconception' }
            ]
        },

        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "The line is fitted to the cricket at **the two ends**, and that is all a ruler can promise.\n\nA straight line between two points goes through the **midpoint** of those two points. That is just what straight means -- half the distance across, half the distance up. So at 20 °C, halfway between 10 °C and 30 °C, the line must read the **average** of the two end counts:\n\n(24 + 96) / 2 = **60 chirps**\n\nAnd the cricket actually gives **48**.\n\n**60 against 48. The line is 25% high**, right in the middle of the range it was fitted to.\n\nStop and see why, because this is the whole lesson in one line. Going up from 20 °C to 30 °C, the cricket **adds 48** chirps. Coming down from 20 °C to 10 °C, it only **loses 24**. The two halves are not the same size, because each step doubles -- so their average sits **above** the middle value rather than on it.\n\n**A curve that bends upwards always lies below the straight line joining two of its points.** Nothing about crickets is needed for that; it follows from the bending alone.",
            options: [
                { id: 'cont', label: "So where is the line right?", nextNodeId: 'defining' }
            ]
        },

        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "In exactly two places: **the two temperatures it was fitted at.** There the line touches the truth because that is where it was pinned. Everywhere else it is wrong, and it is wrong in a pattern worth knowing:\n\n- **between** the two anchors, the line reads **high**, because the curve sags below the chord\n- **outside** them, the line reads **low**, because the curve climbs away faster than any straight line can\n\nSo the picture is a curve crossed twice by a line, bulging below it in the middle and escaping above it at both ends.\n\nAnd outside, it gets bad quickly. His line through 10 °C and 30 °C has a slope of (96 - 24)/20 = **3.6 chirps per °C**, so running it outwards:\n\n| | the line says | the cricket gives | |\n| --- | --- | --- | --- |\n| 40 °C | **132** | **192** | 31% low |\n| 30 °C | **96** | **96** | fitted here |\n| 20 °C | **60** | **48** | 25% high |\n| 10 °C | **24** | **24** | fitted here |\n| 5 °C | **6** | **17** | 65% low |\n\nRun it down a little further and the line reaches **zero chirps at 3.3 °C** -- it claims a cricket at 3 °C chirps a negative number of times. **A straight line through a doubling curve does not merely lose accuracy at the edges; it eventually says something impossible.**\n\nNone of which makes Dolbear wrong. It makes his rule **local**, and the obvious next question is how local.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'network' } },
            options: [
                { id: 'work', label: "How wide can the range be?", nextNodeId: 'worked' }
            ]
        },

        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "The thing that decides it is the **Span** -- how far apart the two fitting temperatures were. Narrow the span and the curve has less room to sag away from the line.\n\nWork the middle error for each span the same way every time: average the two ends, compare with the truth halfway between.\n\n| Span | Fitted at | Line says | Truth | Error |\n| --- | --- | --- | --- | --- |\n| **20 °C** | 10 and 30 | 60 | 48 | **25% high** |\n| **10 °C** | 15 and 25 | 50.9 | 48 | **6.0% high** |\n| **5 °C** | 17.5 and 22.5 | 48.8 | 48 | **1.7% high** |\n\n**Halving the span cuts the error by about four**, which is the signature of a bend: the gap grows with the square of how far you have gone.\n\nSo if you will accept **5%**, the span has to be under about **9 °C**. Dolbear's rule is worth roughly **ten degrees** of temperature, and outside that window you are reading a number the line never promised.\n\n**And now the part that pays the Big Idea back.** Take the slope of the chord over a sensible 10 °C span, from 15 °C to 25 °C:\n\n(67.9 - 33.9) / 10 = **3.4 chirps per °C**\n\nDolbear measured **3**. We did not fit anything -- we took *a chemical rate doubles every 10 °C*, anchored it to one cricket at one temperature, and out came very nearly his constant. **The 3 that L2B26 had to accept as a fitted number is mostly explained by the doubling**, and the leftover difference is exactly the sort of thing a real species and a real fitting range would account for.",
            options: [
                { id: 'check', label: "Let me try one.", nextNodeId: 'math_check' }
            ]
        },

        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "Your turn, and read the table in `root` rather than reaching for anything else.\n\nSuppose Dolbear had instead fitted his line through **0 °C** and **20 °C** -- still a 20-degree span, but a colder one.\n\nHow far out is his line at 10 °C, halfway between?",
            options: [
                { id: 'same', label: "25% high again — the same as before, because the span is the same", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'less', label: "Less than before, because the counts are smaller down there", nextNodeId: 'math_wrong' },
                { id: 'more', label: "More than before, because the cricket is near its silent point", nextNodeId: 'math_wrong' }
            ]
        },

        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Do it with the same two steps. The ends are **12** and **48**, so the line at 10 °C reads\n\n(12 + 48) / 2 = **30**\n\nand the truth at 10 °C is **24**. So 30 against 24, which is **25% high** -- the identical figure.\n\nThat is not a coincidence and it is the most useful thing in the lesson. **The error depends only on the span, not on where the span sits.** Both of these are 20-degree spans, so both are 25% out in the middle, even though one deals in dozens of chirps and the other in hundreds.\n\nThe reason is that doubling cares about **ratios**, not amounts. Across any 20-degree span the far end is 4 times the near end, whatever the two temperatures are -- 12 to 48, or 24 to 96, or 48 to 192. The shape of the problem is identical every time, so the percentage error has to be too.\n\n**Which is what lets you speak of a window at all.** If the error depended on where you were as well as how wide you had gone, *Dolbear's rule is good over ten degrees* would be a meaningless sentence. Instead it is a property of the rule.\n\n(And the cricket being near its silent point is a real worry, but a different one -- it has nothing to do with the line bending.)",
            options: [
                { id: 'retry', label: "Only the span matters.", nextNodeId: 'explore' }
            ]
        },

        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Both dials are live. The picture shows the cricket's real doubling curve and Dolbear's straight line on the same axes, with the two **anchor dots** where the line was pinned to the curve. At the temperature you dial, the gap between them is drawn and measured.\n\nThings worth doing:\n\n- Leave the span at **20 °C** and walk the **Temperature** across. The gap shuts to nothing at **10** and **30** -- the anchors -- bulges to **25% high** at 20 in between, and opens the other way outside, reaching **31% low** by 40 °C\n- Follow the line down past 5 °C and watch it **hit the floor**. It crosses zero at 3.3 °C, which is a cricket chirping a negative number of times\n- Now narrow the **Span** and watch the whole middle bulge collapse: 20 °C gives 25%, 10 °C gives 6.0%, 5 °C gives 1.7%. **Halving the span quarters the error**\n- Set the span to about **9 °C**, which is the widest that keeps the middle inside 5%. That is the honest width of Dolbear's rule\n- Then widen it to **30 °C** and look at what a greedy fit costs: **59% high** in the middle. A line asked to cover too much is worse everywhere than a line asked to cover a little\n- And take the temperature below **13 °C**. The picture stops reporting an error, because down there the cricket is **silent** -- which is not the line being inaccurate but the animal stopping, and those are different kinds of limit",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Checkpoint", nextNodeId: 'checkpoint' }
            ]
        },

        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "Two things in this lesson stop Dolbear's rule working, and they are not the same kind of thing.\n\nOne: at **35 °C** the rule reads about 28% low. Two: at **8 °C** the rule reads 4.4 °C and the cricket makes no sound at all.\n\nWhat is the difference between those two failures?",
            options: [
                { id: 'kinds', label: "The first is the straight line bending away from a curve — it gets gradually worse. The second is the cricket stopping, which is a threshold, and no better line would fix it.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'same', label: "No real difference — both are the rule being used outside the range it was fitted over.", nextNodeId: 'checkpoint_wrong' },
                { id: 'fit', label: "Both could be fixed by fitting the line over a wider range of temperatures.", nextNodeId: 'checkpoint_wrong' }
            ]
        },

        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Both are outside the range, so that much is true -- but ask what you would have to change to repair each one.\n\n**The 35 °C failure is about shape.** The truth curves and the line does not, so the two drift apart smoothly: 1.5% out, then 6%, then 25%, then 31%. There is no edge to it. You could shrink it as far as you liked by fitting a narrower span, or kill it altogether by using a curve instead of a line. **It is an approximation error, and it is under your control.**\n\n**The 8 °C failure is about the animal.** Below about **13 °C** the snowy tree cricket does not chirp slowly -- it stops. The curve does not gently approach zero there; the mechanism switches off. No line, no curve and no amount of careful fitting will extract a temperature from a silent cricket, because the information is not in the silence. **It is a mechanism threshold, and nothing in your gift will move it.**\n\nThat is why L2B26 was right to treat silence as its own case rather than as a reading of zero. **An approximation gets worse gradually and tells you so. A mechanism limit gives no warning and still hands you a number** -- 4.4 °C, confidently, on a night that might be twelve below.",
            options: [
                { id: 'retry', label: "One is the fit, the other is the cricket.", nextNodeId: 'checkpoint_correct' }
            ]
        },

        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "**And that closes the Big Idea, because all three Level 3 lessons did the same thing to Level 2's constants.**\n\nEach Level 2 lesson was handed a tidy number and used it well. Each Level 3 lesson went and asked what the number was made of, and found **a dependence hiding inside it**:\n\n| | The constant | What was hiding in it | So the rule ends where |\n| --- | --- | --- | --- |\n| **L3P26** | 26 km/h per hPa/100 km | **sin(latitude)** | you approach the equator |\n| **L3C26** | 10 °C per km | whether **condensation** has started | the bubble reaches its cloud base |\n| **L3B26** | 3 chirps per °C | a **doubling**, not an adding | about ten degrees from where it was fitted |\n\nSo the answer to *how do we predict weather* has a second half that Level 2 could not supply. Level 2's answer was **measure a proxy and apply a calibrated rule.** Level 3's is that **a calibration constant is a dependence you have not noticed yet**, and the rule's range is precisely where that dependence starts to bite.\n\nWhich is why a **derivation** is worth more than a better measurement. Measuring harder gives you a more precise 3, and a more precise 3 is still a straight line through a curve. Deriving it gives you the 3 **and the ten degrees** out of the same piece of work -- the rule and its limits together.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "The constant was hiding the range!", nextNodeId: 'discovery' }
            ]
        },

        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You explained a fitted constant without fitting anything.**\n\n- A chirp is a muscle contracting and a muscle runs on chemistry, and **a chemical rate roughly doubles for every 10 °C** -- a measured rule of thumb, not a law, but the right shape\n- Anchor it to one real cricket at **20 °C** -- 48 chirps in 25 s -- and the rest is doubling and halving: **12, 24, 48, 96, 192** at 0, 10, 20, 30 and 40 °C. No formula anywhere\n- The steps are 12, 24, 48 -- **getting bigger**, where a straight line adds the same amount every time. So the truth is plainly not a straight line\n- Dolbear joined **two measurements** with a ruler, and a straight line passes through the **average** of its two ends. Fitted at 10 and 30 °C, at 20 °C it reads (24 + 96)/2 = **60** against a true **48**: **25% high**\n- Why: going up ten degrees **adds 48**, coming down ten degrees only **loses 24**. The halves are unequal because each step doubles, so their average sits above the middle. **A curve bending upwards always lies below the chord joining two of its points**, and no crickets are needed for that\n- The line is exactly right at its **two anchors**, reads **high between** them and **low outside**, and at **3.3 °C** it reaches zero chirps -- so it does not just lose accuracy at the edges, it ends up saying something impossible\n- The middle error is set by the **span** alone: **20 °C gives 25%, 10 °C gives 6.0%, 5 °C gives 1.7%.** Halving the span **quarters** the error, which is the signature of a bend\n- **And only the span matters, not where it sits.** A line through 0 and 20 °C is also 25% out at its midpoint, because doubling cares about **ratios** and the far end of any 20-degree span is 4 times the near end. **That is what makes a window a property of the rule** rather than of the day\n- Accept 5% and the span must be under about **9 °C**, so Dolbear's rule is worth roughly **ten degrees**\n- **The pay-off:** the chord's slope over 15 to 25 °C is (67.9 - 33.9)/10 = **3.4 chirps per °C**, and Dolbear measured **3**. The doubling rule, anchored at one point, very nearly **produces** the constant L2B26 had to accept on trust\n- **Two failures, two kinds.** The 35 °C error is the line bending away from a curve: smooth, gradual, shrinkable by fitting a narrower span. The 13 °C silence is the cricket **stopping**: a mechanism threshold that no line or curve will repair, because the information is not in the silence. **An approximation warns you; a mechanism limit does not**\n- All three Level 3 lessons found the same thing: **26 km/h hid sin(latitude), 10 °C/km hid condensation, 3 chirps per °C hid a doubling.** A calibration constant is a dependence you have not noticed yet, and the rule's range is where it starts to bite\n- **Still standing:** the doubling factor is itself only roughly 2 and varies by species and temperature. Above about 35 °C the rate **reverses** as the enzymes come apart, so the real curve has a peak this one does not model. And Dolbear fitted across his whole range rather than through two points, which shifts the window a little.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Complete Big Idea 26, Level 3", nextNodeId: 'complete' }
            ]
        },

        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- How Do We Predict Weather?**\n\nThree lessons, three borrowed constants, and the same discovery in each.\n\n**Summary Table:**\n| | Physics (L3P26) | Chemistry (L3C26) | Biology (L3B26) |\n| --- | --- | --- | --- |\n| Level 2's constant | **26 km/h** per hPa/100 km | **10 °C** per km | **3 chirps** per °C |\n| What it was hiding | **sin(latitude)** | whether **condensation** started | a **doubling**, not an adding |\n| The real shape | a balance that needs spin | **two** rates, 10 then 5.5 | a doubling, not a line |\n| The arithmetic | 1/(ρf) x Δp/Δn | 4.5 x base / (rate - 5.5) | average the two ends |\n| The range it holds over | the **middle latitudes** | below the **cloud base** | about **ten degrees** |\n| Outside it | no rule at the equator | the answer **flips** | 25% out, then impossible |\n| A second limit | -- | -- | **silence below 13 °C** |\n\n**What ties them together:** every one of Level 2's rules worked, and every one worked because somebody had quietly chosen a range for it. The physics hid a latitude, the chemistry hid a change of state, and the biology hid the fact that chemistry multiplies where a ruler adds.\n\n**The one line to remember:** a calibration constant is a dependence you have not noticed yet -- so measuring it more precisely buys you nothing, while deriving it hands you the constant and the range it holds over out of the same piece of work.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}

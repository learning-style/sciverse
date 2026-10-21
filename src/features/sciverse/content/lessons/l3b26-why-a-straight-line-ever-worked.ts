import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 26, biology. The synthesis lesson. Mechanism + Limit.
 *
 * L2B26 was honest that Dolbear's 3 and 4.4 were a fitted line rather than anything
 * derived. It did not ask the harder question: why should a straight line fit at all?
 *
 * It should not. Chirping is a muscle contracting, and muscles run on chemical
 * reactions whose rate rises by a factor of about 2 for every 10 C -- the factor
 * L3B18 named Q10. So
 *
 *   chirp rate = rate at 20 C x Q10^((T - 20) / 10)
 *
 * which is an exponential, and a straight line through an exponential is a LOCAL FIT
 * that touches at one point and falls away both sides. Verified against a line drawn
 * tangent at 20 C with Q10 = 2: the line is 7.6% low at 15 C, 4.8% low at 25 C,
 * 15.3% low at 30 C, 27.9% low at 35 C and 38.6% low at 10 C -- within 8% only from
 * 15 C to 27 C, a window about 12 degrees wide.
 *
 * And the window's width is set by the curvature: at Q10 = 1.5 it is 20 degrees
 * wide, at 2.0 twelve, at 3.0 only seven. The more curved the truth, the less a
 * straight line is worth.
 *
 * The cold limit is a different kind of thing and the lesson says so: below about
 * 13 C the cricket does not get inaccurate, it stops. That is a mechanism threshold,
 * not the exponential failing.
 *
 * It closes the Big Idea on the thing all three Level 3 lessons found: the Level 2
 * calibration constant was hiding a dependence, and the range boundary is where that
 * dependence bites. 26 km/h hid sin(latitude). 10 C/km hid whether condensation had
 * started. Three chirps per degree hid an exponential.
 *
 * Frame of reference stated: rates are chirps per minute for one cricket, and the
 * line is drawn tangent to the curve at 20 C.
 *
 * Still standing: Q10 is itself only roughly constant, and above about 35 C it
 * reverses as the enzymes start to come apart -- so the curve has a peak this lesson
 * does not model. Dolbear also fitted by least squares over his whole range rather
 * than tangentially at one point, which shifts the window a little.
 */
export function getL3B26Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2B26 was careful about one thing and incurious about another.\n\nIt was careful to say that Dolbear's **3** and **4.4** were not derived from anything -- he sat with a thermometer and a notebook and **fitted a straight line**. Good.\n\nWhat it never asked is: **why should a straight line fit?**\n\nBecause there is no reason it should. Think about what chirping actually is. A cricket rubs a ridge on one wing against a scraper on the other, and it is **muscle** that moves the wing. Muscle contracts because of chemical reactions, and chemical reactions have a very well known way of responding to temperature -- and it is not a straight line.\n\n**A chemical rate roughly doubles for every 10 °C.** L3B18 met that factor and gave it its name: **Q10**, which means nothing more than *the factor for ten degrees*. For most biological processes it is somewhere between 2 and 3.\n\nSo the chirp rate should go like this:\n\n**chirp rate = (rate at 20 °C) x Q10 to the power of ((T - 20) / 10)**\n\nThat is an **exponential**, not a line. Every ten degrees multiplies the rate; it does not add a fixed amount.\n\nWhich leaves a real puzzle. Dolbear's straight line **works** -- it has been used for over a century and it is accurate to about a degree. **How can a straight line be a good description of an exponential?**\n\nYour two dials:\n\n- **Temperature**, in °C.\n- **Q10** -- the factor the rate multiplies by for every 10 °C warmer.\n\nBefore any arithmetic: can a straight line ever match a curve?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'locally', label: "Over a short stretch, yes -- any smooth curve looks straight if you do not go far.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'never', label: "No, so Dolbear's rule must be wrong and people have been lucky.", nextNodeId: 'misconception' }
            ]
        },

        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "A century of campers is a lot of luck. The rule works, so the interesting question is not *whether* but *where*.\n\nAnd the answer is the thing that makes all of calculus useful: **any smooth curve looks straight if you only look at a short piece of it.** Stand on a hillside and the ground under your feet is flat, although the hill is not. Walk far enough and the flatness fails.\n\nSo a straight line through an exponential is not wrong. **It is right at one point and gets steadily worse in both directions**, and the only real question is how far you can go before the error matters.\n\nThat question has a number, and getting it is the point of this lesson.\n\nNotice also what sort of claim this is. L2B26 said Dolbear's rule holds *over the range he measured*, which sounded like a note about one man's fieldwork. It is not. **The range is a property of the curve**, and you can work it out without knowing anything about Dolbear -- which means you can work out the range of a fitted line you have never seen the data for.",
            options: [
                { id: 'cont', label: "So how far can the line go?", nextNodeId: 'defining' }
            ]
        },

        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Put the line where it has the best chance: touching the curve in the **middle** of the useful range, at **20 °C**, and sloping the same way the curve does there.\n\nThen compare them. For **Q10 = 2** -- a doubling every ten degrees -- the line comes out like this:\n\n| Temperature | The line is |\n| --- | --- |\n| 10 °C | **38.6% low** |\n| 13 °C | **16.4% low** |\n| 15 °C | **7.6% low** |\n| 20 °C | **exact** |\n| 25 °C | **4.8% low** |\n| 30 °C | **15.3% low** |\n| 35 °C | **27.9% low** |\n\nTwo things in that column are worth noticing.\n\n**It is low on both sides.** Not high on one and low on the other -- an exponential curves upward away from any tangent, so the line always underestimates. A fitted line through curved data is **biased**, not merely imprecise, and bias does not average out however many measurements you take.\n\n**And it is good over a surprisingly narrow band.** If you ask where the line stays within 8%, the answer is **15 °C to 27 °C** -- about **twelve degrees**. Outside that it goes wrong fast, because an exponential's error grows the way exponentials do.\n\nSo Dolbear's rule is not approximately right everywhere. **It is well inside a twelve-degree window and getting rapidly worse outside it**, and that window is where he took his measurements, because that is where a line fitted well enough to publish.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'network' } },
            options: [
                { id: 'work', label: "What sets the width of the window?", nextNodeId: 'worked' }
            ]
        },

        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**The curvature does**, and the curvature is Q10. A bigger Q10 means a sharper curve, and a sharper curve leaves less of itself looking straight.\n\nMove the Q10 dial and ask each time where the line stays within 8%:\n\n| Q10 | The window | Width |\n| --- | --- | --- |\n| 1.5 | 11 to 31 °C | **20 degrees** |\n| 2.0 | 15 to 27 °C | **12 degrees** |\n| 2.5 | 16 to 25 °C | **9 degrees** |\n| 3.0 | 17 to 24 °C | **7 degrees** |\n\nFrom 20 degrees down to 7, and all that changed was how strongly the chemistry responds to temperature. **The width of a straight line's usefulness is set by how curved the thing it is approximating is**, and nothing else -- not by how carefully you fitted it, and not by how many measurements you took.\n\nThat is worth holding on to, because it is a general fact about fitted rules rather than a fact about crickets. **A linear rule for a process with a strong temperature dependence has a narrow working range, and you can estimate the range from the Q10 alone.**\n\n**And now the cold end, which is a different kind of failure entirely.** Below about **13 °C** a snowy tree cricket does not chirp inaccurately. **It stops.** The exponential does not say that -- it goes on predicting slower and slower chirping all the way down, and at 5 °C it would cheerfully give you a rate.\n\nSo the silence L2B26 ran into is **not this curve failing**. It is a separate mechanism: below some temperature the muscle cannot cycle fast enough to make the sound at all, and the mechanism simply stops working. **An exponential has no bottom. A cricket does.**",
            options: [
                { id: 'check', label: "Let me try one.", nextNodeId: 'math_check' }
            ]
        },

        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "Your turn. A biologist finds a different insect whose call rate has a **Q10 of 3**, and fits a straight line to it at 20 °C.\n\nThey then use that line at **30 °C**. What should they expect?",
            options: [
                { id: 'thirty', label: "The line reads about 30% low, because a Q10 of 3 curves hard and 30 °C is well outside its 7-degree window.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'fine', label: "It should be fine — 30 °C is only 10 degrees from where it was fitted.", nextNodeId: 'math_wrong' },
                { id: 'high', label: "The line reads about 30% high, since it keeps rising past the curve.", nextNodeId: 'math_wrong' }
            ]
        },

        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Ten degrees sounds modest and it is not, because what counts is ten degrees **measured against the curvature**.\n\nAt a Q10 of 3 the real rate at 30 °C is three times what it is at 20. The line, which only knows the slope at 20, has climbed by ten times that slope -- and ten times the slope at the bottom of a tripling curve does not reach the top. It lands about **30% low**.\n\nAnd *low* is the direction to remember. **An exponential curves upward away from its tangent**, so the line falls below the curve on **both** sides -- above 20 °C because the curve has accelerated away upward, and below 20 °C because the curve has flattened out above where the straight line keeps descending. A line through curved data does not scatter around the truth. **It sits consistently on one side of it.**\n\nSo the right expectation is not *roughly right* and not *too high*. It is **systematically about a third low**, which is the kind of error that looks like a real biological finding if you do not know it is there.",
            options: [
                { id: 'retry', label: "Low on both sides, and the window is narrow.", nextNodeId: 'explore' }
            ]
        },

        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Both dials are live. The true exponential and the straight line fitted at 20 °C are drawn together, with your temperature marked and the error between them.\n\nThings worth doing:\n\n- Set **Q10** to 2 and walk the **Temperature** from 20 outward in both directions. The error is **zero at 20** and grows both ways -- and it is **negative both ways**, which is the bias.\n- Now hold the temperature at 30 and sweep **Q10** from 1.5 to 3. The error goes from about 6% to about 30%. **Same line, same temperature; only the curvature changed.**\n- Find the two temperatures where the error reaches 8% at Q10 = 2. They are about **15** and **27** -- Dolbear's working window, read straight off the picture.\n- Set Q10 to **1.5** and look at how straight the curve looks. A weakly temperature-dependent process is nearly linear, and a fitted line for it would be genuinely useful over twenty degrees.\n- Take the temperature below **13 °C** and read what the curve claims. It gives a number, and a real cricket gives **silence**. **The two failures are different: one is the line leaving the curve, the other is the curve leaving the animal.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Checkpoint", nextNodeId: 'checkpoint' }
            ]
        },

        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "All three of this level's lessons took a Level 2 rule apart, and the same thing was inside each one.\n\n- **L2P26** said multiply the gradient by **26 km/h**. L3P26 found **sin(latitude)** inside the 26, and the equator where it fails.\n- **L2C26** said compare with **10 °C per km**. L3C26 found *whether condensation has started* inside the 10, and the second threshold at 5.5.\n- **L2B26** said **3 chirps per degree**. L3B26 found an **exponential** inside the 3, and a twelve-degree window.\n\nWhat is the general statement?",
            options: [
                { id: 'hidden', label: "A calibration constant is a dependence you have not noticed yet -- and the rule's range is wherever that dependence starts to matter.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Level 2 rules are simply wrong and should not be taught.", nextNodeId: 'checkpoint_wrong' },
                { id: 'precision', label: "The constants need more decimal places to work over wider ranges.", nextNodeId: 'checkpoint_wrong' }
            ]
        },

        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "None of the three Level 2 rules was wrong. Each one gave good answers for years, and two of them are what working forecasters actually use.\n\nWhat each one did was replace something that **varies** with a single number. And a single number standing in for something that varies is fine **exactly where that thing does not vary much** -- which is the definition of a working range.\n\n- the 26 is right wherever **sin(latitude)** is close to sin(50°) -- the middle latitudes, as stated\n- the 10 is right wherever **nothing is condensing** -- below the cloud base, as stated\n- the 3 chirps per degree is right wherever the **exponential looks straight** -- about twelve degrees, which was not stated because nobody knew\n\nSo more decimal places would not help at all, and this is the point worth taking away. **A more precise wrong constant is still wrong.** Measuring the 26 to four figures tells you nothing about the equator; what tells you about the equator is finding the sine.\n\n**Precision inside the range and complete failure outside it are the normal condition of a fitted rule**, and the only cure is to find out what the constant is standing in for.",
            options: [
                { id: 'retry', label: "A constant stands in for something that varies.", nextNodeId: 'checkpoint_correct' }
            ]
        },

        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "**That is the Big Idea, and it took all six lessons to say it.**\n\nLevel 2 found that predicting weather means measuring a **proxy** and applying a **calibrated rule** -- the spacing of isobars, two cooling rates, a chirp rate. That is genuinely how it is done.\n\nLevel 3 found what a calibration costs you. **Every one of those constants was a variable in disguise**, and the rule's range was wherever the disguise held:\n\n| | The constant | What it hid | Where it fails |\n| --- | --- | --- | --- |\n| **P** | 26 km/h | **sin(latitude)** | the equator, where f is zero |\n| **C** | 10 °C/km | **condensation** | above the cloud base |\n| **B** | 3 chirps/°C | an **exponential** | outside about 12 degrees |\n\nAnd deriving each one gave two things for the price of one: **the rule, and the rule's limits, out of the same algebra.** That is what a derivation is worth and a measurement can never give you -- because you can measure a constant very accurately without ever discovering what it depends on.\n\n**So the useful question about any rule is not how accurate it is. It is what its constants are standing in for.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "A constant is a variable in disguise!", nextNodeId: 'discovery' }
            ]
        },

        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found out why a straight line ever worked, and how far.**\n\n- Chirping is **muscle**, muscle is **chemistry**, and a chemical rate rises by a factor of about 2 for every 10 °C -- the **Q10** L3B18 named. So **chirp rate = (rate at 20 °C) x Q10^((T-20)/10)**, an **exponential**\n- A straight line through an exponential is a **local fit**. It is exact at one point and gets worse both ways, because **any smooth curve looks straight over a short enough stretch**\n- Fitted tangent at 20 °C with Q10 = 2, the line is **7.6% low at 15 °C**, **4.8% low at 25**, **15.3% low at 30**, **27.9% low at 35** and **38.6% low at 10**\n- **It is low on both sides**, because an exponential curves upward away from any tangent. So a fitted line through curved data is **biased, not merely imprecise** -- and bias does not average out however many measurements you take\n- Within 8%, the window is **15 to 27 °C: about twelve degrees**. That is where Dolbear measured, because that is where a line fitted well enough to publish\n- **The curvature sets the width**, and nothing else: Q10 of 1.5 gives a **20-degree** window, 2.0 gives **12**, 3.0 gives **7**. Not how carefully you fitted it, and not how many readings you took\n- So **you can estimate a linear rule's working range from the Q10 alone**, without seeing the data -- which makes the range a property of the curve rather than of one man's fieldwork\n- **The cold end is a different failure.** Below about 13 °C the cricket does not chirp inaccurately, it **stops**. The exponential has no bottom; it would give a rate at 5 °C. **A curve leaving the animal is not the same as a line leaving the curve**\n- And all three Level 3 lessons found the same thing in their Level 2 rule. **26 km/h hid sin(latitude). 10 °C/km hid condensation. Three chirps per degree hid an exponential**\n- **A calibration constant is a dependence you have not noticed yet**, and the rule's range is wherever that dependence starts to matter. None of the Level 2 rules was wrong -- each replaced something that varies with one number, which works exactly where it does not vary much\n- **A more precise wrong constant is still wrong.** Measuring the 26 to four figures says nothing about the equator; finding the sine does\n- **A derivation gives the rule and the rule's limits out of the same algebra**, which is what measuring can never do\n- **Still standing:** Q10 is itself only roughly constant, and above about 35 °C it **reverses** -- enzymes start coming apart, so the real curve has a peak and then falls, which this exponential knows nothing about. And Dolbear fitted by least squares across his whole range rather than tangentially at one point, which shifts the window by a degree or so either way.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Complete L3B26", nextNodeId: 'complete' }
            ]
        },

        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- How Do We Predict Weather?**\n\nLevel 2 showed that a forecast is a proxy and a calibrated rule. Level 3 took the calibrations apart, and found the same thing in all three.\n\n**Summary Table:**\n| | Physics (L3P26) | Chemistry (L3C26) | Biology (L3B26) |\n| --- | --- | --- | --- |\n| Level 2's constant | **26 km/h** per hPa/100 km | **10 °C/km** | **3 chirps** per degree |\n| What it hid | **sin(latitude)** | whether **condensation** started | an **exponential** |\n| The real relation | **v = (1/(ρf)) x (Δp/Δn)** | 10 below the cloud base, **5.5** above | rate x **Q10^((T-20)/10)** |\n| The derived number | **26.3 km/h** at 50° | breaks even at **4.5 x base / (rate - 5.5)** | window **15 to 27 °C** |\n| The new boundary | **f = 0** at the equator | a **second** threshold at 5.5 | about **12 degrees** wide |\n| What is beyond it | no geostrophic wind **at all** | **conditionally unstable**: 56% of days | **38.6% low** at 10 °C |\n| The surprise | the wind runs **along** the lines | most days need a **trigger** | the error is **biased**, not scattered |\n| A second kind of limit | friction near the ground | the **work** a trigger must do | the cricket **stops** at 13 °C |\n\n**The one line to remember:** every one of Level 2's rules worked by replacing something that varies with a single measured constant, so each one was precise inside a range and useless outside it -- and the only way to find the range is to work out what the constant was standing in for, which is what a derivation gives you and a measurement never can.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}

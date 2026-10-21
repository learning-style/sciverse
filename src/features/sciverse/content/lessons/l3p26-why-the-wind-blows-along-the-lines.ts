import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 26, physics. Mechanism + Limit.
 *
 * L2P26 left two things standing and said so. The 26 km/h was handed over as a
 * measured calibration, and the wind was stated to blow ALONG the isobars rather
 * than across them -- which is strange enough that stating it was all that lesson
 * could do. They turn out to be one explanation.
 *
 * Air starts from rest and is pushed from high pressure towards low. The Coriolis
 * effect deflects anything moving across a spinning planet, and the deflection grows
 * with the speed, so the air turns until the deflection exactly cancels the push.
 * At that point it is moving at right angles to the push -- along the isobars -- and
 * the balance reads
 *
 *   (1/rho) x dp/dn = f v,     f = 2 Omega sin(latitude)
 *   so  v = (1/(rho f)) x dp/dn
 *
 * Verified at latitude 50 with rho = 1.225 and Omega = 7.292e-5: a gradient of
 * 1 hPa per 100 km gives 7.31 m/s = 26.3 km/h, which is L2P26's 26 exactly.
 *
 * And the 26 was hiding sin(latitude) all along: the same gradient gives 40 km/h at
 * 30 degrees and 21 at 70. At the equator sin is zero, f is zero, and the formula
 * divides by nothing -- there is no balance to strike, which is why the rule L2P26
 * used does not exist there, and why tropical cyclones do not form within a few
 * degrees of the equator.
 *
 * Honest about what is asserted: the magnitude f v of the Coriolis term is taken,
 * not derived, because deriving it needs rotating frames. The BALANCE is derived,
 * and the lesson says which is which.
 *
 * Frame of reference stated: dp/dn is measured across the isobars from high to low,
 * and the deflection is to the right of the motion in the northern hemisphere.
 *
 * Still standing: this is a balance of two terms, so it holds only where nothing
 * else matters -- not near the ground, where friction turns the wind across the
 * isobars by 10 to 30 degrees, and not on tightly curved isobars, where the air is
 * also being turned in a circle.
 */
export function getL3P26Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2P26 ended with two loose ends, and they are the same loose end.\n\n**The first: a number nobody explained.** You were told to multiply the gradient by **26 km/h** and that it was measured rather than worked out. A calibration constant with no derivation is a promissory note.\n\n**The second: a right angle that makes no sense.** Air is pushed from high pressure towards low -- that is what a pressure difference *means*. So the wind should blow across the isobars, from the high to the low, the way water runs downhill. **It blows along them instead**, at right angles to the push, round the lows rather than into them.\n\nThat second one should bother you more than it probably does. Imagine pushing a trolley north and watching it roll east. Something is missing from the force diagram.\n\nWhat is missing is that **the ground you are measuring from is spinning.** Anything moving across the surface of a rotating planet gets deflected -- to the **right** of its motion in the northern hemisphere -- and the size of that deflecting effect, per kilogram, is\n\n**f x v**\n\nwhere **v** is the speed and **f** is a number that depends only on where you are:\n\n**f = 2 Ω sin(latitude)**, with **Ω = 7.292 x 10⁻⁵ per second**, the Earth's rate of spin\n\n**Be clear about what is being handed to you.** That *f x v* is asserted here, not derived -- getting it properly needs the mathematics of rotating frames of reference, which is beyond this lesson. **The balance that follows is not asserted**, and it is the whole point.\n\nYour two dials:\n\n- **Pressure Gradient**, in hPa per 100 km -- what you measured with a ruler in L2P26.\n- **Latitude**, in degrees from the equator.\n\nBefore any arithmetic: if the air is pushed one way and deflected another, where does it end up going?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'balance', label: "Wherever the deflection cancels the push -- and then it stops turning.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'spiral', label: "In a spiral into the low, since the push never stops.", nextNodeId: 'misconception' }
            ]
        },

        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "A spiral is what you get near the ground, where friction is in the problem too, and it is not what happens higher up. Follow the air instead of guessing.\n\n**It starts at rest.** No motion, so no deflection at all -- the deflecting effect is *f x v* and v is zero. The only thing acting is the push, so the air begins moving **straight at the low**, exactly as you would expect.\n\n**Now it is moving, so it is deflected.** To the right of its motion. It curves.\n\n**And now it is moving faster**, so it is deflected harder. It curves more.\n\nThis keeps going, and here is the thing: as the air turns, the push and the deflection come into line with each other -- **opposite** to each other. The deflection is always at right angles to the motion, so once the air has turned through 90 degrees the deflection points straight back along the push.\n\nAt that moment the two cancel. **Nothing is left to turn it or to speed it up**, so it stops turning and stops accelerating, and carries on at a steady speed at right angles to the push. Which is to say: **along the isobars.**\n\nThe wind is not being pushed along the isobars. It is going along them because that is the only direction in which the two effects acting on it cancel. **A right angle is what a balance looks like when one of the two effects is sideways.**",
            options: [
                { id: 'cont', label: "So set the two equal to each other.", nextNodeId: 'defining' }
            ]
        },

        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Write the balance down. Per kilogram of air:\n\n- the **push**, from the pressure difference across the isobars, is **(1/ρ) x (Δp/Δn)**, where ρ is the air's density and Δp/Δn is the gradient measured from high to low\n- the **deflection** is **f x v**\n\nSteady wind means they are equal:\n\n**(1/ρ) x (Δp/Δn) = f v**\n\nand rearranging for the thing you want,\n\n**v = (1/(ρ f)) x (Δp/Δn)**\n\nThat is it. One equation with nothing in it that was not named above, and it is called the **geostrophic wind** -- *geo* for earth, *strophic* for turning, because it is the wind you get once the turning has finished.\n\nTwo things are worth reading off it before any numbers go in.\n\n**The wind is proportional to the gradient.** Double the gradient, double the wind. That is exactly what L2P26 assumed when it multiplied by a single constant, and now you know why it was allowed to.\n\n**And the constant is not a constant.** It contains **f**, and f contains **sin(latitude)**. So *26 km/h per hPa per 100 km* is not a fact about air. **It is a fact about air at 50 degrees north**, and L2P26 could not have known that, because a calibration gives you a number without telling you what it depends on.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'network' } },
            options: [
                { id: 'work', label: "Work out the 26.", nextNodeId: 'worked' }
            ]
        },

        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**Deriving L2P26's calibration.** Take a gradient of **1 hPa per 100 km** at **latitude 50**, with air density **ρ = 1.225 kg/m³**.\n\nFirst the gradient in units that will cancel. 1 hPa is 100 Pa, and 100 km is 100,000 m:\n\nΔp/Δn = 100 / 100,000 = **0.001 Pa per m**\n\nThen f:\n\nf = 2 x 7.292 x 10⁻⁵ x sin(50°) = 2 x 7.292 x 10⁻⁵ x 0.766 = **1.117 x 10⁻⁴ per second**\n\nThen ρf:\n\n1.225 x 1.117 x 10⁻⁴ = **1.369 x 10⁻⁴**\n\nAnd the wind:\n\nv = 0.001 / 1.369 x 10⁻⁴ = **7.31 m/s**\n\nIn km/h, multiplying by 3.6:\n\n**26.3 km/h**\n\n**That is L2P26's 26.** Not approximately -- the figure that lesson was handed and could not justify falls out of a force balance, the air's density and the Earth's rate of spin.\n\n**Now change the one thing L2P26 could not see.** Same gradient, different latitudes:\n\n| Latitude | f | Wind per 1 hPa/100 km |\n| --- | --- | --- |\n| 30° | 7.29 x 10⁻⁵ | **40 km/h** |\n| 50° | 1.12 x 10⁻⁴ | **26 km/h** |\n| 70° | 1.37 x 10⁻⁴ | **21 km/h** |\n\nThe same chart, read in Cairo and in Edinburgh, forecasts winds **half again** as different. A calibration constant was hiding a dependence, which is what calibration constants do.",
            options: [
                { id: 'check', label: "What happens at the equator?", nextNodeId: 'math_check' }
            ]
        },

        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "Good question to ask, and it is the one that breaks the formula.\n\nAt the equator the latitude is 0, so **sin(0) = 0**, so **f = 0**.\n\nWhat does v = (1/(ρf)) x (Δp/Δn) say then?",
            options: [
                { id: 'undefined', label: "It divides by zero -- so there is no geostrophic wind at all, and the whole balance fails.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'infinite', label: "The wind is infinitely fast at the equator.", nextNodeId: 'math_wrong' },
                { id: 'zero', label: "The wind is zero at the equator.", nextNodeId: 'math_wrong' }
            ]
        },

        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Neither. **A formula dividing by zero is not telling you that the answer is enormous. It is telling you the formula does not apply.**\n\nGo back to what f = 0 actually means physically: at the equator, air moving horizontally is **not deflected at all**. So there is nothing to cancel the push.\n\nAnd if there is nothing to cancel the push, the air never stops turning into line with it, never settles, and **never reaches a steady wind along the isobars**. There is no balance to strike, so there is no geostrophic wind. The air just accelerates towards the low until something else -- friction, or running into other air -- stops it.\n\nSo L2P26's rule does not have a different value at the equator. **It does not exist there.** That is a stronger and more useful statement than a wrong number would be.\n\nAnd it shows up in the real world in a way you can check. **Tropical cyclones do not form within about five degrees of the equator**, anywhere, ever. They need the deflection to organise the inflowing air into a rotating system, and that close in there is not enough of it. A gap in the map, from a sine going to zero.",
            options: [
                { id: 'retry', label: "No deflection, so no balance, so no rule.", nextNodeId: 'explore' }
            ]
        },

        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Both dials are live. The push and the deflection are drawn as two arrows on the moving air, with the wind they settle to.\n\nThings worth doing:\n\n- Set the **Latitude** to 50 and the **Pressure Gradient** to 1. The wind reads **26 km/h** -- L2P26's whole calibration, now with a reason.\n- Hold the gradient at 1 and sweep the latitude from 75 down towards 5. The wind climbs from 21 km/h to **231 km/h** on an unchanged chart. **Nothing about the weather changed. Only where you are standing.**\n- Keep going down to **5 degrees** and look at what it claims: 231 km/h from an ordinary gradient. That is not a forecast, it is a formula past its limit -- the balance takes longer and longer to establish as f shrinks, and eventually never does.\n- Now hold the latitude at 50 and double the gradient. The wind doubles exactly. **That straight-line behaviour is the part L2P26 got right for free.**\n- Watch the two arrows as you change the dials. They are always the **same length** and always **opposite**, whatever the setting -- because that is the condition being solved, not a result. **The picture cannot show you an unbalanced wind, because an unbalanced wind is still turning.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Checkpoint", nextNodeId: 'checkpoint' }
            ]
        },

        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "A forecaster in Britain uses L2P26's rule for years and it works well. She is then posted to Singapore, **1.3 degrees north of the equator**, and her forecasts become useless -- not slightly wrong, but unrelated to what happens.\n\nShe checks her ruler, her charts and her arithmetic. All fine.\n\nWhat has gone wrong, and what should she do instead?",
            options: [
                { id: 'nogeo', label: "At 1.3° there is effectively no deflection, so no geostrophic balance exists -- the rule has no value there, and she needs a different method entirely.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'recal', label: "She needs to recalculate the constant for 1.3° and use that instead.", nextNodeId: 'checkpoint_wrong' },
                { id: 'hemis', label: "The deflection is the other way round near the equator, so she should reverse the wind direction.", nextNodeId: 'checkpoint_wrong' }
            ]
        },

        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Recalculating is the tempting answer and it is the wrong lesson to draw.\n\nWork out what the constant would be: f = 2 x 7.292 x 10⁻⁵ x sin(1.3°) = 3.3 x 10⁻⁶, which gives about **890 km/h per hPa per 100 km**. That is not a wind. **It is a formula telling you it has nothing to say.**\n\nThe reason is physical rather than numerical. The balance exists because the deflection can grow to match the push -- and the deflection is f x v, so if f is tiny the air has to be moving absurdly fast before it balances anything. Long before it got there it would have crossed the isobars, reached the low and run into other air. **The steady state the formula describes is never reached, so the formula describes nothing.**\n\nSo the honest answer is that near the equator you forecast differently. Tropical weather is driven by convection, by thunderstorms, by the large-scale rising and sinking of air -- which is why L2C26's lapse-rate comparison matters far more there than any chart of isobars.\n\nAnd the hemisphere answer is a real effect in the wrong place: the deflection does reverse **across** the equator, which is why southern lows spin the other way. But at 1.3 degrees the problem is not the direction of the deflection. It is that there is barely any.",
            options: [
                { id: 'retry', label: "The balance is never reached, so the rule has no value.", nextNodeId: 'checkpoint_correct' }
            ]
        },

        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "**Exactly -- and that is the general lesson about calibrations, not just this one.**\n\nL2P26 was given the number 26 and the instruction *this holds in the middle latitudes*. It had no way of knowing **why** that condition was there or **what it was hiding**, because a calibration is a number without its reasons.\n\nDeriving the number told you both at once. The 26 contains **sin(latitude)**, so the condition was never a vague geographical caution -- it was the sine going to zero. **The derivation did not just explain the rule. It explained the rule's limits**, and those came out of the same algebra.\n\nThat is worth taking away as a general thing. **A fitted constant tells you what a system does. A derived one tells you when it will stop doing it** -- which is the part you cannot get by measuring more carefully, and the part a forecaster posted to Singapore needs.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "The derivation gave the limits too!", nextNodeId: 'discovery' }
            ]
        },

        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You derived L2P26's calibration and found the equator inside it.**\n\n- Air is pushed from high pressure to low, but the ground it moves over is **spinning**, so anything moving is deflected -- to the **right** in the northern hemisphere -- by an amount **f x v** per kilogram\n- **f = 2 Ω sin(latitude)**, with **Ω = 7.292 x 10⁻⁵ per second**. The *f x v* is **asserted** here; rotating frames are beyond this level. **The balance is not asserted**\n- Starting from rest there is no deflection at all, because v is zero. The air sets off **straight at the low**, then curves more as it speeds up, until the deflection points **back along the push** and cancels it\n- At that point nothing is left to turn it or speed it up, so it runs steadily **along the isobars**. **A right angle is what a balance looks like when one of the two effects is sideways**\n- The balance: **(1/ρ) x (Δp/Δn) = f v**, so **v = (1/(ρ f)) x (Δp/Δn)**. The **geostrophic wind** -- the wind left once the turning has finished\n- Wind is **proportional to the gradient**, which is exactly what L2P26 assumed in multiplying by one constant, and now there is a reason\n- **At latitude 50, 1 hPa per 100 km gives 7.31 m/s = 26.3 km/h.** L2P26's 26, out of a force balance, the air's density and the Earth's spin\n- **But the constant is not constant.** The same chart gives **40 km/h at 30°**, **26 at 50°**, **21 at 70°** -- half again as different, from where you are standing\n- At the equator **sin(0) = 0**, so f = 0 and the formula **divides by zero**. That does not mean an infinite wind; it means **there is no balance to strike and no geostrophic wind at all**\n- Which is checkable: **tropical cyclones never form within about five degrees of the equator**, because they need the deflection to organise the inflow. A gap in the map, from a sine going to zero\n- At 1.3° the formula would give **890 km/h per hPa per 100 km** -- not a wind, but a formula saying it has nothing to offer. Near the equator you forecast by **convection** instead, which is L2C26's comparison\n- **A fitted constant tells you what a system does; a derived one tells you when it will stop doing it.** The 26 and its limits came out of the same algebra\n- **Still standing:** this balances exactly **two** effects, so it holds only where nothing else matters. Near the ground **friction** is a third, and it turns the wind across the isobars by 10 to 30 degrees -- which is why surface winds do spiral into lows after all, and why the sea breeze in P26 was never a geostrophic wind. And on tightly curved isobars the air is being turned in a circle as well, which needs a third term of its own.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Complete L3P26", nextNodeId: 'complete' }
            ]
        },

        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Physics Complete -- How Do We Predict Weather?**\n\nL2P26 measured a chart. This explains why the measurement works and where it stops.\n\n**Summary Table:**\n| | L2P26 said | L3P26 says |\n| --- | --- | --- |\n| The 26 km/h | a **measured** calibration | **v = (1/(ρf)) x (Δp/Δn)**, derived |\n| At latitude 50 | -- | 0.001 / 1.369 x 10⁻⁴ = 7.31 m/s = **26.3 km/h** |\n| Why along the isobars | stated, not explained | the only direction where **push and deflection cancel** |\n| What deflects it | -- | the spinning ground: **f v**, with **f = 2Ω sin(lat)** |\n| Is the constant constant | assumed so | **no** -- 40 km/h at 30°, 21 at 70° |\n| At the equator | the rule falls apart | **f = 0**: no balance, so **no rule at all** |\n| Checkable consequence | -- | **no cyclones within ~5°** of the equator |\n| What a derivation buys | -- | the rule **and its limits**, from the same algebra |\n| Still standing | -- | **friction** near the ground, and curved isobars |\n\n**The one line to remember:** the wind blows along the isobars because that is the only direction in which the pressure push and the spinning planet's sideways deflection cancel each other -- and writing that balance down gives you both L2P26's 26 km/h and the reason it does not exist at the equator.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}

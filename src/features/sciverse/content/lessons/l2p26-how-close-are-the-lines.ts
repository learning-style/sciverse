import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) for Big Idea 26, physics.
 *
 * P26 ended on "the bigger the temperature gap, the stronger the wind" and never
 * said how much stronger. This reads the wind off a weather map:
 *
 *   pressure gradient = pressure difference / distance,   in hPa per 100 km
 *   wind speed = about 26 km/h for each 1 hPa per 100 km
 *
 * The 26 is a measured figure for mid-latitudes, stated as one, and L3P26 derives it
 * -- verified at latitude 50: a gradient of 1 hPa/100 km gives 7.31 m/s = 26.3 km/h.
 *
 * The useful consequence is that it is the SPACING of the isobars and not the
 * pressure difference that sets the wind. The same 4 hPa over 200 km gives 52 km/h
 * and over 800 km gives 13 km/h -- four times the distance, a quarter of the wind.
 * That is what a forecaster is doing when they glance at a chart.
 *
 * Boundary with other Big Ideas: Big Idea 8 owns humidity, dew point and cloud base
 * (L2C8, L3C8), and L2P25 owns how far ahead a forecast can reach. This Big Idea is
 * about reading a quantity you want off a quantity you can see.
 *
 * Frame of reference stated: the gradient is measured across the isobars, along the
 * shortest line from the high to the low, and the distance is on the ground.
 *
 * Still standing: the 26 was handed over, and it is not a universal constant -- it
 * depends on latitude, and at the equator there is no such rule at all. And the wind
 * this predicts blows ALONG the isobars rather than from high to low, which is
 * strange enough that L2P26 only states it. L3P26 explains both.
 */
export function getL2P26Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "P26 finished on a good sentence that stops just short of being useful: **the bigger the temperature gap, the stronger the wind.**\n\nBigger by how much? A forecaster has to put a number on tomorrow's wind, and *bigger* will not do.\n\nSo here is what a forecaster actually looks at. A weather chart is covered in curved lines called **isobars** -- each one joins up all the places where the air pressure is the same. Air pressure is measured in **hectopascals (hPa)**, and charts usually draw an isobar every 4 hPa.\n\nNow, the thing worth knowing about those lines. **It is not the numbers on them that tell you the wind. It is how close together they are.**\n\nThat is the quantity to measure, and it has a name. The **pressure gradient** is how fast the pressure changes as you walk across the isobars -- straight from the high towards the low, by the shortest route, measuring the distance on the ground:\n\n**pressure gradient = pressure difference / distance**\n\nand it is quoted in **hPa per 100 km**.\n\nYour two dials are the two things you can read off a chart with a ruler.\n\n- **Pressure Difference** -- between the two isobars you picked, in hPa.\n- **Distance Between** -- how far apart they are on the ground, in km.\n\nBefore any arithmetic: you find two isobars 4 hPa apart. Is that a windy day?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'cannot', label: "There is no way to tell -- it depends how far apart they are.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'yes', label: "Yes -- 4 hPa is a big pressure difference.", nextNodeId: 'misconception' }
            ]
        },

        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "**4 hPa on its own tells you nothing at all**, and seeing why is the whole point of the lesson.\n\nTake those two isobars and put them **200 km** apart. Walking from one to the other, the pressure changes 4 hPa in 200 km, so the gradient is **2 hPa per 100 km**. That is a gale.\n\nNow take the **same two isobars** -- the same 4 hPa -- and put them **800 km** apart. The pressure changes 4 hPa in 800 km, a gradient of **0.5 hPa per 100 km**. That is a calm afternoon.\n\nSame difference. Four times the distance. **A quarter of the wind.**\n\nSo the pressure difference by itself is not a weather quantity. It is half of one, and the other half is the distance -- which is why a forecaster looking at a chart is not reading the numbers, they are looking at the **spacing**. Tightly packed isobars mean wind; widely spaced ones mean calm. You can do it from across the room.",
            options: [
                { id: 'cont', label: "So how do I turn a gradient into a wind speed?", nextNodeId: 'defining' }
            ]
        },

        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Once you have the gradient, the wind follows from a measured rule:\n\n**wind speed = about 26 km/h for each 1 hPa per 100 km**\n\nSo a gradient of 2 hPa per 100 km gives about 52 km/h, and 0.5 gives about 13 km/h.\n\nTwo honest things about that 26.\n\n**It is a measured number, not one you can work out from this lesson.** It comes from the density of the air and from how fast the Earth spins, and L3P26 works it out properly. Here it is a calibration -- somebody measured a great many winds against a great many charts.\n\n**And it only holds in the middle latitudes**, around 50 degrees from the equator, which covers Britain, most of Europe, Canada and the northern United States. Nearer the equator the same gradient gives a much stronger wind, and right at the equator this rule falls apart completely. That is a strange thing for a rule about air and pressure to care about, and it is the first clue that something is missing.\n\n**One more thing to state and not explain.** You would expect the wind to blow straight from the high pressure to the low, the way water runs downhill. **It does not.** In the middle latitudes the wind blows almost exactly **along** the isobars, at right angles to the way you just measured -- round the lows rather than into them. That is why weather systems spin. L2P26 cannot tell you why; it can only tell you that a forecaster measures across the isobars and then expects the wind to blow along them.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'network' } },
            options: [
                { id: 'work', label: "Show me it on real numbers.", nextNodeId: 'worked' }
            ]
        },

        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**A worked example.** Two isobars **8 hPa** apart, **200 km** apart on the ground.\n\nThe gradient, in hPa per 100 km:\n\n8 hPa / 200 km = 0.04 hPa per km, and per 100 km that is 0.04 x 100 = **4 hPa per 100 km**\n\nThen the wind:\n\n4 x 26 = **104 km/h**\n\nThat is a severe storm -- trees down, roofs damaged. And it came off a ruler and two numbers.\n\n**Now a real storm chart.** A deep Atlantic low: **40 hPa** of pressure difference spread over **1000 km**.\n\n40 / 1000 x 100 = **4 hPa per 100 km**, so again **104 km/h**.\n\nStop on that for a moment. The second chart has **five times** the pressure difference of the first and predicts **exactly the same wind**, because it is spread over five times the distance. **The forecaster who only read the 40 would have been five times wrong, and the one who only read the 8 would have been five times wrong the other way.** Neither number means anything without its distance.\n\n**And a quiet day.** 2 hPa over 1000 km:\n\n2 / 1000 x 100 = **0.2 hPa per 100 km**, and 0.2 x 26 = **5 km/h**. Barely enough to move a flag.",
            options: [
                { id: 'check', label: "Let me try one.", nextNodeId: 'math_check' }
            ]
        },

        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "Your turn. Two isobars are **4 hPa** apart and **400 km** apart on the ground.\n\nWhat wind would you forecast?",
            options: [
                { id: 'twentysix', label: "About 26 km/h", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'onefour', label: "About 104 km/h", nextNodeId: 'math_wrong' },
                { id: 'ten', label: "About 10 km/h", nextNodeId: 'math_wrong' }
            ]
        },

        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Gradient first, then the 26.\n\n- the gradient: 4 hPa / 400 km = 0.01 hPa per km, which is **1 hPa per 100 km**\n- the wind: 1 x 26 = **26 km/h**\n\nA brisk but ordinary day.\n\n104 is what you get from 4 x 26, using the pressure difference as if it were already a gradient. That is the commonest mistake with this calculation and it is worth naming: **4 hPa is not 4 hPa per 100 km.** One is a difference and the other is a difference divided by a distance, and they only happen to look alike because the distance in this case was 400 km rather than 100.\n\nAnd 10 is roughly 4 divided by 400 multiplied by 1000 -- the right shape with the wrong power of ten in it. Keeping the units written down is what catches that: **hPa divided by km, times 100 km, leaves hPa per 100 km**, and if your answer is not in those units you have not finished.",
            options: [
                { id: 'retry', label: "Gradient first, then multiply.", nextNodeId: 'explore' }
            ]
        },

        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Both dials are live. Two isobars are drawn at the distance you set, with the gradient and the forecast wind beside them.\n\nThings worth doing:\n\n- Hold the **Pressure Difference** at 4 hPa and walk the **Distance Between** from 100 km out to 1000 km. The lines spread apart and the wind falls from 104 km/h to 10 km/h. **You have changed nothing about the pressure at all.**\n- Now hold the distance at 400 km and raise the pressure difference. The lines stay where they are and the wind climbs. Both dials matter -- but only one of them is visible from across the room, and it is the spacing.\n- Find two different settings that give the **same wind**. There are many: 4 hPa over 400 km, 8 over 800, 2 over 200. **A gradient is a ratio, so it is the shape of the chart that matters and not its scale.**\n- Push it to 20 hPa over 100 km and look at what comes out. That is far outside anything the atmosphere does, and the formula answers anyway -- which is a reminder that a calibration knows nothing about what is physically possible.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Checkpoint", nextNodeId: 'checkpoint' }
            ]
        },

        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "Two forecasters are looking at tomorrow's chart for the same country.\n\n**Forecaster A** notices that the pressure difference across the country is **30 hPa**, much higher than yesterday's 12 hPa, and forecasts a far windier day.\n\n**Forecaster B** measures with a ruler. Yesterday's 12 hPa was spread over **300 km**. Today's 30 hPa is spread over **1500 km**.\n\nWho is right, and what is tomorrow's wind compared with yesterday's?",
            options: [
                { id: 'b', label: "B. Yesterday was 4 hPa/100 km and today is 2, so tomorrow is about half as windy, not more.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'a', label: "A. 30 hPa is more than twice 12 hPa, so it must be windier.", nextNodeId: 'checkpoint_wrong' },
                { id: 'same', label: "Neither -- you cannot compare two different days.", nextNodeId: 'checkpoint_wrong' }
            ]
        },

        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Work out both gradients and the comparison makes itself.\n\n- **yesterday:** 12 hPa / 300 km x 100 = **4 hPa per 100 km**, so about **104 km/h**\n- **today:** 30 hPa / 1500 km x 100 = **2 hPa per 100 km**, so about **52 km/h**\n\nSo today has **two and a half times the pressure difference and half the wind**, because it is spread over five times the distance.\n\nForecaster A has made a real mistake rather than a careless one. They used a quantity that genuinely does appear in the calculation -- the pressure difference is on the top of the fraction -- and forgot that it never appears alone. **A number that is only half of a ratio will mislead you in exactly the cases where the other half changed**, which here is most of them, because weather systems come in every size.\n\nAnd you certainly can compare two days: that is what the gradient is for. Turning both charts into hPa per 100 km puts them on the same footing, which is what a shared unit is always for.",
            options: [
                { id: 'retry', label: "Both gradients, then compare.", nextNodeId: 'checkpoint_correct' }
            ]
        },

        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "**Exactly -- and notice what you just did, because it is the move this whole Big Idea is built on.**\n\nYou cannot see tomorrow's wind. Nobody can. What you can see is a chart with lines on it, and you read the wind **off** the lines using a rule that somebody calibrated once. The chart is a **proxy**: a thing you can measure that stands in for the thing you actually want.\n\nThat is what predicting weather is. Not seeing the future -- **measuring something visible and knowing the rule that connects it to something you care about.**\n\nAnd it means every forecast has two ways to go wrong. The measurement can be wrong, or **the rule can be outside the range where it holds** -- which is why this lesson kept saying *in the middle latitudes* and *a measured figure*. A proxy with a calibration you do not know the limits of is a confident way to be wrong.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Read the wind off the lines!", nextNodeId: 'discovery' }
            ]
        },

        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You learned to read a weather chart with a ruler.**\n\n- **Isobars** join places of equal air pressure, measured in **hectopascals (hPa)**, usually one line every 4 hPa\n- **pressure gradient = pressure difference / distance**, in **hPa per 100 km**, measured straight across the isobars by the shortest route\n- **wind speed = about 26 km/h for each 1 hPa per 100 km** -- a **measured** figure for the middle latitudes, not something this lesson can derive\n- So it is the **spacing** of the lines that tells you the wind, not the numbers on them. Packed isobars mean wind, and you can see that from across the room\n- The same **4 hPa** gives **52 km/h** over 200 km and **13 km/h** over 800 km. Four times the distance, a quarter of the wind\n- 8 hPa over 200 km and 40 hPa over 1000 km give **exactly the same 104 km/h**, because both are 4 hPa per 100 km. **Five times the pressure difference, the same wind**\n- **4 hPa is not 4 hPa per 100 km.** A difference and a gradient look alike and are not, which is the commonest error here -- keep the units written down and they catch it\n- A gradient is a **ratio**, so many different charts give the same wind: 4 over 400, 8 over 800, 2 over 200\n- **A number that is only half of a ratio misleads you exactly when the other half changed** -- which for weather systems is most of the time, because they come in every size\n- And the move underneath all of it: you cannot see tomorrow's wind, so you measure a **proxy** -- lines on a chart -- and apply a rule somebody calibrated. **Predicting weather is reading something you want off something you can see**\n- **Still standing:** two things, and both are odd enough to be worth the next level. The **26 was handed over**, and it is not a universal constant -- it depends on **latitude**, and at the equator the rule falls apart entirely. And the wind does not blow from the high to the low at all: it blows **along** the isobars, round the lows rather than into them, which is why weather systems spin. **L3P26 derives the 26 and explains the right angle, and they turn out to be the same explanation.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Complete L2P26", nextNodeId: 'complete' }
            ]
        },

        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Physics Complete -- How Do We Predict Weather?**\n\nP26 said a bigger temperature gap makes more wind. This put a ruler on it.\n\n**Summary Table:**\n| | P26 said | L2P26 says |\n| --- | --- | --- |\n| What drives wind | a pressure difference | a pressure **gradient** |\n| The formula | -- | **gradient = difference / distance**, hPa per 100 km |\n| Turning it into wind | -- | about **26 km/h** per 1 hPa per 100 km |\n| What a forecaster reads | -- | the **spacing** of the isobars, not the numbers |\n| The same 4 hPa | -- | **52 km/h** at 200 km, **13** at 800 |\n| 8 over 200 and 40 over 1000 | -- | **the same 104 km/h** |\n| The commonest error | -- | treating **4 hPa** as **4 hPa per 100 km** |\n| What forecasting is | -- | reading a wanted quantity off a **visible** one |\n| Still standing | -- | the 26 depends on **latitude**, and the wind blows **along** the lines |\n\n**The one line to remember:** the wind is set by how fast the pressure changes with distance rather than by how much it changes, so a forecaster reads the spacing of the isobars and not the numbers on them -- and a pressure difference quoted without its distance is half a quantity.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}

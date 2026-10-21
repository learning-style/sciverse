import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 26, chemistry. Mechanism + Limit.
 *
 * L2C26 compared the surroundings' cooling rate with the 10 C/km a rising bubble
 * cools at, and stated its condition: that holds only while nothing inside the
 * bubble condenses. Remove it.
 *
 * A rising bubble reaches its cloud base and water vapour starts turning to liquid,
 * releasing latent heat (L3C1) inside it. So from there up it cools at about
 * 5.5 C/km rather than 10 -- stated as a working average, because the real saturated
 * rate runs from about 4 to 7.
 *
 * That gives TWO criteria instead of one, and a band between them:
 *
 *   below the cloud base: unstable if the surroundings cool faster than 10
 *   above the cloud base: unstable if they cool faster than 5.5
 *
 * Between 5.5 and 10 the air is stable for a dry bubble and unstable for a saturated
 * one -- conditionally unstable, a 4.5 C/km band which is 56% of the plausible range,
 * so most days are in it. Nothing happens on its own; lift the bubble to its cloud
 * base and it goes.
 *
 * The bubble's worst moment is exactly AT the cloud base, and it claws back above.
 * Breaking even at
 *
 *   h = 4.5 x base / (rate - 5.5)
 *
 * where the 4.5 is the 10 - 5.5 penalty paid on the way up -- the level of free
 * convection. Verified against a direct walk: rate 7 with a 1 km base is -3.00 C at
 * the base and breaks even at 3.00 km exactly.
 *
 * So L2C26 said "quiet" for days that produce thunderstorms, and the missing word is
 * TRIGGER: a front, a hill, a hot patch of ground doing the lifting.
 *
 * Frame of reference stated: heights are above the ground, and the difference is the
 * bubble's temperature minus the surrounding air's at the same height.
 *
 * Still standing: 5.5 is an average that depends on temperature and pressure, and
 * nothing here says how much work a trigger must do to lift the bubble that far.
 */
export function getL3C26Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2C26 handed you a clean test. Measure how fast the surrounding air cools with height, compare it with **10 °C per km**, and you know whether to expect storms.\n\nIt also stated a condition, and then went quiet about it: **that 10 holds only while nothing inside the bubble condenses.**\n\nFollow the bubble and you can see the problem coming. It rises, it cools, and the air inside it gets closer and closer to the temperature at which its water vapour must start turning to liquid. Sooner or later it gets there. **That height is its cloud base** -- the height where you would see the bottom of the cloud, which L3C8 worked out how to find.\n\nAnd above that height the arithmetic changes, because condensing is not a quiet process. **Turning vapour into liquid releases heat** -- the latent heat of L3C1 -- and it releases it *inside the bubble*. So the bubble is still expanding and still losing warmth to that, but now it is also being warmed from within.\n\nIt therefore cools **more slowly**. Not a little more slowly:\n\n**about 5.5 °C per km instead of 10**\n\nThat 5.5 is a working average and it genuinely varies -- from about 4 in warm humid air near the ground to about 7 higher up -- because how much heat gets released depends on how much vapour there is to condense. We will use 5.5 and remember that it is an average.\n\nSo your two dials are the surroundings and the height where everything changes.\n\n- **The Surroundings' Cooling Rate**, in °C per km, as before.\n- **Cloud Base**, in km -- the height at which condensation starts inside the bubble.\n\nBefore any arithmetic. L2C26 said that a surroundings rate of **7** means a quiet day, because 7 is less than 10. Is that still right?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'depends', label: "Only below the cloud base -- above it the bubble is being compared with 5.5, and 7 beats that.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'still', label: "Yes -- 7 is below 10, so the bubble always sinks back.", nextNodeId: 'misconception' }
            ]
        },

        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "It is right for the part of the journey L2C26 was looking at, and that part ends at the cloud base.\n\nPut the numbers side by side for a surroundings rate of **7 °C per km**:\n\n- **below** the cloud base, the bubble cools at 10. (7 - 10) = **-3 per km**. The bubble falls behind by three degrees every kilometre, exactly as L2C26 said. It is losing\n- **above** the cloud base, the bubble cools at 5.5. (7 - 5.5) = **+1.5 per km**. Now the bubble is **gaining** a degree and a half every kilometre\n\nSame day, same air, same bubble. **The comparison reversed because the number being compared with changed.**\n\nSo a rate of 7 does not mean *quiet*. It means **quiet below the cloud base and unstable above it**, which is a completely different forecast and a far more interesting one -- because it says the day is loaded, and is waiting for something.\n\nAnd 7 is not a special case. **Anything between 5.5 and 10 does this**, which is most of the range a balloon ever measures.",
            options: [
                { id: 'cont', label: "So write down both criteria.", nextNodeId: 'defining' }
            ]
        },

        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "There are two tests now, one for each part of the climb:\n\n- **below the cloud base:** the bubble rises only if the surroundings cool faster than **10**\n- **above the cloud base:** it rises only if they cool faster than **5.5**\n\nWhich splits every possible day into three kinds, and the middle one is new.\n\n| Surroundings' rate | Dry bubble | Saturated bubble | The day |\n| --- | --- | --- | --- |\n| below **5.5** | sinks | sinks | genuinely stable. Nothing will make it storm |\n| **5.5 to 10** | sinks | rises | **conditionally unstable** |\n| above **10** | rises | rises | unstable outright. It storms by itself |\n\nThat middle band is **4.5 °C per km** wide. Set against the 4-to-12 range a balloon realistically returns, it is **56% of all days** -- so the ordinary state of the atmosphere is neither of L2C26's two answers.\n\n**Conditionally unstable** means exactly what it says: unstable **on condition that** something gets the bubble up to its cloud base. Nudge it a little and it sinks straight back, because below the base it is in the losing regime. Lift it far enough and it crosses into the winning one and goes on its own.\n\nSo the forecast for a conditionally unstable day is not *storms* and not *no storms*. It is **storms if something lifts the air far enough**, and the forecaster's next job is to go and look for that something.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'network' } },
            options: [
                { id: 'work', label: "How far is far enough?", nextNodeId: 'worked' }
            ]
        },

        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**Follow one bubble all the way.** Surroundings cooling at **7 °C per km**, cloud base at **1 km**.\n\n| Height | Bubble minus surroundings |\n| --- | --- |\n| 0.5 km | **-1.5 °C** |\n| **1.0 km** | **-3.0 °C** | \n| 1.5 km | **-2.25 °C** |\n| 2.0 km | **-1.5 °C** |\n| 3.0 km | **0.0 °C** |\n| 4.0 km | **+1.5 °C** |\n\nRead the middle of that column. **The worst moment is exactly at the cloud base.** Below it the bubble is falling three degrees behind per kilometre; above it, it is clawing back one and a half. So the deficit grows to -3 °C and then shrinks away.\n\nAnd you can work out where it breaks even. Above the base the gap closes at (rate - 5.5) per km, and the deficit it has to make up is the **4.5** per km it lost on the way -- the 10 minus the 5.5 -- multiplied by the height of the base. So\n\n**breaking even at h = 4.5 x base / (rate - 5.5)**\n\n4.5 x 1 / (7 - 5.5) = 4.5 / 1.5 = **3 km**\n\nMeteorologists call that height the **level of free convection**: above it the bubble needs no help at all.\n\n**Now the thing a forecaster uses this for.** Raise the cloud base to **2 km** on the same day:\n\n4.5 x 2 / 1.5 = **6 km**\n\nThe bubble must now be hauled twice as high before it can look after itself, and the deficit at the base is twice as deep. **A higher cloud base makes a storm much harder to start**, which is why humid mornings are the dangerous ones -- more vapour means condensation starts lower, which means a shallower hole to climb out of.",
            options: [
                { id: 'check', label: "Let me try one.", nextNodeId: 'math_check' }
            ]
        },

        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "Your turn. The surroundings cool at **9 °C per km** and the cloud base is at **1.5 km**.\n\nAt what height does the bubble break even and stop needing help?",
            options: [
                { id: 'onenine', label: "About 1.9 km", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'four', label: "About 4.5 km", nextNodeId: 'math_wrong' },
                { id: 'never', label: "Never — 9 is less than 10, so it always sinks.", nextNodeId: 'math_wrong' }
            ]
        },

        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Put it in: 4.5 x 1.5 / (9 - 5.5) = 6.75 / 3.5 = **1.93 km**.\n\nSo on this day the bubble only has to get about **0.4 km above its cloud base** before it is self-sustaining. That is a day a small hill could set off.\n\n4.5 km is the top of the fraction used as the answer -- 4.5 x 1.5 = 6.75 is the **deficit in degrees** that has to be made up, not a height, and dividing by 3.5 °C per km is what turns it into one. **Watch the units: degrees divided by degrees-per-km leaves km**, and skipping that step leaves you with a number that is not a height at all.\n\nAnd *never* is L2C26's answer, correctly applied to the wrong half of the climb. 9 is indeed less than 10, so the bubble does sink back **below** the cloud base -- which is why it needs lifting. Above the base it is compared with 5.5, and 9 beats that comfortably. **Below 10 means it will not start by itself. It does not mean it cannot run.**",
            options: [
                { id: 'retry', label: "Degrees over degrees-per-km leaves km.", nextNodeId: 'explore' }
            ]
        },

        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Both dials are live. The bubble's path is drawn with its kink at the cloud base -- steep below, shallow above -- against the surroundings' straight line.\n\nThings worth doing:\n\n- Set the rate to **7** and the cloud base to **1 km**. Watch the bubble's line fall behind, **kink at the base**, and then converge back. The point where the two lines meet is where it stops needing help.\n- Now raise the **Cloud Base** and watch that meeting point run away upward: 1 km gives 3 km, 1.5 gives 4.5, 2 gives 6. **The higher the cloud base, the deeper the hole and the longer the climb out.**\n- Put the rate at **5** and try every cloud base. The lines **never** meet, because 5 is below 5.5 and the bubble is losing even when saturated. That is a genuinely stable day and nothing will make it storm.\n- Put the rate at **11** and look at the shape. The bubble is **ahead from the very first metre** -- no kink needed, no trigger needed. That is L2C26's outright unstable day, and it is the rarer case.\n- Walk the rate slowly from 5 to 11 and watch the picture change **kind** twice: never meets, meets high up, never falls behind at all. **Two thresholds, three kinds of day.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Checkpoint", nextNodeId: 'checkpoint' }
            ]
        },

        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "A morning balloon gives a surroundings rate of **8 °C per km** with a cloud base at **1 km**. The forecaster puts out a warning: **thunderstorms possible this afternoon, mainly over the hills.**\n\nA colleague objects. 8 is less than 10, so by L2C26's test every bubble sinks back. Why mention hills at all?",
            options: [
                { id: 'trigger', label: "Because the day is conditionally unstable: the bubble breaks even 1.8 km up, and a hill is something that can lift it that far.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "The colleague is right — 8 is below 10, so no storms are possible.", nextNodeId: 'checkpoint_wrong' },
                { id: 'hills', label: "Hills are colder, so the air above them cools faster and the rate is really above 10 there.", nextNodeId: 'checkpoint_wrong' }
            ]
        },

        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Work out both halves of the climb for a rate of 8.\n\n- below 1 km: (8 - 10) = **-2 per km**, so the bubble is **2 °C behind** by the time it reaches its cloud base. It will not get there on its own\n- above 1 km: (8 - 5.5) = **+2.5 per km**, so it closes that 2 °C gap in 4.5 x 1 / 2.5 = **1.8 km**\n\nSo the day is **loaded**. Everything needed for a thunderstorm is present except the one thing the atmosphere cannot supply by itself: something to haul a bubble of air from the ground up past 1.8 km.\n\n**A hill does exactly that.** Wind blowing against rising ground has nowhere to go but up, and a few hundred metres of hill lifts whole layers of air through the hardest part of the climb. So do **fronts**, where one body of air slides over another, and so does a patch of ground that gets unusually hot.\n\nThat is why the forecast names the hills. **It is not forecasting instability -- it has already established that. It is forecasting where the trigger will be**, which is a different question and the one real forecasting mostly consists of.\n\nAnd the third answer has the mechanism backwards. The hills matter because they **lift** air mechanically, not because they change the lapse rate above them.",
            options: [
                { id: 'retry', label: "Loaded, and waiting for a lift.", nextNodeId: 'checkpoint_correct' }
            ]
        },

        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "**Exactly -- and that is why real forecasts are phrased the way they are.**\n\n*Thunderstorms possible, mainly over the hills* is not vagueness. It is a precise statement of two separate findings: **the atmosphere is conditionally unstable** (which the balloon established) and **the trigger will be orographic** (which the map established). Neither on its own forecasts a storm.\n\nAnd look at what removing one condition did to L2C26.\n\nThat lesson's test was not wrong -- it was **the test for one half of the journey**, applied to the whole of it. Its 10 °C per km was a real number with a real meaning, and the sentence *this holds while nothing condenses* was carrying the entire distinction between *nothing will happen* and *everything is ready and waiting*.\n\n**A stated condition is not a footnote. It is the boundary of the answer**, and here it was the boundary between the two most common kinds of day.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Loaded, and waiting for a trigger!", nextNodeId: 'discovery' }
            ]
        },

        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You split L2C26's one test into two, and a new kind of day appeared between them.**\n\n- A rising bubble reaches its **cloud base** and vapour starts condensing, which **releases latent heat** inside it. So above that height it cools at about **5.5 °C per km** rather than 10 -- an average, since the real figure runs from about 4 to 7\n- **Two tests:** below the base the bubble rises only if the surroundings cool faster than **10**; above it, faster than **5.5**\n- **Three kinds of day.** Below 5.5: genuinely stable, nothing will make it storm. Above 10: unstable outright, it storms by itself. **Between: conditionally unstable**\n- That middle band is **4.5 °C/km** wide -- about **56%** of the range a balloon realistically returns. **The ordinary state of the atmosphere is neither of L2C26's two answers**\n- A rate of **7** gives **-3 per km** below the base and **+1.5 per km** above it. Same day, same bubble, and **the comparison reversed because the number being compared with changed**\n- **The worst moment is exactly at the cloud base.** The deficit grows to -3 °C there and then shrinks away\n- Breaking even at **h = 4.5 x base / (rate - 5.5)**, where the **4.5** is the 10 - 5.5 penalty paid on the way up. Rate 7, base 1 km: **3 km**. Meteorologists call it the **level of free convection**\n- Degrees divided by degrees-per-km leaves **km** -- and 4.5 x base is a **deficit in degrees**, not a height\n- **A higher cloud base makes a storm much harder to start**: base 2 km on the same day pushes breaking even to **6 km**. Which is why humid mornings are the dangerous ones -- more vapour, a lower base, a shallower hole\n- So a conditionally unstable day is **loaded**. It needs a **trigger** -- a hill, a front, a hot patch -- to haul the air through the hardest part, and *thunderstorms possible, mainly over the hills* is two separate findings stated precisely\n- Which means L2C26's test was never wrong. **It was the test for one half of the journey, applied to the whole of it** -- and its quiet sentence *while nothing condenses* was carrying the difference between *nothing will happen* and *everything is ready*\n- **A stated condition is not a footnote. It is the boundary of the answer**\n- **Still standing:** the 5.5 is an average that depends on temperature and pressure, so a real sounding needs the local value rather than one number. And nothing here says **how much work** a trigger has to do to lift a bubble that far -- which is the quantity forecasters actually compute, and it needs the area between those two lines rather than the height where they cross.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Complete L3C26", nextNodeId: 'complete' }
            ]
        },

        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Chemistry Complete -- How Do We Predict Weather?**\n\nL2C26 had one threshold. Taking away one sentence gave it two, and most days live between them.\n\n**Summary Table:**\n| | L2C26 said | L3C26 says |\n| --- | --- | --- |\n| The bubble's cooling | **10 °C/km**, always | 10 **below** the cloud base, **5.5** above |\n| Why it changes | -- | **condensing releases latent heat** inside it |\n| The test | one: is the rate above 10? | **two**, one for each half of the climb |\n| Kinds of day | two | **three** -- and the middle one is new |\n| The middle band | -- | **5.5 to 10**: conditionally unstable, **56%** of days |\n| At rate 7 | quiet | **-3 per km** below the base, **+1.5** above |\n| The worst moment | -- | exactly **at the cloud base** |\n| Breaking even | -- | **h = 4.5 x base / (rate - 5.5)**, the level of free convection |\n| A higher cloud base | -- | a **deeper hole**: 2 km base pushes it to 6 km |\n| What a forecast says | storms or not | **storms if something lifts it**, then find the trigger |\n| Still standing | -- | 5.5 varies, and the **work** a trigger must do |\n\n**The one line to remember:** a bubble cools at 10 °C per km until its water starts condensing and then at only 5.5, so there are two thresholds and not one -- and between them sits the commonest kind of day, which will not storm on its own and will storm the moment a hill or a front lifts it high enough.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}

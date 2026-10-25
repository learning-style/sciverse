import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 26, biology. The synthesis lesson. Mechanism + Limit.
 *
 * Rewritten twice. The first version fitted a straight line to Dolbear's chirp curve and
 * a reader said, rightly, that it had almost no biology in it. The second had the right
 * subject -- development on accumulated warmth -- and too much apparatus: a base
 * temperature, a product unit, a species constant K on a DIAL, a daily scatter, a
 * square-root law, a spell length and a comparison with forecast doubling. Seven things.
 *
 * This version fixes the corn's own numbers (base 10 C, 700 degree-days) and makes BOTH
 * dials the weather: how warm on average, and how much it bounces day to day. That buys
 * a clean separation the earlier version buried --
 *
 *   the AVERAGE sets the date; the SWING only sets how sure you can be of it
 *
 * -- which is visible on the dials, because turning the swing up widens the window and
 * does not move the date one day.
 *
 * Cut: the K dial, the K scaling table, the three-row precision table, the four-times-the-
 * wait table. Kept: the degree-day as a product unit (a reader asked what it measures,
 * and the light-year parallel is the answer), the square root stated once, and the spell
 * limit as the single Level 3 limit with one figure.
 *
 * Also defines a TASSEL, which the earlier versions used without ever saying what it is.
 *
 * The result is still the exciting one: 3 x sqrt(70) = 25 degree-days of doubt in the
 * total, which is +/- 2.5 days seventy days out, against a weather forecast that expires
 * in a fortnight. Verified against a 40,000-run simulation at sd 2.54 days.
 *
 * Frames stated: every total is degree-days above the base accumulated from sowing, and
 * every window is a spread in the date one planting tassels.
 *
 * Still standing: real weather comes in spells, so the days are not independent and the
 * honest window is wider; development is not exactly linear above the base; and above
 * about 35 C heat slows it again, so the real response has a peak this does not model.
 */
export function getL3B26Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2B26 used a cricket as a thermometer: count the chirps, and you have the temperature **right now**.\n\nThat is a strange thing for an organism to be. The cricket is useful because its chirping tracks the **present** temperature and forgets everything else -- and almost nothing else alive works that way. **Most living things add the temperature up.**\n\nSo here is a **corn** plant -- maize, if that is the name you know it by -- and one date in its life that matters.\n\nA corn plant grows one thick stalk, and at the very top it finally pushes out a **tassel** -- a loose plume of pale spikelets, like a feather duster. The tassel is where the plant's **pollen** comes from: it opens, sheds pollen onto the silks below, and the cobs are set. **Tasselling is the moment the plant becomes ready to breed**, and a grower wants to know the date in advance -- it decides when to irrigate and when the crop is most easily ruined by a hot, dry week.\n\nAnd the plant does not tassel on a date. It does not tassel after a fixed number of days either. **It tassels when it has collected enough warmth.**\n\nHere is how the warmth is counted. Corn does not grow at all below **10 °C** -- its **base temperature**. So for each day, take the day's mean temperature, subtract the 10, and whatever is left is what the plant banked that day:\n\n**today's degree-days = daily mean − 10 °C**, and **zero** if the day is colder than 10\n\nA 20 °C day banks 10. A 15 °C day banks 5. A 9 °C day banks **nothing** at all.\n\n**And corn needs about 700 of them to tassel.** Your two dials are both the weather: **Mean Daily Temperature** in °C, and **Day-to-Day Swing** in °C, which is how much the daily temperature bounces around that mean.\n\nBefore any arithmetic. A summer averaging 20 °C. Roughly when does it tassel?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'seventy', label: "Around day 70 — it banks 10 a day, and 700 ÷ 10 = 70.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'thirtyfive', label: "Around day 35 — a 20 °C day surely banks 20.", nextNodeId: 'misconception' }
            ]
        },

        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "The subtraction is the whole point, so it is worth being slow about it.\n\nA 20 °C day does not bank 20. It banks **20 − 10 = 10**, because the first ten degrees buy nothing -- below 10 °C the plant is not growing, so only the warmth **above** the base counts:\n\n700 ÷ 10 = **day 70**\n\nAnd being careless with that subtraction hides something worth seeing. Watch what it does across different summers:\n\n| Average summer | Banked per day | Tassels on |\n| --- | --- | --- |\n| 30 °C | 20 | **day 35** |\n| 20 °C | 10 | **day 70** |\n| 15 °C | 5 | **day 140** |\n| 12 °C | 2 | **day 350** |\n| 10 °C | **0** | **never** |\n\n**Look at the bottom.** Dropping from 20 °C to 15 -- five degrees -- *doubles* the time. Three degrees further down and it needs most of a year. And at 10 °C the plant does not tassel slowly, it **never tassels at all**, because nothing is being banked.\n\nThat is a much sharper statement than *corn likes warm weather*, and it is why there is a line on the map north of which nobody grows it. **Because the base is subtracted first, a cool summer is not slightly worse. It is disproportionately worse.**",
            options: [
                { id: 'cont', label: "So what is a degree-day, exactly?", nextNodeId: 'defining' }
            ]
        },

        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "A fair question, because the **name** is misleading in exactly the way *light-year* is. A light-year sounds like a time and is a **distance** -- how far light gets in a year. A degree-day sounds like a temperature, and it is not one.\n\n**It is a temperature multiplied by a time.** One degree-day is **one degree above the base, held for one day**. And because the two are multiplied, they trade against each other:\n\n| Degrees above base | For how long | Degree-days |\n| --- | --- | --- |\n| 1 | 1 day | **1** |\n| 10 | 1 day | **10** |\n| 1 | 10 days | **10** |\n| 5 | 4 days | **20** |\n\nYou have met this shape on an electricity bill. A **kilowatt-hour** is not a power and not a time -- it is one times the other, which is why a 2 kilowatt heater for 3 hours and a 6 kilowatt heater for 1 hour cost the same.\n\nSo **700 degree-days is a budget**, not a temperature and not a date. The plant must bank 700 of these units, and **it does not care how fast it banks them** -- a cool slow summer and a hot quick one get it to the same place. Dividing settles the date, and the units check themselves:\n\n**700 degree-days ÷ 10 degree-days per day = day 70**\n\nDegree-days over degree-days-per-day leaves **days**, which is the thing you wanted.\n\nAnd that *does not care how fast* is worth holding on to. **The plant keeps one running total and throws away the order**, so two summers that reach 700 by completely different routes tassel on the same day.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'network' } },
            options: [
                { id: 'work', label: "But you cannot know the weather for 70 days.", nextNodeId: 'worked' }
            ]
        },

        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**Exactly the objection to make**, and it is where the lesson turns.\n\nTo know the date you would need seventy days of weather in advance, and **L2P25 proved you cannot have it.** Forecast errors double about every day and a half, so past roughly a fortnight a forecast tells you nothing. Seventy days is hopeless.\n\nSo this prediction ought to be worthless. **Growers make it anyway, and they are right to within a few days.** Here is why.\n\nYou do not need to know any individual day. You only need the **total**. And the second dial is the thing that would wreck a forecast: the **Day-to-Day Swing**, how far a typical day lands from the average. Call it **3 °C** for a normal summer.\n\nNow -- does that 3 °C of daily ignorance pile up over seventy days into 70 × 3 = 210 degree-days of doubt? **No, and this is the whole trick.** Some days land above the average and some below, so they partly **cancel**. **L2B16** gave you the rule for this: independent errors add through their **squares**, which means the doubt in a total of n days grows like the **square root** of n, not like n:\n\n**3 × √70 = about 25 degree-days of doubt**, not 210\n\nTwenty-five out of seven hundred is **3.6%**. Turn it back into a date by dividing by the 10 degree-days banked each day:\n\n**25 ÷ 10 = ± 2.5 days**\n\n**Day 70, give or take two and a half days -- seventy days ahead.** Every single day in there is still 3 °C uncertain. That ignorance has not gone anywhere; it has just been **diluted** by sixty-nine other days.\n\nAnd notice what each dial did. The **average** decided the date. The **swing** decided only how sure you are of it.",
            options: [
                { id: 'check', label: "Let me try one.", nextNodeId: 'math_check' }
            ]
        },

        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "Your turn, and it is a prediction a grower might really want.\n\nA wilder summer: the average is still **20 °C**, so the plant still banks 10 a day and still tassels around day 70. But the **Day-to-Day Swing** is **6 °C** instead of 3 -- twice as jumpy.\n\nWhat happens to the date and to the window around it?",
            options: [
                { id: 'double', label: "Still day 70, but the window doubles to about ± 5 days", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'earlier', label: "The date moves, because bigger swings mean more hot days", nextNodeId: 'math_wrong' },
                { id: 'root', label: "Still day 70, and the window grows by √2 to about ± 3.5 days", nextNodeId: 'math_wrong' }
            ]
        },

        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Keep the two dials in separate boxes, because this is the distinction worth taking away.\n\n**The date does not move.** The average is unchanged at 20 °C, so the plant still banks 10 degree-days a day and still needs 700 of them. A bigger swing means more hot days **and** more cold days, and they cancel in the total -- which is the whole reason the method works. **A swing is not a warming.**\n\n**The window doubles.** The doubt is σ × √n, and only σ changed:\n\n6 × √70 = **50 degree-days**, then 50 ÷ 10 = **± 5 days**\n\nThe √2 answer confuses the two roles. The square root applies to the **number of days**, because that is what the cancelling works across. The **swing** multiplies in directly -- twice as jumpy a summer is exactly twice as uncertain a date.\n\nSo the two dials really are doing separate jobs:\n\n| | sets | by |\n| --- | --- | --- |\n| **Mean Daily Temperature** | the **date** | 700 ÷ (mean − 10) |\n| **Day-to-Day Swing** | the **window** | swing × √days ÷ (mean − 10) |\n\n**One tells you when. The other tells you how much to trust it.**",
            options: [
                { id: 'retry', label: "Same date, double the window.", nextNodeId: 'explore' }
            ]
        },

        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Both dials are live. The corn plant grows as it banks warmth and pushes out its **tassel** when the total is reached; the column beside it is the warmth collected, with the 700 it needs marked across the top and the doubt in that total shaded around it.\n\nThings worth doing:\n\n- Start at **20 °C** and a swing of **3**. The plant tassels on **day 70, ± 2.5 days**\n- Now move **only the swing**, from 1 up to 6, and watch carefully: the shaded band around 700 gets wider and wider, and **the day never changes**. 1 gives ± 0.8 days, 6 gives ± 5.0. **The swing buys doubt, not time**\n- Put the swing back to 3 and move **only the average**. Now the date moves a long way -- 30 °C tassels on day 35, 15 °C on day 140 -- and notice the window moves *with* it, because a slow plant banks less each day so every degree-day of doubt costs more time\n- Take the average down to **10 °C** exactly. The column stops filling, the plant stays short and **no tassel ever appears**. Not slow -- stopped\n- And take it to **30 °C** with a swing of **1**: **day 35, ± 0.3 days**. That is a biological date called to within eight hours, five weeks ahead, which no weather forecast anywhere can do",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Checkpoint", nextNodeId: 'checkpoint' }
            ]
        },

        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "The ± 2.5 days leaned on one word in L2B16's rule: errors add through their squares **if they are independent.**\n\nReal weather is not. Warm and cool periods arrive in **spells** of several days -- if today is 3 °C above average, tomorrow probably is too.\n\nSuppose spells last about 5 days. Is the real window better or worse than ± 2.5 days?",
            options: [
                { id: 'worse', label: "Worse — a 70-day season holds only about 14 independent spells instead of 70 independent days, so there is less cancelling and the window roughly doubles, to ± 5.6 days.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'better', label: "Better — spells even out over a whole season.", nextNodeId: 'checkpoint_wrong' },
                { id: 'same', label: "The same — the season still contains 70 days however they are arranged.", nextNodeId: 'checkpoint_wrong' }
            ]
        },

        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The cancelling needs **independent** days, so count how many independent things there really are.\n\nIf a warm patch lasts 5 days, then a 70-day season does not contain 70 independent chances to cancel. It contains about **70 ÷ 5 = 14** -- and each one leans on the total for five days running instead of one. Fewer, bigger pushes, with less to cancel against.\n\nWork it through and the window is about **± 5.6 days** instead of ± 2.5. Roughly **twice as wide**, because the amount of cancelling you get depends on how many independent pushes there are, and there are five times fewer of them.\n\nSo *the same* is wrong: the number of **days** has not changed, but the number of **independent** days has, and that is what the square root counts. And *better* is the tempting one -- spells feel like they should average out, but they are the thing that **needs** averaging out. Clumping the same scatter into fewer, larger lumps leaves less of it to cancel.\n\n**And look where even the honest figure lands.** ± 5.6 days, seventy days ahead, built on a weather forecast that is worthless after a fortnight. Twice as bad as the naive answer and still something no forecast can touch.",
            options: [
                { id: 'retry', label: "Fewer independent pushes, each bigger.", nextNodeId: 'checkpoint_correct' }
            ]
        },

        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "**And that closes the Big Idea, by answering its question in a way the other lessons could not.**\n\nEvery lesson so far tried to predict the weather. L2P26 read the wind off the isobars, L2C26 compared two cooling rates, L2B26 read a temperature off a cricket -- and each Level 3 lesson found the hidden dependence inside the constant and the range where the rule died.\n\nThis lesson stops predicting the weather and **predicts something the weather adds up to instead.**\n\n| | What it predicts | How far ahead |\n| --- | --- | --- |\n| a weather forecast | the weather on **one named day** | about **15 days** |\n| a degree-day sum | the date a **total** is reached | **months** |\n\nAnd the reason is one fact seen from two sides. **Weather is unpredictable day by day, and a total does not care about days.** The swings, the spells, the chaos of Big Idea 25 -- all of it is exactly what cancels in a running sum. The plant is not beating the noise. **It is built not to hear it.**\n\nSo the full answer to *how do we predict weather* finishes like this: for most of what people actually need to know -- when to sow, when to irrigate, when the pollen will fly -- **do not predict the weather. Predict the thing that adds it up.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Predict the total, not the days!", nextNodeId: 'discovery' }
            ]
        },

        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found a prediction that beats the forecast it is built on.**\n\n- The cricket of L2B26 is rare: an organism that tracks the **present** temperature and forgets the rest. **Most living things add it up**\n- A corn plant's **tassel** is the plume at the top of the stalk that sheds its **pollen**, so tasselling is when it becomes ready to breed -- a date a grower needs in advance\n- Corn does not grow below **10 °C**, its **base temperature**, so **today's degree-days = daily mean − 10**, and **zero** on a colder day. Corn needs about **700** to tassel\n- **A degree-day is a temperature times a time**, misleading like *light-year*: one degree above the base, held for one day. So 10 degrees for 1 day and 1 degree for 10 days are both **10 degree-days** -- the same shape as a **kilowatt-hour**\n- So 700 is a **budget**, not a temperature and not a date, and **the plant does not care how fast it is spent**. Two different summers reaching 700 tassel on the same day: a running total **throws away the order**\n- 700 ÷ 10 = **day 70**, and the units check themselves -- degree-days over degree-days-per-day leaves days\n- Because the base is subtracted **first**, cool summers are **disproportionately** worse: 20 °C gives day 70, 15 °C day 140, 12 °C day 350, and 10 °C **never**\n- Predicting day 70 needs seventy days of weather, which **L2P25 proved impossible** past a fortnight. It works anyway\n- **Because the daily errors cancel.** A 3 °C swing over 70 days does **not** pile up to 210 degree-days of doubt: independent errors add through their **squares** (L2B16), so the doubt grows like **√n**. **3 × √70 = 25 degree-days**, which is **3.6%** of 700, and 25 ÷ 10 = **± 2.5 days**\n- Each day is still 3 °C uncertain. That ignorance was not removed, it was **diluted** by sixty-nine others\n- **The two dials do separate jobs.** The **average** sets the **date**; the **swing** sets only the **window**. Double the swing and the date does not move a single day while the window doubles -- **a swing is not a warming**, because extra hot days and extra cold days cancel\n- **The limit is that one word, independent.** Weather comes in **spells**: five-day spells leave about **14** independent pushes instead of 70, each leaning for five days, so there is less cancelling and the window is about **± 5.6 days**. Still far beyond any forecast\n- **The close:** every other lesson here tried to predict the weather and found where its rule died. This one changes the question -- and wins, because **everything that makes tomorrow uncertain is what cancels in a total.** The plant is not beating the noise; it is built not to hear it\n- **So: do not predict the weather. Predict the thing that adds it up**\n- **Still standing:** the days were taken as independent, and spells are the honest correction. Development is not exactly linear above the base. And above about **35 °C** heat slows corn down again, so the real response has a **peak** that none of this models.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Complete Big Idea 26, Level 3", nextNodeId: 'complete' }
            ]
        },

        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- How Do We Predict Weather?**\n\nThree lessons took Level 2's borrowed constants apart. The last one changed the question.\n\n**Summary Table:**\n| | Physics (L3P26) | Chemistry (L3C26) | Biology (L3B26) |\n| --- | --- | --- | --- |\n| Level 2's rule | wind from isobar **spacing** | compare cooling with **10 °C/km** | a cricket reads the temperature **now** |\n| What was hidden | **sin(latitude)** | whether **condensation** started | most living things **add** it up |\n| The quantity | 1/(ρf) × Δp/Δn | 4.5 × base / (rate − 5.5) | **daily mean − 10**, summed to 700 |\n| In numbers | 26 km/h at latitude 50 | lift it to **3 km** | **day 70, ± 2.5 days** |\n| The threshold | **f = 0** at the equator | the **cloud base** | the **base temperature**: below it, nothing |\n| What it buys | the rule **and** its range | the trigger a forecast must find | a date **months** ahead |\n| The honest limit | the middle latitudes only | 5.5 is an average | warm **spells**: ± 5.6, not 2.5 |\n\n**What ties them together:** the physics and the chemistry each found a dependence hiding inside a constant, and each ended where that dependence began to bite. The biology found something different -- that what makes weather hard to predict is **day-to-day** variation, and a living thing keeping a running total is immune to exactly that.\n\n**The one line to remember:** a forecast of the weather dies in a fortnight because its errors double every day and a half, while a forecast of what the weather **adds up to** survives for months because its errors only grow as a square root -- so to see far ahead, stop asking about days and ask about totals.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}

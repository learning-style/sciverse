import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 26, biology. The synthesis lesson. Mechanism + Limit.
 *
 * This replaces an earlier L3B26 that fitted a straight line to Dolbear's chirp curve.
 * A reader pointed out that the lesson had almost no biology in it -- strip it down and
 * it was approximation theory, a chord through a convex curve, with one line of biology
 * as a premise. The P/C/B slot has to earn its discipline, so the topic changed.
 *
 * What is actually biological, actually about predicting weather, and unowned: an
 * organism develops on ACCUMULATED warmth rather than calendar time.
 *
 *   degree-days today = daily mean temperature - base temperature  (0 if below)
 *   the event happens when the running total reaches the species constant K
 *
 * Maize: base 10 C, K = 700 C.day from sowing to tasselling. A mean of 20 C gives
 * 10 degree-days a day, so 700/10 = 70 days.
 *
 * The base temperature is L2B26's 13 C silence promoted from a nuisance to a
 * mechanism: there the cricket's silence was an instrument limit, here nothing
 * accumulates below the base at all. Same kind of number, structural role.
 *
 * Then the result the lesson is really for. Daily means scatter about the seasonal mean
 * by sigma = 3 C. Errors add through their squares -- L2B16's rule, reused -- so the
 * spread of the accumulated total after n days is sigma x sqrt(n) = 3 x sqrt(70) = 25
 * C.day, which is 3.6% of 700; dividing by the 10 C.day a day converts it back into a
 * date as +/- 2.5 days. Verified against a 40,000-run simulation: sd 2.54 days.
 *
 * So the contrast that closes the Big Idea. Big Idea 25 owns the weather half: forecast
 * error DOUBLES every 1.5 days and is useless past about 15. Here the error grows as
 * sqrt(n), so four times the wait only doubles the uncertainty -- 280 days ahead is
 * +/- 5 days. A prediction that DEPENDS on the weather beats a prediction OF the
 * weather, because the plant does not care which days were warm, only the total, and a
 * sum destroys exactly the day-to-day noise that defeats forecasting.
 *
 * The Limit is the independence the sqrt(n) needs. Real weather comes in spells: if
 * deviations persist for L days there are n/L independent blocks each contributing
 * L x sigma, so the variance is n x L x sigma^2 and the spread is sqrt(L) LARGER.
 * Five-day spells give +/- 5.6 days rather than 2.5 -- confirmed by simulation at sd
 * 5.62 -- and still far better than any weather forecast. (I first wrote this with the
 * spell factor inverted, making spells help; the simulation caught it.)
 *
 * Frames stated: every total is degree-days above the base accumulated from sowing, and
 * every uncertainty is a spread in the predicted date of one event for one planting.
 *
 * Still standing: development is not exactly linear above the base; the daily MEAN
 * hides the daily swing, and when the swing crosses the base temperature the mean
 * over-counts; and there is an upper threshold where heat slows development again, so
 * the real response has a peak this lesson does not model.
 */
export function getL3B26Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2B26 used a cricket as a thermometer. Count the chirps, do the arithmetic, and you have the temperature **right now**.\n\nThat is a strange thing for an organism to be, and it is worth noticing how strange. The cricket is useful precisely because its chirping tracks the **present** temperature and forgets everything else. Almost nothing else in biology works that way.\n\nMost living things do the opposite. **They add the temperature up.**\n\nHere is the fact that makes this lesson. A maize plant does not tassel on a date, and it does not tassel after a fixed number of days. It tassels when it has accumulated enough **warmth** -- and the accumulation is measured in a unit you can define in one line.\n\nFor each day, take the day's mean temperature and subtract the plant's **base temperature**, the temperature below which it does not develop at all. Maize has a base of **10 °C**. What is left is the day's **degree-days**:\n\n**degree-days today = daily mean − 10 °C**, and **zero** if the mean is below 10\n\nSo a 20 °C day contributes 10 degree-days. A 15 °C day contributes 5. A 9 °C day contributes **nothing** -- the plant simply does not advance.\n\nAnd you should recognise that base temperature, because you have met it. **It is the cricket's silence.** Below about 13 °C the snowy tree cricket stopped chirping, and L2B26 treated that as a nuisance -- the point where the instrument failed. Here the same kind of threshold is not a nuisance at all. **It is the mechanism.**\n\nMaize needs about **700 degree-days** from sowing to tasselling. Your dials are **Mean Daily Temperature** in °C, and **Degree-Days Needed** in degree-days, which is the species and the stage.\n\nBefore any arithmetic. A summer with a mean of 20 °C. How many days to tasselling?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'seventy', label: "70 — it gains 10 degree-days a day, and 700/10 = 70.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'thirtyfive', label: "35 — a 20 °C day surely contributes 20 degree-days.", nextNodeId: 'misconception' }
            ]
        },

        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "The subtraction is the whole idea, so it is worth being slow about.\n\nA 20 °C day does not give the plant 20 degree-days. It gives it **20 − 10 = 10**, because the first 10 °C buys nothing. Below 10 °C the plant does not develop, so only the warmth **above** the base counts towards the total:\n\n700 / 10 = **70 days**\n\nAnd the reason to be careful is that the subtraction changes the answer by much more than you would guess, because it is **not** a 50% correction in general. Watch what it does across a range of summers:\n\n| Mean | Degree-days a day | Days to tassel |\n| --- | --- | --- |\n| 30 °C | 20 | **35** |\n| 25 °C | 15 | **47** |\n| 20 °C | 10 | **70** |\n| 15 °C | 5 | **140** |\n| 12 °C | 2 | **350** |\n| 10 °C | **0** | **never** |\n\n**Look at the bottom of that table.** Five degrees of cooling between 20 and 15 doubles the time. Three more degrees down to 12 and it has taken a whole year. And at 10 °C the plant never tassels at all, however long you wait -- not slowly, **never**, because nothing is accumulating.\n\nThat is why maize is grown where it is grown, and it is a much sharper answer than *it likes warm weather*. **The base temperature is subtracted first, so cool summers are not slightly worse. They are disproportionately worse.**",
            options: [
                { id: 'cont', label: "So the total is what matters, not the days.", nextNodeId: 'defining' }
            ]
        },

        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Exactly, and that sentence is worth turning over, because it has a consequence nobody expects.\n\n**The plant does not care which days were warm.** It is keeping one running total, and two seasons that reach 700 degree-days by completely different routes -- a steady one, or a cold June and a blazing July -- arrive at tasselling at the same time. The plant is **integrating** the weather, and an integral throws away the order.\n\nSo write the rule properly:\n\n**the event happens when Σ(daily mean − base) reaches K**\n\nwhere K is a constant for the species and the stage, about 700 degree-days for maize to tasselling. This holds **while the daily mean stays between the base and the temperature at which heat begins to harm the plant** -- there is an upper limit too, and we will come back to it.\n\nNow the question this Big Idea has been circling. **How far ahead can you predict the tasselling date?**\n\nThink about what that is asking. To know the date, you need the weather for the next seventy days -- and **L2P25 proved you cannot have it.** Forecast errors double about every day and a half, so beyond roughly a fortnight a forecast carries no information at all. Seventy days is far outside that.\n\nSo the prediction should be worthless. **It is not.** Agronomists predict tasselling, and pest emergence, and harvest dates, months ahead, and they are right to within a few days.\n\nHow can a prediction that **depends** on the weather be better than a prediction **of** the weather?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'network' } },
            options: [
                { id: 'work', label: "Something about the sum must cancel the errors.", nextNodeId: 'worked' }
            ]
        },

        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "That is exactly it, and you already own the tool. **L2B16** established that independent errors do not add directly -- **they add through their squares.**\n\nHere is the set-up. You do not know any individual day's temperature, but you know the **seasonal mean** is about 20 °C and you know how much daily means scatter about it: a standard deviation of about **σ = 3 °C**. So each day contributes 10 degree-days give or take 3.\n\nThe total after n days is a sum of n such contributions, so the spreads add through their squares:\n\n**spread of the total = σ √n = 3 × √70 = 25 degree-days**\n\nPut that next to the total it is a spread in:\n\n25 / 700 = **3.6%**\n\n**The accumulated warmth is predictable to within four percent, seventy days out**, and nothing about the individual days is predictable at all. Each day's 3 °C of ignorance is still there; it has simply been diluted by being added to sixty-nine others.\n\nNow turn the spread into a **date**, which is what a farmer actually wants. The plant is gaining 10 degree-days a day, so being 25 degree-days uncertain is being two and a half days uncertain:\n\n**25 degree-days / 10 degree-days per day = ± 2.5 days**\n\n**Seventy days ahead, to within two and a half days.** Against a weather forecast that is worthless after fifteen.\n\nAnd the scaling is the best part. The spread grows as **√n** while the wait grows as **n**, so waiting longer makes the prediction *relatively* better:\n\n| Degree-days needed | Days ahead | Uncertainty |\n| --- | --- | --- |\n| 175 | 18 | **± 1.3 days** |\n| 700 | 70 | **± 2.5 days** |\n| 2800 | 280 | **± 5.0 days** |\n\n**Four times the wait, twice the uncertainty.** A weather forecast's error doubles every day and a half; this one doubles every time you **quadruple** the horizon.",
            options: [
                { id: 'check', label: "Let me try one.", nextNodeId: 'math_check' }
            ]
        },

        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "Your turn. A cooler site, with a mean of **15 °C**, growing the same maize -- base 10 °C, 700 degree-days to tasselling. Daily means still scatter by σ = 3 °C.\n\nThe plant now gains 5 degree-days a day, so it takes 140 days. **How precisely can the date be predicted?**",
            options: [
                { id: 'seven', label: "About ± 7 days — the spread is 3√140 = 36 degree-days, and that is 7 days at 5 a day", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'same', label: "Still ± 2.5 days — the scatter in the weather has not changed", nextNodeId: 'math_wrong' },
                { id: 'five', label: "About ± 5 days — twice the days, so twice the 2.5", nextNodeId: 'math_wrong' }
            ]
        },

        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Two things changed when the site got cooler, and they push the same way.\n\n**One: there are more days to be uncertain about.** 700/5 = 140 days, so the spread of the total is 3 × √140 = **36 degree-days**, up from 25.\n\n**Two, and this is the one that is easy to miss: each day is worth less.** At 5 degree-days a day, being 36 degree-days out is being\n\n36 / 5 = **about 7 days** out\n\nnot 36/10. **The same uncertainty in warmth buys a bigger uncertainty in time when the plant is advancing slowly.** That is the second factor, and it is why the answer is 7 rather than 5.\n\n*Twice the 2.5* has it wrong because the spread goes as **√n**, not n -- doubling the days multiplies the spread by √2 = 1.41, not 2. And *still ± 2.5* forgets that the question is about a **date**: the weather's scatter is unchanged, but what a degree-day is worth in days has changed.\n\n**So cool sites are doubly hard to forecast.** They take longer, which adds days, and they advance more slowly, so every degree-day of doubt is worth more time. Push the mean down to 12 °C and the uncertainty is nearly a **month**, which is why nobody tries to predict a maize harvest in a cold climate from the mean alone.",
            options: [
                { id: 'retry', label: "More days, and each day worth less.", nextNodeId: 'explore' }
            ]
        },

        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Both dials are live. The picture shows the running total climbing day by day towards the target, with the **window** around the predicted date drawn on the day axis.\n\nThings worth doing:\n\n- Start at **20 °C** and **700** degree-days: the total climbs 10 a day, meets the target on **day 70**, and the window is **± 2.5 days**\n- Now raise the **Degree-Days Needed** and watch the window widen much more slowly than the date moves out: 700 gives day 70 ± 2.5, and 2800 gives day 280 ± 5.0. **Four times as far ahead for twice the doubt**\n- Bring the **Mean Daily Temperature** down towards **10 °C** and watch the line flatten. At 15 °C it is day 140 ± 7. At 12 °C it is day 350 ± 28 -- the window is now a month wide and the whole prediction has stopped being useful\n- Go to **10 °C exactly**. The line is **flat**. The total never reaches the target, so there is no date at all -- the plant does not tassel slowly, it does not tassel. **That is the base temperature doing its work**\n- Push the temperature up instead: **30 °C** gives day 35 ± 0.9. **Less than a day of uncertainty, five weeks ahead**, which no weather forecast can touch\n- And watch the ratio rather than the window. At every setting, divide the window by the days: it is always a small percentage, and it **shrinks** as the wait grows. That is the whole trick",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Checkpoint", nextNodeId: 'checkpoint' }
            ]
        },

        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "The ± 2.5 days came from spreads adding through their squares, and that rule has a condition: **the errors have to be independent.**\n\nReal weather is not. Warm and cool periods come in **spells** lasting several days -- if today is 3 °C above the seasonal mean, tomorrow probably is too.\n\nSuppose deviations persist in spells of about **5 days**. What happens to the ± 2.5?",
            options: [
                { id: 'worse', label: "It gets worse — there are really only 14 independent spells, not 70 independent days, so the spread grows by about √5 to ± 5.6 days.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'better', label: "It gets better — spells average out over the season, so the total is more predictable.", nextNodeId: 'checkpoint_wrong' },
                { id: 'nochange', label: "No change — the season still has 70 days in it whatever order they come in.", nextNodeId: 'checkpoint_wrong' }
            ]
        },

        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Count what is actually being added up, because the number of **days** is not the number of **independent things**.\n\nIf a deviation lasts 5 days, then the 70-day season contains only 70/5 = **14** independent spells. And each spell does not contribute σ -- it contributes σ for **five days running**, so it pushes the total by 5σ. Add 14 of those through their squares:\n\nspread = √14 × (5 × 3) = 3.74 × 15 = **56 degree-days**\n\nwhich is 56/10 = **± 5.6 days**, not 2.5. In general the spread is multiplied by **√(spell length)**, so five-day spells make it √5 = 2.2 times worse.\n\n**Fewer, bigger, independent pushes are worse than many small ones**, even though the total number of days is identical -- which is why *no change* is wrong. The order genuinely matters to the uncertainty, even though it does not matter to the plant.\n\nAnd *it gets better* is the tempting one, because spells do feel like they should even out. They are what **needs** evening out; it is the independence that does the evening. Clumping the same scatter into fewer, larger lumps gives the square-root rule less to work with.\n\n**Even so, look at where this lands.** ± 5.6 days, seventy days ahead, from a weather forecast that expires in a fortnight. The honest figure is twice as bad as the naive one and still remarkable.",
            options: [
                { id: 'retry', label: "Fewer independent pushes, each bigger.", nextNodeId: 'checkpoint_correct' }
            ]
        },

        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "**And that closes the Big Idea, by answering its question in a way none of the earlier lessons could.**\n\nEvery lesson so far has tried to predict the weather. L2P26 read the wind off the isobars, L2C26 compared two cooling rates, L2B26 read a temperature off a cricket, and each Level 3 lesson found the dependence hiding in the constant and the range where the rule died.\n\nThis lesson does something different. **It gives up on predicting the weather and predicts something else instead.**\n\n| | What it predicts | How far ahead |\n| --- | --- | --- |\n| a weather forecast | the weather on a **given day** | about **15 days**, and error **doubles** every 1.5 |\n| degree-days | the date a **total** is reached | **months**, and error doubles every **quadrupling** |\n\nAnd the reason is the same fact seen from two sides. **Weather is unpredictable day by day, and a sum does not care about days.** Everything that makes tomorrow's temperature uncertain -- the swings, the spells, the chaos of Big Idea 25 -- is exactly what averages away in a running total. The plant is not fighting the noise. **It is built to be deaf to it.**\n\nSo the real answer to *how do we predict weather* has a final part. For most of the questions people actually need answered -- when to sow, when to spray, when to harvest, when the pollen will fly -- **do not predict the weather at all. Predict the thing that adds it up.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Predict what integrates it!", nextNodeId: 'discovery' }
            ]
        },

        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found a prediction that beats the forecast it depends on.**\n\n- The cricket of L2B26 is a rare thing: an organism that tracks the **present** temperature and forgets the rest. Most living things **add the temperature up**\n- **degree-days today = daily mean − base temperature**, and **zero** below the base. Maize has a base of **10 °C**, so a 20 °C day gives 10, a 15 °C day gives 5, and a 9 °C day gives **nothing**\n- The event happens when **Σ(daily mean − base) reaches K**, about **700** degree-days for maize to tasselling. Condition: the mean stays between the base and the temperature where heat starts to harm the plant\n- **The base temperature is L2B26's 13 °C silence, promoted.** There it was the point where the instrument failed; here it is the **mechanism** -- below the base nothing accumulates, so at 10 °C maize does not tassel slowly, it **never** tassels\n- Which makes cool summers **disproportionately** worse, because the base is subtracted first: 20 °C gives 70 days, 15 °C gives 140, 12 °C gives 350\n- **The plant does not care which days were warm.** It keeps one running total, so two seasons reaching 700 by different routes tassel together. **An integral throws away the order**\n- To predict the date you would need seventy days of weather, and **L2P25 proved that is impossible** -- forecast error doubles every day and a half. The prediction should be worthless, and it is not\n- **Because spreads add through their squares** (L2B16): spread of the total = **σ√n** = 3 × √70 = **25 degree-days**, which is **3.6%** of 700. Each day's 3 °C of ignorance is still there, diluted by sixty-nine others\n- As a date: 25 degree-days / 10 per day = **± 2.5 days, seventy days out**, against a forecast worthless after fifteen\n- **And the scaling runs the wrong way for a forecast and the right way here.** The spread grows as **√n** while the wait grows as **n**: 18 days ahead is ± 1.3, 70 days is ± 2.5, 280 days is ± 5.0. **Four times the wait, twice the doubt**\n- A cool site is **doubly** hard: more days to be uncertain about, *and* each degree-day of doubt is worth more time, so 15 °C gives ± 7 days and 12 °C nearly a month\n- **The honest limit is the independence that √n needs.** Weather comes in **spells**: deviations lasting 5 days give only 14 independent pushes of 5σ each, so the spread is √5 = 2.2 times worse -- **± 5.6 days, not 2.5**. Fewer, bigger pushes beat the square-root rule, so the order matters to the uncertainty even though it does not matter to the plant. And ± 5.6 days months ahead is still remarkable\n- **The close:** every other lesson in this Big Idea tried to predict the weather and found the range where its rule died. This one gives up and predicts something else -- and wins, because **everything that makes tomorrow uncertain is what averages away in a total.** The plant is not fighting the noise; it is built to be deaf to it\n- **So: do not predict the weather. Predict the thing that adds it up**\n- **Still standing:** development is not exactly linear above the base. The daily **mean** hides the daily **swing**, and when the swing crosses the base the mean over-counts the degree-days. And there is an upper threshold where heat slows development again, so the real response has a **peak** that none of this models.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Complete Big Idea 26, Level 3", nextNodeId: 'complete' }
            ]
        },

        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- How Do We Predict Weather?**\n\nThree lessons took Level 2's borrowed constants apart. The last one changed the question.\n\n**Summary Table:**\n| | Physics (L3P26) | Chemistry (L3C26) | Biology (L3B26) |\n| --- | --- | --- | --- |\n| Level 2's rule | wind from isobar **spacing** | compare cooling with **10 °C/km** | a cricket reads the temperature **now** |\n| What was hidden | **sin(latitude)** | whether **condensation** started | most organisms **add** temperature up |\n| The quantity | 1/(ρf) × Δp/Δn | 4.5 × base / (rate − 5.5) | **Σ(mean − base)** to reach K |\n| In numbers | 26 km/h at latitude 50 | lift it to **3 km** | **700** degree-days, **day 70** |\n| The threshold | **f = 0** at the equator | the **cloud base** | the **base temperature**: below it, nothing |\n| What it buys | the rule **and** its range | the trigger a forecast must find | **± 2.5 days, 70 days ahead** |\n| The honest limit | the middle latitudes only | 5.5 is an average | warm **spells**: ± 5.6, not 2.5 |\n\n**What ties them together:** the physics and the chemistry each found a dependence hiding inside a constant, and each ended at the range where that dependence began to bite. The biology found something else -- that the reason weather is hard to predict is **day-to-day** variation, and a living thing that keeps a running total is **immune** to exactly that.\n\n**The one line to remember:** a forecast of the weather dies in a fortnight because errors double every day and a half, while a forecast of what the weather **adds up to** survives for months because errors only grow as the square root -- so the way to predict far ahead is to stop asking about days and ask about totals.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}

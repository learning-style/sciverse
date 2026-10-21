import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) for Big Idea 26, chemistry.
 *
 * C26 talks about humidity, clouds and phase changes. Big Idea 8 already owns most
 * of that ground -- L2C8 has relative humidity and the dew point, L3C8 has the dry
 * lapse rate and cloud base at 125 m per degree of gap -- so this lesson takes a
 * different question, and it is the one a forecaster asks after the clouds have
 * formed: does the cloud keep going up?
 *
 *   temperature of the bubble minus its surroundings, after rising h km
 *       = (the surroundings' cooling rate - 10) x h
 *
 * A rising bubble always cools at about 10 C per km, which L3C8 derived and this
 * lesson takes as given. The SURROUNDINGS cool at whatever rate the day happens to
 * have, and the comparison of those two numbers decides whether a cloud fizzles out
 * or towers into a thunderstorm. Verified: at 11 C/km the bubble is 2 C warmer after
 * 2 km and keeps rising; at 6 C/km it is 8 C colder and sinks back.
 *
 * The decision is real -- a forecaster launches a balloon in the morning, measures
 * the surroundings' rate and issues or withholds a storm warning on it.
 *
 * It also chains to L2P26: both lessons read something you want off something you
 * can measure. There it was the spacing of isobars, here two cooling rates.
 *
 * Frame of reference stated: both rates are degrees of cooling per kilometre of
 * rise, and the difference is the bubble's temperature minus the surrounding air's
 * at the same height.
 *
 * Still standing: the bubble's 10 C per km holds only while nothing condenses inside
 * it. Once water vapour turns to liquid it releases heat and the bubble cools far
 * more slowly -- which changes the comparison, and the answer. L3C26 removes it.
 */
export function getL2C26Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "Two cumulus clouds form on the same morning, over the same town, at the same height. By lunchtime one has faded to nothing and the other is a **thunderstorm** eight kilometres tall.\n\nThat is the forecaster's problem, and it is not about how the cloud started. Both started identically. It is about whether the air inside it **keeps going up**.\n\nSo here are the two numbers that decide it, and the whole lesson is the comparison between them.\n\n**One: how fast a rising bubble of air cools.** Air that rises finds lower pressure around it, so it expands, and expanding costs it warmth. This happens to every bubble of air everywhere, and it always comes to about\n\n**10 °C of cooling for every kilometre it rises**\n\nL3C8 worked that number out from the energy; here we take it, because it is the same for every bubble on every day.\n\n**Two: how fast the surrounding air cools as you go up.** This is a completely different thing, and it is **not** fixed. It is whatever today's weather happens to have left behind, and a forecaster has to go and measure it with a balloon. Its name is the **lapse rate**, which means no more than *how fast the air cools as you go up*. On a typical day it is about 6 °C per km. On a hot afternoon, with the ground baking, it can reach 11.\n\nYour two dials are those two things:\n\n- **The Surroundings' Cooling Rate**, in °C per km -- the thing the balloon measures.\n- **Height Risen**, in km -- how far up we follow the bubble.\n\nBefore any arithmetic. The bubble cools at 10 and the air around it cools at 6. After the bubble has risen a kilometre, is it **warmer or colder** than the air it finds itself in?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'colder', label: "Colder -- it has lost 10 degrees where its surroundings only lost 6.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'warmer', label: "Warmer, since warm air rises and it is the one going up.", nextNodeId: 'misconception' }
            ]
        },

        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "*Warm air rises* is true and it is being used backwards here. It explains why the bubble **set off**. It says nothing about what happens to it a kilometre later.\n\nDo the subtraction. Both start at the ground at the same temperature -- call it 20 °C, since the bubble is just a piece of the surface air that got nudged upward.\n\nAfter one kilometre:\n\n- the **bubble** has cooled 10 degrees, so it is at **10 °C**\n- the **surrounding air** at that height is 6 degrees cooler than the ground, so it is at **14 °C**\n\nThe bubble is at 10 and its surroundings are at 14. **The bubble is 4 degrees colder than the air around it.**\n\nColder air is denser, so it sinks. The bubble goes back down, the cloud fizzles out, and nothing happens all afternoon. **The bubble rose, cooled past its surroundings, and lost the argument.**\n\nSo *warm air rises* is only ever the first half of the story. The question that matters is whether it is **still** warmer when it gets there.",
            options: [
                { id: 'cont', label: "So write down the comparison.", nextNodeId: 'defining' }
            ]
        },

        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Both start together at the ground, so after rising **h** kilometres:\n\n- the bubble has lost **10 x h** degrees\n- the surroundings are **rate x h** degrees cooler than the ground\n\nSubtract, and the bubble's temperature minus the surrounding air's at the same height is\n\n**difference = (the surroundings' rate - 10) x h**\n\nin °C, where a **positive** answer means the bubble is **warmer** than the air around it.\n\nThis holds while **nothing inside the bubble condenses** -- while the water in it stays as vapour. That condition is quiet now and it is the whole of the next level.\n\nNow read what the formula says, because it is unusually blunt. The **h** only sets the size. It is the **bracket** that sets the sign, and the bracket does not mention the height at all:\n\n- surroundings cooling **faster than 10** -- the bracket is positive, the bubble stays **warmer**, and it **keeps rising**. The higher it goes the warmer it is compared with its surroundings, so it accelerates. **Storm.**\n- surroundings cooling **slower than 10** -- the bracket is negative, the bubble becomes **colder** the higher it goes, and it **sinks back**. Nothing.\n- exactly **10** -- the bubble matches its surroundings at every height and just sits wherever it is put\n\nSo the whole forecast hangs on one comparison: **is today's lapse rate above or below 10?** The answer is either *storms* or *a quiet afternoon*, and the ground temperature, the time of day and the height of the cloud have nothing to do with which.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'network' } },
            options: [
                { id: 'work', label: "Show me both days on numbers.", nextNodeId: 'worked' }
            ]
        },

        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**The quiet day.** The balloon measures the surroundings cooling at **6 °C per km**.\n\n(6 - 10) = **-4** degrees for every kilometre of rise.\n\n| Height risen | Bubble minus surroundings |\n| --- | --- |\n| 1 km | **-4 °C** |\n| 2 km | **-8 °C** |\n| 3 km | **-12 °C** |\n\nEvery kilometre makes it **worse**. The bubble is fighting harder the further it gets, so it stops early and sinks. **No warning issued.**\n\n**The storm day.** Same town, a week later, and the balloon measures **11 °C per km**.\n\n(11 - 10) = **+1** degree for every kilometre.\n\n| Height risen | Bubble minus surroundings |\n| --- | --- |\n| 1 km | **+1 °C** |\n| 2 km | **+2 °C** |\n| 3 km | **+3 °C** |\n\nEvery kilometre makes it **better**. The bubble is warmer than its surroundings, so it rises; rising makes it even more warmer; so it rises faster. **Nothing in this column ever turns it round, which is why a thunderstorm goes to eight kilometres and not two.**\n\n**Now compare the two days properly.** The lapse rate went from 6 to 11 -- it not quite doubled. And the outcome went from *nothing at all* to *a thunderstorm*, because those two numbers are on **opposite sides of 10**. A forecaster who measured 9.5 and 10.5 would see almost identical numbers and issue completely different forecasts, and be right both times.",
            options: [
                { id: 'check', label: "Let me try one.", nextNodeId: 'math_check' }
            ]
        },

        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "Your turn. The balloon measures the surroundings cooling at **12 °C per km**. The bubble has risen **2 km**.\n\nHow does the bubble compare with the air around it, and what do you forecast?",
            options: [
                { id: 'plusfour', label: "+4 °C — warmer, so it keeps rising. Storms.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'minusfour', label: "-4 °C — colder, so it sinks back. A quiet day.", nextNodeId: 'math_wrong' },
                { id: 'twentyfour', label: "+24 °C — the bubble is 24 degrees warmer.", nextNodeId: 'math_wrong' }
            ]
        },

        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Bracket first, then multiply by the height:\n\n(12 - 10) x 2 = **+4 °C**\n\nPositive, so the bubble is **warmer** than the air around it and keeps going. **Storms.**\n\n-4 is the subtraction done the other way round, 10 - 12 rather than 12 - 10, and this is the one place in the lesson where getting the order wrong does not just flip a sign -- it **flips the forecast**. Which is why the frame of reference was written down: *the bubble's temperature minus the surrounding air's*. A difference with no stated order is not a quantity, it is two quantities.\n\nAnd +24 is 12 x 2, forgetting the 10 altogether. That one is worth catching by eye: 24 degrees would make the bubble hotter than the ground it left, which is not something a bubble that has been cooling all the way up can be. **An answer bigger than the whole temperature range of the problem has gone wrong somewhere.**",
            options: [
                { id: 'retry', label: "Bracket first, in the stated order.", nextNodeId: 'explore' }
            ]
        },

        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Both dials are live. The bubble's temperature and the surrounding air's are drawn as two lines against height, starting together at the ground.\n\nThings worth doing:\n\n- Set the surroundings to **6** and raise the height. The two lines **spread apart**, with the bubble always on the cold side. That is a quiet day, and it gets quieter with height.\n- Now set the surroundings to **11**. The lines spread apart the other way, with the bubble always warmer. **The picture is the same shape and the forecast is the opposite.**\n- Walk the rate slowly through **10** and watch the lines. At exactly 10 they lie **on top of each other** at every height -- the bubble matches its surroundings wherever it goes. One number, and the whole picture pivots about it.\n- Put the rate at 10.5 and then 9.5. Two readings a balloon could easily confuse, and two completely different afternoons.\n- Last one. Set the rate to 11 and the height to 3 km, then look at the gap: **3 °C**. That is a thunderstorm, and the number is tiny. **The bubble never needs to be much warmer -- it only needs to never stop being warmer.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Checkpoint", nextNodeId: 'checkpoint' }
            ]
        },

        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "A forecaster has two balloon readings from the same morning, from two towns.\n\n**Town A:** the ground is **32 °C** and the surroundings cool at **7 °C per km**.\n\n**Town B:** the ground is **19 °C** and the surroundings cool at **11 °C per km**.\n\nTown A is far hotter. Which town should be warned about thunderstorms?",
            options: [
                { id: 'b', label: "Town B. Its rate is above 10, so a rising bubble stays warmer; A's is below, so bubbles sink back however hot the ground is.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'a', label: "Town A — 32 °C is hot enough to drive strong convection.", nextNodeId: 'checkpoint_wrong' },
                { id: 'both', label: "Both, since storms need heat and A has more of it.", nextNodeId: 'checkpoint_wrong' }
            ]
        },

        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Look at where the ground temperature appears in the formula.\n\n**It does not appear at all.** The difference is (rate - 10) x h, and 32 °C and 19 °C are nowhere in it. They cancelled out in the subtraction, because the bubble and its surroundings **both** start from the ground temperature, whatever it happens to be.\n\n- **Town A:** (7 - 10) x h = **-3h**. Negative at every height. A bubble leaving 32 °C ground cools to 22 at one kilometre and finds air at 25 -- colder than its surroundings, and down it comes.\n- **Town B:** (11 - 10) x h = **+1h**. Positive at every height. A bubble leaving 19 °C ground is warmer than its surroundings all the way up.\n\nSo **Town B**, the cooler town, is the one to warn. That is a genuinely surprising result and it is the useful part of the lesson: **a hot day is not a stormy day.** What makes a storm is not how warm the bottom is but **how fast it gets cold going up** -- and those are different measurements. Thunderstorms in Britain often come on days that are not especially hot, and this is why.",
            options: [
                { id: 'retry', label: "The ground temperature cancels out.", nextNodeId: 'checkpoint_correct' }
            ]
        },

        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "**Exactly -- and the reason the ground temperature drops out is worth holding on to.**\n\nThe bubble *is* a piece of the surface air. So whatever temperature the ground has, both sides of the comparison start from it, and it cancels in the subtraction. A hot day makes a **warmer** storm, not a **likelier** one.\n\nWhich makes this the second proxy in this Big Idea, and the second one that is not the obvious quantity.\n\n- **L2P26:** you want the wind. The obvious number is the pressure difference. The right one is the **gradient** -- difference divided by distance\n- **L2C26:** you want to know about storms. The obvious number is the temperature. The right one is the **lapse rate** -- how fast it changes with height\n\nBoth times the useful quantity turned out to be **a difference divided by a distance** rather than a value, and both times the obvious number was the one that cancels. **Weather is made by gradients, not by amounts**, and a forecaster's instruments are built to measure change rather than size.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Weather is made by gradients!", nextNodeId: 'discovery' }
            ]
        },

        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found the one comparison a storm forecast rests on.**\n\n- A rising bubble expands and cools at about **10 °C per km**, the same for every bubble on every day. L3C8 derived it; this lesson uses it\n- The **lapse rate** is how fast the **surrounding** air cools going up. It is **not fixed** -- it is whatever today left behind, and a balloon has to measure it. About 6 on a typical day, up to 11 on a hot afternoon\n- **difference = (the surroundings' rate - 10) x h**, in °C, positive meaning the bubble is warmer. Holds while **nothing inside the bubble condenses**\n- The **h** only sets the size. The **bracket** sets the sign, and the bracket has no height in it -- so the forecast is decided before the bubble has gone anywhere\n- **Above 10:** the bubble stays warmer, rises, and gets more warmer the higher it goes. It accelerates. **Storm**\n- **Below 10:** it becomes colder with height and sinks back. **Nothing**\n- Rate 6 gives -4, -8, -12 °C at 1, 2 and 3 km: every kilometre makes it worse. Rate 11 gives +1, +2, +3: every kilometre makes it better\n- **A rate of 9.5 and a rate of 10.5 look almost identical and mean opposite afternoons**, and a forecaster is right to treat them as different\n- **The ground temperature is not in the formula at all.** It cancels, because the bubble is a piece of the surface air and both sides start from it. So a 32 °C town with a rate of 7 stays quiet while a 19 °C town with a rate of 11 gets storms\n- **A hot day is not a stormy day.** It makes a warmer storm, not a likelier one\n- And the gap doing all this is **tiny**: 3 °C at 3 km is a thunderstorm. **The bubble never needs to be much warmer, only to never stop being warmer**\n- Twice now the useful quantity has been **a difference divided by a distance** rather than a value, and twice the obvious number was the one that cancelled. **Weather is made by gradients, not by amounts**\n- **Still standing:** the bubble's 10 °C per km assumes **nothing condenses inside it**. But a rising bubble reaches its cloud base and then water vapour starts turning to liquid, which **releases heat** -- so from there up it cools far more slowly than 10, and the comparison that decided everything is made against the wrong number. **L3C26 fixes it, and a whole band of days changes its answer.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Complete L2C26", nextNodeId: 'complete' }
            ]
        },

        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Chemistry Complete -- How Do We Predict Weather?**\n\nC26 said clouds come from humidity and phase changes. Big Idea 8 counted the humidity; this counted whether the cloud keeps going.\n\n**Summary Table:**\n| | C26 said | L2C26 says |\n| --- | --- | --- |\n| Why a cloud grows | warm moist air rises | because it stays **warmer than its surroundings** |\n| The bubble's cooling | -- | about **10 °C per km**, always |\n| The surroundings' cooling | -- | the **lapse rate**, measured by balloon, 6 to 11 |\n| The formula | -- | **(rate - 10) x h**, positive means warmer |\n| What decides it | heat and humidity | whether the rate is **above or below 10** |\n| Rate 6 | -- | -4, -8, -12 °C: **sinks back** |\n| Rate 11 | -- | +1, +2, +3 °C: **storm** |\n| The ground temperature | the hotter the better | **not in the formula** -- it cancels |\n| So a hot day | -- | gives a **warmer** storm, not a likelier one |\n| Against L2P26 | -- | both useful quantities are a **difference over a distance** |\n| Still standing | -- | the 10 assumes **nothing condenses** |\n\n**The one line to remember:** a cloud keeps growing only while the air inside it stays warmer than the air outside, so the forecast turns on whether the surroundings cool faster or slower than the 10 °C per km a rising bubble cools at -- and the temperature at the bottom cancels out of that comparison entirely.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}

import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) for Big Idea 26, biology. The closing lesson.
 *
 * B26 says organism behaviour indicates weather. Almost all of the folk indicators
 * are worthless; one of them is a real instrument, and it is worth separating them.
 *
 *   chirps in 25 s = counted x 25 / seconds counted
 *   temperature in °C = that / 3 + 4.4
 *
 * which is Amos Dolbear's 1897 law for the snowy tree cricket, T(F) = 50 + (N-40)/4,
 * rounded into a field rule. Verified against the original at five temperatures: the
 * field form agrees to within 0.05 °C.
 *
 * The second dial is the counting WINDOW, because that is where a calibrated proxy
 * actually goes wrong: 20 chirps in 50 seconds is not 20 chirps in 25 seconds, and
 * the rule has no way to tell you that you measured it differently. The calibration
 * includes the method.
 *
 * It closes Level 2 by naming what the three lessons share. You cannot see the wind,
 * the storm or the temperature, so each one measures something visible -- the spacing
 * of isobars, two cooling rates, a chirp rate -- and applies a rule somebody
 * calibrated. All three rules have conditions, and all three are useless outside
 * them.
 *
 * Frame of reference stated: the count is of one cricket's chirps, over a stated
 * number of seconds, at the cricket's own position.
 *
 * Still standing: the straight line is a FIT. Chirping is driven by muscle chemistry,
 * and chemical rates do not follow straight lines -- so the rule has a working range,
 * and below about 13 °C the cricket stops chirping altogether and the thermometer
 * reads nothing at all. L3B26 asks why, and puts a number on where the line fails.
 */
export function getL2B26Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "B26 says you can read the weather off animals and plants. There is a great deal of folklore here and most of it is worthless, so it is worth being careful about which bits are not.\n\n*Cows lie down before rain* -- cows lie down a lot. *Red sky at night, shepherd's delight* -- that one is half right, for a reason about where weather comes from. And then there is one that is not folklore at all. It is an **instrument**.\n\n**Snowy tree crickets chirp faster when it is warmer.** Not vaguely faster -- faster in a way you can put a number on and use. A man called Amos Dolbear measured it carefully and published the rule in **1897**, and it still works:\n\n**count the chirps in 25 seconds, divide by 3, and add 4.4. That is the temperature in °C.**\n\nThat is a thermometer made of an insect, and it is accurate to about a degree.\n\nBut a rule like that comes with instructions, and the instructions are not optional. **You have to count for the right length of time.** The 25 seconds is not a suggestion -- it is part of the rule, because the rule converts a *count* into a temperature and a count means nothing without the time it was counted over.\n\nAnd the 25 is a **choice somebody made**, not a fact about crickets. No cricket knows anything about 25 seconds -- what the animal has is a **rate**, so many chirps per second, and *any* counting window would measure it correctly. 25 was picked because it is the one window that makes the sum come out as **divide by 3**, and this lesson will show why it has to be 25 and not 20 or 30. **The cricket supplies the rate; the 25 seconds is ours.**\n\nSo your two dials are the measurement and the method.\n\n- **Chirps Counted** -- how many you heard.\n- **Seconds Counted** -- how long you listened for.\n\nBefore any arithmetic. You count **20 chirps**, but you were listening for **50 seconds** rather than 25. Can you still use the rule?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'convert', label: "Yes, but convert first -- 20 in 50 seconds is 10 in 25.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'direct', label: "Yes -- 20 chirps is 20 chirps, so divide by 3 and add 4.4.", nextNodeId: 'misconception' }
            ]
        },

        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Do it that way and see what you get. 20 / 3 + 4.4 = **11.1 °C**.\n\nNow do it properly. You listened for twice as long, so you heard twice as many chirps as the rule expects. In 25 seconds this cricket would have chirped **10** times, not 20:\n\n10 / 3 + 4.4 = **7.7 °C**\n\nSo the two answers are **11.1 °C** and **7.7 °C** -- three and a half degrees apart, which is the difference between a chilly evening and one where you need a coat. And nothing went wrong with the counting. The cricket chirped exactly as many times as it chirped.\n\n**The rule has no way to tell you that you measured it differently.** Feed it 20 and it will cheerfully give you an answer, because a formula cannot know how long you were standing there. The 25 seconds lives in the *rule*, not in the numbers, which is exactly the kind of thing that gets forgotten.\n\n**A calibrated instrument comes with a method, and the method is part of the calibration.** Using the right formula on a measurement taken the wrong way is not a small error -- it is a confident wrong answer.",
            options: [
                { id: 'cont', label: "So standardise the count first.", nextNodeId: 'defining' }
            ]
        },

        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Two steps, and the first one is the one people skip.\n\n**Step one: turn your count into the count the rule wants.** You heard a number of chirps over some number of seconds, and you need what it would be over 25:\n\n**chirps in 25 s = counted x 25 / seconds counted**\n\nCheck the units: chirps multiplied by seconds divided by seconds leaves **chirps**, which is right. And sanity-check the direction -- if you listened for *longer* than 25 seconds you must end up with *fewer*, which is what dividing by a bigger number does.\n\nThis step has a condition, and it is easy to miss because it is about the cricket rather than the arithmetic. **Scaling a count only works if the rate is steady** -- if the cricket were speeding up while you listened, the first ten seconds and the last ten would not be worth the same, and multiplying by 25/30 would mean nothing. Over half a minute on a still evening that is fair. On an evening cooling quickly it is not, which is a reason to count quickly rather than carefully.\n\n**Step two: turn that into a temperature.**\n\n**temperature in °C = (chirps in 25 s) / 3 + 4.4**\n\nThat second line is where all the biology is hiding, and two things in it are easy to run together.\n\n**The line itself is a measurement.** Nobody worked out from cricket anatomy that the rate should rise in a straight line. **Amos Dolbear**, an American physicist, sat with a thermometer and a notebook in **1897** and fitted a straight line to what he heard, publishing it as *The Cricket as a Thermometer*. What he actually wrote down was in Fahrenheit, counting for a full minute:\n\n**temperature in °F = 50 + (chirps per minute - 40) / 4**\n\n**The 3 and the 4.4 are then just arithmetic.** Put his line into Celsius, which means taking off 32 and multiplying by 5/9:\n\n**°C = 10 + (chirps per minute - 40) / 7.2**\n\nand that **7.2** is nothing but his **4** multiplied by the **9/5** of the unit change. Now count for 25 seconds instead of a minute, so chirps per minute = 2.4 x your count:\n\n**°C = 10 + (2.4 x count - 40) / 7.2 = count / 3 + 4.44**\n\n**And here is the reason for the 25 seconds**, which is the one part of the whole rule that has nothing to do with crickets.\n\nDo that last step again with a general window of **W** seconds. Chirps per minute is then 60/W times your count, so the slope of the rule is\n\n**(60/W) / 7.2 = 25 / (3W)**\n\n**The 25 in *count for 25 seconds* is the same 25 that appears in that fraction**, and that is the whole answer. Put W = 25 in and the slope is 25/75 = **exactly one third**, and no other window gives a third. Count for 15 seconds instead and the slope is 5/9; for 20 seconds, 5/12; for half a minute, 5/18; for a full minute, 5/36. **None of those is arithmetic anybody would do in a field in the dark.**\n\nYou can go further and ask which windows are easy. A slope of **1 / k** needs **W = 25k / 3**, so a **whole number of seconds** gives a slope like 1/3 or 1/6 only at **25 s, 50 s and 75 s** -- and nothing shorter than 25. Fifty seconds would give a tidy 1/6, but it is a long time to stand still while an evening cools, which breaks the steady rate the first step needs. **So 25 is the shortest count that makes the arithmetic free.**\n\n**The 25 is therefore arbitrary in one sense and not at all in the other.** Any window would have measured the cricket; exactly one turns Dolbear's fitted line into *divide by 3*.\n\nSo the rule holds **for a snowy tree cricket, for one cricket at a time, and over the range of temperatures Dolbear actually measured** -- and the 4.4 is 40/9 rounded off, which runs a flat 0.04 °C low and need trouble nobody. Two crickets chirping together will double your count, which at 30 chirps is another ten degrees. A different species has a different line.\n\nA fitted line is a real and useful thing. It is just not the same kind of thing as a law.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'network' } },
            options: [
                { id: 'work', label: "Show me it on real numbers.", nextNodeId: 'worked' }
            ]
        },

        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**A worked example.** You count **48 chirps** while listening for **30 seconds**.\n\nStep one, standardise:\n\n48 x 25 / 30 = 1200 / 30 = **40 chirps in 25 seconds**\n\nStep two, convert:\n\n40 / 3 + 4.4 = 13.3 + 4.4 = **17.7 °C**\n\nA mild evening. And notice that if you had skipped step one you would have had 48/3 + 4.4 = **20.4 °C** -- nearly three degrees out, from listening five seconds too long.\n\n**The whole range, at the proper 25 seconds:**\n\n| Chirps in 25 s | Temperature |\n| --- | --- |\n| 10 | **7.7 °C** |\n| 20 | **11.1 °C** |\n| 30 | **14.4 °C** |\n| 40 | **17.7 °C** |\n| 50 | **21.1 °C** |\n| 60 | **24.4 °C** |\n\nTen more chirps is **3.3 degrees**, every time, all the way down the table. That is what a straight line means, and it is what makes the rule usable in your head: **three chirps is about a degree.**\n\nAnd look at the bottom of the table rather than the top. At 10 chirps in 25 seconds you get 7.7 °C -- but a snowy tree cricket in air that cold has mostly **stopped chirping**. The table keeps going because arithmetic always keeps going. The cricket does not.",
            options: [
                { id: 'check', label: "Let me try one.", nextNodeId: 'math_check' }
            ]
        },

        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "Your turn. You count **18 chirps** in **15 seconds**.\n\nWhat temperature does the rule give?",
            options: [
                { id: 'fourteen', label: "About 14.4 °C", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'ten', label: "About 10.4 °C", nextNodeId: 'math_wrong' },
                { id: 'eight', label: "About 8.0 °C", nextNodeId: 'math_wrong' }
            ]
        },

        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Standardise first. You listened for **less** than 25 seconds, so the standardised count must be **more** than 18:\n\n18 x 25 / 15 = 450 / 15 = **30 chirps in 25 seconds**\n\nThen 30 / 3 + 4.4 = **14.4 °C**.\n\n10.4 is 18/3 + 4.4 -- the raw count used directly, skipping step one. And it goes wrong in the direction worth remembering: because you listened for a **shorter time than the rule expects**, using the raw count makes the cricket seem **slower** than it is, so the answer comes out **too cold**. A short count always reads cold and a long count always reads warm, and knowing which way the error goes is often more useful than knowing its size.\n\n8.0 has the conversion the wrong way round -- 18 x 15/25 = 10.8, then /3 + 4.4 -- which is the same mistake pointing the other way. **Check the direction before the arithmetic: fewer seconds must mean more chirps.**",
            options: [
                { id: 'retry', label: "Fewer seconds, more chirps.", nextNodeId: 'explore' }
            ]
        },

        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Both dials are live. The chirps are drawn as ticks along a 25-second strip, with your count scaled onto it.\n\nThings worth doing:\n\n- Set **Seconds Counted** to 25 and walk **Chirps Counted** up. Every 3 chirps is about a degree, and every 10 is 3.3 -- you can see the straight line in the evenness of it.\n- Now fix the chirps at 40 and move the **Seconds Counted**. The temperature swings wildly while the cricket is doing exactly the same thing. **That whole range of answers is measurement error, not weather.**\n- Set it to 25 seconds, then 24, then 26. One second either way is about half a degree. That is the precision the method needs, and it tells you something practical: **use a watch, not a count in your head.**\n- Take the chirps right down to 5 in 25 seconds and read what it says: about **6 °C**. Then remember that a real snowy tree cricket at 6 °C is **silent**. The arithmetic is still running and the instrument has stopped.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Checkpoint", nextNodeId: 'checkpoint' }
            ]
        },

        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "You are camping with no thermometer, and you want to know whether to expect frost. You listen carefully for 25 seconds and hear **nothing at all**. Not one chirp.\n\nA friend says: zero chirps, so 0 / 3 + 4.4 = **4.4 °C**. Cold, but above freezing, so no frost.\n\nWhat is wrong with that, and what do you actually know?",
            options: [
                { id: 'below', label: "Silence is outside the rule's range, not a reading of zero -- it means below about 13 °C and the rule cannot say how far below.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'fine', label: "Nothing is wrong — zero chirps is a valid measurement and 4.4 °C is the answer.", nextNodeId: 'checkpoint_wrong' },
                { id: 'freezing', label: "It must be exactly 0 °C, since the cricket has stopped completely.", nextNodeId: 'checkpoint_wrong' }
            ]
        },

        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The friend's arithmetic is right and their reasoning is not, which is the most dangerous combination an instrument can produce.\n\nBelow about **13 °C** a snowy tree cricket stops chirping. So silence is not the reading *zero* -- it is **no reading at all**, the same as a broken thermometer. And it carries exactly one piece of information: **it is below about 13 °C.** It could be 12 °C and it could be -8 °C, and the silence sounds identical.\n\nSo the honest answer is *the rule cannot tell me, and frost is entirely possible*. The friend's answer of 4.4 °C is worse than no answer, because it is specific. **An instrument used outside its range does not produce a vague answer, it produces a confident wrong one**, and that is what you have to protect yourself from.\n\nAnd *exactly 0 °C* makes the opposite mistake -- treating the point where the instrument fails as a measurement of something. The cricket going quiet tells you about **the cricket's muscles**, not about the freezing point of water.",
            options: [
                { id: 'retry', label: "Silence is no reading, not a zero.", nextNodeId: 'checkpoint_correct' }
            ]
        },

        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "**Exactly -- and that closes the Big Idea, because all three lessons were the same move with the same catch.**\n\nYou cannot see the wind. You cannot see whether a cloud will become a storm. You cannot see the temperature. So in each case you measure something you **can** see and apply a rule somebody calibrated:\n\n| | What you want | What you measure | The rule |\n| --- | --- | --- | --- |\n| **L2P26** | tomorrow's wind | the **spacing** of isobars | 26 km/h per hPa/100 km |\n| **L2C26** | will it storm | two **cooling rates** | above or below 10 °C/km |\n| **L2B26** | the temperature | a **chirp rate** | divide by 3, add 4.4 |\n\nThat is what predicting weather is: **not seeing the future, but measuring a proxy and knowing the rule.**\n\nAnd every one of those rules came with conditions. The 26 holds in the middle latitudes. The 10 holds while nothing condenses. The chirp rule holds for one species of cricket, counted over 25 seconds, above about 13 °C.\n\n**So a forecast has three ways to be wrong, not one: the measurement, the rule, or being outside the range where the rule applies.** And the third is the worst, because it is the one that still gives you a number.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Measure a proxy, know the rule!", nextNodeId: 'discovery' }
            ]
        },

        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You used an insect as a thermometer and then found where it breaks.**\n\n- Most weather folklore is worthless. **Snowy tree crickets are not** -- they chirp faster when warmer, reliably enough to use\n- **chirps in 25 s = counted x 25 / seconds counted**, then **°C = that / 3 + 4.4**. Amos Dolbear, **1897**, and accurate to about a degree\n- Step one is the one people skip, and it costs real degrees: 20 chirps counted over **50** seconds is **10** in 25, so **7.7 °C** and not 11.1\n- **The rule has no way to know how long you listened.** The 25 seconds lives in the rule, not in the numbers. **A calibrated instrument comes with a method, and the method is part of the calibration**\n- Check the direction before the arithmetic: **fewer seconds must mean more chirps**. A short count always reads **cold**, a long count always reads **warm**\n- Ten more chirps is **3.3 °C**, every time -- so **three chirps is about a degree**, which is what makes it usable in your head\n- **The straight line is the measurement; the 3 and the 4.4 are only arithmetic.** Dolbear **fitted** the line -- °F = 50 + (chirps per minute - 40) / 4 -- and carrying that into Celsius for a 25-second count gives count / 3 + 4.44 with nothing whatever added. A fitted line is a real and useful thing and it is **not a law**\n- **The 25 seconds is ours, not the cricket's.** For a window of **W** seconds the slope is **25 / (3W)**, so W = 25 is the only window making it **1/3**, and a whole number of seconds gives an easy slope only at 25, 50 and 75. **Any window would measure the cricket; only this one makes the arithmetic free**\n- So it holds for **one species**, **one cricket at a time** -- two crickets together double your count, which at 30 chirps adds ten degrees -- and over the range he measured\n- **Silence is not a reading of zero.** Below about **13 °C** the cricket stops, so silence means *below 13* and nothing more precise. It could be 12 °C or -8 °C\n- **An instrument used outside its range gives a confident wrong answer, not a vague one**, which is why 4.4 °C from a silent night is worse than admitting you do not know\n- And the three lessons were one move: **measure a proxy you can see, apply a rule somebody calibrated.** The spacing of isobars, two cooling rates, a chirp rate\n- Each rule had conditions -- the middle latitudes, nothing condensing, one species above 13 °C -- so **a forecast has three ways to be wrong: the measurement, the rule, or being outside its range.** The third is the worst, because it still gives you a number\n- **Still standing:** why should chirping follow a **straight line** at all? It should not. Chirping is muscles contracting, and muscles run on chemistry, and chemical rates do not go up in straight lines -- which means Dolbear's line is a **local fit** that must bend away from the truth at both ends, and the cricket's silence below 13 °C is the chemistry showing through. **L3B26 puts a number on how far the line is out, and finds the range.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Complete L2B26", nextNodeId: 'complete' }
            ]
        },

        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- How Do We Predict Weather?**\n\nA chart, a balloon and a cricket, and all three doing the same job.\n\n**Summary Table:**\n| | Physics (L2P26) | Chemistry (L2C26) | Biology (L2B26) |\n| --- | --- | --- | --- |\n| What you want | tomorrow's **wind** | **will it storm** | the **temperature** |\n| What you can see | the **spacing** of isobars | two **cooling rates** | a **chirp rate** |\n| The formula | difference / distance | **(rate - 10) x h** | count / 3 + 4.4 |\n| Then | x **26 km/h** | positive means **rising** | after standardising to 25 s |\n| In real numbers | 4 hPa over 400 km: **26 km/h** | rate 11: **storm**, rate 6: nothing | 40 chirps: **17.7 °C** |\n| The number that cancels | the pressure **difference** alone | the **ground temperature** | -- |\n| The method matters | measure **across** the isobars | both rates **per km** | count for **25 seconds** |\n| The condition | the **middle latitudes** | **nothing condenses** | one species, above **13 °C** |\n| Outside it | no rule at the equator | the answer flips | **silence**, not zero |\n\n**The one line to remember:** predicting weather is not seeing the future but measuring something visible and applying a rule somebody calibrated -- so every forecast can fail at the measurement, at the rule, or by being outside the range where the rule holds, and only the last of those still hands you a number.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}

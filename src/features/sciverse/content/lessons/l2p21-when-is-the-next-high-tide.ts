import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) for Big Idea 21, physics.
 *
 * P21 said tides are a regular, predictable cycle and stopped there. Regular at
 * what interval? Predictable how far ahead? Both are arithmetic, and both come
 * from one fact the Level 1 lesson never used: the Moon does not return overhead
 * every 24 hours, because it has moved along its orbit while the Earth turned.
 *
 *   high tides come every 12 h 25 min, so each one is about 50 min later than
 *   yesterday's
 *
 * And the size of the tide is the Sun and the Moon adding or cancelling. Taking
 * the Moon's share as 2.2 m and the Sun's as 1.0 m: aligned gives a 3.2 m spring
 * range, at right angles 1.2 m neap, and the ratio 2.7 is what tide tables show.
 *
 * Still standing: this treats the Sun's share as a number to look up. Why is the
 * Sun -- which pulls the Earth 179 times harder than the Moon does -- worth less
 * than half the Moon's tide? L3P21 derives it.
 */
export function getL2P21Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "P21 showed you why tides happen: the Moon's pull raises bulges of water, the Earth turns underneath them, and the sea rises and falls in a repeating pattern.\n\nThen it said the pattern is **predictable**, which is true and not yet useful. A fishing boat needs to know whether there will be enough water over the harbour bar at four o'clock this afternoon. \"Predictable\" does not float a boat. A time does.\n\nSo the two questions this lesson answers are **when** and **how big**, and each is a small calculation.\n\nStart with when, and with a fact P21 had no use for. The Earth turns once in **24 hours** -- but while it turns, the Moon has moved along its own orbit. To bring the same point on Earth back under the Moon, the Earth has to turn a little further than one full rotation. That takes **24 hours and 50 minutes**, and it is called a **lunar day**.\n\nYour two dials are the two things that set the size of a tide.\n\n- **Days Since New Moon**, from 0 to 29, which decides whether the Sun is helping the Moon or working against it.\n- **The Sun's Share** of the tide, in metres.\n\nHere is the first question. There are two high tides in every lunar day. How far apart are they?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Half a lunar day, so 24 h 50 min divided by 2 -- that is 12 h 25 min.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "Twelve hours, since there are two in a day and a day is 24 hours.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Twelve hours is the answer you get from a 24-hour day, and the tides do not keep to our clock -- they keep to the **Moon's** clock.\n\nWatch what the difference costs. If high tide were every 12 hours exactly, it would fall at the same times every day for ever: high water at 6 and 18 hundred hours, permanently. Anyone who lives by the sea will tell you that is not what happens. **Today's high tide is about fifty minutes later than yesterday's**, and over a fortnight the whole pattern slides right around the clock.\n\nThat fifty minutes is the Moon moving on. In the 24 hours it takes the Earth to spin once, the Moon has travelled about a thirtieth of the way round its orbit, so the Earth must turn an extra bit -- about 50 minutes' worth -- to catch up with it.\n\nSo the real interval is half of 24 h 50 min:\n\n**high tides come every 12 hours and 25 minutes**\n\nThat 25 minutes is not a rounding error. Ignore it and your prediction for a week's time is out by nearly six hours -- which would have you arriving at low water expecting high.",
            options: [
                { id: 'cont', label: "So the Moon's clock, not ours. How do I use it?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "By adding. If you know one high tide, you know all of them:\n\n**next high tide = last high tide + 12 h 25 min**\n\nAnd because two of those make a lunar day, the same time **tomorrow** is about **50 minutes later** than today.\n\nNow the size, which is a separate question with a separate answer. The Moon is not the only thing pulling on the sea -- the **Sun** pulls too, and the two either work together or against each other depending on where the Moon is in its month:\n\n- **New Moon and Full Moon:** the Sun, Earth and Moon are in a line, so the two pulls **add**. The biggest tides of the month, called **spring tides** -- nothing to do with the season; the word means *to spring up*.\n- **Half Moon, at 7 and 22 days:** the Sun is off at right angles, so its pull works **against** the Moon's and the two partly cancel. The smallest tides, called **neap tides**. In between the two extremes the range sits somewhere between them, and on the days when the Moon acts almost alone you get close to its own 2.2 m.\n\nWhich gives the second formula:\n\n**tidal range = the Moon's share + the Sun's share** when they are lined up\n\n**tidal range = the Moon's share - the Sun's share** when they are at right angles\n\n**Tidal range** is the difference in sea level between high and low water. Two notes before you use it:\n\n- **The lunar month is 29.5 days**, so spring tides come round about every **14.8 days** -- twice a month, not once.\n- **The condition:** these two numbers are for the open ocean. A funnel-shaped estuary can multiply a range several times over, which is why the Severn's range is 13 m and the Mediterranean's is nearly nothing.",
            options: [
                { id: 'cont', label: "Work out a real day and a real range.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**When.** High water this morning was at **06:10**.\n\n1. **Next high tide:** 06:10 + 12 h 25 min = **18:35** this evening\n2. **The one after:** 18:35 + 12 h 25 min = **07:00** tomorrow morning\n3. **So tomorrow morning's high water is 50 minutes later** than today's, as promised\n\nAnd a week later? Seven days at 50 minutes a day is **350 minutes**, nearly six hours. What was a morning high tide has become an afternoon one.\n\n**How big.** At this harbour the Moon's share is **2.2 m** and the Sun's is **1.0 m**.\n\n1. **At New Moon, lined up:** 2.2 + 1.0 = **3.2 m** of range\n2. **At Half Moon, at right angles:** 2.2 - 1.0 = **1.2 m** of range\n3. **The ratio:** 3.2 / 1.2 = **2.7**\n\nSo the biggest tides of the month move nearly **three times** as much water up and down the beach as the smallest, and both are the same sea with the same Moon. Only the Sun's direction changed.\n\nThat 2.7 is worth remembering, because it is what tide tables actually show, and it is the number L3P21 will explain rather than assume.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** High water was at **09:40** today.\n\nWhat time is the **next** high tide, and roughly what time is high water tomorrow morning?",
            options: [
                { id: 'right', label: "22:05 tonight, and about 10:30 tomorrow morning.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'used_12', label: "21:40 tonight, and 09:40 tomorrow -- the same time every day.", nextNodeId: 'math_wrong' },
                { id: 'wrong_add', label: "22:05 tonight, and 09:40 tomorrow morning.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**21:40 and the same time tomorrow** uses a 12-hour interval, which keeps the tides pinned to our clock. They are not. 09:40 + 12 h 25 min = **22:05**.\n\n**22:05 tonight and 09:40 tomorrow** gets the evening right and then forgets the interval on the second step. Two high tides is 24 h 50 min, so tomorrow's is 50 minutes later: 09:40 + 50 min = **10:30**.\n\nYou can also get there by adding 12 h 25 min twice: 09:40 → 22:05 → 10:30. Same answer, and it is worth doing both ways once, because the whole pattern is just that one interval repeated.\n\nAnd here is why the 50 minutes matters more than it looks. It is **the same 50 minutes every day**, so it accumulates. A fortnight on, the tides have slid right round the clock and back, which is exactly why a harbour that is accessible at breakfast this week is accessible at teatime next week.",
            options: [
                { id: 'retry', label: "12 h 25 min each time, and 50 minutes later each day.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "**Try the two dials.** **Days Since New Moon**, and **The Sun's Share** in metres, with the Moon's share held at 2.2 m.\n\n| Days since new moon | Moon and Sun are | Range with a 1.0 m solar share |\n| --- | --- | --- |\n| 0 | lined up -- new moon | **3.2 m** spring |\n| 7 | at right angles | **1.2 m** neap |\n| 15 | lined up -- full moon | **3.2 m** spring |\n| 22 | at right angles | **1.2 m** neap |\n| 29 | nearly lined up again | **3.2 m** spring |\n\nRun the days dial slowly and watch the range breathe: big, small, big, small, twice in each 29.5-day month. **Spring tides come at both new moon and full moon**, because a line through Earth, Moon and Sun works the same whichever side the Moon is on. That surprises people who expect a once-a-month pattern.\n\nNow move the Sun's share instead, and something worth noticing appears.\n\n- **Sun's share 0.5 m:** spring 2.7 m, neap 1.7 m. Ratio **1.6**.\n- **Sun's share 1.0 m:** spring 3.2 m, neap 1.2 m. Ratio **2.7**.\n- **Sun's share 2.0 m:** spring 4.2 m, neap 0.2 m. Ratio **21**.\n\nThe **spring** range creeps up while the **neap** range collapses. The difference matters because a subtraction near zero is a violent thing: a small change in the Sun's share barely touches the biggest tides and can nearly abolish the smallest.\n\nWhich means the Sun's share is worth knowing precisely -- and this lesson has simply handed it to you as 1.0 m. Where does it come from? The Sun is enormous and far away, the Moon is small and close, and knowing which of those wins is not obvious at all.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Two pulls, adding or cancelling. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A coastal path can only be walked at low water, and a walker checks the tide table on a **Monday**: low water at 08:00, a good morning for it.\n\nThey cannot go that week, so they plan for the **following Monday** -- same day of the week, seven days later -- and turn up at 08:00 expecting the same conditions.\n\nWhat do they find?",
            options: [
                { id: 'right', label: "The tide is nearly six hours out: 7 days x 50 min is about 350 min, so low water is near 13:50. At 08:00 the sea is high, and the path is under water.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "The same conditions -- it is the same day of the week, so the tide has come round to where it was.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "This is the mistake that strands people, and the arithmetic shows why the day of the week has nothing to do with it.\n\nTides keep the Moon's calendar, not ours. Each day they slip about **50 minutes** later, and slipping does not care what we call the day:\n\n7 days x 50 minutes = **350 minutes**, which is **5 hours 50 minutes**\n\nSo the following Monday's low water is near **13:50**, not 08:00. Turning up at eight in the morning puts the walker there at close to **high** water -- the worst possible moment for a path that needs low water.\n\nFor the pattern to return to the same time of day you need the slip to add up to a whole 24 hours, and at 50 minutes a day that takes about **29 days** -- a lunar month. Which is exactly why tide tables are printed for every single day rather than as a weekly timetable, and why \"same time next week\" is a dangerous habit at the coast.\n\nThere is a second trap in the same plan. Seven days after a spring tide you are at a **neap** tide, so the low water is not only at a different time -- it does not go out nearly as far. The walker has lost both the timing and the range.",
            options: [
                { id: 'retry', label: "Fifty minutes a day, and it accumulates.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct -- **nearly six hours out**, so 08:00 the following Monday is close to high water rather than low.\n\nAnd the second half of the trap is just as bad: seven days after a spring tide you are at a **neap**, so the sea does not go out as far either. Wrong time, and less beach.\n\nSo what this level gives you, that P21 could not:\n\n- **A time.** 12 h 25 min between high tides, 50 minutes later each day, and a full lunar month before the pattern repeats at the same hour.\n- **A size.** The Moon's share plus or minus the Sun's, giving 3.2 m at springs and 1.2 m at neaps.\n- **A reason the calendar is no help.** Tides follow the Moon, and the Moon does not care about weeks.\n\nOne thing has been handed to you without explanation, and it is the odd one. The Sun is **27 million times** the Moon's mass. It pulls the Earth as a whole about **179 times harder** than the Moon does. And its share of the tide is **less than half** the Moon's.\n\nThat is not a small correction to be shrugged at -- it is a reversal, and it means the tide cannot simply be about how hard something pulls. Level 3 works out what it is actually about.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "The Sun pulls harder and raises a smaller tide?", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You can now read a tide table and predict one.**\n\n- The Earth spins in 24 hours, but the Moon has moved on, so a **lunar day** is **24 h 50 min**\n- Two high tides per lunar day, so **high tides come every 12 h 25 min**\n- **next high tide = last high tide + 12 h 25 min**, and tomorrow's is about **50 minutes later**\n- That 50 minutes **accumulates**: a week on, the tides are nearly six hours out, and it takes a whole lunar month to return to the same hour\n- Which is why tide tables are daily, and why \"same time next week\" strands walkers\n- **tidal range = the Moon's share + the Sun's share** when lined up, **minus** when at right angles\n- **Spring tides** at new **and** full moon -- a line works whichever side the Moon is on -- so they come every **14.8 days**\n- With a 2.2 m lunar share and a 1.0 m solar share: **3.2 m springs, 1.2 m neaps**, a ratio of **2.7**\n- Raising the Sun's share barely moves the springs and nearly abolishes the neaps, because **a subtraction near zero is violent**\n- **Spring** means *to spring up*, not the season\n- A funnel-shaped estuary multiplies the range, which is why the Severn reaches 13 m and the Mediterranean almost nothing\n- Removed: P21's \"predictable\", with no interval and no size\n- Still standing: the Sun's share is **handed over, not explained** -- and it needs explaining, because the Sun pulls the Earth **179 times harder** than the Moon does and raises less than half the tide",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Twelve hours twenty-five, every time!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- How Do Cycles Keep Systems Alive?**\n\nP21 said the tides are predictable. Level 2 predicts them.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| A lunar day | 24 h 50 min | the Moon has moved on |\n| Between high tides | **12 h 25 min** | half a lunar day |\n| Tomorrow's tide | **50 min later** | and it accumulates |\n| A week later | 7 x 50 min | nearly **six hours** out |\n| Back to the same hour | about 29 days | a lunar month |\n| Spring range | Moon **+** Sun | 2.2 + 1.0 = **3.2 m** |\n| Neap range | Moon **-** Sun | 2.2 - 1.0 = **1.2 m** |\n| Their ratio | 3.2 / 1.2 | **2.7**, as tide tables show |\n| Springs happen | at new **and** full moon | every 14.8 days |\n| Not explained | why the Sun's share is **smaller** | though it pulls 179 times harder |\n\n**The one line to remember:** tides keep the Moon's clock, not ours -- 12 hours 25 minutes apart and fifty minutes later each day -- so the only safe way to plan round them is a table for the actual date.\n\n**Up next:** C21 gave you carbon moving between reservoirs. Now you can work out how long a carbon atom stays in the air before something takes it back."
        }
    };
}

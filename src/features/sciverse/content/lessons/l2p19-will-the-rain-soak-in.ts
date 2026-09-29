import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) for Big Idea 19, physics.
 *
 * P19 showed that sandy soil drains fast and clay drains slowly, and that one
 * farmer's field can drain in half an hour while the neighbour's floods for two
 * days. It never put a speed on either, so it could not say whether a given
 * storm would flood a given field. This lesson does:
 *
 *   water that runs off = rainfall rate - how fast the soil takes water in
 *
 * Both in millimetres per hour, which is the unit a rain gauge and a soil test
 * already use. Worked on rain at 20 mm/h falling on soil that takes 8 mm/h: 12
 * mm/h has nowhere to go, which is 24 mm across a two-hour storm.
 *
 * Still standing: the soil's rate is not a fixed number. Dry ground drinks fast
 * and then slows down as it wets, which is why a downpour is fine for ten minutes
 * and then starts to puddle. Level 3 takes that apart.
 */
export function getL2P19Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "P19 left you with two neighbouring fields and the same rainstorm. One drained in half an hour. The other stood under water for two days.\n\nThe reason was the soil: big connected spaces in sandy soil let water through, tiny ones in clay do not. But notice what that explanation cannot do. It cannot tell you whether **this** storm will flood **this** field. For that you need two speeds, and a subtraction.\n\nBoth speeds are measured in **millimetres per hour**, written **mm/h** -- the same unit a rain gauge uses. 20 mm/h of rain means that if none of it drained away or ran off, the water would get 20 mm deeper every hour.\n\nYour two dials are those two speeds.\n\n- **Rainfall Rate** is how fast the rain is arriving, in mm/h.\n- **How Fast the Soil Takes Water** is how fast that soil can swallow it, in mm/h. Sandy soil might manage 50 mm/h. Heavy clay might manage 2.\n\nRain is falling at **20 mm/h** onto soil that can take **8 mm/h**. What happens to the water?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "8 mm/h soaks in and the other 12 mm/h has to go somewhere else -- across the surface, or into puddles.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "It all soaks in, just more slowly than it arrives -- the soil catches up afterwards.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "The soil does catch up afterwards -- but only with the water that is still sitting on it. The rest has already gone.\n\nThink about a sink with the tap running faster than the plughole can drain. The water level rises. If the sink is deep, it holds the extra and drains later. If it is shallow, the water reaches the rim and spills onto the floor, and no amount of waiting brings that water back.\n\nA field is a very shallow sink. There is a little storage in the dips and the roughness of the surface -- a few millimetres, perhaps -- and once that is full, the surplus **runs off** downhill. It does not wait politely for the soil.\n\nAnd this is the part that matters beyond the field. That runoff does not vanish. It reaches a ditch, then a stream, then a river -- and it is a large part of what makes L2P18's discharge jump in a storm. The flood you measured there begins on ground exactly like this.",
            options: [
                { id: 'cont', label: "So the surplus leaves the field. How much surplus?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "It is a subtraction, and that is the whole formula:\n\n**water that runs off = rainfall rate - how fast the soil takes water in**\n\nBoth in mm/h, so the answer is in mm/h too.\n\nThree things to know before you use it:\n\n- **If the answer comes out negative, the runoff is zero.** Soil that can take 8 mm/h does not take 8 when only 5 is falling; it takes the 5 and waits. A negative answer means the rain is soaking in completely, with capacity to spare.\n- **Multiply by the hours to get a depth.** 12 mm/h running off for two hours is 24 mm of water leaving the field.\n- **The condition:** this assumes the rain falls steadily and the ground is roughly level. On a slope the runoff leaves faster; in a hollow it sits and waits.\n\nThe quantity being subtracted has a proper name. How fast soil takes water in is its **infiltration rate** -- to **infiltrate** is to work your way in gradually. It is not the same as P19's **porosity**, which was how much empty space the soil has in total. Clay has plenty of space and still takes water in slowly, because the spaces are too narrow to move water through quickly.",
            options: [
                { id: 'cont', label: "Put the storm through it.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**Rain at 20 mm/h, on soil that takes 8 mm/h, for two hours.**\n\n1. **Runs off:** 20 - 8 = **12 mm/h**\n2. **Over two hours:** 12 x 2 = **24 mm** leaves the field\n3. **And soaks in:** 8 x 2 = **16 mm** goes into the soil\n\nSo 40 mm of rain fell, 16 mm went in, and 24 mm ran off -- **more left than stayed**.\n\nNow change one thing. Same storm, but sandy soil that takes **50 mm/h**:\n\n- 20 - 50 is negative, so **nothing runs off**. All 40 mm soaks in.\n\nSame sky, same storm, opposite outcome. That is P19's two fields, now with numbers on them -- and you can see why the difference was so stark. It is not that the clay field drained *more slowly*. It is that the clay field **never got the water in the first place**, because most of it left across the surface.\n\nOne more figure worth having. A 25 mm storm is a decent shower. On soil taking 50 mm/h it is gone in **30 minutes**. On clay taking 2 mm/h, if it could all soak in, it would need **12.5 hours** -- and no storm waits that long, so nearly all of it runs off.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** Rain falls at **15 mm/h** for **3 hours** on soil that takes water in at **6 mm/h**.\n\nHow much water runs off the field in total?",
            options: [
                { id: 'right', label: "27 mm. 15 - 6 = 9 mm/h runs off, and 9 x 3 = 27 mm.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'forgot_hours', label: "9 mm, because 15 - 6 = 9.", nextNodeId: 'math_wrong' },
                { id: 'divided', label: "2.5 mm/h, from 15 divided by 6.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**9 mm** has the right subtraction and stops one step early. 9 is a **rate** -- 9 mm/h, how fast water is leaving. The question asked for a total, and a total needs the time: 9 mm/h x 3 h = **27 mm**. Watch the units and they tell you: mm/h multiplied by h leaves mm, which is a depth.\n\n**Dividing** does not fit either quantity. 15 mm/h divided by 6 mm/h gives 2.5 with no units at all, which is not a depth or a rate. Dividing two speeds tells you how many times faster one is than the other -- useful, but not what was asked.\n\n**27 mm**, which is a lot. It is more than a typical month's runoff from that field arriving in an afternoon, and it is why summer downpours cause flash floods while a week of drizzle does not.",
            options: [
                { id: 'retry', label: "Subtract for the rate, then multiply by the hours.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "**Try the two dials.** **Rainfall Rate** in mm/h, and **How Fast the Soil Takes Water** in mm/h.\n\n| Rain | Soil takes | Runs off | Over 2 hours |\n| --- | --- | --- | --- |\n| 5 mm/h | 8 mm/h | **none** | 0 mm |\n| 15 mm/h | 6 mm/h | 9 mm/h | **18 mm** |\n| 20 mm/h | 8 mm/h | 12 mm/h | **24 mm** |\n| 30 mm/h | 2 mm/h | 28 mm/h | **56 mm** |\n| 50 mm/h | 50 mm/h | **none** | 0 mm |\n\nTwo things stand out.\n\nThe first is that **gentle rain almost never runs off**, whatever the soil. 5 mm/h is a steady drizzle, and even slow clay keeps up with it. Flooding is not caused by a lot of rain so much as by rain arriving **faster than the ground can accept it**.\n\nThe second is that the worst row is not the wettest one. 30 mm/h on clay taking 2 mm/h loses 56 mm in two hours -- far more than the 50 mm/h row, where the ground keeps up perfectly. A heavy storm on good soil can be harmless. A moderate storm on sealed soil is not.\n\nWhich is why farmers care so much about anything that changes the second dial -- and B19 already told you what changes it most. Worms and roots make channels; heavy machinery and bare ground close them.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "It is the gap between the two rates that floods a field. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A field takes water in at **10 mm/h**. Two storms arrive in the same week, and both drop **30 mm of rain** in total.\n\n- **Storm A:** 30 mm in **1 hour**\n- **Storm B:** 30 mm spread over **6 hours**\n\nSame rain. Which storm floods the field, and how much runs off?",
            options: [
                { id: 'right', label: "Storm A. It falls at 30 mm/h, so 20 mm/h runs off for an hour -- 20 mm lost. Storm B falls at 5 mm/h, which is under 10, so all of it soaks in.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Neither -- they drop the same 30 mm, so the field ends up with the same water either way.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The sky delivered the same 30 mm. The field did not receive the same 30 mm, and that is the whole point of working in **rates** rather than totals.\n\n**Storm A:** 30 mm in 1 hour is a rainfall rate of 30 mm/h. The soil takes 10, so 30 - 10 = **20 mm/h** runs off, for one hour: **20 mm gone**. The field keeps 10 mm.\n\n**Storm B:** 30 mm over 6 hours is 5 mm/h. That is **below** the soil's 10 mm/h, so nothing runs off at all. The field keeps **all 30 mm**.\n\nThree times as much water into the ground, from identical rainfall. The only difference was how quickly it arrived.\n\nThis is why a rain forecast that gives only a daily total is nearly useless for deciding whether somewhere will flood. \"30 mm of rain tomorrow\" describes both of these storms, and one of them is a problem while the other is the best thing that could happen to the field.\n\nIt also explains something that sounds contradictory: a dry region can flood more easily than a wet one. Rain in dry places tends to arrive in short violent bursts, and bursts are exactly what beats the soil's rate.",
            options: [
                { id: 'retry', label: "Totals hide the rate, and the rate is what decides -- so rates, not totals, decide whether a field floods.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct -- **20 mm lost from Storm A, nothing lost from Storm B**, out of the same 30 mm of rain.\n\nSo the field gets 10 mm from one and 30 mm from the other. Three times the water, and the only thing that changed was the clock.\n\nThat is worth carrying, because it applies well beyond soil. Whenever something arrives at one speed and can be dealt with at another, **the totals tell you almost nothing and the rates tell you everything**. You have already met the same shape twice: L2P18's discharge counted water per second rather than in total, and L2C18's dissolved load was a rate as well.\n\nAnd this lesson hands the next one its starting figure. The water that **did** soak in is the water that will drain down through the soil later -- carrying dissolved things with it. C19 warned you about fertiliser reaching the river. Now you can see the route: it leaves in the water that goes **in**, not the water that runs **off**.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Rates, not totals!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You worked out whether a field floods.**\n\n- **water that runs off = rainfall rate - how fast the soil takes water in**, both in **mm/h**\n- A negative answer means **no runoff**: the rain is soaking in with capacity to spare\n- Multiply the rate by the hours for a depth: 12 mm/h for 2 h is **24 mm**\n- How fast soil takes water in is its **infiltration rate**, and it is **not** P19's porosity. Clay has plenty of space and still drinks slowly, because the spaces are too narrow\n- 20 mm/h on soil taking 8 mm/h loses **24 mm in two hours** -- more leaves than stays\n- The same storm on sandy soil taking 50 mm/h loses **nothing**\n- **Gentle rain hardly ever runs off.** Flooding comes from rain arriving faster than the ground can accept it\n- 30 mm in an hour loses 20 mm; the same 30 mm over six hours loses **none**. Totals hide the rate\n- Which is why a daily rainfall forecast cannot tell you whether somewhere will flood\n- Removed: P19's \"sand drains fast, clay drains slowly\", which could not say whether a given storm floods a given field\n- Still standing: the soil's rate is **not fixed**. Dry ground drinks fast and slows as it wets, which is why a downpour is fine for ten minutes and then puddles",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "The gap between two speeds, and the field floods!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- How Does Soil Support Life?**\n\nP19 told you which soil drains faster. Level 2 tells you whether the rain that is falling right now will get in.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Runoff | **rain rate - soil rate** | Both in mm/h |\n| Negative answer | no runoff | The ground is keeping up |\n| Rate to depth | x the hours | 12 mm/h for 2 h = 24 mm |\n| Infiltration rate | how fast soil drinks | Not the same as porosity |\n| The worked storm | 20 - 8 = 12 mm/h | **24 mm** lost in two hours |\n| Sandy soil, same storm | 20 - 50 | **Nothing** lost |\n| Same total, different speed | 30 mm in 1 h vs 6 h | 20 mm lost, or none |\n| Not in the formula | that the soil rate **falls** as it wets | Which is Level 3 |\n\n**The one line to remember:** a field floods not because a lot of rain fell but because it fell faster than the ground could take it, so the same 30 mm can be a disaster or a gift depending only on how long it took to arrive.\n\n**Up next:** C19 -- the water that soaked in carries dissolved fertiliser down with it, and now you can work out how much of a bag of nitrogen the crop never gets."
        }
    };
}

import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 19, physics. A Mechanism lesson: no new
 * apparatus, only a force balance and a length that grows.
 *
 * L2P19 treated "how fast the soil takes water in" as a fixed number, which made
 * the runoff arithmetic work but contradicts something everybody has watched. A
 * downpour on dry ground vanishes for the first few minutes and then starts to
 * puddle, with no change in the rain. So the soil's rate is not a constant, and
 * this lesson works out what it actually is:
 *
 *   soaking rate = the soil's own speed x (1 + pull of dry soil / water soaked in so far)
 *
 * Two forces move water down: gravity, which never changes, and the pull of dry
 * soil on water, which is fierce but has to reach across everything already wet.
 * The further in the water has gone, the longer that reach, so the bracket falls
 * towards 1 and the rate settles at the soil's own speed. Worked with a soil of
 * 8 mm/h and a pull of 100 mm: 88 mm/h when 10 mm has gone in, 16 at 100 mm,
 * 10 at 400 mm -- and never below 8, however long it rains.
 *
 * The denominator is the water that has soaked in, measured in mm like a rain
 * gauge reading, not the depth of soil that has been wetted. Those two differ by
 * how much room the soil had, and using the first keeps the arithmetic honest:
 * rain at 20 mm/h overtakes this soil once 67 mm has gone in, which takes 3.3
 * hours at that rate.
 *
 * Still standing: this assumes a sharp boundary between wet and dry soil and
 * uniform soil all the way down. It also ignores surface sealing, which is a
 * different mechanism with the same symptom.
 */
export function getL3P19Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2P19 gave you a clean subtraction: runoff is the rainfall rate minus how fast the soil takes water in. It worked, and it hid something you have certainly seen.\n\nStand outside at the start of a summer downpour on dry ground. For the first minute or two the water simply **disappears** -- no puddles, no streams, the ground swallowing everything. Then, with the rain falling exactly as hard as before, puddles appear and water starts running down the path.\n\nNothing about the rain changed. If the soil's rate were a fixed number, nothing about the runoff should have changed either.\n\nSo the rate is not fixed. It starts high and falls. What sets it is a competition between two forces you already know, so this lesson needs no new physics at all -- only a length that grows.\n\nYour two dials are those two forces, as the numbers a soil scientist would measure.\n\n- **The Soil's Own Speed** is how fast water moves down through this soil under gravity alone, in mm/h. Sand is fast, clay is slow.\n- **Pull of Dry Soil** is how strongly dry soil draws water into itself. It is quoted as a height in mm, because a pull on water can always be written as the height of water it would lift -- the same way blood pressure is quoted as a height of mercury.\n\nWhy would dry soil pull water at all?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "The same reason water climbs into a narrow tube -- water clings to the walls of tiny spaces and is drawn along them.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "It does not pull. Water only moves down because gravity pulls it, and dry soil simply has room for it.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Room is not enough, and there is an experiment that settles it in seconds: **water moves the wrong way**.\n\nDip the corner of a dry paper towel in water and the wet patch climbs *upwards*, against gravity, several centimetres. Put a dry brick in a tray of water and the damp line rises through it. Nothing is pushing that water up. It is being **pulled**, and by the same thing that makes water creep up the inside of a narrow tube.\n\nThe cause is that water sticks to solid surfaces and to itself. In a space narrow enough, the sticking-to-the-walls beats the weight of the water, and the water is drawn in. Soil is full of spaces that narrow.\n\nSo dry soil does not merely accept water. **It actively takes it**, harder than gravity does -- and the drier and finer the soil, the harder it pulls.\n\nWhich sets up the whole lesson. Two things move water into soil: gravity, which is constant, and this pull, which is fierce at first. Watch what happens to each as the water gets further in.",
            options: [
                { id: 'cont', label: "So there are two forces. What changes as the water gets further in?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Gravity does not change at all. The pull does not weaken either -- but **the distance it has to reach across** grows, and that is the whole mechanism.\n\nPicture the water going in as a front: soil above it is wet, soil below it is still dry. The pull acts at that front, where wet meets dry. But water at the surface has to travel through everything already wet to get there, and pushing water through soil costs effort in proportion to the distance.\n\nSo the pull is fixed and the journey lengthens. Early on the pull is working across a few millimetres. Later, across hundreds. Spread the same pull over a longer path and what arrives at the far end is weaker.\n\nGravity, meanwhile, grows with the distance in exactly the same proportion as the resistance does, so it never fades. It is the floor.\n\nHow far in the water has got is measured by **how much water has soaked in so far**, in mm -- the same kind of number a rain gauge gives, so 20 mm means enough water to cover the ground 20 mm deep has gone into it. Putting the two forces together:\n\n**soaking rate = the soil's own speed x (1 + pull of dry soil / water soaked in so far)**\n\nRead the bracket. At the start almost nothing has gone in, so the pull term is enormous and the rate is many times the soil's own speed. As more soaks in, the pull term shrinks, the bracket falls towards **1**, and the rate settles at the soil's own speed and stays there.\n\n**The conditions:** a sharp boundary between wet and dry, uniform soil with depth, and enough water at the surface that the soil is never kept waiting. The proper name for the soil's own speed is its **hydraulic conductivity** -- *hydraulic* meaning to do with water, *conductivity* meaning how readily something is let through.",
            options: [
                { id: 'cont', label: "Put a real soil through it.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**A soil whose own speed is 8 mm/h, with a dry-soil pull of 100 mm.**\n\n| Water soaked in so far | The bracket | Soaking rate |\n| --- | --- | --- |\n| 10 mm | 1 + 100/10 = 11 | **88 mm/h** |\n| 20 mm | 1 + 100/20 = 6 | **48 mm/h** |\n| 50 mm | 1 + 100/50 = 3 | **24 mm/h** |\n| 100 mm | 1 + 100/100 = 2 | **16 mm/h** |\n| 200 mm | 1 + 100/200 = 1.5 | **12 mm/h** |\n| 400 mm | 1 + 100/400 = 1.25 | **10 mm/h** |\n\nNow read that against L2P19's storm. Rain at **20 mm/h** on this soil:\n\n- **At the start** the soil is taking 88 mm/h against 20 mm/h of rain. Everything soaks in, nothing runs off, and the ground looks bottomless.\n- **After 20 mm has gone in** the soil manages 48 mm/h. Still comfortably ahead of the rain.\n- **After 67 mm has gone in** the soil is down to 20 mm/h and the rain has just overtaken it. **This is the moment puddles appear** -- and at 20 mm/h, putting 67 mm into the ground has taken **3.3 hours**.\n- **After 400 mm** the soil takes 10 mm/h and half the rain is running off.\n\nSo L2P19's answer was not wrong so much as **a snapshot**. Its fixed 8 mm/h is where this soil ends up after a long soaking: the right number for a wet winter, and badly wrong for the first hours of a thunderstorm.\n\nAnd notice the shape. The rate plunges and then flattens. Between 10 mm and 50 mm it falls from 88 to 24; between 200 mm and 400 mm it falls from 12 to 10. **Nearly all of the change happens early.**",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A soil has its own speed of **5 mm/h** and a dry-soil pull of **150 mm**. So far, **50 mm** of water has soaked in.\n\nWhat is the soaking rate now?",
            options: [
                { id: 'right', label: "20 mm/h. The bracket is 1 + 150/50 = 4, and 5 x 4 = 20.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'forgot_one', label: "15 mm/h, from 5 x 150/50.", nextNodeId: 'math_wrong' },
                { id: 'flipped', label: "1.7 mm/h, from 5 x (1 + 50/150).", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**Dropping the 1** loses the floor, and the floor is the physics. That 1 is gravity, and gravity never fades -- it is why the rate settles at the soil's own speed instead of falling to nothing. Without it the formula says that after enough rain the soil stops accepting water entirely, which no soil does. Test any version of this formula by making the soaked-in amount very large: the answer must approach the soil's own speed, and 5 x 150/50 does not.\n\n**Flipping the fraction** makes the rate *rise* as more water goes in, which is the opposite of everything this lesson is about. Check which way each quantity should push. A **stronger** pull should give a **faster** rate, so the pull belongs on top. **More** water already in means a longer journey and a slower rate, so that belongs underneath.\n\n**5 x (1 + 150/50) = 5 x 4 = 20 mm/h.** Four times the soil's own speed, and still falling.",
            options: [
                { id: 'retry', label: "Keep the 1 -- that is gravity, and it is the floor.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "**Try the two dials.** **The Soil's Own Speed** in mm/h and **Pull of Dry Soil** in mm, with the soaked-in amount climbing as the rain falls.\n\nTwo things are worth hunting for.\n\n**First, the pull decides the early minutes and nothing else.** Set a large pull and the opening rate is enormous, but the settled value does not budge -- it is the soil's own speed either way. Set the pull near zero and the soil takes water at its own speed from the first second. So the pull controls **how long the ground looks bottomless**, and the soil's own speed controls **the rest of the storm**.\n\nAnd there is a twist, because fine soils have the **strongest** pull. Clay draws water in harder than sand, its spaces being narrower. So dry clay swallows the opening burst of a storm impressively -- and then collapses to 2 mm/h and floods, while sand carries on at 50. **The soil that looks best in the first minute can be the worst by the tenth.**\n\n**Second, dryness is a resource that gets spent.** The pull is strong because the soil below is dry, and every millimetre that soaks in uses some of that dryness up. Which is why the second storm of a wet week behaves so differently from the first: a great deal has already gone in, the bracket is already close to 1, and the soil offers its own speed from the outset with no bottomless phase at all.\n\nThat is the honest reason floods so often come from the **second** day of rain rather than the heaviest hour of the first.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "The pull buys time; the soil's own speed decides the storm. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** Two fields, the same soil, the same rain at **20 mm/h for 3 hours** -- 60 mm in all. The soil's own speed is 8 mm/h and its dry pull is 100 mm.\n\n- **Field A** has been dry for three weeks, so almost nothing has soaked in yet.\n- **Field B** was soaked yesterday, and **100 mm** has already gone in.\n\nA forecaster says both fields will behave the same, since the soil and the rain are identical. What actually happens?",
            options: [
                { id: 'right', label: "Field A starts near 88 mm/h and does not fall to 20 mm/h until 67 mm has gone in, which takes longer than the storm -- so it sheds nothing. Field B is at 16 mm/h from the first minute, so it sheds 4 mm/h, about 12 mm over the storm.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "The forecaster is right about the long run and wrong only about the first few seconds, which cannot matter much across a whole storm.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The long run is right. \"Only the first few seconds\" is not, and the arithmetic shows what it is worth.\n\n**Field A.** It starts at 88 mm/h and slows as water goes in. The rain overtakes it when the rate reaches 20 mm/h, which happens once **67 mm** has soaked in. At 20 mm/h that takes **3.3 hours** -- and the storm is only 3 hours long. So Field A takes the whole 60 mm and **sheds nothing at all**.\n\n**Field B.** 100 mm has already gone in, so the bracket is 1 + 100/100 = 2 and the rate is **16 mm/h** from the first minute. The rain is 20, so it sheds 4 mm/h throughout: about **12 mm** across the storm.\n\nSo the same soil under the same rain loses nothing or loses 12 mm, decided entirely by what happened last week.\n\nThat is not a detail at the start. Most rainstorms last a few hours, and for dry soil the bottomless phase can cover **the entire storm**. The head start is not a curiosity; it is often the whole event.\n\nWhere your instinct is right is the limit: given long enough, both fields converge towards 8 to 10 mm/h, because both brackets head for 1. Dryness only ever buys time. It is simply that storms are short enough for the time it buys to decide the outcome -- which is why flood warnings depend so much on how wet the ground already is.",
            options: [
                { id: 'retry', label: "The head start can cover the whole storm, because storms are short.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Exactly -- **nothing shed against about 12 mm**, from identical soil and identical rain. The phrase to keep is that **dryness buys time**: Field A needed 67 mm to go in before it started shedding, and at 20 mm/h that is 3.3 hours, longer than the storm lasted.\n\nSo this mechanism explains a set of things L2P19's fixed number could not:\n\n- **Why a downpour vanishes and then puddles**, with no change in the rain.\n- **Why the second day of rain floods** when the first day did not: the dryness has been spent and the bracket is already near 1.\n- **Why flood forecasting has to know how wet the ground already is**, not only how much rain is coming.\n- **Why fine soil can look best early and worst later**: clay pulls hardest and conducts slowest, so it wins the first minute and loses the afternoon.\n- **Why the rate never reaches zero.** However long it rains, the bracket bottoms out at 1 and the soil keeps taking its own speed. Gravity does not get tired.\n\nAnd it repairs L2P19 rather than discarding it. That lesson's fixed rate is the **settled** value -- what this formula gives once the bracket has collapsed to 1. Exactly right for a long wet spell, and a serious underestimate of dry ground.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Dryness buys time, and gravity sets the floor.", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You worked out why the ground stops drinking.**\n\n- **soaking rate = the soil's own speed x (1 + pull of dry soil / water soaked in so far)**\n- Two forces drive water in: **gravity**, which never changes, and the **pull of dry soil**, which is fierce but has to reach across everything already wet\n- The pull is real and beats gravity: a dry paper towel draws water **upwards**\n- A pull on water can be quoted as a **height** in mm, the way blood pressure is quoted as a height of mercury\n- As more water soaks in, the same pull reaches across a longer path, so the bracket falls towards **1**\n- The **1** is gravity, and it is the floor. Drop it and the formula claims soil eventually refuses water altogether, which none does\n- A soil of 8 mm/h with a 100 mm pull: **88 mm/h** at 10 mm soaked in, 48 at 20 mm, 16 at 100 mm, **10** at 400 mm\n- Against 20 mm/h of rain, puddles appear once **67 mm** has gone in -- which takes **3.3 hours** at that rate\n- **Nearly all the change happens early**: 88 to 24 across the first 50 mm, 12 to 10 across the last 200\n- The **pull decides the opening minutes**; the soil's own speed decides the rest of the storm\n- Fine soil pulls **hardest** and conducts slowest, so clay can look best in the first minute and flood by the tenth\n- **Dryness is a resource that gets spent**, which is why the second day of rain floods when the first did not\n- Two fields, same soil, same 3-hour storm: the dry one sheds **nothing**, the pre-soaked one about **12 mm**\n- Removed: L2P19's fixed rate, which was really the settled value\n- Still standing: this assumes a **sharp boundary** between wet and dry and **uniform soil** with depth. It also ignores **surface sealing**, where raindrops beat bare soil into a crust -- a different mechanism with the same symptom",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Dry ground is bottomless, until it is not!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- How Does Soil Support Life?**\n\nL2P19 subtracted two speeds. Level 3 asks where the second speed comes from, and finds it is not a constant at all.\n\n**Summary Table:**\n| Step | The Physics | The Number |\n| --- | --- | --- |\n| Two forces drive water in | gravity, and the **pull of dry soil** | the pull quoted as a height, 100 mm |\n| The pull is real | a dry towel draws water **upwards** | it beats gravity in narrow spaces |\n| What changes | not the pull, but the **distance** it reaches across | measured by the water soaked in |\n| The formula | **own speed x (1 + pull / soaked in)** | 8 x (1 + 100/10) = 88 mm/h |\n| Early | the bracket is huge | **88 mm/h**, the ground looks bottomless |\n| Late | the bracket falls to 1 | **10 mm/h**, and never below 8 |\n| The 1 | is **gravity**, the floor | drop it and soil would refuse water |\n| Against 20 mm/h rain | puddles once 67 mm is in | **3.3 hours** at that rate |\n| Dryness | is a resource that gets **spent** | why day two floods, not day one |\n| Not explained | surface **sealing** into a crust | Still standing |\n\n**The one line to remember:** dry soil pulls water in harder than gravity does, but that pull has to reach across everything already wet -- so the ground is bottomless at first, settles at its own speed within a few hours, and never quite refuses water, because gravity does not get tired.\n\n**Up next:** C19 and L2C19 left nitrogen leaving the field while potassium stays put. That is not about the plants at all -- it is about what soil can and cannot hold on to."
        }
    };
}

import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) companion to P16 "Magnets & Navigation".
 *
 * P16 said the needle aligns to the local field and left it there. This lesson
 * puts two numbers on that: only the horizontal part of Earth's field turns a
 * needle,
 *
 *   horizontal field = total field x cos(dip)
 *
 * and magnetic north is not true north, so a bearing walked without correction
 * drifts by
 *
 *   distance off = distance travelled x tan(declination)
 *
 * Worked on London (49 uT, dip 66 deg, so only 19.9 uT turns the needle) and a
 * 10 degree declination over 10 km, which lands you 1.76 km off.
 *
 * Condition stated: a smooth unchanging field with no local iron. Held fixed and
 * named for Level 3: the field is simply given -- nothing here makes one.
 */
export function getL2P16Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "P16 showed that a compass needle is a tiny magnet, and that it turns until it lines up with the field where it sits.\n\nThat is true, and it hides two problems P16 never counted.\n\nThe first: Earth's field does not lie flat along the ground -- over most of the world it points steeply **into** the ground, and a needle pivoted flat cannot follow that part at all. The angle the field tips down from flat is the **dip angle**, and it is the first dial under the picture.\n\nThe second: the needle points at **magnetic north**, which is not the same place as the **North Pole** on your map. The angle between those two norths is the **declination**, and it is the second dial.\n\nSo suppose you walk **10 km** on a compass bearing, trusting the needle completely. How far from your target could you finish?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Possibly more than a kilometre. A small angle error opens into a large distance the further you walk.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "A few metres at most. A compass points north, so any error must be tiny.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "A compass is accurate about what it measures. The trouble is that what it measures is not quite what you want.\n\nThe needle points along the field, towards **magnetic north** -- a place that wanders around the Arctic, hundreds of kilometres from the **geographic North Pole** your map is drawn around. The angle between the two is called the **declination**, and where you stand decides how big it is.\n\nAnd an angle is not a distance. Walk far enough on a bearing that is a little wrong, and the gap grows with every step:\n\n| Declination | After 1 km | After 10 km |\n| --- | --- | --- |\n| 2° | 35 m | **349 m** |\n| 10° | 176 m | **1.76 km** |\n| 20° | 364 m | 3.64 km |\n\nTen degrees sounds forgivable. Over a day's walk it is nearly two kilometres -- the difference between reaching a hut and missing a valley.",
            options: [
                { id: 'cont', label: "So how do I work with those two numbers?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "First, how strong the field is.\n\nMagnetic field strength is measured in **tesla (T)**. Earth's field is very weak: about **50 microtesla (µT)**, and a **microtesla** is a millionth of a tesla. A fridge magnet, up close, is about a hundred times stronger.\n\n**Only the horizontal part turns a compass.** The field tips into the ground at the **dip angle**, measured **down from horizontal** -- that is the frame of reference, and it is steep near the poles and flat near the equator:\n\n**horizontal field = total field x cos(dip)**\n\nSecond, which way it points.\n\n**True north** is the direction of the geographic North Pole -- the way your map's grid runs. **Magnetic north** is where the needle points. The **declination** is the angle between them, stated as so many degrees **east or west of true north**: that is the frame of reference, and swapping east for west sends you wrong by twice the angle.\n\nAn angle becomes a distance through:\n\n**distance off = distance travelled x tan(declination)**\n\nThe conditions belong here. **This assumes a smooth field with no local iron** -- no steel beams, no car, no phone, which is exactly the disturbance P16 let you play with. And **declination drifts**: it is not a constant of a place but of a place *and a year*.",
            options: [
                { id: 'cont', label: "Work both of them out.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**How much field actually turns the needle.**\n\nIn **London** the total field is about **49 µT** and the dip is about **66°**.\n\n**Step 1.** cos 66° = **0.407**\n\n**Step 2.** horizontal field = 49 x 0.407 = **19.9 µT**\n\nSo a London compass is turned by only about **40%** of the field it sits in. The rest is pulling the needle downwards, where its pivot will not let it go.\n\nIn **Singapore**, near the equator, the total field is weaker -- about **41 µT** -- but the dip is only **12°**:\n\n**Step 1.** cos 12° = **0.978**\n\n**Step 2.** horizontal field = 41 x 0.978 = **40.1 µT**\n\n| | Total field | Dip | Turning the needle |\n| --- | --- | --- | --- |\n| London | 49 µT | 66° | **19.9 µT** |\n| Singapore | 41 µT | 12° | **40.1 µT** |\n\nA weaker field, twice the turning strength. That is why a compass feels decisive near the equator and sluggish in the far north.\n\n**How far a bearing error takes you.** Declination **10°**, walking **10 km**:\n\n**Step 1.** tan 10° = **0.176**\n\n**Step 2.** distance off = 10 x 0.176 = **1.76 km**",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** Your map says the declination where you are standing is **2° west**. You walk **10 km** on a compass bearing and never correct for it.\n\nHow far from your target do you finish? (tan 2° = 0.0349)",
            options: [
                { id: 'right', label: "About 349 m. 10 km x 0.0349 = 0.349 km.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'used_degrees', label: "About 2 km, because 2° over 10 km is roughly 2 km.", nextNodeId: 'math_wrong' },
                { id: 'too_small', label: "About 20 m, because 2° is such a small angle.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**2 km** read the angle as if it were already a distance. Degrees and kilometres are different things: the formula is what turns one into the other.\n\n**20 m** guessed small because the angle is small. Check it against the arithmetic instead -- a small angle over a long walk is still a long way.\n\n**Step 1.** tan 2° = **0.0349**\n\n**Step 2.** distance off = 10 km x 0.0349 = **0.349 km = 349 m**\n\nThree and a half football pitches, from an error most people would call negligible. And notice how the answer scales: walk **20 km** on the same bearing and you are **698 m** out. The error is not fixed -- it is a fixed **fraction** of how far you have come.",
            options: [
                { id: 'retry', label: "The angle sets a fraction of the distance.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials.\n\n**Dip Angle** tips the field into the ground, from flat at the equator to steep near the poles. **Declination** sets how far magnetic north sits from true north, west or east.\n\nThe lab draws the field arrow and the needle, works out how much field is left to turn the needle, and shows where a 10 km walk actually ends.\n\nTry this:\n\n- **Dip 66°** with a total field of 49 µT: only **19.9 µT** turns the needle -- London\n- Flatten the dip to **12°**: the turning field jumps to nearly the whole 41 µT -- Singapore\n- Push the dip to **85°**, close to the magnetic pole: the horizontal field nearly vanishes and the needle loses its grip on north altogether\n- Set **declination** to 10° and watch the 10 km walk finish **1.76 km** off; set it to 0° and the error disappears\n- Switch declination from **10° west** to **10° east** and the miss lands on the other side -- same size, opposite direction",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Cosine for strength, tangent for distance. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** Airport runways are numbered by their compass bearing: runway **27** points on a magnetic bearing of about 270°, due magnetic west.\n\nEvery few decades, airports repaint those numbers -- a runway that was 27 becomes 26. The concrete has not moved a centimetre.\n\nWhy do the numbers change?",
            options: [
                { id: 'right', label: "Because the numbers are magnetic bearings, and magnetic north drifts. As the declination at that airport changes, the same strip of concrete has a different magnetic bearing, so the painted number goes stale even though the runway has not moved.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Because the ground shifts over decades, so the runway really is pointing somewhere slightly different.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Continents do move, but nowhere near fast enough. Plate motion is a few centimetres a year: over fifty years a runway might travel a couple of metres sideways while keeping almost exactly the same heading.\n\nWhat moves is the **reference**. Magnetic north is not a fixed point -- it wanders, and it has wandered fast in recent decades, hundreds of kilometres across the Arctic. As it moves, the declination at any given airport changes with it.\n\nSo:\n\n| | Changes? | How fast |\n| --- | --- | --- |\n| The concrete's true bearing | barely | centimetres a year |\n| Magnetic north | **yes** | tens of kilometres a year |\n| The runway's **magnetic** bearing | **yes** | enough to repaint every few decades |\n\nAnd this is the same fact as your 10 km walk, seen from the other end. There, a wrong declination moved **you**. Here, a drifting declination moves the **number** that describes a thing which never moved.\n\n**A magnetic bearing is a measurement against a moving reference, so it needs a date attached as well as a place.**",
            options: [
                { id: 'retry', label: "The reference drifts, not the runway.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **A compass measures the local field honestly; turning that into a direction on a map needs the declination for your place and your year.**\n\nSo P16's needle is now two numbers. **cos(dip)** says how much of the field is left to turn it, which is why compasses behave differently at different latitudes. **tan(declination)** says what an uncorrected bearing costs you per kilometre walked.\n\nOne thing this lesson held fixed: **the field was simply given** -- 49 µT in London, 41 µT in Singapore, take it as read. Nothing here says where a magnetic field comes from, or how you would make one to order. Level 3 builds a field out of a coil of wire and a current, and finds it can beat Earth's by a hundred times with a couple of AA batteries.\n\nC16 showed heat disturbing the domains in a magnet. C16 at Level 2 finds the temperature where they give up entirely.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Cosine for strength, tangent for distance!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You put numbers on a compass.**\n\n- Field strength is in **tesla (T)**; Earth's is about **50 microtesla (µT)**, a millionth of a tesla each\n- The field tips into the ground at the **dip angle**, measured **down from horizontal**\n- **horizontal field = total field x cos(dip)** -- only that part can turn a flat needle\n- London: 49 µT at dip 66° leaves **19.9 µT**, about 40% of the field\n- Singapore: a weaker 41 µT at dip 12° leaves **40.1 µT** -- twice the turning strength\n- **True north** is the map's north; **magnetic north** is the needle's. The gap is the **declination**, stated **east or west** of true north\n- **distance off = distance travelled x tan(declination)**\n- 10° over 10 km puts you **1.76 km** out; 2° over 10 km still costs **349 m**\n- The error is a fixed **fraction** of the distance, so 20 km doubles it to 698 m\n- Runway numbers are magnetic bearings, so they go stale as magnetic north drifts -- the concrete never moves\n- Conditions: a smooth field, no local iron, and a declination that belongs to a **year** as well as a place\n- Held fixed: the field was given, not made",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "An angle becomes a distance!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- How Far Off Is North?**\n\nP16 aligned a needle. Level 2 counts what that alignment is worth.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Field strength | **tesla (T)** | Earth's is about 50 µT |\n| Dip angle | measured down from horizontal | Steep at the poles, flat at the equator |\n| Turning field | **total x cos(dip)** | London keeps only 19.9 of 49 µT |\n| Near the equator | 41 µT at dip 12° | **40.1 µT**, twice London's |\n| Declination | true north to magnetic north | Stated **east or west** |\n| Cost of ignoring it | **distance x tan(declination)** | 10° over 10 km = **1.76 km** |\n| Even a small one | 2° over 10 km | **349 m** |\n| It scales | 20 km doubles it | 698 m |\n| Runway numbers | magnetic bearings | Repainted as north drifts |\n| Held fixed | the field was given | Level 3 makes one |\n\n**The one line to remember:** a cosine tells you how much of Earth's field is left to turn your needle, and a tangent turns the leftover angle into the kilometres you will miss by.\n\n**Up next:** C16 -- the temperature at which a magnet stops being one."
        }
    };
}

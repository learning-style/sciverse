import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 12, physics.
 *
 * L2P12 worked out the pull at any distance but never let anything move. This
 * removes that simplification: for a circle, the inward acceleration needed is
 * v^2 / r, gravity supplies g = 9.8 x (R/r)^2, and setting them equal gives
 * v = sqrt(g x r), with T = 2 pi r / v. Worked by hand: the ISS at 7.7 km/s and
 * 93 minutes, and Newton's Moon test at 1.0 km/s and 27.3 days. The checkpoint
 * derives Kepler's third law, T^2 in proportion to r^3.
 *
 * Frame of reference stated: acceleration towards the centre, distance from
 * the centre. Condition stated: a circular orbit at steady speed. Still
 * standing: real orbits are ellipses, the satellite's own mass is ignored, and
 * low orbits meet thin air.
 */
export function getL3P12Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2P12 worked out gravity's pull at any distance -- and named what it held fixed: **the pull only, with nothing moving**.\n\nA pull on its own brings things down. At the **ISS** -- the International Space Station -- 400 km up, gravity is **8.7 N/kg**, so an astronaut dropped there with no sideways speed would fall to Earth in about five minutes.\n\nThe ISS does not. As P12 said, it is **falling sideways fast enough to keep missing**.\n\nSo is any high speed good enough?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "No. At each height there is one particular speed that bends the fall into a circle: too slow and the path dips inwards, too fast and it swings out.", nextNodeId: 'circle', sentiment: 'positive' },
                { id: 'bad', label: "Yes -- space has nothing to slow you down, so any fast speed keeps you up there.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Whirl a ball on a string around your head. Speed it up, and you feel the string pull **harder** -- a faster circle needs a stronger inward pull. Slow down, and the string goes slack and the ball drops inwards.\n\nIn orbit, gravity is the string, and its strength is already fixed by the height: 8.7 N/kg at the ISS, no more and no less.\n\nSo the speed has to match the string you have got:\n\n- **too slow** -- gravity bends the path more than a circle needs, and it dips inwards\n- **too fast** -- the path bends too little, and it swings outwards\n- **just right** -- the fall curves at exactly the rate that keeps the height steady\n\nOne height, one circular speed. To find it, you need the rule for going round a circle.",
            options: [
                { id: 'cont', label: "What is that rule?", nextNodeId: 'circle' }
            ]
        },
        circle: {
            id: 'circle',
            speaker: 'AI',
            content: "Anything moving in a circle at a steady speed is **accelerating** -- not speeding up, but constantly changing direction. That acceleration points **towards the centre** of the circle, which is the frame of reference here, and its size is:\n\n**acceleration needed = v² / r**\n\nFaster (bigger v) or tighter (smaller r) means a sharper turn, and a sharper turn needs more acceleration.\n\nNow bring in L2P12's gravity. In free fall, gravity gives everything the same acceleration, whatever its mass -- P12's point that a 1 kg and a 1,000 kg satellite orbit alike:\n\n**acceleration from gravity = 9.8 x (R / r)²**\n\nFor a circular orbit, the acceleration gravity **supplies** must equal the acceleration the circle **needs**:\n\nv² / r = 9.8 x (R / r)²\n\nMultiply both sides by r, then take the square root:\n\n**v = √(gravity at that height x r)**\n\nAnd once you know the speed, the time for one lap is the distance round the circle divided by the speed:\n\n**T = 2 x π x r / v**\n\nThe condition belongs here. **This is for a circular orbit at a steady speed**, with distances measured from the centre.",
            options: [
                { id: 'cont', label: "Work out the ISS and the Moon.", nextNodeId: 'by_hand' }
            ]
        },
        by_hand: {
            id: 'by_hand',
            speaker: 'AI',
            content: "**The ISS.** r = 6,800 km = **6.8 x 10⁶ m**, and gravity there is **8.7 N/kg**.\n\n**Step 1.** v² = 8.7 x 6.8 x 10⁶ = **5.9 x 10⁷**\n\n**Step 2.** v = √(5.9 x 10⁷) = **7,700 m/s**, about **7.7 km/s**\n\n**Step 3.** T = 2 x π x 6.8 x 10⁶ / 7,700 = 4.27 x 10⁷ / 7,700 = **5,550 s**\n\n**Step 4.** 5,550 / 60 = **93 minutes** -- the ISS really does go round about sixteen times a day.\n\n**The Moon.** r = 384,000 km = **3.84 x 10⁸ m**, and L2P12 gave gravity there as **0.0027 N/kg**.\n\n**Step 1.** v² = 0.0027 x 3.84 x 10⁸ = **1.04 x 10⁶**\n\n**Step 2.** v = **1,020 m/s**, about 1 km/s\n\n**Step 3.** T = 2 x π x 3.84 x 10⁸ / 1,020 = **2.36 x 10⁶ s**\n\n**Step 4.** 2.36 x 10⁶ / 86,400 = **27.3 days** -- the Moon's real time round.\n\n| | Distance from the centre | Gravity | Speed | Time round |\n| --- | --- | --- | --- | --- |\n| ISS | 6,800 km | 8.7 N/kg | **7.7 km/s** | **93 minutes** |\n| Moon | 384,000 km | 0.0027 N/kg | **1.0 km/s** | **27.3 days** |\n\nThis is the check Newton himself made. The rule that makes an apple fall, stretched out to 60 Earth radii, gives the Moon's month **to the day**. One rule, two wildly different patterns.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** L2P12's high satellite orbits at **r = 42,400 km = 4.24 x 10⁷ m**, where gravity is **0.22 N/kg**.\n\nHow fast must it travel, and how long is one lap?",
            options: [
                { id: 'right', label: "About 3.1 km/s, and one lap takes about 24 hours. v² = 0.22 x 4.24 x 10⁷ = 9.3 x 10⁶, so v = 3,050 m/s, and T = 2 x π x 4.24 x 10⁷ / 3,050 = 87,000 s.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'same', label: "7.7 km/s, the same as the ISS -- orbital speed is the same everywhere.", nextNodeId: 'math_wrong' },
                { id: 'surface_g', label: "About 20 km/s, from v = √(9.8 x 4.24 x 10⁷).", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**7.7 km/s** is the ISS's speed, at its own height. Higher orbits are **slower**, because gravity out there is weaker and a gentler curve is all that is needed.\n\n**20 km/s** used **surface** gravity, 9.8 N/kg. At 42,400 km from the centre, L2P12's rule gives only 0.22 N/kg -- forty-four times weaker.\n\n**Step 1.** v² = 0.22 x 4.24 x 10⁷ = **9.3 x 10⁶**\n\n**Step 2.** v = **3,050 m/s**, about 3.1 km/s\n\n**Step 3.** T = 2 x π x 4.24 x 10⁷ / 3,050 = **87,000 s**, which is **24 hours**\n\nThat is what makes this height special. A satellite there goes round once a day, so it stays above the same spot on the turning Earth -- which is why television and weather satellites sit at exactly this height.",
            options: [
                { id: 'retry', label: "Weaker gravity, slower orbit.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials, for Earth: radius **6,400 km**, surface gravity **9.8 N/kg**.\n\n**Orbit Height** is the height above the surface, in km. **Satellite Mass** is the mass of the satellite, in kg.\n\nThe lab works out the gravity there, the circular speed, and the time for one lap.\n\nTry this:\n\n- Set **400 km**: the ISS, 7.7 km/s, 93 minutes\n- Set **36,000 km**: 3.1 km/s, and one lap a day\n- Change **Satellite Mass** from 100 kg to 10,000 kg. The speed and the time do not move at all -- the mass cancels out, exactly as P12 said\n- Climb higher and higher: the speed falls, but the time round grows",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "One height, one speed. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** Higher orbits take longer. Satellite B orbits at **twice** satellite A's distance from Earth's centre.\n\nDoes B take **twice** as long to go round?",
            options: [
                { id: 'right', label: "No, about 2.8 times as long. The lap is twice as far, and the speed is lower too: doubling r quarters the gravity, so v = √(g x r) falls by √2. Together, the time grows by 2 x √2 = 2.83.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Yes. Twice as far around the circle means twice as long.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Twice as far around would be right if the speed stayed the same. It does not: the higher satellite moves **slower**.\n\n| | Satellite A | Satellite B, at 2r |\n| --- | --- | --- |\n| Gravity | g | g / 4 |\n| Speed, √(gravity x r) | v | √(g/4 x 2r) = **v / √2** |\n| Distance round | 2πr | 2 x 2πr |\n| Time round | T | 2 x √2 x T = **2.83 T** |\n\nThe ISS and the Moon prove it. The Moon is about 56 times further out than the ISS, and 56^1.5 is about 420 -- and 93 minutes x 420 is about 27 days. ✓\n\nWriting that pattern out: **T is in proportion to r^1.5**, or squaring both sides, **T² is in proportion to r³**.\n\nJohannes Kepler found exactly this in the planets' motions in **1619**, by staring at tables of measurements -- seventy years before Newton explained where it comes from.",
            options: [
                { id: 'retry', label: "Further out, slower and longer.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **T² grows in proportion to r³ -- Kepler's third law, which falls out of two lines of algebra once you set the gravity equal to the circle.**\n\nHere is the simplification this lesson removed. **L2P12 gave the pull and stopped there.** Adding one more rule, v² / r, turns that pull into a speed and a time: 93 minutes for the ISS, 27.3 days for the Moon, 24 hours for a television satellite.\n\nAnd the simplifications still standing. **This lesson only handles circles.** Real orbits are **ellipses** -- Kepler's first law -- speeding up when they swing in close and slowing as they climb away. The Earth was treated as a point, and the satellite's own mass was ignored, which is fine for the ISS but not for the Earth and Moon together, which really circle a point about 1,700 km below Earth's surface. And the ISS meets the thin outer air, which drags on it: without a push from visiting spacecraft every few months, it would spiral down.\n\nL3C12 asks where the periodic table's shape itself comes from.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Gravity supplies what the circle needs!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found how fast an orbit must be.**\n\n- Going round a circle at a steady speed needs an acceleration **towards the centre** of **v² / r**\n- Gravity supplies **9.8 x (R / r)²**, the same for every mass\n- Setting supply equal to need: **v = √(gravity at that height x r)**\n- One lap: **T = 2 x π x r / v**\n- Condition: a circular orbit at steady speed, distances from the centre\n- ISS: v² = 8.7 x 6.8 x 10⁶, so **7.7 km/s** and **93 minutes**\n- Moon: v² = 0.0027 x 3.84 x 10⁸, so **1.0 km/s** and **27.3 days** -- Newton's own check\n- A satellite at 42,400 km: **3.1 km/s**, one lap a **day**, so it stays above one spot\n- Higher means slower: double r and the speed falls by √2\n- **T is in proportion to r^1.5**, so **T² is in proportion to r³**: Kepler's third law\n- Still standing: circles not ellipses, a point-like Earth, and thin air at low heights",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "v = √(g x r)!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- How Fast Must It Orbit?**\n\nL2P12 measured the pull. Level 3 turns it into a speed and a timetable.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| A circle needs | **v² / r**, towards the centre | Faster or tighter, sharper turn |\n| Gravity supplies | **9.8 x (R / r)²** | The same for every mass |\n| Circular orbit | **v = √(g x r)** | One height, one speed |\n| One lap | **T = 2πr / v** | Distance over speed |\n| ISS | 7.7 km/s | **93 minutes** |\n| Moon | 1.0 km/s | **27.3 days**, Newton's check |\n| 42,400 km out | 3.1 km/s | **24 hours**: above one spot |\n| Double the radius | speed / √2, lap x 2 | **2.83** times as long |\n| Kepler's third law | **T² ∝ r³** | Measured in 1619, explained later |\n\n**The one line to remember:** a circular orbit is the speed at which the fall you need and the gravity you have agree -- v = √(g x r).\n\n**Up next:** L3C12 -- why the periodic table's rows are 2, 8, 8 and 18 long."
        }
    };
}

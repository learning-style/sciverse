import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) companion to P12 "Gravity & Orbits".
 *
 * P12 said gravity is still about 90% as strong where the ISS orbits. This
 * lesson makes that a rule: gravity follows an inverse-square law, so
 * g = 9.8 x (R / r)^2, with r measured from the centre of the Earth. Worked:
 * the ISS at 8.7 N/kg, a high satellite at 0.22 N/kg, and the Moon at 1/3600
 * of surface gravity. The checkpoint separates weightlessness from weak
 * gravity.
 *
 * Frame of reference stated: distance measured from the centre of the planet.
 * Condition stated: outside a round planet. Held fixed and named for Level 3:
 * only the pull, with no motion -- Level 3 adds the sideways speed that turns
 * the pull into an orbit.
 */
export function getL2P12Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "P12 found that where the **ISS** -- the International Space Station -- orbits, **400 km** up, gravity is still about **90%** as strong as at the ground.\n\nNow go much further out. Earth's radius is about **6,400 km**, so climbing 6,400 km above the surface puts you **twice as far from Earth's centre** as someone standing on the ground.\n\nThe dial under the picture is your **height above surface**: how far you are above the ground, in kilometres. Keep it apart from your distance from Earth's **centre**, which is always another 6,400 km on top -- the difference between those two is most of this lesson.\n\nIs gravity there **half** as strong?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "No -- weaker than that. A quarter as strong, because the pull spreads out over a sphere, and twice as far means four times the area to spread over.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "Yes. Twice as far away, half as strong.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Halving sounds fair, but watch what happens to anything that spreads out from a point.\n\nHold a spray can 1 metre from a wall, and the paint covers one square. Move back to 2 metres, and the same paint covers a square **twice as wide and twice as tall** -- **four** squares. Each square gets only a **quarter** as much paint.\n\nAt 3 metres it covers 3 x 3 = 9 squares: a **ninth** as much on each.\n\nGravity, light and sound all thin out this way, because they spread over a sphere, and a sphere's area grows with the **square** of its radius.\n\nSo twice as far is not half as strong. It is a quarter.",
            options: [
                { id: 'cont', label: "How do I work out gravity at any distance?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "This is the **inverse-square law**: the strength falls with the **square** of the distance.\n\nGravity's strength is measured in **newtons for each kilogram, N/kg**: the pull on every kilogram of an object. At Earth's surface it is **9.8 N/kg**, so a 1 kg bag is pulled with 9.8 N.\n\nThe frame of reference matters more here than anywhere: **distances are measured from the centre of the planet**, not from the ground. Standing on Earth you are already 6,400 km from the centre.\n\nWriting **R** for the planet's radius and **r** for your distance from its centre:\n\n**gravity at r = surface gravity x (R / r)²**\n\nThe fraction R / r is always 1 or less, and squaring it makes it smaller still.\n\nTo find r from a height **h** above the ground: **r = R + h**.\n\nThe condition belongs here. **This works outside a round planet.** It does not describe what happens as you tunnel down inside one, where some of the planet is above you and pulls the other way.",
            options: [
                { id: 'cont', label: "Work out some real distances.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "Earth: **R = 6,400 km**, surface gravity **9.8 N/kg**.\n\n**The ISS, 400 km up:**\n\n**Step 1.** r = 6,400 + 400 = **6,800 km**\n\n**Step 2.** R / r = 6,400 / 6,800 = **0.94**\n\n**Step 3.** 0.94 x 0.94 = **0.89**\n\n**Step 4.** gravity = 9.8 x 0.89 = **8.7 N/kg** -- about 89% of surface gravity, just as P12 said.\n\n**A high satellite, 36,000 km up** (the height where a satellite circles once a day):\n\nr = 42,400 km, R / r = 0.151, squared = 0.023, so gravity = **0.22 N/kg** -- only 2.3%.\n\n**The Moon, 60 Earth radii away:**\n\nR / r = 1/60, squared = 1/3,600, so gravity = 9.8 / 3,600 = **0.0027 N/kg**.\n\n| Where | Distance from the centre | (R / r)² | Gravity |\n| --- | --- | --- | --- |\n| Ground | 6,400 km | 1 | **9.8 N/kg** |\n| ISS | 6,800 km | 0.89 | **8.7 N/kg** |\n| High satellite | 42,400 km | 0.023 | **0.22 N/kg** |\n| The Moon | 384,000 km | 1/3,600 | **0.0027 N/kg** |\n\nGravity never reaches zero. It just gets smaller and smaller, for ever.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A satellite orbits **12,800 km** above Earth's surface, so it sits at **three** Earth radii from the centre.\n\nHow strong is gravity there?",
            options: [
                { id: 'right', label: "About 1.1 N/kg. R / r = 1/3, and (1/3)² = 1/9, so 9.8 / 9 = 1.1 N/kg.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'linear', label: "About 3.3 N/kg, because three times further means a third as strong.", nextNodeId: 'math_wrong' },
                { id: 'height', label: "About 4.9 N/kg, because 12,800 km is twice the radius, so gravity halves.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**3.3 N/kg** divided by the distance once. The law divides by the distance **squared**: three times further is **nine** times weaker.\n\n**4.9 N/kg** made two mistakes at once: it measured from the **surface** instead of the centre, and then halved instead of squaring. From the centre, this satellite is at 6,400 + 12,800 = 19,200 km, which is 3 x 6,400.\n\n**Step 1.** R / r = 6,400 / 19,200 = **1/3**\n\n**Step 2.** (1/3)² = **1/9**\n\n**Step 3.** gravity = 9.8 / 9 = **1.1 N/kg**",
            options: [
                { id: 'retry', label: "From the centre, and square it.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials, for Earth: radius **6,400 km**, surface gravity **9.8 N/kg**.\n\n**Height Above Surface** is how far above the ground you are, in km. **Your Mass** is your own mass, in kg. Your **weight** is the pull on you: mass x gravity, in newtons.\n\nThe lab works out the distance from the centre, squares the fraction, and shows the gravity and your weight there.\n\nTry this:\n\n- Set **400 km**: the ISS, 8.7 N/kg\n- Set **6,400 km**: twice as far from the centre, and a quarter of the gravity\n- Set **36,000 km**: a high satellite, at 0.22 N/kg\n- Find the height where your weight falls to half of what it is on the ground",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "From the centre, and squared. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** Astronauts on the ISS float around the cabin as though nothing is pulling them.\n\nA **60 kg** astronaut is up there, 400 km above the ground, where gravity is **8.7 N/kg**.\n\nHow hard is Earth pulling on them, and why do they float?",
            options: [
                { id: 'right', label: "Earth pulls them with 60 x 8.7 = 522 N, nearly as hard as the 588 N at the ground. They float because they and the station are falling around Earth together, so nothing presses them against the floor.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Almost not at all -- that is why they float. Gravity has run out by 400 km up.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Run the numbers. At 400 km up the fraction R / r is 0.94, and squared it is 0.89 -- gravity is **8.7 N/kg**, nearly the full 9.8.\n\n| | Gravity | Pull on a 60 kg astronaut |\n| --- | --- | --- |\n| On the ground | 9.8 N/kg | **588 N** |\n| On the ISS | 8.7 N/kg | **522 N** |\n\nEarth pulls the astronaut with 522 N -- about nine tenths of their ground weight. That pull is exactly what bends their path into a circle around the Earth.\n\nThey float because the station falls at the same rate they do, as P12 showed. **Weightlessness is free fall, not missing gravity.**\n\nTo make gravity a quarter as strong, you would have to go 6,400 km up. To make it a hundredth, about 57,600 km up.",
            options: [
                { id: 'retry', label: "Falling together, not missing gravity.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **Gravity weakens with the square of the distance from the centre -- but at the ISS it is still nearly full strength.**\n\nThat is the hidden rule behind P12's patterns. One rule, **(R / r)²**, sets the pull on a dropped apple, on the ISS, and on the Moon.\n\nOne thing this lesson held fixed: **it only worked out the pull, never the motion.** A pull alone would bring the ISS straight down. Level 3 adds the sideways speed -- and finds that the same rule, with a little geometry, predicts how fast the ISS and the Moon must travel, and how long each takes to go round.\n\nC12 said the periodic table hides a pattern. C12 at Level 2 uses that pattern to predict an element nobody had seen.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Twice as far, a quarter as strong!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found how gravity fades with distance.**\n\n- Anything spreading from a point thins out over a sphere, whose area grows with the **square** of the radius\n- **Inverse-square law**: twice as far, a **quarter** as strong; three times, a **ninth**\n- Gravity's strength is in **N/kg**: the pull on each kilogram. Earth's surface: **9.8 N/kg**\n- Frame of reference: distances are measured from the **centre** of the planet, and **r = R + h**\n- **gravity at r = surface gravity x (R / r)²**\n- Condition: outside a round planet\n- ISS, 400 km up: 0.94² = 0.89, so **8.7 N/kg**\n- A high satellite, 36,000 km up: **0.22 N/kg**\n- The Moon, 60 radii out: 9.8 / 3,600 = **0.0027 N/kg**\n- Three Earth radii out: 9.8 / 9 = **1.1 N/kg**\n- A 60 kg astronaut on the ISS is still pulled with **522 N**: weightlessness is free fall\n- Held fixed: the pull only, with no sideways motion",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Distance from the centre, squared!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- Gravity by Distance!**\n\nP12 said gravity reaches into space. Level 2 works out how strong it is there.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Spreading out | area grows with radius² | A quarter at twice the distance |\n| Strength | **N/kg** | The pull on each kilogram |\n| The rule | **surface gravity x (R / r)²** | The inverse-square law |\n| Distance | **r = R + h**, from the centre | 400 km up is r = 6,800 km |\n| ISS | 9.8 x 0.89 | **8.7 N/kg** |\n| High satellite | 9.8 x 0.023 | **0.22 N/kg** |\n| The Moon | 9.8 / 3,600 | **0.0027 N/kg** |\n| A 60 kg astronaut | 60 x 8.7 | **522 N**, still nearly full weight |\n\n**The one line to remember:** gravity falls with the square of the distance from the centre -- so twice as far is a quarter as strong, and it never quite reaches zero.\n\n**Up next:** C12 -- predicting an element nobody had ever seen."
        }
    };
}

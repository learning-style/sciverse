import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 5, biology. The synthesis lesson.
 *
 * L2B5 let the learner choose how much sweat evaporated. This removes that
 * simplification: evaporation needs a difference in water-vapour pressure
 * between wet skin and air (L2C5's "pressure of that gas only"), so humidity
 * caps how much heat sweat can carry away.
 *
 * The model, most cooling = 240 W x (5.6 kPa - vapour pressure of air), is
 * stated with its conditions: skin at 35 C and fully wet, an adult in a light
 * breeze. The simplification still standing: sweating is not perfect, and heat
 * chamber experiments put the real wet-bulb limit near 31 C, not 35 C.
 */
export function getL3B5Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2B5 let you **choose** how much sweat evaporated. Set 900 g an hour, and a hard run's heat was gone. It warned that on a humid day sweat drips instead -- but it never said how fast sweat **can** evaporate.\n\nPicture two places on the same **35 °C** afternoon: a dry desert, and a damp tropical coast. Same temperature, yet people who work outdoors in both say they feel completely different.\n\nWhat sets the most heat that sweat can carry away?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "How much water vapour the air already holds. Sweat can only evaporate as fast as the air has room for more vapour.", nextNodeId: 'vapour', sentiment: 'positive' },
                { id: 'bad', label: "Only how much you sweat. Sweat more, and you cool more, whatever the air is like.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Sweating more helps only if the extra sweat **evaporates**. L2B5's runner on a humid day sweated 900 g, but only 300 g evaporated; the rest dripped off and carried almost no heat.\n\nSo the limit is not how much sweat your body can make. It is how fast the air will **take** it.\n\nL2C5 gave you the picture that explains this. Gas crossing a water surface is traffic in **both** directions. The same is true of water vapour at your skin: molecules leave the wet skin, and vapour molecules from the air land back on it. What cools you is the **difference** -- and damp air sends a lot back.",
            options: [
                { id: 'cont', label: "How do I measure how damp the air is?", nextNodeId: 'vapour' }
            ]
        },
        vapour: {
            id: 'vapour',
            speaker: 'AI',
            content: "L2C5 said the pressure that counts is the pressure of **that gas only**. Water vapour mixed into air is a gas too, and it has its own share of the air's pressure: the **vapour pressure**.\n\nIt is small, so it is measured in **kilopascals (kPa)**: 1 kPa = 1,000 Pa, the pascals of L3P4.\n\nAir at a given temperature can hold only so much vapour. The most it can hold is the **saturation vapour pressure**, and, like L2C5's solubility, it depends strongly on temperature:\n\n| Temperature | Saturation vapour pressure |\n| --- | --- |\n| 20 °C | 2.3 kPa |\n| 30 °C | 4.2 kPa |\n| 35 °C | 5.6 kPa |\n| 40 °C | 7.4 kPa |\n\nHow full the air is, as a share of that most, is its **relative humidity**:\n\n**relative humidity = vapour pressure / saturation vapour pressure**\n\nSo air at 35 °C and 50% humidity has a vapour pressure of 0.50 x 5.6 = **2.8 kPa**.\n\nNow the skin. Skin covered in sweat at 35 °C is saturated right at its surface: **5.6 kPa**. Vapour moves from where its pressure is higher to where it is lower, so **net evaporation is driven by the difference: 5.6 kPa − the vapour pressure of the air.** If that difference is zero, as many molecules land as leave. Nothing evaporates overall, and sweat cools nothing -- however much of it there is.",
            options: [
                { id: 'cont', label: "How much heat does each kPa of difference carry?", nextNodeId: 'model' }
            ]
        },
        model: {
            id: 'model',
            speaker: 'AI',
            content: "For an adult in a light breeze, measurements give roughly:\n\n**most heat sweat can carry away = 240 W x (5.6 − vapour pressure of air)**\n\nwith the pressures in kPa.\n\nThe conditions belong here:\n\n- **240 W for each kPa** is for an adult in a **light breeze**. More wind or more skin raises it; still air lowers it.\n- It assumes the skin is at **35 °C** and **fully wet** with sweat.\n- It keeps L2B5's frame: the body's books, with the air as warm as the skin, so no heat flows into the air any other way.\n\n**Air at 35 °C and 50% humidity:**\n\nvapour pressure of air = 0.50 x 5.6 = 2.8 kPa\nmost cooling = 240 x (5.6 − 2.8) = 240 x 2.8 = **672 W**\n\nThat covers L2B5's hard run at 600 W -- just.\n\n**How damp can it get before a 600 W run fails?** Set the most cooling equal to 600 W:\n\n5.6 − vapour pressure = 600 / 240 = 2.5 kPa\nvapour pressure = 3.1 kPa\nrelative humidity = 3.1 / 5.6 = **55%**\n\nAbove 55% humidity at 35 °C, no amount of sweating can keep up with a hard run.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** The air is at **35 °C** with **60%** relative humidity.\n\nWhat is the most heat sweat can carry away from a person in a light breeze?",
            options: [
                { id: 'right', label: "About 538 W. Vapour pressure of air = 0.60 x 5.6 = 3.36 kPa; 5.6 − 3.36 = 2.24 kPa; 240 x 2.24 = 538 W.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'no_air', label: "About 1,344 W, because 240 x 5.6 = 1,344.", nextNodeId: 'math_wrong' },
                { id: 'air_only', label: "About 806 W, because the air's vapour pressure is 3.36 kPa, and 240 x 3.36 = 806.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**1,344 W** used the skin's 5.6 kPa alone, as if the air held no vapour at all. That is the most cooling in perfectly dry air. Air at 60% humidity sends vapour back onto the skin, so it must be subtracted.\n\n**806 W** used the air's vapour pressure instead of the difference -- and it gets the direction backwards. By that arithmetic, damper air would cool you **more**. Cooling is driven by how much **lower** the air's vapour pressure is than the skin's.\n\nvapour pressure of air = 0.60 x 5.6 = 3.36 kPa\ndifference = 5.6 − 3.36 = 2.24 kPa\nmost cooling = 240 x 2.24 = **538 W**\n\nNot enough for a 600 W run.",
            options: [
                { id: 'retry', label: "Skin minus air, then multiply.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials, for a person in a light breeze, with the air and the skin both at **35 °C**.\n\n**Humidity** is the air's relative humidity, as a percentage. **Heat Made** is how fast the body makes heat, in watts.\n\nThe lab compares the skin's **5.6 kPa** with the air's vapour pressure, works out the most heat sweat can carry away, and sets it against the heat made. If sweat falls short, it uses L2B5's **245,000 J for each °C** to show how fast the body warms.\n\nTry this:\n\n- Set **Heat Made** to 600 W and raise **Humidity** until the verdict changes: about **55%**\n- Set **Heat Made** to 100 W, sitting still: sweat keeps up until about **93%**\n- At **100%** humidity, even sitting still, the body warms",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Damper air, less cooling. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** Two outdoor workers each make **400 W** of heat, in a light breeze, on a **35 °C** afternoon.\n\n**Worker A** is in a desert at **20%** humidity. **Worker B** is on a tropical coast at **80%** humidity.\n\nCan each keep cool by sweating?",
            options: [
                { id: 'right', label: "Worker A can: sweat can carry away up to 1,075 W. Worker B cannot: only 269 W, which is 131 W short, so B warms by about 1.9 °C every hour.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Both can equally. It is the same 35 °C for both, and temperature is what decides how hot a person gets.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The temperature is the same, but the **vapour pressure** of the air is not, and that is what sweat depends on.\n\n| | Desert, 20% | Coast, 80% |\n| --- | --- | --- |\n| Vapour pressure of air | 0.20 x 5.6 = 1.12 kPa | 0.80 x 5.6 = 4.48 kPa |\n| Difference from skin | 4.48 kPa | 1.12 kPa |\n| Most cooling = 240 x difference | **1,075 W** | **269 W** |\n| Heat made | 400 W | 400 W |\n| Heat left in the body | none | **131 W** |\n\nThe coastal worker keeps 131 W. Over an hour that is 131 x 3,600 = 471,600 J, and 471,600 / 245,000 = **1.9 °C** hotter every hour.\n\n**Humidity, not temperature alone, decides whether sweat can keep up.**",
            options: [
                { id: 'retry', label: "Vapour pressure, not temperature alone.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **Sweat can only cool as fast as the vapour-pressure difference between skin and air allows.**\n\nWeather scientists measure this with a **wet-bulb thermometer**: an ordinary thermometer wrapped in a wet cloth, cooled by its own evaporation. Damp air lets little evaporate, so the wet bulb stays warm. In 2010, climate scientists pointed out that when the **wet-bulb temperature reaches 35 °C**, skin at 35 °C can no longer lose heat at all -- even resting in the shade in a strong wind. They proposed it as a limit on human survival.\n\nHere is the simplification this lesson removed. **L2B5 treated evaporation as something you could turn up at will.** It is capped by the air.\n\nThat completes Big Idea 5 at Level 3. Level 2 balanced the books. Level 3 found **what limits each trade**:\n\n- **L3P5** -- friction wastes work, but lets a jack hold its own load: self-locking when **η ≤ 50%**\n- **L3C5** -- the heat of dissolving sets how fast k falls: **log (k₂ / k₁) = B x (1/T₂ − 1/T₁)**\n- **L3B5** -- sweat's cooling is capped by a vapour-pressure difference: **240 W x (5.6 − vapour pressure of air)**\n\nAnd the simplification still standing: **the model assumes perfect sweating, with skin held at 35 °C.** Real bodies do worse. In 2022, heat-chamber experiments with young, healthy volunteers found their bodies began heating up at wet-bulb temperatures near **31 °C** -- well below the 35 °C limit.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "The air sets the limit on sweat!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found the limit on sweat.**\n\n- Sweat cools only by evaporating, and evaporation is traffic both ways\n- Water vapour has its own share of the air's pressure: the **vapour pressure**, in **kPa**\n- The most vapour air can hold is the **saturation vapour pressure**: **5.6 kPa at 35 °C**\n- **Relative humidity = vapour pressure / saturation vapour pressure**\n- Wet skin at 35 °C is saturated: **5.6 kPa**\n- Net evaporation is driven by **5.6 kPa − the vapour pressure of the air**\n- **most cooling = 240 W x (5.6 − vapour pressure of air)**, for an adult in a light breeze\n- At 35 °C and 50%: **672 W**; a 600 W run fails above **55%** humidity\n- Desert at 20%: **1,075 W**. Coast at 80%: **269 W**\n- A **wet-bulb thermometer** is cooled by its own evaporation\n- A **wet-bulb temperature of 35 °C** was proposed as a survival limit\n- Still standing: real sweating is imperfect, and experiments put the limit nearer **31 °C**\n\nBig Idea 5 is complete at Level 3.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "240 W for every kPa of difference!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- The Limit of Sweat!**\n\nL2B5 counted the joules sweat carries. Level 3 found what caps them.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Vapour pressure | kPa | Water vapour's share of the air's pressure |\n| Saturation vapour pressure | **5.6 kPa at 35 °C** | The most vapour the air can hold |\n| Relative humidity | **vapour pressure / saturation** | How full the air is |\n| What drives evaporation | 5.6 − vapour pressure of air | Skin minus air |\n| Most cooling | **240 W x difference** | Adult, light breeze, skin at 35 °C |\n| 35 °C, 50% | **672 W** | A hard run just copes |\n| Desert against coast | 1,075 W against 269 W | Same temperature, different humidity |\n| Wet-bulb limit | 35 °C | Skin can no longer lose heat |\n| Still standing | imperfect sweating | Real limit nearer 31 °C |\n| Big Idea 5 at Level 3 | limits on every trade | Friction, heat of dissolving, humidity |\n\n**The one line to remember:** sweat cools you only as fast as the air can take its vapour -- which is why humid heat is so much more dangerous than dry heat.\n\n**Big Idea 5 is complete at Level 3.**"
        }
    };
}

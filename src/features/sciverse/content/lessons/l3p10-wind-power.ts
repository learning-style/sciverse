import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 10, physics.
 *
 * L2P10 packed a changing day of sunshine into one steady average, full-sun
 * hours. This removes that simplification for a source whose power does not
 * follow its input in step: wind. Derived from L2P3's KE = 1/2 mv^2, the
 * power in the wind = 1/2 x rho x A x v^3. Worked by hand: a 10 m2 turbine in
 * a day of 4 m/s and 8 m/s averages 1,728 W, a third more than the 1,296 W at
 * the average speed of 6 m/s.
 *
 * Frame of reference stated: wind speed relative to the ground. Condition
 * stated: the power carried by steady wind; at most about 59% can be captured.
 * Still standing: gusts, speed changing across the blades, air density, and
 * cut-in and cut-out speeds.
 */
export function getL3P10Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2P10 packed a day of changing sunshine into one steady average -- full-sun hours -- and named that as the simplification it held fixed.\n\nTry the same trick on wind. A small wind turbine stands on a hill. One day the wind blows at **4 m/s** for 12 hours, then at **8 m/s** for the other 12 hours.\n\nThe average wind speed is **6 m/s**.\n\nIf you work out the turbine's power at 6 m/s, do you get the day's average power?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "No. Doubling the wind speed does far more than double the power, so the fast half of the day gives much more than the slow half. The power at the average speed comes out too low.", nextNodeId: 'wind_power', sentiment: 'positive' },
                { id: 'bad', label: "Yes. Average speed in, average power out -- just like full-sun hours.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Full-sun hours worked for a solar panel because its power rises **in step** with the sunlight: twice the sunlight, twice the power. Then an average in gives the average out.\n\nWind is different. Stand in a breeze, then in a wind twice as fast -- it does not push twice as hard. It can knock you over.\n\nWhen the wind speed doubles, **more air** arrives each second, and **each kilogram** of that air carries more energy too. Two effects multiply together, so the power grows much faster than the speed.\n\nWhen power does not grow in step with speed, averaging the speed first gives the wrong answer. To see by how much, build the formula.",
            options: [
                { id: 'cont', label: "Build the formula for the power in the wind.", nextNodeId: 'wind_power' }
            ]
        },
        wind_power: {
            id: 'wind_power',
            speaker: 'AI',
            content: "Start from L2P3's kinetic energy: **KE = ½ x m x v²**.\n\nPicture the circle swept by a turbine's blades. Its area is **A**, in m². Wind passes through it at speed **v**, in m/s, measured **relative to the ground** -- that is the frame of reference.\n\n**Step 1. How much air passes each second?**\n\nIn one second, the air moves v metres. So the air passing through fills a cylinder with end area A and length v:\n\nvolume each second = A x v, in m³\n\nmass each second = density x volume = **ρ x A x v**\n\n**ρ** (the Greek letter rho) is the density of air: about **1.2 kg/m³**.\n\n**Step 2. How much kinetic energy does that air carry?**\n\nenergy each second = ½ x (mass each second) x v² = ½ x (ρ x A x v) x v²\n\n**power in the wind = ½ x ρ x A x v³**\n\nv appears **three** times: once because faster wind brings more air each second, and twice because each kilogram's energy grows with v². So doubling the wind speed multiplies the power by 2 x 2 x 2 = **8**.\n\nThink of a snowball fight. Throw twice as fast: you hit twice as often, and each hit stings four times as much. Eight times the sting every second.\n\nThe condition belongs here. **This is the power carried by wind passing at one steady speed.** No turbine can take all of it: if the blades stopped the air completely, air would pile up behind them and no more could pass. The most any turbine can capture is about **59%**; real turbines capture around **40%**.",
            options: [
                { id: 'cont', label: "Work out the windy day by hand.", nextNodeId: 'by_hand' }
            ]
        },
        by_hand: {
            id: 'by_hand',
            speaker: 'AI',
            content: "The small turbine's blades sweep **A = 10 m²**, in air of density **1.2 kg/m³**.\n\nWork out the part that stays the same once: ½ x 1.2 x 10 = **6**. So the power in the wind = **6 x v³** watts.\n\n| Wind speed, v | v³ | Power in the wind = 6 x v³ |\n| --- | --- | --- |\n| 4 m/s | 4 x 4 x 4 = 64 | **384 W** |\n| 6 m/s | 6 x 6 x 6 = 216 | **1,296 W** |\n| 8 m/s | 8 x 8 x 8 = 512 | **3,072 W** |\n\n8 m/s is twice 4 m/s, and 3,072 W is **eight times** 384 W.\n\nNow the day: 12 hours at 4 m/s, and 12 hours at 8 m/s.\n\n**Step 1.** average power = (384 + 3,072) / 2 = **1,728 W**\n\n**Step 2.** power at the average speed, 6 m/s = **1,296 W**\n\n**Step 3.** 1,728 / 1,296 = **1.33**\n\nThe power at the average speed is **too low by a third**. The fast hours count for far more than the slow hours lose.\n\nOver the whole day, the wind carries 1.728 kW x 24 hours = **41.5 kWh**. A turbine capturing 40% of it gets **16.6 kWh** -- enough for L2P10's 10 kWh home. Using the average speed would have predicted only 1.296 x 24 x 0.40 = 12.4 kWh.\n\n**Average the power, not the speed.**",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** The same turbine: **A = 10 m²**, air density **1.2 kg/m³**. The wind blows steadily at **5 m/s**.\n\nWhat is the power in the wind?",
            options: [
                { id: 'right', label: "750 W. ½ x 1.2 x 10 = 6, and 6 x 5³ = 6 x 125 = 750 W.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'squared', label: "150 W, because 6 x 5² = 6 x 25 = 150 W.", nextNodeId: 'math_wrong' },
                { id: 'no_half', label: "1,500 W, because 1.2 x 10 x 125 = 1,500 W.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**150 W** used v², the energy of each kilogram, but left out the **mass arriving each second**, which brings in one more v. The power needs v³.\n\n**1,500 W** left out the **½** from kinetic energy, ½ x m x v². Without it, every answer is exactly double.\n\n**Step 1.** ½ x 1.2 x 10 = **6**\n\n**Step 2.** 5³ = 5 x 5 x 5 = **125**\n\n**Step 3.** power in the wind = 6 x 125 = **750 W**",
            options: [
                { id: 'retry', label: "Half, rho, A, and v cubed.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials, for air of density **1.2 kg/m³**.\n\n**Wind Speed** is the speed of the wind relative to the ground, in m/s. **Blade Length** is the length of one blade, in m. The blades sweep a circle of area **A = π x length²**.\n\nThe lab works out the power in the wind, and the most a turbine could capture, **59%** of it.\n\nTry this:\n\n- Set **Blade Length** to **1.8 m** (A is about 10 m²). Compare **4 m/s** with **8 m/s**: eight times the power\n- Double **Blade Length**. The area -- and the power -- rise **four** times\n- Set a **50 m** blade at **10 m/s**, like a large turbine: about 4.7 million watts in the wind",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Power goes with v cubed. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A company is choosing a site. At its first site the wind averages **6 m/s**. At a second site, on a higher hill, it blows **20% faster**: **7.2 m/s**.\n\nWith the same turbine, by how much does the power in the wind rise?",
            options: [
                { id: 'right', label: "By about 73%. Power grows with v³, and 1.2 x 1.2 x 1.2 = 1.728, so the power is 1.73 times as much.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "By 20%. The wind is 20% faster, so the power is 20% more.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "20% more would be right if power rose **in step** with speed, like a solar panel's power with sunlight. But the power in the wind grows with **v³**.\n\nFor the 10 m² turbine, power = 6 x v³:\n\n| Site | Wind speed | v³ | Power in the wind |\n| --- | --- | --- | --- |\n| First | 6 m/s | 216 | 1,296 W |\n| Second | 7.2 m/s | 373.2 | **2,239 W** |\n\n2,239 / 1,296 = **1.73**: 73% more power from 20% more wind.\n\nThat is why wind farms are built on hilltops and out at sea, and why turbines are so tall: the wind is faster higher up, and every extra bit of speed is cubed.",
            options: [
                { id: 'retry', label: "20% faster, 73% more power.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **The power in the wind grows with the cube of its speed: small changes in speed make big changes in power.**\n\nHere is the simplification this lesson removed. **L2P10 packed a changing source into one steady average.** That works when power rises in step with its source. For wind, it does not: the power at the average speed was a third too low. **Average the power, not the speed.**\n\nAnd the simplifications still standing. **The wind was treated as one steady speed across the whole circle, with air of fixed density.** Real wind gusts from second to second, and blows faster at the top of the circle than at the bottom. Cold air is denser than warm air, so it carries more power at the same speed. And real turbines only run between about **3 m/s**, where they start turning usefully, and about **25 m/s**, where they shut down to protect themselves.\n\nL3C10 follows the CO₂ that fuels release, to find out where it ends up.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Average the power, not the speed!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found why wind speed matters so much.**\n\n- Mass of air through the blades each second = **ρ x A x v**\n- With KE = ½ x m x v²: **power in the wind = ½ x ρ x A x v³**\n- Frame of reference: wind speed relative to the ground\n- Air density **ρ** is about **1.2 kg/m³**\n- Double the wind speed: **8 times** the power. Double the blade length: 4 times the area\n- Condition: steady wind; a turbine can capture at most about **59%**, real ones about 40%\n- A = 10 m²: **384 W** at 4 m/s, **1,296 W** at 6 m/s, **3,072 W** at 8 m/s\n- Half a day at 4 m/s and half at 8 m/s averages **1,728 W**, a third above the power at 6 m/s\n- At 5 m/s: 6 x 125 = **750 W**\n- 20% more wind speed gives **73%** more power\n- **Average the power, not the speed**\n- Still standing: gusts, speed across the blades, air density, cut-in and cut-out speeds",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "v cubed!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- Why Wind Speed Matters So Much!**\n\nL2P10 averaged a source that rises in step. Level 3 handles one that does not.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Air arriving | **ρ x A x v** kg each second | Faster wind, more air |\n| Power in the wind | **½ x ρ x A x v³** | From KE = ½mv² |\n| Double the speed | 2³ = **8** | Eight times the power |\n| A = 10 m² | 6 x v³ | 384 W, 1,296 W, 3,072 W |\n| A windy day | (384 + 3,072) / 2 = **1,728 W** | Not 1,296 W |\n| At 5 m/s | 6 x 125 = **750 W** | Cube, then multiply |\n| 20% faster | 1.2³ = **1.73** | 73% more power |\n| Capture limit | about **59%** | Air must keep moving |\n| Still standing | steady wind, fixed density | Gusts, cold air, shut-downs |\n\n**The one line to remember:** the power in the wind grows with the cube of its speed -- so average the power, never the speed.\n\n**Up next:** L3C10 -- where the CO₂ from burning fuel really goes."
        }
    };
}

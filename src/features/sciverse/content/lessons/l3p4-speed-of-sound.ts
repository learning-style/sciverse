import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 4, physics.
 *
 * L2P4 used the speed of sound as a number to look up, and warned that it
 * changes with the material and the temperature. This removes that
 * simplification: the speed is a result, v = sqrt(B / rho), set by stiffness
 * against density. The units force the square root.
 *
 * Newton's 15% error and Laplace's correction explain why air's stiffness is
 * 1.4 times its pressure. The simplification still standing: the formula is
 * for gentle squeezes, and a shock wave outruns it.
 *
 * Level 3 theme for Big Idea 4: the power in each law decides how steeply the
 * answer responds -- here a square root.
 */
export function getL3P4Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2P4 used the speed of sound as a number to look up: **343 m/s** in air, **1,480 m/s** in water. It said the speed changes with the material, but never why.\n\nHere is a puzzle. **Steel is about 6,500 times as dense as air** -- a cubic metre of air has a mass of 1.2 kg, a cubic metre of steel 7,850 kg.\n\nPut your ear to one end of a long steel railing while someone taps the other end. Does the tap reach you faster through the steel, or through the air beside it?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Through the steel, and by a lot. Steel is far heavier, but it is also far harder to squash, and that matters more.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "Through the air. Steel's particles are so much heavier that each one takes longer to get moving.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Half of that reasoning is right, and it is worth keeping. Heavier particles **do** take longer to get moving, and on its own that would slow sound down.\n\nBut it is not on its own. A sound wave is a squeeze passed along from particle to particle, and how quickly each particle passes it on depends on two things:\n\n- how **heavy** the particles are -- heavier means slower to respond\n- how **hard they push back** when squeezed -- a harder push means a quicker response\n\nSteel is 6,500 times as dense as air, but it pushes back more than **a million times** as hard. The push wins. A tap through a steel railing arrives about **15 times** sooner than through the air beside it.\n\nYou may also have heard that sound is faster in solids because the particles are closer together. That is not the reason either. The particles in ice are no closer together than in liquid water -- ice is actually slightly less dense -- yet sound in ice is more than twice as fast. What matters is how hard the material pushes back.",
            options: [
                { id: 'cont', label: "So I need a measure of how hard it pushes back.", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Two quantities, then, and both need names.\n\n**Density**, written **ρ** (the Greek letter rho), is mass per volume, in **kg/m³**. You met it in L2P2.\n\nThe second is **stiffness**: how hard a material pushes back when you squeeze it. Its measure is the **bulk modulus**, written **B**.\n\nImagine squeezing a material so that its volume shrinks by some fraction. The bulk modulus is the extra **pressure** you needed, divided by that fraction:\n\n**B = pressure change / fraction of volume lost**\n\nPressure is force per area, measured in **pascals (Pa)**: 1 Pa is 1 newton pressing on each square metre. The air around you is at about **101,000 Pa**. Because a fraction has no units, **B is in pascals too**.\n\nTo get a feel for it, squeeze each of these by **1%**:\n\n- **Air**, squeezed as quickly as a sound wave does it: about **1,420 Pa** extra\n- **Water**: about **22,000,000 Pa** extra -- over two hundred times the pressure of the atmosphere\n\nWater is about **15,000 times** stiffer than air. That is why you can push in the plunger of a bicycle pump with your thumb over the outlet, but not the plunger of a syringe full of water.",
            options: [
                { id: 'cont', label: "How do stiffness and density combine into a speed?", nextNodeId: 'derive' }
            ]
        },
        derive: {
            id: 'derive',
            speaker: 'AI',
            content: "Picture a line of **carts joined by springs**. Shove the first cart: its spring squeezes and pushes the second cart, whose spring pushes the third, and the squeeze runs down the line. That running squeeze is a sound wave.\n\n- **Stiffer springs** push the next cart sooner, so the squeeze travels **faster**\n- **Heavier carts** take longer to get moving, so it travels **slower**\n\nSo speed grows with B and falls with ρ. The simplest combination to try is **B / ρ**. Check its units:\n\nB / ρ is Pa ÷ kg/m³\n= (N/m²) ÷ (kg/m³)\n= N x m / kg\n\nA newton is kg x m/s², so this becomes\n\n= (kg x m/s²) x m / kg = **m²/s²**\n\nThat is a speed **squared**. To get a speed, take the square root:\n\n**v = √(B / ρ)**\n\nThe units alone forced the square root. A full derivation from Newton's laws gives exactly this, with no extra number in front.\n\nThe condition belongs here. **This holds for a gentle squeeze** travelling through a gas or a liquid. For a long thin rod of solid, use the stiffness measured by stretching or squashing the rod. And a violent squeeze, like the blast from an explosion, is not gentle -- more on that at the end.",
            options: [
                { id: 'cont', label: "Now use it on air, water and steel.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**Air** at 20 °C: B = 1.42 x 10⁵ Pa, ρ = 1.20 kg/m³\n\nB / ρ = 142,000 / 1.20 = 118,000 m²/s²\nv = √118,000 = **344 m/s**\n\nThat is L2P4's 343 m/s, to within rounding -- worked out this time, not looked up.\n\n**Water**: B = 2.2 x 10⁹ Pa, ρ = 1,000 kg/m³\n\nB / ρ = 2,200,000 m²/s²\nv = √2,200,000 = **1,483 m/s**\n\n**A steel rod**: stiffness 2.0 x 10¹¹ Pa, ρ = 7,850 kg/m³\n\nB / ρ = 25,500,000 m²/s²\nv = √25,500,000 = **5,050 m/s**\n\nSteel is 6,500 times denser than air but about **1.4 million times** stiffer, so its B / ρ is about **215 times** air's. The square root turns that into about **15 times** the speed.\n\nThat square root matters. **To double the speed of sound you need four times the stiffness** -- or a quarter of the density. A hundred times the stiffness gives only ten times the speed.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** Helium at 20 °C has a stiffness of **B = 1.69 x 10⁵ Pa** -- a little more than air's -- and a density of only **ρ = 0.166 kg/m³**.\n\nWhat is the speed of sound in helium?",
            options: [
                { id: 'right', label: "About 1,009 m/s. B / ρ = 169,000 / 0.166 = 1,018,000 m²/s², and √1,018,000 ≈ 1,009 m/s.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'no_root', label: "About 1,018,000 m/s, because 169,000 divided by 0.166 is 1,018,000.", nextNodeId: 'math_wrong' },
                { id: 'same', label: "About 344 m/s, the same as air, because helium's stiffness is almost the same as air's.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**1,018,000 m/s** stopped one step short. 169,000 / 0.166 is **B / ρ**, and its units are m²/s² -- a speed **squared**. Take the square root: √1,018,000 ≈ **1,009 m/s**. A sense check catches it too: a million metres per second would cross the Atlantic Ocean in about five seconds.\n\n**344 m/s** used only half the formula. The stiffnesses are close -- 1.69 x 10⁵ Pa against 1.42 x 10⁵ Pa -- but the **densities** are not. Air is about **seven times** as dense as helium (1.20 / 0.166 = 7.2). That makes helium's B / ρ about **8.6 times** air's, and its speed about √8.6 = **2.9 times** as fast.\n\nv = √(169,000 / 0.166) = **about 1,009 m/s**",
            options: [
                { id: 'retry', label: "Divide, then take the square root -- and use both numbers.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials, both spread out in **powers of ten**, because materials differ so enormously.\n\n**Stiffness** is the bulk modulus B, in pascals. **Density** is ρ, in kg/m³.\n\nThe lab runs the carts-and-springs picture, calculates v = √(B / ρ), and marks the speed against **air**, **helium**, **water** and **steel**. It also says how many times as fast as sound in air the result is.\n\nStart at air: about **1.4 x 10⁵ Pa** and **1.2 kg/m³**. Then:\n\n- Raise **Density** alone, and watch the heavier carts respond slower\n- Raise **Stiffness** alone, and watch the stiffer springs push sooner\n- Now raise **both** by the same factor -- say, a hundred times each -- and notice what the speed does\n\nThat last one is what the checkpoint is about.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Raising both together cancels out. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** Liquid **mercury** is **13.5 times** as dense as water. Its stiffness is **2.85 x 10¹⁰ Pa**, about **13 times** water's 2.2 x 10⁹ Pa.\n\nHow does the speed of sound in mercury compare with water's 1,483 m/s?",
            options: [
                { id: 'right', label: "Almost the same. Both B and ρ went up about thirteen times, so B / ρ barely changed: √(2.85 x 10¹⁰ / 13,530) ≈ 1,451 m/s.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Much slower. Mercury is thirteen and a half times as dense, so sound must crawl through it.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Thirteen and a half times the density would indeed slow sound -- **if nothing else changed**. But mercury is also about 13 times **stiffer** than water, and the formula divides one by the other.\n\n| Liquid | Stiffness B | Density ρ | B / ρ | Speed |\n| --- | --- | --- | --- | --- |\n| Water | 2.2 x 10⁹ Pa | 1,000 kg/m³ | 2,200,000 m²/s² | **1,483 m/s** |\n| Mercury | 2.85 x 10¹⁰ Pa | 13,530 kg/m³ | 2,106,000 m²/s² | **1,451 m/s** |\n\nThe two increases almost cancel, and sound in mercury is only about **2%** slower than in water.\n\n**Density never decides the speed on its own.** It is always density **compared with** stiffness.",
            options: [
                { id: 'retry', label: "Stiffness compared with density, never either alone.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **The speed of sound is set by stiffness compared with density -- never by either one alone.**\n\nIt explains a famous party trick. Breathe in helium and your voice sounds squeaky. Your **vocal folds** still buzz at their usual rate. But the air spaces in your throat and mouth boost certain frequencies, and L2P4's **f = v / λ** decides which ones. The size of your throat fixes λ. Helium makes v about **2.9 times** faster, so the boosted frequencies jump about 2.9 times higher.\n\nOne number in this lesson has been quietly odd, though. Air is at about 101,000 Pa, yet its stiffness is 142,000 Pa. Why are those not the same?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'limits', label: "Why is air's stiffness bigger than its pressure?", nextNodeId: 'limits' }
            ]
        },
        limits: {
            id: 'limits',
            speaker: 'AI',
            content: "**Isaac Newton** was the first to calculate the speed of sound, in 1687. He reasoned that air's stiffness should simply equal its pressure. That gives:\n\nv = √(101,000 / 1.20) = **290 m/s**\n\nMeasurements said about **343 m/s**. Newton was about **15% too low**, and for over a century nobody could say why.\n\n**Pierre-Simon Laplace** found the answer in 1816. When you squeeze air, it **warms up** -- a bicycle pump gets warm as you use it. Air squeezed slowly has time to lose that heat. But a sound wave squeezes and releases air hundreds of times every second, far too fast for the heat to leak away. The warmed air pushes back harder, and for air the extra is a factor of **1.4**:\n\n101,000 x 1.4 = **141,000 Pa**, and √(141,000 / 1.20) = **343 m/s**\n\nThat is the simplification this lesson removed. **L2P4 treated the speed of sound as a fact about each material. It is a result, set by stiffness and density** -- and getting even air right took an understanding of heat.\n\nIt also explains L2P4's warning about temperature. At the same pressure, warm air is **less dense**, so v = √(B / ρ) rises: sound in air gets about **0.6 m/s faster for every 1 °C**.\n\nAnd the simplification still standing: **v = √(B / ρ) is for gentle squeezes.** The blast from an explosion is not gentle. Its front, called a **shock wave**, squeezes the air so hard that it outruns the ordinary speed of sound.",
            options: [
                { id: 'disc', label: "A result, not a fact to look up!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You worked out the speed of sound instead of looking it up.**\n\n- A sound wave is a squeeze passed from particle to particle\n- **Density ρ** (kg/m³) slows it; **stiffness** speeds it up\n- The **bulk modulus B** = pressure change / fraction of volume lost, in **pascals (Pa)**\n- The units of B / ρ are **m²/s²**, which forces a square root\n- **v = √(B / ρ)**, for a gentle squeeze in a gas or liquid\n- Air **344 m/s**, helium **1,009 m/s**, water **1,483 m/s**, a steel rod **5,050 m/s**\n- Four times the stiffness only doubles the speed\n- Mercury is 13.5 times as dense as water, yet sound is only 2% slower in it\n- Helium raises the frequencies your throat boosts, because f = v / λ\n- Newton's **290 m/s** was 15% low; **Laplace** saw that squeezed air warms and pushes back **1.4 times** harder\n- Warm air is less dense, so sound gets about **0.6 m/s faster per 1 °C**\n- A **shock wave** outruns the formula",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "v = √(B / ρ) -- stiffness compared with density!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- Why Sound Races Through Steel!**\n\nL2P4 looked the speed of sound up. Level 3 derives it, and finds out why even air took a century to get right.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Density | **ρ**, kg/m³ | Heavy particles respond slowly |\n| Stiffness | **B** = pressure change / fraction lost | How hard a material pushes back |\n| Units force a root | Pa / (kg/m³) = m²/s² | A speed squared |\n| Speed of sound | **v = √(B / ρ)** | For a gentle squeeze |\n| Steel against air | 215 times the B / ρ | Only 15 times the speed |\n| Mercury against water | 13 times each | Almost the same speed |\n| Newton and Laplace | stiffness = 1.4 x pressure | Squeezed air warms up |\n| Still standing | gentle squeezes only | A shock wave outruns it |\n\n**The one line to remember:** sound travels at the square root of stiffness divided by density -- so how hard a material pushes back matters as much as how heavy it is.\n\n**Up next:** C4 -- the power law that colours the sky."
        }
    };
}

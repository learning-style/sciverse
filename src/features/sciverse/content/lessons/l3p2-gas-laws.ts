import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 2, physics.
 *
 * L2P2 taught that density identifies a material, because every piece of one
 * substance has the same density. For gases that is simply false, and this
 * lesson breaks it: a gas has whatever density its pressure and temperature
 * dictate. Same pattern as L3P1 breaking "friction is a number".
 *
 * It derives the combined gas law from the particle picture P2 introduced,
 * rather than presenting pV/T as a rule to memorise.
 */
export function getL3P2Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "In L2P2 you learned a useful rule: **density identifies a material**. Every piece of gold is 19.30 g/cm³, so measuring a density tells you what something is.\n\nNow measure the density of air.\n\nAt sea level on a mild day: **0.0012 g/cm³**. At the top of Everest: **0.0004 g/cm³**. Inside a scuba tank: **0.23 g/cm³** -- nearly two hundred times the sea-level figure.\n\nSame gas. Same nitrogen and oxygen molecules throughout.\n\nSo which of those numbers is *the* density of air?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "None of them. For a gas there is no single density -- it depends on how squeezed and how hot the gas is, so the L2P2 rule cannot apply.", nextNodeId: 'why_gases', sentiment: 'positive' },
                { id: 'bad', label: "The sea-level one, 0.0012 g/cm³, since that is air under normal conditions and the others are special cases.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Calling 0.0012 g/cm³ \"normal\" is a convention, not a fact about air. The gas in the scuba tank is every bit as much air, and its density really is two hundred times greater.\n\nCompare that with a solid. Squeeze a gold bar as hard as you like and its density barely shifts -- a fraction of a percent under enormous force. That is why L2P2's rule works for solids and liquids.\n\nWhy the difference? Go back to P2's picture.\n\nIn a solid the particles are already **touching**. There is essentially no space to remove, so squeezing achieves almost nothing.\n\nIn a gas, L2P2 showed you the particles are about **1,700 times** more spread out. A gas is overwhelmingly empty space, and empty space is exactly what a squeeze can remove.\n\nSo for a gas, density is not a property of the substance at all. **It is a property of the conditions.**",
            options: [
                { id: 'cont', label: "Then what controls a gas's density?", nextNodeId: 'why_gases' }
            ]
        },
        why_gases: {
            id: 'why_gases',
            speaker: 'AI',
            content: "Three things, and you can reason all three out from particles bouncing around.\n\nFirst, what **pressure** actually is. A gas pushes on its container because its particles are constantly striking the walls. Each collision is a tiny force; billions per second average out to a steady push. **Pressure is collisions per second per unit of wall area.**\n\nNow you can predict what changes it.\n\n**Squeeze the gas into half the volume.** The particles have half as far to travel between walls, so they strike twice as often. Pressure doubles. Halve the volume, double the pressure -- an **inverse proportion**, written **p ∝ 1/V**.\n\n**Heat the gas up.** L2C1 told you temperature is particle motion, so hotter particles move faster. They reach the walls sooner *and* hit harder. Pressure rises. **p ∝ T**.\n\nThere is a catch on that second one, and it matters. It only works cleanly if T is measured from **absolute zero**, the temperature at which particle motion stops. That scale is **kelvin (K)**, and it is the Celsius scale shifted:\n\n**T(K) = T(°C) + 273**\n\nSo 0 °C is 273 K, and 27 °C is 300 K. Doubling a Celsius temperature from 10 °C to 20 °C is not doubling anything real -- 283 K to 293 K is a rise of about 3.5%. **Use kelvin or the proportion is nonsense.**\n\nPut the two together:\n\n**pV / T = constant**\n\nfor a fixed amount of gas. Squeeze it, heat it, do both -- that combination never moves.\n\n**One caveat belongs here rather than at the end.** That equation is exactly true only for an **ideal gas** -- an imaginary gas whose particles take up no room at all and exert no pull on one another. **No real gas is ideal.**\n\nWhat makes it worth having is that ordinary gases under ordinary conditions behave so nearly like an ideal one that the difference is usually too small to measure. Air in a room, in a balloon, in a crisp packet -- all well described.\n\nA **real gas** parts company with the equation when its particles are pushed close enough together to notice each other: squeezed hard, or cooled towards condensing. We will come back to exactly why at the end.",
            options: [
                { id: 'try', label: "Let me use it.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A sealed rigid container of gas sits at **27 °C** with a pressure of **100 kPa**. It is heated to **327 °C**. The container does not change volume.\n\nWhat is the new pressure?",
            options: [
                { id: 'right', label: "200 kPa. In kelvin the temperature goes from 300 K to 600 K, which is a doubling, so the pressure doubles.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'celsius', label: "About 1,211 kPa, because 327 / 27 = 12.1, so the pressure is 12.1 times greater.", nextNodeId: 'math_wrong' },
                { id: 'added', label: "400 kPa, because the temperature rose by 300 degrees so the pressure rises by 300 kPa.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Both answers used Celsius as though it were a scale you can take ratios on. It is not, and this is the single most common error in gas problems.\n\nCelsius has an **arbitrary zero** -- it was set by the freezing point of water, not by anything about particle motion. So \"twice as many degrees Celsius\" does not mean twice as much of anything physical. At 0 °C particles are still moving vigorously; the number is zero but the quantity is not.\n\nKelvin starts at **absolute zero**, where motion genuinely stops. On that scale a ratio means something.\n\nConvert first, always:\n\n27 °C + 273 = **300 K**\n327 °C + 273 = **600 K**\n\n600 / 300 = **2**, a genuine doubling. So the pressure doubles: 100 kPa becomes **200 kPa**.\n\nNotice how badly Celsius misleads here. It suggests a twelvefold rise; the truth is twofold. And the \"add 300\" answer treats a proportion as though it were addition.\n\n**Before taking any ratio of temperatures, convert to kelvin.** If a scale's zero is arbitrary, its ratios are meaningless.",
            options: [
                { id: 'retry', label: "Convert to kelvin before taking a ratio.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials on a fixed amount of gas.\n\n**Volume** squeezes it or lets it expand. **Temperature** heats or cools it, shown in both °C and K.\n\nThe lab tracks the pressure, and the density, and shows **pV/T** staying put while both of the others move.\n\nWatch the density especially, because it is what L2P2's rule assumed was fixed. Halve the volume and the same particles occupy half the space, so the density doubles. Heat the gas in a container that can expand and the density falls.\n\nThe substance never changes. Only the conditions do.\n\nAnd notice the constant. Squeeze and heat at the same time and pressure can go anywhere -- but **pV/T** does not move at all. That is what a conservation statement looks like: a combination that survives while its parts do not.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "pV/T holds still. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A sealed bag of crisps is packed in a factory at sea level. It is driven over a high mountain pass, where the outside air pressure is about **half** what it was at the factory. The temperature in the van is unchanged.\n\nThe bag visibly swells and sometimes bursts.\n\nWhy -- and what does that tell you about the gas density inside it?",
            options: [
                { id: 'right', label: "The outside pressure fell, so the trapped gas expanded until its pressure matched. Its volume roughly doubled, so its density roughly halved -- same gas, same particles, half the density.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Air must be leaking into the bag through the seal, since something has to increase for the bag to get bigger.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The bag is sealed, and in any case air would have to travel from low pressure outside to higher pressure inside, which is the wrong direction. Nothing enters or leaves.\n\nThe number of particles inside is exactly what it was at the factory. What changed is outside.\n\nAt the factory the bag was in balance: gas pushing out, atmosphere pushing in, equal. On the pass the atmosphere pushes with only half the force, so the inside now wins, and the bag expands until the pressures match again.\n\nWith T fixed, **pV/T = constant** becomes **pV = constant**. Halve the pressure and the volume doubles.\n\nNow the part that matters for L2P2. The same particles now occupy twice the space, so the density has **halved**. Same gas, same molecules, same bag -- half the density, purely from being carried up a hill.\n\nThis is why L2P2's rule has to be stated more carefully. **Density identifies solids and liquids, where the particles are already touching and squeezing changes almost nothing. It does not identify a gas**, because a gas is mostly empty space, and how much space is a matter of circumstance.",
            options: [
                { id: 'retry', label: "Half the outside pressure, double the volume, half the density.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **A gas has no fixed density, so it has no density fingerprint.**\n\nThat is the third time a Level 3 lesson has taken a Level 2 rule and found its edge:\n\n- **L2P1** said friction is a number. **L3P1** said it is μN, which changes with the geometry.\n- **L2C1** said c is constant. **L3C1** said it changes at every change of state, and the formula fails outright there.\n- **L2P2** said density identifies a material. **L3P2** says that holds for solids and liquids only.\n\nIn each case Level 2 was not wrong -- it was **true within a range**, and it usually said where the range ended. Level 3's job is to go and stand at that edge.\n\nOne more edge, standing right where you are now, and it is the **ideal gas** assumption from earlier.\n\nA **real gas** differs in two ways. Its particles **do** occupy some volume, so the space actually available to move in is a little less than the container's. And they **do** attract one another, so a particle heading for the wall is tugged back slightly by the ones behind it, and hits marginally softer than the ideal model predicts.\n\nBoth effects are negligible when particles are far apart, which is why the equation works so well for everyday air. Both become large when particles are crowded -- at high pressure, or at low temperature.\n\nAnd the second effect is why gases can be **liquefied** at all. If particles truly ignored each other, as an ideal gas assumes, nothing would ever hold them together and no gas could ever condense. **pV/T = constant, taken literally, says liquids cannot exist.** That they plainly do is the clearest possible sign that the ideal gas is a model rather than a description.\n\nEvery formula you meet is a description of a range. **Knowing the range is knowing the physics.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Level 2 was true within a range!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found where density stops identifying things.**\n\n- Air is **0.0012 g/cm³** at sea level and **0.23 g/cm³** in a scuba tank -- same gas\n- Solids barely compress because their particles already touch\n- A gas is mostly empty space, and space is what a squeeze removes\n- **Pressure** is collisions per second on each unit of wall area\n- Halve the volume and collisions double: **p ∝ 1/V**\n- Heat the gas and particles hit sooner and harder: **p ∝ T**\n- T must be in **kelvin**: **T(K) = T(°C) + 273**\n- Celsius has an **arbitrary zero**, so ratios of °C are meaningless\n- **pV / T = constant** for a fixed amount of gas\n- A sealed bag halves its density when carried to half the outside pressure\n- The law describes an **ideal gas**: particles with no size and no attraction\n- **No real gas is ideal**, but ordinary air is close enough to measure by\n- A **real gas** departs from it when squeezed hard or cooled towards condensing\n- Taken literally the equation says liquids cannot exist, which shows it is a model\n\nNext in C2: the bridge from relative masses to real, weighable grams.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "pV/T = constant -- in kelvin!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- When Density Stops Working!**\n\nL2P2 gave you density as a fingerprint. Level 3 finds the substance for which that is false, and explains why.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Gases have no fixed density | 0.0012 to 0.23 g/cm³ | Same air, different conditions |\n| Solids resist squeezing | particles already touch | Which is why the rule works there |\n| Pressure | collisions per second per area | A particle picture, not a mystery |\n| Squeeze it | **p ∝ 1/V** | Half the volume, twice the hits |\n| Heat it | **p ∝ T** | Faster particles, harder and sooner |\n| Kelvin is compulsory | **T(K) = T(°C) + 273** | Celsius zero is arbitrary |\n| Combined | **pV / T = constant** | Parts move, the combination does not |\n| It describes an **ideal gas** | no particle size, no attraction | **No real gas is ideal** |\n| Where real gases depart | squeezed hard, or nearly liquid | Particles begin to notice each other |\n| The giveaway | it forbids liquids entirely | So it is a model, not a description |\n\n**The one line to remember:** density fingerprints solids and liquids because their particles already touch -- a gas is mostly empty space, so its density is set by circumstance.\n\n**Up next:** C2 -- how to turn relative atomic masses into grams you can actually weigh out."
        }
    };
}

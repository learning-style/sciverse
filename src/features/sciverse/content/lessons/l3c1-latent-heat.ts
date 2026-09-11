import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 1, chemistry.
 *
 * This lesson exists to keep a promise. L2C1 established Q = m x c x dT and
 * then showed it failing at a change of state -- energy pours in, dT stays at
 * 0 °C, and the formula reads that as no energy at all. It named the missing
 * quantity as latent heat and handed it here.
 *
 * The hand-holding picture from L2C1 is reused rather than replaced, because it
 * is what makes the size of L_v credible: melting only loosens the grips enough
 * for molecules to slide, while boiling separates them completely.
 */
export function getL3C1Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "A cook is careless twice in one afternoon.\n\nFirst, a splash of **boiling water at 100 °C** lands on their hand. Painful, and it leaves a red mark.\n\nLater, a jet of **steam, also at 100 °C**, catches the same hand for the same fraction of a second. This one is far worse -- a serious burn needing a hospital.\n\nSame substance. Same temperature. Same contact time.\n\nWhy is the steam so much more dangerous?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "The steam has to turn back into water on the skin first, and that releases a large amount of energy before it has even begun to cool down.", nextNodeId: 'latent', sentiment: 'positive' },
                { id: 'bad', label: "Steam must actually be hotter than 100 °C, since it is the gas form and gases hold more heat than liquids.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Steam straight off boiling water is at **100 °C**, the same as the water it came from. It can be superheated further, but it does not have to be, and the plain 100 °C kind still causes the worse burn.\n\nSo the temperatures really are equal. Something other than temperature is carrying the extra energy.\n\nGo back to what L2C1 left unfinished. You had **Q = m x c x dT**, and you saw it break at exactly this point: hold ice at 0 °C and keep heating, and the temperature refuses to move while a great deal of energy goes in. The formula reads dT = 0 °C as Q = 0 J, which is plainly false.\n\nThe same thing happens in reverse on the cook's hand. Steam condensing to water at a steady 100 °C gives out a large amount of energy while the thermometer does not move at all.\n\nThat energy is what this lesson is about.",
            options: [
                { id: 'cont', label: "So what is the energy doing, if not changing the temperature?", nextNodeId: 'latent' }
            ]
        },
        latent: {
            id: 'latent',
            speaker: 'AI',
            content: "Return to the picture from L2C1. Water molecules **cling to each other** -- a crowd holding hands. Heating does two jobs at once: it makes them jiggle faster, and it stretches those grips.\n\nOnly the jiggling registers as temperature.\n\nAt a change of state, the split goes entirely one way. At 0 °C every joule you add goes into **breaking grips**, not into jiggling, so the thermometer sits perfectly still until the last of the ice has gone. At 100 °C the same thing happens again, this time pulling molecules completely away from each other.\n\nEnergy that changes state without changing temperature is called **latent heat**. *Latent* means hidden -- hidden from the thermometer.\n\nIt has its own formula, and it is simpler than the other one, because there is no temperature change in it to account for:\n\n**Q = mL**\n\n**L** is the **specific latent heat**, in **joules per gram (J/g)**. Same use of *specific* as in L2C1 -- per gram, so the sample size is divided out.\n\nWater has two of them, one for each change:\n\n- **Melting or freezing** -- **specific latent heat of fusion**, **L_f = 334 J/g**\n- **Boiling or condensing** -- **specific latent heat of vaporisation**, **L_v = 2260 J/g**\n\nThe direction does not change the size. Freezing 1 g of water **releases** the same 334 J that melting it absorbs, and that is exactly why the cook's steam burn is so bad: **2260 J** per gram, delivered into the skin before the water has begun to cool.",
            options: [
                { id: 'cont', label: "Why is boiling nearly seven times bigger than melting?", nextNodeId: 'why_bigger' }
            ]
        },
        why_bigger: {
            id: 'why_bigger',
            speaker: 'AI',
            content: "Because the two changes do different amounts of work on those grips.\n\n**Melting** does not break the grips. It loosens them just enough that molecules can **slide past one another** instead of being locked in place. They stay in contact throughout -- which is why ice and water have almost the same density, and why a solid and its liquid take up nearly the same room.\n\n**Boiling** breaks the grips **completely**. Every molecule is pulled away until it is no longer touching its neighbours at all. That is a far bigger job, and the volume tells you so: 1 cm³ of water becomes about **1,700 cm³** of steam at atmospheric pressure. All that separating has to be paid for.\n\n2260 / 334 = **6.8 times** as much energy, and the reason is visible in the volume change.\n\nOne comparison worth holding on to. Melting 1 g of ice takes **334 J**. Heating 1 g of liquid water takes 4.2 J per degree, so those same 334 J would warm it by **334 / 4.2 = 80 °C**.\n\n**The energy to melt an ice cube would take the meltwater four fifths of the way to boiling.** That is why ice is such an effective coolant in a drink, and why it keeps the drink at roughly 0 °C for as long as any ice remains.",
            options: [
                { id: 'try', label: "Let me try a calculation.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn**, and this one has two stages.\n\nHow much energy turns **50 g of ice at 0 °C** into **water at 100 °C**?\n\nUse **L_f = 334 J/g** and **c_water = 4.2 J/g/°C**. The ice is already at its melting point, so no warming is needed before it melts.",
            options: [
                { id: 'right', label: "37,700 J. Melting: 50 x 334 = 16,700 J. Then heating: 50 x 4.2 x 100 = 21,000 J. Total 37,700 J.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'no_melt', label: "21,000 J, from 50 x 4.2 x 100.", nextNodeId: 'math_wrong' },
                { id: 'only_melt', label: "16,700 J, from 50 x 334.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Each answer is one stage of a two-stage journey, and each is correct for the stage it describes.\n\n**21,000 J** is the heating, and it uses Q = m x c x dT properly. But it starts from water at 0 °C. The question started from **ice**, and the ice has to be melted before there is any water to heat. That step changes no temperature, so Q = m x c x dT cannot see it -- which is exactly the blind spot this lesson exists to fix.\n\n**16,700 J** is the melting, and it is right too. It just stops at water at 0 °C, a hundred degrees short of the destination.\n\nThe method for any change of state problem is always the same:\n\n**Break the journey into stages, use Q = mL where the temperature is flat and Q = m x c x dT where it is climbing, then add.**\n\n50 x 334 = 16,700 J to melt\n50 x 4.2 x 100 = 21,000 J to heat\n**Total: 37,700 J**\n\nNotice that melting the ice is nearly as expensive as heating the resulting water across its entire liquid range.",
            options: [
                { id: 'retry', label: "Stage it: mL where flat, mcdT where climbing, then add.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "The lab draws the **heating curve** -- the full journey from ice at −20 °C to steam at 120 °C, with energy along the bottom and temperature up the side.\n\n**Mass** sets how much water you are heating. **Energy Added** sets how much energy has gone in so far, so dragging it walks you along the curve from left to right.\n\nFive stages, and for **1 gram** they cost:\n\n1. Warm the ice, −20 °C to 0 °C: 1 x 2.1 x 20 = **42 J**\n2. **Melt it** at 0 °C: 1 x 334 = **334 J**\n3. Warm the water, 0 °C to 100 °C: 1 x 4.2 x 100 = **420 J**\n4. **Boil it** at 100 °C: 1 x 2260 = **2,260 J**\n5. Warm the steam, 100 °C to 120 °C: 1 x 2.0 x 20 = **40 J**\n\n**Total: 3,096 J**\n\nThe shape is the point. Two **flat plateaus**, where energy is pouring in and the temperature is not moving at all, separated by sloped sections where it climbs.\n\nAnd look at the widths. Boiling alone is **2,260 of the 3,096 J** -- about **73%** of the entire journey from deep-frozen ice to superheated steam. Nearly three quarters of the energy is spent at a single temperature.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "The plateaus dominate. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A pan of water is boiling steadily on a hob. A thermometer in it reads **100 °C**.\n\nThe cook turns the hob from medium up to maximum. The water boils much more vigorously.\n\nWhat does the thermometer read now?",
            options: [
                { id: 'right', label: "Still 100 °C. The extra energy goes into vaporising water faster, not into raising the temperature -- the pan is sitting on a plateau of the heating curve.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Higher than 100 °C, because more energy is going in and more energy always means a higher temperature.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "More energy in does not always mean a higher temperature, and a boiling pan is the everyday proof.\n\nThe water is on **stage 4** of the heating curve -- the vaporisation plateau. Every joule arriving is being spent pulling molecules apart from one another, and none of it is available to make them jiggle faster. The thermometer measures jiggling, so it holds at **100 °C** no matter how hard the hob works.\n\nTurning up the heat does change something real. It changes **how fast** the plateau is crossed. At 2,260 J per gram, doubling the power roughly doubles the grams per minute leaving as steam. The pan boils dry sooner, but it never gets hotter.\n\nThis is worth knowing in a kitchen. **Once water is boiling, a higher setting cooks nothing faster** -- the food is still sitting in 100 °C water either way. All the extra gas or electricity is going up the wall as steam.\n\nIt also means boiling is a superb **temperature regulator**. Anything held in boiling water is pinned to 100 °C, which is why a double boiler will not scorch chocolate, and why the boiling point of water was used to define a fixed point on the temperature scale.",
            options: [
                { id: 'retry', label: "On a plateau, more power means faster, not hotter.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **On a plateau, extra power buys speed, not temperature.**\n\nSo the promise L2C1 made is now kept. That lesson could tell you the formula failed at 0 °C and 100 °C but not what to do about it. You now have the missing piece:\n\n**Q = m x c x dT** where the temperature is climbing\n**Q = mL** where it is flat\n\nTogether they describe any heating job you like, including ones that cross a change of state.\n\nAnd notice the pattern from L3P1 repeating exactly. **Each level removes a simplification rather than adding facts.** Level 2's formula was not wrong; it was incomplete, and it told you where its own edge was. Level 3 went and stood on the other side of that edge.\n\nOne thing to carry into B1. That 2,260 J/g works in **both directions**. It burns a cook when steam condenses -- and it takes 2,260 J **out** of whatever it evaporates from.\n\nYour body uses that, deliberately, every time you sweat -- at skin temperature it is slightly more, about 2,400 J per gram.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Flat means mL, climbing means mcdT!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found the energy a thermometer cannot see.**\n\n- **Latent heat** changes state without changing temperature; *latent* means hidden\n- All of it goes into **breaking grips** between particles, and none into jiggling\n- **Q = mL**, with **L** in **joules per gram (J/g)**\n- **L_f = 334 J/g** for melting or freezing water\n- **L_v = 2260 J/g** for boiling or condensing it\n- The direction does not change the size -- freezing **releases** what melting absorbs\n- Boiling is **6.8 times** melting, because it separates molecules rather than loosening them\n- 1 cm³ of water becomes about **1,700 cm³** of steam, and that separating is what costs\n- Melting 1 g of ice takes as much energy as warming 1 g of water by **80 °C**\n- The **heating curve** has two **plateaus**, and boiling alone is **73%** of the whole journey\n- On a plateau, more power means **faster, not hotter**\n- Stage any problem: **mL** where flat, **m x c x dT** where climbing, then add\n\nNext in B1: your body running as an engine, and using L_v to cool itself.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Q = mL, and latent means hidden from the thermometer!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- The Energy a Thermometer Cannot See!**\n\nLevel 2 showed you where **Q = m x c x dT** breaks. Level 3 hands you the piece that repairs it.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Latent heat | **Q = mL** | State changes, temperature does not |\n| *Latent* means hidden | hidden from the thermometer | It measures jiggling only |\n| Fusion | **L_f = 334 J/g** | Melting, or freezing |\n| Vaporisation | **L_v = 2260 J/g** | Boiling, or condensing |\n| Why boiling is bigger | **6.8x** fusion | Grips broken, not just loosened |\n| Ice as a coolant | 334 J = 80 °C of warming | Why a drink stays near 0 °C |\n| The heating curve | two flat plateaus | Boiling is **73%** of the journey |\n| On a plateau | more power = faster | Boiling water cannot exceed 100 °C |\n| Any problem | stage it, then add | mL flat, m x c x dT climbing |\n\n**The one line to remember:** where the temperature is flat, the energy is going into pulling particles apart -- and that is where nearly all of it goes.\n\n**Up next:** B1 -- why a body doing 6,860 J of work has to get rid of three times as much heat, and how 2,260 J/g makes that possible."
        }
    };
}

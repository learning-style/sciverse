import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 6, physics.
 *
 * L2P6 used Archimedes' principle as a rule. This removes that simplification:
 * pressure grows with depth (p = atmospheric pressure + rho g h, from the
 * weight of the column above), and the buoyant force is the difference between
 * the push up on the bottom of an object and the push down on its top. Depth
 * and atmospheric pressure cancel, leaving rho g V. Worked by hand for a 10 cm
 * cube at two depths, then extended to air.
 *
 * Condition stated where used: fluid density the same all the way down. The
 * simplification still standing: air thins with height, and anything holding
 * gas squeezes -- which is L3B6.
 */
export function getL3P6Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2P6 used **Archimedes' principle** -- buoyant force = weight of the liquid pushed aside -- and built everything on it. It never asked **why** it is true.\n\nIt is a strange rule, when you think about it. Water is not alive. It cannot weigh you, or measure how much liquid you pushed aside. Yet it pushes up with exactly that force.\n\nAnd the water is all around an object -- above it as well as below.\n\nA dial under the picture is the **fluid density**: the mass of each cubic metre of the liquid, in kilograms. Fresh water is about 1,000; seawater about 1,025.\n\nSo where does an **upward** push come from?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Water presses harder the deeper you go. It pushes up on the bottom of an object harder than it pushes down on the top, and the difference is the buoyant force.", nextNodeId: 'pressure', sentiment: 'positive' },
                { id: 'bad', label: "Water pushes objects out of itself, with a force that depends on what the object is made of.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "The force cannot depend on what the object is made of. By L2P6's rule, a steel block and a wooden block of the **same size**, both held completely under water, feel exactly the **same** buoyant force. The steel sinks only because its **weight** is bigger.\n\nSo the push comes from the water, and from the **space** the object takes up.\n\nHere is a clue you have probably felt. Swim to the bottom of a deep pool and your ears start to hurt. L2C5 said every 10 m of water adds about 1 atm of pressure. **Water presses harder the deeper you go** -- and that turns out to be the whole secret.",
            options: [
                { id: 'cont', label: "Why does water press harder deeper down?", nextNodeId: 'pressure' }
            ]
        },
        pressure: {
            id: 'pressure',
            speaker: 'AI',
            content: "Start with **pressure**: force divided by the area it pushes on, in **pascals (Pa)**, from L3P4. The air presses on everything around you at about **101,000 Pa**. That is **atmospheric pressure**.\n\nWater presses harder deeper down because of the **weight of the water above**.\n\nPicture a column of water standing on a patch of area **A**, reaching **h** metres up to the surface. Build its weight step by step:\n\n- its volume is **A x h**\n- its mass is **ρ x A x h**, where **ρ** is the water's density in kg/m³\n- its weight is **ρ x A x h x g**, with **g = 9.8 N/kg** (L2P6)\n\nThat weight rests on the area A. Pressure is force divided by area, so the A cancels:\n\npressure from the water = ρ x A x h x g / A = **ρ x g x h**\n\nAdd the air pressing down on the surface:\n\n**p = atmospheric pressure + ρ x g x h**\n\nCheck it against L2C5. For 10 m of fresh water: 1,000 x 9.8 x 10 = **98,000 Pa** -- close to one atmosphere, as L2C5 said.\n\nThe condition belongs here. **This treats the liquid's density as the same all the way down.** Water barely squeezes: L3P4 found it takes 22,000,000 Pa to squeeze water by just 1%, and that is the pressure under about 2,200 m of water. For anything but the deep ocean, the condition holds.",
            options: [
                { id: 'cont', label: "Now use it on an object under water.", nextNodeId: 'derive' }
            ]
        },
        derive: {
            id: 'derive',
            speaker: 'AI',
            content: "Put a box under water. Its height is **H**, and its top and bottom each have area **A**. Its top is at depth **h**, so its bottom is at depth **h + H**. (Below, **ρ g h** is short for ρ x g x h.)\n\n**The sides.** Every point on the left side is matched by a point at the same depth on the right side. Same depth, same pressure, pushing in opposite directions. **The side forces cancel.**\n\n**The top.** The water pushes **down** on it with force = pressure x area:\n\ndown = (atmospheric pressure + ρ g h) x A\n\n**The bottom.** The water pushes **up** on it, from deeper down, where the pressure is higher:\n\nup = (atmospheric pressure + ρ g (h + H)) x A\n\n**The difference**, taking up as positive:\n\nup − down = ρ g (h + H) A − ρ g h A = **ρ x g x H x A**\n\nAtmospheric pressure cancelled. So did the depth, h. And H x A is the box's volume, **V**:\n\n**buoyant force = ρ x g x V**\n\nρ x V is the mass of liquid that would fill the box's space, and multiplying by g gives that liquid's **weight**. **That is Archimedes' principle** -- derived from nothing but the weight of the water above.",
            options: [
                { id: 'cont', label: "Put numbers on it.", nextNodeId: 'by_hand' }
            ]
        },
        by_hand: {
            id: 'by_hand',
            speaker: 'AI',
            content: "Take a cube **10 cm** on each side, so **H = 0.1 m**, **A = 0.01 m²** and **V = 0.001 m³**. Hold it in fresh water (ρ = 1,000 kg/m³), with atmospheric pressure at **101,000 Pa**.\n\n**With its top 1 m down:**\n\n| Face | Depth | Pressure | Force = pressure x 0.01 m² |\n| --- | --- | --- | --- |\n| Top | 1.0 m | 101,000 + 9,800 = 110,800 Pa | 1,108.0 N down |\n| Bottom | 1.1 m | 101,000 + 10,780 = 111,780 Pa | 1,117.8 N up |\n\nDifference: 1,117.8 − 1,108.0 = **9.8 N up**.\n\n**With its top 5 m down:**\n\n| Face | Depth | Pressure | Force = pressure x 0.01 m² |\n| --- | --- | --- | --- |\n| Top | 5.0 m | 101,000 + 49,000 = 150,000 Pa | 1,500.0 N down |\n| Bottom | 5.1 m | 101,000 + 49,980 = 150,980 Pa | 1,509.8 N up |\n\nDifference: **9.8 N up**, again.\n\nThe force on each face is enormous -- over a thousand newtons -- and it grows as the cube goes deeper. But the **difference** stays at 9.8 N. That is the weight of 1 kg: the mass of the 1 litre of water the cube pushes aside.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** The same 10 cm cube is held completely under **seawater**, ρ = **1,025 kg/m³**, with its top **2 m** down.\n\nWhat is the buoyant force on it?",
            options: [
                { id: 'right', label: "About 10.0 N, because ρ x g x V = 1,025 x 9.8 x 0.001 = 10.0 N, whatever the depth.", nextNodeId: 'air', sentiment: 'positive' },
                { id: 'bottom', label: "About 1,221 N, because the pressure on the bottom is 101,000 + 1,025 x 9.8 x 2.1 = 122,100 Pa, and that times 0.01 m² is 1,221 N.", nextNodeId: 'math_wrong' },
                { id: 'zero', label: "Zero, because the water pushes on the cube from every side and the pushes cancel.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**1,221 N** is the push on the **bottom** face alone. The top face is pushed **down** as well, by a pressure of 101,000 + 1,025 x 9.8 x 2.0 = 121,090 Pa, which is 1,210.9 N. The buoyant force is the **difference**: 1,220.9 − 1,210.9 = **10.0 N**.\n\n**Zero** is right about the **sides** -- those pushes do cancel. But the top and bottom do not cancel, because the bottom is deeper, where the pressure is higher.\n\nbuoyant force = ρ x g x V = 1,025 x 9.8 x 0.001 = **10.0 N**",
            options: [
                { id: 'retry', label: "The difference between top and bottom.", nextNodeId: 'air' }
            ]
        },
        air: {
            id: 'air',
            speaker: 'AI',
            content: "Look back at the derivation. Nothing in it needed the fluid to be a **liquid**. It needed only a fluid whose pressure grows with depth because of the weight above it -- and **air** is one. You live at the bottom of an ocean of air.\n\nSo air gives a buoyant force too: the density of air x g x V.\n\n**A 1 m³ helium balloon.** Air is **1.20 kg/m³**; helium, from L3P4, is **0.166 kg/m³**.\n\n- buoyant force (up) = 1.20 x 9.8 x 1 = **11.8 N**\n- weight of the helium (down) = 0.166 x 9.8 x 1 = **1.6 N**\n- left over to lift the balloon's skin and anything tied to it: 11.8 − 1.6 = **10.2 N** -- the weight of about **1 kg**\n\nThat is why a party balloon, about a hundredth of a cubic metre, can lift only about 10 g, while a weather balloon a couple of metres across can carry instruments high into the sky.",
            options: [
                { id: 'cont', label: "Let me change the depth and the fluid.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials.\n\n**Depth** is how far below the surface the top of a 10 cm cube sits, in metres. **Fluid Density** steps through five fluids, in kg/m³: **air**, 1.2; vegetable **oil**, 920; **fresh water**, 1,000; **seawater**, 1,025; and the **Dead Sea**, 1,240.\n\nThe lab shows the pressure on the top face and the bottom face, the force each one feels, and the difference between them: the buoyant force.\n\nTry this:\n\n- In water, slide **Depth** from 0 m to 50 m. Watch the force on each face climb -- and the difference stay put\n- Now drop **Fluid Density** to air, **1.2 kg/m³**. The buoyant force shrinks over 800 times, but it is still there",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "The faces change; the difference does not. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A submarine hovers **100 m** below the surface. It dives to **300 m**, where the water presses on its hull nearly three times as hard.\n\nAssume that neither the water nor the hull squeezes at all. What happens to the buoyant force on the submarine?",
            options: [
                { id: 'right', label: "It stays the same. Every face is pushed harder, but the difference between the bottom and the top still depends only on the submarine's volume: ρ x g x V.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "It becomes nearly three times bigger, because the water pushes nearly three times as hard.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The water does push nearly three times as hard on **every** face -- top and bottom alike. But the buoyant force is not any one push. It is the **difference** between the push up on the bottom and the push down on the top.\n\nFrom the derivation:\n\nup − down = ρ g (h + H) A − ρ g h A = ρ g H A\n\nThe depth, h, cancelled out. Deeper water adds the same extra pressure to the top **and** to the bottom, so the difference does not change -- exactly as the 10 cm cube showed at 1 m and at 5 m.\n\n**buoyant force = ρ x g x V**, at any depth -- as long as ρ and V stay the same.",
            options: [
                { id: 'retry', label: "Deeper adds to both faces equally.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **Pressure grows with depth, but the buoyant force is a difference of pressures, so the depth cancels out.**\n\nHere is the simplification this lesson removed. **L2P6 took Archimedes' principle as a rule to use.** It is not a separate law of nature. It follows from a single fact -- a fluid's pressure grows with depth, because of the weight above -- and it works for air as well as for water.\n\nAnd the simplification still standing, which the checkpoint asked you to assume: **the fluid's density and the object's volume stay the same at every depth.** Neither is quite true.\n\n- **Air is far from uniform.** It thins with height, and about 8 km up it is less than half as dense. So a sealed balloon does not rise for ever: it stops where the thinner air's buoyant force only just matches its weight.\n- **Some objects squeeze.** A steel hull barely does. But anything holding **gas** does -- and that includes a fish. L3B6 follows it down.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "A difference of pressures!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You derived Archimedes' principle.**\n\n- **Pressure** is force divided by area, in pascals; **atmospheric pressure** is about 101,000 Pa\n- A column of liquid presses with its weight over its area: **ρ x g x h**\n- **p = atmospheric pressure + ρ x g x h**, if the liquid's density is the same all the way down\n- 10 m of fresh water adds 98,000 Pa, close to one atmosphere\n- On a box under water, the side forces cancel\n- Up on the bottom minus down on the top = **ρ x g x V**: Archimedes' principle\n- Atmospheric pressure and depth both cancel\n- A 10 cm cube: over 1,000 N on each face, but a difference of **9.8 N** at 1 m and at 5 m\n- The same cube in seawater: **10.0 N**\n- Air gives a buoyant force too: a 1 m³ helium balloon can lift about **1 kg**\n- Still standing: air thins with height, and anything holding gas squeezes",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Buoyant force = ρ x g x V!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- Where the Buoyant Force Comes From!**\n\nL2P6 used Archimedes' principle. Level 3 derives it from the weight of the fluid above.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Pressure | force / area, in Pa | Atmospheric is about 101,000 Pa |\n| Pressure with depth | **p = atmospheric + ρ g h** | The weight of the column above |\n| The sides | equal and opposite | They cancel |\n| Top and bottom | bottom is deeper | It is pushed harder |\n| The difference | **ρ x g x V** | Archimedes' principle |\n| By hand | 1,117.8 − 1,108.0 = **9.8 N** | The same at 1 m and 5 m |\n| Air | 1.20 x 9.8 x 1 = 11.8 N | A helium balloon lifts about 1 kg |\n| Deeper submarine | faces pushed harder | Buoyant force unchanged |\n| Still standing | density and volume fixed | Air thins; gas squeezes |\n\n**The one line to remember:** a fluid pushes harder on the bottom of an object than on its top, and that difference -- the weight of the fluid it pushes aside -- is the buoyant force.\n\n**Up next:** C6 -- why the sea's own water is not one density."
        }
    };
}

import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) companion to C16 "Magnetic Materials".
 *
 * C16 said heat disturbs domain alignment, and its lab's temperature dial stops
 * at 120 C -- 650 C short of the temperature where the disturbance actually
 * wins. This lesson names it: the Curie temperature, at which ferromagnetism
 * disappears completely.
 *
 *   iron 770 C, nickel 354 C, cobalt 1115 C, magnetite 585 C
 *
 * The checkpoint uses magnetite's 585 C against Earth's 5,000 C core to rule out
 * permanently magnetised rock as the source of Earth's field, which sets up
 * L3P16's currents.
 *
 * Condition stated: Tc belongs to the material, not to the magnet's size or
 * strength, and the change is reversible. Held fixed and named for Level 3:
 * domains are either aligned or not -- nothing about what makes alignment stick.
 */
export function getL2C16Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "C16 showed you the **domains** inside a magnet -- microscopic regions that each point some way, and pull together when they line up. And it showed heat disturbing them: raise the temperature, and the alignment starts to break down.\n\nIts lab let you heat the sample to **120 °C** and watch the response fall.\n\nBut a fridge magnet survives a hot day, and a magnet in a kitchen oven at 250 °C comes out still working. So does heating a magnet weaken it a little at a time, forever -- or is there a temperature where it simply stops?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "There must be a stopping point. Something that disappears completely at a particular temperature, the same temperature every time for a given material.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "It fades away gradually. Every degree of heating takes a little more magnetism, so a very hot magnet is just a very weak magnet.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "That is what C16's dial suggests, because it stopped before anything interesting happened. Follow iron further up and the shape of the curve changes completely.\n\n| Temperature | Iron's magnetism |\n| --- | --- |\n| 20 °C | full strength |\n| 250 °C | very slightly weaker |\n| 600 °C | noticeably weaker |\n| 750 °C | fading fast |\n| **770 °C** | **gone** |\n| 800 °C | still gone |\n\nIt is not a slope, it is a cliff. Iron holds on to most of its magnetism for hundreds of degrees, then loses the rest over a few tens of degrees, and above **770 °C** there is no ferromagnetism left at all -- not a weak version, none.\n\nThat temperature has a name, and it is different for every material.",
            options: [
                { id: 'cont', label: "Name it and give me the numbers.", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "The **Curie temperature**, written **Tc**, is the temperature at which thermal jostling finally overwhelms domain alignment, and **ferromagnetism disappears entirely**.\n\nTwo words worth having. **Ferromagnetic** means what iron is below its Tc: domains line up with each other, so the material can be a strong magnet and is strongly pulled by one. **Paramagnetic** means what iron becomes above its Tc: individual atoms still respond a little, but nothing lines up, so the pull is hundreds of times weaker -- too weak to feel. Aluminium is paramagnetic at room temperature, which is why it never sticks to anything.\n\n| Material | Curie temperature |\n| --- | --- |\n| nickel | **354 °C** |\n| magnetite (the iron oxide in rock) | **585 °C** |\n| iron | **770 °C** |\n| cobalt | **1,115 °C** |\n\nThe conditions matter here. **Tc is a property of the material** -- not of how big the magnet is, how strong it was to begin with, or how long you heat it. A paperclip and a car door made of the same steel quit at the same temperature.\n\nAnd **the change is reversible**: cool iron back below 770 °C and it can be ferromagnetic again. What does *not* come back on its own is the **arrangement** -- the domains refill in random directions, so the object is once more a piece of iron that *could* be a magnet, rather than a magnet. To get a magnet back you have to line the domains up again.",
            options: [
                { id: 'cont', label: "Work some cases out.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "The whole calculation is a comparison: **is the temperature above this material's Tc, or below it?**\n\n**A magnet in a kitchen oven.** Ovens reach about **250 °C**.\n\n250 °C against iron's **770 °C**: below. **Still magnetic** -- with 520 °C to spare.\n\n**A nickel wire in a pottery kiln at 400 °C.**\n\n400 °C against nickel's **354 °C**: above, by 46 °C. **Not magnetic** while it is in there.\n\n**The same kiln with an iron nail in it.**\n\n400 °C against iron's 770 °C: below. **Still magnetic.** Same kiln, same shelf, two different answers -- because Tc belongs to the material.\n\n**A gas flame at about 1,000 °C.**\n\n| Material | Tc | In a 1,000 °C flame |\n| --- | --- | --- |\n| nickel | 354 °C | not magnetic |\n| magnetite | 585 °C | not magnetic |\n| iron | 770 °C | not magnetic |\n| cobalt | **1,115 °C** | **still magnetic** |\n\nCobalt is the one that survives, which is exactly why cobalt goes into magnets that have to work hot -- inside motors and turbines.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A kiln is set to **600 °C**. Four samples go in: nickel, magnetite, iron and cobalt.\n\nWhich of them stop being ferromagnetic while they are in the kiln?",
            options: [
                { id: 'right', label: "Nickel and magnetite. Their Curie temperatures are 354 °C and 585 °C, both below 600. Iron at 770 °C and cobalt at 1,115 °C are still above the kiln.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'all', label: "All four, because 600 °C is hot enough to destroy any magnet.", nextNodeId: 'math_wrong' },
                { id: 'none', label: "None of them, because 600 °C is below iron's 770 °C.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**All four** treated heat as a single verdict. It is a comparison, and it has to be made once per material.\n\n**None of them** used iron's number for everything. Iron is only one row of the table, and it happens to be one of the tougher ones.\n\nCheck each against 600 °C:\n\n| Material | Tc | Against 600 °C | Result |\n| --- | --- | --- | --- |\n| nickel | 354 °C | 246 °C below | **stops** |\n| magnetite | 585 °C | 15 °C below | **stops**, only just |\n| iron | 770 °C | 170 °C above | survives |\n| cobalt | 1,115 °C | 515 °C above | survives |\n\nMagnetite is the interesting row: it clears the kiln by only **15 °C**, so a slightly hotter kiln would flip its answer. When a margin is that thin, the number matters more than the intuition.",
            options: [
                { id: 'retry', label: "One comparison per material.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials.\n\n**Temperature** runs from room temperature to **1,200 °C**, past every Curie temperature in the table. **Material** picks between nickel, magnetite, iron and cobalt.\n\nThe lab draws the domains, shows whether the sample is ferromagnetic or paramagnetic, and gives the margin to that material's Curie temperature.\n\nTry this:\n\n- **Iron** at **20 °C**: domains aligned, **750 °C** of margin in hand\n- Hold iron and raise the temperature: the domains stay mostly ordered for hundreds of degrees, then collapse near **770 °C**\n- Set **600 °C** and switch materials one by one: nickel and magnetite have given up, iron and cobalt have not\n- Set **1,200 °C**: nothing is ferromagnetic, not even cobalt\n- Cool back down and watch the domains return -- pointing every which way, so the sample can be magnetised again but is not a magnet yet",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "One number per material. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** P16 leaned on Earth behaving like a giant magnet. A reasonable guess is that Earth's field comes from magnetised rock deep down -- there is certainly plenty of iron in there, and **magnetite** is a common magnetic mineral.\n\nBut Earth's core is at roughly **5,000 °C**, and magnetite's Curie temperature is **585 °C**.\n\nWhat does that rule out, and what does it leave?",
            options: [
                { id: 'right', label: "It rules out permanently magnetised rock: at 5,000 °C nothing down there can be ferromagnetic at all, so no arrangement of domains could be storing the field. Whatever makes Earth's field has to be something that works while it is that hot -- moving molten iron, not aligned domains.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Nothing much -- the pressure that deep is enormous, and enough pressure would hold the domains in line however hot it got.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Pressure does shift Curie temperatures, but by tens of degrees, not thousands. Nothing squeezes a material into staying ferromagnetic **eight times** past its Tc.\n\nLine the numbers up:\n\n| | Temperature |\n| --- | --- |\n| Magnetite's Curie temperature | **585 °C** |\n| Iron's Curie temperature | 770 °C |\n| Earth's outer core | about **5,000 °C** |\n\nThe core is roughly **6,000 °C above** the point where iron stops being ferromagnetic. Domains are not merely disturbed down there; the very idea of a domain has stopped applying.\n\nWhich is a genuinely useful conclusion, because it tells you the field must be made a completely different way. And there is another way: **a moving electric charge makes a magnetic field**. Earth's outer core is molten iron, an excellent conductor, churning as the planet loses heat and spins. Those moving currents make the field, and they keep making it -- which also explains something P16 and L2P16 both took for granted, that magnetic north **drifts**. A field made by flowing liquid does not sit still.\n\n**A Curie temperature does not just tell you when a magnet fails. It tells you when an explanation fails.**",
            options: [
                { id: 'retry', label: "Too hot for domains, so it must be currents.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **Every ferromagnetic material has a Curie temperature, and above it the domains cannot line up at all -- which rules out magnetised rock as the source of Earth's field and points at moving molten iron instead.**\n\nSo C16's temperature effect has a number and an ending. The domains do not fade away politely; they hold, then collapse, at **770 °C** for iron and **354 °C** for nickel.\n\nOne thing this lesson held fixed: **domains were either aligned or not.** Nothing here says why a fridge magnet keeps its alignment for years while the iron core of a transformer must lose its alignment fifty times a second. That difference is what makes some magnets permanent and others useless as magnets but essential as machines, and Level 3 measures it.\n\nB16 watched animals combine navigation cues. B16 at Level 2 works out how much a second cue is actually worth.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "A cliff, not a slope!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found where magnetism stops.**\n\n- The **Curie temperature (Tc)** is where thermal jostling beats domain alignment and **ferromagnetism disappears entirely**\n- **Ferromagnetic**: domains line up, so the material can be a strong magnet. **Paramagnetic**: they cannot, so the pull is hundreds of times weaker\n- Aluminium is paramagnetic at room temperature, which is why it never sticks\n- **nickel 354 °C**, **magnetite 585 °C**, **iron 770 °C**, **cobalt 1,115 °C**\n- It is a **cliff, not a slope**: iron keeps most of its magnetism for hundreds of degrees, then loses the rest within tens\n- Tc belongs to the **material**, not to the magnet's size or strength\n- A kitchen oven at 250 °C leaves iron **520 °C** of margin\n- A 400 °C kiln stops nickel and not iron -- same shelf, different answers\n- In a 1,000 °C flame only **cobalt** survives, which is why hot motors use it\n- At 600 °C, magnetite clears by just **15 °C**: a thin margin is where the number beats the intuition\n- Cooling restores ferromagnetism but **not the arrangement** -- you get iron back, not a magnet\n- Earth's core at **5,000 °C** is far above every Tc, so its field cannot be magnetised rock: it must be **moving molten iron**\n- Held fixed: domains aligned or not, with nothing about what makes alignment stick",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Every material has its own cliff!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- How Hot Before It Stops?**\n\nC16 disturbed the domains. Level 2 finds the temperature that ends them.\n\n**Summary Table:**\n| Idea | The Number | What It Means |\n| --- | --- | --- |\n| Curie temperature | **Tc** | Ferromagnetism disappears entirely |\n| Ferromagnetic | below Tc | Domains line up; can be a magnet |\n| Paramagnetic | above Tc | Hundreds of times weaker pull |\n| Nickel | **354 °C** | Stops in a pottery kiln |\n| Magnetite | **585 °C** | Clears a 600 °C kiln by 15 °C |\n| Iron | **770 °C** | Survives any oven |\n| Cobalt | **1,115 °C** | Survives a gas flame |\n| Shape of the loss | a cliff, not a slope | Holds, then collapses |\n| Cooling back down | reversible | But the domains return random |\n| Earth's core | **5,000 °C** | Not magnetised rock: moving iron |\n| Held fixed | aligned or not | Level 3 measures what sticks |\n\n**The one line to remember:** every ferromagnetic material has one temperature where its domains stop lining up altogether -- and knowing iron's 770 °C against Earth's 5,000 °C core is enough to prove the planet's magnetism is made by currents, not by magnets.\n\n**Up next:** B16 -- what a second navigation cue is worth."
        }
    };
}

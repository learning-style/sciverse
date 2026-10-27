import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 6, biology. The synthesis lesson. Mechanism.
 *
 * Replaces a version that made its point with Boyle's law -- p1 V1 = p2 V2, one
 * atmosphere per 10 m, worked in ratios -- and which measured zero structural biology
 * words. It is parked in docs/level4/.
 *
 * The rewrite is about the organ. A swim bladder is a gas sac in the body cavity above
 * the gut, walled in connective tissue, and it comes in two designs: a physostome keeps
 * a DUCT to the gut and gulps air at the surface, while a physoclist is CLOSED and has
 * to move gas in and out of its own blood.
 *
 * Which is where the real physiology is. A physoclist's gas gland sits on a bundle of
 * capillaries called a rete mirabile, and it secretes lactic acid; the acid makes
 * haemoglobin let go of its oxygen (the Root effect), and because the rete runs the
 * incoming and outgoing blood side by side, the released oxygen is trapped and
 * concentrated until its pressure exceeds the depth pressure and gas is forced into the
 * sac. Letting gas out is a separate structure: the oval window, a thin patch whose
 * blood supply a muscular flap uncovers.
 *
 * And the structural point is that the organ is inherently unstable. A gas sac is
 * squeezable, so sinking shrinks it, which makes the fish denser, which makes it sink
 * faster -- a runaway in both directions. The gland is therefore not a refinement but a
 * requirement. Because the squeeze follows the RATIO of pressures, it is worst near the
 * surface: the first 10 m doubles the pressure, while 100 m to 110 m changes it by a
 * tenth.
 *
 * The evolutionary answer closes it: sharks never had a bladder and float on a huge
 * oily liver full of squalene, which does not compress, and many deep-sea fish have
 * abandoned gas for the same reason. A structure that fails at depth is replaced by one
 * that cannot.
 *
 * Frames stated: depth measured down from the surface, pressure as atmospheres acting
 * on the sac, and 'neutral' meaning the fish neither rises nor sinks.
 *
 * Still standing: the fish's flesh is treated as not squeezing at all; how fast a gland
 * can add gas is not counted; and the rete's trapping is described rather than derived.
 */
export function getL3B6Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2B6 gave a fish a swim bladder and kept it the same size at every depth. That is the simplification to remove, and the way in is to look at what the organ actually is.\n\n**A swim bladder is a bag of gas inside the fish.** It sits in the body cavity, above the gut, and its wall is tough **connective tissue** -- fibrous, slightly stretchy, and thin. It is not a lung: no water passes through it, no oxygen is taken from it for breathing, and the fish does not move it like a chest. Its only job is to make the fish lighter.\n\nAnd there are **two quite different designs**, which is where the biology starts.\n\n**A physostome keeps a duct.** A tube runs from the swim bladder to the gut, so the fish can swim to the surface, **gulp air**, and swallow it into the bladder -- and burp it out again to sink. Carp, herring and young trout all do this. Simple, cheap, and it requires a trip to the surface.\n\n**A physoclist is sealed.** There is no duct at all, so no gulping is possible. Every molecule of gas going in or out of that bladder has to come from, or go into, **the fish's own blood.** Perch, cod and most bony fish of the open ocean are built this way, and it is the design that lets a fish live its whole life deep.\n\nYour dials are **Depth** in metres and **Gas Added** by the gland, counted in **units** of gas.\n\nBefore anything else. A sealed bladder, and the fish swims downward. What happens to the bag?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'shrinks', label: "It gets squeezed smaller — the water outside presses harder as the fish goes deeper.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'same', label: "It stays the same, since the gas is sealed in and none can escape.", nextNodeId: 'misconception' }
            ]
        },

        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "None escapes -- and the bag still shrinks, because the amount of gas is not what sets its size. **The pressure of the water outside is.**\n\nThe wall is thin connective tissue, not armour. It cannot hold the sea off; it just contains the gas. So the bag is squeezed to whatever size makes the gas inside push back exactly as hard as the water outside pushes in, and going deeper means more water overhead pushing in.\n\nDepth is the thing to be concrete about here. **Every 10 metres of seawater adds about one atmosphere** -- as much pressure again as the entire atmosphere above the sea. So:\n\n| depth | pressing on the sac |\n| --- | --- |\n| at the surface | **1 atmosphere** |\n| 10 m down | **2 atmospheres** |\n| 20 m down | **3** |\n| 90 m down | **10** |\n\nAnd a gas squeezed by twice the pressure takes up about **half** the room. So a sealed bladder carried from the surface to 10 m is squeezed to roughly half its volume with nothing having leaked at all.\n\n**That is the simplification L2B6 was making.** It gave the fish one bladder size and let it swim anywhere, when in fact the organ changes size continuously and the fish's buoyancy changes with it.\n\nAnd as we are about to see, it changes in the worst possible direction.",
            options: [
                { id: 'cont', label: "Why the worst direction?", nextNodeId: 'defining' }
            ]
        },

        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "**Because the squeeze makes the fish sink more, which squeezes it further.**\n\nFollow a fish that is floating perfectly -- neither rising nor sinking, which is what **neutral** means. Now nudge it downwards:\n\n1. deeper water presses harder, so the **sac shrinks**\n2. a smaller sac holds less water out of the way, so the fish is **less buoyant**\n3. less buoyant means it **sinks further**\n4. which presses harder still, so go back to step 1\n\nAnd it runs the same way upwards. Nudge the fish up, the sac **expands**, it becomes more buoyant, it rises faster, and the sac expands more.\n\n**This is a runaway in both directions.** The organ has no tendency to return to where it was -- it has a tendency to leave. A fish with a gas sac and nothing else would sink to the bottom or pop to the surface from the smallest disturbance, and would never be able to simply hover.\n\n**Which tells you something important about the gas gland: it is not a refinement. It is required.** A physoclist does not carry machinery for adjusting its bladder as a convenience. Without constant correction the organ does not work at all.\n\nAnd there is one more structural consequence, which comes from pressure being about **ratios**. Going from 1 atmosphere to 2 **doubles** the squeeze. Going from 10 atmospheres to 11 changes it by a **tenth**. So the same 10 metres is a violent change near the surface and a mild one far down:\n\n**the shallower the fish, the more unstable it is** -- which is exactly backwards from what you would guess, and it is why a fish hauled up from depth is in such trouble so fast.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'network' } },
            options: [
                { id: 'work', label: "So how does a sealed fish push gas in against all that pressure?", nextNodeId: 'worked' }
            ]
        },

        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**That is the best piece of machinery in the lesson, and it is worth going slowly.**\n\nThe problem is severe. At 90 metres the bladder is at 10 atmospheres. To add gas, the fish must deliver oxygen at **more than 10 atmospheres of pressure** -- and its blood arrives from the gills carrying oxygen at a fraction of one atmosphere. It has to raise the pressure of a gas more than tenfold, using only blood.\n\nIt does it with three structures working together.\n\n**The gas gland** is a patch of tissue in the bladder wall with one particular job. Its cells do the opposite of what you would expect: they produce **lactic acid** and dump it into the blood passing them. The acid matters because of what it does to **haemoglobin**, the protein in red blood cells that carries oxygen. **Acid makes haemoglobin let go.** This is called the **Root effect**, and it means acidified blood releases oxygen as free gas rather than holding it.\n\n**The rete mirabile** -- Latin for *wonderful net* -- is the structure that makes that useful. It is a bundle of thousands of fine **capillaries** in which the vessels carrying blood **to** the gland run directly alongside the vessels carrying blood **away**, pressed together over a long distance. Free oxygen released near the gland diffuses out of the outgoing vessels and straight back into the incoming ones, over and over.\n\n**So oxygen cannot leave.** It is handed back at every step of the way out, and its pressure climbs with each handover until it is high enough to be forced into the bladder. The net does not pump; it **traps**, and trapping repeated thousands of times does the work of a pump.\n\n**And letting gas out is a separate organ.** The **oval window** is a thin patch of bladder wall with blood vessels behind it, normally covered by a muscular flap. Open the flap and gas dissolves straight into the blood and is carried to the gills; close it and nothing leaves. **Filling and emptying are two different structures**, which is why a fish can do one without the other.",
            options: [
                { id: 'check', label: "Let me test that.", nextNodeId: 'math_check' }
            ]
        },

        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "A trawler brings a physoclist fish up from **90 metres** in a couple of minutes. Its gas gland and oval window are both perfectly healthy.\n\nThe fish arrives at the surface in severe trouble, often with its stomach pushed out of its mouth. What has happened?",
            options: [
                { id: 'expand', label: "The bladder expanded roughly tenfold as the pressure fell, and the oval window cannot release gas anywhere near fast enough", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'cold', label: "The change in water temperature near the surface damaged it", nextNodeId: 'math_wrong' },
                { id: 'gland', label: "The gas gland kept adding gas all the way up", nextNodeId: 'math_wrong' }
            ]
        },

        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Count the pressures at the two ends of the journey.\n\nAt 90 metres the sac sits at about **10 atmospheres**. At the surface it is at **1**. Nothing has leaked, so the same gas now occupies something like **ten times** the volume -- inside a fish whose body cavity has not grown at all.\n\nThe result is mechanical and brutal: the bladder presses on everything around it, the fish becomes far too buoyant and cannot swim down, and in many species the expanding bladder forces the stomach up and out through the mouth. Fishers call the condition **barotrauma**, and it is why deep-caught fish usually cannot simply be released.\n\n**And the oval window is the part worth understanding.** It is not broken. It is a thin patch of wall that lets gas dissolve into blood, and dissolving gas into blood and carrying it to the gills is a **slow** process -- minutes to hours. It evolved for a fish changing depth gradually under its own power. **Hauled up in two minutes, the fish has the right organ working at the right speed on a problem a hundred times too fast.**\n\nSo *the gland kept adding gas* is the opposite of what happens -- a rising fish needs to **remove** gas, and the gland would be switched off. And temperature is a real difference between deep and surface water, but it is not what bursts a fish in two minutes.\n\n**The instability of the organ and the slowness of its controls are the same fact seen twice**, and together they set the depth range a species can actually live across.",
            options: [
                { id: 'retry', label: "Tenfold expansion, far faster than the window can vent.", nextNodeId: 'explore' }
            ]
        },

        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "The picture is a fish in section at the depth you choose. The **swim bladder** is the pale sac above the gut, with the **gas gland** and its bundle of **capillaries** at one end and the **oval window** with its flap at the other. Beside the fish, the water column shows how deep it is.\n\nThings worth doing:\n\n- Start at the surface with the gas at a middling setting, then take the **Depth** dial down. Watch the sac shrink as the water presses harder -- and watch the fish's arrow turn from level to **sinking**, because a smaller sac holds less water aside\n- Now try to hold the fish level at depth using only the **Gas Added** dial. You can -- the gland is doing exactly what a real one does, and you are standing in for it\n- Then look at where the dial is **touchiest**. Between 0 and 10 m a small move swings the fish from rising to sinking; between 100 and 110 m the same move barely registers. **The organ is least stable where the water is shallowest**\n- Set the fish neutral at 90 m and then drag the **Depth** to the surface in one movement. The sac balloons and the arrow pins to *rising* -- this is the trawled fish, and no setting of the other dial rescues it\n- And watch the **rete** as the gland works. Oxygen handed back from the outgoing vessels to the incoming ones, over and over: nothing is pumped, and the pressure climbs anyway",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Checkpoint", nextNodeId: 'checkpoint' }
            ]
        },

        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "Sharks have **no swim bladder at all** and never have. Instead a shark carries an enormous **liver**, up to a quarter of its body weight, loaded with a light oil called **squalene**. Many deep-sea bony fish have also given up their gas bladders and use oil or fat.\n\nGiven everything above, why would oil be the better answer?",
            options: [
                { id: 'incompressible', label: "Oil barely compresses, so the organ does not shrink with depth — which removes the runaway instead of correcting it", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'lighter', label: "Oil is lighter than gas, so it lifts more for its size", nextNodeId: 'checkpoint_wrong' },
                { id: 'energy', label: "Oil doubles as a food store, which is the main reason", nextNodeId: 'checkpoint_wrong' }
            ]
        },

        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Compare the two materials on the one property this whole lesson has been about: **what pressure does to them.**\n\nSqueeze a gas and it shrinks dramatically -- that is the entire source of the runaway. Squeeze an **oil** and almost nothing happens: liquids barely compress, so a litre of squalene at 1,000 metres is still essentially a litre. **A shark's liver is the same size at every depth.**\n\nWhich means the whole problem disappears rather than being managed:\n\n| | a **gas** sac | an **oil**-filled liver |\n| --- | --- | --- |\n| size as depth changes | **shrinks and swells** | **unchanged** |\n| is the fish stable? | no -- a runaway both ways | **yes** |\n| so it needs | a gland, a rete, a window, constant work | **nothing** |\n| and it can change depth | slowly, within a range | **freely** |\n\nSo *oil is lighter than gas* is simply false -- gas is far lighter, and that is oil's one cost. A shark needs a vast liver to get the lift a small bladder would give, and it must keep swimming to make up the rest. **It pays in bulk to avoid paying in instability.**\n\nAnd *a food store* is a genuine bonus, not the reason: a gas bladder could never be a food store either way, and the sharks that live shallowest still use oil.\n\n**Which is the real close of this Big Idea.** P6 and C6 asked what makes things float. The biology shows two solutions to the same sum -- and the one that looks better, gas, turns out to be the one that cannot hold still. **Evolution did not improve the gas bladder for the deep sea; it abandoned it.**",
            options: [
                { id: 'retry', label: "Oil does not compress, so there is no runaway.", nextNodeId: 'checkpoint_correct' }
            ]
        },

        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "**And that is a rare thing to see so clearly: two organs solving one problem, and the trade between them laid bare.**\n\nFloating requires holding some water out of the way, and there are two materials for the job:\n\n- **gas** is wonderfully light, so a small sac does a lot of lifting -- and it is squeezable, which makes the organ unstable and demands a gas gland, a rete mirabile, an oval window and continuous attention\n- **oil** barely compresses, so the organ is the same size at every depth and needs no control at all -- and it is only slightly lighter than water, so it takes a liver a quarter of the animal's weight to do the same job\n\n**Neither is better. They are priced differently**, and which one wins depends on where the animal lives. Near the surface, where a fish stays within a narrow band of depths, gas is excellent and the instability is manageable. Ranging across hundreds of metres, the instability becomes unmanageable and the bulk of oil is the cheaper price.\n\nWhich is why the deep sea is full of animals that do it the heavy way, and why a shark can swim from the surface to a thousand metres and back without any organ having to notice.\n\n**The structure explains the range, and the range explains the structure.** A fish's maximum and minimum depth are not set by its strength or its oxygen but by how far its buoyancy organ can be pushed before its controls cannot keep up -- which is also why the trawled fish of the last node is unrescuable. **It is not injured in any ordinary sense. It is outside the range its organ was built to be controlled in.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Two materials, two prices!", nextNodeId: 'discovery' }
            ]
        },

        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found out why a swim bladder needs machinery and an oily liver does not.**\n\n- **A swim bladder is a gas bag in the body cavity**, above the gut, walled in thin **connective tissue**. Not a lung: nothing is breathed from it, and its only job is to make the fish lighter\n- **Two designs.** A **physostome** keeps a **duct** to the gut and **gulps air** at the surface -- carp, herring, young trout. A **physoclist** is **sealed**, so every molecule in or out must come from its own **blood** -- perch, cod, most open-ocean fish, and the design that lets a fish live deep\n- **The wall cannot hold the sea off.** It only contains the gas, so the sac is squeezed to whatever size balances the water outside -- and **every 10 m of seawater adds about one atmosphere**, so 10 m down is 2 atmospheres and the sac is squeezed to about half\n- **Which runs away in both directions.** Sink a little: sac shrinks, less water held aside, less buoyant, sinks more. Rise a little: sac swells, more buoyant, rises more. **The organ has no tendency to return -- only to leave**\n- **So the gas gland is required, not a refinement.** Without constant correction a gas sac cannot hover at all\n- And because pressure works in **ratios**, 1 to 2 atmospheres **doubles** the squeeze while 10 to 11 changes it by a tenth: **the shallower the fish, the more unstable it is**\n- **Adding gas against 10 atmospheres takes three structures.** The **gas gland** secretes **lactic acid**; acid makes **haemoglobin** let go of its oxygen -- the **Root effect** -- so the blood releases free gas. The **rete mirabile**, a bundle of **capillaries** with incoming and outgoing blood pressed side by side, hands that oxygen back at every step so it cannot leave, and its pressure climbs with each handover. **The net does not pump, it traps** -- and trapping repeated thousands of times does a pump's work\n- **Emptying is a different organ**: the **oval window**, a thin patch with blood behind it and a muscular flap over it. **Filling and emptying are two structures**, so a fish can do one without the other\n- **A fish trawled up from 90 m suffers because the sac expands about tenfold** while its body cavity does not. The oval window is not broken -- dissolving gas into blood takes minutes to hours, and it evolved for a fish changing depth under its own power. **The right organ, at the right speed, on a problem a hundred times too fast**\n- **And sharks never had one.** A liver up to a quarter of the body weight, full of the light oil **squalene**, which **barely compresses** -- so the organ is the same size at every depth, there is no runaway, and no gland, net or window is needed. The price is bulk: gas is far lighter, so oil needs a vast organ to lift the same weight\n- **Neither is better; they are priced differently.** Gas is brilliant within a narrow band of depths and unmanageable across hundreds of metres. **Evolution did not improve the gas bladder for the deep sea -- it abandoned it**\n- **Still standing:** the fish's flesh is treated as not squeezing at all, when it slightly does. How fast a gland can add gas is not counted. And the rete's trapping is described rather than worked out, because following gas back and forth along vessels running in opposite directions needs more than this level.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Complete Big Idea 6, Level 3", nextNodeId: 'complete' }
            ]
        },

        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- Why Do Things Float or Sink?**\n\nThe physics and chemistry gave the sum. The biology shows two organs solving it, and what each one costs.\n\n**Summary Table:**\n| | L2B6 said | L3B6 says |\n| --- | --- | --- |\n| The organ | a swim bladder | a **gas sac** in thin **connective tissue**, above the gut |\n| Designs | one | **physostome** with a **duct**, **physoclist** sealed |\n| Its size with depth | **fixed** | squeezed: about **half** by 10 m |\n| Is the fish stable? | assumed yes | **no** -- a runaway in both directions |\n| So the gland is | -- | **required**, not a refinement |\n| Where it is worst | -- | **shallowest**, because pressure works in ratios |\n| How gas gets in | -- | **lactic acid**, the **Root effect**, a **rete mirabile** that traps |\n| How gas gets out | -- | the **oval window**, a separate structure, and slow |\n| The alternative | -- | a **squalene** liver, which **does not compress** |\n\n**What ties them together:** P6 asked what floats and C6 what mixes. The biology finds that the lightest material makes the worst organ -- because the thing that makes gas such good ballast, how little of it you need, is the same thing that makes it squeezable. So a gas bladder buys lift and sells stability, and the deep sea is full of animals that refused the trade.\n\n**The one line to remember:** a swim bladder is a bag whose size is set by the water outside rather than by the fish, which makes it run away from wherever you put it -- so a sealed fish needs a gland, a trapping net and a vent just to stand still, while a shark avoids the whole problem by floating on oil that depth cannot squeeze.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}

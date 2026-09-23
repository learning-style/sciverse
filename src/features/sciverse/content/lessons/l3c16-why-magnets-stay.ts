import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 16, chemistry.
 *
 * Removes L2C16's simplification that domains are either aligned or not. The
 * magnetisation of a real material depends on its history, which is what a
 * hysteresis loop records. Two numbers come off that loop: remanence (what is
 * left when the applied field returns to zero) and coercivity (the reverse field
 * needed to wipe it), in amperes per metre.
 *
 *   soft iron about 80 A/m, alnico about 50,000, neodymium about 900,000
 *
 * The loop's area is the energy turned to heat each cycle, which is why a
 * transformer core driven 180,000 times an hour must be soft and a fridge magnet
 * must be hard.
 *
 * Still standing: the loop is drawn at one temperature -- L2C16's Curie point
 * collapses it to a line -- and microstructure matters as much as composition.
 */
export function getL3C16Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2C16 gave you a clean rule: below the Curie temperature the domains line up, above it they cannot. Aligned or not.\n\nBut look at two lumps of iron doing completely different jobs.\n\nA **fridge magnet** holds its alignment for years, through being knocked about and carried near other magnets.\n\nThe **iron core of a transformer** must lose its alignment and rebuild it in the opposite direction **fifty times every second**, and will do so for decades without complaint.\n\nSame element, same domains, both far below the Curie temperature. What is different?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "How stubborn the alignment is. One material resists being changed and the other gives way easily -- so there must be a number for how hard it is to wipe a magnet, separate from how strong it is.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "How strong they are. The fridge magnet is a strong magnet and the transformer core is a weak one, so the weak one flips easily.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "It is the other way round, which is the surprise worth having.\n\nPut soft iron inside a coil and drive it hard, and it produces a field **stronger** than any fridge magnet -- iron saturates around **2 T**, while a ferrite fridge magnet manages perhaps **0.3 T**. Soft iron is the better magnet while the current flows.\n\nSwitch the current off and almost all of it vanishes. The fridge magnet, weaker all along, keeps nearly everything it had.\n\nSo two different properties are at work, and confusing them is the mistake:\n\n| | How much field it can make | How well it keeps it |\n| --- | --- | --- |\n| Soft iron | **very high** | almost none |\n| Fridge magnet (ferrite) | modest | **very good** |\n\nStrength and stubbornness are independent. A material can have either, both, or neither -- and engineers choose between them deliberately, because each job needs a different answer.",
            options: [
                { id: 'cont', label: "Then how is stubbornness measured?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "By plotting what the material does as you change the field around it -- and finding that it does not retrace its steps.\n\nApply an external field, the **applied field**, measured in **amperes per metre (A/m)**; that is the field you impose, and in a coil it is simply n x I from L3P16. Plot the material's own **magnetisation** against it. Take the applied field up, then back down, then negative, then back again, and the curve returns along a different path than it went out. That lag is **hysteresis**, and the closed path is a **hysteresis loop**.\n\nTwo numbers come off the loop, and they are the whole lesson.\n\n**Remanence** is the magnetisation still there when the applied field has returned to **zero**. This is what a permanent magnet lives on: nobody is holding a field across your fridge door.\n\n**Coercivity** is the **reverse** applied field needed to drive the magnetisation back to zero -- how hard you must push the other way to wipe it, in A/m.\n\n| Material | Coercivity | Called |\n| --- | --- | --- |\n| soft iron | about **80 A/m** | **soft** |\n| alnico | about **50,000 A/m** | hard |\n| neodymium | about **900,000 A/m** | **very hard** |\n\nNeodymium is more than **eleven thousand times** harder to wipe than soft iron.\n\nAnd one more reading, which decides every machine: **the area enclosed by the loop is the energy turned into heat each time round it**, per cubic metre of material. A fat loop is an expensive loop.\n\nThe conditions. **One temperature** -- warm the material and the whole loop shrinks. **Driven all the way to saturation**, or you trace a smaller inner loop instead. And **microstructure counts as much as composition**: the same iron, differently made, gives different loops.",
            options: [
                { id: 'cont', label: "Work the transformer out.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**Why a transformer core must be soft.** Mains electricity alternates at **50 Hz**, so the field across the core reverses fifty times a second.\n\n**Step 1.** loops per second = **50**\n\n**Step 2.** loops per hour = 50 x 3,600 = **180,000**\n\n**Step 3.** each loop turns its own area into heat, so the heat per hour is **180,000 x the loop area**\n\nNow suppose you built that core from neodymium instead. Its coercivity is 900,000 A/m against soft iron's 80:\n\n900,000 / 80 = **11,250 times** the field needed to reverse it\n\nThe loop would be enormously fatter, and you would pay for that area 180,000 times an hour. The core would cook, and most of the electricity would become heat instead of crossing to the other winding. So transformer cores are made of the softest iron available -- and the reason is not that soft iron is a better magnet, but that its loop is **thin**.\n\n**Why a fridge magnet must be hard.** It faces stray fields all its life and nobody is holding a field across it. It needs high **remanence** so it keeps its magnetisation at zero applied field, and high **coercivity** so a passing magnet cannot wipe it. It goes round its loop perhaps never, so a fat loop costs it nothing.\n\n| | Wanted | Because |\n| --- | --- | --- |\n| Transformer core | **low** coercivity | 180,000 loops an hour, each costing heat |\n| Fridge magnet | **high** coercivity and remanence | Must hold with no field applied |",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A transformer core is redesigned to run at **100 Hz** instead of **50 Hz**. The material is unchanged, so its loop has the same area.\n\nWhat happens to the heat it wastes each second?",
            options: [
                { id: 'right', label: "It doubles. Twice as many loops per second, each costing the same area.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'squared', label: "It quadruples, because heating goes as the square of the frequency.", nextNodeId: 'math_wrong' },
                { id: 'same', label: "It stays the same, because the material and its loop area have not changed.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**Quadruples** borrowed a square from somewhere else. Resistive heating goes as the square of **current**, which is L3P16's problem with the MRI coil. Hysteresis loss is not that: it is one loop area, once per cycle.\n\n**Stays the same** confused energy per cycle with energy per second. The loop area is the cost of **one** trip. Double the trips and you double the bill, even though each trip costs exactly what it did before.\n\n**Step 1.** energy per cycle = loop area (unchanged)\n\n**Step 2.** cycles per second = 50 → **100**\n\n**Step 3.** heat per second = area x cycles per second, so it **doubles**\n\nA useful way to hold it: the loop area is a price per lap, and the frequency is how many laps you run. Changing the material changes the price; changing the frequency changes the number of laps.",
            options: [
                { id: 'retry', label: "Area is per lap, frequency is laps per second.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials.\n\n**Coercivity** runs from the 80 A/m of soft iron to the 900,000 A/m of neodymium. **Cycles per Second** is how often the material is driven round its loop.\n\nThe lab draws the loop, marks the remanence and the coercivity on it, and works out the heat per hour.\n\nTry this:\n\n- **80 A/m** at **50 Hz**: a thin loop, 180,000 laps an hour, very little heat -- a transformer core\n- Hold 50 Hz and drag the coercivity up to **900,000 A/m**: the loop fattens enormously and the heat with it. This is the core that would cook\n- Now drop to **0 Hz** at that same high coercivity: no laps, no heat, and the remanence just sits there -- a fridge magnet\n- Set **80 A/m** at **0 Hz** and watch the remanence collapse: soft iron keeps almost nothing once the field goes\n- Notice the two dials answer different questions: coercivity is the **price per lap**, frequency is the **number of laps**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Thin loops for machines, fat loops for magnets. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A hard disk stores each bit as a patch of magnetisation on a spinning platter, and writes it with a tiny electromagnet called the head, passing within nanometres.\n\nThe platter must hold its bits for years. The head must reverse its field in **nanoseconds**, millions of times a second.\n\nWhat does that demand of the two materials?",
            options: [
                { id: 'right', label: "Opposite things, in the same device. The platter must be magnetically hard -- high coercivity, so a stray field or a neighbouring bit cannot wipe it. The head must be magnetically soft -- low coercivity and a thin loop, or it could neither flip fast enough nor survive the heat of millions of laps a second.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Both must be as hard as possible, since the whole point is storing data reliably and harder materials hold magnetisation better.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "A hard head would be useless, and for two separate reasons the loop makes obvious.\n\n**It could not flip in time.** Coercivity is the field needed to reverse the material. A hard head would need an enormous field from a coil small enough to fit on the end of an arm — and it has nanoseconds to do it in, millions of times a second.\n\n**It would destroy itself with heat.** Each reversal costs the loop area. At, say, a million reversals a second, a fat loop is a million fat bills a second in a component smaller than a grain of sand.\n\nSo the device needs both properties, deliberately separated:\n\n| | Coercivity | Why |\n| --- | --- | --- |\n| Platter (the bits) | **high** | Must survive years, stray fields, neighbouring bits |\n| Write head | **low** | Must reverse in nanoseconds, millions of times a second |\n\nAnd this is the transformer-and-fridge-magnet distinction again, in one object a few centimetres across. The head is a transformer core; the platter is a fridge magnet. One is chosen for a thin loop, the other for a fat one.\n\n**Hard and soft are not better and worse. They are answers to different questions, and a real machine usually needs both.**",
            options: [
                { id: 'retry', label: "Hard to keep, soft to switch.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **A material's magnetisation depends on its history, and the loop that records that history gives two separate numbers: remanence, which is what a permanent magnet lives on, and coercivity, which is what it costs to change it.**\n\nSo Level 3 removed L2C16's simplification. **Domains are not simply aligned or not.** Between those two states lies a whole loop, and where a material sits on it depends on what has been done to it -- which is why the same element can be the heart of a permanent magnet or the heart of a machine that reverses fifty times a second.\n\n**What is still standing in this lesson:** the loop was drawn at **one temperature**. Warm the material and the loop shrinks -- remanence and coercivity both fall -- until at L2C16's **Curie temperature** the loop collapses to a flat line and there is nothing left to record. And **microstructure was left out**: two samples of identical composition, one cast and one rolled and annealed, give measurably different loops, which is why magnet making is a craft of processing and not only of chemistry.\n\nB16 at Level 2 found what a second cue is worth. B16 at Level 3 closes the Big Idea by working out how much to trust each one.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "The loop remembers!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You measured magnetic stubbornness.**\n\n- Magnetisation depends on **history**: the curve out and the curve back do not match, which is **hysteresis**\n- The **applied field** is measured in **amperes per metre (A/m)** -- in a coil it is L3P16's n x I\n- **Remanence**: the magnetisation left when the applied field returns to **zero**\n- **Coercivity**: the **reverse** field needed to wipe it\n- soft iron about **80 A/m**, alnico about **50,000**, neodymium about **900,000** -- a range of **11,250 times**\n- **Loop area = energy turned to heat per cycle**, per cubic metre\n- Strength and stubbornness are **independent**: soft iron saturates near **2 T**, beating a fridge magnet's **0.3 T**, and keeps almost none of it\n- A 50 Hz transformer core goes round its loop **180,000 times an hour**, so its loop must be **thin**\n- Doubling the frequency **doubles** the heat per second: area is the price per lap, frequency the number of laps\n- A fridge magnet runs no laps, so it can afford a fat loop, and needs high remanence and coercivity\n- A hard disk needs **both**: a hard platter to keep bits for years, a soft head to flip in nanoseconds\n- Removed: L2C16's aligned-or-not\n- Still standing: one temperature, with the loop collapsing at the Curie point, and microstructure left out",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Thin loop or fat loop!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- Why Some Magnets Stay**\n\nL2C16 asked when domains give up. Level 3 asks what makes them hold on.\n\n**Summary Table:**\n| Idea | The Number | What It Means |\n| --- | --- | --- |\n| Hysteresis | the loop | Magnetisation depends on history |\n| Applied field | **A/m** | In a coil, n x I |\n| Remanence | at zero applied field | What a permanent magnet lives on |\n| Coercivity | reverse field to wipe it | How stubborn it is |\n| Soft iron | **80 A/m** | Thin loop: for machines |\n| Alnico | 50,000 A/m | Hard |\n| Neodymium | **900,000 A/m** | 11,250 times soft iron |\n| Loop area | energy per cycle | A fat loop is expensive |\n| Strength vs stubbornness | 2 T against 0.3 T | Independent properties |\n| A 50 Hz core | **180,000 laps an hour** | So the loop must be thin |\n| Double the frequency | heat **doubles** | Price per lap x laps |\n| A hard disk | hard platter, soft head | Both, deliberately |\n| Removed | aligned or not | A whole loop between |\n| Still standing | one temperature | The loop collapses at Tc |\n\n**The one line to remember:** a magnet's usefulness is not one number but two — how much magnetisation it keeps with no field applied, and how hard you must push to take it away — and the area between them is the heat you pay every time it changes its mind.\n\n**Up next:** B16 -- how much to trust each cue."
        }
    };
}

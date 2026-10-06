import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 23, physics. Mechanism + Limit.
 *
 * The natural first guess about fracture is that a flaw concentrates stress at its
 * tip, and for a smooth notch that is good physics: K = 1 + 2a/b. But a real crack
 * tip is a few atoms across, so K runs to infinity and the guess predicts that any
 * scratch breaks anything under any load. Scratched windows disagree.
 *
 * This lesson introduces K in order to demolish it. The stress-concentration
 * lesson it used to inherit the formula from is parked in docs/level4/.
 *
 * The resolution is that fracture is not decided by peak stress at all. Breaking
 * makes new surface, and new surface costs energy. A crack only runs if the
 * elastic energy released by letting it run exceeds the energy needed to make the
 * two new faces -- which gives, in the engineer's form,
 *
 *   stress x sqrt(pi x crack length) = fracture toughness
 *
 * so what matters is the crack's LENGTH, not the sharpness of its tip. Rearranged,
 * the critical length is (toughness/stress)^2 / pi: 12.7 mm for structural steel at
 * 250 MPa, and 62 micrometres for window glass at 50 MPa -- a factor of 204, which
 * is the whole reason glass is scratch-sensitive and steel is not.
 *
 * Still standing: this treats the material as perfectly brittle. Real steel blunts
 * its own crack tips by yielding, which is where its toughness comes from, and that
 * plastic zone is not in the formula.
 */
export function getL3P23Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "**L2P23 left one thing unsaid on purpose.** It counted a paperclip\'s bends against a life, and admitted it never told you what the invisible damage actually **was**. It is a **crack** -- a real one, a little longer after every bend. So the question *when does this break?* is really the question **how long a crack is too long?**\n\nHere is the natural first guess, and it is good physics until it is catastrophic. Notice that it does not answer in a length at all.\n\nA flaw crowds the load that used to pass through it into the material beside it, so the stress there is higher than the average by a factor that depends only on the flaw's **shape**:\n\n**K = 1 + 2a/b**\n\nwith **a** measured **across** the pull and **b** **along** it. A round hole has a = b, so K = 3: a round hole triples the stress, whatever its size.\n\nThat much is right, and engineers use it every day. Now push it. a/b of 100 gives K = 201, a/b of 1,000 gives K = 2,001, and a real crack tip is a **few atoms across**, so a/b is effectively infinite.\n\nTaken at face value, the formula says **any crack, however small, breaks anything under any load.**\n\nThe window beside you has scratches in it. A ship's hull has thousands, and so does every steel **girder** holding up a roof. They are all holding.\n\nSo the stress at the tip cannot be what decides fracture -- and the reason is worth stating sharply, because it is the kind of thing that only becomes obvious once said. **If the stress at a crack tip really were infinite, the material there would already have failed, and the crack would already be running.** Every material would split at the first scratch. The fact that things hold tells you the criterion is somewhere else entirely.\n\nHere is the clue that points to where. Breaking something does not just move atoms apart -- it **creates two new surfaces** where there was solid before. And making surface costs energy: that is why liquids bead up, why cracked things do not spontaneously re-join, and why grinding a rock to powder takes work.\n\nSo a crack running is a **transaction**. It releases stored elastic energy from the stretched material around it, and it spends energy making new face.\n\nYour two dials are the two quantities that transaction depends on.\n\n- **Material**, because the energy a new surface costs is a property of the material.\n- **Stress on the Material**, in **megapascals (MPa)** -- a million newtons per square metre, which is the same as one N/mm².\n\nSo: if a crack has to pay for its own new surface, which cracks can afford to run?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "The long ones — a longer crack has more stretched material around it to draw energy from, so at some length the release outgrows the cost.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "The sharp ones, since a sharper tip concentrates more stress into the bonds it has to break.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Sharpness is what the concentration formula trains you to look at, and it is exactly what the energy argument throws away. Worth seeing why.\n\nAsk what the sharpness of the tip actually buys. It raises the stress in a region a **few atoms wide**. The energy stored in a few atoms' worth of material is minute -- and the energy needed to make new surface has to be paid for the whole crack face, not just at the tip.\n\nSo the tip's sharpness affects a vanishingly small amount of energy on both sides of the transaction. **It nearly cancels out.** What does not cancel is how much stretched material the crack can **relieve** by growing, and that depends on how big the crack already is.\n\nPicture it. A crack sitting in a stretched plate shields the material directly above and below it -- that material is no longer carrying load, so it has relaxed, and its stored energy has already been released. The size of that relaxed region grows with the **length** of the crack. Double the crack and you roughly quadruple the relieved area, so you release four times the energy.\n\nMeanwhile the cost of extending the crack by one more millimetre is always the same: one millimetre of new surface, two faces.\n\n**Release grows with length. Cost does not.** So there must be a length at which release overtakes cost, and beyond it the crack runs away on its own.\n\nThat is the whole of fracture, and notice what has vanished from the account: the tip, the sharpness, the K. **The question is no longer how hard the material is being pulled at one point, but whether the crack can pay for itself.**",
            options: [
                { id: 'cont', label: "So where is the crossing point?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Setting release equal to cost gives a result with a shape you should expect by now.\n\nThe energy **released** per unit of crack growth goes as **stress² x length**, because the stored energy density goes as stress² and the relieved region grows with length. The energy **cost** is a constant of the material -- how much it takes to make new surface.\n\nSetting them equal and tidying up:\n\n**stress² x length = a constant of the material**\n\nwhich engineers write with the constant's square root, because that form is more useful:\n\n**stress x √(π x crack length) = K_IC**\n\n**K_IC** is the **fracture toughness** -- a measured property of the material, like its density or melting point. It has the odd-looking units **MPa√m**, and you do not need to interpret them; it is a number you look up.\n\nRead what has happened to the physics. **Crack length is now in the formula and tip sharpness is not.** A long blunt crack is more dangerous than a short sharp one, which is the exact opposite of what the concentration formula would have told you.\n\nAnd rearranged, it answers the practical question directly -- **how long a crack can this material tolerate at this stress?**\n\n**critical length = (K_IC / stress)² / π**\n\n**The condition:** this treats the material as perfectly **brittle** -- all the energy goes into new surface and none into bending atoms out of the way. That is close to true for glass and ceramics, and only roughly true for steel, which is what the end of this lesson is about.",
            options: [
                { id: 'cont', label: "Put numbers in it.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**How long a crack can structural steel carry at its working stress?**\n\nStructural steel: **K_IC = 50 MPa√m**, working stress about **250 MPa**.\n\n1. **The ratio:** 50 / 250 = **0.2**\n2. **Square it:** 0.04\n3. **Divide by π:** 0.04 / 3.1416 = **0.0127 m**\n\nSo the critical crack length is about **13 mm** -- half an inch. A crack shorter than that sits there; a crack longer than that runs, and the structure fails.\n\nThirteen millimetres is a very comfortable number. It is **visible**. You can find it by eye, by dye, by ultrasound -- which is exactly what B22's scanning was for. Steel structures are inspected on this basis: find cracks while they are still well under the critical length.\n\n**Now window glass.** K_IC = **0.7 MPa√m**, and glass in a window might carry **50 MPa**.\n\n1. **The ratio:** 0.7 / 50 = **0.014**\n2. **Square it:** 0.000196\n3. **Divide by π:** **0.0000624 m = 62 micrometres**\n\n**Sixty-two micrometres.** Thinner than a human hair. That is the longest crack window glass can tolerate at that stress.\n\n**Compare the two and the whole character of each material falls out:**\n\n| | Steel | Glass |\n| --- | --- | --- |\n| Toughness | 50 MPa√m | 0.7 MPa√m |\n| Critical crack | **13 mm** | **62 µm** |\n\nA factor of about **200**. And that single number explains the everyday behaviour of both materials. **Steel tolerates damage you can see. Glass is destroyed by damage you cannot.**\n\nIt is why you can drop a steel bar and pick it up, and why a glass scratched with a tungsten tip snaps cleanly along the scratch. The scratch did not weaken the glass by removing material -- it installed a crack longer than 62 µm.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** The same structural steel (K_IC = 50 MPa√m) is used in a design where the working stress is **500 MPa** instead of 250.\n\nHow does the critical crack length change?",
            options: [
                { id: 'right', label: "It falls to about 3.2 mm — a quarter of the 13 mm, because the stress is squared and doubling it divides the length by four.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'half', label: "It halves, to about 6.4 mm, since the stress doubled.", nextNodeId: 'math_wrong' },
                { id: 'same', label: "It stays at 13 mm, because the toughness is a property of the steel and has not changed.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**Halving** forgets the square. The stress is squared in the critical length, so doubling it divides the length by **four**, not two.\n\n**\"It stays at 13 mm\"** confuses the material's property with the structure's tolerance. K_IC really is unchanged -- it belongs to the steel. But the **critical length** is not a property of the steel alone; it depends on how hard you are pulling. Work the same steel harder and it tolerates less damage.\n\n(50 / 500)² / π = (0.1)² / π = 0.01 / 3.1416 = **0.0032 m = 3.2 mm**\n\nSo doubling the design stress took the tolerable crack from **13 mm to 3.2 mm**, and that is a serious engineering consequence rather than an arithmetic curiosity.\n\nThirteen millimetres is easy to find. **Three millimetres is hard.** It is at the edge of what routine inspection reliably catches, especially inside a weld or under paint. So a design that works the steel twice as hard does not merely have a smaller safety margin -- it moves the critical crack down to a size that **might be missed**.\n\nThat is why high-strength steels are used with more caution than their strength numbers suggest. Pushing the working stress up buys you a lighter structure and silently shrinks the flaw you must detect. **Strength and tolerance of damage pull against each other**, which is the trade this whole lesson is really about -- and it is the same shape as L2B22's detail-against-depth and L3C20's thinness-against-colour.",
            options: [
                { id: 'retry', label: "Stress is squared, and tolerance shrinks as strength is used up.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "**Try the two dials.** **Crack Length** and **Stress on the Material**, with the material's toughness fixed.\n\n| Material | Toughness | at 50 MPa | at 250 MPa | at 500 MPa |\n| --- | --- | --- | --- | --- |\n| structural steel | 50 | 318 mm | **12.7 mm** | 3.2 mm |\n| aluminium | 25 | 79.6 mm | 3.2 mm | 0.8 mm |\n| window glass | 0.7 | **62 µm** | 2.5 µm | 0.6 µm |\n| concrete | 0.4 | 20 µm | 0.8 µm | 0.2 µm |\n\nTwo things to read off it.\n\n**Down the columns:** toughness is squared too, so the 70-fold difference in toughness between steel and glass becomes a **5,000-fold** difference in tolerable crack length. Materials do not differ a little in how brittle they are.\n\n**And look at concrete.** Its critical crack at a realistic 3 MPa works out around **5.7 mm**, which is why concrete is always assumed to be cracked and is reinforced with steel to carry the tension across those cracks. L2C17 told you concrete is squeezed and steel is stretched. **This is why**: concrete cannot be trusted in tension because its tolerable crack is tiny and it always has cracks.\n\n**Now the honest limit of all this.** The formula says fracture is pure energy accounting, and for glass that is nearly true. For steel it is not, and the way it fails is the interesting part.\n\nWhen you pull hard on steel near a crack tip, the steel there does not just stretch -- it **yields**. Atoms slide past one another permanently, and that sliding **blunts the tip** and soaks up energy as heat and permanent deformation. So steel's 50 MPa√m is not really a surface-energy figure at all; it is mostly the cost of that plastic yielding, and it is about a **thousand times** larger than the true surface energy would give.\n\nWhich means steel is tough **because it is willing to deform**, and glass is brittle **because it is not**. Make steel harder and stronger -- by alloying, by heat treatment -- and you take away its ability to yield, so its toughness falls and its critical crack shrinks.\n\n**The property that makes a material strong is the one that makes it fragile.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Tough because it is willing to deform. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A glazier scores a line across a sheet of glass with a hard wheel, then snaps it cleanly along the line. The scored line is a scratch perhaps 20 µm deep.\n\nWhy does this work, and why can you not do the same to a steel plate?",
            options: [
                { id: 'right', label: "The scratch installs a crack near glass's critical length, so a small bending stress is enough to take it past critical and it runs along the line. Steel's critical crack is 13 mm, so a 20 µm scratch is a thousandth of what it would need — and steel would yield and blunt it anyway.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "The wheel cuts most of the way through, so the glass is simply thinner along the line and breaks there.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Check the depths against the glass. A window pane is about **4 mm** thick and the score is about **20 µm** -- that is **one part in two hundred**. Removing a two-hundredth of the thickness cannot possibly account for a clean break at a light bend.\n\nAnd there is a test that settles it. Score a line, then wait a day and try to snap it: it still works. Score a line and press on the **opposite** face: it still breaks along the score. Neither makes sense for \"it is thinner there\". Both make sense for \"there is now a crack there\".\n\nWhat the wheel does is **install a crack of a controlled length in a controlled place.** Glass tolerates about 62 µm at 50 MPa, so a 20 µm crack is already most of the way there. Bending the sheet raises the local stress, which **lowers** the critical length -- and when the critical length drops below 20 µm, that crack runs. Along the score, because that is where it is.\n\n**You cannot do this to steel for two separate reasons**, and both matter:\n\n- **The length is wrong by three orders of magnitude.** Steel needs about 13 mm of crack at its working stress. A 20 µm scratch is a thousandth of that.\n- **Steel will not keep the crack sharp.** Pull on it and the tip yields and blunts, spending your energy on permanent deformation instead of on new surface.\n\nSo glass-cutting is not cutting at all. **It is crack installation**, and it works because glass is brittle enough to honour it.",
            options: [
                { id: 'retry', label: "Not cutting -- installing a crack of a known length.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Exactly. The score is about 20 µm on a 4 mm pane -- one part in two hundred, far too little to matter as thinning. What the wheel does is **install a crack of a known length in a known place**, already most of the way to glass's 62 µm. Bending the sheet raises the stress, which **lowers** the critical length past 20 µm, and the crack runs along the score.\n\nSteel refuses for two separate reasons: its critical crack is **13 mm**, a thousand times longer, and its tip would **yield and blunt** rather than stay sharp.\n\nSo Level 3 has replaced that formula rather than refined it:\n\n| | The first guess said | L3P23 says |\n| --- | --- | --- |\n| What decides fracture | the **peak stress** at the tip | whether the crack can **pay for itself** |\n| What L2P23 could not say | -- | the invisible damage is a crack **length** |\n| So what matters | the flaw's **sharpness** | the crack's **length** |\n| The formula | K = 1 + 2a/b | **stress x √(π x length) = K_IC** |\n| Which predicted | any scratch breaks anything | a **critical length** you can inspect for |\n| Steel at 250 MPa | -- | **12.7 mm** -- visible |\n| Glass at 50 MPa | -- | **62 µm** -- invisible |\n| Why steel is tough | -- | because it **yields** and blunts its own cracks |",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Length, not sharpness!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You replaced a formula that predicted the absurd.**\n\n- The natural guess, **K = 1 + 2a/b**, runs to infinity at a real crack tip, so it claims any scratch breaks anything. **If that were true the crack would already be running** -- so the criterion must be elsewhere\n- Breaking **creates two new surfaces**, and making surface costs energy. So a crack running is a **transaction**\n- The energy **released** goes as **stress² x length**, because a longer crack relieves more stretched material. The **cost** of one more millimetre is always the same\n- **Release grows with length; cost does not** -- so there is a length past which the crack runs away on its own\n- Sharpness nearly **cancels**, because it only affects a few atoms' worth of energy on both sides of the transaction\n- **stress x √(π x crack length) = K_IC**, the measured **fracture toughness**. Crack **length** is in it and tip sharpness is not, so **a long blunt crack beats a short sharp one**\n- **critical length = (K_IC / stress)² / π**\n- Structural steel, 50 MPa√m at 250 MPa: **12.7 mm** -- **visible**, and inspectable\n- Window glass, 0.7 MPa√m at 50 MPa: **62 µm** -- thinner than a hair, **invisible**. A factor of about **200**\n- So **steel tolerates damage you can see and glass is destroyed by damage you cannot**\n- Stress is **squared**, so doubling the design stress takes the tolerable crack from 12.7 mm to **3.2 mm** -- which may be below what inspection reliably finds. **Strength and tolerance of damage pull against each other**\n- Toughness is squared too, so a 70-fold toughness difference becomes a **5,000-fold** difference in tolerable crack\n- Concrete's critical crack at 3 MPa is about **5.7 mm**, so concrete is always assumed cracked -- which is **why** L2C17's steel carries the tension\n- Glass-cutting is not cutting: a 20 µm score on a 4 mm pane is **one part in two hundred**, so it works by **installing a crack**, not by thinning\n- And it answers what **L2P23 could not say**: the invisible damage adding up in a bent paperclip is **crack length**. That is why a life exists at all -- the wire snaps on the bend that takes its crack past critical\n- Removed: the sharpness, and with it the infinity\n- Still standing: this treats the material as perfectly **brittle**. Steel's 50 MPa√m is mostly the cost of **plastic yielding** at the tip, about a thousand times the true surface energy -- so **steel is tough because it is willing to deform**, and hardening it takes that away. The plastic zone is nowhere in the formula",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Release grows with length; cost does not!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- How Do Materials Break and Recover?**\n\n**Summary Table:**\n| Idea | The Physics | The Number |\n| --- | --- | --- |\n| The first guess predicted | any scratch breaks anything | K to **infinity** |\n| Breaking costs | two **new surfaces** | so running is a transaction |\n| Release goes as | **stress² x length** | cost per mm is constant |\n| So the criterion is | **stress x √(π x length) = K_IC** | length in, sharpness out |\n| Rearranged | **(K_IC / stress)² / π** | the critical length |\n| Steel at 250 MPa | 50 MPa√m | **12.7 mm**, visible |\n| Glass at 50 MPa | 0.7 MPa√m | **62 µm**, invisible |\n| Double the stress | it is **squared** | 12.7 mm becomes **3.2 mm** |\n| Why steel is tough | its tip **yields and blunts** | about 1,000x the surface energy |\n| Still standing | perfectly **brittle** assumed | the plastic zone is not in it |\n\n**The one line to remember:** a crack runs only if the elastic energy it releases pays for the new surface it makes, and release grows with the crack's length while the cost does not -- so fracture is decided by how long a crack is, not how sharp, which is why steel tolerates damage you can see and glass is destroyed by damage you cannot.\n\n**Up next:** C23 has its own impossibility to resolve. Its coating protects steel it is not even covering, which no barrier can do."
        }
    };
}

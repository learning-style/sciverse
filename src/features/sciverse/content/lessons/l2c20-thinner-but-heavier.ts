import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) for Big Idea 20, chemistry.
 *
 * This lesson replaces an earlier draft that was not chemistry at all. That draft
 * computed lens thickness from the refractive index and never asked what the glass
 * was made of -- it took n as a number handed over from somewhere else, which left
 * the physics lesson and the chemistry lesson doing the same job. A reader pointed
 * that out, correctly.
 *
 * The chemistry question is: where does n come from, and what else comes with it?
 * The answer is electrons. A material bends light because the light wave pushes on
 * its electrons, so packing more electrons into each cubic centimetre raises n --
 * and electrons come attached to nuclei, which have mass. So index and density are
 * bought together:
 *
 *   weight compared with ordinary = thickness ratio x density ratio
 *
 * Which produces a result the earlier draft could not even ask about. Dense flint
 * glass is 36% thinner than crown and only 14% lighter. Lanthanum glass is 39%
 * thinner and 8% HEAVIER. And MR-174 plastic is 33% thinner and genuinely 25%
 * lighter, because it gets its index from sulfur rather than from heavy metal.
 *
 * Still standing: this treats index as coming only from how many electrons are
 * packed in. How tightly they are held matters too, and that is what lets sulfur
 * outperform its density -- Level 3 takes it apart.
 */
export function getL2C20Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "C20 told you that diamond bends light nearly twice as hard as glass, and left the interesting question alone: **why?** What is it about one material that makes light behave differently in it than in another?\n\nThe answer is not about shape, and it is not about how the material is cut. It is about what it is **made of**, and specifically about **electrons**.\n\nLight is a travelling wave of electric push and pull. When it enters a material, it pushes on the electrons there -- every atom has them -- and they wobble in response. A wobbling electron sends out a little wave of its own, slightly behind the one that pushed it, and the sum of the original wave and all these slightly-late ones is a wave that travels **slower**. That slowing is exactly what the refractive index measures.\n\nSo the rule is simple to state: **more electrons in the way means more slowing means a higher index.**\n\nAnd this is where chemistry earns its place, because there is a catch that no amount of optics would reveal. Electrons do not come on their own. Each one is attached to a nucleus, and nuclei have **mass**.\n\nYour two dials are the two properties a chemist chooses between when designing a lens material.\n\n- **Refractive Index**, n, which sets how thin the lens can be.\n- **Density**, in grams per cubic centimetre, which is how much a cubic centimetre of the material weighs.\n\nHere is the question. A high-index lens is thinner. Is it lighter?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Not necessarily -- if the index came from packing in heavy atoms, the material is denser, and less glass of a heavier substance might weigh the same or more.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "Yes -- less material has to mean less weight.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "It would be, if the material were the same. But the whole point of a high-index lens is that the material is **different**, and different materials weigh different amounts per cubic centimetre.\n\nHere is the chemistry of how you actually raise an index. You need more electrons in each cubic centimetre, and there are two ways to arrange that:\n\n- **Add heavy atoms.** A lead atom carries **82 electrons**; a silicon atom carries 14 and an oxygen atom 8. So replacing some of the silicon and oxygen in glass with lead oxide crams far more electrons into the same space. This is what **lead crystal** is, and it is why cut-glass decanters sparkle -- and also why they are so surprisingly heavy to pick up.\n- **Use atoms whose electrons are loosely held.** Some electrons wobble more readily than others for the same push, so they slow light more per electron.\n\nThe first route is the obvious one, and it brings its own bill. Lead has 82 electrons **and** an atomic mass of 207. You are buying index by the kilogram.\n\nSo \"thinner\" and \"lighter\" are two different questions with two different answers, and only the chemistry tells you which you are getting. That is worth a calculation.",
            options: [
                { id: 'cont', label: "So how do I work out the weight rather than the thickness?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "A lens's weight is how much material there is multiplied by how heavy that material is per cubic centimetre. Both parts change when you switch glass, and they change in **opposite directions**:\n\n**weight compared with ordinary = thickness ratio x density ratio**\n\nThe two pieces are:\n\n- **Thickness ratio.** As L2P20's unit work implies and L3P20 will derive, a higher index needs less material for the same bending power. The ratio is **(ordinary n - 1) / (new n - 1)** -- so switching from crown glass at 1.517 to dense flint at 1.805 gives 0.517 / 0.805 = **0.64**, or 36% thinner.\n- **Density ratio.** Simply **new density / ordinary density**, both in **g/cm³**. Crown glass is 2.51 g/cm³ and dense flint is 3.37, so 3.37 / 2.51 = **1.34**.\n\nMultiply them and you have the weight.\n\nTwo things to hold on to:\n\n- **The two ratios fight.** One is below 1 and the other above it, so the answer is the product of a saving and a penalty, and which wins is not obvious in advance.\n- **Density is a chemical fact, not an optical one.** You cannot look at a lens and know it; you have to know what it is made of. That is precisely why this is a chemistry lesson and not a continuation of the physics one.\n\n**The condition:** this compares lenses of the same prescription and diameter, and treats the lens as though all of it scaled with the middle thickness. Real lenses have edges and rims that complicate it slightly.",
            options: [
                { id: 'cont', label: "Put some real materials through it.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**Crown glass to dense flint glass, the traditional way to make a lens thinner.**\n\n1. **Thickness ratio:** 0.517 / 0.805 = **0.64** -- 36% thinner\n2. **Density ratio:** 3.37 / 2.51 = **1.34** -- 34% denser\n3. **Weight:** 0.64 x 1.34 = **0.86** -- only **14% lighter**\n\nSo 36% thinner buys 14% lighter. The heavy atoms that supplied the index took most of the saving back.\n\n**Now push it further, to lanthanum glass -- n = 1.850, density 4.44 g/cm³.** This is the glass used where a very high index really matters:\n\n1. **Thickness ratio:** 0.517 / 0.850 = **0.61** -- 39% thinner\n2. **Density ratio:** 4.44 / 2.51 = **1.77**\n3. **Weight:** 0.61 x 1.77 = **1.08** -- **8% heavier**\n\n**Thinner and heavier at the same time.** A lens with 39% less material in it that weighs more than the one it replaced. No amount of optics could have predicted that, and no optician would want to discover it on a customer's nose.\n\n**And now a plastic: MR-174, n = 1.740, density 1.47 g/cm³**, compared with ordinary CR-39 plastic at n = 1.498 and 1.32 g/cm³:\n\n1. **Thickness ratio:** 0.498 / 0.740 = **0.67**\n2. **Density ratio:** 1.47 / 1.32 = **1.11**\n3. **Weight:** 0.67 x 1.11 = **0.75** -- **25% lighter**\n\nThe plastic gained almost a quarter of an index point and barely any density. That is not luck; it is a different chemistry, and it is the next thing to look at.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** **Polycarbonate** has n = 1.586 and a density of **1.20 g/cm³**, which is lighter than ordinary CR-39 plastic at n = 1.498 and 1.32 g/cm³.\n\nCompared with CR-39, how heavy is a polycarbonate lens of the same prescription?",
            options: [
                { id: 'right', label: "About 77% as heavy. Thickness ratio 0.498/0.586 = 0.85, density ratio 1.20/1.32 = 0.91, and 0.85 x 0.91 = 0.77.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'thickness_only', label: "About 85% as heavy -- the thickness ratio is the answer.", nextNodeId: 'math_wrong' },
                { id: 'added', label: "About 176% as heavy, from adding the two ratios.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**Using the thickness ratio alone** is the mistake the whole lesson exists to prevent. 0.85 is how much **material** there is, not how much it **weighs**. Ignore density and you cannot tell the dense flint case from the lanthanum case, and those two end up on opposite sides of \"lighter\".\n\n**Adding** the ratios gives 1.76, which is nonsense on inspection: it says a thinner, less dense lens is nearly twice as heavy. Ratios that describe independent effects **multiply**. You can see why from the units: weight is cm³ times g/cm³, so it is a product, and the ratio of a product is the product of the ratios.\n\n**0.498 / 0.586 = 0.85, and 1.20 / 1.32 = 0.91. Then 0.85 x 0.91 = 0.77**, so about **77% as heavy** -- 23% lighter.\n\nAnd notice what is unusual here. Polycarbonate is the one case where **both** ratios help: it is thinner **and** less dense than ordinary plastic. That is rare, and it is why polycarbonate is used for children's spectacles and safety glasses. It has a different drawback, and L3C20 finds it.",
            options: [
                { id: 'retry', label: "Multiply the two ratios -- thickness and density.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "**Try the two dials.** **Refractive Index** and **Density** in g/cm³, both compared with crown glass at n = 1.517 and 2.51 g/cm³.\n\n| Material | n | Density | Thinner by | Weight vs crown |\n| --- | --- | --- | --- | --- |\n| CR-39 plastic | 1.498 | 1.32 | slightly thicker | **0.55** |\n| Polycarbonate | 1.586 | 1.20 | 12% | **0.42** |\n| MR-8 plastic | 1.600 | 1.30 | 14% | **0.45** |\n| MR-174 plastic | 1.740 | 1.47 | 30% | **0.41** |\n| Crown glass | 1.517 | 2.51 | — | **1.00** |\n| Dense flint glass | 1.805 | 3.37 | 36% | **0.86** |\n| Lanthanum glass | 1.850 | 4.44 | 39% | **1.08** |\n\nRead the last two columns together, because they tell a story neither tells alone.\n\n**Every plastic beats every glass on weight**, and not narrowly -- the worst plastic is lighter than the best glass by a wide margin. That single column is why almost every pair of spectacles sold today has plastic lenses, and it is a chemistry fact: the polymers are built from carbon, hydrogen, oxygen and sulfur, and none of those is heavy.\n\n**Within the glasses, thinner gets steadily heavier.** Crown to dense flint to lanthanum: 1.00, 0.86, 1.08. The index climbs the whole way and the weight turns around, because lead and lanthanum are heavy atoms and you need a great many of them.\n\n**And MR-174 is the interesting one.** It reaches n = 1.740 -- nearly dense flint's index -- at 1.47 g/cm³, which is **less than half** dense flint's density. It cannot be doing it by packing in heavy atoms, because it has none. It does it with **sulfur**, whose outer electrons are unusually loosely held, so each one wobbles further for the same push. **Index per electron, instead of index per gram.**\n\nThat is the chemical trick that makes modern thin spectacles possible, and it is why the still-standing note below matters.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Index per electron, not index per gram. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** Lead crystal decanters and cut glass contain **lead oxide** -- up to a third of the glass by weight. They bend light strongly, sparkle beautifully, and are noticeably heavy for their size.\n\nLead crystal is no longer used for spectacle lenses, and it was once common. A student suggests the reason is that better glasses were invented with a higher index.\n\nIs that the reason?",
            options: [
                { id: 'right', label: "No -- lead glasses reach a perfectly good index. They were dropped because lead is toxic and heavy, and because plastics reach the same index at a third of the weight.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Yes -- modern glasses bend light more strongly than lead glass can, so lead became obsolete.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Check that against the numbers, because lead glass is not optically outclassed at all. Dense flint glass **is** a lead glass, and it reaches n = 1.805 -- higher than the 1.740 of the best spectacle plastic. As an index, lead is still competitive.\n\nSo it was not replaced for want of bending power. It was replaced for two reasons that are both chemistry rather than optics:\n\n- **Weight.** 3.37 g/cm³ against MR-174's 1.47. A lead-glass lens for a strong prescription is thin and heavy, and it sits on the bridge of somebody's nose all day. The weight column in the table is not a detail; it is the thing wearers complain about.\n- **Lead is toxic.** It is a cumulative poison, and it is now tightly restricted in consumer goods. The glass itself is stable and safe to wear, but making it, grinding it and disposing of it are all problems, and the industry moved away from lead for the same reasons it left paint and petrol.\n\nAnd the replacement was not a cleverer way to pack in heavy atoms. It was a **different route to the same index**: sulfur-rich plastics, whose loosely held electrons give high index at low mass, and lanthanum or titanium oxides where glass is still wanted.\n\nWhich is the general lesson worth taking. When a material is replaced, the reason is often not that the new one performs better on the headline number. It is that the old one's **other** properties -- weight, toxicity, cost, how it behaves when you drill a hole in it -- turned out to matter more.",
            options: [
                { id: 'retry', label: "It was weight and toxicity, not bending power.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Exactly. Dense flint glass **is** a lead glass and it still reaches n = 1.805, higher than any spectacle plastic. It lost on weight and on toxicity, not on optics.\n\nSo the chemistry of this Big Idea comes down to one question with two answers:\n\n**How do you get more electrons into the path of the light?**\n\n- **Pack in heavy atoms.** Lead's 82 electrons per atom, or lanthanum's 57. It works, and every electron arrives attached to a heavy nucleus, so the density climbs as fast as the index. This is the traditional route, and it is why thin glass lenses are not light ones.\n- **Use atoms whose electrons are loosely held.** Sulfur gives more wobble per electron, so you gain index without gaining much mass. This is the modern route, and it is why a strong prescription today can be both thin and light.\n\nThat is the difference between the physics and the chemistry of a lens, stated plainly. **The physics decides what index you need.** L2P20 gave you the dioptres and L3P20 derives the thickness. **The chemistry decides what you must give up to get it** -- and whether what you give up is weight, money, toughness or something else depends entirely on which atoms you chose.\n\nOne thing here is still asserted rather than explained. Why are sulfur's electrons more loosely held than silicon's? And if loosely held electrons are so useful, is there a price for those too? There is, and it is the next lesson.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Two routes to the same index, with different bills.", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found out where a refractive index comes from, and what it costs.**\n\n- Light is a wave of electric push and pull. It **wobbles the electrons** in a material, each wobble sends out a slightly late wave of its own, and the sum travels slower. **That slowing is the refractive index**\n- So **more electrons in the way means a higher index** -- which makes index a question about composition, not shape\n- But **electrons come attached to nuclei**, and nuclei have mass. Index and density are bought together\n- **weight compared with ordinary = thickness ratio x density ratio**, and the two ratios fight: one below 1, one above\n- Ratios of independent effects **multiply**, because weight is cm³ times g/cm³\n- Crown glass to dense flint: **36% thinner, only 14% lighter**\n- Crown glass to lanthanum glass: **39% thinner and 8% heavier**. Thinner and heavier at once, which no optical argument could predict\n- **Every plastic is lighter than every glass here**, which is why nearly all spectacles sold today have plastic lenses\n- Lead carries **82 electrons** per atom against silicon's 14, which is how lead crystal works -- and why a cut-glass decanter is so heavy for its size\n- **MR-174 plastic reaches n = 1.740 at 1.47 g/cm³**, less than half dense flint's density, using **sulfur** rather than heavy metal: index per electron instead of index per gram\n- Lead glass was dropped for **weight and toxicity**, not for want of bending power -- dense flint still reaches a higher index than any spectacle plastic\n- Removed: an earlier draft of this lesson that computed thickness from n and never asked what the material was\n- Still standing: this counts electrons and ignores **how tightly they are held**, which is exactly what lets sulfur beat its own density -- and there is a price for loosely held electrons that this lesson cannot see",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Electrons come with nuclei attached!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- How Do Lenses Change What We See?**\n\nC20 said diamond bends light harder than glass. Level 2 says why any material bends light at all, and what you pay for more of it.\n\n**Summary Table:**\n| Idea | The Chemistry | The Number |\n| --- | --- | --- |\n| Where n comes from | light **wobbles electrons**, and the re-radiated waves arrive late | the sum travels slower |\n| So a high index needs | **more electrons per cubic centimetre** | a question of composition |\n| The catch | electrons arrive **attached to nuclei** | which have mass |\n| The sum | **thickness ratio x density ratio** | the two ratios fight |\n| Dense flint glass | lead oxide, 82 electrons an atom | 36% thinner, **14% lighter** |\n| Lanthanum glass | heavier still | 39% thinner, **8% heavier** |\n| MR-174 plastic | **sulfur**, loosely held electrons | 30% thinner, **25% lighter** |\n| Every plastic | carbon, hydrogen, oxygen, sulfur | lighter than every glass |\n| Why lead went | **toxic and heavy**, not outclassed | still reaches n = 1.805 |\n| Not in the formula | **how tightly** electrons are held | which is Level 3 |\n\n**The one line to remember:** a material bends light by having its electrons pushed about, so a higher index means more electrons in the way -- and since every electron arrives attached to a nucleus, the traditional way to buy index is to buy weight, which is why the thinnest glass lens can be heavier than the one it replaced.\n\n**Up next at Level 3:** sulfur's electrons are loosely held, which is why it gives index without weight. Loosely held electrons have a second consequence, and it is the reason nobody makes a camera lens out of a single piece of glass."
        }
    };
}

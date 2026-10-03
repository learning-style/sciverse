import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 23, biology. Biology closes the Big Idea, and
 * its summary table covers all three lessons.
 *
 * L2B23 computed "short side / 2" for a rectangle and the radius for a circle, as
 * two separate cases. They are one case. If an edge advances at speed v in every
 * direction, the last point to be covered is the point furthest from any edge --
 * the centre of the largest circle that fits inside the wound. So
 *
 *   days to close = inradius / v
 *
 * and "short side / 2" was the inradius of a rectangle all along. One rule, every
 * shape, and it explains why stitching works, why an ellipse is chosen, and why a
 * large wound cannot close this way at all: a 10 cm circular wound has a 50 mm
 * inradius, which is 100 days.
 *
 * Still standing: v is treated as a constant and is not. The advancing edge needs
 * oxygen from capillaries that are themselves regrowing, so a big wound's centre is
 * beyond supply -- which is a different failure from merely being far away.
 */
export function getL3B23Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2B23 gave you two separate recipes and did not notice they were the same one.\n\nFor a **rectangle**, it said: take the short side and halve it.\n\nFor a **circle**, it said: take the radius.\n\nThose look like different rules for different shapes, and a learner could reasonably expect a third rule for a triangle, a fourth for a star-shaped graze, and a lookup table for anything awkward. That is a bad sign in a piece of science -- **a quantity with a different formula for every shape usually means the real quantity has not been identified yet.**\n\nSo look at what the two have in common. In both cases the number is **the distance from the wound's centre to its nearest edge**.\n\n- The rectangle's centre is half the short side from the long edges. Not from the **ends** -- those are much further away, and they are irrelevant.\n- The circle's centre is one radius from the rim, in every direction.\n\nAnd think about what the healing actually has to do. Skin creeps in from every edge at once. The wound is closed when the **last** bare point is covered. So the clock is set by **whichever point holds out longest** -- the point that is furthest from any edge.\n\nYour two dials are the two things that determine where that point is and how fast it is reached.\n\n- **Wound Shape**, from a circle through ovals to a long thin slit.\n- **How Fast the Edge Advances**, in mm a day, which depends on blood supply and age.\n\nSo: for any shape at all, what single distance decides how long it takes?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "The distance from the edge to the furthest point inside — the radius of the biggest circle that fits in the wound.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "The wound's perimeter divided by its area, since that measures how much edge there is per amount of wound.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Perimeter over area is a genuinely good instinct -- it is the right quantity for a great many problems, and it is worth seeing precisely why it is not the right one here.\n\nIt would be right if the wound closed when **enough new skin had been made**. Then more edge really would mean faster, and the total would matter.\n\nBut the wound is not closed when enough skin exists. It is closed when **the last bare spot is covered.** And one stubborn spot, far from any edge, keeps it open however much skin has been made everywhere else.\n\nHere is the case that kills perimeter-over-area. Take a wound shaped like a thin ring -- a doughnut. It has an enormous perimeter for its area: two rims, inner and outer, both feeding inward. Perimeter over area would call it the fastest-healing shape there is.\n\nAnd it is: a thin ring closes very quickly, because no point in it is far from a rim.\n\nNow take the **same area** as a solid disc. Much less perimeter. Perimeter over area says slower -- and it is slower. So far, so good.\n\nBut now take a shape with a long thin arm and one fat blob: lots of perimeter from the arm, and a blob whose centre is a long way from anything. Perimeter over area is dominated by the arm and calls it fast. In reality **the blob decides**, and the arm's contribution to the answer is zero.\n\n**An average cannot answer a question about the worst case.** Perimeter over area is an average over the whole wound; the closing time is set by one point. So the quantity you need is not an average at all -- it is a **maximum**: the furthest any point is from an edge.",
            options: [
                { id: 'cont', label: "A maximum, not an average. Name it.", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "It is the radius of the **largest circle that fits inside the wound** -- the **inradius**.\n\nThat circle's centre is, by construction, the point furthest from any edge, and its radius is how far away the nearest edge is. So:\n\n**days to close = inradius / speed of the advancing edge**\n\nOne rule, any shape. And now check it against L2B23's two recipes:\n\n| Shape | Largest circle that fits | Inradius |\n| --- | --- | --- |\n| circle, radius r | the wound itself | **r** |\n| square, side s | touching all four sides | **s / 2** |\n| rectangle, short side w | touching the two long edges | **w / 2** |\n| long thin slit, width w | touching both long edges | **w / 2** |\n\n**L2B23's \"short side divided by two\" was the inradius of a rectangle all along**, and \"the radius\" was the inradius of a circle. Two recipes, one quantity, and the quantity was hiding because rectangles and circles name it differently.\n\nNotice what drops out of the formula. **The wound's area is not in it. Its perimeter is not in it. Its length is not in it.** A 2 mm wide cut closes in the same time whether it is 10 mm long or 500 mm long, because the largest circle that fits in it has a 1 mm radius either way.\n\n**The condition:** this assumes the edge advances at the same speed everywhere and keeps going. Both parts fail for a large wound, which is the end of this lesson.",
            options: [
                { id: 'cont', label: "Work some out.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**Take 100 mm² of damage and shape it four ways, at 0.5 mm a day.**\n\n| Shape | Largest circle inside | Days |\n| --- | --- | --- |\n| circle | radius **5.64 mm** | **11.3** |\n| 10 x 10 square | radius **5.00 mm** | **10.0** |\n| 50 x 2 slit | radius **1.00 mm** | **2.0** |\n| 100 x 1 slit | radius **0.50 mm** | **1.0** |\n\nSame area, same cells, same speed -- and **eleven times** the spread, entirely because of where the biggest circle can sit.\n\nThe circle is worst for a reason you can now state exactly: **of all shapes with a given area, the circle has the largest inradius.** Packing area compactly is the same thing as putting some point as far from the edge as possible.\n\n**And now the two surgical facts fall straight out.**\n\n**Why stitching works.** It removes no area at all -- L2B23 made that point and could not explain it. Pull the two long edges into contact and the largest circle that fits between them has a radius of nearly **zero**. The inradius was the whole answer, so collapsing it collapses the time. **Stitching does not reduce the wound; it reduces the inradius.**\n\n**Why an ellipse.** A surgeon removing a lump must take a patch of skin with it, and they choose a long thin ellipse rather than a circle of the same area. A circle's inradius is as large as it can be; an ellipse's is its **semi-minor axis**, which can be made as small as you like by making it longer. And an ellipse's nearly-parallel sides can be pulled together cleanly, where a circle puckers.\n\n**Check the rule against something it should get right.** A ring-shaped wound 20 mm across with a 1 mm wall: the largest circle that fits in the wall has radius **0.5 mm**, so **1 day** -- fast, despite being 20 mm across, because no point in it is far from a rim. That matches what the misconception node predicted, and for the right reason this time.",
            options: [
                { id: 'try', label: "Let me try one.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A circular wound is **10 cm across** -- a large burn. The edge advances at the usual **0.5 mm a day**.\n\nHow long would it take to close by edge advance alone?",
            options: [
                { id: 'right', label: "About 100 days — the inradius is 50 mm, and 50 / 0.5 = 100.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'diam', label: "About 200 days, from 100 mm divided by 0.5.", nextNodeId: 'math_wrong' },
                { id: 'area', label: "About 15,700 days, from the area divided by 0.5.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**200 days** used the **diameter**. The edge only has to reach the centre, not cross the whole wound -- and the edge on the far side is doing the same job from its own direction. The inradius of a circle 100 mm across is **50 mm**.\n\n**Dividing the area** by a speed gives mm²/(mm/day) = mm·day, which is not a time. Area has not appeared in this lesson's formula at all.\n\n**50 mm / 0.5 mm a day = 100 days.**\n\nAnd a hundred days is the answer that matters clinically, because it is far too long. Over fourteen weeks, the wound is open to infection, leaking fluid, and scarring as it goes. **A wound this size is not left to close from its edges** -- it is **grafted**: skin is taken from elsewhere and laid over the middle, which does not speed the edges up at all. It **creates new edges** in the centre where there were none.\n\nThat is the same move as stitching, applied where stitching is impossible. Stitching brings two edges together; a graft **installs** edges in the middle of a region that had none. Both attack the **inradius** rather than the area, the rate or the stages.\n\nSo the one quantity in this lesson turns out to be the one every treatment is aimed at. **Nobody can make skin creep faster than about half a millimetre a day. What a surgeon can change is how far it has to creep.**",
            options: [
                { id: 'retry', label: "A graft installs new edges where there were none.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "**Try the two dials.** **Wound Shape** and **How Fast the Edge Advances**.\n\n| Circular wound | at 0.25 mm/day | at 0.5 mm/day | at 1.0 mm/day |\n| --- | --- | --- | --- |\n| 10 mm across | 20 days | **10 days** | 5 days |\n| 30 mm across | 60 days | 30 days | 15 days |\n| 50 mm across | 100 days | 50 days | 25 days |\n| **100 mm across** | 200 days | **100 days** | 50 days |\n\nThe speed dial is honest about something L2B23 hid. **0.5 mm a day was never a constant.** It falls with poor blood supply, with age, with diabetes, with smoking, with infection -- and halving it doubles every number in the table. A 30 mm wound that closes in a month in a healthy young person takes two months at half the rate.\n\n**But the real limit is not in the table at all**, and it is the honest end of this lesson.\n\nThe advancing edge is living tissue, and living tissue needs oxygen. It gets it from **capillaries**, which have to grow in behind the advancing edge -- and they grow at roughly the same half a millimetre a day. Tissue more than about **0.2 mm** from a capillary cannot get enough oxygen.\n\nSo the edge is not an independent machine creeping along at its own speed. It is **towing its own blood supply**, and it can only go as fast as that supply extends. In a small wound this does not matter: the edge has only a few millimetres to travel and the capillaries keep up easily.\n\nIn a large wound it matters completely. The centre is tens of millimetres from any blood vessel, the tissue there has no oxygen, and it does not sit politely waiting -- it **dies**, or fills with poorly organised tissue, or becomes a chronic wound that does not close at all. The formula quietly assumes a 100 mm wound closes in 100 days. **Often it simply never closes**, and that is a different kind of failure from being slow.\n\nWhich is why a graft is not a shortcut. **It is the only option**, because it puts living edges -- with their own blood supply -- in the middle of a region that could never have been reached from outside.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "The edge tows its own blood supply. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** Two wounds on the same patient, same total area. One is a single 40 mm circle. The other is forty separate 1 mm cuts.\n\nWhich closes sooner, and what does the comparison show about the whole Big Idea?",
            options: [
                { id: 'right', label: "The forty small cuts — each has a 0.5 mm inradius, so all of them close in about a day, while the circle needs 40 days. Damage spread out over many small boundaries recovers far faster than the same damage concentrated into one.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "The single circle, because one wound means one healing process rather than forty running at once.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "There is no cost to running forty at once. Healing is not done by a central process that has to take turns -- it is done by the cells at each edge, and every cut has its own edges working independently and simultaneously.\n\nSo count inradii:\n\n- **One 40 mm circle:** inradius **20 mm**, so 20 / 0.5 = **40 days**\n- **Forty 1 mm cuts:** each inradius **0.5 mm**, so **1 day** -- all of them, in parallel\n\nForty times the number of wounds, and **a fortieth of the time.**\n\nAnd that comparison is the whole Big Idea in one line, because it is exactly the opposite of what happened in the physics.\n\n**L3P23:** a crack of a given total length is dangerous when it is in **one** piece. Split the same amount of cracking into many short cracks and the material is safe, because each one is below the critical length.\n\n**L3B23:** damage of a given total area heals fast when it is in **many** pieces. Gather it into one and healing becomes slow or impossible.\n\n**Both of those are the same statement.** What matters is never the total amount of damage -- it is how **concentrated** it is, because both breaking and healing happen at boundaries, and concentration is what puts a point far from the nearest boundary.\n\nA long crack has a tip far from any free surface that could relieve it. A big wound has a centre far from any edge that could cover it. **Concentrated damage is dangerous and spread damage is survivable**, in a steel plate and in skin alike.",
            options: [
                { id: 'retry', label: "What matters is not how much damage, but how concentrated.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Exactly. One 40 mm circle has a **20 mm** inradius and takes **40 days**; forty 1 mm cuts each have a **0.5 mm** inradius and take **one day**, all in parallel. Forty times the wounds, a fortieth of the time.\n\nAnd that is the whole Big Idea in one comparison, because it is the **mirror image** of the physics:\n\n- **L3P23:** cracking of a given total length is dangerous in **one** piece and harmless in many, because each short crack is below the critical length.\n- **L3B23:** damage of a given total area heals fast in **many** pieces and badly in one.\n\nBoth say the same thing. **What matters is not how much damage there is but how concentrated it is** -- because both breaking and healing happen at boundaries, and concentration is exactly what puts a point far from the nearest boundary.\n\nSo Big Idea 23 closes here. Three materials, two breaking and one recovering, and one quantity underneath all of them:\n\n| | The boundary | The distance that decides | And what you can change |\n| --- | --- | --- | --- |\n| **L3P23** | a crack's two faces | its **length** vs (K_IC/stress)²/π | keep cracks **short** |\n| **L3C23** | the metal/water interface | the **reach** of the circuit, 2 to 50 mm | keep bare patches **narrow** |\n| **L3B23** | the wound's rim | the **inradius** | bring edges **together** |\n\nRead the last column. Not one of them is about making the material stronger, or the coating thicker, or the cells faster. **Every one is about shortening a distance to a boundary.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Every one is about shortening a distance to a boundary!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found the one quantity L2B23 was calculating without naming.**\n\n- Two recipes for two shapes is a warning sign: **a quantity with a different formula for every shape has not been identified yet**\n- Skin creeps in from every edge at once, so the wound closes when the **last** bare point is covered -- the clock is set by **whichever point holds out longest**\n- That is the centre of the **largest circle that fits inside the wound**, and its radius is the **inradius**\n- **days to close = inradius / speed of the advancing edge.** One rule, any shape\n- **L2B23's \"short side / 2\" was the inradius of a rectangle all along**, and \"the radius\" was the inradius of a circle\n- **Area, perimeter and length are all absent** from the formula. A 2 mm cut closes in the same time at 10 mm long or 500 mm long\n- Perimeter over area is the wrong quantity because **an average cannot answer a question about the worst case** -- a shape with a thin arm and a fat blob is decided entirely by the blob\n- Of all shapes with a given area, the **circle has the largest inradius**, so it is the slowest: **11.3 days** against 2.0 for a 50 x 2 slit of the same 100 mm²\n- **Stitching removes no area and still collapses the time**, because it collapses the **inradius** -- which is the whole answer\n- An **ellipse** is chosen because its inradius is its semi-minor axis, which can be made as small as you like, and its nearly parallel sides pull together cleanly\n- A **10 cm circular wound** has a 50 mm inradius: **100 days**, which is why it is **grafted**. A graft does not speed the edges up -- it **installs new edges** in the middle\n- **Nobody can make skin creep faster than about half a millimetre a day. What a surgeon changes is how far it has to creep**\n- And the honest limit: **the edge tows its own blood supply.** Capillaries regrow at about the same rate, and tissue more than **0.2 mm** from one cannot get oxygen -- so a large wound's centre does not wait patiently, it **never closes**. That is a different failure from being slow\n- Forty 1 mm cuts close in **one day**; the same area as one 40 mm circle takes **40**\n- Which mirrors L3P23 exactly: cracking is dangerous in **one** piece, damage heals best in **many**. **What matters is not how much damage but how concentrated it is**\n- Removed: L2B23's two shape-specific recipes, and its constant rate\n- Still standing: the inradius rule assumes the edge advances at one speed and keeps going, and both fail once the centre is out of reach of a blood supply",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "The biggest circle that fits!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- How Do Materials Break and Recover?**\n\nThree levels, two kinds of breaking and one kind of recovery, and a single idea underneath all of them.\n\n**Summary Table:**\n| | Physics | Chemistry | Biology |\n| --- | --- | --- | --- |\n| **Level 1** | a notch raises the risk | rust needs water and ions | healing happens in stages |\n| **Level 2** | **K = 1 + 2a/b** | **thickness / rate** | **(short side / 2) / 0.5 mm a day** |\n| **Level 3** | **stress √(πa) = K_IC** | a **0.32 V** galvanic cell | **inradius / rate** |\n| **What Level 3 removed** | the **sharpness**, and its infinity | the unexplained scratch | two shape-specific recipes |\n| **The mechanism** | a crack must **pay for its own surface** | the steel is the **wrong electrode** | the **last point** covered sets the clock |\n| **The number that decides** | **12.7 mm** in steel, **62 µm** in glass | **2 mm** in rain, **50 mm** in seawater | **11.3 days** round, **2.0** as a line |\n| **The surprise** | tough **because** it will deform | the harsh place reaches **further** | a graft **installs** edges |\n| **Still standing** | the **plastic zone** is not in it | clean metals assumed | the edge **tows its blood supply** |\n\n**The one line to remember:** breaking and recovering are both boundary events, so each is decided by a distance to the nearest boundary -- a crack's length, the reach of a galvanic circuit, the radius of the biggest circle inside a wound -- which is why concentrated damage is dangerous and spread damage is survivable, in steel and in skin alike.\n\n**Where this leaves Big Idea 23:** the question was how materials break and recover, and the three disciplines answer it with the same geometry pointed two ways. Nothing here happens in the bulk of a material. A crack runs from its tip, corrosion works at an interface, skin closes from a rim -- so in all three the thing you can change is never the amount of material or the speed of the process, but **how far anything is from an edge.**"
        }
    };
}

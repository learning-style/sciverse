import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) for Big Idea 23, chemistry. C23 said corrosion needs water
 * and ions and showed rust spreading. It never said how anyone stops it.
 *
 * The answer is chemistry, not a barrier. Zinc is MORE reactive than iron -- it
 * gives up its electrons more readily -- so where the two are in contact the zinc
 * corrodes and the iron does not. The steel is not sealed off; it is out-competed.
 *
 * Which turns protection into a stock-and-rate sum:
 *
 *   years of protection = coating thickness / zinc loss each year
 *
 * 85 micrometres of galvanising is the usual figure. In dry rural air zinc goes at
 * about 0.5 um a year, so that is 170 years; in marine splash it goes at 8 um a
 * year, so the same coating is gone in 11.
 *
 * Still standing: nothing here explains why a scratch through the zinc does not
 * start rusting, which is the whole reason galvanising beats paint. Level 3 does.
 */
export function getL2C23Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "C23 showed you rust spreading across steel and told you corrosion needs **water** and **ions**. Both true. Neither tells you what to do about it.\n\nAnd something has clearly been done about it, because the world is full of steel that is not rusting. Motorway crash barriers stand in salt spray for decades. The steel inside them is the same steel that rusts in a week if you leave it in the rain.\n\nThe usual guess is that they are **sealed** -- painted or coated so the water never reaches the metal. That is how paint works, and it is **not** how the best protection works.\n\nHere is the chemistry instead. Metals differ in how readily they give up **electrons** -- that is what makes a metal reactive. Put them in order and you get the **reactivity series**: potassium and sodium at the top, giving up electrons very readily, gold and platinum at the bottom, barely at all.\n\n**Zinc sits above iron.** It gives up electrons more readily than iron does.\n\nSo if you coat steel in zinc and water gets to both, the water does not get to choose politely. The **more reactive** metal reacts. The zinc corrodes, and the iron -- sitting right there, wet, with oxygen available -- does not.\n\nYour two dials are the two things that decide how long that lasts.\n\n- **Coating Thickness**, in **micrometres (µm)** -- thousandths of a millimetre.\n- **Where It Lives**, which sets how fast the zinc itself is eaten away, in µm each year.\n\nSo: if the zinc is being eaten away, what is protecting the steel after the zinc has gone?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Nothing — the protection lasts exactly as long as the zinc does, so its thickness and how fast it goes decide the lifetime.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "The rust that formed on the zinc, which seals the surface permanently.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Half right, and the half that is wrong is the half that matters.\n\nZinc **does** form its own coating as it corrodes -- zinc oxide and carbonate, a dull grey layer -- and that layer genuinely slows the zinc down. It is why zinc lasts for decades while bare iron rusts in weeks. Without it, galvanising would be useless.\n\nBut it does not stop it. The layer is slowly washed and weathered away, especially where rain runs over it or salt attacks it, and fresh zinc underneath corrodes to replace it. So the zinc is consumed **steadily**, not once.\n\nAnd that is the honest picture of this kind of protection: **the coating is not a seal, it is a supply.** It works by being used up on purpose. When it is gone, it is gone, and the steel starts rusting as though it had never been coated.\n\nWhich is why a galvanised part has a **predictable** life rather than an indefinite one -- and why that life is simply how much zinc you started with, divided by how fast this particular place eats it.\n\nThere is a useful comparison hiding here. **Paint protects by keeping water out; zinc protects by being eaten instead.** Those fail in completely different ways, and Level 3 shows why that difference decides which one you want.",
            options: [
                { id: 'cont', label: "A supply, not a seal. So how long does it last?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "One division, and it is the same shape as anything else that is spent at a steady rate.\n\n**years of protection = coating thickness / zinc lost each year**\n\nBoth in micrometres, so the µm cancel and the answer comes out in **years**.\n\nThe thickness is a choice. **Hot-dip galvanising** -- dipping the steel in molten zinc -- gives around **85 µm**, which is the standard figure for structural steel. A thin electroplated coating might be 20 µm; a heavy coating for buried pipe can be 200.\n\nThe rate is not a choice. It is set by where the thing lives, and the figures below come from **measurement**, not theory -- these are the numbers corrosion engineers look up:\n\n| Where it lives | Zinc lost each year |\n| --- | --- |\n| dry rural air | **0.5 µm** |\n| ordinary town air | **2 µm** |\n| heavy industry | **4 µm** |\n| marine splash | **8 µm** |\n\nThat is a **sixteen-fold** range from the gentlest place to the harshest, which matters more than almost any design decision you could make.\n\n**The condition:** this assumes the zinc goes at a steady rate, which is close to true once that grey layer has formed, and assumes the coating is intact to start with. It also assumes the zinc is actually touching the steel -- that is what makes the chemistry work at all.",
            options: [
                { id: 'cont', label: "Work one out.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**A galvanised crash barrier carries 85 µm of zinc. It stands beside a coastal road with salt spray. How long before the steel starts to rust?**\n\n1. **The stock:** 85 µm of zinc\n2. **The rate:** marine splash, **8 µm each year**\n3. **The life:** 85 µm / 8 µm per year = **10.6 years**\n\nSo about **eleven years**, and then it needs replacing or re-coating.\n\n**Now move the same barrier inland**, to dry rural air at 0.5 µm a year:\n\n85 / 0.5 = **170 years**\n\n**The same barrier. The same zinc. Sixteen times the life** -- eleven years against nearly two **centuries**. Nothing about the steel or the coating changed -- only the air around it.\n\nThat is worth sitting with, because it inverts how people usually think about durability. The barrier is not \"an 11-year barrier\" or \"a 170-year barrier\". **Its life is a property of the place, not of the product.**\n\n**Check it forwards:** if the coastal barrier really loses 8 µm a year, then after 5 years it should have 85 − 5 x 8 = **45 µm** left, which is about half. After 10 years, 5 µm -- almost nothing. ✓\n\nAnd that forward check is how inspectors actually work. They do not wait for rust; they **measure the remaining zinc** with a magnetic gauge and compare it with the rate for that location. Thickness now, divided by rate, gives the years left.",
            options: [
                { id: 'try', label: "Let me try one.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A bolt is electroplated with a thin **20 µm** of zinc and used on a bridge in **heavy industry**, where zinc goes at **4 µm each year**.\n\nHow long is it protected?",
            options: [
                { id: 'right', label: "5 years, from 20 µm divided by 4 µm each year — and the micrometres cancel, so the answer is in years.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'mult', label: "80 years, from 20 × 4.", nextNodeId: 'math_wrong' },
                { id: 'inv', label: "0.2 years, from 4 divided by 20.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Follow the units and both wrong answers rule themselves out.\n\n**Multiplying** gives µm x µm per year, which is micrometres squared per year -- an area changing with time, not a length of time. If an answer carries a unit the quantity cannot have, the operation is wrong.\n\n**Dividing the other way** gives µm per year ÷ µm = **per year**, which is a rate, not a duration. And sanity-check the size: 0.2 years is ten weeks, and electroplated bolts plainly last longer than that.\n\n**20 µm / 4 µm per year = 5 years.**\n\nAnd five years is a real and uncomfortable answer, which is the point of choosing this example. A thin electroplated coating is fine for a bolt in a dry cupboard and close to useless on a bridge. Compare the two coatings in the same harsh place:\n\n- **20 µm** electroplated: **5 years**\n- **85 µm** hot-dipped: **21 years**\n\nFour times the zinc buys four times the life, exactly -- because the relationship is simple proportion. There is no cleverness available here. **If you want twice the life in the same place, you need twice the zinc.**\n\nWhich is why specifying a coating is a genuine engineering decision with a cost attached, and why the thickness is written on the drawing rather than left to whoever does the dipping.",
            options: [
                { id: 'retry', label: "Thickness over rate, and the micrometres cancel.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "**Try the two dials.** **Coating Thickness** in µm and **Where It Lives** in µm lost each year.\n\n| Coating | rural, 0.5 | town, 2 | industry, 4 | marine, 8 |\n| --- | --- | --- | --- | --- |\n| 20 µm | 40 yr | 10 yr | **5 yr** | 2.5 yr |\n| 45 µm | 90 yr | 23 yr | 11 yr | 5.6 yr |\n| **85 µm** | **170 yr** | **42 yr** | 21 yr | **10.6 yr** |\n| 140 µm | 280 yr | 70 yr | 35 yr | 17.5 yr |\n| 200 µm | 400 yr | 100 yr | 50 yr | 25 yr |\n\nBoth dials act by simple proportion, and that is worth saying plainly because it is unusual. Double the coating, double the life. Halve the rate, double the life. **There is no sweet spot and no diminishing return** -- the table is just one number divided by another.\n\nSo the design question is not \"how do we make this last?\" but **\"how long does it need to last, and where?\"** Read the table the other way round and it answers that directly. A 30-year life in town needs about 60 µm; a 30-year life in marine splash needs 240 µm, which is more zinc than hot-dipping will give you, so you need a different answer altogether -- a different metal, or paint on top of the zinc, or planned replacement.\n\n**And there is a hole in all of this that the table cannot show.** Every row assumes the coating is **intact**. Real steel gets drilled, cut, welded and scratched on site, and every one of those leaves bare steel with no zinc on it at all.\n\nBy everything in this lesson, those bare patches should rust immediately. A scratch in **paint** does exactly that -- you have seen the rust streak running down from a chip on a car. But a scratch in **galvanising** does not rust, and a cut edge of galvanised sheet does not rust either.\n\nNothing you have learned here explains that, and it is the single most useful fact about zinc. Level 3 explains it.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "A scratch in zinc does not rust. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** Two identical steel posts are put up beside the same coastal road. One is painted with 85 µm of good paint; one is galvanised with 85 µm of zinc. Both are scratched to bare metal during installation.\n\nWhat happens to each, and why does the chemistry differ?",
            options: [
                { id: 'right', label: "The painted one rusts at the scratch, because paint only keeps water out and the scratch lets it in. The galvanised one does not, because the zinc is doing chemistry rather than blocking — it is still the more reactive metal even a short distance away.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Both rust at the scratch, since in both cases bare steel is now exposed to salt water and oxygen.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The painted post does exactly that, and you can see it on any chipped car: a rust streak spreading **under** the paint from the chip, lifting it as it goes. Paint's whole method is to keep water away, so a hole in the paint defeats it completely -- and worse, the rust then creeps sideways beneath a coating that is still perfectly intact everywhere else.\n\nThe galvanised post does not rust at the scratch, and that is the fact worth explaining.\n\nThe reason is in what the two coatings are **doing**. Paint is a **barrier** -- a wall. A wall with a hole in it is not a wall. Zinc is not a barrier; it is a **more reactive metal in contact with a less reactive one**, and that relationship does not stop at the edge of the scratch. The zinc beside the bare patch is still zinc, still more willing to give up electrons than the iron is.\n\nSo the bare steel sits there wet, with oxygen available, and does not corrode -- because the zinc next to it is corroding instead, and that is enough.\n\n**A barrier protects only what it covers. This protects what it is near.** That is a genuinely different kind of protection, and it is why galvanising is used on anything that will be cut or drilled on site.\n\nHow far \"near\" reaches, and why it works at all, needs the electron bookkeeping -- which is Level 3.",
            options: [
                { id: 'retry', label: "A barrier protects what it covers; this protects what it is near.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Exactly. Paint is a wall, and a wall with a hole in it is not a wall -- which is why a chipped car grows a rust streak **under** paint that is otherwise perfect. Zinc is not a wall at all; it is a more reactive metal in contact with a less reactive one, and that relationship does not stop at the edge of a scratch.\n\n**A barrier protects only what it covers. This protects what it is near.**\n\nSo you can now do what C23 only described:\n\n| | C23 said | L2C23 says |\n| --- | --- | --- |\n| Corrosion needs | water and ions | and a metal willing to give up **electrons** |\n| How to stop it | not asked | put a **more reactive** metal in contact |\n| Why zinc | not asked | it sits **above iron** in the reactivity series |\n| How long | not asked | **thickness / rate**, in years |\n| 85 µm by the sea | -- | **10.6 years**; inland, **170** |\n| So the life belongs to | -- | the **place**, not the product |",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Protection by being eaten instead!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found out how steel is actually protected.**\n\n- Metals differ in how readily they give up **electrons**, which is what the **reactivity series** orders them by\n- **Zinc sits above iron**, so where the two touch and water reaches them, the **zinc** corrodes and the iron does not\n- So the coating is **not a seal, it is a supply** -- it works by being used up on purpose\n- Zinc's own grey oxide layer slows it down, which is why it lasts decades rather than weeks, but weather and salt keep removing it so the zinc goes **steadily**\n- **years of protection = coating thickness / zinc lost each year**, and the µm cancel to leave years\n- **Hot-dip galvanising gives about 85 µm**; electroplating might give 20; heavy coatings reach 200\n- The rate is **measured, not derived**: **0.5 µm/yr** in dry rural air, 2 in town, 4 in industry, **8 µm/yr** in marine splash -- a **sixteen-fold** range\n- So 85 µm is **10.6 years** by the sea and **170 years** inland. **The life is a property of the place, not of the product**\n- Inspectors use the forward check: measure the zinc left with a magnetic gauge, divide by the rate for that location\n- Both dials act by **simple proportion** -- no sweet spot, no diminishing return -- so twice the life needs twice the zinc\n- Read backwards: 30 years in town needs about 60 µm; 30 years in marine splash needs 240 µm, which is more than hot-dipping gives, so that job needs a different answer entirely\n- Removed: C23's rust spreading with no account of how anyone prevents it\n- Still standing: every row above assumes the coating is **intact**, and real steel is drilled, cut and scratched. A scratch in **paint** rusts at once; a scratch in **galvanising** does not, and nothing here explains why. **A barrier protects what it covers; this protects what it is near** -- and Level 3 does the electron bookkeeping that makes that true, and finds how far \"near\" reaches",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Thickness over rate!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- How Do Materials Break and Recover?**\n\n**Summary Table:**\n| Idea | The Chemistry | The Number |\n| --- | --- | --- |\n| Reactivity is | how readily a metal gives up **electrons** | the reactivity series |\n| Zinc against iron | zinc is **above** it, so zinc goes first | the steel is out-competed |\n| The coating is | a **supply**, not a seal | used up on purpose |\n| Its own grey layer | slows the zinc down | decades instead of weeks |\n| The life | **thickness / rate** | µm over µm per year = years |\n| Hot-dip galvanising | -- | about **85 µm** |\n| The rate is measured | not derived | **0.5** rural to **8 µm/yr** marine |\n| So 85 µm lasts | -- | **170 yr** inland, **10.6 yr** by the sea |\n| Both dials | simple **proportion** | twice the life, twice the zinc |\n| Still standing | a **scratch** should rust, and does not | see Level 3 |\n\n**The one line to remember:** zinc protects steel not by sealing it but by being more reactive than it, so the coating is a supply that is deliberately spent -- and its life is thickness divided by a rate that belongs to the place rather than to the product.\n\n**Up next:** B23 closes the Big Idea, on the other half of its question. Physics and chemistry were both about **breaking**. Biology is about **recovering** -- and you will find that healing is decided by the same thing as the crack and the rust: not how much there is, but where the edge is."
        }
    };
}

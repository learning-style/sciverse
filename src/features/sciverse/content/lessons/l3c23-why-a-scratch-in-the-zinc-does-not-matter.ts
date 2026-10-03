import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 23, chemistry. Mechanism + Limit.
 *
 * L2C23 ended on an impossibility: galvanising protects steel it is not covering.
 * No barrier can do that, so zinc is not acting as a barrier.
 *
 * It is a galvanic cell. Zn2+/Zn sits at -0.76 V and Fe2+/Fe at -0.44 V, so with
 * the two metals in electrical contact and an electrolyte between them there is a
 * 0.32 V driving force that makes the zinc the anode:
 *
 *   at the zinc   Zn -> Zn2+ + 2e-
 *   at the steel  O2 + 2H2O + 4e- -> 4OH-
 *
 * The electrons the zinc releases arrive at the bare steel and are consumed there
 * by reducing oxygen -- so the iron has no reason to dissolve. The steel is not
 * sealed; it is held at a potential where corroding is not the favourable thing.
 *
 * Limit: the circuit needs ions, so the reach depends on the electrolyte. Roughly
 * 2 mm across a film of rain, about 50 mm in seawater. A wide enough bare patch
 * rusts in the middle however good the zinc at its edges.
 *
 * Still standing: the standard potentials are for clean metals at standard
 * conditions, and a real surface is covered in oxide and corrosion product.
 */
export function getL3C23Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2C23 ended on something that cannot be true of a coating.\n\nScratch through galvanising to bare steel, leave it in the rain, and the bare steel **does not rust**. Not slowly -- it stays clean while the zinc around it is consumed.\n\nStop and notice how strange that is, because it is the thing about galvanising that really does **matter**. **The coating is protecting metal it is not touching.** Paint cannot do that; a chip in paint rusts, and the rust creeps underneath. Grease cannot do it. Nothing that works by keeping water out can possibly protect a patch that water is sitting on.\n\nSo zinc is not keeping anything out. It is doing something else, and the clue is in what corrosion actually **is**.\n\nRusting is not iron being attacked from outside. It is iron **giving up electrons**:\n\n**Fe → Fe²⁺ + 2e⁻**\n\nThat is the whole of it -- iron atoms leaving the metal as ions and abandoning two electrons behind them. The rust you see is what those ions become later, after meeting oxygen and water. The damage was done at the moment the electrons left.\n\nAnd that reframes the problem completely. **To stop iron corroding, you do not have to keep anything away from it. You have to stop it losing electrons** -- or better, give it so many spare electrons that losing more is pointless.\n\nYour two dials are the two things that decide whether that works across a gap.\n\n- **Scratch Width**, in millimetres -- how much bare steel is exposed.\n- **What the Surface Is Wet With**, from a thin film of rain through to seawater.\n\nSo: if zinc is more reactive than iron, and the two are in electrical contact, which one gives up its electrons?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "The zinc — and if its electrons can reach the steel, the steel has no reason to give up any of its own.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "Both, independently — each metal corrodes at its own rate wherever it is wet.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "That is what happens if the two metals are **not** connected -- two separate pieces in two separate puddles, each corroding at its own rate. Put them in contact and it stops being two reactions.\n\nThe reason is that electrons are **free to move through metal**. That is what makes a metal a metal.\n\nSo the moment zinc and steel touch, there is only **one** pool of electrons, shared between them. And now ask which metal will give up its atoms into that shared pool. The one that gives up electrons more readily -- the more reactive one. **The zinc.**\n\nThe iron, meanwhile, finds itself sitting in a sea of electrons that the zinc is pumping in. For iron to corrode it would have to **release** electrons, and there is already a surplus. It has no reason to, and every reason not to.\n\nSo the two metals do not corrode independently. **They form one circuit, and the circuit has a winner and a loser.** The zinc loses on purpose.\n\nThis is a galvanic cell, exactly like a battery -- and it is the same mechanism that makes a battery work, running deliberately where you want it rather than inside a case. **You have built a battery whose job is to be slowly destroyed so that something else is not.**\n\nAnd a circuit is the key word, because a circuit can reach across a gap. That is what paint cannot do.",
            options: [
                { id: 'cont', label: "One circuit. So what drives it?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "A voltage you can look up, and two half-reactions that happen in different places.\n\nEvery metal has a **standard electrode potential** -- a measured number saying how readily it gives up electrons. The more negative, the more readily:\n\n| Half-reaction | Potential |\n| --- | --- |\n| Zn²⁺ + 2e⁻ ⇌ Zn | **−0.76 V** |\n| Fe²⁺ + 2e⁻ ⇌ Fe | **−0.44 V** |\n\nZinc is the more negative, so zinc is the one that goes. The difference is the **driving voltage**:\n\n−0.44 − (−0.76) = **0.32 V**\n\nSmall as voltages go -- a third of a torch battery -- and it does not need to be large. It only has to point the right way.\n\nNow the two halves, which happen **in different places**:\n\n**At the zinc, the anode:**   **Zn → Zn²⁺ + 2e⁻**\n\n**At the bare steel, the cathode:**   **O₂ + 2H₂O + 4e⁻ → 4OH⁻**\n\nRead the second one carefully, because it is the heart of the lesson. At the exposed steel, the reaction consuming those electrons is **oxygen being reduced** -- not iron dissolving. The oxygen and water that would have rusted the iron are being used up on electrons the **zinc** supplied.\n\nSo the bare steel is not protected by being covered. **It is protected by being the wrong electrode.** It has become the place where electrons are spent rather than released, and iron cannot corrode while that is true.\n\n**The condition:** the circuit needs both halves. Electrons travel through the **metal** -- which is why the zinc must be in electrical contact with the steel -- and ions must travel through the **water** to complete the loop. No water, no circuit; and as the next part shows, poor water means a short circuit.",
            options: [
                { id: 'cont', label: "How far can it reach?", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**As far as the water will carry ions, and no further.**\n\nThe electrons have an easy journey -- straight through the steel, which is an excellent conductor. The **ions** are the problem. They have to move through whatever is wetting the surface, and that is usually a poor conductor.\n\nSo the protection fades with distance from the zinc, and how fast depends entirely on what the surface is wet with. These figures are **from practice, not from theory** -- the rough reach that corrosion engineers work with:\n\n| Wet with | Bare steel protected, either side |\n| --- | --- |\n| a thin film of rain | about **2 mm** |\n| damp air | about **5 mm** |\n| fresh water | about **10 mm** |\n| **seawater** | about **50 mm** |\n\n**Seawater is twenty-five times better than rain**, and that is purely because it is full of dissolved ions -- the same salt that makes corrosion worse in the first place. **The thing that accelerates the attack also extends the defence.**\n\n**So work a case.** A **4 mm** scratch in galvanising, out in the rain:\n\n- The furthest point from zinc is the middle: **2 mm** from either edge\n- Rain reaches about **2 mm**\n- So the whole scratch is covered. **It does not rust** ✓\n\n**Now a 20 mm bare patch**, where a bracket was cut on site, in the same rain:\n\n- The middle is **10 mm** from the nearest zinc\n- Rain reaches about 2 mm\n- So a band around the edge is protected and **the middle rusts** ✗\n\nAnd this is exactly what you see on real galvanised steel. Small scratches, drill holes and cut edges stay clean for years -- those are the millimetre-scale gaps. Large bare areas rust in a ring pattern: clean at the rim, rusty in the centre.\n\n**The same patch in seawater would be protected all the way across**, because 10 mm is well inside 50.",
            options: [
                { id: 'try', label: "Let me try one.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A galvanised panel has a **30 mm** bare strip where it was ground. It is permanently splashed with **seawater**, which carries protection about **50 mm**.\n\nIs the bare strip protected?",
            options: [
                { id: 'right', label: "Yes — the furthest point is 15 mm from the nearest zinc, well inside the 50 mm reach.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'wrong', label: "No — 30 mm of bare steel is more than the zinc can cover at all.", nextNodeId: 'math_wrong' },
                { id: 'wrong2', label: "No, because seawater is the harshest environment and attacks the steel fastest.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**\"30 mm is more than 50 mm can cover\"** compares the wrong two lengths. The reach is measured **from the zinc inward**, and there is zinc on **both** sides of the strip. So the furthest any point is from help is **half** the width -- 15 mm, not 30. It is the same halving as two wound edges closing on each other, or an echo going down and coming back.\n\n**\"Seawater is the harshest, so it must be worse\"** is the genuinely interesting mistake, because the premise is true and the conclusion is backwards.\n\nSeawater **is** the harshest environment. It eats the zinc fastest -- L2C23 gave 8 µm a year against 0.5 in dry air, so the coating's life is sixteen times shorter. But the same dissolved ions that make it aggressive also make it a **good conductor**, so the protection it carries reaches **twenty-five times further**.\n\n**15 mm is inside 50 mm, so the strip is protected.** ✓\n\nSo seawater makes galvanising **shorter-lived and better at bridging gaps**, at the same time, for the same reason. Those are not in conflict -- they are two consequences of one fact about the electrolyte.\n\nAnd it leads to a conclusion you would never guess from L2C23's table: **a scratch is more dangerous in a mild environment than in a harsh one.** In dry air the zinc lasts for ever and barely reaches past its own edge; in seawater it is consumed quickly and protects everything near it. The place that is kind to the coating is unkind to the damage.",
            options: [
                { id: 'retry', label: "Half the width, and the harsh place reaches further.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "**Try the two dials.** **Scratch Width** in mm and **What the Surface Is Wet With**.\n\n| Bare width | rain, 2 mm | damp air, 5 mm | fresh water, 10 mm | seawater, 50 mm |\n| --- | --- | --- | --- | --- |\n| 1 mm | ✓ | ✓ | ✓ | ✓ |\n| **4 mm** | **✓** | ✓ | ✓ | ✓ |\n| 10 mm | ✗ | ✓ | ✓ | ✓ |\n| 30 mm | ✗ | ✗ | ✗ | **✓** |\n| 200 mm | ✗ | ✗ | ✗ | ✗ |\n\nThe bottom row is the honest limit. **No electrolyte carries protection 100 mm in from each side of a 200 mm patch**, so a large bare area rusts in the middle whatever it is wet with. Galvanising is superb at scratches, drill holes and cut edges, and it cannot rescue a panel that has lost its coating.\n\nAnd now put the two halves of this Big Idea's chemistry together, because they explain two different failures.\n\n**L2C23's failure is the coating running out.** 85 µm at 8 µm a year: in eleven years there is no zinc left anywhere, and everything rusts.\n\n**This lesson's failure is the coating being too far away.** The zinc is still there, still working, and the middle of a wide patch is simply out of reach.\n\nSo galvanised steel has **two clocks**, and they are set by different things. One counts the zinc down at a rate set by the environment. The other does not count at all -- it is a pass or fail decided by geometry the moment someone cuts the metal.\n\nWhich is why the practical rules are what they are: specify the coating thickness for the environment, and **re-coat anything you cut wider than a few millimetres on site**. The first rule is arithmetic; the second is this lesson.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Two clocks, set by different things. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A designer fastens a large **stainless steel** panel to a structure using **ordinary steel** bolts, because the bolts are cheaper and hidden. Stainless steel is far less reactive than ordinary steel.\n\nWhat happens, and what should they have done?",
            options: [
                { id: 'right', label: "The bolts corrode fast. The same galvanic circuit forms, but now the ordinary steel is the more reactive metal, so it becomes the anode — and a small anode feeding a huge cathode is attacked very quickly. The bolts should be the less reactive metal, not the panel.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Nothing much — stainless steel does not corrode, so it will protect the ordinary steel bolts the way zinc protects steel.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The circuit forms exactly as before. What has changed is **which way round it runs**, and that is decided by which metal is more reactive -- not by which one you care about.\n\nZinc protects steel because zinc is **above** it. Stainless steel is **below** ordinary steel: it gives up electrons far less readily. So in this pair the **ordinary steel is the anode**, and the ordinary steel is what you made the bolts out of.\n\nThen the areas make it far worse. The current flowing round the circuit is set largely by the **cathode's** area, because that is where oxygen is being reduced -- and here the cathode is an entire panel. All of that current has to leave through the anode, which is a few small bolts.\n\nSo you have concentrated the corrosion of a whole panel's worth of circuit into the surface of a handful of bolts. **A small anode and a large cathode is the worst possible arrangement**, and it eats the bolts in a fraction of the time they would have lasted on their own.\n\nThe rule that falls out is worth memorising, because it is the one people get wrong: **if two metals must touch, make the small part the less reactive one.** Stainless bolts in a steel panel are fine -- a large anode losing a little thickness everywhere. Steel bolts in a stainless panel are a failure waiting to happen.\n\nIt is the same physics that makes galvanising work, pointed the wrong way. **The zinc coating is a huge anode protecting a tiny scratch. These bolts are a tiny anode feeding a huge cathode.**",
            options: [
                { id: 'retry', label: "Make the small part the less reactive one.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Exactly. The circuit forms either way; what changed is **which way round it runs**. Stainless steel sits **below** ordinary steel, so here the ordinary steel is the anode -- and it is the bolts.\n\nThen the areas make it far worse. The current is set largely by the **cathode's** area, and the cathode is an entire panel; all of it has to leave through a few bolts. **A small anode and a large cathode is the worst possible arrangement.**\n\nSo: **if two metals must touch, make the small part the less reactive one.** Stainless bolts in a steel panel are fine. Steel bolts in a stainless panel will fail. It is galvanising's own physics pointed the wrong way -- a zinc coating is a **huge anode protecting a tiny scratch**, and these bolts are a **tiny anode feeding a huge cathode**.\n\nSo Level 3 has explained what L2C23 could only report:\n\n| | L2C23 said | L3C23 says |\n| --- | --- | --- |\n| Zinc protects steel | because it is more reactive | because they share **one pool of electrons** |\n| Corrosion is | rust appearing | iron **losing electrons**: Fe → Fe²⁺ + 2e⁻ |\n| At the bare steel | unexplained | **O₂ + 2H₂O + 4e⁻ → 4OH⁻**, not iron dissolving |\n| The driving force | -- | **0.32 V**, from −0.76 and −0.44 |\n| A scratch survives | mysteriously | it is the **wrong electrode**, not covered |\n| How far | not asked | **2 mm** in rain, **50 mm** in seawater |\n| So the harsh place | shortens the coating's life | and **extends** its reach |",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Protected by being the wrong electrode!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You explained a coating that protects metal it is not covering.**\n\n- No barrier can do that, so zinc is **not a barrier**. A chip in paint rusts; a scratch in zinc does not\n- Corrosion is iron **losing electrons** -- **Fe → Fe²⁺ + 2e⁻**. The rust is what the ions become later; the damage was done when the electrons left\n- So you do not have to keep anything away from iron. **You have to stop it losing electrons**\n- Electrons move freely through metal, so zinc touching steel makes **one shared pool**, not two reactions\n- **Standard electrode potentials:** Zn²⁺/Zn at **−0.76 V**, Fe²⁺/Fe at **−0.44 V**, so the driving voltage is **0.32 V** -- small, and pointing the right way\n- **At the zinc: Zn → Zn²⁺ + 2e⁻.** **At the bare steel: O₂ + 2H₂O + 4e⁻ → 4OH⁻** -- oxygen being reduced, *not* iron dissolving\n- So the scratch is **protected by being the wrong electrode**, not by being covered. It is a deliberate **galvanic cell**: a battery built to be destroyed so something else is not\n- The circuit needs **electrons through the metal and ions through the water**, so the reach depends on the electrolyte: about **2 mm** in a film of rain, 5 in damp air, 10 in fresh water, **50 mm in seawater**\n- The protected distance is measured **from each side**, so a 30 mm strip only needs 15 mm of reach\n- **Seawater eats the zinc sixteen times faster and carries protection twenty-five times further** -- one fact about the electrolyte, two opposite consequences\n- Which gives a conclusion L2C23 could not reach: **a scratch is more dangerous in a mild environment than in a harsh one**\n- And an honest limit: **no electrolyte bridges a 200 mm bare patch**, so galvanising rescues scratches and cut edges and cannot rescue a stripped panel\n- So galvanised steel has **two clocks**: one counting the zinc down at the environment's rate, one a pass-or-fail decided by geometry the moment someone cuts it\n- Point the same physics the wrong way and it destroys things: **a small anode feeding a large cathode**, like ordinary steel bolts in a stainless panel. **Make the small part the less reactive one**\n- Removed: L2C23's silence about the scratch\n- Still standing: those potentials are for **clean metals at standard conditions**, and a real surface is covered in oxide and corrosion product, which is why the reaches above are rules of thumb from practice rather than calculated numbers",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "One circuit, with a winner and a loser!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- How Do Materials Break and Recover?**\n\n**Summary Table:**\n| Idea | The Chemistry | The Number |\n| --- | --- | --- |\n| Corrosion is | iron **losing electrons** | Fe → Fe²⁺ + 2e⁻ |\n| Contact makes | **one** shared pool of electrons | not two reactions |\n| Which metal goes | the more negative potential | Zn **−0.76** vs Fe **−0.44** |\n| The driving voltage | -- | **0.32 V** |\n| At the zinc | **Zn → Zn²⁺ + 2e⁻** | the anode |\n| At the bare steel | **O₂ + 2H₂O + 4e⁻ → 4OH⁻** | the cathode: iron is spared |\n| So a scratch is | the **wrong electrode** | not covered at all |\n| The reach needs **ions** | so it depends on the water | **2 mm** rain, **50 mm** seawater |\n| Measured from each side | so halve the width | 30 mm needs 15 mm of reach |\n| The harsh place | shortens the life **and** extends the reach | 16x faster, 25x further |\n| Still standing | clean metals at standard conditions | real surfaces carry oxide |\n\n**The one line to remember:** zinc does not keep water off steel -- it shares its electrons with it, so the steel becomes the electrode where electrons are spent instead of released, and a scratch stays clean as long as ions can carry the circuit across it.\n\n**Up next:** B23 closes the Big Idea. Physics and chemistry were both about breaking; biology is about recovering -- and it turns out to need only one number, which L2B23 was calculating all along without naming it."
        }
    };
}

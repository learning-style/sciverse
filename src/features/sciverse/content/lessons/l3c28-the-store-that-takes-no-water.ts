import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 28, chemistry.
 *
 * L2C28 weighed the blood's sugar -- 0.9 g/L x 5 L = 4.5 g, less than a teaspoon --
 * against a 15 g slice, and showed the clearing must run DURING the meal because there
 * is no room to park anything. It then said what it had left out: where the sugar
 * actually goes is not counted there at all.
 *
 * It goes into the liver, about 100 g of it, and the question Level 3 can answer is why
 * it cannot stay as glucose. Osmotic pull is a COLLIGATIVE property: it counts dissolved
 * particles and is blind to what they weigh. 100 g of glucose is 0.556 mol, which in a
 * 1.5 L liver is 0.370 mol/L -- 123% of the 0.30 osmol/L a cell normally holds, adding
 * 9.4 atm of pull. Water would flood in and the cells would burst.
 *
 * Joining them fixes it without losing a gram. A glycogen chain is about 50,000 glucose
 * units, so the same 100 g is 1.1 x 10^-5 mol of particles: 0.0025% of normal, 0.0002
 * atm. Same mass, same energy, same glucose -- 50,000 times fewer things dissolved.
 *
 * The branching is the second structural fact, and it pays Big Idea 27 back: the branch
 * points are the alpha-1,6 links L3C27 showed amylase cannot cut, which is why the body
 * keeps a separate debranching enzyme, and why a branched store can be taken apart from
 * thousands of ends at once rather than unzipped from one.
 *
 * Conditions stated: the van 't Hoff relation holds for a dilute solution, and the
 * particle count rule holds for solutes that do not split -- salt gives two particles
 * per formula unit and pulls twice as hard per mole.
 *
 * Still standing: the liver holds only about 100 g, and surplus beyond that goes to fat,
 * which stores far more per gram and carries no water at all but cannot be turned back
 * into blood glucose. Glycogen granules are also not a true solution, which softens the
 * arithmetic without changing its direction.
 */
export function getL3C28Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2C28 weighed the sugar in your blood and found **less than a teaspoon**: 0.9 g in every litre, five litres, **4.5 g** in total. Then it put a slice of bread beside it -- **15 g** of glucose arriving over about half an hour -- and drew the only possible conclusion. **There is no room to park it.** The clearing has to run while the meal is still arriving.\n\nAnd then it said what it had not done. **Where the sugar actually goes was not counted there at all.**\n\nIt goes mostly into your **liver**, which holds about **100 g** of it -- twenty times what the blood can carry, and enough to keep your brain supplied overnight.\n\nSo here is the question this lesson is about, and it is odder than it looks.\n\nGlucose is the form every cell can burn. The liver has taken in 100 g of it. **Why does it not simply keep it as glucose**, dissolved and ready, instead of spending energy joining it into something else and spending more energy taking it apart again?\n\nYour dials are **Sugar Stored** and **Units Joined in a Chain**.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'water', label: "Something must go wrong with 100 g dissolved in one organ — dissolved things pull water after them, and that much would pull a great deal.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'ready', label: "There is no reason not to. Glucose is the usable form, so keeping it ready saves the body two lots of work.", nextNodeId: 'misconception' }
            ]
        },

        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "It would save the work. It would also **burst the cells**, and the arithmetic is quick.\n\nWater moves towards whichever side has **more dissolved particles in it**. That is **osmosis**, and the pull it generates is called the **osmotic pressure**. A cell sitting in blood is balanced: roughly **0.30 osmol/L** of dissolved odds and ends inside, the same outside, and no net flow either way.\n\nNow dissolve the store inside it. **100 g of glucose is 100 / 180 = 0.556 mol**, and a liver is about **1.5 L**:\n\n**0.556 mol / 1.5 L = 0.370 mol/L**\n\n| | |\n| --- | --- |\n| what a cell normally holds | 0.30 osmol/L |\n| what 100 g of dissolved glucose adds | **0.37 osmol/L** |\n| the inside, after | **0.67** against 0.30 outside |\n\n**The store alone is more than everything else in the cell put together.** Water would pour in across the membrane until the cell swelled and split.\n\nPut a number on the pull with the standard relation, which holds for a dilute solution:\n\n**osmotic pressure = concentration x R x T = 0.370 x 0.0821 x 310 = 9.4 atmospheres**\n\nNine atmospheres is the pressure a hundred metres down in the sea, applied to the inside of a liver cell. **So the sugar cannot stay as sugar**, and the reason has nothing to do with chemistry going wrong. It is simply that there is too much of it dissolved.",
            options: [
                { id: 'cont', label: "Then what can be done about it?", nextNodeId: 'defining' }
            ]
        },

        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "**One thing, and it is the whole lesson.**\n\nOsmotic pull is what chemists call a **colligative** property: it depends on **how many particles are dissolved** and **not at all on what they are or what they weigh.**\n\nRead that twice, because it is counter-intuitive. One mole of glucose, molar mass 180, and one mole of a protein a thousand times heavier pull **exactly the same**. The water is counting, not weighing.\n\nThe condition: this holds for solutes that **do not split up**. Glucose does not. **Salt does** -- one formula unit of NaCl becomes two ions, so a mole of salt pulls twice as hard as a mole of glucose, and that is the only correction the rule needs.\n\nNow look at what that permits.\n\n**You cannot reduce the mass.** 100 g of stored sugar has to stay 100 g of stored sugar, or you have thrown away the energy you were storing.\n\n**But you can reduce the count**, and there is one way to do it: **join the molecules together.** Two glucose units bonded into one molecule are **one** dissolved particle instead of two. The mass has not moved. The count has halved.\n\nThat is exactly what the liver does. It builds **glycogen**: glucose units joined into chains, and a liver chain runs to about **50,000 units**.\n\n| | Mass stored | Particles dissolved |\n| --- | --- | --- |\n| as free glucose | 100 g | **0.556 mol** |\n| joined in pairs | 100 g | 0.278 mol |\n| joined in tens | 100 g | 0.0556 mol |\n| as glycogen, 50,000 to a chain | **100 g** | **0.0000111 mol** |\n\n**Same mass in every row.** The last one has **fifty thousand times** fewer dissolved things in it.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'network' } },
            options: [
                { id: 'work', label: "What does that do to the pull?", nextNodeId: 'worked' }
            ]
        },

        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**It divides it by fifty thousand, because the pull follows the count exactly.**\n\nRun the same two steps on the last row. Particles: **0.0000111 mol**. Liver: **1.5 L**.\n\n1. **Concentration:** 0.0000111 / 1.5 = **0.0000074 mol/L**\n2. **As a share of the cell's normal 0.30:** 0.0000074 / 0.30 = **0.0025%**\n3. **Osmotic pressure:** 0.0000074 x 0.0821 x 310 = **0.0002 atmospheres**\n\n| | Share of the cell's normal load | Pull added |\n| --- | --- | --- |\n| 100 g as **free glucose** | **123%** | 9.4 atm |\n| joined in pairs | 62% | 4.7 atm |\n| joined in tens | 12% | 0.94 atm |\n| joined in fifties | 2% | 0.19 atm |\n| **as glycogen** | **0.0025%** | **0.0002 atm** |\n\n**The top row would kill the cell and the bottom row is undetectable, and they hold exactly the same amount of sugar.**\n\nSo the answer to *why not keep it as glucose* is now a sentence. **A store has to be invisible to water, and the only property of a solute that water notices is how many separate pieces there are.** Joining is the one move that changes the count without changing the mass.\n\nAnd it explains something about every storage molecule in biology, not just this one. **Starch** in a potato, **glycogen** in your liver -- both are glucose, both are polymers, and both are polymers for this reason before any other. A plant that stored its sugar loose would burst too.\n\n**One more consequence, and it is the one you can feel.** Glycogen carries about **3 g of water** with it for every gram of glycogen -- not osmotically, but held against the chains. That is why the first two or three pounds lost on a low-carbohydrate diet come off in a couple of days and come straight back: **it is the water that leaves with the emptied store**, not fat.",
            options: [
                { id: 'check', label: "Let me test the counting.", nextNodeId: 'math_check' }
            ]
        },

        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "A liver cell holds its 100 g of sugar as **free glucose**, and the pull is 9.4 atmospheres.\n\nNow join every glucose into a **pair** -- nothing else changes, and the mass is still 100 g.\n\nWhat happens to the osmotic pull?",
            options: [
                { id: 'half', label: "It halves, to about 4.7 atmospheres — there are half as many dissolved particles, and the pull counts particles", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'same', label: "It stays at 9.4 — the same 100 g of sugar is dissolved either way, so the solution is just as concentrated", nextNodeId: 'math_wrong' },
                { id: 'double', label: "It doubles, because each particle is now twice as heavy and pulls twice as hard", nextNodeId: 'math_wrong' }
            ]
        },

        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Both wrong answers are reaching for **mass**, and mass is the one thing the water cannot see.\n\n**Concentration here is measured in moles per litre, not grams per litre.** That is not a technicality -- it is the entire point. Going from 0.556 mol of singles to 0.278 mol of pairs halves the moles while the grams sit still:\n\n| | grams | moles | pull |\n| --- | --- | --- | --- |\n| free glucose | 100 | 0.556 | **9.4 atm** |\n| joined in pairs | **100** | **0.278** | **4.7 atm** |\n\n*Twice as heavy so it pulls twice as hard* is the most natural guess and it is backwards. **A heavy particle and a light particle pull identically**, which is why osmotic pressure is used in the laboratory to measure the molar mass of large molecules: dissolve a known mass, measure the pull, and the pull tells you how many particles that mass came to.\n\nAnd *the solution is just as concentrated* is true if you mean grams per litre and false if you mean what the water responds to. **100 g/L of glucose and 100 g/L of glycogen are both 100 g/L**, and one of them bursts the cell while the other does nothing at all.\n\nThat is as clear a demonstration as chemistry offers that **a property can depend on a count and nothing else.**",
            options: [
                { id: 'retry', label: "Half the particles, half the pull.", nextNodeId: 'explore' }
            ]
        },

        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "The picture is one liver cell. The sugar inside is drawn as pieces whose **total area is the mass** -- so the area changes only when you change **Sugar Stored**. The **number** of blobs is the number of dissolved particles, and that is what the water outside is counting.\n\nThings worth doing:\n\n- Start at **100 g** with the chain at **1**, which is free glucose. The cell is full of separate pieces, the water arrows pour in, and the cell is in trouble\n- Now move **Units Joined in a Chain** to 2, then 5, then 10. **Watch the coloured area stay exactly the same** while the number of pieces falls -- one piece, then another gone, and the colour never moves. The arrows thin out in step with the count, not with the area\n- Keep going to **50,000**, which is real glycogen. **One piece.** **The same 100 g of sugar, and no water follows it at all**\n- Now go back to chain 1 and take **Sugar Stored** down instead, to find how little loose glucose a cell could tolerate. It is a few grams -- which is roughly what a cell actually holds, and about what your whole blood supply carries\n- Finally set the chain to 50,000 and run the sugar up to **200 g**. Still nothing. **The store can be made as large as you like, provided it is joined up**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Checkpoint", nextNodeId: 'checkpoint' }
            ]
        },

        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "One chain of 50,000 would solve the water problem perfectly. Real glycogen is **not** one long chain -- it is heavily **branched**, with a side chain starting every ten or twelve units.\n\nBranching costs extra enzymes to build and an extra enzyme to take apart. **L3C27** met those branch points already: they are **α-1,6** links, the sideways joins that amylase cannot cut at any dose.\n\nSo why pay for branches?",
            options: [
                { id: 'ends', label: "Because a branched molecule has thousands of loose ends, and glucose can be taken off all of them at once — a single chain could only be unzipped from one end.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'water', label: "Because branching lowers the osmotic pull further still, beyond what simple joining achieves.", nextNodeId: 'checkpoint_wrong' },
                { id: 'strong', label: "Because branches make the molecule physically stronger, so the store does not fall apart on its own.", nextNodeId: 'checkpoint_wrong' }
            ]
        },

        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Branching does **nothing** for the water. One branched molecule and one straight molecule of the same mass are both **one particle**, and the count is all the water sees. That problem was solved the moment the units were joined at all.\n\nWhat branching buys is **speed**, and the reason is a matter of where an enzyme can work.\n\nAn enzyme that removes glucose works at a chain's **end**. A single straight chain of 50,000 units has **one** usable end, so the store could only be unwound one unit at a time from one place -- hopeless when a sprint or a fright wants glucose in seconds.\n\nBranch it every ten or twelve units and a molecule of 50,000 units carries **thousands of ends**, every one of them being worked at the same moment.\n\n| | one straight chain | branched |\n| --- | --- | --- |\n| particles, so water pulled | **1** | **1** |\n| ends an enzyme can start at | **1** | **thousands** |\n| how fast it can be released | hopeless | **seconds** |\n\n**So the two features solve two different problems**, and it is worth separating them: **joining** makes the store invisible to water, **branching** makes it available in a hurry. A store you cannot spend quickly is not much of a store.\n\nAnd this is where Big Idea 27 is repaid. The branch points are **α-1,6** links, exactly the ones L3C27 showed a starch-cutting enzyme simply cannot open -- so your liver keeps a **separate enzyme** whose only job is those joins. **A different shape of bond needs a different shaped pocket**, there as here.",
            options: [
                { id: 'retry', label: "Branches are ends to work from.", nextNodeId: 'checkpoint_correct' }
            ]
        },

        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "**Two problems, two features, and neither solves the other.**\n\n| | what it fixes |\n| --- | --- |\n| **joining** into chains | the store becomes **invisible to water** |\n| **branching** the chains | the store becomes **spendable in seconds** |\n\nAnd the branch points being **α-1,6** is the detail that pays Big Idea 27 back: those are the sideways joins L3C27 showed amylase cannot touch, which is why the liver keeps a separate enzyme for them alone.\n\n**Now put this beside L3P28.** The physics lesson found a heart whose two factors were not independent: beating faster bought more beats by making each one emptier. This is the same shape in a different material. **Storing more sugar buys capacity by dragging in water** -- unless you change the count, which is the one move that breaks the link.\n\n| | the thing you want more of | what it drags with it | how the body breaks the link |\n| --- | --- | --- | --- |\n| **P28** | beats per minute | less filling in each | nothing can: there is a best rate |\n| **C28** | grams stored | water across the membrane | **join them up**: the count falls, the mass does not |\n\n**The simplification still standing**, and it is a real limit: **the liver holds only about 100 g.** Fill it and the surplus goes to **fat**, which stores more than twice the energy per gram and carries **no water at all** -- a better store on both counts, except for the one that matters here. **Fat cannot be turned back into blood glucose.** So the body keeps a small, fast, reversible store and a large, slow, one-way one, and this lesson has only explained the small one.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "The water is counting, not weighing!", nextNodeId: 'discovery' }
            ]
        },

        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found out where L2C28's missing sugar goes, and why it cannot stay as sugar.**\n\n- **It goes to the liver**, about **100 g** of it -- twenty times what the blood can hold, and enough to supply your brain overnight\n- **Water moves towards whichever side has more dissolved particles**, which is **osmosis**, and the pull is the **osmotic pressure**. A cell is balanced at about **0.30 osmol/L** inside and out\n- **100 g of glucose is 0.556 mol**, and in a **1.5 L** liver that is **0.370 mol/L** -- **123% of everything else in the cell put together**, adding **9.4 atmospheres**, the pressure a hundred metres down in the sea. The cells would burst\n- **Osmotic pull is colligative**: it counts **particles** and is blind to what they are or weigh. A mole of glucose and a mole of a protein a thousand times heavier pull **identically**\n- **Condition:** this is for solutes that do not split. **Salt does** -- one NaCl gives two ions, so a mole of salt pulls twice as hard as a mole of glucose\n- **So the mass cannot be reduced** without throwing away the energy, **but the count can** -- and there is exactly one way to do it: **join the molecules together**. Two glucose units bonded are **one** particle instead of two\n- **That is glycogen**: glucose joined into chains of about **50,000**. Same 100 g, **0.0000111 mol** of particles, **0.0025%** of the cell's normal load, **0.0002 atm**. The top row of that table would kill the cell and the bottom row is undetectable\n- **Which is why every storage molecule in biology is a polymer.** Starch in a potato, glycogen in your liver -- both glucose, both polymers, and both polymers for this reason before any other\n- **And why the first pounds off a low-carbohydrate diet return.** Glycogen holds about **3 g of water** per gram; emptying the store releases the water with it\n- **Branching solves a second and unrelated problem.** One branched molecule and one straight one are both **one particle**, so it does nothing for the water. An enzyme works at a chain's **end**, and a straight 50,000-unit chain has **one**. Branch it every ten or twelve units and there are **thousands**, all being worked at once. **Joining makes the store invisible; branching makes it spendable**\n- **The branch points are α-1,6 links**, the sideways joins L3C27 showed amylase cannot cut -- so the liver keeps a separate enzyme for them alone\n- **Still standing:** the liver holds only about 100 g, and the surplus goes to **fat**, which stores more per gram and carries no water but **cannot be turned back into blood glucose**. And glycogen granules are not truly a solution, which softens the arithmetic without changing its direction.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "On to the biology", nextNodeId: 'complete' }
            ]
        },

        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Chemistry Complete -- How Do Body Systems Work Together?**\n\nThe water is counting, not weighing.\n\n**Summary Table:**\n| | L2C28 said | L3C28 says |\n| --- | --- | --- |\n| Sugar in the blood | 0.9 g/L x 5 L = **4.5 g** | unchanged |\n| Where the surplus goes | **not counted** | the **liver**, about **100 g** |\n| Why not keep it as glucose | -- | 0.556 mol in 1.5 L is **0.370 mol/L** |\n| What that would do | -- | **123%** of the cell's normal load, **9.4 atm** |\n| What water responds to | -- | the **count** of particles, not the mass |\n| The one move available | -- | **join them**: the count falls, the mass does not |\n| As glycogen | -- | **0.0025%** of normal, **0.0002 atm** |\n| Why branched | -- | an enzyme works at an **end**; branches give thousands |\n| What branching does for water | -- | **nothing**: one molecule is one particle |\n| The limit | -- | the liver holds **100 g**; the rest goes to **fat**, one-way |\n\n**What ties it to the physics:** L3P28 found two factors that were not independent -- beating faster made each beat emptier. Storing sugar has the same shape: more grams drags in more water. The difference is that chemistry has a move the heart does not. **Changing the count breaks the link, and the mass never notices.**\n\n**The one line to remember:** osmotic pull counts dissolved particles and ignores their mass, so joining 50,000 glucose molecules into one chain stores exactly the same sugar while pulling fifty thousand times less water -- and branching that chain, at the same α-1,6 joins amylase cannot cut, is what makes the store spendable in seconds rather than in weeks.\n\n**Up next:** B28 -- the litres have to come from somewhere."
        }
    };
}

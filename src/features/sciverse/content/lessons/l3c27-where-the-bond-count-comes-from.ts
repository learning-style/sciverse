import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 27, chemistry. Mechanism + Limit.
 *
 * L2C27 built its whole lesson on one figure it openly looked up: about 5.6 x 10^22
 * bonds in a slice of bread's starch. Its own closing line said so and handed the job
 * here. This lesson works it out, and the working is three steps:
 *
 *   180 - 18 = 162 g per mole   (a glucose unit in a chain has lost one water)
 *   15 g / 162 = 0.093 mol
 *   0.093 x 6.02 x 10^23 = 5.6 x 10^22
 *
 * The middle of those is the mechanism and the reason the lesson is worth having. Join
 * two glucose molecules and one water leaves, so a unit INSIDE a chain weighs 162 and
 * not glucose's 180 -- and 162.14/180.16 = 0.9000 exactly, so using free glucose gives
 * an answer precisely 10% low. The missing tenth IS the water. The bond count and the
 * molar mass are the same fact.
 *
 * The mole itself is L3C2's and is used here as a tool, not taught.
 *
 * The Limit is that not every bond is the same bond. Amylase cuts alpha-1,4 joins along
 * the chain and cannot touch the alpha-1,6 joins at a branch point; with about three
 * quarters of starch branched and a branch every 25 units, that is 3% of all the bonds,
 * or 1.7 x 10^21 of them, which no amount of amylase will ever cut. So L2C27's "3 mg
 * finishes it in 29 minutes" is right about 97% of the job and silent about the rest,
 * which needs different enzymes fixed to the gut wall.
 *
 * Frames stated: every count is for the starch in one slice of bread, and every bond
 * counted is a join between two glucose units.
 *
 * Still standing: bonds = units - 1 per chain, so the count is high by one bond per
 * chain -- 0.1% for chains of a thousand units, which is why it was ignored. The 15 g
 * and the branch spacing are both typical figures. And nothing here says how anybody
 * measured Avogadro's number, which is L3C2's business.
 */
export function getL3C27Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2C27 was honest about its weak point. It counted the bonds in a slice of bread -- about **5.6 x 10²²** of them -- and said plainly that the figure was **looked up**, because working it out needs a way of counting atoms. Its last line handed the job here.\n\nSo let us go and get it, because it turns out to take three steps and the middle one is interesting.\n\nYou know what starch is from L2C27: long chains of **glucose** units joined end to end, with one bond per join. And you know how to count things that small from **L3C2**: a **mole** is 6.02 x 10²³ of anything, and the mass of one mole in grams is the substance's **molar mass**.\n\nSo the plan is obvious. Take the mass of starch, divide by the molar mass of a glucose unit, and multiply by 6.02 x 10²³.\n\nAbout **15 grams** of a slice of bread is starch. And glucose, you can look up, has a molar mass of **180 g/mol**.\n\nYour two dials are **Starch** in grams, and **Branch Spacing** -- which the lesson will come to, and which is where the answer stops being simple.\n\nBefore any arithmetic, one question, and it is the whole lesson. **Is 180 the right number to divide by?**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'no', label: "No — a unit joined into a chain is not a whole glucose molecule any more.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'yes', label: "Yes — starch is made of glucose, so each unit weighs what glucose weighs.", nextNodeId: 'misconception' }
            ]
        },

        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Starch **is** made of glucose, and that is exactly the trap -- because of what happens at the moment of joining.\n\nWhen two glucose molecules bond together, they do not simply stick. **One —OH from each unit meets, and a whole water molecule leaves.** That is what forms the join: a shared oxygen bridging the two rings, with H₂O released.\n\nSo a glucose unit sitting **inside** a chain is lighter than a free glucose molecule, by one water:\n\n| | g/mol |\n| --- | --- |\n| free glucose | **180** |\n| one water | **− 18** |\n| **a unit in a chain** | **162** |\n\nAnd now look at the ratio of those two numbers, because it is remarkably clean:\n\n**162 / 180 = 0.900**\n\n**Exactly nine tenths.** So dividing by 180 instead of 162 does not introduce some awkward error -- it gives an answer that is **precisely 10% low**, every time, whatever the mass. And the missing tenth is not a rounding slip or a measurement problem. **The missing tenth is the water.**\n\nThat is worth sitting with for a moment. **The bond count and the molar mass are the same fact.** Every join that exists is a water that left, so the chain is lighter in exact proportion to how many bonds it contains. You could count the bonds by weighing the water if you collected it.",
            options: [
                { id: 'cont', label: "So divide by 162.", nextNodeId: 'defining' }
            ]
        },

        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "**162 g/mol it is**, and the reason is worth stating as a rule, because it is true of every chain in biology: **joining releases water, so a unit in a chain always weighs less than the free molecule it came from.** Proteins do it, and so does DNA -- deoxyribonucleic acid, the molecule that carries inherited instructions.\n\nNow run the three steps.\n\n**Step one, the molar mass of a unit in a chain:**\n\n180 − 18 = **162 g per mole**\n\n**Step two, how many moles of units are in the slice:**\n\n15 g / 162 g per mole = **0.093 mol**\n\n**Step three, how many units that is:**\n\n0.093 mol x 6.02 x 10²³ per mole = **5.6 x 10²² units**\n\nAnd in a long chain there is **one bond per unit**, so that is the count:\n\n**about 5.6 x 10²² bonds** -- which is the figure L2C27 was handed.\n\n**Check the units as you go**, because they check themselves. Grams divided by grams per mole leaves **moles**; moles multiplied by per mole leaves a plain **number**. If either had come out wrong you would know a step was upside down.\n\nThis holds while **the chains are long**. In a chain of n units there are n − 1 bonds, not n, because the last unit has nothing after it -- so the count is high by one bond per chain. Starch chains run to thousands of units, which makes that error about **0.1%**, and it is why we can say *one bond per unit* and move on.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'network' } },
            options: [
                { id: 'work', label: "So the figure checks out. What is the Branch Spacing dial for?", nextNodeId: 'worked' }
            ]
        },

        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**For the thing L2C27 could not know it was assuming.** It treated all 5.6 x 10²² bonds as the same bond, cuttable by the same enzyme. They are not.\n\nStarch is not one long straight chain. About three quarters of it is the **branched** kind, where every so often a side chain sprouts off the middle of the main one. And the join at a branch point is **geometrically different** from the joins along the chain:\n\n| | the join | where |\n| --- | --- | --- |\n| along the chain | **α-1,4** | end of one unit to the middle of the next |\n| at a branch | **α-1,6** | end of one unit to the *side* of another |\n\nThose names just record which carbon atom is used -- position 4 along the chain, position 6 out to the side.\n\n**And amylase cuts only α-1,4.** An enzyme grips its target by shape, so a join pointing out sideways simply does not fit the slot that was built for a join pointing along. The α-1,6 bonds are **invisible to amylase**, however much of it there is and however long you wait.\n\nSo how many bonds is that? With a branch about every **25 units** in the branched three quarters:\n\nshare that are α-1,6 = 0.75 / 25 = **3%**\n\n3% of 5.6 x 10²² = **about 1.7 x 10²¹ bonds**\n\n**Seventeen hundred million million million joins that amylase will never touch.** Which puts L2C27's cheerful result in its place: 3 mg of amylase in 29 minutes gets through **97%** of the job and then stops dead, with every branch point still intact and the glucose still locked behind it.\n\nFinishing needs a **different enzyme** -- one shaped for α-1,6, and in you it is fixed to the wall of the gut rather than floating free. **The last 3% is a different problem, solved somewhere else.**",
            options: [
                { id: 'check', label: "Let me try one.", nextNodeId: 'math_check' }
            ]
        },

        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "Your turn, and it is the error worth being able to spot.\n\nSomebody does the whole calculation carefully for a **15 g** slice, but divides by glucose's **180 g/mol** instead of 162.\n\nWhat do they get, and how wrong is it?",
            options: [
                { id: 'ten', label: "5.0 x 10²² — exactly 10% low, because 162/180 is exactly 0.9", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'high', label: "6.2 x 10²² — about 10% high, since they divided by a bigger number", nextNodeId: 'math_wrong' },
                { id: 'tiny', label: "Almost exactly right — an 18 out of 180 difference is negligible at this scale", nextNodeId: 'math_wrong' }
            ]
        },

        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Dividing by a **bigger** number gives a **smaller** answer, so the mistake makes the count too **low**:\n\n15 / 180 = 0.0833 mol, and 0.0833 x 6.02 x 10²³ = **5.0 x 10²²**\n\nagainst the correct 5.6 x 10²². And the size of the error is fixed, not approximate:\n\n**162 / 180 = 0.900 exactly**, so the wrong answer is always **90%** of the right one -- 10% low for a 15 g slice, 10% low for a 40 g serving, 10% low for a tonne.\n\nThe *negligible* answer is the one to argue with hardest, because 18 out of 180 **looks** small and is not. **One part in ten is not a rounding error** -- it is the difference between 5.0 and 5.6, and at Level 2 it would have moved the finishing time from 29 minutes to 26. More importantly it would be wrong for a **reason**, and the reason is a real chemical event: a water molecule left when the bond formed.\n\n**That is why this is worth more than the number.** A 10% discrepancy that will not go away is usually telling you that a step in the chemistry has been skipped, and here it names the step exactly. **Getting 90% of the right answer means you forgot the water.**",
            options: [
                { id: 'retry', label: "Exactly 10% low, and the 10% is the water.", nextNodeId: 'explore' }
            ]
        },

        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Both dials are live. The slice of bread sets how much starch there is, and beside it a stretch of the chain is drawn large -- glucose units in a row, the **α-1,4** joins along it that amylase cuts, and the **α-1,6** branch points it cannot.\n\nThings worth doing:\n\n- Start at **15 g** and a branch every **25** units: **5.6 x 10²² bonds**, and 3% of them -- 1.7 x 10²¹ -- stuck behind branch points\n- Change the **Starch** dial and watch the count move in exact proportion. Double the bread, double the bonds. There is nothing subtle in that step; it is a division and a multiplication\n- Now work the **Branch Spacing** dial, which is the interesting one. A branch every **40** units leaves only **1.9%** of the joins stuck. Every **15** units leaves **5%**. **The more branched the starch, the more of it amylase has to leave behind**\n- And notice what the spacing does **not** change: the total bond count. Branching rearranges which joins are which; it does not add or remove joins. **One dial sets how many, the other sets how many are the wrong kind**\n- Watch the drawn chain as you move the spacing. The branches crowd together or spread apart, and the crossed-out joins are the ones no amount of amylase will ever cut",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Checkpoint", nextNodeId: 'checkpoint' }
            ]
        },

        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "A classmate proposes a fix for the 3% that amylase cannot cut.\n\n*The branch points are only 3% of the bonds. So just make more amylase -- ten times as much, a hundred times. Eventually it will get through them.*\n\nWhat is wrong with that?",
            options: [
                { id: 'shape', label: "Nothing will get through: amylase cannot cut an α-1,6 bond at all, and no amount of an enzyme that does not fit will ever fit.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'slow', label: "It would work but take far too long to be useful.", nextNodeId: 'checkpoint_wrong' },
                { id: 'small', label: "Nothing is wrong — 3% is small enough to ignore.", nextNodeId: 'checkpoint_wrong' }
            ]
        },

        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Look at **where the 3% sits in the arithmetic**, because that decides which kind of problem it is.\n\nL2C27's formula was *time = bonds / (cutters x cuts per second)*. More amylase increases the cutters, which shortens the **time**. That works beautifully for a bond amylase can cut -- it is why 3 mg beats one molecule by a factor of 10¹⁶.\n\nBut an α-1,6 bond is not a slow job for amylase. It is **not a job for amylase at all.** The rate is **zero**, and zero multiplied by any number of molecules is still zero. **A thousand tonnes of amylase would leave every branch point exactly as it found it.**\n\nThat is the difference between the two kinds of limit this Big Idea has met, and it is worth naming:\n\n| | | |\n| --- | --- | --- |\n| **not enough** | more of it helps | L2C27's cutters |\n| **not able** | more of it changes nothing | α-1,6 and amylase |\n\n*Too long to be useful* is the first kind of answer applied to the second kind of problem. And *3% is small enough to ignore* is a judgement no digestive system agrees with -- 3% of a day's starch is a real amount of food, and your body builds a separate enzyme for it rather than wasting it. **An enzyme is a shape, not an effort**, which is why the solution is a different enzyme and never more of this one.",
            options: [
                { id: 'retry', label: "Zero times anything is zero.", nextNodeId: 'checkpoint_correct' }
            ]
        },

        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "**And that is the figure L2C27 was leaning on, now standing on its own feet -- and smaller than it looked.**\n\nWhat changed across this lesson:\n\n| | L2C27 | L3C27 |\n| --- | --- | --- |\n| 5.6 x 10²² bonds | looked up | **worked out** from 15 g, 162 g/mol and a mole |\n| why 162 | -- | joining **releases a water**, so 162/180 = 0.900 exactly |\n| all bonds alike | assumed | **3%** are α-1,6 and amylase cannot touch them |\n| 3 mg finishes it | in 29 minutes | **97%** of it in 29 minutes, then stops |\n\nAnd the two halves of the lesson turn out to be the same idea seen twice. **The bond count and the molar mass are the same fact**, because every join is a water that left. **And the bond count and the bond *type* are different facts**, because the arithmetic of how many says nothing about which kind.\n\nSo L2C27's result survives, with its scope corrected. It was never a statement about digesting a slice of bread. **It was a statement about digesting the 97% of a slice of bread that is joined the ordinary way** -- which is most of it, and which is why the figure was useful enough to build a lesson on.\n\nWhich leaves the obvious question for the biology. If 3% of the bonds need a different enzyme, and that enzyme is fixed to the wall of the gut rather than floating in the fluid, then the food has to physically **reach the wall** to be finished. **L3B27 asks what that costs.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "An enzyme is a shape, not an effort!", nextNodeId: 'discovery' }
            ]
        },

        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You derived the number the whole Big Idea was built on.**\n\n- L2C27 looked up **5.6 x 10²²** bonds and said so. Working it out takes **three steps** and a mole from **L3C2**\n- **Step one is where the chemistry happens.** Joining two glucose molecules releases **one water** -- a shared oxygen bridges the rings and H₂O leaves -- so a unit **inside** a chain weighs **180 − 18 = 162 g/mol**, not glucose's 180\n- **162 / 180 = 0.900 exactly**, so using free glucose gives an answer **precisely 10% low**, at any mass. **The missing tenth is the water**\n- Which makes **the bond count and the molar mass the same fact**: every join that exists is a water that left, so the chain is lighter in exact proportion to the bonds it holds\n- **Step two:** 15 g / 162 g per mole = **0.093 mol**. **Step three:** 0.093 x 6.02 x 10²³ = **5.6 x 10²² units**, and one bond per unit in a long chain. The units check themselves -- grams over grams per mole leaves moles, and moles times per mole leaves a plain number\n- **Joining always releases water**, so a unit in a chain always weighs less than the free molecule. True of proteins and of **DNA** -- deoxyribonucleic acid -- as well as starch\n- **Then the limit L2C27 could not know it was assuming: not every bond is the same bond.** Along the chain the joins are **α-1,4**; at a branch point they are **α-1,6**, out to the side. **Amylase cuts only α-1,4**, because an enzyme grips by shape and a sideways join does not fit a slot built for a lengthways one\n- With three quarters of starch branched and a branch every 25 units, α-1,6 is **0.75/25 = 3%** of all bonds -- about **1.7 x 10²¹** joins amylase will never touch\n- So **3 mg of amylase finishes 97% of the slice in 29 minutes and then stops dead.** L2C27's result was never about digesting bread; it was about digesting the 97% of bread joined the ordinary way\n- **The two kinds of limit are worth keeping apart.** *Not enough* is fixed by more of it -- that was L2C27's whole point about cutters. *Not able* is fixed by nothing: the rate is **zero**, and zero times any number of molecules is zero. **A thousand tonnes of amylase leaves every branch point as it found it**\n- **An enzyme is a shape, not an effort**, so the answer is a different enzyme -- one built for α-1,6, and in you it is **fixed to the gut wall** rather than floating free\n- **Still standing:** bonds = units − 1 per chain, so the count is high by one bond per chain -- **0.1%** for chains of a thousand units, which is why *one bond per unit* was fair. The 15 g and the branch spacing are typical rather than exact. And nothing here says how anybody **measured** 6.02 x 10²³, which is L3C2's business. **And if the last 3% needs an enzyme bolted to the wall, the food has to get to the wall -- L3B27.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Complete L3C27", nextNodeId: 'complete' }
            ]
        },

        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Chemistry Complete -- How Does Food Become Usable Energy?**\n\nL2C27 built a lesson on a number it had looked up. This one earns it, and then finds what it was hiding.\n\n**Summary Table:**\n| | L2C27 said | L3C27 says |\n| --- | --- | --- |\n| The bond count | **looked up**: 5.6 x 10²² | **worked out** in three steps |\n| The mass of a unit | -- | **162 g/mol**, not glucose's 180 |\n| Why | -- | joining **releases one water** |\n| How wrong 180 is | -- | **exactly 10% low**: 162/180 = 0.900 |\n| What that means | -- | the count and the **molar mass are one fact** |\n| Are all bonds alike | assumed yes | **no**: α-1,4 along, **α-1,6** at a branch |\n| What amylase cuts | the bonds | **only α-1,4** -- it grips by **shape** |\n| So 3 mg in 29 min does | all of it | **97%** of it, then stops |\n| What finishes the rest | -- | a **different enzyme**, on the gut wall |\n\n**The one line to remember:** every join in a chain is a water molecule that left, which is why a glucose unit in starch weighs 162 rather than 180 and why forgetting it costs you exactly a tenth of the answer -- and once the count is honest, the harder news is that 3% of those joins face sideways and no quantity of the wrong enzyme will ever open them.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}

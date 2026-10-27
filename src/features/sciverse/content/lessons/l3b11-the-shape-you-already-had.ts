import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 11, biology. The synthesis lesson. Mechanism.
 *
 * Replaces a version built on doublings -- cells = start x 2^n, doublings = log(target /
 * start) / log 2, 120 hours against 52 -- which measured zero structural biology words.
 * Parked in docs/level4/.
 *
 * The rewrite is about the receptor. A lymphocyte is a white blood cell carrying
 * thousands of copies of ONE receptor shape on its surface, and the body builds millions
 * of different lymphocytes, each with a different shape, BEFORE meeting any germ. When
 * one arrives, the few whose receptors happen to fit its antigen are the ones that
 * activate. The body does not design an answer; it already has one and selects it. That
 * is clonal selection, and it is the central idea of immunology.
 *
 * The selected cell then divides into a clone of identical cells: plasma cells pouring
 * out antibodies -- the same shape released as free protein -- and memory cells that
 * persist. So a vaccine does not teach a new trick. It enlarges the right clone and
 * leaves it in place, which is why protection is a head start rather than a skill.
 *
 * And the two ways it fails are both structural. The clone can be out-grown, because the
 * germ is multiplying too; or the germ's surface can CHANGE SHAPE -- antigenic drift --
 * so the stored receptors no longer fit, which is why the influenza vaccine is remade
 * every year while the measles one is not.
 *
 * The three-discipline tie is structural too, and better than the old version's: every
 * bit of this rests on shapes fitting, and a protein's shape is held by chemistry that
 * pH disturbs. So L3C11's blood buffer is not housekeeping -- it is what keeps the
 * receptors the right shape -- and P11's circulation is what carries the clone to the
 * infection.
 *
 * Frames stated: a receptor is counted on the lymphocyte's outer surface, an antigen is
 * the piece of the germ it binds, and 'fit' means the two shapes are complementary.
 *
 * Still standing: how a lymphocyte builds its one shape from shuffled gene segments is
 * not covered; T cells and the innate defences are left out; and the lesson treats fit
 * as a single number when real binding has many contact points.
 */
export function getL3B11Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2B11 gave a vaccine one number -- it is 90% effective, the same for everybody -- and left what a vaccine actually *does* unexamined. To remove that simplification, look at the cell it acts on.\n\n**A lymphocyte is a white blood cell with a shape on its outside.** Covering its surface are thousands of copies of a single protein, the **receptor**, and that receptor has a pocket on it with one particular form. It will bind tightly to something whose shape is the complement of that pocket, the way two puzzle pieces meet, and it will bind nothing else.\n\nThe piece of a germ that a receptor binds is called an **antigen** -- a patch on the germ's surface, a bump on a protein of its coat.\n\nNow the part that is genuinely surprising, and is the foundation of the whole subject.\n\n**Your body builds those shapes before it has ever met the germ.** Not in response to anything -- continuously, from birth, in the bone marrow, making lymphocytes whose receptors differ from one another at random. Millions upon millions of different shapes, the overwhelming majority of which will never match anything you encounter in your life.\n\nSo when a germ does arrive, nothing has to be designed. The germ drifts past cell after cell that cannot see it at all, until it meets the few whose receptors happen to fit -- **and those are the cells that switch on.**\n\nThis is called **clonal selection**, and your dials are **Matching Cells** and **Receptor Fit**.\n\nBefore anything else. Does your body learn the shape of a germ from the germ?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'selects', label: "No — it already had the shape, among millions of others, and the germ selects it.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'learns', label: "Yes — it examines the germ and builds a matching shape to fit it.", nextNodeId: 'misconception' }
            ]
        },

        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "It is the natural guess, and it is not how the system is built. **Nothing examines the germ, and nothing is designed.**\n\nThink about why designing would be hopeless. To build a receptor to order, the body would need to inspect an unfamiliar protein, work out a shape complementary to it, and then manufacture that shape -- in less time than a germ takes to double. Nothing in a cell can do any of that.\n\nSo the body solves the problem the other way round. **It makes the shapes in advance and in bulk, blindly.** Lymphocytes are produced continuously in the **bone marrow**, and as each one matures, the gene for its receptor is assembled from segments shuffled almost at random. The result is a cell with one shape nobody chose, and a population carrying an enormous library of different shapes.\n\n| | **designing** a shape | **already having** it |\n| --- | --- | --- |\n| when the work is done | after the germ arrives | **before**, continuously |\n| what it costs | impossible speed | millions of cells that never match |\n| how fast the answer comes | too late | **immediately**, if it is in the library |\n\nThe cost is real and the body pays it willingly: **the vast majority of your lymphocytes will never meet anything they fit**, and die unused. That waste is the price of having an answer ready.\n\nSo the germ's role is not to teach. **The germ's role is to pick.** It arrives, and out of millions of shapes it finds the few that match it -- and the finding is the signal.",
            options: [
                { id: 'cont', label: "So what happens to the ones that match?", nextNodeId: 'defining' }
            ]
        },

        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "**They divide, and that is where the numbers in L2B11 came from.**\n\nA lymphocyte whose receptor binds the antigen is activated, and it begins making copies of itself. Every copy carries **the same receptor shape**, because it is the same cell's genes -- so a few matching cells become a **clone**: a population all pointed at the same target.\n\nThe clone splits into two kinds of cell, with two structures suited to two jobs:\n\n- **plasma cells** are packed with the machinery for making and exporting protein, and they pour out **antibodies** -- the same receptor shape, released as a molecule that floats free in the blood rather than held on a surface. An antibody binds the germ wherever it finds it, in the blood, in the fluid between cells\n- **memory cells** do not pour anything out. They **persist** -- for years, sometimes for life -- carrying the same shape and ready to divide again\n\nAnd now you can say exactly what a vaccine does, which L2B11 could not.\n\n**A vaccine does not teach your body anything.** It shows your immune system a harmless version of an antigen -- a killed germ, a surface protein, or instructions for making one -- so that clonal selection runs **in advance**. The matching cells are found, the clone is grown, and when the infection is over a population of memory cells is left behind.\n\n| | before a vaccine | after it |\n| --- | --- | --- |\n| cells that fit this germ | **a handful**, somewhere in the body | **thousands**, already multiplied |\n| what they are | ordinary lymphocytes | **memory cells**, primed to divide |\n| where the shape came from | the library | **the same library** |\n\n**The shape was always yours.** The vaccine changed how many copies of it you are carrying, and nothing else.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'network' } },
            options: [
                { id: 'work', label: "Why does having more copies matter so much?", nextNodeId: 'worked' }
            ]
        },

        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**Because the germ is dividing too, and both sides start on the day of the infection.**\n\nThis is the part that makes immunity a matter of timing rather than strength. Antibodies are extremely effective -- but only once there are enough of them, and enough takes a clone of a certain size. Meanwhile the germ is doubling away, and if it reaches a damaging number before the clone reaches a useful one, you are ill regardless of how well the shapes fit.\n\nSo what a vaccine buys is **a head start, measured in days**:\n\n| | starting cells | time to a working defence |\n| --- | --- | --- |\n| never exposed | a handful | **about five days** |\n| vaccinated | thousands | **about two** |\n\nThree days does not sound like much. It is the difference between a germ that is still a local nuisance when the antibodies arrive and one that has spread through an organ -- and for a fast germ, three days is most of the illness.\n\n**Which is why protection is not a property of the vaccine at all.** It is the outcome of a race, and the same vaccine gives different protection to different people and different germs:\n\n- an **older** person's clones expand more slowly, so the same head start buys less\n- a **larger dose** of germ starts the other side further along\n- a **faster-dividing** germ needs a bigger head start to beat\n\n**That is where L2B11's single percentage came from, and why no single percentage can be right.** *90% effective* is the average outcome of millions of races, each with its own starting positions -- not a property the vaccine carries around with it.",
            options: [
                { id: 'check', label: "Let me test that.", nextNodeId: 'math_check' }
            ]
        },

        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "The measles vaccine still works after fifty years. The influenza vaccine is remade every single year, and some years it works badly.\n\nBoth leave behind memory cells with stored shapes. So why does one keep working and the other not?",
            options: [
                { id: 'drift', label: "Influenza changes the shape of its surface, so the stored receptors no longer fit it — while measles keeps the same shape", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'memory', label: "Influenza memory cells die much sooner than measles ones", nextNodeId: 'math_wrong' },
                { id: 'faster', label: "Influenza divides faster, so the race is simply lost", nextNodeId: 'math_wrong' }
            ]
        },

        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "The memory cells are fine, and that is what makes this the sharpest illustration in the lesson. **They are still there, still carrying their shape, still ready to divide. The shape no longer matches anything.**\n\nInfluenza's surface proteins accumulate changes constantly, and a change at the point where an antibody binds alters that **antigen's shape**. The stored receptor was the complement of last year's bump. Against this year's it binds weakly or not at all -- so clonal selection runs, and the cell it would have selected is not selected, because nothing fits. This is called **antigenic drift**.\n\nMeasles, by contrast, has surface proteins it cannot change much. The regions an antibody grips are also the regions the virus uses to enter cells, so a virus whose shape drifts away from your antibodies has usually also drifted away from its own door. **Measles is locked into its shape by its own machinery**, and a shape that cannot change can be remembered for life.\n\n| | the shape of the antigen | so stored memory is |\n| --- | --- | --- |\n| **measles** | essentially **fixed** | good for decades |\n| **influenza** | **drifts** every year | out of date in months |\n\nAnd *the race is simply lost* misses the distinction worth having. A lost race means the right cells were found and expanded too slowly -- more germ, or an older immune system. **Drift means the right cells were never found**, which no amount of head start fixes. One is a timing failure and the other is a recognition failure, and only the second one requires a new vaccine.",
            options: [
                { id: 'retry', label: "The shape changed, so nothing is selected.", nextNodeId: 'explore' }
            ]
        },

        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "The picture shows a germ with its **antigen** -- the notch on its coat -- and around it a field of **lymphocytes**, each drawn with the one **receptor** shape it happens to carry. Watch what matches and what does not.\n\nThings worth doing:\n\n- Look before you touch anything. Most of the cells carry shapes that have nothing to do with this germ, and they stay grey no matter what. **They are not failing: they were never for this**\n- Now raise **Matching Cells**. More of the field turns out to carry the fitting shape, they light up, and the clone begins dividing. This dial is what a vaccine changes -- **nothing else about the picture is different**\n- Set it low, to a handful, and watch how long the clone takes to fill out. Then set it high. **Same shape, same germ, same cells -- only the head start differs**\n- Now take **Receptor Fit** down. The germ's notch changes form, the lit cells go out one by one, and at the bottom of the dial a field full of memory cells sits there recognising nothing. **That is antigenic drift, and the Matching Cells dial cannot rescue it**\n- Try exactly that: fit at its lowest, matching cells at their highest. Thousands of primed cells, none of which fit. **Having the army is useless if it is holding the wrong picture**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Checkpoint", nextNodeId: 'checkpoint' }
            ]
        },

        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "Everything in this lesson has rested on one thing: **two shapes fitting together.** A receptor's pocket and an antigen's bump, a clone of identical shapes, an antibody that is a shape set loose.\n\nL3C11 worked out how the blood holds its acidity almost perfectly steady. Given what this lesson is about, why does that matter more than it sounds?",
            options: [
                { id: 'shapes', label: "Because a protein's shape is held by its chemistry, and acidity changes it — so the buffer is what keeps every receptor and antibody the right shape to fit.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'germs', label: "Because acid kills germs directly, so steady blood acidity keeps the body sterile.", nextNodeId: 'checkpoint_wrong' },
                { id: 'unrelated', label: "It does not really matter here — the buffer is about breathing, not immunity.", nextNodeId: 'checkpoint_wrong' }
            ]
        },

        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Ask what holds a receptor in its shape in the first place.\n\nA receptor is a **protein** -- a long chain folded into one particular form and held there by a great many weak attractions between its own parts. Many of those attractions depend on which parts of the chain are carrying an electric charge, and **what is charged depends on the acidity around it.** Change the acidity and the pattern of charges changes, the folding shifts, and the pocket is no longer quite the pocket it was.\n\nWhich is catastrophic for a system built entirely on fit. **A receptor that has changed shape does not bind its antigen a little less well -- it may not bind it at all**, in exactly the way antigenic drift breaks recognition. Drift changes the germ's shape; a swing in acidity would change *yours*, across every clone at once.\n\nSo L3C11's buffer is not plumbing. **It is what makes a library of shapes trustworthy over a lifetime.**\n\n| | | |\n| --- | --- | --- |\n| **P11** | blood under pressure | **delivers** the clone and its antibodies to the infection |\n| **C11** | acidity held steady | **preserves the shapes** the whole system depends on |\n| **B11** | a library of shapes, selected and copied | **does the recognising** |\n\nAnd *acid kills germs* is a real mechanism in the wrong place -- the stomach uses it, and so do some white cells inside their own compartments, but blood is held very near neutral precisely because its own proteins must survive in it.\n\n**That is the honest answer to how we stay healthy**: a pump, a chemistry held still, and a library of shapes you were born with.",
            options: [
                { id: 'retry', label: "The buffer protects the shapes.", nextNodeId: 'checkpoint_correct' }
            ]
        },

        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "**And that makes the three lessons one system rather than three topics.**\n\nThe whole of immune recognition is shapes meeting shapes. For that to work at all, three things have to be true at once, and each Big Idea 11 lesson supplies one:\n\n- the shapes must be **carried** to wherever the germ is -- which needs blood under pressure, **P11**\n- the shapes must **stay** the shapes they were -- which needs acidity held almost perfectly steady, **C11**\n- and the right shape must **already exist** among millions, to be selected and copied -- **B11**\n\nTake away any one and the other two are useless. A perfect library that cannot be delivered protects nothing; a delivered library whose proteins have unfolded recognises nothing.\n\n**And it reframes what L2B11's percentage was measuring.** *90% effective* is not a property of a vaccine. It is the average result of millions of separate races, each starting from a different number of matching cells, against a different dose of germ, in a body of a different age. A vaccine does one thing: **it runs clonal selection early, so the clone that would have started from a handful starts from thousands instead.**\n\nAnd it can fail in two quite different ways, which is worth carrying away. **It can lose the race** -- the right cells were found and could not expand fast enough. Or **the shape can go out of date** -- the germ's antigen drifted and nothing was found at all. The first is why vaccines are imperfect. **The second is why some have to be remade every year, and others never do.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "The shape was always mine!", nextNodeId: 'discovery' }
            ]
        },

        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found out what a vaccine actually changes, and it is not knowledge.**\n\n- **A lymphocyte is a white blood cell with a shape on its outside**: thousands of copies of one **receptor**, whose pocket binds one particular **antigen** -- a patch on a germ's coat -- the way two puzzle pieces meet, and binds nothing else\n- **Your body builds those shapes before meeting any germ.** Continuously, in the **bone marrow**, each new lymphocyte's receptor gene assembled from segments shuffled almost at random -- millions of shapes nobody chose\n- **So nothing is designed and nothing examines the germ.** Designing would need an unfamiliar protein inspected, a complement worked out and manufactured, faster than a germ doubles. Instead the shapes are made blindly in advance, and **the germ's role is not to teach but to pick**\n- The cost is paid willingly: **most of your lymphocytes never meet anything they fit** and die unused. That waste is the price of having an answer ready\n- **This is clonal selection.** The cell that binds divides, every copy carrying **the same shape**, giving a **clone** aimed at one target -- **plasma cells** packed with machinery for making and exporting protein, which pour out **antibodies** (the same shape set loose), and **memory cells** that persist for years carrying it\n- **So a vaccine teaches nothing.** It shows a harmless version of the antigen so clonal selection runs **early**: the matching cells are found, the clone grown, and memory cells left behind. **The shape was always yours** -- only the number of copies changed\n- **Why copies matter: the germ is dividing too.** Antibodies work, but only once there are enough, and the germ may reach a damaging number first. A handful of cells needs about **five days** to mount a defence; thousands need about **two**\n- **Which is why protection is not a property of a vaccine.** It is the result of a race, and it differs with age, with the dose of germ, and with how fast the germ divides. **L2B11's single percentage is the average of millions of races**\n- **And there are two quite different failures.** Lose the race -- the right cells were found and expanded too slowly. Or **antigenic drift** -- influenza's surface changes, so the stored receptor is the complement of last year's bump and binds nothing. **The memory cells are fine; the shape is out of date**, and no head start fixes that\n- **Measles cannot drift** far, because the regions antibodies grip are also the regions it uses to enter cells -- drift away from your antibodies and it drifts away from its own door. **A shape locked by its own machinery can be remembered for life**\n- **And the whole system rests on shapes staying shapes.** A receptor is a folded **protein** held by weak attractions that depend on which parts carry a charge, and that depends on the acidity around them. So **L3C11's buffer is not plumbing -- it is what makes a library of shapes trustworthy for a lifetime**, while **P11's** pressure is what carries the clone to the infection\n- **Still standing:** how a lymphocyte assembles its one shape from shuffled gene segments is not covered here. T cells and the innate defences are left out entirely. And fit is treated as a single number when real binding happens at many contact points at once.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Complete Big Idea 11, Level 3", nextNodeId: 'complete' }
            ]
        },

        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- How Do We Stay Healthy?**\n\nA pump, a chemistry held still, and a library of shapes you were born with.\n\n**Summary Table:**\n| | L2B11 said | L3B11 says |\n| --- | --- | --- |\n| What recognises a germ | the immune system | a **receptor** pocket on a **lymphocyte** |\n| What it binds | -- | one **antigen**, a patch on the germ's coat |\n| Where the shape comes from | -- | **made in advance**, at random, in the **bone marrow** |\n| What the germ does | -- | not teach but **pick**: **clonal selection** |\n| What follows | -- | a **clone**: **plasma cells** making **antibodies**, and **memory cells** |\n| What a vaccine changes | effectiveness, 90% | **how many copies** of a shape you already had |\n| Why that helps | -- | a **head start**: five days becomes two |\n| Why it is not 100% | -- | it is a **race**, and races depend on both sides |\n| Why flu needs redoing | -- | **antigenic drift**: the shape goes out of date |\n\n**What ties them together:** immune recognition is shapes meeting shapes, and that needs all three lessons at once -- blood under pressure to carry the shapes to the germ, acidity held steady to keep them the shapes they were, and a library built before the germ arrived so one of them already fits.\n\n**The one line to remember:** your body cannot learn the shape of a germ, so it makes millions of shapes blindly before anything happens and lets the germ pick the ones that fit -- which means a vaccine never teaches you anything, it simply grows the clone you already had, and the only thing that can defeat it outright is a germ that changes shape.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}

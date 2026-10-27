import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 27, biology. The synthesis lesson. Mechanism.
 *
 * This replaces a version that made the same closing argument with arithmetic -- two
 * currencies, contacts = (length/speed) x rate, 2,500 presses -- and which a reader
 * rightly said would lose biology students. Measuring the whole L3B slot showed the
 * complaint was about absence rather than excess: L3B is not more arithmetic-dense than
 * L3P, but nineteen of twenty-seven of its lessons carried almost no structural biology.
 *
 * So this reaches the same conclusion through structure. It prints no formulas.
 *
 * What the lesson is about: L3C27 left 3% of starch's bonds needing an enzyme amylase
 * cannot replace. That enzyme is a PROTEIN -- a folded chain whose working part is a
 * pocket, the active site, shaped to close around one particular join. An alpha-1,4 lies
 * along the chain and an alpha-1,6 sticks out sideways, so a pocket built for one cannot
 * close on the other: 'a different enzyme' means 'a differently shaped pocket', which is
 * the whole of enzyme specificity in one sentence.
 *
 * And this one is anchored. Sucrase-isomaltase and maltase sit in the MEMBRANE of the
 * cells lining the gut, a stalk through the membrane and the head facing out into the
 * brush border -- the dense carpet of microvilli on each lining cell. Being bolted down
 * looks like a handicap and is the point: the glucose appears a few nanometres from the
 * transporter that carries it in, so the last cut and the uptake happen in the same
 * place. A free enzyme would release glucose in mid-fluid, to be carried away.
 *
 * The consequence is that the food has to come to the enzyme, which is what the gut's
 * non-travelling contractions are for -- so L3P27's seventy-four in seventy-five, which
 * looked like waste, are the mechanism. The same close as before, now earned by anatomy.
 *
 * The clinical case carries the structural point: in coeliac disease the immune system
 * flattens the microvilli, so the enzymes have nowhere to sit even though the body can
 * still make them. Plenty of enzyme and no surface is no digestion -- an anchored
 * enzyme's usefulness is its position, not its quantity.
 *
 * Frames stated: the active site faces the lumen, the transporter carries sugar from the
 * lumen into the cell, and 'anchored' means held in the membrane of the lining cell.
 *
 * Still standing: how fast one brush-border enzyme works is not counted here; the
 * lesson treats one press as one chance to meet the surface, which is a sketch; and
 * the shapes are described rather than solved, because working out a fold from a
 * sequence is a different subject.
 */
export function getL3B27Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L3C27 ended with a loose end. About **3%** of the bonds in starch are **α-1,6** -- the joins at a branch point, facing sideways -- and amylase cannot cut them however much of it there is. Something else finishes the job.\n\nSo what is that something, actually?\n\n**It is a protein.** A long chain of amino acids, folded up into one particular shape and holding that shape. The fold is not decoration: it creates a **pocket** on the surface of the molecule, and that pocket is the working part. It is called the **active site**.\n\nAn enzyme works by closing its active site around the thing it is going to change. Which means the pocket has to **fit** -- and this is where L3C27's result stops being a fact about percentages and becomes a fact about shapes:\n\n- an **α-1,4** join lies **along** the chain, two rings linked end to end\n- an **α-1,6** join sticks out **sideways**, because the second ring is attached at its side\n\nThose two are different shapes in space. A pocket built to close around a join lying flat along a chain cannot close around one jutting out at an angle -- not because it is weak, but because it is the wrong shape, in the way a key cut for one lock is the wrong shape for another.\n\n**So *a different enzyme* means *a differently shaped pocket*.** That is the whole of why enzymes are specific, and it is why no amount of amylase will ever do this job.\n\nThe enzyme that can is called **isomaltase**, and its partner **maltase** finishes the short pieces amylase leaves behind. Neither of them can **leave** the place it is fixed in, which turns out to be the whole point of them. Your two dials are **Microvilli** and **Presses Per Minute**, both of which the lesson will come to.\n\nBefore anything else. These enzymes are not floating in the gut fluid the way amylase is -- they are **built into the wall**. Why would a body hold an enzyme still?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'place', label: "So the sugar it makes appears exactly where the sugar is absorbed.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'handicap', label: "It must be a handicap — a free enzyme could reach far more food.", nextNodeId: 'misconception' }
            ]
        },

        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "It is the obvious thought, and the anatomy answers it.\n\nLook at where the enzyme actually sits. The cells lining the small intestine have a **membrane** -- the thin, flexible sheet that forms their outer boundary. This enzyme is **embedded** in it: a **stalk** passing through the membrane, anchoring the molecule, and the head carrying the active site standing out into the gut contents.\n\nNow look at what sits **beside** it in the same membrane. A **transporter** -- a different protein, folded into a **channel** that lets glucose through the membrane and into the cell. Glucose cannot cross a membrane on its own; it needs that channel.\n\nSo picture the moment the bond is cut. The pocket closes, the join breaks, and two glucose molecules come free -- **a few nanometres from the transporter that takes them in.** Cutting and absorbing happen at the same spot, on the same sheet of membrane, as one movement.\n\n**Now imagine the free version.** An enzyme drifting in the gut fluid cuts a bond out in the middle of the flow and releases glucose into a moving current, somewhere in the middle of a tube centimetres wide. That glucose then has to find a wall before the wall is behind it.\n\n| | where it cuts | where the sugar lands |\n| --- | --- | --- |\n| **amylase**, free | anywhere in the fluid | in the fluid, still travelling |\n| **isomaltase**, anchored | at the membrane | **beside the transporter** |\n\n**Being held still is not a cost the body pays. It is the reason the arrangement works.**",
            options: [
                { id: 'cont', label: "So what does the surface look like?", nextNodeId: 'defining' }
            ]
        },

        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "**Like a carpet, and the name for it is the brush border.**\n\nEach cell lining the gut is not smooth on its gut-facing side. It is covered in **microvilli** -- thousands of fine projections, each a narrow finger of membrane pushed outwards, packed side by side. Under a microscope the edge of the cell looks fuzzy, like the pile of a brush, which is where the name comes from.\n\nAnd the enzymes stud those fingers. Isomaltase and maltase sit along the sides of every microvillus, heads out, with transporters among them -- so the whole fuzzy surface is simultaneously **the last stage of digestion and the first stage of absorption.**\n\nThat gives the two kinds of enzyme a clean division of labour, and each one's structure explains its job:\n\n| | **amylase** | **the brush-border enzymes** |\n| --- | --- | --- |\n| where it is | **free** in the fluid | **anchored** in the membrane |\n| what it cuts | α-1,4, the bulk | α-1,6 and the short leftovers |\n| how much of the job | about **97%** | the last **3%** |\n| why that shape of plan | can reach food **anywhere** | finishes it **where it is taken in** |\n\nBut an anchored enzyme has one unavoidable consequence, and it is the thing the rest of this lesson is about.\n\n**It cannot go to its food.** Amylase drifts with the contents and is always beside something to cut. An enzyme bolted to the wall sits still while the contents flow past, and only does anything for the part of the meal that actually **touches the wall**.\n\nSo the question is no longer *is there enough enzyme* -- it is *does the food ever reach it*.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'network' } },
            options: [
                { id: 'work', label: "What brings the food to the wall?", nextNodeId: 'worked' }
            ]
        },

        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**The squeezing that L3P27 found was doing nothing.**\n\nRemember what that lesson worked out. A ring of muscle that tightens and **travels** carries food along -- that is how swallowing works. But only about **one contraction in seventy-five** travels. The other seventy-four tighten and let go **on the spot**, moving the contents nowhere at all. L3P27 called that mixing, and measured against transport it looks like a gut operating at one percent efficiency.\n\nNow look at one of those contractions with the brush border in mind. The ring tightens, and the contents have nowhere to go but **outwards, against the lining** -- which is where every active site and every transporter is. It releases, the contents fall back, their neighbours take their place, and it happens again.\n\n**Each one of those contractions is a press of the meal against the enzymes.** They are not failing at transport. They were never doing transport.\n\nAnd there are a great many of them: contractions come roughly ten times a minute, and food is in the small intestine for about four hours, so each part of a meal is pushed onto that surface **a couple of thousand times** on its way down.\n\nSo the three Level 3 lessons turn out to describe one arrangement from three sides:\n\n| | found | which is |\n| --- | --- | --- |\n| **L3P27** | 1 contraction in 75 travels | the **transport** |\n| **L3C27** | 3% of bonds need another pocket | the **chemistry** |\n| **L3B27** | that pocket is **anchored** in the wall | why the other 74 matter |\n\n**Going nowhere is the mechanism.** A contraction that moves food is doing the easy half -- it has to happen once per mouthful. A contraction that presses food against the wall is doing the half that has to happen thousands of times, because the enzyme cannot come to the food.",
            options: [
                { id: 'check', label: "Let me test that.", nextNodeId: 'math_check' }
            ]
        },

        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "Here is a case that separates **how much** enzyme from **where** it is.\n\nIn **coeliac disease** the immune system attacks the lining of the small intestine, and one of the things it destroys is the brush border: the microvilli are flattened, so the fuzzy carpet becomes a smooth surface. The cells can still make isomaltase and maltase perfectly well.\n\nPlenty of enzyme, flattened surface. What happens to the last 3%?",
            options: [
                { id: 'fails', label: "It largely fails — an anchored enzyme with no surface to sit in has nowhere to work, however much of it is made", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'fine', label: "It continues — the enzyme is still being made, so the reaction still happens", nextNodeId: 'math_wrong' },
                { id: 'slow', label: "It slows down a little, in proportion to the lost surface", nextNodeId: 'math_wrong' }
            ]
        },

        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Ask where an anchored enzyme can possibly be if its anchor is gone.\n\nThese molecules are not useful **as molecules**. They are useful as **positions** -- a pocket held in a membrane with its active site facing the food and a transporter beside it. Flatten the microvilli and most of those positions no longer exist, so most of the enzyme the cell makes is never installed anywhere it can act.\n\n**So *it is still being made* is true and it is not the point.** A free enzyme's usefulness really is its quantity: more amylase means more cutting, which was L2C27's whole result. **An anchored enzyme's usefulness is its position**, and a position can be destroyed without touching the molecule at all.\n\nThat is why the symptoms are what they are. The uncut pieces stay in the gut, travel on into the large intestine, and feed the bacteria there -- which produces the bloating, the gas and the diarrhoea that bring people to a doctor in the first place. **The problem is not a missing enzyme. It is a missing surface.**\n\nAnd *it slows a little, in proportion* understates it, because the loss is not only of area. A flattened lining also means fewer transporters, so even where a cut does happen the sugar may not be taken in -- and the two failures are in the same membrane for the same reason.\n\n**This is the clearest case in the Big Idea for why structure is not a detail.** Nothing is wrong with the chemistry. Every molecule is correctly folded and perfectly capable. The shape of the **surface** is wrong, and that is enough.",
            options: [
                { id: 'retry', label: "No surface, no position, no reaction.", nextNodeId: 'explore' }
            ]
        },

        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "The picture is a close-up of one lining cell's surface. The **membrane** runs along the bottom, the **microvilli** rise from it, and the enzymes stud them -- each drawn as a stalk through the membrane and a head with a notch in it, which is the **active site**. The darker channels beside them are **transporters**. Above, in the gut contents, the short joined pieces amylase left behind drift past.\n\nThings worth doing:\n\n- Start with a healthy border -- **Microvilli** high and **Presses Per Minute** at 10. Watch a piece land on an active site, the join break, and the two sugars go straight down through the transporter beside it. **Cut and absorbed in one place**\n- Now take the **Microvilli** dial down towards zero. The carpet flattens, the enzymes go with it, and pieces drift past a smooth wall with nothing to meet. That is the coeliac picture, and notice that nothing about the remaining enzymes has changed\n- Put the microvilli back and take **Presses Per Minute** down instead. The surface is perfect and intact, and the pieces simply do not get pushed onto it often enough. **Two completely different faults with the same outcome**\n- Try high presses with a flattened border, and then low presses with a perfect one. Neither recovers, which is the point of having both dials: **the enzyme needs a place to be *and* the food brought to it**\n- And look at a single enzyme for a while. It never moves. Everything that happens, happens because something was brought to it",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Checkpoint", nextNodeId: 'checkpoint' }
            ]
        },

        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "Step back and compare the two kinds of enzyme this Big Idea has met.\n\n**Amylase** is poured into the gut by the pancreas in large amounts, drifts freely, and does 97% of the work. **Isomaltase** is held in a membrane, is never released, and does the last 3%.\n\nIf you had to design a digestive system, why not make both of them free? It would be simpler.",
            options: [
                { id: 'couple', label: "Because the last cut has to happen where the sugar is taken in — anchoring puts the pocket beside the transporter, which a free enzyme cannot do.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'cheap', label: "Because anchored enzymes are cheaper for the body to make.", nextNodeId: 'checkpoint_wrong' },
                { id: 'strong', label: "Because α-1,6 bonds are stronger, so the enzyme needs the wall to brace against.", nextNodeId: 'checkpoint_wrong' }
            ]
        },

        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Think about what the two enzymes are each trying to achieve, because they are not the same task.\n\n**Amylase has an enormous, forgiving job.** There are of the order of 10²² α-1,4 bonds in a meal, spread through everything, and it does not matter in the least **where** any one of them is cut -- the pieces are still in the gut and still on their way. Freedom is exactly right for that: go everywhere, cut anything, be abundant.\n\n**Isomaltase has a small, fussy, final job.** It makes the last cut, and what it releases is **finished** -- a single glucose, ready to be absorbed, and useless to the body if it is not. Glucose cannot cross a membrane by itself; it needs a transporter. So the last cut wants to happen **as close to a transporter as physically possible**, and the way to guarantee that is to build the enzyme into the same membrane.\n\nThat is a design principle, not a quirk: **put the last step of a process where the product is needed.**\n\n*Cheaper to make* is not it -- a membrane protein with a stalk is no simpler than a soluble one, and the cell has to install it as well as build it. And *bracing against the wall* has the physics wrong: an enzyme does not push, it holds a shape. The strength of the bond is irrelevant to where the molecule is standing.\n\n**And the anchoring is what makes the gut's pointless-looking squeezing essential.** A free enzyme needs no help finding food. An anchored one needs the food delivered, thousands of times, which is precisely what seventy-four contractions in every seventy-five are doing.",
            options: [
                { id: 'retry', label: "Put the last step where the product is needed.", nextNodeId: 'checkpoint_correct' }
            ]
        },

        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "**And that closes Big Idea 27 on a single piece of anatomy.**\n\nEverything the three Level 3 lessons found meets at the brush border:\n\n- **L3P27** found that a ring of muscle which seals and travels carries food, and that almost none of them travel\n- **L3C27** found that 3% of starch's joins face the wrong way for amylase's pocket, so another pocket is needed\n- **this lesson** found that the other pocket is **anchored in the wall**, beside the transporter that takes the sugar in\n\nPut them in that order and the gut stops looking like three separate systems and starts looking like **one arrangement**. The final chemistry is fixed in place because its product has to be absorbed on the spot. Because it is fixed, the food must be brought to it. And because the food must be brought to it, most of the gut's muscle spends its time squeezing without going anywhere.\n\n**The apparent waste was the delivery service for the anchored enzymes.**\n\nAnd this is the third time in these lessons that something which looked like a flaw turned out to be the mechanism. **L3B21:** a cell's tiny store of **ATP** -- adenosine triphosphate, the molecule it spends to do anything -- looked like a design flaw, and is what makes its sensor sharp. **L3B22:** ultrasound echoes are faint, and the faintness is why the pulse reaches the bottom. **Here:** seventy-four contractions in seventy-five appear to achieve nothing, and they are doing the half of digestion that nothing else can.\n\n**When a living system looks badly built, look for what the apparent waste is paid for.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "One arrangement, not three systems!", nextNodeId: 'discovery' }
            ]
        },

        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found out what the enzyme L3C27 called for actually is.**\n\n- It is a **protein**: a folded chain whose shape creates a **pocket** on its surface, the **active site**, which closes around the thing it changes\n- So specificity is **shape**. An **α-1,4** join lies **along** the chain; an **α-1,6** sticks out **sideways**. A pocket built for one cannot close on the other -- **a different enzyme means a differently shaped pocket**, which is why no quantity of amylase will ever do this job\n- The ones that can are **isomaltase** and **maltase**, and they are **embedded in the membrane** of the lining cells: a **stalk** through the membrane, the head and its active site facing out into the gut\n- **Beside them in the same membrane sits a transporter** -- a protein folded into a **channel**, because glucose cannot cross a membrane on its own. So when the pocket closes and the join breaks, the sugar appears **a few nanometres from the way in.** Cutting and absorbing are one movement\n- A free enzyme would cut in mid-fluid and release glucose into a moving current, to find a wall before the wall was behind it. **Being held still is not a cost; it is the reason the arrangement works**\n- The surface they sit in is the **brush border**: each lining cell carries thousands of **microvilli**, fine fingers of membrane packed side by side, studded with enzymes and transporters together. The whole fuzzy carpet is **the last stage of digestion and the first of absorption at once**\n- **Two enzymes, two structures, two jobs.** Amylase is free, abundant and does 97% anywhere in the fluid. The brush-border enzymes are anchored, few, and finish the last 3% exactly where it is taken in. **Put the last step of a process where the product is needed**\n- **And an anchored enzyme cannot go to its food**, so the question stops being *is there enough* and becomes *does the food reach it*\n- **What brings it is L3P27's wasted squeezing.** A contraction that tightens without travelling drives the contents outwards against the lining -- which is where every active site is. Those are the seventy-four in seventy-five, and with contractions about ten a minute over four hours each part of a meal is pressed onto that surface **a couple of thousand times**\n- **Going nowhere is the mechanism.** Transport has to happen once per mouthful; contact has to happen thousands of times, because the enzyme is the thing that cannot move\n- **Coeliac disease is the proof that structure is not a detail.** The immune system flattens the microvilli, so the positions vanish while the molecules remain perfect. **A free enzyme's usefulness is its quantity; an anchored one's is its position** -- and a position can be destroyed without touching the molecule. The uncut pieces travel on and feed the bacteria of the large intestine, which is where the symptoms come from. **Not a missing enzyme, a missing surface**\n- **Still standing:** how fast one brush-border enzyme works is not counted here. One press is treated as one chance to meet the surface, which is a sketch rather than a measurement. And the shapes are **described**, not solved -- working out how a chain folds from its sequence is a different subject.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Complete Big Idea 27, Level 3", nextNodeId: 'complete' }
            ]
        },

        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- How Does Food Become Usable Energy?**\n\nThree lessons, and all three meet at one piece of anatomy.\n\n**Summary Table:**\n| | Physics (L3P27) | Chemistry (L3C27) | Biology (L3B27) |\n| --- | --- | --- | --- |\n| What it asked | how does a muscle move food | where does the bond count come from | what **is** the last enzyme |\n| The structure | a **travelling ring** that seals | a join lying **along** or **sideways** | a **pocket** in an **anchored** protein |\n| Why that shape works | the food is **enclosed**, so up stops mattering | a pocket fits **one** join only | the product lands **beside the transporter** |\n| Where it happens | the whole tube | anywhere in the fluid | the **brush border**, on the **microvilli** |\n| The division of labour | 1 ring in 75 **travels** | amylase does **97%** | anchored enzymes do the last **3%** |\n| What breaks it | a **weak** wave cannot lift | a sideways join: **no** amount helps | a **flattened** lining: position lost |\n\n**What ties them together:** the final chemistry is held in place because its product must be absorbed on the spot; because it is held in place, the food has to be brought to it; and because the food has to be brought to it, most of the gut's muscle squeezes without going anywhere. The three lessons are three views of one arrangement.\n\n**The one line to remember:** an enzyme is a shape with a pocket, and the last enzymes in digestion are built into the gut wall so that the sugar they release appears next to the channel that takes it in -- which is why a flattened lining ruins digestion without a single enzyme being faulty, and why seventy-four contractions in every seventy-five spend their lives going nowhere on purpose.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}

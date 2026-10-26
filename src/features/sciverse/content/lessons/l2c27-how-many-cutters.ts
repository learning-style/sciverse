import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) for Big Idea 27, chemistry.
 *
 * C27 says chewing cannot take food apart chemically, enzymes can, and each enzyme
 * cuts one kind of bond. It never counts the bonds. The count is the lesson:
 *
 *   time to finish = bonds / (enzyme molecules x cuts per second)
 *
 * A slice of bread holds about 15 g of starch, which is about 5.6 x 10^22 bonds --
 * stated as a looked-up figure, because working it out needs the mole, which is
 * L3C2's and belongs at Level 3. One amylase molecule cutting 1000 bonds a second
 * would need 1.8 x 10^12 years, about 130 times the age of the universe. About 3 mg
 * of amylase -- 3.2 x 10^16 molecules -- does it in 29 minutes.
 *
 * So the idea is PARALLELISM: not a faster cutter but an astronomical number of
 * them, all working at once. That is a different question from L2C25's, which asked
 * how many cycles ONE carrier manages, and the lesson says so rather than pretending
 * the two are unrelated -- an enzyme is exactly the kind of catalyst that lesson
 * counted, handed back unchanged after every cut.
 *
 * The decision is that chewing more cannot speed digestion up, because the limit is
 * how many enzyme molecules are present rather than how small the pieces are. That
 * also keeps clear of Big Idea 2, which owns surface area to volume and the villi.
 *
 * Frame of reference stated: a bond cut is one join broken between two glucose units,
 * and the count is for the starch in one slice of bread.
 *
 * Still standing: where the 5.6 x 10^22 comes from needs the mole; the 1000 cuts a
 * second is a round figure; and the arithmetic assumes every enzyme is busy every
 * second, which needs food actually to be touching it.
 */
export function getL2C27Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "C27 told you what an enzyme does. It takes hold of one exact thing and takes it apart -- one join, one cut, and the enzyme is then free to do it again.\n\nWhat it never did was **count**, and the count is worth seeing, because it turns a vague sense of *lots* into something you can be properly astonished by.\n\nAnd it is worth saying where this happens, because the whole Big Idea is about one place. A mouthful of bread is chewed, swallowed, and passed through the stomach into the **small intestine** -- the long coiled tube where almost all the cutting is done. The amylase meets it there, some of it from your saliva and much more of it poured in from the **pancreas**. Everything in this lesson is happening inside that tube.\n\nSo take a slice of bread. About **15 grams** of it is **starch**, and starch is not one big lump -- it is long chains of **glucose** units, joined end to end like beads on a string. Glucose is the small sugar your body can actually use; starch is glucose locked up in chains.\n\nTo free the glucose, **every one of those joins has to be cut.** Not most of them. Every one, because a chain of two glucose units is still not glucose.\n\nHow many joins is that? In the starch of one slice of bread:\n\n**about 5.6 x 10²² bonds**\n\nwhich written out is about **56 thousand million million million**. That figure is looked up rather than worked out here -- getting it needs a counting unit for atoms that belongs at Level 3 -- so take it as measured and let us see what it means.\n\nThe enzyme that cuts those joins is called **amylase**, and one amylase molecule can cut about **1000 bonds every second**. That is genuinely fast for a single molecule.\n\nYour two dials:\n\n- **Amylase**, in **milligrams (mg)** -- how much of the enzyme is present.\n- **Cuts Per Second** -- how fast one molecule works.\n\nBefore any arithmetic. One amylase molecule, cutting 1000 bonds a second, never resting. **How long to get through one slice of bread?**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'ages', label: "An absurdly long time -- 10²² divided by 1000 is still 10¹⁹ seconds.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'minutes', label: "A few minutes -- 1000 cuts a second is fast.", nextNodeId: 'misconception' }
            ]
        },

        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "1000 a second **is** fast, and it is nowhere near fast enough. Do the division and look at what comes out.\n\n5.6 x 10²² bonds / 1000 cuts per second = **5.6 x 10¹⁹ seconds**\n\nThat is a number with no feel to it, so convert it. There are about 3.2 x 10⁷ seconds in a year:\n\n5.6 x 10¹⁹ / 3.2 x 10⁷ = **about 1.8 x 10¹² years**\n\n**1.8 million million years.** The universe is about 1.4 x 10¹⁰ years old, so one amylase molecule working on one slice of bread would need **about 130 times the age of the universe.**\n\nThat is not a near miss that better enzymes could close. **No molecule can be made fast enough.** To finish in half an hour a single cutter would have to work about 10¹⁹ times a second, and nothing in chemistry goes at anything like that rate.\n\nSo the one-molecule answer is not *slow*. It is **impossible**, and that rules out a whole way of thinking about it. Whatever your body is doing, it is not relying on each enzyme being quick.",
            options: [
                { id: 'cont', label: "So how is it done at all?", nextNodeId: 'defining' }
            ]
        },

        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "By having an enormous number of them, all cutting at the same moment.\n\nThat is the whole answer, and it goes straight into the arithmetic. If there are **N** enzyme molecules and each makes **c** cuts a second, then together they make **N x c** cuts a second, and\n\n**time to finish = bonds / (enzyme molecules x cuts per second)**\n\nThis holds while **every enzyme is busy every second** -- which needs food actually touching it, and is a real condition we will come back to.\n\nNow read what the formula says about the two dials, because it is blunter than it looks. **Both of them are in the bottom, multiplied together.** So doubling the number of enzymes and doubling the speed of each do **exactly the same thing** to the answer, and only their **product** matters. The body has essentially no control over *c* -- that is fixed by the shape of the molecule -- and complete control over *N*, which is how much enzyme it chooses to make.\n\n**Which is why the answer had to be numbers rather than speed.**\n\nAnd here is where this connects to something you have already counted. **L2C25** asked how many cycles **one** carrier manages before it is stopped, and got 100,000. An amylase molecule is exactly that kind of carrier -- it is handed back unchanged after every cut, which is what lets one molecule make 1000 cuts a second for hours. **Same chemistry, different question.** There the question was how long one lasts; here it is how many there are at once.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'network' } },
            options: [
                { id: 'work', label: "How many does it take?", nextNodeId: 'worked' }
            ]
        },

        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**Turn the formula round** to ask for the number instead of the time. To finish in **30 minutes**, which is 1800 seconds:\n\nenzyme molecules = bonds / (cuts per second x seconds)\n\n= 5.6 x 10²² / (1000 x 1800) = **about 3 x 10¹⁶ molecules**\n\nThirty thousand million million of them. And now the number that makes the point, because that sounds like an impossible demand and it is not:\n\n**3 x 10¹⁶ molecules of amylase weigh about 3 milligrams.**\n\nThree milligrams. A grain of salt is about 60 micrograms, so this is roughly **fifty grains of salt** worth of enzyme -- and your saliva and pancreas supply it without difficulty.\n\nPut the two results side by side, because the contrast is the lesson:\n\n| | |\n| --- | --- |\n| **one** amylase molecule | **130 times the age of the universe** |\n| **3 mg** of amylase | **29 minutes** |\n\nNothing about the chemistry changed between those two rows. Every molecule is still making its 1000 cuts a second. **The only difference is how many are doing it**, and that difference is a factor of 3 x 10¹⁶, which is quite enough to turn the impossible into something that fits comfortably inside the four hours L2P27 measured.\n\n**And now check the dials against each other.** 3 mg at 1000 cuts a second gives 29 minutes. **1.5 mg** at **2000** cuts a second also gives 29 minutes. So does 6 mg at 500. **Only the product matters**, exactly as the formula said.",
            options: [
                { id: 'check', label: "Let me try one.", nextNodeId: 'math_check' }
            ]
        },

        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "Your turn. Suppose only **1.5 mg** of amylase turns up, each molecule still cutting **1000** bonds a second.\n\nHow long does the slice of bread take now?",
            options: [
                { id: 'fiftyeight', label: "About 58 minutes — half the enzyme, twice the time", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'fifteen', label: "About 15 minutes — half the enzyme, half the time", nextNodeId: 'math_wrong' },
                { id: 'same', label: "About 29 minutes — the enzyme amount does not change the time", nextNodeId: 'math_wrong' }
            ]
        },

        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "The enzyme count is on the **bottom** of the fraction, so halving it **doubles** the time:\n\n29 minutes x 2 = **about 58 minutes**\n\nThe 15-minute answer treats the enzyme count as if it were on the top -- as if less enzyme meant less work to do. It does not; the bread has exactly as many bonds in it either way. **Fewer cutters, same job, longer time.**\n\nAnd *the amount makes no difference* is the harder mistake to spot, because it would be true of something else. If you were asking **how much glucose you end up with**, the enzyme amount really would not matter -- you get the same glucose either way, because the bonds are the same bonds. **The amount of enzyme changes the time, not the outcome**, and keeping those two questions apart is most of understanding what a catalyst does.\n\nWhich has a direct consequence worth having. Somebody whose pancreas makes too little of these enzymes does not digest *different* food. They digest the **same** food too slowly to finish, which is a different kind of problem and needs a different kind of help.",
            options: [
                { id: 'retry', label: "On the bottom, so halving doubles the time.", nextNodeId: 'explore' }
            ]
        },

        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Both dials are live. The chain is drawn as **20 joins** -- each one standing for a twentieth of the slice -- and below it the cutters, **one drawn cutter for every 0.25 mg**. The picture asks one question: after **half an hour**, how many of the 20 are cut?\n\nThe footers do the multiplication you can check by counting: *one cutter gets through 1.7 of 20 joins*, and *12 x 1.7 = 20.4*.\n\nThings worth doing:\n\n- Start at **3 mg** and **1000** cuts a second. Twelve cutters, 1.7 each, **20.4** -- just past 20, so all 20 are cut and the slice is finished. **3 mg is the amount that just finishes a slice in half an hour**, which is why that is the number the body supplies\n- Now halve the enzyme to **1.5 mg**. Six cutters, same 1.7 each, **10.2 of 20** -- half the chain still joined after half an hour. So it needs **about an hour**, which is the doubling you worked out\n- Halve it again, to **0.75 mg**: **5.1 of 20**, a quarter done, so about **two hours**\n- **Now the one to spend time on.** Set 1.5 mg and **2000** cuts a second: six cutters at **3.5** each, **21.0**, finished. Then 6 mg at **500**: twenty-four cutters at **0.86** each, **20.6**, finished. And 3 mg at 1000 gave 20.4. **Three completely different pictures, the same result** -- few fast cutters, many slow ones, or the middle. Only the **product** matters, and you can see all three products landing just past 20\n- Take both dials to the bottom -- **0.25 mg** and **100** cuts a second. One cutter, **0.17 of 20**, so **nothing** visible is cut. That setting needs nearly **58 hours**, and food does not stay in you for two and a half days\n- Both to the top: **124.8 of 20**, six times more cutting than the slice needs. The body is **not short of enzyme**; it has room to spare\n- And one thing the dial will not let you do: set the cutters to **one real molecule**. There is no such position, because that answer is not minutes, it is ages of the universe.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Checkpoint", nextNodeId: 'checkpoint' }
            ]
        },

        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "Somebody decides to digest their food faster by **chewing every mouthful a hundred times**, reasoning that smaller pieces must break down quicker.\n\nThey do get smaller pieces. Using this lesson's formula, does the food break down faster?",
            options: [
                { id: 'no', label: "Barely — the time is set by bonds divided by enzymes times cuts, and chewing changes none of those three.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'yes', label: "Yes — smaller pieces have more surface, so the enzymes work faster.", nextNodeId: 'checkpoint_wrong' },
                { id: 'fewer', label: "Yes — chewing breaks some of the bonds itself, so there are fewer left.", nextNodeId: 'checkpoint_wrong' }
            ]
        },

        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Go through the formula a term at a time and ask what chewing changes.\n\n- **bonds**: unchanged. Chewing makes the pieces smaller, and a smaller piece of bread has exactly as many joins between glucose units as it did when it was part of a bigger piece. **Crushing something does not unjoin it**, which is precisely what C27 meant by saying chewing cannot do this job\n- **cuts per second**: unchanged. That is a property of the amylase molecule\n- **enzyme molecules**: unchanged. Chewing does not make more enzyme\n\nSo all three terms are untouched, and the time comes out the same. The second answer is the interesting wrong one, because the thing it says is **true** -- smaller pieces really do expose more surface -- and it does not help *here*. More surface helps when enzymes cannot **reach** the food. In a well-chewed, well-mixed, enzyme-rich gut they can already reach it, so reaching is not what is taking the time. **The time is being taken by the sheer number of cuts.**\n\nAnd the third answer has a real misconception in it worth naming. Chewing is a **physical** change: pieces get smaller and nothing is unjoined. Only the enzymes break joins. That is the whole division of labour between P27 and C27.",
            options: [
                { id: 'retry', label: "Chewing changes none of the three terms.", nextNodeId: 'checkpoint_correct' }
            ]
        },

        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "**Exactly -- and notice that you just ruled out the most popular explanation by checking whether it appears in the arithmetic.**\n\nIt is worth being clear that smaller pieces are not useless. They matter enormously when an enzyme cannot **get to** the food, which is why swallowing a whole potato is a bad idea. But once the enzymes can reach it, the thing taking the time is the **count** -- and the count does not care how the food is arranged.\n\nSo the two halves of this Big Idea do genuinely different jobs, and neither can cover for the other:\n\n- **chewing** makes the food **reachable**. A physical change, and quick\n- **enzymes** make the food **usable**. A chemical change, and slow, because there are 5.6 x 10²² joins to cut\n\nWhich leaves one question standing, and it is the one L2B27 answers. Your body can supply the enzymes -- 3 mg is nothing. It can chew. **So why is the tube nine metres long?**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Reachable is not the same as usable!", nextNodeId: 'discovery' }
            ]
        },

        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You counted what C27 only gestured at.**\n\n- **Starch** is chains of **glucose** joined end to end, and **every** join has to be cut, because a chain of two glucose units is still not glucose\n- The starch in one slice of bread holds about **5.6 x 10²² bonds** -- 56 thousand million million million. A looked-up figure; working it out needs a counting unit for atoms that belongs at Level 3\n- One **amylase** molecule cuts about **1000** bonds a second, which is genuinely fast for one molecule\n- **One molecule** would need 5.6 x 10¹⁹ s = **1.8 x 10¹² years**, about **130 times the age of the universe**. Not slow -- **impossible**, since no molecule can be made 10¹⁹ times faster\n- **time to finish = bonds / (enzyme molecules x cuts per second)**, while every enzyme is busy every second\n- **Both dials are on the bottom, multiplied**, so only their **product** matters: 3 mg at 1000, 1.5 mg at 2000 and 6 mg at 500 all give **29 minutes**\n- The body cannot change the cuts per second -- that is the molecule's shape -- and **can** change the number. So the answer had to be **numbers, not speed**\n- To finish in 30 minutes needs about **3 x 10¹⁶ molecules**, which weigh about **3 mg** -- some fifty grains of salt, which saliva and pancreas supply easily\n- **One molecule: 130 ages of the universe. Three milligrams: 29 minutes.** Nothing about the chemistry differs between those rows -- only how many are working at once\n- Fewer cutters means **longer**, not less: the enzyme count is on the **bottom**. So too little enzyme does not digest *different* food, it fails to **finish** the same food\n- **The amount of enzyme changes the time, not the outcome.** Keeping those apart is most of understanding a catalyst\n- An enzyme is exactly **L2C25's** carrier, handed back unchanged after every cut -- but that lesson asked how many cycles **one** manages, and this asks how many work **at once**. Same chemistry, different question\n- And **chewing a hundred times barely helps**, because bonds, cuts per second and enzyme count are all untouched by it. **Crushing does not unjoin.** Smaller pieces matter when an enzyme cannot **reach** the food, and reaching is not what is taking the time\n- So the two halves are different jobs: chewing makes food **reachable**, enzymes make it **usable**\n- **Still standing:** where the 5.6 x 10²² came from, which needs the mole. The 1000 cuts a second is a round figure. And the formula assumed **every enzyme busy every second**, which needs food to be touching it -- so the gut has to keep the two mixed, for hours. **L2B27 is about the hours.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Complete L2C27", nextNodeId: 'complete' }
            ]
        },

        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Chemistry Complete -- How Does Food Become Usable Energy?**\n\nC27 said enzymes cut the joins. This counted the joins, and the count changed the explanation.\n\n**Summary Table:**\n| | C27 said | L2C27 says |\n| --- | --- | --- |\n| What a bond is | a join holding food together | one link between two **glucose** units |\n| How many | -- | about **5.6 x 10²²** in one slice of bread |\n| One enzyme's speed | -- | about **1000** cuts a second |\n| One enzyme alone | -- | **130 times the age of the universe** |\n| The formula | -- | **bonds / (molecules x cuts per second)** |\n| What the body controls | -- | the **number**, not the speed |\n| 3 mg of amylase | -- | **3 x 10¹⁶** molecules, **29 minutes** |\n| Half the enzyme | -- | **twice the time**, not half the glucose |\n| Chewing a hundred times | more surface to work on | changes **none** of the three terms |\n| The division of labour | -- | chewing makes food **reachable**, enzymes make it **usable** |\n\n**The one line to remember:** a slice of bread holds more joins than one enzyme could cut in a hundred ages of the universe, so digestion is not done by fast cutters but by an astronomical number of ordinary ones working at the same moment -- and that is why the body controls how much enzyme it makes rather than how quickly each one works.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}

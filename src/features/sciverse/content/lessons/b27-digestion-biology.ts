import { DialogNode } from '../../types';

/**
 * B27 — Digestive Integration
 * Big Idea 27: "How Does Food Become Usable Energy?"
 *
 * Biology closes the Big Idea, so this lesson ties P27's crushing and C27's
 * cutting together into one line of work.
 *
 * Rewritten for Level 1 (grades 3-5). The first draft named gastrin, secretin
 * and CCK, used bolus, chyme, HCl, bicarbonate, villi, microvilli and lymph,
 * and gave the gut's surface as 250 m2 with nothing to picture it against.
 * Absorption, enzymes, mechanical, nutrient, integration, pipeline and hormones
 * all stay, because the lab prints them; each is explained on first use.
 */
export function getB27Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: `Laid out straight, the tube your food travels down is about **9 metres** long — longer than a bus. Along it sit different body parts, each doing one job and then handing the food on. How do they all keep in step?\n\nIn the two lessons before this one you met the two halves of the work. **P27** was the crushing: teeth and squeezing muscles making crumbs, so there is more surface to work on. **C27** was the cutting: enzymes, the shaped tools that take each **bond** apart — a **bond** being a join holding food together. This lesson is about the two of them working as one line.\n\n**What you will see:**\n- **Body diagram**: the whole tube from mouth to the end, lighting up part by part.\n- **Three dials**: **mechanical** (how well the crushing is going — *mechanical* means to do with pushing and squashing), **enzymes** (how much cutting is going on), and **absorption**. **Absorption** is food passing out of the tube and into your blood, where your body can finally use it. Until that happens, food is still only travelling through you.\n- **Nutrient bar**: how much you actually get out of your dinner. A **nutrient** is any useful part of food, and getting it out is called **nutrient extraction** — to **extract** something is to get it out of whatever it was inside.\n\nHere is the question. If you chew badly, can the rest of the line simply make up for it?`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'bio_answer', label: 'Only partly. Each part is handed what the one before it produced, so a poor start makes more work for everything after it.', nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'independent_answer', label: 'Yes — each part works on its own, so one weak step does not matter.', nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: `There is some making up for it. Swallow food badly chewed and your stomach will churn it for longer, which does help.\n\nBut the parts do not work on their own. They work **in order**, and each one can only start with what the one before it handed over.\n\nThink of a line of people making sandwiches. One slices bread, the next spreads butter, the last cuts them in half. If the slicer is slow, everyone after them stands waiting — and the butterer cannot fix bad slices, because slicing is not their job.\n\nYour tube is that line. Chew badly and the crumbs are too big, so your stomach has to work longer and harder to make up the difference. If your stomach is not sour enough, protein arrives further along still tangled up, and the enzymes there cannot untangle it — untangling was the stomach's job.\n\nSo the line is **joined up**, not a set of separate parts. Whichever stage does worst drags on everything after it.`,
            options: [
                { id: 'cont', label: 'So it is one joined-up line, and a weak step early on costs me later.', nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: `Exactly. The line does three kinds of work, in this order, and your three dials are those three kinds.\n\n1. **Mechanical** — mouth and stomach. Crushing and churning: the **prep** work, meaning getting everything ready for what comes next. What comes out: small crumbs with plenty of surface. This was **P27**.\n2. **Chemical** — stomach and gut, where the real **breakdown** happens. Enzymes cut the **bonds** by adding water at the join. What comes out: pieces small enough to pass through a wall — sugar from starchy food, and the small parts of protein and of fat. This was **C27**.\n3. **Absorption** — the gut. Those small pieces cross the gut wall into your blood.\n\nThat third stage needs a trick, and it is a good one. Your gut wall is not smooth. It is covered in millions of tiny fingers, and each of those is covered in smaller fingers still. All that folding means the inside of your gut has about as much surface as a **badminton court** — folded up and packed into your middle.\n\nAnd this is the same idea as P27, one step further on. Crushing made more surface so enzymes could reach the food. Folding makes more surface so your blood can collect it. Twice, in one meal, the answer is more surface.\n\nPut all three together and the whole thing is one **integration pipeline** — a **pipeline** is a line of stages that hand on to each other, and **integration** means separate parts working as a single whole.`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'mech', label: 'Who does what along the line?', nextNodeId: 'mechanism' }
            ]
        },
        mechanism: {
            id: 'mechanism',
            speaker: 'AI',
            content: `**Every part, and its one job:**\n\n1. **Mouth** — crushing and cutting at the same time. Teeth make crumbs; the enzyme in your spit starts on starchy food. Out comes a soft ball of food.\n2. **Food pipe** — carrying, and nothing else. Rings of muscle squeeze one after another so that a travelling squeeze pushes the ball down to the stomach in about 8 seconds. That travelling squeeze is called **peristalsis**.\n3. **Stomach** — crushing and cutting again. Muscle layers churn while acid untangles protein and an enzyme cuts it into shorter pieces. Food waits here 2 to 5 hours. Out comes a thick soup.\n4. **Liver** — makes a soapy liquid, ready for later. It never touches your food. The liquid is stored nearby until fat arrives and then squirted in to break big fat blobs into tiny droplets.\n5. **Pancreas** — sends in the main set of enzymes, and something else just as important. The soup arriving from the stomach is far too sour for those enzymes to work in, so the pancreas adds a soapy liquid to cancel the acid out. To cancel out an acid like that is to **neutralize** it — the liquid is very close to what is in indigestion medicine, and it does the same job.\n6. **Gut** — the last cuts and all of the **absorption**. This is where the fingery folds are, and where most of what you eat finally crosses into your blood.\n7. **Large gut** — takes back the water. By now the useful parts are gone, so what is left is mostly water, and your body reclaims it rather than wasting it.\n\n**And how does everyone know when to start?** Not by clock, and not by you deciding. Each part sends **hormones** — a **hormone** is a chemical message your body puts into your blood, so that a part somewhere else knows what to do. Food arriving in your stomach sets off a message that tells the pancreas to get its enzymes ready; fat arriving further on sets off a message that calls for the soapy liquid. That is how the parts **coordinate**, which means getting their timing to fit together.\n\n**Try it:** turn the **mechanical** dial right up but the **enzymes** dial right down, and see what you end up getting out.\n\nReady for a checkpoint?`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'mechanism' } },
            options: [
                { id: 'cp', label: 'Test my understanding.', nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: `**Checkpoint:** Suppose the crushing works perfectly — beautifully chewed food, plenty of churning — but there are hardly any enzymes. What do you get out of the meal?`,
            options: [
                { id: 'right', label: 'Very little. Crushing makes surface but cannot cut a single bond, so the pieces stay too big to cross into the blood.', nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: 'Nearly everything — the food is in tiny pieces, so it can soak straight into the blood.', nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: `Here is the thing those two stages do differently. Crushing makes food **smaller**. Enzymes make it **different**.\n\nA crumb of bread is smaller than a slice, but it is still bread. The starch in it is still starch: long chains, far too big to cross the gut wall. Only an enzyme can cut those chains into single sugars, and cutting is the one thing no amount of chewing can do.\n\nIt is like crushing a rock to sand when what you wanted was the gold inside. The sand is beautifully fine. There is still no gold in your hand, because grinding was never going to separate it.\n\nSo you need both, and in order: crushing to open up the surface, then cutting to make the pieces small enough to pass through. Whichever of the two is weakest decides what you get, and the other one cannot cover for it.\n\nThis really happens. Some people cannot make the enzyme that cuts the sugar in milk. Everything else about their digestion works perfectly — but that one sugar goes through uncut and gives them a sore stomach. It is called being **intolerant** to it, which means their body cannot deal with that one thing. One missing tool out of thousands, and you notice.`,
            options: [
                { id: 'retry', label: 'So crushing changes the size and enzymes change the substance — I need both.', nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: `Correct. What each stage hands on becomes what the next one starts with, so the weakest stage sets what the whole line manages. That is a **bottleneck** — the narrow neck of a bottle decides how fast it pours, however wide the rest of the bottle is.\n\nIt cuts both ways, which is worth noticing:\n- Perfect crushing with no enzymes gets you almost nothing. All that surface, and nothing to cut with.\n- Perfect enzymes with no crushing gets you very little either. The best tools in the world, left nibbling at the outside of a lump.\n- Both working, and even a modest amount of each, and you get most of your dinner.\n\nSo the answer to "which stage matters most?" is: the one going worst at the time.`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: 'Show me the big picture.', nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: `**Discovery:** three Big Idea 27 lessons, one line of work.\n\n- **In order**: each part is handed what the one before it made, so the order is not a detail — it is the design\n- **Three kinds of work**: **mechanical** crushing, then chemical cutting, then **absorption** into the blood\n- **Hormones** keep the timing right, sending word ahead so each part is ready before the food arrives\n- **The weakest stage decides** what you get out of a meal, however good the others are\n- **Surface, twice over**: crushed crumbs give enzymes their room, folded gut walls give your blood its room — about a badminton court of it\n- **Nutrient extraction** is the whole point, and the job only **completes** — finishes properly — once the food is in your blood\n\nPhysics makes the crumbs. Chemistry cuts the bonds. Biology puts them in order and keeps time. The three of them **united** are how one bite becomes **cellular** fuel — fuel inside your **cells**, the tiny building blocks you are made of.`,
            options: [
                { id: 'done', label: 'Complete B27', nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: `🔗 **Big Idea 27 Complete — How Does Food Become Usable Energy?**\n\n- **Physics (P27): Mechanical Digestion** — grinding, churning and peristalsis make crumbs with far more surface\n- **Chemistry (C27): Enzyme Chemistry** — amylase, pepsin, trypsin and lipase cut the bonds, each at its own temperature and **pH**\n- **Biology (B27): Digestive Integration** — the parts put crushing, cutting and **absorption** in order, and **hormones** keep them in step\n\n**Summary Table:**\n| Kind of work | Which parts | What it does | What it hands on |\n| --- | --- | --- | --- |\n| Mechanical | Mouth, stomach | Crushes and churns | Crumbs with plenty of surface |\n| Chemical | Stomach, pancreas, gut | Cuts the bonds with water | Pieces small enough to pass a wall |\n| Absorption | Gut, large gut | Takes them into the blood | Fuel your cells can burn |\n\n**Key takeaways:**\n- The line works in order, and a weak early stage costs every stage after it\n- Crushing changes size; enzymes change substance. You need both\n- **Hormones** are messages in the blood, and they are why the parts keep time\n- More surface, twice: crumbs for the enzymes, folds for the blood\n- Food is not really yours until **absorption** — until then it is only passing through\n\n✅ **Lesson B27 Complete!**`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}

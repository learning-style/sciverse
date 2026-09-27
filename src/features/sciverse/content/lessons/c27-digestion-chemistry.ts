import { DialogNode } from '../../types';

/**
 * C27 — Enzyme Chemistry
 * Big Idea 27: "How Does Food Become Usable Energy?"
 *
 * Rewritten for Level 1 (grades 3-5). The first draft used activation energy,
 * denaturation, the Arrhenius principle, hydrophobic interactions, pepsinogen,
 * chymotrypsin, peptidases, triglycerides and macronutrient -- none of it
 * usable at this age. The words the lab prints (enzyme, substrate, hydrolysis,
 * pepsin, trypsin, pH, catalytic cycle) all stay, because a learner reads them
 * off the screen; every one is now explained in plain words first.
 */
export function getC27Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: `Your teeth crush a mouthful of food into crumbs. Good start — but a crumb is still far too big for your body to use. Every piece has to come apart into bits so small you could never see them.\n\nChewing cannot do that. Something else has to.\n\nYour body uses tiny tools called **enzymes**. An **enzyme** is a tool your body builds to take one exact thing apart. Not anything — one thing. The piece of food it works on is called its **substrate**. An enzyme fits its substrate the way one key fits one lock — when it takes hold we say it **binds** to it — and if the shape is wrong, nothing happens at all.\n\n**What you will see:**\n- **Lock and key**: an enzyme closing around its substrate. Only the matching shape fits.\n- **Temperature gauge**: how warm things are. Enzymes work best at **37°C**, which is how warm you are inside. Too cold and they go slow; too hot and they are wrecked.\n- **pH scale**: **pH** is a number for how sour or how soapy a liquid is. Low numbers are sour, like lemon juice. 7 in the middle is plain water. High numbers are soapy. Your stomach is very sour — about **pH** 2. Further along, in your **gut**, it is soapy instead, about **pH** 8.\n- **Enzyme activity**: how much cutting is getting done right now.\n\nOne more word, because the screen uses it. The joins that hold food together have a proper name: each one is a **bond**. When an enzyme cuts food apart it does it by adding water to a bond. Breaking **bonds** apart by adding water is called **hydrolysis**, and it is how nearly all of digestion works.\n\nSo here is the question: why does food not simply fall apart by itself inside you?`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'chem_answer', label: 'Because the joins holding food together are strong. Something has to make the cutting easy, and that is what an enzyme does.', nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'acid_answer', label: 'Stomach acid does the whole job by dissolving everything.', nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: `Stomach acid matters, so this is a good guess. **Acid** is a sour liquid, and your stomach's acid is strong stuff. It does two useful jobs: it makes floppy food parts unravel so they are easier to cut, and it kills most germs that came in with your dinner.\n\nBut acid is blunt. It cannot pick out the one join that needs cutting. Food is held together by particular joins, and acid simply does not know where they are.\n\nThat is the enzyme's job. An enzyme goes to one exact join and nowhere else. Without enzymes, digesting a meal would take **weeks** instead of hours — the joins would come apart eventually, far too late to be any use to you.\n\nSo think of it as teamwork. Acid gets the food ready. Enzymes do the careful cutting.`,
            options: [
                { id: 'cont', label: 'So enzymes are the real scissors, and acid just prepares the food.', nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: `Exactly. And you do not have one enzyme that does everything, because one shape cannot fit everything. You have a set, each for a different part of your dinner.\n\n1. **For starchy and sugary food.** **Carbohydrates** are the starchy and sugary parts of food — bread, rice, potato, fruit. The enzyme that cuts them is called **amylase**, and it starts work in your mouth. That is why a plain cracker slowly turns sweet if you hold it on your tongue: amylase is already cutting the starch into sugar while you wait.\n2. **For protein.** **Protein** is the stretchy, chewy part of food, found in beans, nuts, eggs and cheese. Two enzymes share this job, and they work in different places. **Pepsin** works in your sour stomach, at about **pH** 2. **Trypsin** takes over further along where it is soapy, at about **pH** 8. Swap them round and neither would work at all.\n3. **For fat.** The enzyme for fat is called **lipase**. Fat is awkward, because it clumps into big blobs and lipase can only work on the outside of a blob. So your body first squirts in a soapy liquid that breaks the big blob into thousands of tiny droplets — exactly what washing-up liquid does to greasy water. Thousands of small droplets have far more outside than one big blob, so lipase gets on much faster.\n\nThat is your **disassembly line**: to **disassemble** is to take something apart piece by piece. Each enzyme has one job, one shape, and one place it works best.`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'mech', label: 'Show me one enzyme doing its job.', nextNodeId: 'mechanism' }
            ]
        },
        mechanism: {
            id: 'mechanism',
            speaker: 'AI',
            content: `**Follow your dinner down, and watch who is working where:**\n\n1. **Mouth.** Plain, neither sour nor soapy. **Amylase** in your spit starts cutting starch into sugar, and chewing keeps making more crumbs for it to reach.\n2. **Stomach.** Very sour, around **pH** 2. The acid makes protein unravel from a tight tangle into a loose thread, and **pepsin** cuts that thread into shorter pieces. Notice that pepsin needs the sourness — it would not work in your mouth.\n3. **Gut.** Now soapy, around **pH** 8, because a splash of something soapy is added as food leaves the stomach. **Trypsin** carries on cutting protein, more **amylase** finishes the starch, and **lipase** works through the fat droplets.\n4. **The gut wall.** The last cuts happen right at the wall, by enzymes standing in it. Whatever leaves here is small enough to pass through into your blood.\n\n**And here is the step people miss — the enzyme is not used up.**\n\n1. **The enzyme binds its substrate.** The shape fits, and it closes around it.\n2. **Hydrolysis.** Water is added at the bond, and the bond gives way.\n3. **The pieces leave.** They are called the **products** — what you are left with after the change. The **products** are **released**, which means let go of.\n4. **The enzyme is recycled.** It springs back to its own shape, unchanged and ready, and catches the next piece. The same enzyme can do this thousands of times over.\n\nThat round of work is the **catalytic cycle**. A **catalyst** is something that makes a change happen faster without being used up itself, and a **cycle** is a set of steps that comes back round to the start. An enzyme is a catalyst, which is why a tiny amount of it can get through an entire meal.\n\n**Try it:** find the **temperature** where activity is highest, then push past it and watch what happens.\n\nReady for a checkpoint?`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'mechanism' } },
            options: [
                { id: 'cp', label: 'Test my understanding.', nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: `**Checkpoint:** Warmth usually makes things happen faster. What happens to an enzyme if the **temperature** climbs well past 40°C?`,
            options: [
                { id: 'right', label: 'It stops working. An enzyme only works because of its shape, and too much heat wrecks the shape for good.', nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: 'It works faster and faster, because heat speeds things up.', nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: `Half right, and the half that is wrong matters. Gentle warming really does speed an enzyme up: everything jiggles about more, so enzyme and substrate bump into each other more often.\n\nBut an enzyme works **only** because of its shape. Take the shape away and there is no lock for the key.\n\nYou have watched this happen. Crack an egg into a hot pan: the clear runny part turns white and solid, and it never goes back to runny however long you let it cool. Heat pulled the shapes apart for good. The same thing happens to an enzyme above about 40 to 50°C. Its careful shape falls open, its substrate no longer fits, and the cutting stops. Cooling it down does not mend it.\n\nSo activity climbs as things warm — then falls off a cliff. Best at **37°C**, wrecked not far above.\n\nThis is also why a very high fever is taken seriously. It is not the warmth itself. It is that your enzymes, all of them at once, begin to lose the shapes they need.`,
            options: [
                { id: 'retry', label: 'So it climbs with warmth and then collapses, because the shape is the whole thing.', nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: `Correct. Every enzyme has one **temperature** it likes best — for yours it is **37°C**, which is exactly how warm you keep yourself inside — and one **pH** it likes best.\n\nDraw enzyme activity against temperature and you get a hill, not a slope. Up the near side as warmth gets things bumping into each other more often. Over the top. Then straight down the far side as the shapes fall apart, and that far side does not come back.\n\nWhich explains something about you. Your body works hard to hold its inside temperature almost perfectly steady, whether you are in snow or in sunshine. Now you know what it is protecting. Thousands of different enzymes are working in you at this moment, and every one of them has the same favourite warmth.`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: 'Show me the big picture.', nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: `**Discovery:** digestion is a set of shaped tools, each working in its own place.\n\n- Each **enzyme** cuts one kind of join and ignores everything else\n- Cutting is **hydrolysis**: water is added at a **bond** and the bond gives way\n- **Temperature** and **pH** decide an enzyme's shape, and the shape is the tool\n- Your insides are sour in one place and soapy in the next on purpose, so that different enzymes take their turns in order\n- An enzyme is a **catalyst**: it is not used up, so it works again and again\n- What comes out at the end — sugar, protein pieces, fat pieces — is small enough for a cell to burn for energy\n\nPhysics makes the crumbs. Chemistry cuts the joins. Biology puts the whole line in order.`,
            options: [
                { id: 'done', label: 'Complete C27', nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: `🔗 **Big Idea 27 Complete — How Does Food Become Usable Energy?**\n\n- **Physics (P27): Mechanical Digestion** — chewing and squeezing make crumbs, and crumbs give enzymes more surface to work on\n- **Chemistry (C27): Enzyme Chemistry** — amylase, pepsin, trypsin and lipase cut the joins by **hydrolysis**, each at its own **temperature** and **pH**\n- **Biology (B27): Digestive System** — the organs put the mechanical and chemical stages in the right order\n\n**Summary Table:**\n| Enzyme | What it cuts | Where it works | Sour or soapy | What you get |\n| --- | --- | --- | --- | --- |\n| Amylase | Starchy food | Mouth, then gut | Neither, then soapy | Sugar |\n| Pepsin | Protein | Stomach | Very sour, **pH** 2 | Shorter protein pieces |\n| Trypsin | Protein | Gut | Soapy, **pH** 8 | Smaller pieces still |\n| Lipase | Fat | Gut | Soapy, **pH** 8 | Fat pieces |\n\n**Key takeaways:**\n- One enzyme, one job: the shape decides, and nothing else\n- Water does the breaking, at the **bonds** that hold food together — that is **hydrolysis**\n- **37°C** is the best warmth; well past 40°C the shape is wrecked and does not come back\n- Sour stomach, soapy gut: different rooms for different tools\n- Enzymes are not used up, so a little goes a very long way\n\n✅ **Lesson C27 Complete!**`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}

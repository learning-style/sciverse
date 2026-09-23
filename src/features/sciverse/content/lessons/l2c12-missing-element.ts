import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) companion to C12 "Periodic Table Patterns".
 *
 * C12 said Mendeleev left gaps and predicted the missing elements. This lesson
 * does the predicting: estimate = the average of the four neighbours in the
 * table. Worked on the gap below silicon: mass (28.1 + 118.7 + 69.7 + 74.9)/4
 * = 72.9 against germanium's real 72.6, and density 5.32 against 5.32.
 *
 * Frame of reference stated: the four neighbours above, below, left and right.
 * Condition stated: the properties must change smoothly across that patch of
 * the table. The checkpoint breaks the mass order at tellurium and iodine,
 * naming the deeper rule -- protons and electrons -- as held fixed for Level 3.
 */
export function getL2C12Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "C12 told one of science's boldest stories. In **1869**, Mendeleev sorted the known elements and found gaps where no element was known. Rather than closing the gaps, he left them open -- and wrote down what the missing elements would be like.\n\nYears later they were found, and his predictions were close.\n\nTwo words for the dials under the picture.\n\nA **period** is one across-the-page row of the periodic table, so the **hidden element's period** is which row the gap sits in. **Neighbours used** is how many of the elements surrounding that gap you average together to predict it.\n\nHow could anyone describe an element that nobody had ever seen?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "From its neighbours. Properties change smoothly across the table, so an element in a gap should sit between the ones above, below and beside it -- roughly their average.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "He couldn't. He must have guessed, and got lucky when something turned up.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "A lucky guess would not have named an element's mass, its density, and the formulas of its compounds -- all close to right.\n\nHere is what Mendeleev could see. Read **down** a column, and the atoms get steadily heavier. Read **across** a row, the same. The numbers change **smoothly**, like heights marked on a staircase.\n\nIf you know the step below and the step above, you know roughly where the missing step sits. That is not luck: it is reading a pattern.\n\nAnd that is the test of any pattern worth trusting. A pattern that only describes what you already know is a summary. A pattern that tells you something you have **not** seen yet is a rule.",
            options: [
                { id: 'cont', label: "Show me how to read the step.", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Estimating a value **between** known values is called **interpolation**.\n\nIn the periodic table, every gap has neighbours. The frame of reference is the four elements around it:\n\n- the one **above** and the one **below**, in the same column\n- the one **to the left** and the one **to the right**, in the same row\n\n**estimate = (above + below + left + right) / 4**\n\nThe numerator adds the four neighbours' values; the denominator is 4, because there are four of them.\n\nYou can do this with any property that has numbers: **relative atomic mass** (from L2C2, how heavy the atoms are compared with each other, with no units) or **density** in g/cm³.\n\nThe condition belongs here. **The property must change smoothly across that patch of the table.** Where the pattern jumps, the average is wrong. In Mendeleev's day the noble gases had not been discovered at all -- an entire missing column that nobody had allowed for.",
            options: [
                { id: 'cont', label: "Predict the element below silicon.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "Mendeleev's most famous gap sat **below silicon**. He called the missing element **eka-silicon**. Its neighbours:\n\n| | Above: Si | Below: Sn | Left: Ga | Right: As |\n| --- | --- | --- | --- | --- |\n| Relative atomic mass | 28.1 | 118.7 | 69.7 | 74.9 |\n| Density, g/cm³ | 2.33 | 7.29 | 5.91 | 5.73 |\n\n**Its mass:**\n\n**Step 1.** add: 28.1 + 118.7 + 69.7 + 74.9 = **291.4**\n\n**Step 2.** divide by 4: 291.4 / 4 = **72.9**\n\n**Its density:**\n\n**Step 1.** add: 2.33 + 7.29 + 5.91 + 5.73 = **21.26**\n\n**Step 2.** divide by 4: 21.26 / 4 = **5.32 g/cm³**\n\nIn **1886**, seventeen years later, Clemens Winkler found the missing element and named it **germanium**.\n\n| | Predicted here | Germanium, measured |\n| --- | --- | --- |\n| Relative atomic mass | **72.9** | **72.6** |\n| Density | **5.32 g/cm³** | **5.32 g/cm³** |\n\nThe mass estimate is out by 0.3, which is **0.4%**. A gap in a table described an element that nobody had ever held.",
            options: [
                { id: 'try', label: "Let me predict one.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** Cover up **selenium** and predict it from its neighbours:\n\n- above, sulfur: **32.1**\n- below, tellurium: **127.6**\n- left, arsenic: **74.9**\n- right, bromine: **79.9**\n\nWhat relative atomic mass does the four-neighbour average predict? (Selenium's real value is 79.0.)",
            options: [
                { id: 'right', label: "About 78.6. The four add to 314.5, and 314.5 / 4 = 78.6 -- within half a unit of the real 79.0.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'sum', label: "About 314.5, the four neighbours added together.", nextNodeId: 'math_wrong' },
                { id: 'two_light', label: "About 53.5, the average of the two lightest neighbours, 32.1 and 74.9.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**314.5** is the total, not the average. An estimate has to sit **between** the neighbours, and 314.5 is heavier than all four.\n\n**53.5** used only the two lightest neighbours. Leaving out the heavy one below, tellurium, drags the estimate far too low. The element sits between **all four**, so all four count.\n\n**Step 1.** 32.1 + 127.6 + 74.9 + 79.9 = **314.5**\n\n**Step 2.** 314.5 / 4 = **78.6**\n\nSelenium's real value is 79.0, so the estimate is out by 0.4 -- about **0.5%**.",
            options: [
                { id: 'retry', label: "Add all four, then divide by 4.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials, for a gap in the column that holds carbon, silicon, germanium, tin and lead.\n\n**Hidden Element's Period** picks which row's element to hide: period 3 hides silicon, period 4 hides germanium, period 5 hides tin. **Neighbours Used** is how many neighbours go into the average: 2 uses only the ones above and below, and 4 adds the ones to the left and right.\n\nThe lab hides that element, averages the neighbours you chose, and compares the estimate with the real value.\n\nTry this:\n\n- Hide **period 4** (germanium) with **4** neighbours: the estimate is 72.9 against 72.6\n- Switch to **2** neighbours: above and below alone give a worse answer\n- Hide **period 3** (silicon). The estimate is far out -- the rows above and below it are not the same length, so the pattern does not change smoothly there",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Average the neighbours. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** Mendeleev sorted his table by atomic mass. But he met a problem.\n\n**Tellurium** has a mass of **127.6**, and **iodine 126.9** -- so by mass, iodine should come **first**. Yet iodine behaves just like chlorine and bromine, and tellurium behaves like sulfur.\n\nMendeleev put tellurium first anyway, breaking his own mass order. Was he wrong?",
            options: [
                { id: 'right', label: "No. The properties repeat more reliably than the masses, so the pattern of behaviour is the better guide. Later, scientists found the real rule -- the number of protons, 52 for tellurium and 53 for iodine -- which puts them in exactly the order Mendeleev chose.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Yes. The table is sorted by mass, so iodine must come first, whatever its properties look like.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Follow that rule and see where it leads. Iodine would sit in the column with oxygen and sulfur, and tellurium with chlorine and bromine.\n\n| Element | Mass | Behaves like | Column it belongs in |\n| --- | --- | --- | --- |\n| Tellurium | 127.6 | sulfur | with oxygen and sulfur |\n| Iodine | 126.9 | chlorine, bromine | with the halogens |\n\nIodine would then be expected to react like sulfur -- and it does not. The table would make wrong predictions about both elements.\n\nMendeleev trusted the **pattern of properties** over the masses, and the swap stayed. In **1913**, Henry Moseley measured the elements with X-rays and found the number that really orders them: the **number of protons** in the nucleus, the atomic number. Tellurium has 52 and iodine 53.\n\nThe mass was a good stand-in. It was not the rule.",
            options: [
                { id: 'retry', label: "Properties first; protons explain why.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **A pattern is worth trusting when it predicts things you have not seen -- and worth questioning where it breaks.**\n\nBoth happened here. The pattern was strong enough to describe germanium seventeen years early, and its one stubborn exception pointed the way to the deeper rule.\n\nOne thing this lesson held fixed: **the table was a pattern to copy, not a rule to explain.** Averaging neighbours says nothing about **why** elements repeat every 2, then 8, then 8. Level 3 finds the rule underneath -- how electrons fill their shells -- and uses it to say how long each row must be.\n\nB12 said natural selection changes a population over generations. B12 at Level 2 works out how fast.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "A pattern that predicts!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You predicted an element nobody had seen.**\n\n- **Interpolation** estimates a value between known values\n- Frame of reference: the four neighbours **above, below, left and right**\n- **estimate = (above + below + left + right) / 4**\n- Condition: the property must change smoothly across that patch of the table\n- Works for **relative atomic mass** (no units) and **density** in g/cm³\n- The gap below silicon: (28.1 + 118.7 + 69.7 + 74.9) / 4 = **72.9**\n- Its density: 21.26 / 4 = **5.32 g/cm³**\n- **Germanium**, found in 1886: mass **72.6**, density **5.32 g/cm³**\n- Selenium from its neighbours: 314.5 / 4 = **78.6**, against a real 79.0\n- Tellurium (127.6) sits before iodine (126.9), breaking the mass order\n- The real order is the **number of protons**: 52 and 53\n- Held fixed: the table as a pattern to copy, not a rule to explain",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Add four, divide by four!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- Predicting a Missing Element!**\n\nC12 said Mendeleev left gaps. Level 2 fills one in.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Interpolation | between known values | Read the missing step |\n| The rule | **(above + below + left + right) / 4** | Average the four neighbours |\n| Eka-silicon's mass | 291.4 / 4 | **72.9** against germanium's 72.6 |\n| Its density | 21.26 / 4 | **5.32 g/cm³**, exactly right |\n| Selenium | 314.5 / 4 | **78.6** against 79.0 |\n| Condition | a smooth patch of table | Fails where rows change length |\n| Tellurium and iodine | 127.6 before 126.9 | Properties beat mass order |\n| The real rule | the number of protons | 52 before 53 |\n\n**The one line to remember:** a pattern you can average is a pattern you can predict with -- and the place it breaks is where the deeper rule shows through.\n\n**Up next:** B12 -- how fast a trait can spread through a population."
        }
    };
}

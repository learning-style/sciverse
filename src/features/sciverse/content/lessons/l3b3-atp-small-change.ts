import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 3, biology. The synthesis lesson.
 *
 * L2B3 treated glucose as the energy that feeds life. This removes that
 * simplification: no cell spends glucose's energy directly, because a single
 * release would scatter into heat that a cell at 37 C cannot use (L3P3). Life
 * catches it chemically instead, in ATP.
 *
 * It corrects the "high-energy bond" shorthand with L3C3's rule, and finally
 * explains L3B1's 25% muscle efficiency from the chemistry up -- which L3P3
 * showed cannot be a heat-engine limit.
 */
export function getL3B3Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2B3 followed sunlight into a leaf and found about 1% of it stored as **glucose**. Every living thing runs on that glucose, or on something built from it.\n\nL2C3 could burn glucose in a calorimeter. Broken down completely, it releases about **2,870 kJ for every mole** -- about 16 kJ per gram.\n\nNow a strange fact. **No cell in your body burns glucose.** In a flame all 2,870 kJ come out at once. Your cells take the same glucose apart in something like **twenty separate steps**, slowly.\n\nIf the total energy is the same either way, why go to all that trouble?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Because one burst of 2,870 kJ would all turn into heat. The cell needs the energy in small amounts it can actually catch and spend on its jobs.", nextNodeId: 'atp', sentiment: 'positive' },
                { id: 'bad', label: "Because a cell is too small to hold a flame, so it has no choice but to do it slowly.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Size is not the obstacle -- plenty of cellular chemistry is fast and fierce. The obstacle is **what the energy can be used for**.\n\nL3P3 gave you the key. Energy released all at once, in a disorganised rush, scatters into heat, and heat can only be turned back into work across a temperature difference. **A cell at 37 °C has almost no temperature difference to work with.** Burned glucose would simply warm it, and warming is nearly all it would get.\n\nSo a cell cannot let the energy go as heat first and use it later. It has to catch the energy **in the act of release**, in a chemical form it can carry to wherever work is needed.\n\nThere is a size problem too, though not the one you suggested. The jobs a cell does -- pushing one ion across a membrane, moving one muscle protein one step -- each need roughly **30 to 50 kJ per mole**. A 2,870 kJ lump is about a hundred times too big to spend on any of them.",
            options: [
                { id: 'cont', label: "So the cell needs the energy broken into job-sized pieces?", nextNodeId: 'atp' }
            ]
        },
        atp: {
            id: 'atp',
            speaker: 'AI',
            content: "Exactly, and the piece it uses is always the same molecule: **ATP**, short for **adenosine triphosphate**.\n\nThink of glucose as a **large banknote** and ATP as **coins**. You cannot buy a single stamp with a large note; you need change. A cell's jobs are all stamp-sized, so it converts its glucose into a pocketful of ATP coins and spends them one at a time. That is how life pays for everything: in small change.\n\nSpending one works like this. ATP reacts with water and loses one of its three phosphate groups, becoming **ADP** (adenosine *di*phosphate). Under **standard laboratory conditions** that releases about **30.5 kJ per mole**.\n\nThe cell then recharges ADP back into ATP using energy from the next step of breaking glucose down, and spends it again. **The same ATP is recycled constantly** -- you turn over roughly your own body mass of it every day, while holding only a few grams at any moment.\n\nNow the arithmetic. Fully breaking down one mole of glucose makes about **30 moles of ATP**:\n\n30 x 30.5 = **915 kJ** caught as ATP\n915 / 2,870 = **0.32**\n\nSo about **32%** of the glucose's energy is caught in a usable form. The other **68%** is released as heat along the way.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** Suppose a cell makes **36 ATP** from each mole of glucose, each worth **30.5 kJ/mol**, from glucose releasing **2,870 kJ/mol**.\n\nWhat percentage of the glucose's energy is caught in ATP, and how much becomes heat?",
            options: [
                { id: 'right', label: "About 38%, with about 1,772 kJ as heat. 36 x 30.5 = 1,098 kJ caught; 1,098 / 2,870 = 0.38; 2,870 − 1,098 = 1,772 kJ.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'no_divide', label: "1,098%, since 36 x 30.5 = 1,098.", nextNodeId: 'math_wrong' },
                { id: 'swapped', label: "About 62% caught, from 1 − 1,098 / 2,870.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**1,098%** stopped at the multiplication. 1,098 is a number of **kilojoules**, not a percentage. To turn it into a share of the whole you divide by the whole: 1,098 / 2,870 = **0.383**, so **38%**.\n\nA sense check catches this instantly. A cell cannot catch more than all of the energy, so no answer can go past 100%.\n\n**62%** has correct arithmetic and the wrong label. 0.62 is 1 − 0.38, which is the share that became **heat**, not the share that was caught. Always check which piece of the whole a fraction describes.\n\nCaught: 36 x 30.5 = **1,098 kJ**, which is **38%**\nHeat: 2,870 − 1,098 = **1,772 kJ**, which is 62%",
            options: [
                { id: 'retry', label: "Divide by the whole, and check which share it is.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials.\n\n**ATP per Glucose** is how many ATP one mole of glucose is turned into. **Energy per ATP** is how much each one releases when it is spent, in kJ/mol.\n\nThe lab splits glucose's 2,870 kJ into the share caught as ATP and the share released as heat.\n\nStart at **30** ATP and **30.5** kJ/mol, the textbook values, and you should see about **32%**.\n\nNow raise **Energy per ATP** towards **50**. That is not a made-up setting -- the checkpoint explains why a real cell sits much nearer 50 than 30.5, and what that does to the share caught.\n\nAnd watch the heat. Whatever is not caught is not lost -- it warms you. That warmth is why you get hot when you exercise, and why a mammal can hold its body at 37 °C at all.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Caught, or warming me. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** Many textbooks say ATP stores energy in a special **\"high-energy bond\"** between its phosphate groups, and that **breaking that bond releases the energy**.\n\nUsing what L3C3 established about breaking and making bonds, what is wrong with that description?",
            options: [
                { id: 'right', label: "Breaking any bond costs energy, that one included. The energy released comes from the new, more stable bonds and attractions that form afterwards, so the release belongs to the whole reaction, not to breaking one bond.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Nothing. ATP's phosphate bond is an exception, and unlike ordinary bonds it releases energy when it breaks.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "L3C3's rule has no exceptions, and ATP is not one. **Breaking a bond always costs energy**, including the bond to ATP's last phosphate.\n\nSo why does spending ATP release 30.5 kJ/mol? Do L3C3's bookkeeping. The reaction is ATP + water → ADP + phosphate. Bonds are broken, and that is a cost. Then new bonds and attractions form: the freed phosphate settles into a far more stable arrangement, and both products hold on to the surrounding water much more strongly than ATP did. **That making releases more than the breaking cost**, and the difference is the 30.5 kJ.\n\nThe release belongs to the **whole reaction**, not to one bond. \"High-energy bond\" is a shorthand that has stuck in biology, and it does real harm: it teaches exactly the backwards picture L3C3 set out to correct.\n\nAnd once you see it that way, something follows. Because the energy comes from how the whole mixture settles, it depends on **how much** ATP, ADP and phosphate are present. The 30.5 kJ/mol is for standard laboratory conditions. Inside a living cell ATP is kept far more concentrated than ADP, and under those conditions spending one releases closer to **50 kJ/mol**.\n\nRedo the catch: 30 x 50 = 1,500 kJ, and 1,500 / 2,870 = **about 52%**. **A real cell catches about half of its glucose's energy**, not a third.",
            options: [
                { id: 'retry', label: "Breaking costs; the release is the whole reaction, and it depends on conditions.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **ATP releases energy as a whole reaction, not by breaking a bond -- and how much depends on the conditions.** In a real cell each ATP gives about **50 kJ/mol**, so about **52%** of glucose's energy is caught.\n\nAnd now a number outstanding since Big Idea 1 finally gets its explanation. **L3B1 said muscle is about 25% efficient.** L3P3 then showed muscle cannot be a heat engine: at body temperature the ceiling would be about 3%, and muscle does eight times better. Muscle turns chemical energy into work **directly**, never passing through heat first.\n\nSo where does 25% come from? From two catches in a row:\n\n- Glucose to ATP catches about **half** -- the 52% you just worked out\n- ATP to movement, inside a muscle protein, catches about **half** again\n\n0.52 x 0.5 = **about 26%**. There is L3B1's 25%, built from the chemistry up.\n\nNotice what this does **not** do. It does not break the second law -- about three quarters of the energy still ends up as heat. Life simply never routes its energy through heat on the way, so the heat-engine ceiling never applies to it.\n\nThat is Big Idea 3 at Level 3:\n\n- **L3P3** -- energy is conserved but scatters, so a heat engine is capped at **1 − Tc/Th**\n- **L3C3** -- a fuel's energy is **bonds formed minus bonds broken**, and breaking always costs\n- **L3B3** -- life sidesteps the heat-engine ceiling by catching energy **chemically**, in ATP-sized coins\n\nAnd the simplification still standing: **\"30 ATP per glucose\" is itself an estimate.** The true count depends on how leaky the membranes inside the cell's energy-converting compartments are, and textbooks have quoted anything from 30 to 38 over the years. It is still being argued about.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Catch it chemically, in ATP-sized pieces!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found how life spends its energy.**\n\n- No cell burns glucose; it takes it apart in about **twenty steps**\n- One release would scatter into heat, and a cell at 37 °C has almost no temperature difference to use\n- A cell's jobs each need about **30 to 50 kJ/mol**; glucose releases **2,870 kJ/mol**\n- **ATP** is the cell's small change: glucose is the banknote, ATP the coins\n- Spending ATP gives **ADP**, releasing **30.5 kJ/mol** under standard conditions\n- ATP is recycled -- roughly your own body mass of it every day\n- **30 x 30.5 = 915 kJ**, so about **32%** caught under standard conditions\n- \"High-energy bond\" is backwards: breaking always costs, the release comes from what forms\n- In a real cell each ATP gives about **50 kJ/mol**, so about **52%** is caught\n- Muscle is **not** a heat engine -- the ceiling at body temperature would be about 3%\n- Muscle's **25%** is about half (glucose to ATP) times about half (ATP to movement)\n- What is not caught becomes heat, which is why exercise warms you\n\nBig Idea 3 is complete at Level 3.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Half, then half again -- that is the 25%!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- Why Life Pays in Small Change!**\n\nL2B3 treated glucose as the energy life runs on. Level 3 finds that no cell spends it that way -- and in finding out why, explains a number that has been waiting since Big Idea 1.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| No cell burns glucose | about 20 steps | Catch energy as it is released |\n| Job-sized energy | 30–50 kJ/mol per job | 2,870 kJ is a hundred times too big |\n| **ATP** | the cell's small change | Spent, recharged, spent again |\n| Standard conditions | 30 x 30.5 = **915 kJ** | About **32%** of 2,870 |\n| Not a high-energy bond | breaking still costs | The release is the whole reaction |\n| In a real cell | about **50 kJ/mol** per ATP | About **52%** caught |\n| Muscle is not a heat engine | the ceiling would be ~3% | It works directly on chemistry |\n| L3B1's 25% | 0.52 x 0.5 | Two catches in a row |\n| Still uncertain | 30 to 38 ATP per glucose | Still being argued about |\n\n**The one line to remember:** a cell never lets its fuel turn to heat first -- it catches the energy in ATP-sized pieces, which is how living things sidestep the ceiling that holds every heat engine.\n\n**Big Idea 3 is complete at all three levels.**"
        }
    };
}

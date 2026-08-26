import { DialogNode } from '../../types';

export function getB41Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "Two brown-eyed parents can have a blue-eyed child. It does not happen often -- but it happens.\n\nThat seems impossible. Where would the blue come from, if neither parent shows it?\n\nWhat do you think decides which traits a child ends up with?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Each parent carries two hidden instructions and passes on one at random, so some combinations only show up sometimes.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'bad', label: "A child is simply a blend of the two parents, so two brown-eyed parents can only make brown eyes.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Blending sounds sensible, but it cannot be right -- if traits blended, a blue-eyed child could never appear from brown-eyed parents at all.\n\nWhat actually happens is that each parent carries **two copies** of each instruction, called **genes**. A parent can have one brown copy and one blue copy and still look brown, because brown is **dominant** and hides the blue.\n\nWhen that parent has a child, they pass on **one copy chosen at random**. If both parents happen to pass their hidden blue copy, the child has two blues and blue eyes appear.",
            options: [
                { id: 'cont', label: "So the blue instruction was hidden in both parents all along?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! Inheritance is a game of chance played with **genes**:\n\n1. You carry **two copies** of each gene, one from each parent\n2. A **dominant** copy shows even when paired with a hidden one\n3. A **recessive** copy only shows when there are **two** of them\n4. Each parent passes on **one copy at random**\n\nIf both parents carry one brown and one hidden blue, there are four equally likely combinations. Only one of the four gives two blues -- so roughly **1 child in 4** has blue eyes.\n\n**1 in 4 is the same as 25%**, and 25% is the number the chart compares against. Each dot in the picture is one child: **brown** for brown eyes, **blue** for blue eyes.\n\nRemember **P41 Rolling the Dice**? For one family that 1-in-4 means very little. Across hundreds of children the pattern shows up clearly.\n\nSlide **Number of Children** and watch how close the blue share gets to 25%!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Let me see the pattern appear across many families!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** Two parents each carry one brown and one hidden blue instruction. Their first three children all have brown eyes.\n\nWhat is the chance the fourth child has blue eyes?",
            options: [
                { id: 'right', label: "Still about 1 in 4 -- each child is a fresh, independent roll of the dice.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Higher than 1 in 4, because a blue-eyed child is now overdue.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "This is the same trap as the dice in **P41** -- genes have no memory!\n\nEach child gets a fresh random copy from each parent. The three brown-eyed children before do not change what gets passed on next time. The chance stays at roughly **1 in 4** for every single child.\n\nIt is entirely possible for these parents to have four brown-eyed children, or four blue-eyed ones. The 1-in-4 ratio describes what happens **across many families**, not what any one family must get.\n\nThat is exactly why scientists study large numbers of cases rather than a single one.",
            options: [
                { id: 'retry', label: "Oh -- each child is an independent roll, just like the dice!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! **Every child is an independent event.**\n\nLook how all three lessons in Big Idea 41 are one idea in different clothes:\n- **P41** -- one dice roll is unpredictable; a thousand rolls form a pattern\n- **C41** -- one collision is luck; billions give a steady reaction rate\n- **B41** -- one child is a coin flip; many families show a clear ratio\n\nProbability never tells you what happens next. It tells you what to expect **in the long run** -- and that is enough to run science, medicine and weather forecasting.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Chance rules the single case; patterns rule the crowd!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered how chance shapes inheritance!**\n\n- You carry **two copies** of each **gene**, one from each parent\n- A **dominant** copy hides a **recessive** one\n- A recessive trait needs **two** copies to show\n- Each parent passes on one copy **at random**\n- Two carrier parents give roughly a **1 in 4** chance of the hidden trait\n- Each child is **independent** -- genes have no memory\n\nP41 rolled the dice, C41 counted lucky collisions, and B41 showed chance choosing your traits!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Probability decides the one, patterns describe the many!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Big Idea 41 -- B41 Complete!**\n\nChance and Inheritance -- How Do Patterns and Probability Guide Decisions?\n\nThe same rule runs through dice, chemistry and families: unpredictable one at a time, dependable in bulk.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| Two copies of every gene | One from each parent | Traits can stay hidden |\n| Dominant hides recessive | **Dominant** and **recessive** | Explains surprise traits |\n| Roughly 1 in 4 for carriers | A predictable ratio | Used by genetic counsellors |\n| Each child is independent | Genes have **no memory** | Nothing is ever overdue |\n\n**Big Idea 41 connections:**\n- P41 (Rolling the Dice) showed how many random tries create a reliable pattern\n- C41 (Lucky Collisions) showed how billions of chancy bumps give a steady reaction rate\n- B41 (Chance and Inheritance) showed how the very same rule decides which traits appear in a family!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}

import { DialogNode } from '../../types';

export function getC43Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "A bike helmet feels light and a bit flimsy. Squeeze it and the inside is soft white foam that you could dent with your thumb.\n\nThat seems like the worst possible thing to protect a skull. Surely a helmet should be made of something **hard**?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "The foam is meant to be crushed -- crushing it slowly is what stretches out the stop and softens the blow.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'bad', label: "The foam is just padding for comfort; the hard outer shell does all the protecting.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "The hard shell matters, but it is not the part that saves you. It spreads the hit out and stops sharp objects poking through -- and that is about all.\n\nThe **foam** does the real work. In **P43 Softening the Blow** you found that a longer stop means a smaller force. The foam is what provides that longer stop.\n\nWhen your head hits, the foam **crushes** and keeps crushing for a few centimetres. Those centimetres are the extra stopping distance. Without them your skull would stop as fast as the shell does -- almost instantly.",
            options: [
                { id: 'cont', label: "So the foam being crushable is the whole point?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! A protective material has to do a very specific job:\n\n1. **Crush slowly** as the force arrives, not shatter or bounce\n2. **Stay crushed**, so the stop keeps being stretched out\n3. **Absorb the energy** instead of returning it\n\nThat last point is why a helmet is not made of rubber. Rubber is springy -- it squashes and then **pushes straight back**, throwing your head the other way. Scientists call a material that gives its energy back **elastic**.\n\nHelmet foam is the opposite. It crushes once, absorbs the energy, and stays crushed. That is why **a helmet is single-use** -- after one real crash the foam has already done its job.\n\nIn the picture, the **crush bar** shows how much foam is being used up, and the **head force** shows what reaches your skull.\n\nSlide **Foam Thickness** and find what actually protects!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Let me test different foam thicknesses!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** A rider crashes, the helmet looks fine from the outside, and the shop tells them to replace it anyway.\n\nIs the shop being honest?",
            options: [
                { id: 'right', label: "Yes -- the foam inside has already crushed, so it cannot stretch out a second stop.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "No, it is a sales trick. If the shell is not cracked the helmet is still fine.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "It genuinely is not a trick -- and this is one of the most useful things to know about safety gear.\n\nThe foam protects by **crushing**, and crushed foam cannot crush again. It has already used up the stopping distance it had. From the outside the helmet looks perfect, because the hard shell is not the part that was consumed.\n\nA crashed helmet still fits, still looks right, and will do far less in a second crash. This is exactly the same reason a car with a folded **crumple zone** is written off even when it drives.\n\nProtective materials are designed to be **used once**.",
            options: [
                { id: 'retry', label: "Oh -- crushed foam cannot crush again!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! **Protection is spent, not permanent.**\n\n- The **shell** spreads the hit and resists sharp objects\n- The **foam** crushes to provide the stopping distance\n- **Elastic** materials give energy back, which is the wrong behaviour here\n- Once crushed, the foam is finished -- replace the helmet\n\nThicker foam gives more stopping distance -- but the helmet also has to be **wearable**. Too thick and it becomes heavy and **bulkier** than anyone wants on their head, and a helmet left at home protects nobody. Real designs are always a **trade-off** -- that means you cannot have everything at once, so you give up a little of one thing to gain another. Here it is protection traded against wearability.\n\nIn B43 you will see the same trade-off thinking applied to the whole human body!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Crushable beats hard, and it only works once!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered what makes a material protective!**\n\n- The hard **shell** spreads the hit; the **foam** does the protecting\n- Good protective foam **crushes slowly** and **stays crushed**\n- That crushing is the extra stopping distance from P43\n- **Elastic** materials spring back and are the wrong choice\n- A crushed helmet cannot protect again -- replace it after a crash\n- Thicker foam protects more, but weight and size limit it\n\nNext in B43: designing for real bodies, not average ones!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "A helmet works by being destroyed!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**C43 Complete -- Materials That Protect!**\n\nThe soft part of a helmet is the part that saves you.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| Foam does the protecting | The shell only spreads the hit | Soft is not weak |\n| Good foam crushes and stays crushed | It provides stopping distance | Links straight to P43 |\n| Springy is the wrong behaviour | **Elastic** returns the energy | Rubber would be worse |\n| Protection is used up | Replace a crashed helmet | It still looks fine |\n\n**Up next:** B43 (Designed for Everyone) -- why the average person does not exist!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}

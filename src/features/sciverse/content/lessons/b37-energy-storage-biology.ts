import { DialogNode } from '../../types';

export function getB37Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "You eat a few times a day, but your heart beats and your brain thinks **every second**, including all night while you sleep.\n\nSo your body faces exactly the problem from **P37** and **C37**: energy arrives in bursts, but it is spent continuously. Your body must store it.\n\nAnd it does not use one storage system -- it uses **two**. Why do you think that is?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'two', label: "One store is quick to reach but small, and the other is slow to reach but holds far more.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'backup', label: "The second one is just a spare copy, in case the first one stops working.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "They are not spare copies -- they are **completely different tools for different jobs**.\n\nYour body stores energy two ways:\n\n**Glycogen** is fast. It sits in your muscles and liver, ready to convert to fuel in seconds. But you can only hold about **2,000 calories** of it -- less than one day's supply.\n\n**Fat** is slow but enormous. It takes minutes to start using, but a typical adult carries over **100,000 calories** of it -- enough to survive weeks without eating.\n\nThis is exactly the trade-off from **P37**: the flywheel that releases energy in seconds versus the mountain lake that holds vastly more.",
            options: [
                { id: 'cont', label: "So one is fast and small, the other slow and huge?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! Here is what happens when you eat a meal:\n\n1. Food is broken down into **glucose** (a simple sugar) and enters your blood\n2. Cells use what they need **right now** for immediate energy\n3. Extra glucose is packed into **glycogen** -- the fast store in muscles and liver\n4. Once the glycogen stores are full, the rest is converted into **fat** -- the long-term store\n5. Between meals, you unpack these in order: glycogen first, then fat\n\nWhy is fat the deep store? Because it is **energy-dense**. One gram of fat holds more than **twice** the energy of one gram of sugar or protein. Storing your reserves as fat means carrying half the weight around -- an enormous advantage for any animal that has to move.\n\nSlide **Food Energy In** and watch both stores fill up and empty!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Let me watch the two stores fill and empty!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** A runner skips breakfast and heads out for a long run. She feels strong for the first 30 minutes, then suddenly feels drained and heavy -- runners call this \"hitting the wall.\"\n\nWhat happened inside her body?",
            options: [
                { id: 'right', label: "Her fast glycogen store ran out, and her body had to switch to fat, which releases energy much more slowly.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "She completely ran out of stored energy, so her body had nothing left to burn at all.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "She has plenty of energy left -- she is carrying tens of thousands of calories in **fat**. The problem is not *how much*, it is **how fast**.\n\nRunning hard demands energy quickly, and only **glycogen** can deliver it that fast. After roughly 90 minutes of hard exercise, the glycogen tank is empty. Her body switches to fat, which works fine -- but fat releases energy too slowly to keep up with a fast pace.\n\nSo she has to slow down. That heavy, drained feeling is the switch between storage systems.\n\nThis is exactly why athletes eat carbohydrates before a race: they are **topping up the fast store**, not the big one.",
            options: [
                { id: 'retry', label: "Oh -- she has energy left, but it comes out too slowly!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! **Storage capacity and delivery speed are two different things** -- in bodies and in machines alike.\n\nWatch how the whole Big Idea lines up:\n\n| Fast and small | Slow and huge |\n| --- | --- |\n| **P37:** flywheel | **P37:** pumped hydro lake |\n| **C37:** battery for a phone | **C37:** fuel for a power station |\n| **B37:** **glycogen** | **B37:** **fat** |\n\nEvery good energy system, living or built, keeps **both**. One for the sudden demand, one for the long haul.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Every energy system needs a fast store and a big store!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered how your body stores energy!**\n\n- Food becomes **glucose**, which cells use immediately\n- Extra glucose is packed into **glycogen** -- fast but only about 2,000 calories\n- Once glycogen is full, the rest becomes **fat** -- slow but over 100,000 calories\n- **Fat** holds more than twice the energy per gram, so it is lighter to carry\n- Your body empties glycogen first, then fat\n- \"Hitting the wall\" is the switch between the two stores\n\nP37 stored energy with height, C37 stored it as chemistry, and B37 showed your body doing both tricks at once!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "My body runs a fast store and a big store!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Big Idea 37 -- B37 Complete!**\n\nYour Body's Battery -- How Do We Store Energy for Later?\n\nEvery energy system solves the same puzzle: energy arrives in bursts but is spent continuously.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| Food becomes **glucose** | Immediate fuel for cells | Powers you right now |\n| Extra becomes **glycogen** | Fast store, about 2,000 calories | Ready in seconds |\n| Then it becomes **fat** | Slow store, over 100,000 calories | Survive for weeks |\n| Fat is energy-dense | Twice the energy per gram | Lighter to carry around |\n\n**Big Idea 37 connections:**\n- P37 (Save It for Later) showed how pumping water uphill stores energy as height\n- C37 (Inside a Battery) showed how batteries store a chemical reaction waiting to happen\n- B37 (Your Body's Battery) showed how you store energy two ways at once -- fast glycogen and huge fat reserves -- exactly the trade-off engineers face!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}

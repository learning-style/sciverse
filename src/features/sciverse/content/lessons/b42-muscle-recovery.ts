import { DialogNode } from '../../types';

export function getB42Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "Here is something that sounds backwards: **you do not get stronger while you train**.\n\nDuring a hard session your muscles actually end up slightly **weaker** than when you started. The strength arrives later, on the days you rest.\n\nHow can resting make you stronger?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Training creates tiny damage, and the body repairs it slightly stronger than before -- but only while you rest.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'bad', label: "Muscles grow during the workout itself, so more training always means more strength.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "If training alone built muscle, the athletes who trained hardest and rested least would be the strongest. In reality they are usually the most **injured**.\n\nHard exercise causes **microtears** -- damage far too small to see or feel individually. Your body treats that damage as a message: *this muscle needs to be tougher next time*.\n\nThe rebuilding happens afterwards, mostly while you sleep. Your body repairs the fibres and adds a little extra, so the muscle comes back slightly stronger. That is called **adaptation** -- and it needs time.",
            options: [
                { id: 'cont', label: "So the training is the signal, and the rest is the building?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! Getting stronger is a **three-step cycle**:\n\n1. **Train** -- create microtears and tire the muscle out\n2. **Rest** -- the body repairs the fibres, mostly during sleep\n3. **Adapt** -- the muscle rebuilds slightly stronger than before\n\nSkip step 2 and the cycle breaks. Train again before the repair has finished and you add damage on top of damage. Strength then goes **down**, not up. Coaches call this **overtraining**.\n\nBut too much rest is not free either. After about two weeks without training, the extra strength starts to fade again.\n\nIn the picture, the **strength line** shows how strong the muscle is, and the **repair bar** shows how much of the damage has been fixed.\n\nSlide **Rest Days** and find the best gap between sessions!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Let me find the right number of rest days!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** Two athletes do exactly the same hard workout. One trains again the very next day. The other waits two days.\n\nAfter a month, who is stronger?",
            options: [
                { id: 'right', label: "The one who waited -- their muscles finished repairing before each new session, so each cycle added strength.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "The one who trained every day, because they did twice as many sessions.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "More sessions only help if each one lands on a **repaired** muscle.\n\nThe athlete training daily starts each session before the repair from the last one has finished. Damage stacks up faster than the body can fix it, so strength drifts **downwards** and injury risk climbs. This is **overtraining**.\n\nThe athlete who waits two days lets each repair complete, so every session begins from a slightly stronger starting point. Fewer sessions, more progress.\n\nThis is why professional training plans build in rest days deliberately -- the rest is part of the training, not a break from it.",
            options: [
                { id: 'retry', label: "Oh -- training on an unrepaired muscle makes it weaker!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! **Rest is part of the training, not time off from it.**\n\nAll three lessons in Big Idea 42 come together here:\n- **P42** -- **contact time** turns the same force into a faster ball, so technique beats raw effort\n- **C42** -- replacing **electrolytes** as well as water keeps muscles and nerves working\n- **B42** -- muscles rebuild during **rest**, so recovery is when the gains arrive\n\nSports science is really the study of what happens **around** the effort -- how you move, what you drink, and when you stop.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Technique, hydration and rest all beat just trying harder!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered why rest builds muscle!**\n\n- Hard training causes tiny **microtears**\n- The body repairs them mostly while you **sleep**\n- It rebuilds slightly stronger -- this is **adaptation**\n- Training again too soon stacks damage: **overtraining**\n- Strength then falls instead of rising\n- Too much rest also lets the gains fade after a couple of weeks\n\nP42 improved the technique, C42 replaced the salts, and B42 showed when the strength is actually built!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Muscles are built on the days off!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Big Idea 42 -- B42 Complete!**\n\nRest and Rebuild -- How Does Sports Science Improve Performance?\n\nPerformance is built by what happens around the effort, not only by the effort.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| Training causes tiny damage | **Microtears** | The signal to get stronger |\n| Repair happens during rest | Mostly while you sleep | Rest is not wasted time |\n| Muscles rebuild stronger | **Adaptation** | How training works at all |\n| Too little rest goes backwards | **Overtraining** | More is not always better |\n\n**Big Idea 42 connections:**\n- P42 (Follow Through) showed how contact time turns the same force into a faster ball\n- C42 (Sweat and Salt) showed why replacing electrolytes matters as much as replacing water\n- B42 (Rest and Rebuild) showed that muscles are built during recovery, so rest days are part of the plan!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}

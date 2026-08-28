import { DialogNode } from '../../types';

export function getB45Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "Break a bone and it knits back together. Cut your skin and it heals over. Your body is very good at repairing itself.\n\nBut there is one part of you that does something different: once it is damaged, it is gone **for good**.\n\nIt is inside your ear. What do you think it is?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Tiny hair cells that pick up sound -- when loud noise destroys them, your body cannot grow new ones.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'bad', label: "The eardrum, which tears and cannot be repaired once it is broken.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Your eardrum is actually one of the better healers -- a small tear usually mends within a few weeks.\n\nThe part that never comes back sits deeper in, in a coiled tube called the **cochlea**. Inside it are about **16,000 tiny hair cells**. Sound makes them bend, and that bending is what your brain reads as hearing.\n\nHumans are born with all the hair cells they will ever have. Birds can regrow theirs. We cannot. Every one that is destroyed is **permanently** gone, and with it a little slice of your hearing.\n\nThe cruel part is that you do not feel them die.",
            options: [
                { id: 'cont', label: "So the damage is permanent and painless?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! Here is how loud sound destroys them:\n\n1. Sound makes the **hair cells** bend back and forth\n2. Gentle sound bends them a little, which is completely fine\n3. **Loud** sound bends them hard, and they take time to recover\n4. Sound that is too loud, or loud for too long, **snaps** them\n5. Snapped hair cells **never grow back**\n\nTwo things decide the damage: how **loud**, and for how **long**. Around **85 decibels** you can manage about eight hours safely. At **100 dB** that falls to roughly fifteen minutes. At **110 dB** -- a loud concert -- you are into a couple of minutes.\n\nThat muffled feeling and ringing after a loud event is a warning sign. Some hair cells were pushed too far.\n\nIn the picture you can change the **loudness** in **decibels** and watch the **hair cells**.\n\nSlide **Loudness** and see what survives!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Let me see what different loudness does!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** After a loud concert your ears ring for a few hours, then everything sounds normal again the next morning.\n\nDoes that mean no harm was done?",
            options: [
                { id: 'right', label: "No -- some hair cells were lost for good. The rest recovered, which hides the damage rather than undoing it.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Yes -- if your hearing came back to normal, nothing was permanently damaged.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "This is the most important misunderstanding about hearing, and it is why hearing loss creeps up on people.\n\nAfter a loud night, most of your hair cells are simply **exhausted** and do recover. But some were pushed past their limit and **died**, and those are gone permanently.\n\nYou do not notice, because you still have thousands of working cells covering for them. Your hearing seems fine.\n\nDo it repeatedly over years and the losses **add up** until they can no longer be hidden. That is why hearing damage usually shows up decades later, and why it is invisible while it is happening.\n\nThe ringing is not the damage. The ringing is the **warning**.",
            options: [
                { id: 'retry', label: "Oh -- feeling better does not mean nothing was lost!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! **Recovery hides the damage; it does not undo it.**\n\nAnd all three lessons of Big Idea 45 point at the same conclusion:\n- **P45** -- **distance** is free protection, and doubling it quarters the sound\n- **C45** -- soft **absorbing** materials calm a room; heavy material blocks sound through a wall\n- **B45** -- **hair cells** never grow back, so the only real cure is prevention\n\nMove back, treat the room, wear protection. All three exist because your ears cannot repair themselves.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Prevention is the only cure!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered why hearing damage is permanent!**\n\n- Your **cochlea** holds about **16,000 hair cells**\n- Sound bends them, and that bending is how you hear\n- Loud sound bends them hard; too loud **snaps** them\n- Snapped **hair cells** never grow back\n- Damage depends on how **loud** and for how **long**\n- Ringing afterwards is a warning, not the damage itself\n\nP45 used distance, C45 used materials, and B45 showed why both matter so much!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "My ears cannot repair themselves, so I should protect them!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Big Idea 45 -- B45 Complete!**\n\nInside Your Ear -- How Do We Manage Noise and Protect Hearing?\n\nNoise control matters because the part of you it damages is the one part that cannot heal.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| About 16,000 **hair cells** | Inside the **cochlea** | They are how you hear |\n| Loud sound snaps them | They never grow back | Damage is permanent |\n| Loudness and time both count | 85 dB for hours, 110 dB for minutes | Short and loud is enough |\n| Ringing is a warning | Recovery hides the loss | Damage adds up for years |\n\n**Big Idea 45 connections:**\n- P45 (Turning Down the Volume) showed that doubling your distance quarters the sound reaching you\n- C45 (Sound-Soaking Materials) showed that soft panels absorb echoes while heavy walls block sound passing through\n- B45 (Inside Your Ear) showed why both matter: hair cells never grow back, so prevention is the only cure!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}

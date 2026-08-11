import { DialogNode } from '../../types';

export function getB32Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "On days with bad air quality, doctors tell people with asthma to stay indoors. Athletes cancel outdoor practice. But why would breathing bad air hurt you? Your lungs are designed to handle air, right?\n\nWhat do you think pollution does to your lungs?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'inflame', label: "Pollution particles get deep into the lungs and cause swelling and irritation -- the lungs fight back like they're fighting an infection.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'clog', label: "The pollution just clogs up your lungs like a dirty filter.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Your lungs aren't like a simple filter! They're lined with living **cells** that react to foreign particles. When pollution particles reach the deep lung tissue, your body treats them like invaders.\n\nYour immune system sends **inflammatory cells** to attack the particles, which causes **swelling** and extra **mucus** production. The airways narrow, making it hard to breathe. This is what triggers asthma attacks -- your body's defense system overreacts to the pollution!",
            options: [
                { id: 'cont', label: "So pollution triggers an immune response that makes breathing harder?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! Your **respiratory system** reacts to pollution in stages:\n\n1. You breathe in polluted air -- tiny **PM2.5 (Particulate Matter)** particles bypass your nose and throat\n2. Particles reach the **alveoli** -- tiny air sacs where oxygen enters your blood\n3. Your immune system detects the particles and triggers **inflammation**\n4. Airways **swell** and produce extra **mucus** -- making breathing harder\n5. With long-term exposure, lung tissue gets permanently **damaged**\n\nRemember **P32 Particle Drift** -- smaller particles reach deeper into your lungs. And **C32 Smog Reactions** showed how sunlight creates ground-level ozone that irritates lung tissue directly!\n\nTry the **Pollution Level** slider to see how your lungs respond!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'try', label: "Let me see how pollution affects the lungs!", nextNodeId: 'experiment' }
            ]
        },
        experiment: {
            id: 'experiment',
            speaker: 'AI',
            content: "Watch the visual! Air flows into the lungs with each breath:\n\n- **Low pollution** -- air is mostly clean, alveoli stay open and pink, oxygen flows freely into the blood\n- **High pollution** -- particles coat the alveoli, inflammation turns them red, airways narrow with mucus\n- The **breathing capacity** meter shows how much oxygen your lungs can absorb\n\nNotice how the airways get narrower as pollution increases -- this is exactly what happens during an asthma attack. The body's own defense system makes breathing harder!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'experiment' } },
            options: [
                { id: 'cp', label: "More pollution = more inflammation = harder to breathe!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** Two people breathe the same polluted air all day. Person A exercises outdoors (breathing hard and fast). Person B sits indoors reading. Who gets more pollution in their lungs?",
            options: [
                { id: 'right', label: "Person A -- exercising means breathing faster and deeper, pulling more polluted air deep into the lungs.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Same amount -- they're breathing the same air, so they get the same pollution.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The air is the same, but how much you BREATHE changes everything! During exercise, you breathe **10-20 times** more air per minute than at rest.\n\nPerson A (exercising) pulls vastly more polluted air deep into their lungs with each heavy breath. Plus, during exercise you breathe through your **mouth** instead of your nose -- bypassing the nose's natural particle filters!\n\nThat's why health warnings say to avoid outdoor exercise on bad air days. More breathing = more pollution dose.",
            options: [
                { id: 'retry', label: "Oh -- exercising in pollution is extra dangerous because you breathe so much more!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! Your **pollution dose** depends on:\n- **Concentration** of particles in the air (from P32 and C32)\n- **Breathing rate** -- exercise means way more air intake\n- **Breathing route** -- mouth breathing bypasses nose filters\n- **Duration** -- longer exposure means more total particles\n\nThis connects all three lessons:\n- **P32** -- particle size determines how deep pollution reaches\n- **C32** -- chemical reactions create the pollutants\n- **B32** -- your lungs react to pollution with inflammation",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Physics, chemistry, and biology all determine how pollution affects us!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered how pollution attacks your lungs!**\n\nYour respiratory system fights pollution but can be overwhelmed:\n- **PM2.5 (Particulate Matter)** particles reach deep into the **alveoli**\n- Your immune system causes **inflammation** in response\n- Airways **narrow** and fill with **mucus** -- harder to breathe\n- Exercising in pollution increases your dose dramatically\n- Long-term exposure causes permanent **lung damage**\n\nP32 showed how tiny particles float, C32 showed how chemistry creates them, and B32 showed what they do to your body!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Air quality affects every breath we take!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Big Idea 32 -- B32 Complete!**\n\nBreathing Under Siege -- How Does Air Quality Affect Breathing?\n\nYour lungs are **living tissue** that reacts to every particle you inhale.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| Particles trigger inflammation | Immune system overreacts | Asthma attacks |\n| Airways narrow with mucus | Defense blocks airflow | Harder to breathe |\n| Exercise increases pollution dose | More breathing = more particles | Avoid outdoor exercise on bad days |\n\n**Big Idea 32 connections:**\n- P32 (Particle Drift) showed how tiny particles float in air\n- C32 (Smog Reactions) showed how sunlight creates pollutants\n- B32 (Breathing Under Siege) showed how pollution damages your lungs!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}

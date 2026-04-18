import { AssessmentData } from '../../types';

/**
 * Big Idea 4 Assessment: "How Do We Sense the World?"
 * Covers P4 (Sound Waves), C4 (Light & Color), B4 (Eyes, Ears & Nerves)
 * 12 questions: 4 easy → 4 medium → 4 hard
 */
export const bigIdea4Assessment: AssessmentData = {
    bigIdea: 4,
    title: 'How Do We Sense the World?',
    subtitle: 'Sound, Light & The Nervous System',
    icon: '🔊',
    questions: [
        // ── EASY (1-4) ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'How does sound travel from a speaker to your ear?',
            options: ['Air blows from the speaker to your ear', 'Particles nudge their neighbors in a chain (pressure wave)', 'Sound teleports instantly', 'Light carries the sound'],
            correctIndex: 1,
            hint: 'Think of the domino analogy from P4 — do the dominoes fly across the room?',
            explanation: 'Sound is a pressure wave — each air particle nudges the next, like a chain of dominoes. The particles themselves don\'t travel from speaker to ear; the WAVE travels through them!'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'What happens when white light passes through a prism?',
            options: ['It disappears', 'It splits into a rainbow of colors', 'It turns into heat', 'It becomes ultraviolet'],
            correctIndex: 1,
            hint: 'Remember the prism experiment in C4...',
            explanation: 'White light is actually ALL colors mixed together! A prism separates them because each color (wavelength) bends at a slightly different angle, spreading them into a rainbow spectrum.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Your eyes detect light and your ears detect sound. But where does "seeing" and "hearing" actually happen?',
            options: ['In the eyes and ears themselves', 'In the brain', 'In the blood', 'In the skin'],
            correctIndex: 1,
            hint: 'The eyes and ears are sensors, but who interprets the signals?',
            explanation: 'Eyes and ears are sensors that DETECT signals and convert them to electrical impulses. The BRAIN interprets those impulses as sight and sound. Without a brain, your eyes would detect light but you\'d never "see" anything!'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'What does the frequency of a sound wave determine?',
            options: ['How loud it is', 'How high or low the pitch is', 'What color it is', 'How fast it travels'],
            correctIndex: 1,
            hint: 'High frequency = fast vibrations. What does that sound like?',
            explanation: 'Frequency determines pitch! High frequency (fast vibrations) = high-pitched sound like a whistle. Low frequency (slow vibrations) = low-pitched sound like a drum. Amplitude (size of vibrations) determines loudness.'
        },
        // ── MEDIUM (5-8) ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'A red apple looks red under white light. What happens if you shine only blue light on it?',
            options: [
                'It still looks red',
                'It looks blue',
                'It looks dark/black because there\'s no red light to reflect',
                'It turns green'
            ],
            correctIndex: 2,
            hint: 'The apple can only REFLECT red light. If there\'s no red light available...',
            explanation: 'A red apple absorbs every color EXCEPT red, which it reflects. Under blue-only light, there\'s no red to reflect, so the apple absorbs all the blue light and reflects nothing — it appears dark/black!'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'A nerve signal travels at about 100 m/s. If the nerve from your toe to your brain is 1.5m long, how long does the signal take?',
            options: ['1.5 seconds', '0.015 seconds (15 milliseconds)', '100 seconds', 'It\'s instant'],
            correctIndex: 1,
            hint: 'Time = distance ÷ speed. So 1.5m ÷ 100 m/s = ?',
            explanation: '1.5m ÷ 100 m/s = 0.015 seconds (15 milliseconds). That\'s fast but NOT instant! This tiny delay is why reflexes exist — your spinal cord reacts even before the signal reaches your brain.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'Sound (P4) and light (C4) are both waves. What do they have in common?',
            options: [
                'Both need air to travel',
                'Both have frequency and amplitude that determine their properties',
                'Both travel at the same speed',
                'Both are invisible'
            ],
            correctIndex: 1,
            hint: 'Frequency and amplitude exist in both — what do they control?',
            explanation: 'Both waves have frequency (determines pitch for sound / color for light) and amplitude (determines loudness for sound / brightness for light). Key difference: sound needs a medium (air, water); light can travel through vacuum!'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'Can sound travel through outer space?',
            options: [
                'Yes, sound travels everywhere',
                'No — there are no air particles to carry the pressure wave',
                'Only if it\'s very loud',
                'Yes, but only bass frequencies'
            ],
            correctIndex: 1,
            hint: 'Sound needs particles to nudge each other. What\'s in space?',
            explanation: 'Sound is a pressure wave — particles bumping their neighbors. In the vacuum of space, there are essentially no particles. No particles = nothing to carry the wave = silence! (Movie explosions in space should be silent!)'
        },
        // ── HARD (9-12) ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Your friend plays a red guitar under a stage light. Trace the full path from instrument to your experience: P4, C4, B4.',
            options: [
                'String vibrates → pressure wave travels through air (P4) → enters ear → nerve signal to brain (B4). Stage light hits guitar → red surface reflects red light (C4) → enters eye → nerve signal to brain (B4)',
                'Brain creates sound and color on its own — no external input needed',
                'Sound and light travel together as one wave',
                'You only hear the guitar, you can\'t see its color through sound'
            ],
            correctIndex: 0,
            hint: 'Two separate pathways: one for sound, one for light. Both end at the brain.',
            explanation: 'Two parallel paths! SOUND: string vibrates → pressure wave (P4) → ear → electrical signal → brain. LIGHT: stage light → red surface reflects red wavelength (C4) → eye → electrical signal → brain (B4). Your brain combines both into one experience!'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'Leaves look green. Using C4 concepts, which light do leaves ABSORB the most?',
            options: [
                'Green light',
                'Red and blue light (reflecting green)',
                'All colors equally',
                'No light — they glow green on their own'
            ],
            correctIndex: 1,
            hint: 'Objects reflect the color they appear and absorb the rest...',
            explanation: 'Leaves appear green because chlorophyll absorbs red and blue light (for photosynthesis!) and reflects green. That\'s why leaves look green — you see the light they DON\'T use! This connects C4 (light absorption) to B3 (photosynthesis).'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'A person is deaf but can feel bass vibrations through the floor. Which part of the sensing pathway (B4) is working?',
            options: [
                'No part — they can\'t hear at all',
                'The sensor (skin touch receptors detect vibrations) and the nerve/brain pathway',
                'Only the brain is working',
                'The ear is working but the brain ignores it'
            ],
            correctIndex: 1,
            hint: 'There are other sensors besides ears that detect vibrations...',
            explanation: 'Even without functional ears, touch receptors in the skin can detect low-frequency vibrations. The signal travels through nerves to the brain, which interprets it as "feeling" the bass. The sensing pathway works — just using a different sensor!'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'At a fireworks show, you see the explosion before you hear the bang. Why? (P4 + C4 + B4)',
            options: [
                'Your eyes are faster than your ears',
                'Light travels ~300,000 km/s while sound only travels ~340 m/s, so the light signal reaches your eyes (and brain) first',
                'The explosion makes light before it makes sound',
                'Sound is heavier than light so it takes longer'
            ],
            correctIndex: 1,
            hint: 'Compare the SPEED of light (C4) vs sound (P4)...',
            explanation: 'Light (C4) travels at ~300,000 km/s, while sound (P4) travels at only ~340 m/s — nearly a million times slower! Both are detected by your sensors and sent to the brain (B4). The light just arrives way sooner. At 1 km away, light arrives instantly but sound takes ~3 seconds!'
        }
    ]
};


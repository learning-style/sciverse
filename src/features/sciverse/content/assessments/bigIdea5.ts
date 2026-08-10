import { AssessmentData } from '../../types';

/**
 * Big Idea 5 Assessment: "How Can a Small Force Do a Big Job?"
 * Covers P5 (Levers & Balance), C5 (Dissolving & Saturation), B5 (Homeostasis)
 * 12 questions: 4 easy → 4 medium → 4 hard
 */
export const bigIdea5Assessment: AssessmentData = {
    bigIdea: 5,
    title: 'How Can a Small Force Do a Big Job?',
    subtitle: 'Levers, Saturation & Homeostasis',
    icon: '⚖️',
    questions: [
        // ── EASY (1-4) ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'On a seesaw, what determines which side goes down?',
            options: ['Whichever side is heavier always goes down', 'The side with more TORQUE (weight × distance from pivot)', 'The side that was pushed last', 'The side closer to the ground'],
            correctIndex: 1,
            hint: 'Remember — a light person can beat a heavy person if they sit farther out...',
            explanation: 'Torque = weight × distance from the pivot. A 5 kg box at 8 m from the pivot (torque = 40) beats a 20 kg box at 1 m (torque = 20). Distance matters just as much as weight!'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'You keep adding sugar to a glass of water and stirring. Eventually the sugar just sinks to the bottom. Why?',
            options: ['The water is broken', 'The water has reached its saturation point — it can\'t dissolve any more', 'Sugar doesn\'t dissolve in water', 'You need to stir harder'],
            correctIndex: 1,
            hint: 'Think of the bus analogy — when all seats are taken...',
            explanation: 'The water has reached its saturation point — every available space between water molecules is occupied by sugar. No amount of stirring will dissolve more. The limit is real!'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Your body temperature is normally around 37°C. What keeps it steady?',
            options: ['You don\'t produce any heat', 'Homeostasis — feedback systems that heat or cool your body as needed', 'The air temperature is always 37°C', 'Your clothes maintain your temperature'],
            correctIndex: 1,
            hint: 'What happens when you\'re hot (you sweat) or cold (you shiver)?',
            explanation: 'Homeostasis uses negative feedback loops: too hot → sweat + blood vessel dilation (cool down). Too cold → shiver + blood vessel constriction (warm up). Your body constantly adjusts to stay near 37°C!'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Why does opening a soda can make it fizz?',
            options: ['The soda creates new gas when opened', 'Pressure drops → the dissolved CO₂ can\'t stay in solution and escapes as bubbles', 'Air rushes in and turns to bubbles', 'The aluminum reacts with the soda'],
            correctIndex: 1,
            hint: 'The soda was sealed under high pressure. What happens when pressure drops?',
            explanation: 'Soda is sealed under high pressure, which forces extra CO₂ to dissolve. When you pop the can, pressure drops → the saturation point drops → excess CO₂ escapes as bubbles. That\'s the fizz!'
        },
        // ── MEDIUM (5-8) ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'A 20 kg boulder sits 2 m from the pivot. You have a 5 kg rock. How far from the pivot must it be to balance?',
            options: ['2 m', '4 m', '8 m', '20 m'],
            correctIndex: 2,
            hint: 'Torque must be equal: 20 × 2 = 5 × ?',
            explanation: '20 kg × 2 m = 40 torque units. To balance: 5 × ? = 40 → ? = 8 m. The lighter rock needs to be 4 times farther from the pivot to match the heavy boulder\'s torque!'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Two sealed bottles of soda — one in the fridge (5°C), one in the sun (40°C). Which fizzes more when opened?',
            options: [
                'The cold one fizzes more because cold = more energy',
                'They fizz the same',
                'The warm one fizzes more because warm water holds LESS dissolved gas',
                'Neither fizzes because they\'re sealed'
            ],
            correctIndex: 2,
            hint: 'Think about what happens when you heat a fizzy drink — does the gas stay dissolved or try to escape?',
            explanation: 'Unlike sugar (which dissolves better in hot water), gases behave the opposite way — warm water holds LESS dissolved CO₂. So the warm bottle has more excess gas that escapes as vigorous fizzing when opened. Cold soda holds its fizz better because cold water can keep more CO₂ dissolved!'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'On a hot day, your blood vessels near the skin dilate (widen). Why does this help cool you down?',
            options: [
                'Wider vessels let cold air into your blood',
                'More blood flows near the skin surface, releasing heat to the air',
                'Blood vessels push sweat out faster',
                'Wider vessels make your skin thicker'
            ],
            correctIndex: 1,
            hint: 'Heat escapes from surfaces. Moving more warm blood near the surface...',
            explanation: 'Dilated blood vessels bring more warm blood close to the skin surface. Heat radiates from the skin into the cooler air. This is why your face turns red when hot — more blood near the surface for cooling!'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'A lever (P5), a sealed soda bottle (C5), and your body thermostat (B5) all have something in common. What?',
            options: [
                'They all involve gravity',
                'They all have an equilibrium point (balance / saturation / body temp) that resists change',
                'They all create energy from nothing',
                'They all require electricity'
            ],
            correctIndex: 1,
            hint: 'Each system has a "tipping point" or balance state...',
            explanation: 'All three have equilibrium: Levers balance when torques are equal (P5). Dissolving reaches saturation (C5). Body temperature is maintained at 37°C (B5). In each case, the system resists being pushed away from its balance point!'
        },
        // ── HARD (9-12) ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'A crowbar is used to pry a nail out of wood. The nail grips with 200 N of force. Your hand pushes 10 cm from the pivot. The nail is 2 cm from the pivot. How much force do you need?',
            options: ['200 N', '100 N', '40 N', '20 N'],
            correctIndex: 2,
            hint: 'Torque balance: your force × your distance = nail\'s force × nail\'s distance',
            explanation: 'Your torque must equal the nail\'s torque: You × 10 cm = 200 N × 2 cm. You × 10 = 400. You = 40 N. You only need 40 N (about 4 kg of push) to overcome 200 N of nail grip — that\'s a 5× mechanical advantage!'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'Deep-sea divers breathe compressed air. When ascending too quickly, nitrogen bubbles form in their blood (the bends). Explain using C5 concepts.',
            options: [
                'Nitrogen is toxic at all depths',
                'High pressure at depth forces extra nitrogen to dissolve in blood; rapid ascent drops pressure quickly, exceeding the saturation point — nitrogen escapes as bubbles',
                'Nitrogen turns into oxygen at high pressure',
                'The bends are caused by cold water, not pressure'
            ],
            correctIndex: 1,
            hint: 'Think of the diver\'s blood as a soda bottle — what happens when you suddenly release pressure?',
            explanation: 'Same as opening a soda! At depth, high pressure forces extra nitrogen gas into the blood (above normal saturation). Ascending drops pressure → saturation point drops → excess nitrogen forms bubbles in blood/tissues. That\'s why divers must ascend slowly — to let nitrogen escape gradually.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'A fever of 39°C means your body\'s thermostat has been RESET to a higher temperature. What happens to your homeostasis response?',
            options: [
                'Homeostasis breaks completely and can\'t function',
                'Your body SHIVERS (to warm up to the new setpoint of 39°C) even though 37°C is actually normal',
                'Sweating increases to bring temp down to 37°C',
                'Blood flow stops entirely'
            ],
            correctIndex: 1,
            hint: 'If the thermostat is set to 39°C but your body is currently at 37°C, your body thinks it\'s too COLD...',
            explanation: 'During a fever, chemicals reset the setpoint to 39°C. Your body at 37°C is now "below target," so homeostasis kicks in as if you\'re cold — shivering, vasoconstriction, feeling chilly. That\'s why you get chills with a fever! The system works perfectly — it\'s the setpoint that changed.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'All three lessons share a principle: small, clever inputs control big systems. Match each correctly.',
            options: [
                'Lever: increase distance to multiply force. Soda: increase pressure to dissolve more. Body: tiny temperature changes trigger sweating or shivering.',
                'Lever: increase weight to balance. Soda: add more water. Body: exercise to stay warm.',
                'Lever: remove the pivot. Soda: heat it up. Body: stop sweating.',
                'All three work by adding more energy, not by being clever.'
            ],
            correctIndex: 0,
            hint: 'The "small force, big job" principle appears in each — distance, pressure, and feedback...',
            explanation: 'P5: A small force × large distance creates huge torque (mechanical advantage). C5: A small increase in pressure pushes past saturation limits. B5: Tiny temperature deviations trigger powerful responses (sweating cools rapidly, shivering generates heat). In all three: smart leverage, not brute force!'
        }
    ]
};


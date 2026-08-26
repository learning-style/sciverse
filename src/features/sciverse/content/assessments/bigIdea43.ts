import { AssessmentData } from '../../types';

/**
 * Big Idea 43 Assessment: "How Do We Design for Safety and Accessibility?"
 * Covers P43 (Softening the Blow), C43 (Materials That Protect), B43 (Designed for Everyone)
 * 12 questions: 4 easy → 4 medium → 4 hard
 */
export const bigIdea43Assessment: AssessmentData = {
    bigIdea: 43,
    title: 'How Do We Design for Safety and Accessibility?',
    subtitle: 'Stopping Distance, Protective Foam & Human Range',
    icon: '🦺',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Landing on a crash mat hurts less than concrete because the mat:',
            options: ['Takes longer to stop you', 'Slows your fall on the way down', 'Makes you lighter', 'Removes gravity'],
            correctIndex: 0,
            hint: 'Same speed, different stopping time.',
            explanation: 'A longer stop means a smaller force on your body.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'The part of a bike helmet that protects your head most is the:',
            options: ['Foam inside', 'Hard shell outside', 'Chin strap', 'Paint'],
            correctIndex: 0,
            hint: 'Soft is not weak.',
            explanation: 'The foam crushes to provide stopping distance; the shell mainly spreads the hit.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Designing for the average person fits:',
            options: ['Almost nobody', 'Almost everybody', 'Exactly half of people', 'Only tall people'],
            correctIndex: 0,
            hint: 'Think about the pilot study.',
            explanation: 'Nobody is average across many measurements at once.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'cross',
            question: 'Safety design works by:',
            options: ['Making the stop take longer', 'Making everything as stiff as possible', 'Making things heavier', 'Removing all padding'],
            correctIndex: 0,
            hint: 'Stopping distance is the key.',
            explanation: 'Extra stopping distance reduces the force that reaches a person.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'Why do car makers build fronts that fold up in a crash?',
            options: ['Folding stretches the stop out, so people feel a smaller force', 'Folded metal is cheaper', 'It makes the car lighter', 'It looks better after a crash'],
            correctIndex: 0,
            hint: 'The car is sacrificed on purpose.',
            explanation: 'Crumple zones extend the stopping time and protect the occupants.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Rubber would be a poor helmet liner because it:',
            options: ['Springs back and returns the energy', 'Is too heavy', 'Cannot be moulded', 'Melts easily'],
            correctIndex: 0,
            hint: 'Elastic materials give energy back.',
            explanation: 'A springy liner returns energy instead of absorbing it.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'A ramp that is too steep is a problem because:',
            options: ['People who need it cannot actually use it', 'It costs more to build', 'It takes up more space', 'It looks unattractive'],
            correctIndex: 0,
            hint: 'Access means usable.',
            explanation: 'A ramp nobody can climb provides the appearance of access, not access.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'Air force cockpits built for the average pilot fitted how many pilots well?',
            options: ['None of them', 'About half', 'Almost all', 'Only the tallest'],
            correctIndex: 0,
            hint: 'The famous result was striking.',
            explanation: 'Zero pilots were near average on all ten measurements.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'You fall the same distance onto concrete and onto foam. What is the same in both?',
            options: ['The speed at which you hit', 'The stopping time', 'The force on your body', 'The damage done'],
            correctIndex: 0,
            hint: 'What does gravity control?',
            explanation: 'Impact speed is identical; only the stopping time and force differ.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'Why must a helmet be replaced after one real crash, even if it looks fine?',
            options: ['The foam has already crushed and cannot crush again', 'The shell always cracks invisibly', 'The straps stretch permanently', 'The colour fades'],
            correctIndex: 0,
            hint: 'Protection is spent, not permanent.',
            explanation: 'Crushed foam has used up its stopping distance and cannot repeat it.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'Why did adjustable seats solve the cockpit problem better than a new average?',
            options: ['They cover the range of real bodies instead of one point', 'They were cheaper to fit', 'They made the plane lighter', 'Pilots preferred the look'],
            correctIndex: 0,
            hint: 'Design for the range.',
            explanation: 'Adjustability accommodates variation that no single fixed size can.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'What do a crumple zone, helmet foam and an adjustable seat have in common?',
            options: ['Each replaces an obvious answer with one based on how people and materials really behave', 'Each is made of metal', 'Each is single use', 'Each is required by law'],
            correctIndex: 0,
            hint: 'Think about what each rejects.',
            explanation: 'Stronger, harder and average all sound right but fail; studying reality gives better designs.'
        }
    ]
};

import { AssessmentData } from '../../types';

/**
 * Big Idea 45 Assessment: "How Do We Manage Noise and Protect Hearing?"
 * Covers P45 (Turning Down the Volume), C45 (Sound-Soaking Materials), B45 (Inside Your Ear)
 * 12 questions: 4 easy → 4 medium → 4 hard
 */
export const bigIdea45Assessment: AssessmentData = {
    bigIdea: 45,
    title: 'How Do We Manage Noise and Protect Hearing?',
    subtitle: 'Distance, Absorbing Materials & Hair Cells',
    icon: '🔊',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Loudness is measured in:',
            options: ['Decibels', 'Metres', 'Grams', 'Seconds'],
            correctIndex: 0,
            hint: 'Written dB for short.',
            explanation: 'Sound level is measured in decibels.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Soft panels make a room quieter by:',
            options: ['Absorbing sound into tiny air pockets', 'Reflecting sound back', 'Adding more sound', 'Freezing the air'],
            correctIndex: 0,
            hint: 'Soft and full of air.',
            explanation: 'Sound rubbing through the pockets becomes a little heat.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Hair cells in your ear:',
            options: ['Never grow back once destroyed', 'Regrow within a week', 'Are found in your eardrum', 'Grow all your life'],
            correctIndex: 0,
            hint: 'Humans cannot regrow them.',
            explanation: 'Damaged hair cells are lost permanently.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'cross',
            question: 'The cheapest way to protect your hearing is to:',
            options: ['Move further away from the noise', 'Buy expensive headphones', 'Cover the walls in foam', 'Shout louder'],
            correctIndex: 0,
            hint: 'Distance costs nothing.',
            explanation: 'Increasing distance rapidly reduces the sound reaching you.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'Doubling your distance from a speaker cuts the sound to about:',
            options: ['A quarter', 'A half', 'A tenth', 'It stays the same'],
            correctIndex: 0,
            hint: 'The sound spreads out.',
            explanation: 'Energy spreads over a much larger area, so intensity drops steeply.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'To stop sound passing through a wall you need material that is:',
            options: ['Heavy and dense', 'Soft and light', 'Full of air pockets', 'Thin and flexible'],
            correctIndex: 0,
            hint: 'Blocking is not absorbing.',
            explanation: 'Mass blocks transmission; soft foam only absorbs echoes inside a room.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'Damage to hearing depends on:',
            options: ['How loud the sound is and how long it lasts', 'Only how loud it is', 'Only how long it lasts', 'The colour of the room'],
            correctIndex: 0,
            hint: 'Two factors together.',
            explanation: 'Both level and exposure time determine the damage.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'Why does a bare school hall sound so noisy?',
            options: ['Hard surfaces reflect sound so it bounces around', 'The walls create extra sound', 'Bare halls are always bigger', 'Sound travels faster indoors'],
            correctIndex: 0,
            hint: 'Think about echoes.',
            explanation: 'Reflections pile up, making speech hard to hear.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'Why does stepping from 1 metre to 2 metres help more than 20 metres to 21 metres?',
            options: ['Doubling matters, not the number of steps', 'Later steps are uphill', 'Sound speeds up further away', 'It does not - both help equally'],
            correctIndex: 0,
            hint: 'It is the ratio that counts.',
            explanation: 'Halving intensity depends on doubling distance, so early steps matter far more.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'Foam on a shared wall failed to help a neighbour because:',
            options: ['Foam absorbs echoes but has too little mass to block sound', 'The foam was upside down', 'Foam amplifies bass', 'Foam only works outdoors'],
            correctIndex: 0,
            hint: 'Wrong tool for the job.',
            explanation: 'Blocking transmission requires mass, which foam does not have.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'Your ears ring after a concert and feel normal the next day. This means:',
            options: ['Some hair cells were lost permanently, hidden by the ones that recovered', 'No damage occurred', 'All damage was repaired overnight', 'Your eardrum healed'],
            correctIndex: 0,
            hint: 'Recovery hides loss.',
            explanation: 'Exhausted cells recover, but the cells that died are gone for good.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Why is prevention the only real cure for hearing damage?',
            options: ['Hair cells cannot regrow, so lost hearing cannot be restored', 'Hearing aids are illegal', 'Doctors have not tried', 'Ears heal too slowly to notice'],
            correctIndex: 0,
            hint: 'Think about what cannot repair.',
            explanation: 'Because the damage is permanent, avoiding it is the only effective strategy.'
        }
    ]
};

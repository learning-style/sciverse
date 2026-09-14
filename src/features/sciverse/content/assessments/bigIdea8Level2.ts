import { AssessmentData } from '../../types';

/**
 * Big Idea 8 Assessment -- LEVEL 2 (grades 6-8).
 * Covers L2P8 (heat flow = k x A x dT / d), L2C8 (relative humidity and dew
 * point), L2B8 (a fox's heat budget and lower critical temperature). The
 * theme across all three is rates and limits set by temperature.
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea8Level2Assessment: AssessmentData = {
    bigIdea: 8,
    level: 2,
    title: 'Why Does Weather Change?',
    subtitle: 'Level 2 -- Walls, Dew and a Fox in the Cold',
    icon: '🧱',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'In heat flow = k x A x ΔT / d, the letter d stands for:',
            options: ['The thickness of the layer, in metres', 'The density of the material', 'The temperature difference', 'The area of the layer'],
            correctIndex: 0,
            hint: 'A thicker layer lets less heat through.',
            explanation: 'd is the thickness, and it sits in the denominator: double it, and half the heat gets through.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'The dew point is:',
            options: ['The temperature at which the air\'s water vapour reaches the most that can stay as vapour', 'The temperature at which water boils', 'The amount of rain that falls in a day', 'The temperature of the ground at dawn'],
            correctIndex: 0,
            hint: 'Cool the air to this temperature and the relative humidity reaches 100%.',
            explanation: 'Below the dew point, some of the vapour condenses -- as dew, fog or cloud.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'An animal\'s lower critical temperature is:',
            options: ['The coldest air it can rest in without making extra heat', 'Its lowest possible body temperature', 'The temperature at which it starts to hibernate', 'The temperature of the outside of its fur'],
            correctIndex: 0,
            hint: 'Below it, heat leaks out faster than the resting body makes it.',
            explanation: 'At the lower critical temperature, resting heat exactly matches the heat leaking out. Colder than that, the animal must shiver or move.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'cross',
            question: 'Why do wool and fur keep bodies warm?',
            options: ['They trap still air, which conducts heat very poorly', 'They make heat of their own', 'They reflect every bit of heat back', 'They are made of fine metal fibres'],
            correctIndex: 0,
            hint: 'Look up still air\'s thermal conductivity.',
            explanation: 'Still air has k = 0.025 W/m/°C, one of the lowest there is. Wool and fur hold it in place.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: '10 m² of wool, 5 cm thick (k = 0.04 W/m/°C), has faces 16 °C apart. How much heat flows through each second?',
            options: ['128 W', '1.28 W', '3,200 W', '0.32 W'],
            correctIndex: 0,
            hint: 'Change 5 cm to 0.05 m first.',
            explanation: '0.04 x 10 x 16 / 0.05 = 128 W. Using 5 instead of 0.05 gives 1.28 W; leaving out k gives 3,200 W.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Air at 30 °C has 12.8 g/m³ of water vapour. The most that can stay as vapour at 30 °C is 30.4 g/m³. Its relative humidity is about:',
            options: ['42%', '238%', '17.6%', '58%'],
            correctIndex: 0,
            hint: 'Actual over most, times 100%.',
            explanation: '12.8 / 30.4 x 100% = 42%. The fraction upside down gives about 238%; subtracting gives 17.6.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'A fox\'s fur leaks 0.20 W for each °C. It makes 15 W at rest, and its body is at 37 °C. Its lower critical temperature is:',
            options: ['−38 °C', '3 °C', '75 °C', '−75 °C'],
            correctIndex: 0,
            hint: 'Balance 0.20 x ΔT = 15, then subtract ΔT from 37.',
            explanation: 'ΔT = 15 / 0.20 = 75 °C, so the lowest air temperature is 37 − 75 = −38 °C.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'Which change has the same effect on a fox\'s heat loss as growing thicker fur?',
            options: ['Curling up, to shrink the area of fur facing the cold', 'The air getting colder', 'Its body getting warmer', 'Its fur becoming a better conductor'],
            correctIndex: 0,
            hint: 'Which letter in k x A x ΔT / d does curling up change?',
            explanation: 'Thicker fur raises d; curling up lowers A. Both reduce k x A x ΔT / d.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'A fox\'s summer fur is 2 cm thick and its winter fur 6 cm thick. With everything else the same, the summer fur lets out:',
            options: ['Three times as much heat each second', 'A third as much heat', 'The same amount of heat', 'Nine times as much heat'],
            correctIndex: 0,
            hint: 'The thickness is in the denominator.',
            explanation: 'A third of the thickness means 6 / 2 = 3 times the heat flow.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'A kitchen at 25 °C has 12.8 g/m³ of water vapour. Drops of water will form on:',
            options: ['A can at 10 °C but not a glass at 18 °C, because the dew point is 15 °C', 'Both, because both are colder than the room', 'Neither, because the room is warm', 'Only the glass at 18 °C'],
            correctIndex: 0,
            hint: 'Find the temperature where 12.8 g/m³ is the limit.',
            explanation: '12.8 g/m³ is the limit at 15 °C. Only objects colder than 15 °C cool the air beside them below its dew point.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'In summer fur, a fox leaks 0.60 W for each °C. How much heat must it make to stay at 37 °C in air at −20 °C?',
            options: ['About 34 W', 'About 10 W', '15 W', 'About 22 W'],
            correctIndex: 0,
            hint: 'ΔT = 37 − (−20).',
            explanation: 'ΔT = 57 °C, and 0.60 x 57 = 34 W -- more than twice its resting heat. Adding −20 to 37 instead gives about 10 W.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Dew on grass and a fox\'s heat budget both depend on a temperature limit. Which pair is right?',
            options: ['Dew forms below the air\'s dew point; a resting fox needs extra heat below its lower critical temperature', 'Dew forms above the dew point; a fox needs extra heat above its lower critical temperature', 'Both limits are always 0 °C', 'Neither depends on temperature'],
            correctIndex: 0,
            hint: 'Each limit is a temperature you must go below.',
            explanation: 'Below the dew point, vapour condenses. Below the lower critical temperature, heat leaks out faster than the resting body makes it.'
        }
    ]
};

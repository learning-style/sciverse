import { AssessmentData } from '../../types';

/**
 * Big Idea 26 Assessment -- LEVEL 2 (grades 6-8).
 * Covers L2P26 (pressure gradient = difference / distance, in hPa per 100 km, then
 * about 26 km/h for each 1 hPa per 100 km -- so the wind is in the spacing of the
 * isobars and not the numbers on them), L2C26 (a rising bubble cools at 10 C/km, so
 * the forecast turns on whether the surroundings cool faster or slower than that,
 * and the ground temperature cancels out), L2B26 (Dolbear's cricket law: standardise
 * the count to 25 seconds, divide by 3, add 4.4 -- and silence is not a reading of
 * zero).
 * The spine: predicting weather is measuring a proxy and applying a calibrated rule,
 * so a forecast can fail at the measurement, at the rule, or outside the rule's
 * range -- and only the last still hands you a number.
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea26Level2Assessment: AssessmentData = {
    bigIdea: 26,
    level: 2,
    title: 'How Do We Predict Weather?',
    subtitle: 'Level 2 -- The Spacing, the Comparison, and the Count',
    icon: '🌬️',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'On a weather chart, what tells a forecaster how windy it will be?',
            options: [
                'The pressure numbers written on the isobars',
                'How close together the isobars are',
                'How many isobars there are altogether',
                'Which way the isobars curve'
            ],
            correctIndex: 1,
            hint: 'The same pressure difference can be spread over a short distance or a long one.',
            explanation: 'The wind comes from the pressure gradient — the difference divided by the distance — so it is the spacing that matters. The same 4 hPa gives 52 km/h over 200 km and 13 km/h over 800 km. That is why a forecaster can judge a chart from across the room: packed isobars mean wind.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'A bubble of air rises through the atmosphere. Roughly how fast does it cool, and does that change from day to day?',
            options: [
                'It depends entirely on the weather, so it changes every day',
                'About 10 °C per kilometre, and it is the same for every bubble on every day',
                'It does not cool at all, since warm air rises',
                'About 6 °C per kilometre, which is the typical lapse rate'
            ],
            correctIndex: 1,
            hint: 'What makes the bubble cool — the weather, or the fact that it is expanding?',
            explanation: 'A rising bubble meets lower pressure, expands, and pays for the expansion out of its own warmth — which comes to about 10 °C per km whatever the weather is doing. The 6 °C per km is the other number in this lesson: it is how fast the SURROUNDING air cools, and that one does change from day to day. Keeping the two apart is the whole lesson.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Dolbear\'s cricket rule says to count chirps for 25 seconds. Why does the time matter?',
            options: [
                'It does not — 20 chirps is 20 chirps however long you listened',
                'The rule turns a count into a temperature, and a count means nothing without the time it was counted over',
                'Crickets only chirp in 25-second bursts',
                'Counting for longer makes the answer more accurate'
            ],
            correctIndex: 1,
            hint: 'Could the formula tell the difference between 20 chirps in 25 seconds and 20 in 50?',
            explanation: 'The 25 seconds lives in the rule, not in the numbers, so the formula cannot tell how long you stood there — feed it 20 either way and it answers 11.1 °C. Counted over 50 seconds the right answer is 7.7 °C, three and a half degrees out. A calibrated instrument comes with a method, and the method is part of the calibration.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'All three lessons did the same thing. What is predicting weather, in those terms?',
            options: [
                'Seeing the future using powerful computers',
                'Measuring something you can see and applying a rule that connects it to something you cannot',
                'Collecting enough measurements that the answer becomes obvious',
                'Guessing, but with better equipment'
            ],
            correctIndex: 1,
            hint: 'You cannot see tomorrow\'s wind, a storm that has not happened, or the temperature. What can you see?',
            explanation: 'Each lesson measured a proxy — the spacing of isobars, two cooling rates, a chirp rate — and applied a rule somebody calibrated. That is what a forecast is. And it means a forecast has more than one way to be wrong: the measurement, the rule, or using the rule outside the range where it holds.'
        },

        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'Two isobars are 4 hPa apart and 400 km apart on the ground. Taking 26 km/h for each 1 hPa per 100 km, what wind would you forecast?',
            options: [
                'About 104 km/h',
                'About 26 km/h',
                'About 10 km/h',
                'About 4 km/h'
            ],
            correctIndex: 1,
            hint: 'Work out the gradient in hPa per 100 km first.',
            explanation: '4 hPa / 400 km = 0.01 hPa per km, which is 1 hPa per 100 km, so 1 x 26 = about 26 km/h. The 104 answer comes from using 4 as if it were already a gradient — 4 hPa is not 4 hPa per 100 km. One is a difference and the other is a difference divided by a distance, and keeping the units written down is what catches it.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'A balloon measures the surrounding air cooling at 12 °C per km. After a bubble has risen 2 km, how does it compare with the air around it?',
            options: [
                '4 °C colder, so it sinks back — a quiet day',
                '4 °C warmer, so it keeps rising — storms',
                '24 °C warmer',
                'Exactly the same temperature'
            ],
            correctIndex: 1,
            hint: 'Bracket first: the surroundings\' rate minus 10, then multiply by the height.',
            explanation: '(12 - 10) x 2 = +4 °C, and positive means the bubble is warmer than the air around it, so it keeps rising. The first option has the subtraction the other way round, which here does not just flip a sign — it flips the forecast, which is why the order was written down. And +24 forgets the 10 altogether, giving a bubble hotter than the ground it left.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'You count 18 cricket chirps in 15 seconds. What temperature does Dolbear\'s rule give?',
            options: [
                'About 10.4 °C',
                'About 14.4 °C',
                'About 8.0 °C',
                'About 18.4 °C'
            ],
            correctIndex: 1,
            hint: 'You listened for less than 25 seconds, so the standardised count must be more than 18.',
            explanation: '18 x 25 / 15 = 30 chirps in 25 seconds, then 30 / 3 + 4.4 = 14.4 °C. The 10.4 answer uses the raw count, and note which way that error goes: a short count makes the cricket seem slower, so it reads too cold. 8.0 has the ratio inverted. Check the direction before the arithmetic — fewer seconds must mean more chirps.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'Chart A has 8 hPa across 200 km. Chart B has 40 hPa across 1000 km. Which forecasts the stronger wind?',
            options: [
                'B, since 40 hPa is five times the pressure difference',
                'Neither — both are 4 hPa per 100 km, so both give about 104 km/h',
                'A, since the isobars are closer together in absolute terms',
                'It cannot be worked out without knowing the latitude'
            ],
            correctIndex: 1,
            hint: 'Turn both into hPa per 100 km.',
            explanation: '8/200 x 100 = 4 and 40/1000 x 100 = 4. Five times the pressure difference spread over five times the distance is the same gradient and the same wind. A forecaster reading only the 40 would be five times wrong one way and one reading only the 8 would be five times wrong the other — neither number means anything without its distance.'
        },

        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'Yesterday: 12 hPa across 300 km. Today: 30 hPa across 1500 km. A forecaster sees the bigger pressure difference and predicts a windier day. What is actually happening?',
            options: [
                'They are right — 30 hPa is more than twice 12 hPa',
                'Today is about half as windy: 4 hPa/100 km yesterday against 2 today',
                'The two days cannot be compared',
                'Today is about twice as windy'
            ],
            correctIndex: 1,
            hint: 'Work out both gradients and then compare.',
            explanation: 'Yesterday was 12/300 x 100 = 4 hPa per 100 km, about 104 km/h. Today is 30/1500 x 100 = 2, about 52 km/h — two and a half times the pressure difference and half the wind, because it is spread over five times the distance. The mistake is a real one rather than a careless one: the pressure difference genuinely appears in the calculation, and it never appears alone. A number that is only half of a ratio misleads you exactly when the other half changed.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'Town A: ground 32 °C, surroundings cooling at 7 °C per km. Town B: ground 19 °C, surroundings cooling at 11 °C per km. Which town gets the thunderstorm warning?',
            options: [
                'Town A — 32 °C is hot enough to drive strong convection',
                'Town B — its rate is above 10, so a bubble stays warmer all the way up, while A\'s bubbles sink back however hot the ground is',
                'Both, since storms need heat and A has more of it',
                'Neither, since neither rate is extreme'
            ],
            correctIndex: 1,
            hint: 'Look for the ground temperature in the formula (rate - 10) x h.',
            explanation: 'The ground temperature is not in the formula at all — it cancels, because the bubble is a piece of the surface air and both sides of the comparison start from it. Town A gives (7-10) = -3 per km, so its bubbles are colder than their surroundings at every height. Town B gives +1 per km. So the cooler town is the stormy one: a hot day makes a warmer storm, not a likelier one, which is why British thunderstorms often come on days that are not especially hot.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'You listen for 25 seconds and hear no chirps at all. A friend says 0 / 3 + 4.4 = 4.4 °C, so there will be no frost. What do you actually know?',
            options: [
                'Nothing is wrong — zero chirps is a valid measurement',
                'Only that it is below about 13 °C, where the cricket stops chirping — silence is no reading at all, not a reading of zero',
                'That it is exactly 0 °C, since the cricket has stopped completely',
                'That the cricket has gone away, so the method cannot be used'
            ],
            correctIndex: 1,
            hint: 'What happens to a snowy tree cricket below about 13 °C?',
            explanation: 'Below about 13 °C the cricket is silent, so silence carries exactly one piece of information: it is below 13. It could be 12 °C or -8 °C and the silence sounds identical, so frost is entirely possible. The friend\'s arithmetic is right and their reasoning is not, which is the most dangerous combination an instrument can produce: used outside its range it gives a confident wrong answer rather than a vague one.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'Each of the three rules came with a condition — the middle latitudes, nothing condensing, one cricket species above 13 °C. What does that tell you about forecasts?',
            options: [
                'That forecasting is unreliable and should not be trusted',
                'That a forecast can fail at the measurement, at the rule, or by being outside the rule\'s range — and the last is worst, because it still gives you a number',
                'That the rules need more decimal places',
                'That the conditions are technical details that rarely matter'
            ],
            correctIndex: 1,
            hint: 'Which kind of failure would you not notice?',
            explanation: 'A bad measurement usually looks odd, and a wrong rule can be checked. But a correct measurement put through a correct rule outside its range produces something that looks exactly like an answer — 4.4 °C from a silent night, or a wind forecast from an equatorial chart where the rule does not apply at all. That is why each lesson stated its condition where the rule was given, rather than at the end.'
        }
    ]
};

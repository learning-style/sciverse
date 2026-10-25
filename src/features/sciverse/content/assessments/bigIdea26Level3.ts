import { AssessmentData } from '../../types';

/**
 * Big Idea 26 Assessment -- LEVEL 3 (grades 9-12).
 * Covers L3P26 (the wind runs along the isobars because that is the only direction
 * where the pressure push and the Coriolis deflection cancel, and the balance gives
 * v = (1/(rho f)) x dp/dn -- which derives L2P26's 26 km/h and shows it was hiding
 * sin(latitude)), L3C26 (condensation releases latent heat, so the bubble cools at
 * 5.5 C/km above its cloud base rather than 10 -- two thresholds, a conditionally
 * unstable band covering most days, and breaking even at 4.5 x base / (rate - 5.5)),
 * L3B26 (an organism develops on ACCUMULATED warmth, not calendar time: degree-days
 * are the daily mean minus a base temperature, corn needs about 700 of them from
 * sowing to tasselling, and because spreads add through their squares the date is
 * predictable to +/- 2.5 days seventy days ahead -- from a forecast that expires in a
 * fortnight. The honest limit is the independence that sqrt(n) needs: 5-day spells
 * make it +/- 5.6 days). All five biology questions were rewritten on 24 October 2026
 * when that lesson replaced one about fitting a straight line to chirp rates, which a
 * reader rightly said had almost no biology in it.
 * The spine: the physics and chemistry each found a dependence hiding in a Level 2
 * constant, and the range is where it starts to matter -- while the biology changes the
 * question, because a running total is deaf to the day-to-day noise that kills a forecast.
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea26Level3Assessment: AssessmentData = {
    bigIdea: 26,
    level: 3,
    title: 'How Do We Predict Weather?',
    subtitle: 'Level 3 -- The Balance, the Lift, and the Total',
    icon: '🧭',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Air is pushed from high pressure towards low. Why does the wind end up blowing along the isobars instead of across them?',
            options: [
                'Because the isobars act as barriers the air cannot cross',
                'Because that is the only direction in which the push and the sideways deflection cancel each other',
                'Because the air is too fast to turn towards the low',
                'Because pressure differences do not actually push air'
            ],
            correctIndex: 1,
            hint: 'The deflection is always at right angles to the motion. What happens once the air has turned 90 degrees?',
            explanation: 'Starting from rest there is no deflection at all, so the air sets off straight at the low. Moving, it is deflected; faster, deflected harder. Once it has turned through 90 degrees the deflection points straight back along the push, the two cancel, and nothing is left to turn it or speed it up. A right angle is what a balance looks like when one of the two effects is sideways.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Why does a rising bubble cool at only about 5.5 °C per km above its cloud base, rather than the 10 it managed below?',
            options: [
                'Because the air above the cloud base is thinner',
                'Because its water vapour is condensing, which releases latent heat inside the bubble',
                'Because it is rising more slowly by then',
                'Because the surrounding air is warmer up there'
            ],
            correctIndex: 1,
            hint: 'What happens to the heat when vapour turns to liquid?',
            explanation: 'Above the cloud base the bubble is still expanding and still losing warmth to that, but condensation is now releasing latent heat inside it — so the net cooling is roughly halved. That one change splits L2C26\'s single test into two, and the band between them covers most days.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'A corn plant has a base temperature of 10 °C. How many degree-days does a day with a mean temperature of 15 °C give it?',
            options: [
                '15',
                '5',
                '150',
                '1.5'
            ],
            correctIndex: 1,
            hint: 'Only the warmth above the base temperature counts towards development.',
            explanation: '15 - 10 = 5 degree-days. The first 10 °C buys nothing, because below 10 °C the plant does not develop at all. That subtraction is why cool summers are disproportionately worse rather than slightly worse: a 20 °C mean gives 10 degree-days a day and tassels on day 70, while a 15 °C mean gives only 5 a day and takes 140.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Two of the three Level 3 lessons found a dependence hiding inside a Level 2 constant. Which two?',
            options: [
                'The physics and the chemistry: 26 km/h hid sin(latitude), and 10 °C/km hid whether condensation had started',
                'The physics and the biology',
                'All three found one, and it was temperature every time',
                'None of them — the constants were exact'
            ],
            correctIndex: 0,
            hint: 'Which lesson changed the question instead of taking a constant apart?',
            explanation: 'Neither Level 2 rule was wrong; each had replaced something that varies with a single number, which works exactly where that thing does not vary much. So each came with a condition — the middle latitudes, nothing condensing — and the condition was the boundary of the answer. The biology lesson did something else entirely: instead of taking a constant apart, it stopped trying to predict the weather and predicted what the weather adds up to.'
        },

        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'At latitude 50, f = 1.117 x 10⁻⁴ per second and air density is 1.225 kg/m³. A gradient of 1 hPa per 100 km is 0.001 Pa per m. What wind does v = (1/(ρf)) x (Δp/Δn) give?',
            options: [
                'About 7.3 m/s, which is about 26 km/h',
                'About 0.001 m/s',
                'About 73 m/s',
                'About 1.2 m/s'
            ],
            correctIndex: 0,
            hint: 'Work out ρf first, then divide.',
            explanation: 'ρf = 1.225 x 1.117 x 10⁻⁴ = 1.369 x 10⁻⁴, and 0.001 / 1.369 x 10⁻⁴ = 7.31 m/s. Times 3.6 gives 26.3 km/h — which is exactly the calibration L2P26 was handed and could not justify. It falls out of a force balance, the air\'s density and the Earth\'s rate of spin.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'The surroundings cool at 9 °C per km and the cloud base is at 1.5 km. Using h = 4.5 x base / (rate - 5.5), at what height does the bubble stop needing help?',
            options: [
                'About 4.5 km',
                'About 1.9 km',
                'It never does, since 9 is below 10',
                'About 6.8 km'
            ],
            correctIndex: 1,
            hint: 'The 4.5 x base is a deficit in degrees. What turns a deficit into a height?',
            explanation: '4.5 x 1.5 / (9 - 5.5) = 6.75 / 3.5 = 1.93 km — only about 0.4 km above the cloud base, so a small hill could set this day off. The 4.5 km answer stops at 6.75, which is degrees rather than a height: degrees divided by degrees-per-km is what leaves km. And "never" is L2C26\'s test applied to the wrong half of the climb — below 10 means it will not start by itself, not that it cannot run.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'Corn needs 700 degree-days and gains 10 a day, so it tassels on day 70. Daily means scatter about the seasonal mean by 3 °C. How precisely can that date be predicted?',
            options: [
                'To about ± 2.5 days — spreads add through their squares, so 3 x √70 = 25 degree-days, and 25 / 10 = 2.5',
                'Not at all, because a weather forecast carries no information past about 15 days',
                'To about ± 21 days — seventy days each uncertain by 3 °C',
                'To about ± 0.3 days'
            ],
            correctIndex: 0,
            hint: 'Independent spreads do not add directly. What do they add through?',
            explanation: 'The spread of a sum of n independent contributions is σ√n rather than σn: 3 x √70 = 25 degree-days, only 3.6% of 700. Divide by the 10 degree-days gained each day and the date is good to ± 2.5 days — seventy days ahead, from a forecast that expires in a fortnight. Each day is still 3 °C uncertain; that ignorance has been diluted by sixty-nine others. The ± 21 answer adds the spreads directly instead of through their squares. And the scaling favours the long view: the spread grows as √n while the wait grows as n, so four times the wait only doubles the doubt.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'The same chart, with the same 1 hPa per 100 km gradient, is read at latitude 30 and at latitude 70. What winds does the balance give?',
            options: [
                'The same at both, since the chart is the same',
                'About 40 km/h at 30° and about 21 km/h at 70°',
                'About 21 km/h at 30° and about 40 km/h at 70°',
                'It cannot be worked out without the air temperature'
            ],
            correctIndex: 1,
            hint: 'f = 2Ω sin(latitude), and the wind is one over f.',
            explanation: 'f is smaller nearer the equator, and the wind is one over f, so the same gradient gives a stronger wind at lower latitudes: about 40 km/h at 30° against 21 at 70°. Half again as different, from where you are standing — which is the dependence L2P26\'s single constant could not show, because a calibration gives you a number without telling you what it varies with.'
        },

        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'A forecaster who used L2P26\'s rule successfully in Britain is posted to Singapore, 1.3° north. Her forecasts become useless although her ruler, charts and arithmetic are all fine. What should she do?',
            options: [
                'Recalculate the constant for 1.3° and carry on',
                'Use a different method entirely — at 1.3° there is effectively no deflection, so no geostrophic balance exists and the rule has no value there',
                'Reverse the wind direction, since the deflection flips near the equator',
                'Measure the pressure more precisely'
            ],
            correctIndex: 1,
            hint: 'What would the recalculated constant actually be, and is it a wind?',
            explanation: 'At 1.3° the constant would be about 890 km/h per hPa per 100 km — not a wind but a formula saying it has nothing to offer. The balance exists because the deflection can grow to match the push, and with f that small the air would have to move absurdly fast before it balanced anything; long before then it has crossed the isobars and reached the low. So the steady state the formula describes is never reached. Tropical weather is forecast by convection instead, which is L2C26\'s comparison.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'A morning balloon gives 8 °C per km with a cloud base at 1 km, and the forecast reads "thunderstorms possible, mainly over the hills". A colleague objects that 8 is below 10. Who is right?',
            options: [
                'The colleague — 8 is below 10, so no storms are possible',
                'The forecaster — the day is conditionally unstable, breaking even 1.8 km up, and a hill is something that can lift air that far',
                'Neither — the balloon reading must be wrong',
                'The forecaster, but only because hills make the lapse rate steeper above them'
            ],
            correctIndex: 1,
            hint: 'Work out both halves of the climb: below the cloud base and above it.',
            explanation: 'Below 1 km, (8-10) = -2 per km, so the bubble is 2 °C behind at its cloud base and will not get there alone. Above it, (8-5.5) = +2.5 per km closes that gap by 4.5 x 1 / 2.5 = 1.8 km. So everything for a storm is present except something to haul the air through the hardest part — and wind against rising ground does exactly that. The forecast is two separate findings: the atmosphere is loaded, and the trigger will be the hills. The last option has the mechanism backwards: hills lift air, they do not change the lapse rate above them.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'The ± 2.5 days assumed that each day was independent of the next. Warm and cool periods really come in spells of about 5 days. What does that do to the prediction?',
            options: [
                'Makes it worse: only 14 independent spells, each pushing the total for 5 days running, so the spread grows by about √5 to ± 5.6 days',
                'Nothing, because the season still contains 70 days whatever order they come in',
                'Makes it better, because spells average out over a whole season',
                'Makes it worse by a factor of 5, to ± 12.5 days'
            ],
            correctIndex: 0,
            hint: 'How many independent things are being added up, and how big is each one?',
            explanation: 'Independence is the condition the square-root rule needs. If a deviation lasts 5 days, a 70-day season holds only 70 / 5 = 14 independent spells, and each pushes the total by 5σ rather than σ. Adding 14 such pushes through their squares gives √14 x 15 = 56 degree-days, or ± 5.6 days — worse by √5, not by 5. Fewer and bigger independent pushes give the square-root rule less to work with, so the order of the days matters to the uncertainty even though it does not matter to the plant. And ± 5.6 days months ahead still beats anything a weather forecast can do.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'The physics and chemistry lessons each took a constant apart. The biology lesson did something different. What?',
            options: [
                'It gave up predicting the weather and predicted what the weather adds up to, which survives for months because the error in a sum grows only as the square root',
                'It found a fourth hidden dependence',
                'It showed that weather cannot be predicted at all',
                'It measured the same constant to more decimal places'
            ],
            correctIndex: 0,
            hint: 'What is a running total immune to?',
            explanation: 'A weather forecast dies in about a fortnight because its error doubles every day and a half. A forecast of an accumulated total survives for months because its error grows only as √n while the total grows as n. Those are the same fact from opposite sides: what makes tomorrow uncertain is day-to-day variation, and a running total is deaf to exactly that. So the Big Idea ends by changing the question — for when to sow, when to spray or when the pollen will fly, do not predict the weather, predict the thing that adds it up.'
        }
    ]
};

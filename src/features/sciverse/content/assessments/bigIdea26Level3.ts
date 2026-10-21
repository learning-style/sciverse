import { AssessmentData } from '../../types';

/**
 * Big Idea 26 Assessment -- LEVEL 3 (grades 9-12).
 * Covers L3P26 (the wind runs along the isobars because that is the only direction
 * where the pressure push and the Coriolis deflection cancel, and the balance gives
 * v = (1/(rho f)) x dp/dn -- which derives L2P26's 26 km/h and shows it was hiding
 * sin(latitude)), L3C26 (condensation releases latent heat, so the bubble cools at
 * 5.5 C/km above its cloud base rather than 10 -- two thresholds, a conditionally
 * unstable band covering most days, and breaking even at 4.5 x base / (rate - 5.5)),
 * L3B26 (chirping is a chemical rate, so it is exponential in temperature and
 * Dolbear's line is a local fit good over about twelve degrees).
 * The spine: each Level 2 calibration constant was a dependence nobody had noticed,
 * and the rule's range is wherever that dependence starts to matter.
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea26Level3Assessment: AssessmentData = {
    bigIdea: 26,
    level: 3,
    title: 'How Do We Predict Weather?',
    subtitle: 'Level 3 -- The Balance, the Kink, and the Tangent',
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
            question: 'Dolbear fitted a straight line to cricket chirp rates. Why should we not expect a straight line to be right?',
            options: [
                'Because crickets are unpredictable animals',
                'Because chirping is driven by muscle chemistry, and chemical rates multiply with temperature rather than adding',
                'Because he only used one species',
                'Because temperature cannot be measured accurately enough'
            ],
            correctIndex: 1,
            hint: 'What does a chemical rate do for every 10 °C of warming?',
            explanation: 'A chemical rate roughly doubles for every 10 °C — the Q10 factor. So the chirp rate goes as rate x Q10^((T-20)/10), which is an exponential: every ten degrees multiplies it rather than adding a fixed amount. A straight line through an exponential can only ever be a local fit.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Each Level 3 lesson found something hidden inside a Level 2 constant. Which set is right?',
            options: [
                'All three constants were simply measured wrongly',
                '26 km/h hid sin(latitude), 10 °C/km hid whether condensation had started, and 3 chirps per degree hid an exponential',
                'All three hid the same quantity, which was temperature',
                'The constants hid nothing — they were exact'
            ],
            correctIndex: 1,
            hint: 'What did each derivation turn out to depend on that the fitted number could not show?',
            explanation: 'None of the Level 2 rules was wrong; each replaced something that varies with a single number, which works exactly where that thing does not vary much. That is why every one of them came with a condition — the middle latitudes, nothing condensing, one species over a range — and the condition was the boundary of the answer.'
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
            question: 'A straight line is fitted tangent to a Q10 = 2 curve at 20 °C. Used at 30 °C, what does it do?',
            options: [
                'Reads about 15% high',
                'Reads about 15% low',
                'Reads exactly right, since 30 °C is only 10 degrees away',
                'Reads about 50% low'
            ],
            correctIndex: 1,
            hint: 'Which way does an exponential curve away from its own tangent?',
            explanation: 'At 30 °C the real rate has doubled while the line has only climbed by ten times its slope at 20, so it lands about 15% low. And low is the direction to remember: an exponential curves upward away from any tangent, so the line sits below the curve on BOTH sides. A fit through curved data is biased, not merely scattered, and bias does not average out however many readings you take.'
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
            question: 'A straight line fitted at 20 °C stays within 8% of the curve over 20 degrees when Q10 is 1.5, but only 7 degrees when Q10 is 3. What sets the width of a fitted line\'s useful range?',
            options: [
                'How many measurements went into the fit',
                'The curvature of the thing being approximated, and nothing else',
                'How precisely the temperature was measured',
                'The length of the range the data happened to cover'
            ],
            correctIndex: 1,
            hint: 'What changed between the two cases — the fitting, or the curve?',
            explanation: 'Nothing about the fitting changed; only how strongly the chemistry responds to temperature. A sharper curve leaves less of itself looking straight. That makes the range a property of the curve rather than of anyone\'s fieldwork — so you can estimate a linear rule\'s working range from the Q10 alone, without ever seeing the data it was fitted to.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'What is the general lesson the three Level 3 derivations share?',
            options: [
                'Fitted rules should be replaced by derived ones wherever possible',
                'A calibration constant is a dependence you have not noticed yet, and the rule\'s range is wherever that dependence starts to matter',
                'Constants should be quoted to more decimal places',
                'Weather cannot really be predicted at all'
            ],
            correctIndex: 1,
            hint: 'What did each of the three constants turn out to be standing in for?',
            explanation: 'Each Level 2 rule replaced something that varies with a single number, which is exactly right where that thing does not vary much — so each came with a condition, and the condition was the boundary of the answer. More decimal places would not help: a more precise wrong constant is still wrong, and measuring the 26 to four figures tells you nothing about the equator. What tells you about the equator is finding the sine. A derivation gives you the rule and its limits out of the same algebra, which is what measuring can never do.'
        }
    ]
};

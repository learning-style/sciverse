import { AssessmentData } from '../../types';

/**
 * Big Idea 17 Assessment -- LEVEL 3 (grades 9-12).
 * Covers L3P17 (buckling: pi^2 E I / L^2 against 30 x area, equal at 5.74 m),
 * L3C17 (thermal expansion match and concrete's alkalinity, why steel and not
 * aluminium), L3B17 (the second moment of area, distance to the fourth power).
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea17Level3Assessment: AssessmentData = {
    bigIdea: 17,
    level: 3,
    title: 'How Do Structures Stay Standing?',
    subtitle: 'Level 3 -- Buckling, Expansion, and the Fourth Power',
    icon: '🏗️',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'A real column has how many ways to fail under a downward load, and which one decides?',
            options: [
                'One — it crushes when the stress passes the limit',
                'Two — crushing and buckling, and it fails at whichever load is lower',
                'Two — crushing and buckling, and it fails at whichever load is higher',
                'Three — crushing, buckling and bending'
            ],
            correctIndex: 1,
            hint: 'A ruler pressed end-on never crushes.',
            explanation: 'Crushing arrives at 30 x area regardless of height; buckling arrives at π²EI/L² and falls as the square of height. The column fails at the lower of the two, which is why a tall column can fold at half its crushing load.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'A steel bar is set inside concrete and the beam warms up. What does the bond between them actually feel?',
            options: [
                'How much the steel expands',
                'How much the concrete expands',
                'The difference between the two expansions',
                'The sum of the two expansions'
            ],
            correctIndex: 2,
            hint: 'A bar expanding at exactly concrete’s rate would stress the bond not at all.',
            explanation: 'Both are stuck together, so only the mismatch matters: slip = (α of bar − α of concrete) x ΔT x length. Steel and concrete differ by just 2 x 10⁻⁶ /°C, which is why the pairing survives.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Bending stiffness counts a piece of material’s distance from the centre line to what power?',
            options: ['The first power', 'The second power', 'The fourth power', 'It does not depend on distance'],
            correctIndex: 2,
            hint: 'Material further out is stretched more AND pulls with more leverage.',
            explanation: 'Distance enters twice — once because outer material is stretched further, once because its pull acts over more leverage — giving distance squared per piece, and a fourth power of radius once totalled over a round section.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'In the buckling formula π²EI/L², what is E?',
            options: [
                'The strength of the material — the stress at which it gives way',
                'The stiffness of the material — how hard it resists deforming at all',
                'The energy stored in the column',
                'The eccentricity of the load'
            ],
            correctIndex: 1,
            hint: 'Two different properties, barely related.',
            explanation: 'E is the Young modulus, a stiffness: about 30,000 N/mm² for concrete, 200,000 for steel. Strength and stiffness are different — doubling concrete’s strength raises its E by only about a quarter.'
        },

        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'A 200 mm square concrete column is 6 m tall. It buckles at 1,097 kN and crushes at 1,200 kN. What happens, and what if it were only 3 m tall?',
            options: [
                'At 6 m it buckles; at 3 m it would buckle at 2,193 kN',
                'At 6 m it buckles, only just; at 3 m buckling rises to 4,386 kN so it would crush instead',
                'At 6 m it crushes; height does not affect the outcome',
                'At 6 m it buckles; at 3 m it also buckles, at 548 kN'
            ],
            correctIndex: 1,
            hint: 'L is squared, so halving the height multiplies the buckling load by four.',
            explanation: 'Halving the height quadruples the buckling load: 1,097 x 4 = 4,386 kN, which is well above the 1,200 kN crushing load, so the short column crushes instead. The two failures are equal at 5.74 m for this column.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'A 20 m beam goes through a 60 °C swing. How far do steel and concrete slide past each other? (α steel 12 x 10⁻⁶, α concrete 10 x 10⁻⁶ /°C)',
            options: ['2.4 mm', '14.4 mm', '0.0024 mm', '12 mm'],
            correctIndex: 0,
            hint: 'Use the mismatch, and put the length in millimetres.',
            explanation: '(12 − 10) x 10⁻⁶ x 60 x 20,000 = 2.4 mm. Using 12 x 10⁻⁶ instead gives 14.4 mm, which is how far the steel would move if it were free — but it is not free. Leaving the length in metres gives 0.0024.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'Material for a solid rod of radius 10 mm is rolled into a tube with a 2 mm wall, reaching 26 mm. The rod’s I is 7,854 mm⁴. How much stiffer is the tube?',
            options: ['2.6 times, the same as the reach', '12.5 times', '6.8 times', '50 times'],
            correctIndex: 1,
            hint: 'I = π(R⁴ − r⁴)/4, with R = 26 and r = 24.',
            explanation: 'I = π x (456,976 − 331,776)/4 = 98,332 mm⁴, and 98,332 / 7,854 = 12.5 times. The reach of 2.6 is the input, not the answer — and the thin-wall shortcut 2 x 2.6² predicts 13.5, within 8%.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Steel rusts in air, yet steel buried in sound concrete does not. Why?',
            options: [
                'The concrete keeps air and water away entirely',
                'Concrete is strongly alkaline, near pH 13, which grows a tough passive oxide film on the steel',
                'The steel is coated before it is cast in',
                'Concrete conducts electricity away from the steel'
            ],
            correctIndex: 1,
            hint: 'Cement releases calcium hydroxide as it sets.',
            explanation: 'At pH 13 the iron surface passivates — a microscopically thin oxide film forms that stops further attack. Concrete is chemically protecting the steel, not merely holding it. When cover cracks and the concrete carbonates, pH falls towards 8, the film goes, and rust splits the concrete from inside.'
        },

        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'An architect doubles a column’s height and proposes keeping its capacity by doubling the concrete’s strength from 30 to 60 N/mm². The column is already in the buckling regime. Does it work?',
            options: [
                'Yes — double the strength, double the capacity',
                'No. Doubling the height leaves a quarter of the buckling load, and buckling depends on E, not strength; doubling strength raises E by only about a quarter',
                'Yes, but only if the ends are also clamped',
                'No, because doubling strength halves the stiffness'
            ],
            correctIndex: 1,
            hint: 'Which of the two properties appears in π²EI/L²?',
            explanation: 'Buckling contains E, and strength and stiffness are barely related — twice the strength buys about a quarter more E. So the column goes from 100% to about 31% of its original buckling load, buying back 6 points of a 75-point loss. Widening it would work: I goes as b⁴, so a fifth wider doubles the buckling load.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'An engineer sleeves each aluminium bar in tough plastic so the alkaline concrete never touches the metal. Does aluminium-reinforced concrete now work?',
            options: [
                'Yes — corrosion was the obstacle, and it is now solved',
                'No. The sleeve answers the alkali but not the expansion mismatch, and a slippery sleeve destroys the grip the bar needs to carry anything',
                'Yes, provided the beam is under 10 m long',
                'No, because plastic cannot survive inside concrete'
            ],
            correctIndex: 1,
            hint: 'There were two objections, not one.',
            explanation: 'Aluminium still slips 6.5 times further than steel relative to concrete, and L2C17 established that a bar which slips carries nothing — a smooth sleeve is a deliberate slip surface. Aluminium’s E is also 70,000 against steel’s 200,000, so it picks up less load before the concrete cracks.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'A 1 mm wall gives 50 times the stiffness of the solid rod, and thinner would give more. Every wall thickness holds the same material. So what stops a bone going thinner?',
            options: [
                'It would weigh too little to be useful',
                'It runs out of material to spread',
                'A patch of the thin wall dents inwards — local buckling — and once the section is out of round, the I you calculated describes nothing',
                'The fourth power stops applying below 1 mm'
            ],
            correctIndex: 2,
            hint: 'I assumes the ring keeps its round shape while the whole bone curves.',
            explanation: 'Every row holds the same 314 mm², so weight and material cannot be the reason. I describes the whole section bending as one piece; a thin wall stops obeying that by denting locally. This is buckling met a third time in Big Idea 17, and a bone also has to survive sharp blows, which a thin wall handles badly.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'Across all six lessons of Big Idea 17, what is the single answer to how structures stay standing?',
            options: [
                'Use the strongest materials available',
                'Use more material wherever the load is greatest',
                'Arrange material against the force — and know the conditions under which each sum stops describing reality',
                'Combine two materials so that each carries what it is best at'
            ],
            correctIndex: 2,
            hint: 'P17 opened with two bridges of identical mass and different fates.',
            explanation: 'The pier spreads force over area, the beam puts steel where the pulling is, the tall column is defeated by height rather than weakness, steel qualifies by matching concrete rather than by being strongest, and the bone moves material outwards where distance counts to the fourth power. Every one keeps material constant and changes its arrangement — and every sum names where it stops: evenly pressed loads, pinned ends, one temperature, a round section.'
        }
    ]
};

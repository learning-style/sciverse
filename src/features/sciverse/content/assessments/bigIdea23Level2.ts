import { AssessmentData } from '../../types';

/**
 * Big Idea 23 Assessment -- LEVEL 2 (grades 6-8).
 * Covers L2P23 (stress at a notch = K x force/area, K = 1 + 2a/b, so a round hole
 * triples the stress whatever its size), L2C23 (zinc is above iron in the
 * reactivity series, so protection is a supply spent at a rate: thickness/rate),
 * L2B23 (skin closes from the edge at 0.5 mm a day, so shape beats area).
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea23Level2Assessment: AssessmentData = {
    bigIdea: 23,
    level: 2,
    title: 'How Do Materials Break and Recover?',
    subtitle: 'Level 2 -- The Corner, the Supply, and the Edge',
    icon: '🪓',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'A hole takes away a fiftieth of a plate\'s metal, and the plate loses far more than a fiftieth of its strength. Why?',
            options: [
                'The drilling weakens the metal around the hole',
                'Load follows the stiffest short path, so it bunches beside the hole — the average barely changes but the peak is large',
                'Holes let air reach the inside of the metal',
                'The plate is now thinner everywhere'
            ],
            correctIndex: 1,
            hint: 'Think of a crowd walking down a corridor with a pillar in the middle.',
            explanation: 'The crowd does not spread politely across the width; it bunches at the edges of the pillar. Load does the same, so the metal beside the hole carries far more than its share. And a material fails where the stress is highest, not on average.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Zinc sits above iron in the reactivity series. What does that mean for galvanised steel?',
            options: [
                'The zinc seals the steel so water cannot reach it',
                'The zinc gives up its electrons more readily, so the zinc corrodes and the iron does not',
                'The zinc makes the steel harder',
                'The zinc stops oxygen from forming'
            ],
            correctIndex: 1,
            hint: 'Reactivity is about how readily a metal gives up electrons.',
            explanation: 'Where the two metals touch and water reaches them, the more reactive one reacts. So the steel is not sealed off — it is out-competed. That is why the coating is a supply being spent on purpose rather than a barrier.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'New skin is made at the edge of a wound and creeps inward at about 0.5 mm a day. What follows about the middle of a wound?',
            options: [
                'It heals at the same rate as the edges',
                'It is not healing at all — it is waiting for the edges to arrive',
                'It heals faster, because it is furthest from infection',
                'It heals from underneath instead'
            ],
            correctIndex: 1,
            hint: 'Where does the new tissue actually come from?',
            explanation: 'There is nothing in the middle of a wound to make new skin from. The rim does the work and creeps inward, so the closing time depends on how far the edges have to travel — not on how much wound there is.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Using K = 1 + 2a/b, what is the stress concentration factor for a round hole?',
            options: [
                '3, because a round hole has a = b',
                '1, because nothing is stretched',
                '2, because there are two sides',
                'It depends on how big the hole is'
            ],
            correctIndex: 0,
            hint: 'A circle has the same width across the pull as along it.',
            explanation: 'K = 1 + 2 × 1 = 3. A round hole triples the stress, and it does so whether it is 1 mm or 10 mm across — size does not enter the formula at all. Shape does.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'A 500 mm² plate carries 25 kN and has a notch three times wider across the pull than along it. Steel yields at 250 N/mm². What happens?',
            options: [
                'It holds: the stress is 50 N/mm²',
                'It breaks: the average is 50 N/mm², K = 7, and 7 × 50 = 350 N/mm²',
                'It holds: K = 3, so 150 N/mm²',
                'It breaks, because 25 kN is more than steel can take'
            ],
            correctIndex: 1,
            hint: 'Average first, then the factor for the shape, then multiply.',
            explanation: 'K = 1 + 2×3 = 7, so the peak is 350 N/mm² and the plate fails on a load giving only a fifth of the steel\'s strength on average. Note that halving the load from 50 kN did not save it — sharpening the notch beat the load.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'A bolt has 20 µm of zinc and sits in heavy industry, where zinc is lost at 4 µm a year. How long is it protected?',
            options: [
                '5 years, from 20 µm divided by 4 µm a year',
                '80 years, from 20 × 4',
                '0.2 years, from 4 divided by 20',
                '24 years, from 20 + 4'
            ],
            correctIndex: 0,
            hint: 'Check the units of each answer: you want a time.',
            explanation: 'Multiplying gives µm² per year, an area changing with time. Dividing the other way gives "per year", a rate. Only 20/4 leaves years. Five years is uncomfortably short, which is the point — a thin electroplated coating is close to useless in a harsh place.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'Two wounds both cover 100 mm². One is a 10 mm square, one is a line 50 mm by 2 mm. How long does each take to close at 0.5 mm a day?',
            options: [
                'Both 10 days, since the area is the same',
                'The square 10 days, the line 2 days — the edges are 10 mm apart against 2 mm, and each travels half',
                'The square 20 days, the line 4 days',
                'The line takes longer, because it has a much greater length of edge to heal'
            ],
            correctIndex: 1,
            hint: 'How far apart are the two closing edges in each case?',
            explanation: 'The square\'s edges are 10 mm apart so each travels 5 mm: 10 days. The line\'s are 2 mm apart so each travels 1 mm: 2 days. Same area, same cells, same rate — five times the difference, all from shape.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: '85 µm of galvanising lasts 10.6 years in marine splash and 170 years in dry rural air. What does that say about durability?',
            options: [
                'The coating quality must differ between the two cases',
                'The life is a property of the place, not of the product — nothing about the steel or the coating changed',
                'Marine coatings are always applied more thinly',
                'The zinc reacts with salt to form a different metal'
            ],
            correctIndex: 1,
            hint: 'What was different between the two cases, and what was the same?',
            explanation: 'Same steel, same 85 µm of zinc. Only the air around it changed, and the loss rate runs from 0.5 to 8 µm a year — a sixteen-fold range. So the barrier is not "an 11-year barrier" or "a 170-year barrier"; the number belongs to the location.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'A bracket keeps cracking at a square inside corner. Is it better to make it 50% thicker, or to cut a rounded fillet into the corner?',
            options: [
                'Thicker — more metal always means more strength',
                'The fillet. Thickening divides the average by 1.5 and leaves K alone; rounding attacks K itself, which can divide the peak by far more',
                'Neither will help if the load stays the same',
                'Thicker, because a fillet removes metal from the failing spot'
            ],
            correctIndex: 1,
            hint: 'The peak is a product of two things. Which can you change the most?',
            explanation: 'Thickening takes a 700 N/mm² peak to 467 — still failing, and 50% heavier. Taking K from 7 to 2 by rounding takes it to 200 N/mm², with the same metal. When a quantity is a product, attack whichever factor you can change the most. It is why fillets and radii are everywhere once you look.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'A surgeon removes 100 mm² of skin as a long thin ellipse and stitches the edges together. Stitching removes no area at all. Why does it help so much?',
            options: [
                'It does not really help; the same amount of skin must be regrown either way',
                'Because the time depends on the distance between edges, and stitching collapses that distance to nearly zero',
                'Because stitches make the cells divide faster',
                'Because an ellipse has less area than a circle'
            ],
            correctIndex: 1,
            hint: 'What quantity actually sets the closing time?',
            explanation: 'Left open, the circle is 11.3 days and the ellipse 2 days; stitched, the ellipse is hours. The same skin is missing in every case. If a process is limited by a distance, change the distance — the same move as rounding a corner to drop K.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'A wound of 400 mm² that is 4 times longer than wide closes in 10 days — exactly as long as a 100 mm² square. How can four times the area take the same time?',
            options: [
                'The figures must be wrong',
                'The area sits under a square root, so four times the area doubles the short side — and being 4 times longer than wide halves it back again',
                'Larger wounds heal faster because they get more blood',
                'The rate must be different in the two cases'
            ],
            correctIndex: 1,
            hint: 'short side = √(area / r). Work out both.',
            explanation: '√(400/4) = 10 mm and √(100/1) = 10 mm — the same short side, so the same time. The two effects cancel exactly. Size is a weak lever because of the square root; shape is a strong one, which is why a bigger wound of a better shape heals no slower than a smaller wound of a worse one.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'Two steel posts are scratched to bare metal during installation — one painted, one galvanised. The painted one rusts at the scratch and the galvanised one does not. Why?',
            options: [
                'The paint was applied too thinly',
                'Paint is a barrier, and a barrier with a hole in it fails; zinc is a more reactive metal in contact with the steel, and that does not stop at the edge of the scratch',
                'Galvanised steel does not rust at all under any conditions',
                'The scratch in the zinc sealed itself immediately'
            ],
            correctIndex: 1,
            hint: 'What is each coating actually doing — blocking, or reacting?',
            explanation: 'Paint keeps water out, so a hole in it defeats it completely — which is why a chipped car grows a rust streak under paint that is otherwise perfect. Zinc is not blocking anything: it is still the more reactive metal beside the bare patch. A barrier protects only what it covers; this protects what it is near.'
        }
    ]
};

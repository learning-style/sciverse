import { AssessmentData } from '../../types';

/**
 * Big Idea 23 Assessment -- LEVEL 3 (grades 9-12).
 * Covers L3P23 (K runs to infinity, so fracture is energy not peak stress:
 * stress x sqrt(pi a) = K_IC, giving 12.7 mm in steel and 62 um in glass),
 * L3C23 (galvanising is a 0.32 V galvanic cell, so a scratch is the wrong
 * electrode rather than a covered one, with a reach set by the electrolyte),
 * L3B23 (one rule for every shape: days = inradius / rate).
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea23Level3Assessment: AssessmentData = {
    bigIdea: 23,
    level: 3,
    title: 'How Do Materials Break and Recover?',
    subtitle: 'Level 3 -- The Transaction, the Circuit, and the Inradius',
    icon: '🪓',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'The natural first guess, K = 1 + 2a/b, runs to infinity at a real crack tip, which would mean any scratch breaks anything. What does that tell you?',
            options: [
                'That cracks really are extremely dangerous',
                'That peak stress cannot be what decides fracture — if it were, the crack would already be running',
                'That the formula needs a correction factor',
                'That real crack tips are not actually sharp'
            ],
            correctIndex: 1,
            hint: 'What would be true of every scratched object if the formula were right?',
            explanation: 'Every material would split at its first scratch. Scratched windows and ships\' hulls are holding, so the criterion must be somewhere else entirely — which is the signal to look for a different quantity rather than to patch this one.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Corrosion of iron is written Fe → Fe²⁺ + 2e⁻. What does that reframing make possible?',
            options: [
                'Nothing — it is just another way of writing rust',
                'Stopping corrosion without keeping anything away from the iron: you only have to stop it losing electrons',
                'Removing the oxygen from the air around it',
                'Converting the rust back into iron'
            ],
            correctIndex: 1,
            hint: 'What is the damage, and when exactly does it happen?',
            explanation: 'The damage is done the moment the electrons leave; the rust is what the ions become afterwards. So the problem is electron loss, not water contact — which is why a coating that supplies electrons can protect metal it is not even touching.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'L2B23 used "half the short side" for a rectangle and "the radius" for a circle. What single quantity were both of those?',
            options: [
                'The perimeter divided by the area',
                'The inradius — the radius of the largest circle that fits inside the wound',
                'The square root of the area',
                'The average distance from the centre to the edge'
            ],
            correctIndex: 1,
            hint: 'What do "half the short side" and "the radius" have in common?',
            explanation: 'Both are the distance from the wound\'s centre to its nearest edge. A quantity with a different formula for every shape usually means the real quantity has not been identified yet — here it was the inradius, hiding because rectangles and circles name it differently.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Why does a crack\'s length matter for fracture while its tip sharpness does not?',
            options: [
                'Because longer cracks have sharper tips',
                'Because a longer crack relieves more stretched material, so it releases more energy — while the cost of one more millimetre of new surface stays the same',
                'Because length is easier to measure',
                'Because sharp tips blunt themselves in every material'
            ],
            correctIndex: 1,
            hint: 'Release grows with what? Cost grows with what?',
            explanation: 'Release goes as stress² × length; cost per millimetre is constant. So there is a length past which release overtakes cost and the crack runs away on its own. Sharpness only affects a few atoms\' worth of energy on both sides of the transaction, so it nearly cancels.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'Structural steel has K_IC = 50 MPa√m and works at 250 MPa; window glass has 0.7 MPa√m at 50 MPa. What crack can each tolerate?',
            options: [
                'Steel 12.7 mm, glass 62 µm — using (K_IC/stress)²/π',
                'Steel 0.2 mm, glass 0.014 mm — using K_IC/stress',
                'Both the same, since toughness and stress scale together',
                'Steel 200 mm, glass 14 mm'
            ],
            correctIndex: 0,
            hint: 'Square the ratio, then divide by π.',
            explanation: '(50/250)²/π = 12.7 mm and (0.7/50)²/π = 62 µm — a factor of about 200. That one comparison explains the everyday character of both materials: steel tolerates damage you can see, glass is destroyed by damage you cannot.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'In galvanising, Zn²⁺/Zn sits at −0.76 V and Fe²⁺/Fe at −0.44 V. What reaction happens at the exposed steel in a scratch?',
            options: [
                'Fe → Fe²⁺ + 2e⁻, but more slowly than usual',
                'O₂ + 2H₂O + 4e⁻ → 4OH⁻ — oxygen being reduced, using electrons the zinc supplied',
                'Zn → Zn²⁺ + 2e⁻, because the zinc has spread across the scratch',
                'Nothing at all, because the scratch is dry'
            ],
            correctIndex: 1,
            hint: 'The steel is the cathode. What gets reduced there?',
            explanation: 'The oxygen and water that would have rusted the iron are consumed on electrons the zinc released. So the steel is not protected by being covered — it is protected by being the wrong electrode, a place where electrons are spent rather than released.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'Why is perimeter divided by area the wrong quantity for closing time, even though it sounds right?',
            options: [
                'It is right, but harder to calculate',
                'Because an average cannot answer a question about the worst case — a shape with a thin arm and a fat blob is decided entirely by the blob',
                'Because perimeter is not measurable on a real wound',
                'Because area does not affect healing at all'
            ],
            correctIndex: 1,
            hint: 'When exactly is a wound closed?',
            explanation: 'The wound is closed when the LAST bare point is covered, not when enough skin has been made. Perimeter over area averages over the whole wound; the time is set by one stubborn point. The quantity needed is a maximum, not an average.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'A 30 mm bare strip in galvanising is splashed with seawater, which carries protection about 50 mm. Is it protected?',
            options: [
                'Yes — the furthest point is 15 mm from the nearest zinc, well inside 50 mm',
                'No — 30 mm of bare steel exceeds what zinc can bridge',
                'No, because seawater is the harshest environment',
                'Only at the very edges'
            ],
            correctIndex: 0,
            hint: 'There is zinc on both sides. How far is the furthest point from help?',
            explanation: 'The reach is measured inward from each side, so the furthest point is half the width — 15 mm, not 30. And "seawater is harshest so it must be worse" is backwards: its dissolved ions make it aggressive AND make it a good conductor, so it eats the zinc 16 times faster and carries protection 25 times further.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'A glazier scores glass about 20 µm deep on a 4 mm pane and snaps it cleanly. Why does this work, and why not on steel?',
            options: [
                'The wheel cuts most of the way through, so the glass is thinner there',
                'The score installs a crack near glass\'s 62 µm critical length; bending raises the stress, which lowers the critical length past 20 µm, so it runs. Steel needs 13 mm and would blunt the tip by yielding',
                'The glass is heated by the wheel and weakened',
                'Glass has no crystal structure, so it splits along any line'
            ],
            correctIndex: 1,
            hint: '20 µm on a 4 mm pane is one part in two hundred.',
            explanation: 'One part in two hundred cannot account for a clean break at a light bend — and the score still works a day later, or pressed from the opposite face. Glass-cutting is not cutting; it is crack installation, and it works because glass is brittle enough to honour it.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'Ordinary steel bolts are used to fasten a large stainless steel panel. Stainless is far less reactive. What happens?',
            options: [
                'The stainless protects the bolts, the way zinc protects steel',
                'The bolts corrode fast: ordinary steel is now the anode, and a small anode feeding a huge cathode concentrates a whole panel\'s circuit into a few bolts',
                'Nothing, because stainless steel does not corrode',
                'The panel corrodes instead of the bolts'
            ],
            correctIndex: 1,
            hint: 'Which metal is more reactive here — and how big is each part?',
            explanation: 'The circuit forms either way; which way round it runs is set by reactivity, not by which part you care about. The current is set largely by the cathode\'s area, and all of it must leave through the anode. So: if two metals must touch, make the small part the less reactive one. It is galvanising\'s own physics pointed the wrong way.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'Stitching a wound removes no area at all, and a graft does not make skin creep any faster. Why does each work?',
            options: [
                'Both simply reduce the risk of infection',
                'Both attack the inradius: stitching collapses it to nearly zero, and a graft installs new edges in the middle of a region that had none',
                'Both increase the rate at which cells divide',
                'Stitching works and grafting does not'
            ],
            correctIndex: 1,
            hint: 'What is the only quantity in days = inradius / rate?',
            explanation: 'Nobody can make skin creep faster than about half a millimetre a day. What a surgeon changes is how far it has to creep. Stitching brings two edges together; a graft installs edges where there were none — which is why a graft is not a shortcut but the only option for a large wound.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'Forty 1 mm cuts close in about a day; the same total area as one 40 mm circle takes about 40 days. How does this mirror the physics of fracture?',
            options: [
                'It does not — breaking and healing are unrelated processes',
                'Exactly inversely: cracking of a given total length is dangerous in ONE piece and harmless in many, while damage of a given area heals fast in MANY pieces and badly in one',
                'Both show that smaller is always better',
                'Both depend on the total amount of damage'
            ],
            correctIndex: 1,
            hint: 'In each case, what does concentrating the damage do?',
            explanation: 'Both say the same thing: what matters is not how much damage there is but how concentrated it is. Both breaking and healing happen at boundaries, and concentration is exactly what puts a point far from the nearest boundary — a crack tip far from a free surface, a wound centre far from an edge.'
        }
    ]
};

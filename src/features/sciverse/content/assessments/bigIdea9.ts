import { AssessmentData } from '../../types';

/**
 * Big Idea 9 Assessment: "How Do Things Grow?"
 * Covers P9 (Measuring Change), C9 (Nutrients & Elements), B9 (Cell Division)
 * 12 questions: 4 easy → 4 medium → 4 hard
 */
export const bigIdea9Assessment: AssessmentData = {
    bigIdea: 9,
    title: 'How Do Things Grow?',
    subtitle: 'Measuring Change, Nutrients & Cell Division',
    icon: '🎯',
    questions: [
        // ── EASY (1-4) ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'A plant grows from 5 cm to 15 cm in 10 days. What is its average growth rate?',
            options: ['0.5 cm per day', '1 cm per day — it grew 10 cm over 10 days', '1.5 cm per day', '2 cm per day'],
            correctIndex: 1,
            hint: 'Growth rate = total change in height ÷ total time...',
            explanation: 'The plant grew 15 − 5 = 10 cm in 10 days, so its average growth rate is 10 ÷ 10 = 1 cm per day. Growth rate tells us how fast something changes over time — it\'s the slope of the height-vs-time graph.',
            optionExplanations: [
                '0.5 cm/day would mean only 5 cm of growth over 10 days, reaching just 10 cm. But the plant reached 15 cm — so it grew faster than 0.5 cm/day.',
                'Correct! Change = 15 − 5 = 10 cm. Rate = 10 cm ÷ 10 days = 1 cm per day.',
                '1.5 cm/day would mean 15 cm of growth over 10 days, reaching 20 cm total. But the plant only reached 15 cm — the growth was 10 cm, not 15 cm.',
                '2 cm/day would mean 20 cm of growth in 10 days. The plant only grew 10 cm (from 5 to 15), so 2 cm/day is too fast.'
            ]
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Farmers add fertiliser labelled "NPK" to soil. What three elements do these letters stand for?',
            options: ['Neon, Phosphorus, Krypton', 'Nickel, Platinum, Potassium', 'Nitrogen, Phosphorus, Potassium — the three key nutrients plants need', 'Nitrogen, Palladium, Kalium'],
            correctIndex: 2,
            hint: 'N and P are straightforward. K comes from the Latin name "kalium"...',
            explanation: 'NPK stands for Nitrogen (N), Phosphorus (P), and Potassium (K). Nitrogen promotes leaf growth, phosphorus supports roots and flowers, and potassium strengthens overall plant health. These are the three macronutrients plants need most from soil.',
            optionExplanations: [
                'Neon and Krypton are noble gases — they\'re chemically inert and have nothing to do with plant nutrition. N stands for Nitrogen, K for Potassium (from Latin "Kalium").',
                'Nickel and Platinum are heavy metals not needed by plants. N stands for Nitrogen, P for Phosphorus, and K for Potassium.',
                'Correct! Nitrogen (N), Phosphorus (P), and Potassium (K — from Latin "Kalium") are the three essential macronutrients for plant growth.',
                'Close — N is Nitrogen and K does come from "Kalium" (Potassium), but P stands for Phosphorus, not Palladium. Palladium is a rare metal used in catalytic converters.'
            ]
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'When you cut your skin, new cells form to close the wound. What process produces these new cells?',
            options: ['Mitosis — one cell divides into two identical copies', 'Photosynthesis', 'Digestion', 'Respiration'],
            correctIndex: 0,
            hint: 'The body needs to make more cells that are genetically identical to replace the damaged ones...',
            explanation: 'Mitosis is the process where one cell divides to produce two genetically identical daughter cells. When you get a cut, skin cells around the wound undergo rapid mitosis to produce new cells that close the gap and repair the tissue.',
            optionExplanations: [
                'Correct! Mitosis produces two identical copies of a cell — exactly what\'s needed to replace damaged skin cells.',
                'Photosynthesis is how plants make food from sunlight. Human cells don\'t photosynthesise — they heal wounds through cell division (mitosis).',
                'Digestion breaks down food into nutrients. It happens in your stomach and intestines, not at a wound site. Wound healing requires making new cells.',
                'Respiration is how cells release energy from glucose. It powers the cell but doesn\'t create new cells. Cell division (mitosis) is what produces replacement cells.'
            ]
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'cross',
            question: 'A growth graph starts steep then flattens into an S-shape. What does the flat part at the top mean?',
            options: ['The organism is shrinking', 'Growth is speeding up', 'The organism has died', 'Growth has slowed or stopped — the organism reached its maximum size'],
            correctIndex: 3,
            hint: 'Think about what happens when a slope levels off — is the quantity still changing quickly?',
            explanation: 'An S-curve (sigmoid curve) shows slow initial growth, rapid growth in the middle, then levelling off. The flat top means growth has nearly stopped — the organism has reached its adult size or the environment can\'t support further growth (carrying capacity).',
            optionExplanations: [
                'A flat line means size is staying the same, not decreasing. If the organism were shrinking, the line would slope downward.',
                'If growth were speeding up, the line would be getting steeper, not flatter. A flat line means the rate of change is nearly zero.',
                'A flat line means the organism is maintaining its size — it\'s alive and stable. Death would show differently (e.g. a declining line as mass decreases).',
                'Correct! A flat top on an S-curve means growth has levelled off — the organism reached its maximum size or carrying capacity.'
            ]
        },
        // ── MEDIUM (5-8) ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'On a distance-time graph, a straight line sloping upward means constant speed. What does a curved line getting steeper mean?',
            options: ['The object is accelerating — covering more distance each second', 'The object is stationary', 'The object is slowing down', 'The object is moving at constant speed'],
            correctIndex: 0,
            hint: 'If the slope is increasing, the rate of change of distance is increasing...',
            explanation: 'The slope of a distance-time graph represents speed. A line that curves upward (getting steeper) means the slope is increasing over time — the object covers more distance each second, so it\'s accelerating. A straight line would mean constant speed.',
            optionExplanations: [
                'Correct! An increasingly steep curve means the rate of distance change is growing — that\'s acceleration.',
                'A stationary object would show a flat horizontal line (zero slope). A steepening curve shows the opposite — increasing speed.',
                'Slowing down would produce a curve that gets less steep (flattening out), not steeper. A steepening curve means the object is speeding up.',
                'Constant speed produces a straight line with unchanging slope. A curve that gets steeper means the speed is changing — specifically, increasing.'
            ]
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Plants need nitrogen to build proteins, but they can\'t use nitrogen gas (N₂) directly from the air. How do most plants get usable nitrogen?',
            options: ['They absorb N₂ through their leaves', 'Bacteria in the soil convert N₂ into nitrates that roots can absorb', 'Rain dissolves N₂ and delivers it to roots', 'Nitrogen enters through the flowers during pollination'],
            correctIndex: 1,
            hint: 'Certain soil bacteria (especially on legume roots) perform "nitrogen fixation"...',
            explanation: 'Nitrogen-fixing bacteria (e.g. Rhizobium in legume root nodules) convert atmospheric N₂ into ammonium or nitrates — forms that plant roots can absorb. This nitrogen cycle step is essential because plants cannot break the strong triple bond in N₂ themselves.',
            optionExplanations: [
                'Leaves absorb CO₂ for photosynthesis, but they cannot absorb N₂ gas. The triple bond in N₂ is too strong for plants to break — bacteria must do it first.',
                'Correct! Nitrogen-fixing bacteria convert N₂ into nitrates that plant roots can absorb from the soil.',
                'Rain does carry tiny amounts of dissolved nitrogen (from lightning reactions), but this is a minor source. The main supply comes from soil bacteria that "fix" atmospheric N₂ into usable forms.',
                'Pollination is about reproduction (transferring pollen for fertilisation). Nitrogen uptake happens through roots, not flowers, and requires bacteria to convert N₂ first.'
            ]
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'During mitosis, what must happen to the DNA before the cell splits in two?',
            options: ['The DNA must be destroyed so new DNA can form', 'The DNA must be cut in half so each cell gets half the information', 'The DNA must be replicated so each daughter cell gets a full, identical copy', 'The DNA leaves the nucleus and dissolves into the cytoplasm'],
            correctIndex: 2,
            hint: 'Both new cells need to be genetically identical — so they each need a complete set of chromosomes...',
            explanation: 'Before mitosis, every chromosome is duplicated during DNA replication (S phase). This ensures that when the cell divides, each daughter cell receives an identical, full set of genetic information. Without replication, cells would lose half their DNA each time they divided!',
            optionExplanations: [
                'Destroying DNA would kill the cell! DNA carries all the genetic instructions — it must be carefully copied, not destroyed, before cell division.',
                'Cutting DNA in half would give each cell incomplete instructions. That\'s what happens in meiosis (for sex cells), not mitosis. In mitosis, both cells need a FULL copy.',
                'Correct! DNA is replicated before division, ensuring both daughter cells receive a complete, identical copy of all genetic information.',
                'DNA doesn\'t dissolve — it\'s carefully organized into chromosomes. The nuclear envelope does break down during mitosis, but the DNA condenses into visible chromosomes rather than dissolving.'
            ]
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'A baby elephant gains 1 kg per day in its first year. If you plot its mass over 365 days, what does the slope of the graph represent?',
            options: ['The elephant\'s total mass', 'The elephant\'s height', 'The elephant\'s age', 'The growth rate — how much mass is gained per unit time'],
            correctIndex: 3,
            hint: 'Slope = rise ÷ run. Here, rise is mass change and run is time...',
            explanation: 'The slope of a mass-vs-time graph equals the change in mass divided by the change in time — that\'s the growth rate. A slope of 1 kg/day means the elephant gains 1 kg each day. If the slope were steeper, the elephant would be growing faster.',
            optionExplanations: [
                'Total mass is the y-value at any point on the graph, not the slope. The slope shows how fast that mass is changing over time.',
                'Height isn\'t plotted in this graph at all — the y-axis shows mass. Even if it were a height graph, the slope would represent the rate of change, not the height itself.',
                'Age is represented by the x-axis (time), not by the slope. The slope describes how much the y-value (mass) changes over that time period.',
                'Correct! Slope = change in mass ÷ change in time = growth rate. Here that\'s 1 kg per day.'
            ]
        },
        // ── HARD (9-12) ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'A bacterial colony doubles every 20 minutes. Starting with 100 cells, which expression gives the population after 2 hours?',
            options: ['100 × 2⁶ — since there are 6 doubling periods in 2 hours', '100 × 2 × 6', '100 × 6²', '100 + 2 × 6'],
            correctIndex: 0,
            hint: '2 hours = 120 minutes. How many 20-minute intervals fit in 120 minutes?',
            explanation: '120 min ÷ 20 min = 6 doubling periods. Each period multiplies the population by 2, so after 6 periods: 100 × 2⁶ = 100 × 64 = 6,400 cells. This is exponential growth — the steep middle part of an S-curve before resources limit it.',
            optionExplanations: [
                'Correct! 120 ÷ 20 = 6 doublings. Each doubles the total: 100 × 2⁶ = 100 × 64 = 6,400 cells.',
                '100 × 2 × 6 = 1,200. This treats the doubling as multiplication by 2 then by 6, but doubling is EXPONENTIAL — you multiply by 2 six TIMES (2⁶), not by 2 × 6.',
                '100 × 6² = 3,600. This squares the number of periods, but the growth is based on DOUBLING (base 2), not on squaring the period count.',
                '100 + 2 × 6 = 112. This adds just 12 cells — far too low! Exponential growth multiplies, it doesn\'t add. After 6 doublings, you have thousands of cells.'
            ]
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'Phosphorus is critical for plant growth. In what important biological molecule is phosphorus a key structural component?',
            options: ['Cellulose — the rigid plant cell wall polymer', 'Chlorophyll — the green pigment for photosynthesis', 'Starch — the energy storage molecule', 'DNA — the molecule that carries genetic instructions'],
            correctIndex: 3,
            hint: 'Think about the "backbone" of the double helix — what atoms link the nucleotides together?',
            explanation: 'DNA\'s sugar-phosphate backbone contains phosphorus atoms linking each nucleotide. Without phosphorus, cells cannot replicate DNA or produce ATP (adenosine triphosphate, the energy currency). That\'s why phosphorus deficiency severely stunts plant growth — it limits both energy transfer and cell division.',
            optionExplanations: [
                'Cellulose is made of glucose units (C, H, O only) — no phosphorus. It\'s the structural fibre in plant cell walls, but phosphorus isn\'t part of its chemistry.',
                'Chlorophyll contains magnesium at its centre, not phosphorus. Its structure is based on a porphyrin ring with nitrogen, carbon, hydrogen, and oxygen.',
                'Starch is a chain of glucose molecules (C₆H₁₂O₆) — it contains only carbon, hydrogen, and oxygen. No phosphorus is present in starch.',
                'Correct! DNA\'s backbone is made of sugar-phosphate links. Phosphorus is essential for DNA replication and ATP energy transfer.'
            ]
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'An organism grows from a single cell to trillions of cells. Growth involves both cell division and cell enlargement. Why are both needed?',
            options: ['Cell enlargement replaces damaged cells while division makes new ones', 'Division alone would produce too many tiny cells that can\'t function; enlargement alone can\'t increase cell number — both are needed for a functional, large organism', 'Division is for bones and enlargement is for muscles only', 'They are actually the same process with different names'],
            correctIndex: 1,
            hint: 'What would happen if cells only divided but never grew? Or only grew but never divided?',
            explanation: 'Cell division (mitosis) increases cell number, but new daughter cells are small. Cell enlargement allows each cell to reach the size needed to function properly (e.g. absorb nutrients, hold organelles). Together, they produce a large organism made of billions of appropriately sized, specialised cells.',
            optionExplanations: [
                'Both division AND enlargement work together for growth, not in separate roles. Replacing damaged cells uses division (mitosis), but enlargement isn\'t specifically for damage repair.',
                'Correct! Division increases cell number (but cells start small), and enlargement lets each cell reach functional size. Both are needed for a large, working organism.',
                'Both processes occur in all growing tissues, not just specific ones. Bones, muscles, skin, and organs all use both cell division and enlargement during growth.',
                'They are different processes: division splits one cell into two (adding cells), while enlargement increases a cell\'s size (adding volume). Both contribute differently to growth.'
            ]
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Farmers rotate crops — growing legumes one year, then wheat the next. How does this practice relate to nutrient cycling and growth?',
            options: ['Legumes use more water, leaving drier soil that wheat prefers', 'Legumes attract insects that eat wheat pests', 'Legumes host nitrogen-fixing bacteria that enrich the soil with nitrates, so the following wheat crop grows better without extra fertiliser', 'Rotating crops prevents seeds from mixing together'],
            correctIndex: 2,
            hint: 'Legumes have special root nodules. What lives inside them, and what do those organisms produce?',
            explanation: 'Legumes (beans, peas, clover) form symbiotic relationships with nitrogen-fixing bacteria in root nodules. These bacteria convert atmospheric N₂ into soil nitrates. When legumes are ploughed back or their roots decompose, the nitrogen-rich residues fertilise the soil naturally — reducing the need for synthetic NPK fertiliser for the next crop.',
            optionExplanations: [
                'While different crops do use water differently, that\'s not the main benefit of rotation. The key advantage is nitrogen enrichment from legume root bacteria.',
                'While varied crops can disrupt pest cycles, the primary benefit of legumes specifically is their nitrogen-fixing bacteria enriching the soil — not insect pest control.',
                'Correct! Legume root nodules house nitrogen-fixing bacteria that convert N₂ into soil nitrates, naturally fertilising the ground for the next crop.',
                'Seed mixing isn\'t a significant farming concern. Crop rotation\'s main benefit is nutrient management — legumes restore nitrogen that other crops deplete.'
            ]
        }
    ]
};


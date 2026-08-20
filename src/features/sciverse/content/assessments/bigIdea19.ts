import { AssessmentData } from '../../types';

/**
 * Big Idea 19 Assessment: "How Does Soil Support Life?"
 * Covers P19 (Soil & Water Flow), C19 (Soil Chemistry), B19 (Soil Biodiversity)
 * 12 questions: 4 easy → 4 medium → 4 hard
 */
export const bigIdea19Assessment: AssessmentData = {
    bigIdea: 19,
    title: 'How Does Soil Support Life?',
    subtitle: 'Porosity, Soil Chemistry, and Biodiversity',
    icon: '🌱',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Soil drainage rate is strongly affected by:',
            options: ['Pore size and connectivity', 'Soil color only', 'Moonlight', 'Plant leaf shape'],
            correctIndex: 0,
            hint: 'Water needs pathways.',
            explanation: 'Porosity and pore networks control water movement through soil.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Nutrients can be present but poorly available when:',
            options: ['pH is outside useful range', 'Rain is light', 'Soil is dark', 'Field is flat'],
            correctIndex: 0,
            hint: 'Solubility and ion form.',
            explanation: 'pH affects nutrient chemistry and root uptake availability.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Decomposers in soil mainly:',
            options: ['Stop nutrient cycling', 'Recycle organic matter into available nutrients', 'Remove all oxygen permanently', 'Only increase erosion'],
            correctIndex: 1,
            hint: 'Think nutrient recycling.',
            explanation: 'Decomposers transform dead matter and support nutrient cycles.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'A single teaspoon of healthy soil contains:',
            options: ['Billions of bacteria and many other organisms', 'Nothing living', 'Only sand', 'One earthworm'],
            correctIndex: 0,
            hint: 'Soil is crowded with life.',
            explanation: 'Healthy soil holds billions of microbes plus fungi, nematodes and more.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'Best description of healthy soil for roots is:',
            options: ['Only maximum water content', 'Balanced water retention and aeration', 'No organisms', 'Only clay texture'],
            correctIndex: 1,
            hint: 'Roots need water and oxygen.',
            explanation: 'Productive soils balance moisture, airflow, chemistry, and biology.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'Porosity and permeability are different because porosity is the total space, while permeability is:',
            options: ['How easily water can actually flow through', 'How heavy the soil is', 'The colour of the soil', 'How much sunlight it absorbs'],
            correctIndex: 0,
            hint: 'Connected pores matter, not just empty space.',
            explanation: 'Flow depends on pore size and connectivity, not merely total void volume.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Plants need nitrogen and phosphorus mainly to build:',
            options: ['DNA and proteins', 'Sunlight', 'Water', 'Oxygen gas'],
            correctIndex: 0,
            hint: 'Sugar alone cannot build a plant.',
            explanation: 'Nitrogen and phosphorus are essential for proteins and genetic material.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'Heavily compacted soil drains poorly because compaction:',
            options: ['Squeezes the pore spaces closed', 'Adds more nutrients', 'Increases the pore size', 'Makes soil lighter'],
            correctIndex: 0,
            hint: 'What happens to the gaps?',
            explanation: 'Compaction collapses pores, cutting both infiltration and oxygen supply.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'If decomposer diversity drops and pH is poor, likely outcome is:',
            options: ['Stronger nutrient cycling and growth', 'Slower nutrient cycling and weaker plant performance', 'No effect', 'Instant soil sterilization always'],
            correctIndex: 1,
            hint: 'Combine chemistry and ecology.',
            explanation: 'Biological and chemical constraints can compound to reduce productivity.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'Chlorophyll, the green molecule in leaves, requires which nutrient from soil?',
            options: ['Magnesium', 'Gold', 'Lead', 'Neon'],
            correctIndex: 0,
            hint: 'It sits at the centre of the chlorophyll molecule.',
            explanation: 'Magnesium is the central atom in chlorophyll, so shortage causes yellowing.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'Why does removing soil organisms reduce plant growth even if fertiliser is added?',
            options: ['Organisms unlock nutrients and maintain soil structure', 'Fertiliser is poisonous', 'Plants eat the organisms', 'Organisms make sunlight'],
            correctIndex: 0,
            hint: 'Think about decomposers and soil texture.',
            explanation: 'Soil life recycles nutrients and keeps the pore structure roots depend on.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Sandy soil drains fast and holds few nutrients. Why are these two facts linked?',
            options: ['Water moving through quickly carries dissolved nutrients away with it', 'Sand destroys nutrients', 'Sand is too heavy', 'Nutrients avoid sand'],
            correctIndex: 0,
            hint: 'Think about what flowing water carries.',
            explanation: 'Rapid drainage leaches dissolved nutrients beyond the root zone.'
        }
    ]
};

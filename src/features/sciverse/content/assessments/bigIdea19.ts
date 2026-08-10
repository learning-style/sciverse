import { AssessmentData } from '../../types';

export const bigIdea19Assessment: AssessmentData = {
    bigIdea: 19,
    title: 'How Does Soil Support Life?',
    subtitle: 'Porosity, Soil Chemistry, and Biodiversity',
    icon: '🌱',
    questions: [
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
            difficulty: 'medium',
            discipline: 'cross',
            question: 'Best description of healthy soil for roots is:',
            options: ['Only maximum water content', 'Balanced water retention and aeration', 'No organisms', 'Only clay texture'],
            correctIndex: 1,
            hint: 'Roots need water and oxygen.',
            explanation: 'Productive soils balance moisture, airflow, chemistry, and biology.'
        },
        {
            id: 5,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'If decomposer diversity drops and pH is poor, likely outcome is:',
            options: ['Stronger nutrient cycling and growth', 'Slower nutrient cycling and weaker plant performance', 'No effect', 'Instant soil sterilization always'],
            correctIndex: 1,
            hint: 'Combine chemistry and ecology.',
            explanation: 'Biological and chemical constraints can compound to reduce productivity.'
        }
    ]
};

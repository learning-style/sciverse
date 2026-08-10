import { AssessmentData } from '../../types';

/**
 * Big Idea 10 Assessment: "How Do We Protect Our Planet?"
 * Covers P10 (Renewable Energy), C10 (Air Pollution), B10 (Ecosystems & Biodiversity)
 * 12 questions: 4 easy → 4 medium → 4 hard
 */
export const bigIdea10Assessment: AssessmentData = {
    bigIdea: 10,
    title: 'How Do We Protect Our Planet?',
    subtitle: 'Renewable Energy, Air Pollution & Ecosystems',
    icon: '🎯',
    questions: [
        // ── EASY (1-4) ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Solar panels convert sunlight into electricity. What type of energy source is sunlight classified as?',
            options: ['Fossil fuel', 'Renewable — the Sun will keep shining for billions of years', 'Nuclear', 'Non-renewable'],
            correctIndex: 1,
            hint: 'A renewable source is one that won\'t run out on a human timescale...',
            explanation: 'Sunlight is a renewable energy source because the Sun continuously produces energy through nuclear fusion and will do so for billions of years. Unlike fossil fuels (coal, oil, gas), which take millions of years to form and are being depleted, solar energy is effectively inexhaustible.',
            optionExplanations: [
                'Fossil fuels (coal, oil, gas) formed from ancient organisms over millions of years. Sunlight is produced continuously by the Sun — it\'s not stored underground like fossil fuels.',
                'Correct! The Sun will shine for roughly 5 billion more years, making sunlight effectively inexhaustible on human timescales.',
                'Nuclear energy comes from splitting atoms (fission) in power plants on Earth. While the Sun does use nuclear fusion, the energy source "sunlight" is classified as renewable, not nuclear.',
                'Non-renewable means it will eventually run out (like coal or oil). The Sun continuously produces energy — sunlight won\'t be depleted during human civilisation\'s timespan.'
            ]
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Cars and factories burn fossil fuels and release a gas that traps heat in the atmosphere. Which gas is this?',
            options: ['Oxygen (O₂)', 'Nitrogen (N₂)', 'Carbon dioxide (CO₂) — a greenhouse gas that traps infrared radiation', 'Helium (He)'],
            correctIndex: 2,
            hint: 'This gas contains carbon and is produced whenever carbon-based fuels burn...',
            explanation: 'Burning fossil fuels (combustion) produces CO₂, a greenhouse gas. CO₂ molecules absorb infrared radiation emitted by Earth\'s surface and re-emit it in all directions, trapping heat in the atmosphere. Rising CO₂ levels from human activity are the main driver of climate change.',
            optionExplanations: [
                'Oxygen is consumed during combustion, not produced. It\'s actually used UP when fuels burn (fuel + O₂ → CO₂ + H₂O). Oxygen doesn\'t trap heat.',
                'Nitrogen makes up 78% of the atmosphere and is mostly inert — it doesn\'t participate in combustion or trap significant heat. N₂ is not a greenhouse gas.',
                'Correct! CO₂ is produced when carbon-based fuels burn. Its molecular structure allows it to absorb and re-emit infrared radiation, trapping heat.',
                'Helium is a noble gas — it\'s chemically inert and doesn\'t interact with infrared radiation. It\'s not produced by combustion and has no greenhouse effect.'
            ]
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'In a food web, arrows point from prey to predator. If all the rabbits in a meadow disappeared, what would most likely happen to the foxes?',
            options: ['Fox numbers would increase because there\'s less competition', 'Foxes would start photosynthesising', 'Nothing — foxes don\'t eat rabbits', 'Fox numbers would decrease because they lost a food source'],
            correctIndex: 3,
            hint: 'Foxes depend on rabbits for energy. Remove the food and...',
            explanation: 'Foxes are predators that rely on rabbits as a key food source. If rabbits vanished, foxes would have less food, leading to starvation and a population decline. This shows how organisms in a food web are interdependent — removing one species has knock-on effects.',
            optionExplanations: [
                'Rabbits aren\'t competitors of foxes — they\'re prey. Losing prey means LESS food for foxes, not less competition. Fewer rabbits = fewer foxes.',
                'Only plants and some bacteria photosynthesise. Animals cannot make food from sunlight — they must eat other organisms. Foxes can\'t develop photosynthesis!',
                'Foxes are well-known predators of rabbits. Rabbits are a major food source for foxes in meadow ecosystems.',
                'Correct! Losing a key food source means less energy available, leading to starvation and population decline for the predator.'
            ]
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'cross',
            question: 'Wind turbines convert moving air into electricity. What energy transformation occurs inside a wind turbine?',
            options: ['Chemical energy → light energy', 'Kinetic energy of wind → electrical energy', 'Thermal energy → sound energy', 'Nuclear energy → kinetic energy'],
            correctIndex: 1,
            hint: 'Moving air has kinetic energy. The turbine blades spin a generator...',
            explanation: 'Wind (moving air) has kinetic energy. The turbine blades capture this kinetic energy and spin a generator, which converts it into electrical energy. This is a clean, renewable conversion — no fuel is burned and no greenhouse gases are produced during operation.',
            optionExplanations: [
                'Chemical energy → light energy describes a light bulb or candle, not a wind turbine. No chemical reactions or light production are involved in wind power.',
                'Correct! Moving air (kinetic energy) pushes blades that spin a generator, converting motion into electrical energy.',
                'Wind turbines don\'t use thermal (heat) energy as input, and they don\'t primarily produce sound. The input is kinetic energy from moving air.',
                'Nuclear energy is released from splitting atoms in a reactor. Wind turbines use the kinetic energy of moving air — no nuclear reactions are involved.'
            ]
        },
        // ── MEDIUM (5-8) ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'A hydroelectric dam stores water at a height. When released, the water spins turbines. What energy store does the elevated water have before release?',
            options: ['Gravitational potential energy — due to its height above the turbines', 'Chemical energy', 'Elastic potential energy', 'Nuclear energy'],
            correctIndex: 0,
            hint: 'Any object raised above the ground gains energy due to gravity. What is that energy called?',
            explanation: 'Water held at height behind a dam has gravitational potential energy (GPE = mgh). When released, GPE converts to kinetic energy as water falls, then to electrical energy as it spins turbines connected to generators. Hydroelectric power is renewable because the water cycle continuously refills reservoirs.',
            optionExplanations: [
                'Correct! Water at height has gravitational potential energy (GPE = mass × g × height). When released, this converts to kinetic then electrical energy.',
                'Chemical energy is stored in molecular bonds (like in food or fuel). Water at height stores energy due to gravity and position, not chemical bonds.',
                'Elastic potential energy is in stretched or compressed objects (like springs or rubber bands). Water behind a dam isn\'t being stretched or compressed — its energy comes from its height.',
                'Nuclear energy comes from splitting or fusing atomic nuclei. Water in a dam stores energy due to its elevated position in a gravitational field, not from nuclear reactions.'
            ]
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Acid rain forms when certain pollutant gases dissolve in rainwater. Which TWO gases are the main culprits?',
            options: ['Oxygen and nitrogen', 'Methane and ozone', 'Carbon monoxide and helium', 'Sulfur dioxide (SO₂) and nitrogen oxides (NOₓ) — they form sulfuric and nitric acid in rain'],
            correctIndex: 3,
            hint: 'These gases come mainly from burning fossil fuels and react with water vapour in clouds...',
            explanation: 'SO₂ (from burning coal containing sulfur) and NOₓ (from high-temperature combustion in vehicles) dissolve in atmospheric moisture to form sulfuric acid (H₂SO₄) and nitric acid (HNO₃). This acid rain damages forests, lakes, and stone buildings — a direct consequence of air pollution.',
            optionExplanations: [
                'Oxygen and nitrogen make up 99% of clean air and are not pollutants. They don\'t form acids when dissolved in rain under normal conditions.',
                'Methane is a greenhouse gas but doesn\'t cause acid rain. Ozone in the stratosphere protects us from UV, and ground-level ozone is a smog component — but neither forms acid rain.',
                'Carbon monoxide is a toxic pollutant but doesn\'t form acid in rainwater. Helium is an inert noble gas that doesn\'t react with anything in the atmosphere.',
                'Correct! SO₂ forms sulfuric acid and NOₓ forms nitric acid when they dissolve in rainwater — these are the two main causes of acid rain.'
            ]
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'Wolves were reintroduced to Yellowstone Park and the entire ecosystem improved. What term describes a species whose impact is disproportionately large relative to its numbers?',
            options: ['Keystone species — removing them causes the ecosystem to change dramatically', 'Endangered species', 'Invasive species', 'Parasitic species'],
            correctIndex: 0,
            hint: 'Like a keystone in an arch, remove this species and the whole structure collapses...',
            explanation: 'A keystone species has an outsized effect on its ecosystem. Wolves controlled elk populations, which allowed vegetation to recover, stabilised riverbanks, and benefited dozens of other species. This chain reaction — where a top predator\'s effect cascades through trophic levels — is called a trophic cascade.',
            optionExplanations: [
                'Correct! Like the keystone in an arch, a keystone species holds the ecosystem together — remove it and the whole structure changes dramatically.',
                'Endangered species are at risk of extinction due to low numbers. While wolves were endangered, the term describing their outsized ecological impact is "keystone species," not "endangered."',
                'Invasive species are non-native organisms that harm an ecosystem. Wolves are a native species that was being RESTORED to Yellowstone, not invading it.',
                'Parasitic species live on or in a host organism, harming it. Wolves are predators, not parasites — they hunt and kill prey rather than living on a host.'
            ]
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'The ozone layer in the stratosphere protects life on Earth. What does it shield us from?',
            options: ['Visible light from the Sun', 'Harmful ultraviolet (UV) radiation that can cause skin cancer and damage DNA', 'Radio waves from space', 'Infrared radiation that causes warming'],
            correctIndex: 1,
            hint: 'Ozone (O₃) absorbs a specific type of high-energy solar radiation...',
            explanation: 'The ozone layer absorbs most of the Sun\'s harmful UV-B and UV-C radiation, which can damage DNA, cause skin cancer, and harm marine plankton. CFCs (chlorofluorocarbons) once thinned this layer, but the Montreal Protocol banned them, and the ozone layer is slowly recovering.',
            optionExplanations: [
                'Visible light passes through the ozone layer — that\'s why we can see! The ozone layer specifically absorbs UV radiation, not visible light.',
                'Correct! Ozone (O₃) absorbs harmful UV-B and UV-C radiation, protecting living organisms from DNA damage and skin cancer.',
                'Radio waves are low-energy and pass through the atmosphere harmlessly. The ozone layer deals with high-energy ultraviolet radiation, not low-energy radio waves.',
                'Infrared radiation is associated with heat and the greenhouse effect (involving CO₂, not ozone). The ozone layer absorbs ultraviolet radiation, which has higher energy than infrared.'
            ]
        },
        // ── HARD (9-12) ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'A solar panel has 20% efficiency and receives 1,000 W/m² of sunlight. If the panel area is 2 m², how much electrical power does it produce?',
            options: ['200 W', '2,000 W', '1,000 W', '400 W — calculated as 1,000 × 2 × 0.20'],
            correctIndex: 3,
            hint: 'Power input = intensity × area. Then multiply by efficiency...',
            explanation: 'Power input = 1,000 W/m² × 2 m² = 2,000 W. At 20% efficiency, electrical output = 2,000 × 0.20 = 400 W. The remaining 80% is lost as heat. Improving panel efficiency is a major goal of renewable energy research — current commercial panels range from 15–22%.',
            optionExplanations: [
                '200 W only accounts for 1 m² of panel (1,000 × 1 × 0.20). But the panel is 2 m², so the total input is 2,000 W, and 20% of that is 400 W.',
                '2,000 W is the total solar power hitting the panel (1,000 × 2), but you haven\'t applied the 20% efficiency. Only 20% of input becomes electricity: 2,000 × 0.20 = 400 W.',
                '1,000 W is just the intensity per square metre. You need to multiply by the area (2 m²) AND the efficiency (0.20): 1,000 × 2 × 0.20 = 400 W.',
                'Correct! Input = 1,000 × 2 = 2,000 W. At 20% efficiency: 2,000 × 0.20 = 400 W of electrical power.'
            ]
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'CO₂ is a greenhouse gas, but so is methane (CH₄). Per molecule, methane traps about 80 times more heat than CO₂ over 20 years. Why is CO₂ still considered the bigger climate problem?',
            options: ['CO₂ is actually more potent per molecule than methane', 'Methane doesn\'t really affect the climate', 'Humans emit far more CO₂ than methane, and CO₂ persists in the atmosphere for centuries — so its cumulative effect is greater', 'CO₂ blocks visible light while methane doesn\'t'],
            correctIndex: 2,
            hint: 'Total warming = potency per molecule × amount emitted × how long it stays...',
            explanation: 'Although methane is more potent per molecule, CO₂ is emitted in vastly larger quantities (from fossil fuels, industry, deforestation) and remains in the atmosphere for 300–1,000 years, whereas methane breaks down in about 12 years. The sheer volume and persistence of CO₂ make it the dominant driver of long-term climate change.',
            optionExplanations: [
                'The question itself states methane traps ~80× more heat per molecule than CO₂. CO₂ is LESS potent per molecule — but the total impact depends on quantity and persistence too.',
                'Methane absolutely affects the climate — it\'s a powerful greenhouse gas! But its atmospheric lifetime is only ~12 years, while CO₂ persists for centuries. Volume and persistence matter.',
                'Correct! CO₂ is emitted in much larger quantities and stays in the atmosphere for 300–1,000 years, making its total cumulative warming effect greater despite lower per-molecule potency.',
                'Neither CO₂ nor methane blocks visible light. Both absorb infrared (heat) radiation. The difference is in how much is emitted and how long each persists.'
            ]
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'Removing wolves from an ecosystem led to deer overpopulation, which overgrazed plants, causing soil erosion and riverbank collapse. This chain of effects is called a:',
            options: ['Trophic cascade — changes at the top predator level ripple down through every trophic level', 'Symbiotic relationship', 'Nitrogen cycle', 'Carbon fixation'],
            correctIndex: 0,
            hint: '"Trophic" relates to feeding levels, and "cascade" means a series of effects flowing downward...',
            explanation: 'A trophic cascade occurs when changes at one trophic level (e.g. removing top predators) trigger dramatic effects down the food web. Without wolves, deer populations exploded, vegetation was overgrazed, and the physical landscape changed. This demonstrates why biodiversity — especially apex predators — is critical for ecosystem stability.',
            optionExplanations: [
                'Correct! "Trophic" means feeding level and "cascade" means flowing downward — removing top predators sends ripple effects through every level below.',
                'A symbiotic relationship is a close, long-term interaction between two species (like mutualism or parasitism). The cascading ecosystem-wide effects from removing wolves involve many species across multiple levels.',
                'The nitrogen cycle describes how nitrogen moves through ecosystems (air → soil → plants → animals → decomposers → air). It doesn\'t describe predator-prey chain reactions.',
                'Carbon fixation is the process plants use to convert CO₂ into organic molecules during photosynthesis. It\'s a biochemical process, not a description of cascading ecological effects.'
            ]
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Biodiversity is important for ecosystem resilience. Which statement best explains WHY high biodiversity helps an ecosystem survive environmental changes?',
            options: ['More species means more competition, which makes every species stronger', 'High biodiversity just looks nicer and attracts tourists', 'With many species filling different roles, if one species declines, others can compensate — maintaining ecosystem functions like pollination, decomposition, and nutrient cycling', 'Biodiversity only matters in tropical rainforests, not other ecosystems'],
            correctIndex: 2,
            hint: 'Think of redundancy — if multiple species perform similar roles, losing one isn\'t catastrophic...',
            explanation: 'High biodiversity provides functional redundancy: multiple species contribute to essential processes (pollination, decomposition, pest control). If one species is lost to disease or climate change, others can fill its ecological role, preventing ecosystem collapse. Low-biodiversity ecosystems are fragile — losing a single key species can be devastating.',
            optionExplanations: [
                'More competition actually stresses species rather than strengthening them. The real benefit of biodiversity is functional redundancy — multiple species performing overlapping roles, so losing one isn\'t catastrophic.',
                'While biodiversity can attract ecotourism, that\'s a human economic benefit, not an ecological explanation. Biodiversity helps ecosystems FUNCTION — through redundancy in pollination, decomposition, and nutrient cycling.',
                'Correct! Functional redundancy means multiple species share similar roles. If one is lost, others compensate — keeping essential ecosystem processes running.',
                'Biodiversity is critical in ALL ecosystems — oceans, grasslands, deserts, forests, and arctic regions all depend on species diversity for resilience. Tropical rainforests just have the highest biodiversity.'
            ]
        }
    ]
};


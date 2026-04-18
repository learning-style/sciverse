import { useMemo, useState, useCallback, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Beaker, Dna, Atom } from 'lucide-react';
import { SocraticChat } from '../components/SocraticChat';
import { useDialogEngine } from '../hooks/useDialogEngine';
import { LESSON_SCRIPTS, LESSON_REGISTRY } from '../content/lessons';
import { LEVEL1_MAX_VISIBLE_CONTROLS, LEVEL1_NORMALIZATION_ENABLED } from '../content/level1Standard';
import { SimAction, LessonMeta } from '../types';
import { C1ParticleLab } from '../components/visuals/C1ParticleLab';
import { P1CrateLab } from '../components/visuals/P1CrateLab';
import { B1MuscleLab } from '../components/visuals/B1MuscleLab';
import { P2StatesLab } from '../components/visuals/P2StatesLab';
import { C2AtomsLab } from '../components/visuals/C2AtomsLab';
import { B2CellsLab } from '../components/visuals/B2CellsLab';
import { P3EnergyRampLab } from '../components/visuals/P3EnergyRampLab';
import { C3ReactionsLab } from '../components/visuals/C3ReactionsLab';
import { B3FoodChainLab } from '../components/visuals/B3FoodChainLab';
import { P4SoundWavesLab } from '../components/visuals/P4SoundWavesLab';
import { C4LightColorLab } from '../components/visuals/C4LightColorLab';
import { B4SensesLab } from '../components/visuals/B4SensesLab';
import { P5LeversLab } from '../components/visuals/P5LeversLab';
import { C5DissolvingLab } from '../components/visuals/C5DissolvingLab';
import { B5HomeostasisLab } from '../components/visuals/B5HomeostasisLab';
import { P6DensityLab } from '../components/visuals/P6DensityLab';
import { C6MixturesLab } from '../components/visuals/C6MixturesLab';
import { B6FishLab } from '../components/visuals/B6FishLab';
import { P7CircuitsLab } from '../components/visuals/P7CircuitsLab';
import { C7BatteryLab } from '../components/visuals/C7BatteryLab';
import { B7NerveLab } from '../components/visuals/B7NerveLab';
import { P8HeatLab } from '../components/visuals/P8HeatLab';
import { C8WaterCycleLab } from '../components/visuals/C8WaterCycleLab';
import { B8AdaptationsLab } from '../components/visuals/B8AdaptationsLab';
import { P9MeasuringLab } from '../components/visuals/P9MeasuringLab';
import { C9NutrientsLab } from '../components/visuals/C9NutrientsLab';
import { B9CellDivisionLab } from '../components/visuals/B9CellDivisionLab';
import { P10EnergyLab } from '../components/visuals/P10EnergyLab';
import { C10PollutionLab } from '../components/visuals/C10PollutionLab';
import { B10EcosystemsLab } from '../components/visuals/B10EcosystemsLab';
import { P11BloodPressureLab } from '../components/visuals/P11BloodPressureLab';
import { C11AcidsBasesLab } from '../components/visuals/C11AcidsBasesLab';
import { B11ImmuneLab } from '../components/visuals/B11ImmuneLab';
import { P12GravityLab } from '../components/visuals/P12GravityLab';
import { C12PeriodicTableLab } from '../components/visuals/C12PeriodicTableLab';
import { B12NaturalSelectionLab } from '../components/visuals/B12NaturalSelectionLab';
import { P13GearsLab } from '../components/visuals/P13GearsLab';
import { C13PolymersLab } from '../components/visuals/C13PolymersLab';
import { B13PhotosynthesisLab } from '../components/visuals/B13PhotosynthesisLab';
import { P14WavesLab } from '../components/visuals/P14WavesLab';
import { C14BondingLab } from '../components/visuals/C14BondingLab';
import { B14DNALab } from '../components/visuals/B14DNALab';
import { P15PendulumLab } from '../components/visuals/P15PendulumLab';
import { C15EquilibriumLab } from '../components/visuals/C15EquilibriumLab';
import { B15PredatorPreyLab } from '../components/visuals/B15PredatorPreyLab';
import { P16MagnetNavigationLab } from '../components/visuals/P16MagnetNavigationLab';
import { C16MagneticMaterialsLab } from '../components/visuals/C16MagneticMaterialsLab';
import { B16AnimalMagneticSensingLab } from '../components/visuals/B16AnimalMagneticSensingLab';
import { P17StructuresStandingLab } from '../components/visuals/P17StructuresStandingLab';
import { C17ConstructionMaterialsLab } from '../components/visuals/C17ConstructionMaterialsLab';
import { B17BoneStructureStrengthLab } from '../components/visuals/B17BoneStructureStrengthLab';
import { P18RiversShapeLandLab } from '../components/visuals/P18RiversShapeLandLab';
import { C18DissolvedMineralsLab } from '../components/visuals/C18DissolvedMineralsLab';
import { B18RiverHabitatsLab } from '../components/visuals/B18RiverHabitatsLab';
import { P19SoilSupportsLifeLab } from '../components/visuals/P19SoilSupportsLifeLab';
import { C19SoilChemistryLab } from '../components/visuals/C19SoilChemistryLab';
import { B19SoilBiodiversityLab } from '../components/visuals/B19SoilBiodiversityLab';
import { P20LensesVisionLab } from '../components/visuals/P20LensesVisionLab';
import { C20OpticalMaterialsLab } from '../components/visuals/C20OpticalMaterialsLab';
import { B20EyeFocusingLab } from '../components/visuals/B20EyeFocusingLab';
import { P21TidalCyclesLab } from '../components/visuals/P21TidalCyclesLab';
import { C21CarbonCycleLab } from '../components/visuals/C21CarbonCycleLab';
import { B21RespirationCycleLab } from '../components/visuals/B21RespirationCycleLab';
import { P22SeismicWavesLab } from '../components/visuals/P22SeismicWavesLab';
import { C22SpectroscopyLab } from '../components/visuals/C22SpectroscopyLab';
import { B22UltrasoundLab } from '../components/visuals/B22UltrasoundLab';
import { P23StressFractureLab } from '../components/visuals/P23StressFractureLab';
import { C23CorrosionLab } from '../components/visuals/C23CorrosionLab';
import { B23WoundHealingLab } from '../components/visuals/B23WoundHealingLab';
import { P24FlowNetworksLab } from '../components/visuals/P24FlowNetworksLab';
import { C24ReactionNetworkLab } from '../components/visuals/C24ReactionNetworkLab';
import { B24VascularTransportLab } from '../components/visuals/B24VascularTransportLab';
import { P26WeatherLab } from '../components/visuals/P26WeatherLab';
import { C26WeatherLab } from '../components/visuals/C26WeatherLab';
import { B26WeatherLab } from '../components/visuals/B26WeatherLab';
import { P25ChaosMotionLab } from '../components/visuals/P25ChaosMotionLab';
import { C25ChainReactionLab } from '../components/visuals/C25ChainReactionLab';
import { B25MutationCascadeLab } from '../components/visuals/B25MutationCascadeLab';
import { P27DigestionPhysicsLab } from '../components/visuals/P27DigestionPhysicsLab';
import { C27DigestionChemistryLab } from '../components/visuals/C27DigestionChemistryLab';
import { B27DigestionBiologyLab } from '../components/visuals/B27DigestionBiologyLab';
import { P28BodySystemsPhysicsLab } from '../components/visuals/P28BodySystemsPhysicsLab';
import { C28BodySystemsChemistryLab } from '../components/visuals/C28BodySystemsChemistryLab';
import { B28BodySystemsBiologyLab } from '../components/visuals/B28BodySystemsBiologyLab';
import { P29DiseaseSpreadPhysicsLab } from '../components/visuals/P29DiseaseSpreadPhysicsLab';
import { C29DiseaseSpreadChemistryLab } from '../components/visuals/C29DiseaseSpreadChemistryLab';
import { B29DiseaseSpreadBiologyLab } from '../components/visuals/B29DiseaseSpreadBiologyLab';
import { P30MedicineTransportPhysicsLab } from '../components/visuals/P30MedicineTransportPhysicsLab';
import { C30MedicineChemistryLab } from '../components/visuals/C30MedicineChemistryLab';
import { B30MedicineBiologyLab } from '../components/visuals/B30MedicineBiologyLab';
import { P31WaterWastePhysicsLab } from '../components/visuals/P31WaterWastePhysicsLab';
import { C31WaterWasteChemistryLab } from '../components/visuals/C31WaterWasteChemistryLab';
import { B31WaterWasteBiologyLab } from '../components/visuals/B31WaterWasteBiologyLab';
import { P32AirQualityPhysicsLab } from '../components/visuals/P32AirQualityPhysicsLab';
import { C32AirQualityChemistryLab } from '../components/visuals/C32AirQualityChemistryLab';
import { B32AirQualityBiologyLab } from '../components/visuals/B32AirQualityBiologyLab';

const DISCIPLINE_CONFIG = {
    physics: { icon: Atom, color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/30', accent: 'indigo' },
    chemistry: { icon: Beaker, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', accent: 'emerald' },
    biology: { icon: Dna, color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/30', accent: 'rose' },
} as const;

const LESSONS_WITH_NATIVE_CONTROLS = new Set([
    'p1', 'c1', 'p2', 'c2', 'b2',
    'p3', 'c3', 'b3',
    'p4', 'c4', 'b4',
    'p5', 'c5', 'b5',
    'p6',
    'p10', 'c10', 'b10',
    'p11', 'c11', 'b11',
    'p12', 'c12', 'b12',
    'p13', 'c13', 'b13',
    'p14', 'c14', 'b14',
    'p15', 'c15', 'b15',
    'p16', 'c16', 'b16',
    'p17', 'c17', 'b17',
    'p18', 'c18', 'b18',
    'p19', 'c19', 'b19',
    'p20', 'c20', 'b20',
    'p21', 'c21', 'b21',
    'p22', 'c22', 'b22',
    'p23', 'c23', 'b23',
    'p24', 'c24', 'b24',
    'p25', 'c25', 'b25',
    'p26', 'c26', 'b26',
    'p27', 'c27', 'b27',
    'p28', 'c28', 'b28',
    'p29', 'c29', 'b29',
    'p30', 'c30', 'b30',
    'p31', 'c31', 'b31',
    'p32', 'c32', 'b32',
]);

interface WalkthroughGuide {
    title: string;
    instruction: string;
    next: string;
}

interface BigIdeaEnhancement {
    lens: string;
    experiment: string;
    vocab: string[];
}

const BIG_IDEA_ENHANCEMENTS: Record<number, BigIdeaEnhancement> = {
    16: {
        lens: 'Magnetic effects are invisible field interactions. The same field language explains orientation, material response, and biological sensing behavior.',
        experiment: 'Change one field-related control and predict the direction of alignment before observing the visual response.',
        vocab: ['magnetic field', 'domain alignment', 'magnetoreception'],
    },
    17: {
        lens: 'Stable structures spread forces through geometry and material choice. Robust design appears when load paths are distributed and failure points are reduced.',
        experiment: 'Increase load, then change one geometry or material parameter to test how stress redistribution affects stability.',
        vocab: ['load path', 'compression', 'torsion'],
    },
    18: {
        lens: 'Flowing water continuously reshapes land and habitats. Physical transport, chemical weathering, and ecological adaptation are coupled in one system.',
        experiment: 'Adjust flow speed and slope, then compare deposition zones with habitat quality indicators.',
        vocab: ['erosion', 'sediment transport', 'riparian zone'],
    },
    19: {
        lens: 'Soil is an active living interface between geology, chemistry, and ecosystems. Small changes in composition can cascade into major biological outcomes.',
        experiment: 'Modify moisture or nutrient balance and watch how microbial activity and plant support indicators shift together.',
        vocab: ['soil profile', 'nutrient cycling', 'microbiome'],
    },
    20: {
        lens: 'Vision emerges from precise control of light pathways and signal interpretation. Optical materials and biological focusing must coordinate to form clear images.',
        experiment: 'Shift one focusing or refractive variable and observe whether image quality improves or degrades first.',
        vocab: ['refraction', 'focal length', 'accommodation'],
    },
    21: {
        lens: 'Natural cycles conserve matter while redistributing energy across scales. Tracking loop timing reveals how delayed feedback builds system-level patterns.',
        experiment: 'Speed up one cycle process and inspect where buildup or depletion begins to appear in the loop.',
        vocab: ['feedback loop', 'flux', 'reservoir'],
    },
    22: {
        lens: 'Wave-based sensing translates hidden structures into measurable signals. Resolution depends on wavelength, medium properties, and interpretation models.',
        experiment: 'Adjust wave frequency and medium properties, then compare how signal clarity changes across targets.',
        vocab: ['wavelength', 'resolution', 'attenuation'],
    },
    23: {
        lens: 'Damage and repair are dynamic competitions between stress and recovery. The same logic governs fractures, corrosion pathways, and tissue healing.',
        experiment: 'Raise stress while changing protection or repair factors to identify the threshold where failure accelerates.',
        vocab: ['fatigue', 'oxidation', 'regeneration'],
    },
    24: {
        lens: 'Networks route flow through connected pathways with capacity limits. Local bottlenecks create global effects in circulation, reactions, and transport systems.',
        experiment: 'Constrict one pathway and trace how pressure, throughput, or concentration shifts redistribute system-wide.',
        vocab: ['throughput', 'bottleneck', 'homeodynamic balance'],
    },
    25: {
        lens: 'Complex systems can appear stable until a small trigger amplifies. Nonlinear interactions make prediction hard, but pattern detection still guides control.',
        experiment: 'Apply a tiny initial perturbation and compare divergence after multiple simulation cycles.',
        vocab: ['nonlinearity', 'sensitivity', 'cascade'],
    },
};

function getInteractiveTask(lesson: LessonMeta, phase: string): string {
    if (phase === 'intro') return `Try one ${lesson.id.toUpperCase()} control immediately and compare what you see with the mentor prompt.`;
    if (phase === 'checkpoint') return 'Make a prediction first, then use one control to test it.';
    if (phase === 'discovery') return 'Replay one earlier step and explain the cause-effect in your own words.';
    if (phase === 'complete') return 'Toggle controls and revisit one branch to reinforce the concept.';
    return 'Use one visible control, then observe and describe what changed in the visual.';
}

function getWalkthroughGuide(lesson: LessonMeta, phase: string): WalkthroughGuide {
    const phaseLabel = phase.replace(/_/g, ' ');

    if (lesson.id === 'p10') {
        const p10Guides: Record<string, WalkthroughGuide> = {
            intro: {
                title: 'Start The Energy Comparison',
                instruction: 'Begin at Intro and then move through Fossil, Solar, Wind, Hydro, and Compare in sequence.',
                next: 'Use Checkpoint after Compare to test reliability under night and low-wind conditions.'
            },
            fossil: {
                title: 'Observe The Fossil Baseline',
                instruction: 'Use the Pollution toggle to see the tradeoff between immediate power and emissions.',
                next: 'Switch to Solar to compare clean generation behavior.'
            },
            solar: {
                title: 'Test Solar Constraints',
                instruction: 'Observe output in normal conditions, then toggle Night to verify solar dependency on sunlight.',
                next: 'Move to Wind to evaluate another renewable profile.'
            },
            wind: {
                title: 'Test Wind Variability',
                instruction: 'Watch turbine output, then toggle Calm Wind to test intermittent generation risk.',
                next: 'Continue to Hydro to compare a steadier renewable source.'
            },
            hydro: {
                title: 'Evaluate Baseline Reliability',
                instruction: 'Observe hydro as a stable renewable source and compare its role in mixed generation.',
                next: 'Use Compare for side-by-side source tradeoffs.'
            },
            compare: {
                title: 'Read Side-By-Side Tradeoffs',
                instruction: 'Compare power, pollution, and reliability together rather than evaluating each source in isolation.',
                next: 'Proceed to Checkpoint and answer before using any reveal toggle.'
            },
            checkpoint: {
                title: 'Answer Before Reveal',
                instruction: 'Predict first; use Reveal Hydro only to verify your reasoning after selecting an answer.',
                next: 'Finish in Discovery and Complete for the Big Idea summary.'
            },
            discovery: {
                title: 'Consolidate The Pattern',
                instruction: 'Capture the key concept: mixed renewables can cover each others limitations.',
                next: 'Use Complete for final cross-disciplinary wrap-up.'
            },
            complete: {
                title: 'Wrap-Up',
                instruction: 'Review how P10 links to C10 pollution pathways and B10 ecosystem impacts.',
                next: 'Revisit any scenario from controls if you want to stress-test assumptions.'
            }
        };
        return p10Guides[phase] || p10Guides.intro;
    }

    if (lesson.id === 'c10') {
        const c10Guides: Record<string, WalkthroughGuide> = {
            intro: {
                title: 'Start The Air Pollution Story',
                instruction: 'Begin with the Intro and then move to CO2 Sources to see where atmospheric pollution comes from.',
                next: 'Switch to Greenhouse and then Warming to connect emissions to climate impact.'
            },
            co2_sources: {
                title: 'Track Pollution Sources',
                instruction: 'Observe factories and transport contributors, then compare how emissions accumulate over time.',
                next: 'Move to Greenhouse to see how those gases trap heat.'
            },
            greenhouse: {
                title: 'Understand Heat Trapping',
                instruction: 'Watch incoming solar energy and outgoing heat behavior to see why greenhouse gases matter.',
                next: 'Go to Warming and then Acid Rain to see downstream effects.'
            },
            warming: {
                title: 'Follow Global Effects',
                instruction: 'Focus on temperature trends and ecosystem stress signs, then contrast with cleaner pathways.',
                next: 'Continue to Acid Rain and Ozone for additional chemistry pathways.'
            },
            acid_rain: {
                title: 'Link Emissions To Ecosystems',
                instruction: 'Observe how atmospheric chemistry changes precipitation and harms soils, water, and plants.',
                next: 'Move to Ozone, then test yourself in Checkpoint.'
            },
            ozone: {
                title: 'Separate Ozone Topics',
                instruction: 'Distinguish protective upper-atmosphere ozone from harmful ground-level pollution.',
                next: 'Use Checkpoint to confirm your greenhouse understanding.'
            },
            checkpoint: {
                title: 'Predict Before Revealing',
                instruction: 'Answer the checkpoint first, then use the correct toggle only to verify and explain the result.',
                next: 'Finish with Discovery or Complete for summary links to P10 and B10.'
            },
            discovery: {
                title: 'Consolidate Core Ideas',
                instruction: 'Read the concept summary and identify which pollutants map to which outcomes.',
                next: 'Use Complete to wrap and then compare with ecosystem impacts in B10.'
            },
            complete: {
                title: 'Wrap-Up',
                instruction: 'You now have the chemistry side of climate and air-quality impact pathways.',
                next: 'Revisit any scenario from controls to reinforce cause-and-effect links.'
            }
        };
        return c10Guides[phase] || c10Guides.intro;
    }

    if (lesson.id === 'b10') {
        const b10Guides: Record<string, WalkthroughGuide> = {
            intro: {
                title: 'Start With The Ecosystem Baseline',
                instruction: 'Begin at Intro and then Healthy Ecosystem to establish how balanced food webs function.',
                next: 'Then step through Wolves Removed and Cascade to see chain reactions.'
            },
            healthy_ecosystem: {
                title: 'Read The Balanced State',
                instruction: 'Identify producers, consumers, and stabilizing predator roles before introducing disturbance.',
                next: 'Switch to Wolves Removed to test what changes first.'
            },
            wolves_removed: {
                title: 'Observe First-Order Effects',
                instruction: 'Track deer pressure and vegetation loss to understand the first trophic imbalance.',
                next: 'Move to Cascade to observe second-order and habitat effects.'
            },
            cascade: {
                title: 'Follow The Chain Reaction',
                instruction: 'Watch how one species shift propagates across plants, soils, water systems, and other species.',
                next: 'Use Food Web and Biodiversity to generalize this pattern.'
            },
            food_web: {
                title: 'Map Interdependence',
                instruction: 'Use this view to connect feeding relationships and dependency pathways beyond one linear chain.',
                next: 'Continue to Biodiversity and then test with Checkpoint.'
            },
            biodiversity: {
                title: 'Interpret Stability',
                instruction: 'Relate species diversity to resilience and recovery capacity under stress.',
                next: 'Go to Checkpoint and answer before toggling the correct state.'
            },
            checkpoint: {
                title: 'Test Causal Reasoning',
                instruction: 'Predict the ecosystem outcome first, then use the correct toggle only to validate your reasoning.',
                next: 'Finish with Discovery and Complete for cross-disciplinary links.'
            },
            discovery: {
                title: 'Generalize The Principle',
                instruction: 'Capture the main rule: ecosystem stability depends on interacting species, not isolated populations.',
                next: 'Use Complete to close and then compare with C10 pollution pressures.'
            },
            complete: {
                title: 'Wrap-Up',
                instruction: 'You now have the biodiversity and ecosystem systems-thinking side of Big Idea 10.',
                next: 'Revisit any scenario to reinforce trophic cascade logic.'
            }
        };
        return b10Guides[phase] || b10Guides.intro;
    }

    const base: Record<string, WalkthroughGuide> = {
        intro: {
            title: `Start ${lesson.id.toUpperCase()} Clearly`,
            instruction: 'You can begin from either side: interact with the visual controls immediately or follow the mentor prompt first.',
            next: 'Use one control now, then compare that visual change with the chat explanation in parallel.'
        },
        checkpoint: {
            title: 'Do The Checkpoint Properly',
            instruction: 'Make a prediction first, then check the visual state change to confirm or revise your mental model.',
            next: 'Continue to discovery for the formal concept statement.'
        },
        discovery: {
            title: 'Lock In The Concept',
            instruction: 'Use this stage to connect the pattern you observed to the scientific rule being taught.',
            next: 'Proceed to complete, or rewind one step from chat history if you want to retest.'
        },
        complete: {
            title: 'Wrap-Up',
            instruction: 'You have reached the lesson summary. Use the chat history to revisit difficult branches if needed.',
            next: 'Move to the next lesson using the right panel navigation.'
        }
    };

    if (base[phase]) {
        return base[phase];
    }

    return {
        title: `Guide: ${lesson.id.toUpperCase()} (${phaseLabel})`,
        instruction: 'Follow the current scenario in the chat and watch how the visual state responds to each choice.',
        next: 'Continue through options until you reach checkpoint and discovery.'
    };
}

const LessonWalkthroughCard = ({
    lesson,
    phase,
    showCanvasControls,
    onToggleControls,
}: {
    lesson: LessonMeta;
    phase: string;
    showCanvasControls: boolean;
    onToggleControls: () => void;
}) => {
    const guide = getWalkthroughGuide(lesson, phase);
    const task = getInteractiveTask(lesson, phase);

    return (
        <div className="m-3 mb-2 rounded-lg p-3 shadow-md border bg-white border-slate-300 text-slate-900">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-sky-700 mb-2">Guided Walkthrough</p>
            <p className="text-sm font-semibold mb-1 text-slate-900">{guide.title}</p>
            <p className="text-xs leading-5 text-slate-800">{guide.instruction}</p>
            <div className="mt-3 pt-3 border-t border-slate-300">
                <p className="text-[11px] font-semibold mb-1 text-slate-700">Suggested next move</p>
                <p className="text-xs leading-5 text-slate-800">{guide.next}</p>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-300">
                <p className="text-[11px] font-semibold mb-1 text-slate-700">Interactive task</p>
                <p className="text-xs leading-5 text-slate-800 mb-2">{task}</p>
                <button
                    onClick={onToggleControls}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold border transition-colors ${showCanvasControls ? 'bg-sky-100 text-sky-800 border-sky-300' : 'bg-slate-100 text-slate-700 border-slate-300'}`}
                >
                    {showCanvasControls ? 'Hide Controls' : 'Show Controls'}
                </button>
            </div>
        </div>
    );
};

const LessonDepthCard = ({ enhancement }: { enhancement: BigIdeaEnhancement }) => {
    return (
        <div className="mx-3 mb-2 rounded-lg p-3 shadow-md border bg-slate-50 border-slate-300 text-slate-900">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-violet-700 mb-2">Concept Lens</p>
            <p className="text-xs leading-5 text-slate-800">{enhancement.lens}</p>
            <div className="mt-3 pt-3 border-t border-slate-300">
                <p className="text-[11px] font-semibold mb-1 text-slate-700">Experiment Prompt</p>
                <p className="text-xs leading-5 text-slate-800">{enhancement.experiment}</p>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-300">
                <p className="text-[11px] font-semibold mb-1 text-slate-700">Vocabulary</p>
                <p className="text-xs leading-5 text-slate-800">
                    {enhancement.vocab.map((term, idx) => (
                        <span key={term}>
                            <strong>{term}</strong>
                            {idx < enhancement.vocab.length - 1 ? ', ' : ''}
                        </span>
                    ))}
                </p>
            </div>
        </div>
    );
};

const LessonControlDock = ({
    onResetVisual,
}: {
    onResetVisual: () => void;
}) => {
    return (
        <div
            data-lab-controls="true"
            className="absolute left-3 bottom-3 z-10 bg-white border border-slate-300 rounded-lg p-3 shadow-md text-slate-900"
        >
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-600 mb-2">Lab Controls</p>
            <button
                onClick={onResetVisual}
                className="px-3 py-1.5 rounded-md text-xs font-semibold border border-slate-300 bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors"
            >
                Reset Visual
            </button>
        </div>
    );
};

/** Generic visual panel that renders based on SET_VISUAL state */
const VisualPanel = ({ state, lesson }: { state: Record<string, unknown>; lesson: LessonMeta }) => {
    const config = DISCIPLINE_CONFIG[lesson.discipline];
    const phase = (state.phase as string) || 'intro';

    return (
        <div className="flex-grow flex flex-col items-center justify-center p-8 bg-white relative overflow-hidden">
            {/* Background grid */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: 'radial-gradient(circle, #64748b 1px, transparent 1px)',
                backgroundSize: '30px 30px',
            }} />

            {/* Large lesson icon */}
            <div className="text-8xl mb-6 select-none">{lesson.icon}</div>

            {/* Phase label */}
            <div className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border ${config.border} ${config.color} bg-white mb-4`}>
                {phase.replace(/_/g, ' ')}
            </div>

            {/* Visual state details */}
            <div className="max-w-md w-full space-y-3">
                {Object.entries(state)
                    .filter(([key]) => key !== 'phase')
                    .map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between px-4 py-2 bg-slate-100 rounded-lg border border-slate-200">
                            <span className="text-slate-500 text-sm font-mono">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                            <span className={`${config.color} text-sm font-bold`}>
                                {typeof value === 'boolean' ? (value ? '✅' : '❌') : String(value)}
                            </span>
                        </div>
                    ))
                }
            </div>

            {/* Lesson title watermark */}
            <div className="absolute bottom-4 right-4 text-slate-300 text-xs font-mono">
                {lesson.id.toUpperCase()} — {lesson.title}
            </div>
        </div>
    );
};

export const LessonShell = () => {
    const { lessonId: rawLessonId } = useParams<{ lessonId: string }>();
    const lessonId = (rawLessonId || '').toLowerCase();
    const [visualState, setVisualState] = useState<Record<string, unknown>>({ phase: 'intro' });
    const [showCanvasControls, setShowCanvasControls] = useState(true);

    // Reset visual state when navigating between lessons
    useEffect(() => {
        setVisualState({ phase: 'intro' });
        setShowCanvasControls(true);
    }, [lessonId]);

    const lesson = useMemo(() => LESSON_REGISTRY.find(l => l.id === lessonId), [lessonId]);
    const nextLesson = useMemo(() => {
        const idx = LESSON_REGISTRY.findIndex(l => l.id === lessonId);
        return idx >= 0 && idx < LESSON_REGISTRY.length - 1 ? LESSON_REGISTRY[idx + 1] : undefined;
    }, [lessonId]);
    const scriptFactory = lessonId ? LESSON_SCRIPTS[lessonId] : undefined;

    const script = useMemo(() => {
        if (!scriptFactory) return { root: { id: 'root', speaker: 'AI' as const, content: 'Lesson not found.', options: [] } };
        return scriptFactory();
    }, [scriptFactory]);

    const handleSimAction = useCallback((action: SimAction) => {
        if (action.type === 'SET_VISUAL') {
            setVisualState(prev => ({ ...prev, ...action.payload }));
        }
    }, []);

    // Allow interactive controls (sliders, etc.) to update visual state
    const handleSliderChange = useCallback((key: string, value: unknown) => {
        setVisualState(prev => ({ ...prev, [key]: value }));
    }, []);

    const handleResetVisual = useCallback(() => {
        setVisualState({ phase: 'intro' });
    }, []);

    const { currentNode, history, handleOptionSelect, rewindTo } = useDialogEngine({
        script,
        onSimAction: handleSimAction,
        isReady: true,
        resetKey: lessonId,
    });

    useEffect(() => {
        const shouldNormalizeVisual = LEVEL1_NORMALIZATION_ENABLED && !!lesson && lesson.bigIdea >= 21;
        if (!shouldNormalizeVisual) return;

        const normalizeLevel1Ui = () => {
            const phaseLabel = ((visualState.phase as string) || 'intro').replace(/_/g, ' ');
            const grids = Array.from(
                document.querySelectorAll<HTMLElement>('.sciverse-visual-host .grid.md\\:grid-cols-2')
            );

            grids.forEach(grid => {
                const infoPanel = grid.children[1] as HTMLElement | undefined;
                if (!infoPanel || infoPanel.hasAttribute('data-lab-controls')) return;

                infoPanel.className = 'bg-white border border-slate-200 rounded-xl p-4 text-xs text-slate-700 overflow-y-auto pr-2';
                infoPanel.setAttribute('data-level1-normalized-info', 'true');

                const makeLine = (text: string, className?: string) => {
                    const p = document.createElement('p');
                    p.textContent = text;
                    if (className) p.className = className;
                    return p;
                };

                infoPanel.replaceChildren(
                    makeLine(`Phase: ${phaseLabel} (starts at intro)`, 'mb-2 text-slate-600'),
                    makeLine(`Level 1 focus for ${lesson.id.toUpperCase()}: understand one clear cause-and-effect pattern.`),
                    makeLine('Use simple observation: adjust one control, watch one visible change, then explain it in one sentence.', 'mt-2'),
                    makeLine('What To Do', 'mt-3 pt-3 border-t border-slate-200 text-[11px] uppercase tracking-wider font-semibold text-slate-500'),
                    makeLine('1. Move one control slowly and watch the visual response.'),
                    makeLine('2. Compare before and after in terms of direction, size, or timing.'),
                    makeLine('3. Confirm your idea with the checkpoint question.'),
                    makeLine('Learning Goal', 'mt-3 pt-3 border-t border-slate-200 text-[11px] uppercase tracking-wider font-semibold text-slate-500'),
                    makeLine('Build pattern recognition first. Deeper tradeoffs and edge cases are reserved for Level 2.')
                );
            });

            const controlPanels = Array.from(
                document.querySelectorAll<HTMLElement>('.sciverse-visual-host [data-lab-controls="true"]')
            );

            controlPanels.forEach(panel => {
                let heading = Array.from(panel.querySelectorAll<HTMLElement>('p,h3,h4,h5'))
                    .find(el => /control/i.test(el.textContent ?? ''));

                if (!heading) {
                    heading = document.createElement('p');
                    panel.prepend(heading);
                }
                heading.textContent = 'Lab Controls';
                heading.classList.add('level1-controls-heading');

                if (!panel.querySelector('.level1-controls-hint')) {
                    const hint = document.createElement('p');
                    hint.className = 'level1-controls-hint';
                    hint.textContent = 'Adjust one control at a time, then observe what changes.';
                    heading.insertAdjacentElement('afterend', hint);
                }

                const sliders = Array.from(panel.querySelectorAll<HTMLInputElement>('input[type="range"]'));
                sliders.forEach((slider, idx) => {
                    const show = showCanvasControls && idx < LEVEL1_MAX_VISIBLE_CONTROLS;
                    slider.style.display = show ? '' : 'none';

                    const label = slider.previousElementSibling as HTMLElement | null;
                    if (label && (label.tagName === 'LABEL' || label.tagName === 'P')) {
                        label.style.display = show ? '' : 'none';
                    }
                });
            });
        };

        normalizeLevel1Ui();
        const observer = new MutationObserver(() => normalizeLevel1Ui());
        const host = document.querySelector('.sciverse-visual-host');
        if (host) {
            observer.observe(host, { childList: true, subtree: true });
        }

        return () => observer.disconnect();
    }, [lesson, lessonId, visualState.phase, showCanvasControls, currentNode?.id]);

    const prevLesson = useMemo(() => {
        const idx = LESSON_REGISTRY.findIndex(l => l.id === lessonId);
        return idx > 0 ? LESSON_REGISTRY[idx - 1] : undefined;
    }, [lessonId]);

    if (!lesson || !scriptFactory) {
        return (
            <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-2xl mb-4">Lesson not found</p>
                    <Link to="/projects/science-lab" className="text-indigo-400 hover:underline">← Back to Sciverse</Link>
                </div>
            </div>
        );
    }

    const config = DISCIPLINE_CONFIG[lesson.discipline];
    const DisciplineIcon = config.icon;
    const phase = (visualState.phase as string) || 'intro';
    const showShellGuide = false;
    const enhancement = showShellGuide ? BIG_IDEA_ENHANCEMENTS[lesson.bigIdea] : undefined;

    return (
        <div className="flex flex-col h-screen bg-slate-950 text-slate-100 overflow-hidden font-mono">
            {/* Top Bar */}
            <div className="h-14 border-b border-slate-800 bg-slate-900/80 backdrop-blur flex items-center px-4 gap-3 z-20">
                <Link to="/projects/science-lab" className="p-2 hover:bg-slate-800 rounded-full text-slate-400 transition-colors">
                    <ArrowLeft size={18} />
                </Link>
                <DisciplineIcon size={16} className={config.color} />
                <span className={`text-xs font-bold tracking-widest uppercase ${config.color}`}>
                    {lesson.id.toUpperCase()}
                </span>
                <div className="h-4 w-px bg-slate-800" />
                <span className="text-sm text-slate-300 font-medium">{lesson.title}</span>
                <span className="text-xs text-slate-500 hidden md:inline">— {lesson.subtitle}</span>
                <div className="ml-auto">
                    <button
                        onClick={() => setShowCanvasControls(v => !v)}
                        className={`mr-3 px-2.5 py-1 rounded-md text-xs font-semibold border transition-colors ${showCanvasControls ? 'bg-sky-500/20 text-sky-300 border-sky-500/40' : 'bg-slate-800 text-slate-300 border-slate-700'}`}
                    >
                        Controls: {showCanvasControls ? 'On' : 'Off'}
                    </button>
                    <span className="text-xs text-slate-600">Big Idea {lesson.bigIdea}: {lesson.bigIdeaTitle}</span>
                </div>
            </div>

            <style>{`
                .sciverse-visual-host.controls-hidden [data-lab-controls="true"] {
                    display: none !important;
                }

                .sciverse-visual-host [data-lab-controls="true"] {
                    background: #ffffff !important;
                    color: #0f172a !important;
                    border-color: #cbd5e1 !important;
                    box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08) !important;
                    backdrop-filter: none !important;
                }

                .sciverse-visual-host [data-lab-controls="true"] p,
                .sciverse-visual-host [data-lab-controls="true"] label,
                .sciverse-visual-host [data-lab-controls="true"] span,
                .sciverse-visual-host [data-lab-controls="true"] div,
                .sciverse-visual-host [data-lab-controls="true"] strong {
                    color: #334155 !important;
                }

                .sciverse-visual-host [data-lab-controls="true"] button:not([data-color-swatch]) {
                    color: #0f172a !important;
                    border-color: #cbd5e1 !important;
                    background: #f8fafc !important;
                }

                .sciverse-visual-host .level1-controls-heading {
                    font-size: 10px !important;
                    font-weight: 700 !important;
                    text-transform: uppercase !important;
                    letter-spacing: 0.08em !important;
                    margin-bottom: 2px !important;
                    color: #334155 !important;
                }

                .sciverse-visual-host .level1-controls-hint {
                    font-size: 10px !important;
                    line-height: 1.35 !important;
                    margin: 0 0 8px 0 !important;
                    color: #475569 !important;
                }
            `}</style>

            {/* Main content area */}
            <div className="flex-grow flex flex-col lg:flex-row overflow-hidden">
                {/* Left: Visual Panel — lesson-specific or generic */}
                <div className={`sciverse-visual-host flex-grow min-h-0 flex flex-col overflow-hidden ${showCanvasControls ? 'controls-visible' : 'controls-hidden'}`} style={{ minHeight: '400px' }}>
                    {showShellGuide && (
                        <LessonWalkthroughCard
                            lesson={lesson}
                            phase={phase}
                            showCanvasControls={showCanvasControls}
                            onToggleControls={() => setShowCanvasControls(v => !v)}
                        />
                    )}

                    {enhancement && <LessonDepthCard enhancement={enhancement} />}

                    {!LESSONS_WITH_NATIVE_CONTROLS.has(lesson.id) && (
                        <LessonControlDock onResetVisual={handleResetVisual} />
                    )}

                    <div className="flex-grow relative min-h-0 flex">
                    {lessonId === 'p1' ? (
                        <P1CrateLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'c1' ? (
                        <C1ParticleLab state={visualState} onSliderChange={(temp) => handleSliderChange('temperature', temp)} />
                    ) : lessonId === 'b1' ? (
                        <B1MuscleLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'p2' ? (
                        <P2StatesLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'c2' ? (
                        <C2AtomsLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'b2' ? (
                        <B2CellsLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'p3' ? (
                        <P3EnergyRampLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'c3' ? (
                        <C3ReactionsLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'b3' ? (
                        <B3FoodChainLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'p4' ? (
                        <P4SoundWavesLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'c4' ? (
                        <C4LightColorLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'b4' ? (
                        <B4SensesLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'p5' ? (
                        <P5LeversLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'c5' ? (
                        <C5DissolvingLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'b5' ? (
                        <B5HomeostasisLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'p6' ? (
                        <P6DensityLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'c6' ? (
                        <C6MixturesLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'b6' ? (
                        <B6FishLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'p7' ? (
                        <P7CircuitsLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'c7' ? (
                        <C7BatteryLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'b7' ? (
                        <B7NerveLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'p8' ? (
                        <P8HeatLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'c8' ? (
                        <C8WaterCycleLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'b8' ? (
                        <B8AdaptationsLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'p9' ? (
                        <P9MeasuringLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'c9' ? (
                        <C9NutrientsLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'b9' ? (
                        <B9CellDivisionLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'p10' ? (
                        <P10EnergyLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'c10' ? (
                        <C10PollutionLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'b10' ? (
                        <B10EcosystemsLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'p11' ? (
                        <P11BloodPressureLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'c11' ? (
                        <C11AcidsBasesLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'b11' ? (
                        <B11ImmuneLab state={visualState} />
                    ) : lessonId === 'p12' ? (
                        <P12GravityLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'c12' ? (
                        <C12PeriodicTableLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'b12' ? (
                        <B12NaturalSelectionLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'p13' ? (
                        <P13GearsLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'c13' ? (
                        <C13PolymersLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'b13' ? (
                        <B13PhotosynthesisLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'p14' ? (
                        <P14WavesLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'c14' ? (
                        <C14BondingLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'b14' ? (
                        <B14DNALab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'p15' ? (
                        <P15PendulumLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'c15' ? (
                        <C15EquilibriumLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'b15' ? (
                        <B15PredatorPreyLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'p16' ? (
                        <P16MagnetNavigationLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'c16' ? (
                        <C16MagneticMaterialsLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'b16' ? (
                        <B16AnimalMagneticSensingLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'p17' ? (
                        <P17StructuresStandingLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'c17' ? (
                        <C17ConstructionMaterialsLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'b17' ? (
                        <B17BoneStructureStrengthLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'p18' ? (
                        <P18RiversShapeLandLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'c18' ? (
                        <C18DissolvedMineralsLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'b18' ? (
                        <B18RiverHabitatsLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'p19' ? (
                        <P19SoilSupportsLifeLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'c19' ? (
                        <C19SoilChemistryLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'b19' ? (
                        <B19SoilBiodiversityLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'p20' ? (
                        <P20LensesVisionLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'c20' ? (
                        <C20OpticalMaterialsLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'b20' ? (
                        <B20EyeFocusingLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'p21' ? (
                        <P21TidalCyclesLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'c21' ? (
                        <C21CarbonCycleLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'b21' ? (
                        <B21RespirationCycleLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'p22' ? (
                        <P22SeismicWavesLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'c22' ? (
                        <C22SpectroscopyLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'b22' ? (
                        <B22UltrasoundLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'p23' ? (
                        <P23StressFractureLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'c23' ? (
                        <C23CorrosionLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'b23' ? (
                        <B23WoundHealingLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'p24' ? (
                        <P24FlowNetworksLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'c24' ? (
                        <C24ReactionNetworkLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'b24' ? (
                        <B24VascularTransportLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'p26' ? (
                        <P26WeatherLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'c26' ? (
                        <C26WeatherLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'b26' ? (
                        <B26WeatherLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'p25' ? (
                        <P25ChaosMotionLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'c25' ? (
                        <C25ChainReactionLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'b25' ? (
                        <B25MutationCascadeLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'p27' ? (
                        <P27DigestionPhysicsLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'c27' ? (
                        <C27DigestionChemistryLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'b27' ? (
                        <B27DigestionBiologyLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'p28' ? (
                        <P28BodySystemsPhysicsLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'c28' ? (
                        <C28BodySystemsChemistryLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'b28' ? (
                        <B28BodySystemsBiologyLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'p29' ? (
                        <P29DiseaseSpreadPhysicsLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'c29' ? (
                        <C29DiseaseSpreadChemistryLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'b29' ? (
                        <B29DiseaseSpreadBiologyLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'p30' ? (
                        <P30MedicineTransportPhysicsLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'c30' ? (
                        <C30MedicineChemistryLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'b30' ? (
                        <B30MedicineBiologyLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'p31' ? (
                        <P31WaterWastePhysicsLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'c31' ? (
                        <C31WaterWasteChemistryLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'b31' ? (
                        <B31WaterWasteBiologyLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'p32' ? (
                        <P32AirQualityPhysicsLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'c32' ? (
                        <C32AirQualityChemistryLab state={visualState} onStateChange={handleSliderChange} />
                    ) : lessonId === 'b32' ? (
                        <B32AirQualityBiologyLab state={visualState} onStateChange={handleSliderChange} />
                    ) : (
                        <VisualPanel state={visualState} lesson={lesson} />
                    )}

                    </div>
                </div>

                {/* Right: Socratic Chat */}
                <div className="w-full lg:w-[400px] h-[50vh] lg:h-full flex-shrink-0 z-10 shadow-xl border-l border-slate-800">
                    <SocraticChat
                        currentNode={currentNode}
                        history={history}
                        onOptionSelect={handleOptionSelect}
                        onRewindTo={rewindTo}
                        nextLesson={nextLesson}
                        prevLesson={prevLesson}
                    />
                </div>
            </div>
        </div>
    );
};


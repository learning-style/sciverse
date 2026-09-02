import { DialogNode, LessonMeta } from '../../types';
import {
    LEVEL1_FLOW_NODE_IDS,
    LEVEL1_LABELS,
    LEVEL1_NORMALIZATION_ENABLED,
} from '../level1Standard';

// --- Lesson Script Imports ---
import { getP1Script } from './p1-push-pull-slide';
import { getC1Script } from './c1-particles-move';
import { getB1Script } from './b1-muscles-bones';
import { getP2Script } from './p2-states-of-matter';
import { getC2Script } from './c2-atoms-molecules';
import { getB2Script } from './b2-cells';
import { getP3Script } from './p3-energy-ramp';
import { getC3Script } from './c3-chemical-reactions';
import { getB3Script } from './b3-food-chains';
import { getP4Script } from './p4-sound-waves';
import { getC4Script } from './c4-light-color';
import { getB4Script } from './b4-senses';
import { getP5Script } from './p5-levers-balance';
import { getC5Script } from './c5-dissolving';
import { getB5Script } from './b5-homeostasis';
import { getP6Script } from './p6-density-buoyancy';
import { getC6Script } from './c6-mixtures-separation';
import { getB6Script } from './b6-fish-breathing';
import { getP7Script } from './p7-circuits';
import { getC7Script } from './c7-batteries';
import { getB7Script } from './b7-nerve-signals';
import { getP8Script } from './p8-heat-transfer';
import { getC8Script } from './c8-water-cycle';
import { getB8Script } from './b8-animal-adaptations';
import { getP9Script } from './p9-measuring-change';
import { getC9Script } from './c9-nutrients';
import { getB9Script } from './b9-cell-division';
import { getP10Script } from './p10-renewable-energy';
import { getC10Script } from './c10-air-pollution';
import { getB10Script } from './b10-ecosystems';
import { getP11Script } from './p11-blood-pressure';
import { getC11Script } from './c11-acids-bases';
import { getB11Script } from './b11-immune-system';
import { getP12Script } from './p12-gravity-orbits';
import { getC12Script } from './c12-periodic-table';
import { getB12Script } from './b12-natural-selection';
import { getP13Script } from './p13-gears-pulleys';
import { getC13Script } from './c13-polymers';
import { getB13Script } from './b13-photosynthesis';
import { getP14Script } from './p14-waves-signals';
import { getC14Script } from './c14-chemical-bonding';
import { getB14Script } from './b14-dna-genetics';
import { getP15Script } from './p15-pendulum';
import { getC15Script } from './c15-equilibrium';
import { getB15Script } from './b15-predator-prey';
import { getP16Script } from './p16-magnets-navigation';
import { getC16Script } from './c16-magnetic-materials';
import { getB16Script } from './b16-animal-magnetic-sensing';
import { getP17Script } from './p17-structures-standing';
import { getC17Script } from './c17-construction-materials';
import { getB17Script } from './b17-bone-structure-strength';
import { getP18Script } from './p18-rivers-shape-land';
import { getC18Script } from './c18-dissolved-minerals';
import { getB18Script } from './b18-river-habitats';
import { getP19Script } from './p19-soil-supports-life';
import { getC19Script } from './c19-soil-chemistry';
import { getB19Script } from './b19-soil-biodiversity';
import { getP20Script } from './p20-lenses-change-vision';
import { getC20Script } from './c20-optical-materials';
import { getB20Script } from './b20-eye-focusing';
import { getP21Script } from './p21-tidal-cycles';
import { getC21Script } from './c21-carbon-cycle';
import { getB21Script } from './b21-respiration-cycle';
import { getP22Script } from './p22-seismic-waves';
import { getC22Script } from './c22-spectroscopy';
import { getB22Script } from './b22-ultrasound-imaging';
import { getP23Script } from './p23-stress-fracture';
import { getC23Script } from './c23-corrosion-protection';
import { getB23Script } from './b23-wound-healing';
import { getP24Script } from './p24-flow-networks';
import { getC24Script } from './c24-reaction-networks';
import { getB24Script } from './b24-vascular-transport';
import { getP25Script } from './p25-chaos-motion';
import { getC25Script } from './c25-chain-reactions';
import { getB25Script } from './b25-mutation-cascades';
import { getP26Script } from './p26-weather-lab';
import { getC26Script } from './c26-weather-lab';
import { getB26Script } from './b26-weather-lab';
import { getP27Script } from './p27-digestion-physics';
import { getC27Script } from './c27-digestion-chemistry';
import { getB27Script } from './b27-digestion-biology';
import { getP28Script } from './p28-body-systems-physics';
import { getC28Script } from './c28-body-systems-chemistry';
import { getB28Script } from './b28-body-systems-biology';
import { getP29Script } from './p29-disease-spread-physics';
import { getC29Script } from './c29-disease-spread-chemistry';
import { getB29Script } from './b29-disease-spread-biology';
import { getP30Script } from './p30-medicine-transport-physics';
import { getC30Script } from './c30-medicine-chemistry';
import { getB30Script } from './b30-medicine-biology';
import { getP31Script } from './p31-water-waste-physics';
import { getC31Script } from './c31-water-waste-chemistry';
import { getB31Script } from './b31-water-waste-biology';
import { getP32Script } from './p32-air-quality-physics';
import { getC32Script } from './c32-air-quality-chemistry';
import { getB32Script } from './b32-air-quality-biology';
import { getP33Script } from './p33-energy-flow-physics';
import { getC33Script } from './c33-nutrient-cycling';
import { getB33Script } from './b33-ecosystem-services';
import { getP34Script } from './p34-irrigation-physics';
import { getC34Script } from './c34-fertilizer-chemistry';
import { getB34Script } from './b34-farm-biology';
import { getP35Script } from './p35-waste-sorting-physics';
import { getC35Script } from './c35-recycling-chemistry';
import { getB35Script } from './b35-composting-biology';
import { getP36Script } from './p36-filtration-physics';
import { getC36Script } from './c36-water-purification-chemistry';
import { getB36Script } from './b36-water-safety-biology';
import { getP37Script } from './p37-energy-storage-physics';
import { getC37Script } from './c37-battery-chemistry';
import { getB37Script } from './b37-energy-storage-biology';
import { getP38Script } from './p38-feedback-loops-physics';
import { getC38Script } from './c38-sensor-materials-chemistry';
import { getB38Script } from './b38-biological-sensing';
import { getP39Script } from './p39-binary-logic-physics';
import { getC39Script } from './c39-semiconductor-chemistry';
import { getB39Script } from './b39-neural-logic-biology';
import { getP40Script } from './p40-measurement-uncertainty';
import { getC40Script } from './c40-experimental-controls';
import { getB40Script } from './b40-evidence-biology';
import { getP41Script } from './p41-randomness-statistics';
import { getC41Script } from './c41-collision-probability';
import { getB41Script } from './b41-genetics-probability';
import { getP42Script } from './p42-force-momentum';
import { getC42Script } from './c42-hydration-electrolytes';
import { getB42Script } from './b42-muscle-recovery';
import { getP43Script } from './p43-impact-reduction';
import { getC43Script } from './c43-protective-materials';
import { getB43Script } from './b43-human-factors';
import { getP44Script } from './p44-hardness-toughness';
import { getC44Script } from './c44-structure-properties';
import { getB44Script } from './b44-natural-materials';
import { getP45Script } from './p45-sound-intensity';
import { getC45Script } from './c45-acoustic-materials';
import { getB45Script } from './b45-hearing-health';
import { getP46Script } from './p46-light-mixing';
import { getC46Script } from './c46-pigment-fading';
import { getB46Script } from './b46-colour-vision';
import { getP47Script } from './p47-territory-space';
import { getC47Script } from './c47-chemical-cues';
import { getB47Script } from './b47-niches-coexistence';
import { getP48Script } from './p48-sampling-cameras';
import { getC48Script } from './c48-water-traces';
import { getB48Script } from './b48-trends-over-time';
import { getP49Script } from './p49-cost-of-digging';
import { getC49Script } from './c49-rock-to-metal';
import { getB49Script } from './b49-healing-the-land';
import { getP50Script } from './p50-orbit-height';
import { getC50Script } from './c50-built-for-space';
import { getB50Script } from './b50-life-from-space';
import { getL2P1Script } from './l2p1-force-mass-acceleration';
import { getL2C1Script } from './l2c1-specific-heat';
import { getL2B1Script } from './l2b1-lever-in-your-arm';
import { getL2P33Script } from './l2p33-energy-pyramid';
import { getL2C33Script } from './l2c33-carbon-budget';
import { getL2B33Script } from './l2b33-backup-maths';
import { getL2P49Script } from './l2p49-energy-cost-of-metal';

type ScriptFactory = () => Record<string, DialogNode>;

interface GlossaryEntry {
    term: string;
    definition: string;
}

interface LessonEnrichmentProfile {
    predictionQuestion: string;
    predictionGood: string;
    predictionBadA: string;
    predictionBadB: string;
    mechanismPrompt: string;
    mechanismGood: string;
    mechanismBadA: string;
    mechanismBadB: string;
    extensionPrompt: string;
    extensionGoodA: string;
    extensionGoodB: string;
    extensionBad: string;
}

const BIG_IDEA_GLOSSARY: Record<number, GlossaryEntry[]> = {
    16: [
        { term: 'magnetic field', definition: 'an invisible region where magnetic forces act on moving charges or magnetic materials' },
        { term: 'domain alignment', definition: 'when many tiny magnetic regions in a material point in similar directions' },
        { term: 'magnetoreception', definition: 'the ability of organisms to detect magnetic field information for orientation' },
    ],
    17: [
        { term: 'load path', definition: 'the route forces take through a structure toward supports and foundations' },
        { term: 'compression', definition: 'a squeezing stress that shortens or densifies a material' },
        { term: 'torsion', definition: 'twisting stress produced by torque around a structural axis' },
    ],
    18: [
        { term: 'erosion', definition: 'the removal and transport of soil or rock by water, wind, or ice' },
        { term: 'sediment transport', definition: 'movement of particles by flowing water from one location to another' },
        { term: 'deposition', definition: 'settling of transported particles when flow energy decreases' },
    ],
    19: [
        { term: 'soil profile', definition: 'vertical layers of soil with different texture, chemistry, and biological activity' },
        { term: 'nutrient cycling', definition: 'continuous transformation and reuse of essential elements in ecosystems' },
        { term: 'microbiome', definition: 'the community of microorganisms living in a specific habitat like soil or gut' },
    ],
    20: [
        { term: 'refractive index', definition: 'a ratio describing how much light slows and bends in a material compared with vacuum' },
        { term: 'dispersion', definition: 'the separation of light by wavelength because each color bends by a different amount' },
        { term: 'accommodation', definition: 'biological adjustment of lens shape to focus objects at different distances' },
    ],
    21: [
        { term: 'reservoir', definition: 'a storage location in a cycle where matter can accumulate temporarily' },
        { term: 'flux', definition: 'the rate of transfer of matter or energy between parts of a system' },
        { term: 'feedback loop', definition: 'a cycle where outputs influence future behavior of the same system' },
    ],
    22: [
        { term: 'wavelength', definition: 'distance between repeating points of a wave such as peak to peak' },
        { term: 'resolution', definition: 'ability of a sensing method to distinguish fine detail between nearby features' },
        { term: 'attenuation', definition: 'gradual loss of wave intensity as energy is absorbed or scattered' },
    ],
    23: [
        { term: 'fatigue', definition: 'progressive weakening from repeated loading even below single-cycle failure limits' },
        { term: 'oxidation', definition: 'electron-loss reactions often involved in corrosion and material degradation' },
        { term: 'regeneration', definition: 'biological rebuilding of damaged tissue through coordinated repair phases' },
    ],
    24: [
        { term: 'throughput', definition: 'amount of material or energy passing through a network per unit time' },
        { term: 'bottleneck', definition: 'a limiting step or narrow pathway that constrains overall network performance' },
        { term: 'distribution network', definition: 'connected pathways that route resources from sources to destinations' },
    ],
    25: [
        { term: 'nonlinearity', definition: 'a relationship where output does not scale proportionally with input change' },
        { term: 'sensitivity', definition: 'strong dependence of long-term outcomes on tiny initial differences' },
        { term: 'cascade', definition: 'a chain of linked effects where one change triggers many downstream changes' },
    ],
    26: [
        { term: 'weather patterns', definition: 'the physics of storms, wind, and rain' },
        { term: 'atmospheric chemistry', definition: 'molecules and reactions in the air' },
        { term: 'weather & life', definition: 'how organisms adapt to weather extremes' },
    ],
};

const BI16_TO_25_IDS = new Set([
    'p16', 'c16', 'b16', 'p17', 'c17', 'b17', 'p18', 'c18', 'b18',
    'p19', 'c19', 'b19', 'p20', 'c20', 'b20', 'p21', 'c21', 'b21',
    'p22', 'c22', 'b22', 'p23', 'c23', 'b23', 'p24', 'c24', 'b24',
    'p25', 'c25', 'b25', 'p26', 'c26', 'b26',
    'p27', 'c27', 'b27',
    'p28', 'c28', 'b28',
    'p29', 'c29', 'b29',
    'p30', 'c30', 'b30',
]);

const LESSON_ENRICHMENT_PROFILES: Record<string, LessonEnrichmentProfile> = {
    p16: {
        predictionQuestion: 'Compass challenge: if local field strength increases, what changes first in your navigation signal?',
        predictionGood: 'Needle alignment speed increases toward field direction.',
        predictionBadA: 'Direction becomes random despite stronger field.',
        predictionBadB: 'Magnetic strength has no measurable effect on heading.',
        mechanismPrompt: 'Explain the mechanism by linking field direction, torque, and final orientation.',
        mechanismGood: 'Field exerts torque until the compass reaches stable alignment.',
        mechanismBadA: 'Needles point north only because of arrow shape.',
        mechanismBadB: 'Alignment occurs without force or interaction.',
        extensionPrompt: 'Extension: compare weak and strong-field zones and predict navigation reliability.',
        extensionGoodA: 'Strong fields improve heading confidence but may amplify local distortion near metal.',
        extensionGoodB: 'Weak fields increase uncertainty and slower correction after disturbances.',
        extensionBad: 'Field strength changes but reliability cannot change.',
    },
    c16: {
        predictionQuestion: 'Material test: if domain alignment increases, what optical or magnetic property shifts first?',
        predictionGood: 'Net magnetization increases because more domains point similarly.',
        predictionBadA: 'All materials become equally magnetic regardless of structure.',
        predictionBadB: 'Domain behavior is unrelated to magnetization.',
        mechanismPrompt: 'Explain how micro-scale domains produce macro-scale magnetic response.',
        mechanismGood: 'Aligned domains add vectors to produce stronger net field response.',
        mechanismBadA: 'Magnetism appears without internal structure.',
        mechanismBadB: 'Domains cancel less when heating increases randomness.',
        extensionPrompt: 'Extension: predict what happens after heating then cooling a magnetic sample.',
        extensionGoodA: 'Heating weakens alignment; controlled cooling can partially restore ordering.',
        extensionGoodB: 'Repeated cycles can change hysteresis and response speed.',
        extensionBad: 'Thermal changes never affect magnetic materials.',
    },
    b16: {
        predictionQuestion: 'Migration cue challenge: if magnetic cue quality drops, which behavior shifts first?',
        predictionGood: 'Path correction frequency rises as orientation confidence drops.',
        predictionBadA: 'Animals keep perfect paths with no cue integration.',
        predictionBadB: 'Magnetic sensing cannot influence route choices.',
        mechanismPrompt: 'Explain how magnetoreception interacts with visual or solar cues.',
        mechanismGood: 'Brains fuse multiple cues and reweight them when one cue becomes noisy.',
        mechanismBadA: 'Navigation uses only one cue at all times.',
        mechanismBadB: 'Cue conflict improves precision automatically.',
        extensionPrompt: 'Extension: predict outcomes when cloud cover removes visual landmarks.',
        extensionGoodA: 'Reliance on magnetic cues rises, but uncertainty increases in disturbed fields.',
        extensionGoodB: 'Behavior may shift to periodic recalibration and conservative routing.',
        extensionBad: 'Removing landmarks has zero navigation effect.',
    },
    p17: {
        predictionQuestion: 'Load test: if point load increases on a beam, what shifts first?',
        predictionGood: 'Deflection increases fastest near unsupported spans.',
        predictionBadA: 'Stress stays uniform regardless of support geometry.',
        predictionBadB: 'More load cannot change structural response.',
        mechanismPrompt: 'Explain the load path from applied force to supports.',
        mechanismGood: 'Forces redistribute through members into supports along specific load paths.',
        mechanismBadA: 'Loads disappear before reaching supports.',
        mechanismBadB: 'Geometry does not affect stress concentration.',
        extensionPrompt: 'Extension: compare truss-style and flat-span layouts under the same load.',
        extensionGoodA: 'Truss geometry can reduce peak stress by distributing force paths.',
        extensionGoodB: 'Flat spans may need stronger materials to offset higher bending moments.',
        extensionBad: 'All geometries perform identically under load.',
    },
    c17: {
        predictionQuestion: 'Material choice challenge: if water content rises in concrete, what changes first?',
        predictionGood: 'Porosity tends to increase, lowering final mechanical strength.',
        predictionBadA: 'Extra water always makes stronger concrete.',
        predictionBadB: 'Chemistry is unrelated to structural durability.',
        mechanismPrompt: 'Explain how composition controls microstructure and strength.',
        mechanismGood: 'Chemical ratios shape hydration products that determine pore network and strength.',
        mechanismBadA: 'Strength is set only by external shape.',
        mechanismBadB: 'Molecular structure cannot affect cracks.',
        extensionPrompt: 'Extension: compare steel, concrete, and composite tradeoffs in one design.',
        extensionGoodA: 'Composites can combine stiffness and toughness while managing corrosion risk.',
        extensionGoodB: 'Material pairing should match load type and environment exposure.',
        extensionBad: 'Material chemistry never changes engineering outcomes.',
    },
    b17: {
        predictionQuestion: 'Bone loading challenge: if impact rate increases, what risk rises first?',
        predictionGood: 'Microdamage accumulation rises before visible fracture.',
        predictionBadA: 'Higher impact always improves bone integrity.',
        predictionBadB: 'Living tissue ignores repeated stress.',
        mechanismPrompt: 'Explain how bone structure balances strength, mass, and remodeling.',
        mechanismGood: 'Trabecular and cortical architecture adapt to repeated loads through remodeling.',
        mechanismBadA: 'Bone geometry is static and never adapts.',
        mechanismBadB: 'Only minerals matter; cells do not influence strength.',
        extensionPrompt: 'Extension: predict effects of rest intervals during training cycles.',
        extensionGoodA: 'Recovery time supports repair and reduces fatigue-style failure risk.',
        extensionGoodB: 'Overtraining can outpace remodeling and increase fracture probability.',
        extensionBad: 'Recovery has no role in structural biology.',
    },
    p18: {
        predictionQuestion: 'River dynamics: if flow velocity increases, where does change appear first?',
        predictionGood: 'Shear stress and erosion rise first in high-gradient sections.',
        predictionBadA: 'Fast flow causes immediate deposition everywhere.',
        predictionBadB: 'Velocity cannot influence erosion.',
        mechanismPrompt: 'Explain how energy and slope control erosion versus deposition.',
        mechanismGood: 'Higher kinetic energy mobilizes particles; lower energy zones deposit sediment.',
        mechanismBadA: 'Slope has no effect on transport capacity.',
        mechanismBadB: 'Particles move without flow energy.',
        extensionPrompt: 'Extension: predict outcomes after adding a meander to a straight channel.',
        extensionGoodA: 'Outer bends erode while inner bends accumulate deposited material.',
        extensionGoodB: 'Habitat heterogeneity can increase as flow zones diversify.',
        extensionBad: 'Channel shape cannot affect transport patterns.',
    },
    c18: {
        predictionQuestion: 'Dissolved chemistry test: if acidity increases, what shifts first?',
        predictionGood: 'Mineral dissolution rates increase for susceptible compounds.',
        predictionBadA: 'pH changes never affect dissolved ion levels.',
        predictionBadB: 'All minerals dissolve at identical rates.',
        mechanismPrompt: 'Explain how pH and ion equilibrium influence dissolution.',
        mechanismGood: 'Chemical equilibrium shifts with pH, changing dissolution and precipitation balance.',
        mechanismBadA: 'Ion concentration is fixed regardless of reactions.',
        mechanismBadB: 'Water chemistry cannot alter rock weathering.',
        extensionPrompt: 'Extension: compare upstream fresh input with downstream concentration buildup.',
        extensionGoodA: 'Dilution upstream and accumulation downstream can produce different ion signatures.',
        extensionGoodB: 'Buffer chemistry can moderate rapid pH swings.',
        extensionBad: 'Spatial location never affects dissolved chemistry.',
    },
    b18: {
        predictionQuestion: 'Habitat web challenge: if dissolved oxygen drops, what responds first?',
        predictionGood: 'Sensitive species decline first in stressed zones.',
        predictionBadA: 'All species remain equally unaffected.',
        predictionBadB: 'Oxygen availability does not affect habitat quality.',
        mechanismPrompt: 'Explain how flow zones and chemistry shape ecological niches.',
        mechanismGood: 'Species distributions track oxygen, flow speed, shelter, and food availability.',
        mechanismBadA: 'Habitats are uniform even when conditions vary strongly.',
        mechanismBadB: 'Biology is disconnected from physical river structure.',
        extensionPrompt: 'Extension: predict ecosystem response to seasonal flood pulses.',
        extensionGoodA: 'Flood pulses can reset habitat structure and shift community composition.',
        extensionGoodB: 'Connectivity may rise temporarily, then fragment as waters recede.',
        extensionBad: 'Seasonal flow variation has no ecological impact.',
    },
    p19: {
        predictionQuestion: 'Soil physics test: if compaction increases, what changes first?',
        predictionGood: 'Porosity and infiltration decrease before plant decline appears.',
        predictionBadA: 'Compaction always improves root aeration.',
        predictionBadB: 'Water movement is unrelated to pore structure.',
        mechanismPrompt: 'Explain how pore geometry controls water and gas transport.',
        mechanismGood: 'Pore size distribution sets infiltration, drainage, and oxygen diffusion rates.',
        mechanismBadA: 'All soils transmit water equally regardless of structure.',
        mechanismBadB: 'Soil air exchange is independent of compaction.',
        extensionPrompt: 'Extension: compare coarse and fine textures under the same rainfall pulse.',
        extensionGoodA: 'Coarse soils drain faster; fine soils retain water longer but may limit aeration.',
        extensionGoodB: 'Optimal performance often requires balancing retention with oxygen access.',
        extensionBad: 'Texture has no role in hydrology.',
    },
    c19: {
        predictionQuestion: 'Soil chemistry challenge: if pH shifts acidic, what responds first?',
        predictionGood: 'Nutrient availability and ion form change quickly.',
        predictionBadA: 'Nutrients remain equally available at all pH values.',
        predictionBadB: 'pH does not influence root uptake chemistry.',
        mechanismPrompt: 'Explain the mechanism connecting pH, solubility, and nutrient uptake.',
        mechanismGood: 'pH alters solubility and charge interactions, changing which ions roots can access.',
        mechanismBadA: 'Plant uptake ignores chemical form.',
        mechanismBadB: 'Soil reactions stop once nutrients are added.',
        extensionPrompt: 'Extension: predict benefits and risks of rapid pH correction.',
        extensionGoodA: 'Correction can restore availability but overshoot may trigger new imbalances.',
        extensionGoodB: 'Gradual adjustment supports more stable nutrient dynamics.',
        extensionBad: 'pH correction cannot create tradeoffs.',
    },
    b19: {
        predictionQuestion: 'Soil food web challenge: if organic input rises, what shifts first?',
        predictionGood: 'Microbial activity and decomposition rates increase.',
        predictionBadA: 'Decomposer communities never respond to new carbon input.',
        predictionBadB: 'Biodiversity is unrelated to resource flow.',
        mechanismPrompt: 'Explain how decomposers drive nutrient cycling in soil ecosystems.',
        mechanismGood: 'Microbes and detritivores release nutrients that support plants and higher trophic levels.',
        mechanismBadA: 'Nutrients appear without biological processing.',
        mechanismBadB: 'Food web links do not affect system resilience.',
        extensionPrompt: 'Extension: predict outcomes of pesticide stress on decomposer networks.',
        extensionGoodA: 'Reduced decomposer diversity can slow cycling and weaken ecosystem recovery.',
        extensionGoodB: 'Functional redundancy may buffer losses up to a threshold.',
        extensionBad: 'Removing decomposers has no nutrient effect.',
    },
    p20: {
        predictionQuestion: 'Optics challenge: if focal length decreases, what image behavior shifts first?',
        predictionGood: 'Convergence strength rises, changing image distance and magnification.',
        predictionBadA: 'Focal length does not influence image formation.',
        predictionBadB: 'Rays stop bending when lens curvature increases.',
        mechanismPrompt: 'Explain how refraction geometry sets focus location and image scale.',
        mechanismGood: 'Ray bending at lens surfaces determines where rays intersect and how large images appear.',
        mechanismBadA: 'Magnification occurs without geometric constraints.',
        mechanismBadB: 'Object distance never affects focus.',
        extensionPrompt: 'Extension: predict tradeoffs when maximizing magnification for near objects.',
        extensionGoodA: 'Higher magnification often narrows depth of field and increases sensitivity to placement.',
        extensionGoodB: 'Image brightness and edge clarity may vary with lens setup.',
        extensionBad: 'Magnification can increase forever with no optical cost.',
    },
    c20: {
        predictionQuestion: 'Materials optics challenge: if refractive index rises, what changes first?',
        predictionGood: 'Refraction angle shifts and ray path bends more strongly.',
        predictionBadA: 'Index changes cannot alter light direction.',
        predictionBadB: 'All wavelengths bend by exactly the same amount.',
        mechanismPrompt: 'Explain how refractive index and dispersion influence image quality.',
        mechanismGood: 'Index controls overall bending while dispersion separates wavelengths and can create color fringing.',
        mechanismBadA: 'Dispersion is unrelated to wavelength behavior.',
        mechanismBadB: 'Material chemistry has no optical consequence.',
        extensionPrompt: 'Extension: compare high-index material gains against chromatic tradeoffs.',
        extensionGoodA: 'Higher index may improve compact focusing but can increase dispersion artifacts.',
        extensionGoodB: 'Coatings and design choices can reduce unwanted color separation.',
        extensionBad: 'Material selection cannot affect aberrations.',
    },
    b20: {
        predictionQuestion: 'Vision challenge: if ciliary tension mismatches target distance, what appears first?',
        predictionGood: 'Blur increases because focal plane shifts away from retina.',
        predictionBadA: 'Focus remains perfect regardless of lens shape.',
        predictionBadB: 'Accommodation has no role in near-far vision.',
        mechanismPrompt: 'Explain how accommodation keeps images on the retina.',
        mechanismGood: 'Ciliary muscles change lens curvature to move focus onto retinal tissue.',
        mechanismBadA: 'Retina position moves each time we refocus.',
        mechanismBadB: 'Muscle state cannot influence optical power.',
        extensionPrompt: 'Extension: predict tradeoffs in age-related accommodation decline.',
        extensionGoodA: 'Near focus weakens first, often needing external lens correction.',
        extensionGoodB: 'Task-specific strategies can compensate partially but not fully.',
        extensionBad: 'Accommodation decline has no visual impact.',
    },
    p21: {
        predictionQuestion: 'Tide challenge: if lunar-solar alignment strengthens, what shifts first?',
        predictionGood: 'Tidal range increases between high and low water levels.',
        predictionBadA: 'Alignment cannot influence sea-level cycles.',
        predictionBadB: 'Only wind sets repeating tidal timing.',
        mechanismPrompt: 'Explain how orbital forcing and rotation create predictable cycles.',
        mechanismGood: 'Gravitational forcing plus Earth rotation produces repeating tide timing and range.',
        mechanismBadA: 'Tides occur randomly without periodic drivers.',
        mechanismBadB: 'Celestial geometry has no ocean effect.',
        extensionPrompt: 'Extension: predict coastal planning implications of spring versus neap tides.',
        extensionGoodA: 'Infrastructure timing and navigation windows should adapt to cycle amplitude.',
        extensionGoodB: 'Risk management should account for compounded surge during high-range tides.',
        extensionBad: 'Tidal range has no operational relevance.',
    },
    c21: {
        predictionQuestion: 'Carbon cycle challenge: if combustion outpaces photosynthesis, what shifts first?',
        predictionGood: 'Atmospheric carbon load trends upward.',
        predictionBadA: 'Cycle reservoirs prevent any concentration change.',
        predictionBadB: 'Flux imbalance cannot affect long-term storage.',
        mechanismPrompt: 'Explain how reservoir flux imbalance changes system state over time.',
        mechanismGood: 'When source flux exceeds sink flux, reservoirs accumulate carbon in specific compartments.',
        mechanismBadA: 'Flux rates do not influence reservoir size.',
        mechanismBadB: 'Carbon remains fixed in one form permanently.',
        extensionPrompt: 'Extension: predict how restoring sink processes affects stabilization.',
        extensionGoodA: 'Strengthening sinks can reduce net accumulation if maintained over time.',
        extensionGoodB: 'Timing matters because delayed action allows larger interim buildup.',
        extensionBad: 'Sink changes cannot influence cycle balance.',
    },
    b21: {
        predictionQuestion: 'Respiration challenge: if oxygen drops while demand rises, what changes first?',
        predictionGood: 'ATP efficiency declines and stress signals increase.',
        predictionBadA: 'Lower oxygen improves ATP efficiency.',
        predictionBadB: 'Metabolic cycles are unaffected by inputs.',
        mechanismPrompt: 'Explain how oxygen availability constrains aerobic ATP pathways.',
        mechanismGood: 'Oxygen-limited electron transport reduces efficient ATP production capacity.',
        mechanismBadA: 'ATP output is constant regardless of oxygen supply.',
        mechanismBadB: 'Feedback regulation does not exist in metabolism.',
        extensionPrompt: 'Extension: predict adaptation options under sustained hypoxia.',
        extensionGoodA: 'Organisms can adjust demand, delivery, and pathway usage but with tradeoffs.',
        extensionGoodB: 'Compensation may preserve survival while reducing peak performance.',
        extensionBad: 'Hypoxia requires no physiological adjustment.',
    },
    p22: {
        predictionQuestion: 'Seismic mapping challenge: if wave velocity changes between layers, what appears first?',
        predictionGood: 'Travel-time differences reveal hidden boundary structure.',
        predictionBadA: 'Layer properties cannot affect arrival timing.',
        predictionBadB: 'All waves move identically through all materials.',
        mechanismPrompt: 'Explain how wave speed contrasts encode subsurface geometry.',
        mechanismGood: 'Refraction and reflection at boundaries alter paths and arrival sequences.',
        mechanismBadA: 'Wave paths ignore material transitions.',
        mechanismBadB: 'Timing data cannot infer internal structure.',
        extensionPrompt: 'Extension: predict benefits of adding more sensor stations.',
        extensionGoodA: 'Denser sampling improves triangulation and uncertainty reduction.',
        extensionGoodB: 'Multiple paths can separate true signals from local noise.',
        extensionBad: 'Sensor count has no effect on mapping quality.',
    },
    c22: {
        predictionQuestion: 'Spectroscopy challenge: if a sample includes a new element, what shifts first?',
        predictionGood: 'New absorption or emission lines appear at characteristic wavelengths.',
        predictionBadA: 'Element identity cannot affect spectral signatures.',
        predictionBadB: 'All elements produce identical spectra.',
        mechanismPrompt: 'Explain how electron transitions create spectral fingerprints.',
        mechanismGood: 'Discrete energy levels produce specific wavelength transitions unique to each element.',
        mechanismBadA: 'Spectral lines are random and non-diagnostic.',
        mechanismBadB: 'Wavelength has no relation to energy change.',
        extensionPrompt: 'Extension: predict tradeoffs between high resolution and signal intensity.',
        extensionGoodA: 'Higher resolution separates close lines but may reduce signal strength per channel.',
        extensionGoodB: 'Optimizing integration time can recover usable signal with finer detail.',
        extensionBad: 'Resolution never affects measurement quality.',
    },
    b22: {
        predictionQuestion: 'Ultrasound challenge: if frequency increases, what tends to change first?',
        predictionGood: 'Resolution improves while penetration depth usually decreases.',
        predictionBadA: 'Higher frequency improves both depth and resolution without tradeoff.',
        predictionBadB: 'Frequency does not affect imaging behavior.',
        mechanismPrompt: 'Explain how wavelength and attenuation shape imaging limits.',
        mechanismGood: 'Shorter wavelengths resolve finer detail but attenuate more strongly in tissue.',
        mechanismBadA: 'Attenuation is independent of wave frequency.',
        mechanismBadB: 'Echo timing cannot reconstruct depth.',
        extensionPrompt: 'Extension: choose settings for deep-organ versus shallow-vascular imaging.',
        extensionGoodA: 'Use lower frequency for depth and higher frequency for superficial detail.',
        extensionGoodB: 'Protocol choice should match tissue depth and clinical target.',
        extensionBad: 'One frequency is always optimal for every target.',
    },
    p23: {
        predictionQuestion: 'Fracture challenge: if cyclic load increases, what changes first?',
        predictionGood: 'Crack growth rate rises after stress concentration zones activate.',
        predictionBadA: 'Repeated loading cannot cause progressive damage.',
        predictionBadB: 'Fatigue occurs only after one extreme overload.',
        mechanismPrompt: 'Explain how stress concentration drives crack initiation and propagation.',
        mechanismGood: 'Local stress peaks near defects accelerate crack nucleation and growth cycles.',
        mechanismBadA: 'Defects do not influence fracture risk.',
        mechanismBadB: 'Cracks spread uniformly with no hotspots.',
        extensionPrompt: 'Extension: predict benefit of reducing peak loads versus reducing cycle count.',
        extensionGoodA: 'Lower peak stress can greatly extend fatigue life in sensitive regions.',
        extensionGoodB: 'Cycle management also helps when peak reduction is limited.',
        extensionBad: 'Fatigue life is fixed and cannot be improved.',
    },
    c23: {
        predictionQuestion: 'Corrosion challenge: if moisture and oxygen increase, what shifts first?',
        predictionGood: 'Electrochemical oxidation rates rise at vulnerable surfaces.',
        predictionBadA: 'Corrosion rate is unrelated to environment chemistry.',
        predictionBadB: 'Metals cannot undergo oxidation in real conditions.',
        mechanismPrompt: 'Explain the redox pathway that converts metal atoms into corrosion products.',
        mechanismGood: 'Anodic oxidation and cathodic reduction couple through electron and ion transport.',
        mechanismBadA: 'Rust forms without electron transfer.',
        mechanismBadB: 'Protective coatings never alter electrochemical pathways.',
        extensionPrompt: 'Extension: compare barrier coatings with sacrificial protection strategies.',
        extensionGoodA: 'Barrier layers block reactants while sacrificial anodes redirect oxidation.',
        extensionGoodB: 'Best protection often combines material choice, coating, and environment control.',
        extensionBad: 'All anti-corrosion strategies perform identically.',
    },
    b23: {
        predictionQuestion: 'Healing challenge: if inflammation is prolonged, what changes first?',
        predictionGood: 'Repair progression slows and scar risk may increase.',
        predictionBadA: 'Long inflammation always accelerates regeneration.',
        predictionBadB: 'Healing phases are independent and unordered.',
        mechanismPrompt: 'Explain how inflammation, proliferation, and remodeling phases coordinate repair.',
        mechanismGood: 'Phase timing controls cell recruitment, matrix formation, and tissue strengthening.',
        mechanismBadA: 'Tissues regenerate fully without signaling control.',
        mechanismBadB: 'Blood supply does not influence healing quality.',
        extensionPrompt: 'Extension: predict effects of reduced perfusion on wound closure.',
        extensionGoodA: 'Lower nutrient and oxygen delivery can delay closure and weaken regeneration.',
        extensionGoodB: 'Targeted support can improve outcomes by restoring local conditions.',
        extensionBad: 'Perfusion has no role in tissue repair.',
    },
    p24: {
        predictionQuestion: 'Flow network challenge: if one branch narrows, what shifts first?',
        predictionGood: 'Local resistance increases and upstream pressure rises.',
        predictionBadA: 'Bottlenecks do not affect total throughput.',
        predictionBadB: 'Flow rerouting cannot occur in connected networks.',
        mechanismPrompt: 'Explain how pressure gradients and resistance determine branch flow.',
        mechanismGood: 'Flow redistributes to lower-resistance paths when one segment constricts.',
        mechanismBadA: 'Pressure does not drive movement in networks.',
        mechanismBadB: 'Branch geometry cannot affect throughput.',
        extensionPrompt: 'Extension: compare adding a parallel branch versus widening the bottleneck.',
        extensionGoodA: 'Parallel routing and widening can both relieve pressure but with different efficiency gains.',
        extensionGoodB: 'Design choice depends on cost, constraints, and control needs.',
        extensionBad: 'Network redesign cannot improve delivery.',
    },
    c24: {
        predictionQuestion: 'Reaction network challenge: if one catalytic step slows, what changes first?',
        predictionGood: 'Intermediates accumulate upstream of the bottleneck step.',
        predictionBadA: 'Rate-limiting steps do not alter concentration patterns.',
        predictionBadB: 'Catalysts cannot influence network throughput.',
        mechanismPrompt: 'Explain how bottlenecks control pathway flux distribution.',
        mechanismGood: 'Slow steps constrain total flux and reshape intermediate pools across branches.',
        mechanismBadA: 'Every step contributes equally regardless of kinetics.',
        mechanismBadB: 'Pathway topology has no effect on outputs.',
        extensionPrompt: 'Extension: predict outcomes of rerouting flux through an alternate pathway.',
        extensionGoodA: 'Alternate routes can restore throughput but may change byproducts.',
        extensionGoodB: 'Catalyst tuning can rebalance selectivity and productivity.',
        extensionBad: 'Rerouting cannot affect reaction outcomes.',
    },
    b24: {
        predictionQuestion: 'Vascular transport challenge: if one vessel pathway is constricted, what changes first?',
        predictionGood: 'Local delivery drops and compensatory redistribution begins.',
        predictionBadA: 'Constricted pathways do not affect tissue supply.',
        predictionBadB: 'Networked vessels cannot reroute flow.',
        mechanismPrompt: 'Explain how branching and resistance shape biological delivery.',
        mechanismGood: 'Pressure gradients and branch resistance govern where nutrients and signals can reach.',
        mechanismBadA: 'Transport rate is independent of vessel architecture.',
        mechanismBadB: 'Tissues receive equal supply regardless of pathway status.',
        extensionPrompt: 'Extension: compare short-term compensation with long-term vascular adaptation.',
        extensionGoodA: 'Immediate rerouting can stabilize function while remodeling supports long-term recovery.',
        extensionGoodB: 'Adaptation success depends on demand level and collateral capacity.',
        extensionBad: 'Biological transport networks do not adapt.',
    },
    p25: {
        predictionQuestion: 'Chaos challenge: if initial angle shifts slightly, what appears first over time?',
        predictionGood: 'Trajectories diverge progressively despite nearly identical starts.',
        predictionBadA: 'Small initial changes cannot alter long-term motion.',
        predictionBadB: 'Chaotic systems become more predictable with time automatically.',
        mechanismPrompt: 'Explain sensitivity to initial conditions in nonlinear dynamics.',
        mechanismGood: 'Nonlinear coupling amplifies tiny differences into large trajectory separation.',
        mechanismBadA: 'System equations force identical outcomes from nearby starts.',
        mechanismBadB: 'Feedback is irrelevant to chaotic motion.',
        extensionPrompt: 'Extension: predict what control strategies can still work in chaotic regimes.',
        extensionGoodA: 'Short-horizon forecasting plus continual correction can stabilize useful behavior.',
        extensionGoodB: 'Controlling boundary conditions can reduce divergence growth rate.',
        extensionBad: 'Chaos means control and prediction are both impossible.',
    },
    c25: {
        predictionQuestion: 'Chain reaction challenge: if trigger frequency rises, what changes first?',
        predictionGood: 'Propagation speed and amplification risk increase.',
        predictionBadA: 'Trigger rate cannot affect chain progression.',
        predictionBadB: 'Inhibitors never change runaway behavior.',
        mechanismPrompt: 'Explain how initiation, propagation, and termination govern reaction cascades.',
        mechanismGood: 'Balance between propagation and termination determines whether cascades grow or stop.',
        mechanismBadA: 'Chain reactions proceed identically regardless of inhibitors.',
        mechanismBadB: 'Propagation occurs without reactive intermediates.',
        extensionPrompt: 'Extension: compare reducing initiators versus increasing quenchers.',
        extensionGoodA: 'Both can suppress cascades, but kinetics and side effects differ.',
        extensionGoodB: 'Layered control is often most reliable for runaway prevention.',
        extensionBad: 'Cascade control has no practical strategy.',
    },
    b25: {
        predictionQuestion: 'Mutation cascade challenge: if one variant gains advantage, what shifts first?',
        predictionGood: 'Frequency of linked traits can rise through population feedback.',
        predictionBadA: 'Single variants cannot influence population dynamics.',
        predictionBadB: 'Selection pressure has no effect on trait prevalence.',
        mechanismPrompt: 'Explain how mutation, selection, and inheritance create cascading population change.',
        mechanismGood: 'Small trait differences can amplify across generations under persistent selection pressure.',
        mechanismBadA: 'Evolutionary change occurs without differential survival.',
        mechanismBadB: 'Population structure cannot affect mutation spread.',
        extensionPrompt: 'Extension: predict tradeoffs of rapid adaptation under changing environments.',
        extensionGoodA: 'Fast adaptation can improve short-term fitness but reduce diversity buffers.',
        extensionGoodB: 'Variable environments may favor flexible trait distributions over single extremes.',
        extensionBad: 'Adaptation speed never creates tradeoffs.'
    }
};

const parseBigIdeaFromLessonId = (lessonId: string): number => {
    const match = lessonId.match(/\d+/);
    return match ? Number(match[0]) : 0;
};

const getGlossaryForLesson = (lessonId: string): GlossaryEntry[] => {
    const bigIdea = parseBigIdeaFromLessonId(lessonId);
    return BIG_IDEA_GLOSSARY[bigIdea] ?? [];
};

const getDisciplineFromLessonId = (lessonId: string): 'physics' | 'chemistry' | 'biology' => {
    if (lessonId.startsWith('c')) return 'chemistry';
    if (lessonId.startsWith('b')) return 'biology';
    return 'physics';
};

const getDisciplineCoaching = (lessonId: string) => {
    const discipline = getDisciplineFromLessonId(lessonId);
    if (discipline === 'chemistry') {
        return {
            vocabRetry: 'Definitions help you track species, reactions, and concentration changes with precision.',
            predictionRetryA: 'Track which chemical variable shifts first after the condition change, then follow downstream reactions.',
            predictionRetryB: 'Chemical systems are responsive: at least one concentration, rate, or pathway signal should move first.',
            mechanismRetryA: 'Build a reaction pathway: changed condition, first chemical response, then observed system effect.',
            mechanismRetryB: 'Use one glossary term and tie it to a measurable chemistry signal such as rate, flux, or composition.',
            extensionRetry: 'Chemical tradeoffs are common: improving one metric can shift yield, selectivity, stability, or byproducts.',
        };
    }
    if (discipline === 'biology') {
        return {
            vocabRetry: 'Definitions help you connect structure, function, and adaptation using evidence from living systems.',
            predictionRetryA: 'Find the first biological response after the condition shift, then track organism or tissue-level consequences.',
            predictionRetryB: 'Living systems use feedback; a key marker usually shifts first before broader phenotype changes appear.',
            mechanismRetryA: 'Explain the biological pathway: trigger, regulatory response, and resulting functional outcome.',
            mechanismRetryB: 'Use one glossary term and connect it to a measured biological indicator such as survival, growth, or efficiency.',
            extensionRetry: 'Biological tradeoffs are expected: gains in one trait can create costs in resilience, energy, or long-term stability.',
        };
    }
    return {
        vocabRetry: 'Definitions help you describe forces, signals, and constraints with precise physical reasoning.',
        predictionRetryA: 'Track the first measurable physical variable that moves after the control change, then follow the chain.',
        predictionRetryB: 'Physical systems respond through causal sequences, so at least one observable should shift first.',
        mechanismRetryA: 'State the physical mechanism in order: input change, governing interaction, and measured output.',
        mechanismRetryB: 'Use one glossary term and tie it to observable evidence from the visual model.',
        extensionRetry: 'Physical designs involve tradeoffs: increasing one performance metric often reduces stability, efficiency, or precision.',
    };
};

const getEnrichmentProfile = (lessonId: string): LessonEnrichmentProfile => {
    return LESSON_ENRICHMENT_PROFILES[lessonId] ?? {
        predictionQuestion: 'Prediction round: if you increase a key driver in this system, what is the most likely first effect?',
        predictionGood: 'One measurable output shifts before others.',
        predictionBadA: 'Everything changes equally at once.',
        predictionBadB: 'No output changes in a responsive system.',
        mechanismPrompt: 'Explain the mechanism by linking a specific cause to a measurable effect.',
        mechanismGood: 'The model links a specific cause to a measured effect.',
        mechanismBadA: 'The result happened randomly without mechanism.',
        mechanismBadB: 'Observed changes need no explanatory model.',
        extensionPrompt: 'Extension challenge: choose one control to push to an extreme and predict a tradeoff before testing.',
        extensionGoodA: 'I predict higher output but lower stability.',
        extensionGoodB: 'I predict improved speed with reduced precision.',
        extensionBad: 'I predict no tradeoff in a constrained system.',
    };
};

const appendOption = (node: DialogNode, option: { id: string; label: string; nextNodeId: string; sentiment?: 'positive' | 'neutral' | 'negative' }) => {
    const options = node.options ?? [];
    if (!options.some(o => o.id === option.id)) {
        node.options = [...options, option];
    }
};

const enrichScriptForAdvancedBigIdeas = (lessonId: string, baseFactory: ScriptFactory): ScriptFactory => {
    return () => {
        const script = baseFactory();
        if (!BI16_TO_25_IDS.has(lessonId) || !script.root) {
            return script;
        }

        const glossary = getGlossaryForLesson(lessonId);
        const profile = getEnrichmentProfile(lessonId);
        const coaching = getDisciplineCoaching(lessonId);
        const defaultNext = script.root.options?.find(o => o.sentiment === 'positive')?.nextNodeId
            ?? script.root.options?.[0]?.nextNodeId
            ?? 'root';

        const checkpointId = script.checkpoint ? 'checkpoint' : undefined;
        const checkpointCorrectId = script.checkpoint_correct ? 'checkpoint_correct' : undefined;
        const discoveryId = script.discovery ? 'discovery' : undefined;

        const vocabDetails = glossary.length
            ? glossary.map(entry => `**${entry.term}** means ${entry.definition}.`).join(' ')
            : '**core concept** means the main rule that explains what changes and why.';

        appendOption(script.root, {
            id: 'vocab_primer',
            label: 'Teach me key words first.',
            nextNodeId: 'enrich_vocab_intro',
            sentiment: 'neutral',
        });
        appendOption(script.root, {
            id: 'prediction_challenge',
            label: 'Give me a prediction challenge.',
            nextNodeId: 'enrich_prediction',
            sentiment: 'neutral',
        });

        script.enrich_vocab_intro = {
            id: 'enrich_vocab_intro',
            speaker: 'AI',
            content: `Great choice. Before we continue, here are your lesson anchors: ${vocabDetails}`,
            options: [
                { id: 'vocab_check', label: 'Quiz me on these terms.', nextNodeId: 'enrich_vocab_check' },
                { id: 'vocab_continue', label: 'Continue to the main lesson.', nextNodeId: defaultNext },
            ],
        };

        script.enrich_vocab_check = {
            id: 'enrich_vocab_check',
            speaker: 'AI',
            content: 'Quick check: when we define a term carefully, what does that help you do during the simulation?',
            options: [
                { id: 'vocab_good', label: 'Connect controls to cause-and-effect patterns.', nextNodeId: 'enrich_vocab_feedback', sentiment: 'positive' },
                { id: 'vocab_bad1', label: 'Memorize words without using evidence.', nextNodeId: 'enrich_vocab_retry' },
                { id: 'vocab_bad2', label: 'Skip reasoning and jump to answers.', nextNodeId: 'enrich_vocab_retry' },
            ],
        };

        script.enrich_vocab_retry = {
            id: 'enrich_vocab_retry',
            speaker: 'AI',
            content: coaching.vocabRetry,
            options: [{ id: 'vocab_retry_next', label: 'Got it. Continue.', nextNodeId: 'enrich_vocab_feedback' }],
        };

        script.enrich_vocab_feedback = {
            id: 'enrich_vocab_feedback',
            speaker: 'AI',
            content: 'Exactly. Now use those definitions while adjusting controls and reading outcomes.',
            options: [{ id: 'vocab_to_main', label: 'Start the main path.', nextNodeId: defaultNext }],
        };

        script.enrich_prediction = {
            id: 'enrich_prediction',
            speaker: 'AI',
            content: profile.predictionQuestion,
            options: [
                { id: 'pred_good', label: profile.predictionGood, nextNodeId: 'enrich_prediction_feedback', sentiment: 'positive' },
                { id: 'pred_bad1', label: profile.predictionBadA, nextNodeId: 'enrich_prediction_retry_a' },
                { id: 'pred_bad2', label: profile.predictionBadB, nextNodeId: 'enrich_prediction_retry_b' },
            ],
        };

        script.enrich_prediction_retry_a = {
            id: 'enrich_prediction_retry_a',
            speaker: 'AI',
            content: `Careful: "${profile.predictionBadA}" skips the first measurable response. ${coaching.predictionRetryA}`,
            options: [{ id: 'pred_retry_a_next', label: 'Retry with a causal sequence.', nextNodeId: 'enrich_prediction_feedback' }],
        };

        script.enrich_prediction_retry_b = {
            id: 'enrich_prediction_retry_b',
            speaker: 'AI',
            content: `Check this assumption: "${profile.predictionBadB}" misses system sensitivity. ${coaching.predictionRetryB}`,
            options: [{ id: 'pred_retry_next', label: 'Continue with that model.', nextNodeId: 'enrich_prediction_feedback' }],
        };

        script.enrich_prediction_feedback = {
            id: 'enrich_prediction_feedback',
            speaker: 'AI',
            content: 'Nice. Use this prediction habit: choose, predict, test, and revise using evidence.',
            options: [{ id: 'pred_to_main', label: 'Continue to lesson flow.', nextNodeId: defaultNext }],
        };

        if (checkpointCorrectId && checkpointId && script[checkpointCorrectId]) {
            const originalCheckpointOptions = script[checkpointCorrectId].options ?? [];
            const originalDiscoveryNext = originalCheckpointOptions[0]?.nextNodeId ?? discoveryId ?? 'complete';
            script[checkpointCorrectId].options = [
                { id: 'explain_first', label: 'Explain why that answer works.', nextNodeId: 'enrich_checkpoint_explain' },
                ...originalCheckpointOptions,
            ];

            script.enrich_checkpoint_explain = {
                id: 'enrich_checkpoint_explain',
                speaker: 'AI',
                content: `Strong answer. ${profile.mechanismPrompt} Use at least one definition: ${vocabDetails}`,
                options: [
                    { id: 'exp_good', label: profile.mechanismGood, nextNodeId: 'enrich_checkpoint_feedback', sentiment: 'positive' },
                    { id: 'exp_bad_a', label: profile.mechanismBadA, nextNodeId: 'enrich_checkpoint_retry_a' },
                    { id: 'exp_bad_b', label: profile.mechanismBadB, nextNodeId: 'enrich_checkpoint_retry_b' },
                ],
            };

            script.enrich_checkpoint_retry_a = {
                id: 'enrich_checkpoint_retry_a',
                speaker: 'AI',
                content: `"${profile.mechanismBadA}" leaves out the causal chain. ${coaching.mechanismRetryA}`,
                options: [{ id: 'exp_retry_a_next', label: 'Rebuild the mechanism step-by-step.', nextNodeId: 'enrich_checkpoint_feedback' }],
            };

            script.enrich_checkpoint_retry_b = {
                id: 'enrich_checkpoint_retry_b',
                speaker: 'AI',
                content: `"${profile.mechanismBadB}" does not match the model structure. ${coaching.mechanismRetryB}`,
                options: [{ id: 'exp_retry_b_next', label: 'Retry with evidence and vocabulary.', nextNodeId: 'enrich_checkpoint_feedback' }],
            };

            script.enrich_checkpoint_feedback = {
                id: 'enrich_checkpoint_feedback',
                speaker: 'AI',
                content: 'Excellent. You are now reasoning like a scientist: definitions plus evidence plus mechanism.',
                options: [{ id: 'exp_to_discovery', label: 'Move to discovery.', nextNodeId: originalDiscoveryNext }],
            };
        }

        if (discoveryId && script[discoveryId]) {
            const originalDiscoveryOptions = script[discoveryId].options ?? [];
            const completeNext = originalDiscoveryOptions[0]?.nextNodeId ?? 'complete';
            script[discoveryId].options = [
                { id: 'discovery_extension', label: 'Give me one extension challenge.', nextNodeId: 'enrich_extension' },
                ...originalDiscoveryOptions,
            ];

            script.enrich_extension = {
                id: 'enrich_extension',
                speaker: 'AI',
                content: profile.extensionPrompt,
                options: [
                    { id: 'ext_choice1', label: profile.extensionGoodA, nextNodeId: 'enrich_extension_feedback', sentiment: 'positive' },
                    { id: 'ext_choice2', label: profile.extensionGoodB, nextNodeId: 'enrich_extension_feedback', sentiment: 'positive' },
                    { id: 'ext_choice3', label: profile.extensionBad, nextNodeId: 'enrich_extension_retry' },
                ],
            };

            script.enrich_extension_retry = {
                id: 'enrich_extension_retry',
                speaker: 'AI',
                content: coaching.extensionRetry,
                options: [{ id: 'ext_retry_next', label: 'Continue.', nextNodeId: 'enrich_extension_feedback' }],
            };

            script.enrich_extension_feedback = {
                id: 'enrich_extension_feedback',
                speaker: 'AI',
                content: 'Great extension reasoning. You are ready to conclude with stronger conceptual depth.',
                options: [{ id: 'ext_to_complete', label: 'Finish lesson.', nextNodeId: completeNext }],
            };
        }

        return script;
    };
};

// --- Script Map: lessonId → script factory ---
const BASE_LESSON_SCRIPTS: Record<string, ScriptFactory> = {
    'p1': getP1Script,
    'c1': getC1Script,
    'b1': getB1Script,
    'p2': getP2Script,
    'c2': getC2Script,
    'b2': getB2Script,
    'p3': getP3Script,
    'c3': getC3Script,
    'b3': getB3Script,
    'p4': getP4Script,
    'c4': getC4Script,
    'b4': getB4Script,
    'p5': getP5Script,
    'c5': getC5Script,
    'b5': getB5Script,
    'p6': getP6Script,
    'c6': getC6Script,
    'b6': getB6Script,
    'p7': getP7Script,
    'c7': getC7Script,
    'b7': getB7Script,
    'p8': getP8Script,
    'c8': getC8Script,
    'b8': getB8Script,
    'p9': getP9Script,
    'c9': getC9Script,
    'b9': getB9Script,
    'p10': getP10Script,
    'c10': getC10Script,
    'b10': getB10Script,
    'p11': getP11Script,
    'c11': getC11Script,
    'b11': getB11Script,
    'p12': getP12Script,
    'c12': getC12Script,
    'b12': getB12Script,
    'p13': getP13Script,
    'c13': getC13Script,
    'b13': getB13Script,
    'p14': getP14Script,
    'c14': getC14Script,
    'b14': getB14Script,
    'p15': getP15Script,
    'c15': getC15Script,
    'b15': getB15Script,
    'p16': getP16Script,
    'c16': getC16Script,
    'b16': getB16Script,
    'p17': getP17Script,
    'c17': getC17Script,
    'b17': getB17Script,
    'p18': getP18Script,
    'c18': getC18Script,
    'b18': getB18Script,
    'p19': getP19Script,
    'c19': getC19Script,
    'b19': getB19Script,
    'p20': getP20Script,
    'c20': getC20Script,
    'b20': getB20Script,
    'p21': getP21Script,
    'c21': getC21Script,
    'b21': getB21Script,
    'p22': getP22Script,
    'c22': getC22Script,
    'b22': getB22Script,
    'p23': getP23Script,
    'c23': getC23Script,
    'b23': getB23Script,
    'p24': getP24Script,
    'c24': getC24Script,
    'b24': getB24Script,
    'p25': getP25Script,
    'c25': getC25Script,
    'b25': getB25Script,
    'p26': getP26Script,
    'c26': getC26Script,
    'b26': getB26Script,
    'p27': getP27Script,
    'c27': getC27Script,
    'b27': getB27Script,
    'p28': getP28Script,
    'c28': getC28Script,
    'b28': getB28Script,
    'p29': getP29Script,
    'c29': getC29Script,
    'b29': getB29Script,
    'p30': getP30Script,
    'c30': getC30Script,
    'b30': getB30Script,
    'p31': getP31Script,
    'c31': getC31Script,
    'b31': getB31Script,
    'p32': getP32Script,
    'c32': getC32Script,
    'b32': getB32Script,
    'p33': getP33Script,
    'c33': getC33Script,
    'b33': getB33Script,
    'p34': getP34Script,
    'c34': getC34Script,
    'b34': getB34Script,
    'p35': getP35Script,
    'c35': getC35Script,
    'b35': getB35Script,
    'p36': getP36Script,
    'c36': getC36Script,
    'b36': getB36Script,
    'p37': getP37Script,
    'c37': getC37Script,
    'b37': getB37Script,
    'p38': getP38Script,
    'c38': getC38Script,
    'b38': getB38Script,
    'p39': getP39Script,
    'c39': getC39Script,
    'b39': getB39Script,
    'p40': getP40Script,
    'c40': getC40Script,
    'b40': getB40Script,
    'p41': getP41Script,
    'c41': getC41Script,
    'b41': getB41Script,
    'p42': getP42Script,
    'c42': getC42Script,
    'b42': getB42Script,
    'p43': getP43Script,
    'c43': getC43Script,
    'b43': getB43Script,
    'p44': getP44Script,
    'c44': getC44Script,
    'b44': getB44Script,
    'p45': getP45Script,
    'c45': getC45Script,
    'b45': getB45Script,
    'p46': getP46Script,
    'c46': getC46Script,
    'b46': getB46Script,
    'p47': getP47Script,
    'c47': getC47Script,
    'b47': getB47Script,
    'p48': getP48Script,
    'c48': getC48Script,
    'b48': getB48Script,
    'p49': getP49Script,
    'c49': getC49Script,
    'b49': getB49Script,
    'p50': getP50Script,
    'c50': getC50Script,
    'b50': getB50Script,

    // --- Level 2 (grades 6-8) ---
    // The id deliberately starts with a digit after the leading letter, so
    // Number.parseInt(id.slice(1)) is 2, not 33. That keeps it outside the
    // `bigIdea >= 21` Level 1 normalisation, which would otherwise flatten its
    // multi-branch maths questions into single-option steps.
    'l2p1': getL2P1Script,
    'l2c1': getL2C1Script,
    'l2b1': getL2B1Script,
    'l2p33': getL2P33Script,
    'l2c33': getL2C33Script,
    'l2b33': getL2B33Script,
    'l2p49': getL2P49Script,
};

const LEVEL1_NORMALIZE_ALL_LESSONS = LEVEL1_NORMALIZATION_ENABLED;

const withSingleOption = (node: DialogNode | undefined, option: { id: string; label: string; nextNodeId: string }) => {
    if (!node) return;
    node.options = [option];
};

const normalizeScriptForLevel1 = (script: Record<string, DialogNode>): Record<string, DialogNode> => {
    const normalized = Object.fromEntries(
        Object.entries(script)
            .filter(([id]) => !id.startsWith('enrich_'))
            .map(([id, node]) => [id, { ...node, options: node.options ? [...node.options] : undefined }])
    ) as Record<string, DialogNode>;

    const root = normalized[LEVEL1_FLOW_NODE_IDS.root];
    const misconception = normalized[LEVEL1_FLOW_NODE_IDS.misconception];
    const correct = normalized[LEVEL1_FLOW_NODE_IDS.correct];
    const checkpoint = normalized[LEVEL1_FLOW_NODE_IDS.checkpoint];
    const checkpointWrong = normalized[LEVEL1_FLOW_NODE_IDS.checkpointWrong];
    const checkpointCorrect = normalized[LEVEL1_FLOW_NODE_IDS.checkpointCorrect];
    const discovery = normalized[LEVEL1_FLOW_NODE_IDS.discovery];
    const complete = normalized[LEVEL1_FLOW_NODE_IDS.complete];

    if (!root || !complete) {
        return normalized;
    }

    const toCorrect = correct ? LEVEL1_FLOW_NODE_IDS.correct : checkpoint ? LEVEL1_FLOW_NODE_IDS.checkpoint : discovery ? LEVEL1_FLOW_NODE_IDS.discovery : LEVEL1_FLOW_NODE_IDS.complete;
    const toCheckpoint = checkpoint ? LEVEL1_FLOW_NODE_IDS.checkpoint : discovery ? LEVEL1_FLOW_NODE_IDS.discovery : LEVEL1_FLOW_NODE_IDS.complete;
    const toDiscovery = discovery ? LEVEL1_FLOW_NODE_IDS.discovery : LEVEL1_FLOW_NODE_IDS.complete;

    const rootPositive = root.options?.find(o => o.sentiment === 'positive') ?? root.options?.[0];
    const rootMisconception = root.options?.find(o => o.nextNodeId === LEVEL1_FLOW_NODE_IDS.misconception)
        ?? root.options?.find(o => o.nextNodeId !== (rootPositive?.nextNodeId ?? ''));

    const rootOptions = [] as NonNullable<DialogNode['options']>;
    if (rootPositive) {
        rootOptions.push({ ...rootPositive, nextNodeId: toCorrect });
    }
    if (misconception && rootMisconception) {
        rootOptions.push({ ...rootMisconception, nextNodeId: LEVEL1_FLOW_NODE_IDS.misconception });
    }
    if (rootOptions.length > 0) {
        root.options = rootOptions.slice(0, 2);
    }

    if (misconception) {
        withSingleOption(misconception, {
            id: 'misconception_continue',
            label: LEVEL1_LABELS.continue,
            nextNodeId: toCorrect,
        });
    }

    if (correct) {
        withSingleOption(correct, {
            id: 'to_checkpoint',
            label: LEVEL1_LABELS.checkpoint,
            nextNodeId: toCheckpoint,
        });
    }

    if (checkpoint) {
        const cpPositive = checkpoint.options?.find(o => o.sentiment === 'positive') ?? checkpoint.options?.[0];
        const cpNegative = checkpoint.options?.find(o => o.sentiment !== 'positive' && o.id !== cpPositive?.id)
            ?? checkpoint.options?.find(o => o.id !== cpPositive?.id);

        const cpOptions = [] as NonNullable<DialogNode['options']>;
        if (cpPositive) {
            cpOptions.push({ ...cpPositive, nextNodeId: checkpointCorrect ? LEVEL1_FLOW_NODE_IDS.checkpointCorrect : toDiscovery });
        }
        if (cpNegative) {
            cpOptions.push({ ...cpNegative, nextNodeId: checkpointWrong ? LEVEL1_FLOW_NODE_IDS.checkpointWrong : (checkpointCorrect ? LEVEL1_FLOW_NODE_IDS.checkpointCorrect : toDiscovery) });
        }
        if (cpOptions.length > 0) {
            checkpoint.options = cpOptions.slice(0, 2);
        }
    }

    if (checkpointWrong) {
        withSingleOption(checkpointWrong, {
            id: 'checkpoint_retry',
            label: LEVEL1_LABELS.retry,
            nextNodeId: checkpointCorrect ? LEVEL1_FLOW_NODE_IDS.checkpointCorrect : toDiscovery,
        });
    }

    if (checkpointCorrect) {
        withSingleOption(checkpointCorrect, {
            id: 'to_discovery',
            label: LEVEL1_LABELS.discovery,
            nextNodeId: toDiscovery,
        });
    }

    if (discovery) {
        withSingleOption(discovery, {
            id: 'to_complete',
            label: LEVEL1_LABELS.complete,
            nextNodeId: LEVEL1_FLOW_NODE_IDS.complete,
        });
    }

    complete.options = [];
    return normalized;
};

export const LESSON_SCRIPTS: Record<string, ScriptFactory> = Object.fromEntries(
    Object.entries(BASE_LESSON_SCRIPTS).map(([lessonId, factory]) => [
        lessonId,
        () => {
            const bigIdeaNumber = Number.parseInt(lessonId.slice(1), 10);
            const shouldNormalizeStructure = LEVEL1_NORMALIZE_ALL_LESSONS && bigIdeaNumber >= 21;

            const baseScript = (
                LEVEL1_NORMALIZE_ALL_LESSONS
                    ? factory
                    : BI16_TO_25_IDS.has(lessonId)
                        ? enrichScriptForAdvancedBigIdeas(lessonId, factory)
                        : factory
            )();

            return shouldNormalizeStructure
                ? normalizeScriptForLevel1(baseScript)
                : baseScript;
        },
    ])
) as Record<string, ScriptFactory>;

// --- Lesson Registry ---
export const LESSON_REGISTRY: LessonMeta[] = [
    // Big Idea 1: "Why Do Things Move?"
    { id: 'p1', title: 'Push, Pull, Slide', subtitle: 'Forces that start and stop motion', discipline: 'physics', bigIdea: 1, bigIdeaTitle: 'Why Do Things Move?', icon: '🏎️', accentColor: 'indigo', crossLinks: ['c1', 'b1'] },
    { id: 'c1', title: 'Particles on the Move', subtitle: 'Heat makes molecules dance', discipline: 'chemistry', bigIdea: 1, bigIdeaTitle: 'Why Do Things Move?', icon: '🔬', accentColor: 'emerald', crossLinks: ['p1', 'b1'] },
    { id: 'b1', title: 'Muscles & Bones', subtitle: 'How your body creates movement', discipline: 'biology', bigIdea: 1, bigIdeaTitle: 'Why Do Things Move?', icon: '💪', accentColor: 'rose', crossLinks: ['p1', 'c1'] },

    // Big Idea 2: "What Is Everything Made Of?"
    { id: 'p2', title: 'States of Matter', subtitle: 'Solid, liquid, gas under energy', discipline: 'physics', bigIdea: 2, bigIdeaTitle: 'What Is Everything Made Of?', icon: '🧊', accentColor: 'indigo', crossLinks: ['c2', 'b2'] },
    { id: 'c2', title: 'Atoms & Molecules', subtitle: 'Building blocks of everything', discipline: 'chemistry', bigIdea: 2, bigIdeaTitle: 'What Is Everything Made Of?', icon: '⚛️', accentColor: 'emerald', crossLinks: ['p2', 'b2'] },
    { id: 'b2', title: 'Cells: Life\'s Bricks', subtitle: 'The building blocks of living things', discipline: 'biology', bigIdea: 2, bigIdeaTitle: 'What Is Everything Made Of?', icon: '🧫', accentColor: 'rose', crossLinks: ['p2', 'c2'] },

    // Big Idea 3: "Where Does Energy Come From?"
    { id: 'p3', title: 'Energy Ramp', subtitle: 'Potential, kinetic, and transformation', discipline: 'physics', bigIdea: 3, bigIdeaTitle: 'Where Does Energy Come From?', icon: '⚡', accentColor: 'indigo', crossLinks: ['c3', 'b3'] },
    { id: 'c3', title: 'Chemical Reactions', subtitle: 'Bond-breaking and bond-making energy', discipline: 'chemistry', bigIdea: 3, bigIdeaTitle: 'Where Does Energy Come From?', icon: '🧪', accentColor: 'emerald', crossLinks: ['p3', 'b3'] },
    { id: 'b3', title: 'Food Chains', subtitle: 'How energy flows through life', discipline: 'biology', bigIdea: 3, bigIdeaTitle: 'Where Does Energy Come From?', icon: '🌿', accentColor: 'rose', crossLinks: ['p3', 'c3'] },

    // Big Idea 4: "How Do We Sense the World?"
    { id: 'p4', title: 'Sound Waves', subtitle: 'Vibrations that carry through materials', discipline: 'physics', bigIdea: 4, bigIdeaTitle: 'How Do We Sense the World?', icon: '🔊', accentColor: 'indigo', crossLinks: ['c4', 'b4'] },
    { id: 'c4', title: 'Light & Color', subtitle: 'Electromagnetic waves and absorption', discipline: 'chemistry', bigIdea: 4, bigIdeaTitle: 'How Do We Sense the World?', icon: '🌈', accentColor: 'emerald', crossLinks: ['p4', 'b4'] },
    { id: 'b4', title: 'Eyes, Ears & Nerves', subtitle: 'Your body\'s sensor network', discipline: 'biology', bigIdea: 4, bigIdeaTitle: 'How Do We Sense the World?', icon: '🧠', accentColor: 'rose', crossLinks: ['p4', 'c4'] },

    // Big Idea 5: "How Can a Small Force Do a Big Job?"
    { id: 'p5', title: 'Levers & Balance', subtitle: 'Multiplying force with distance', discipline: 'physics', bigIdea: 5, bigIdeaTitle: 'How Can a Small Force Do a Big Job?', icon: '⚖️', accentColor: 'indigo', crossLinks: ['c5', 'b5'] },
    { id: 'c5', title: 'Dissolving & Saturation', subtitle: 'Limits of mixing and soda fizz', discipline: 'chemistry', bigIdea: 5, bigIdeaTitle: 'How Can a Small Force Do a Big Job?', icon: '🥤', accentColor: 'emerald', crossLinks: ['p5', 'b5'] },
    { id: 'b5', title: 'Homeostasis', subtitle: 'Your body\'s thermostat system', discipline: 'biology', bigIdea: 5, bigIdeaTitle: 'How Can a Small Force Do a Big Job?', icon: '🌡️', accentColor: 'rose', crossLinks: ['p5', 'c5'] },

    // Big Idea 6: "Why Do Things Float or Sink?"
    { id: 'p6', title: 'Density & Buoyancy', subtitle: 'Why things float or sink', discipline: 'physics', bigIdea: 6, bigIdeaTitle: 'Why Do Things Float or Sink?', icon: '🚢', accentColor: 'indigo', crossLinks: ['c6', 'b6'] },
    { id: 'c6', title: 'Mixtures & Separation', subtitle: 'Separating substances by properties', discipline: 'chemistry', bigIdea: 6, bigIdeaTitle: 'Why Do Things Float or Sink?', icon: '🧫', accentColor: 'emerald', crossLinks: ['p6', 'b6'] },
    { id: 'b6', title: 'How Fish Breathe', subtitle: 'Gills extracting dissolved oxygen', discipline: 'biology', bigIdea: 6, bigIdeaTitle: 'Why Do Things Float or Sink?', icon: '🐟', accentColor: 'rose', crossLinks: ['p6', 'c6'] },

    // Big Idea 7: "How Does Electricity Work?"
    { id: 'p7', title: 'Circuits & Current', subtitle: 'Series and parallel circuits', discipline: 'physics', bigIdea: 7, bigIdeaTitle: 'How Does Electricity Work?', icon: '⚡', accentColor: 'indigo', crossLinks: ['c7', 'b7'] },
    { id: 'c7', title: 'Batteries & Chemical Energy', subtitle: 'How batteries convert chemical to electrical energy', discipline: 'chemistry', bigIdea: 7, bigIdeaTitle: 'How Does Electricity Work?', icon: '🔋', accentColor: 'emerald', crossLinks: ['p7', 'b7'] },
    { id: 'b7', title: 'Nerve Signals', subtitle: 'Your body\'s electrical messaging system', discipline: 'biology', bigIdea: 7, bigIdeaTitle: 'How Does Electricity Work?', icon: '🧠', accentColor: 'rose', crossLinks: ['p7', 'c7'] },

    // Big Idea 8: "Why Does Weather Change?"
    { id: 'p8', title: 'Heat Transfer', subtitle: 'Conduction, convection, and radiation', discipline: 'physics', bigIdea: 8, bigIdeaTitle: 'Why Does Weather Change?', icon: '🔥', accentColor: 'indigo', crossLinks: ['c8', 'b8'] },
    { id: 'c8', title: 'The Water Cycle', subtitle: 'Journey of a water drop', discipline: 'chemistry', bigIdea: 8, bigIdeaTitle: 'Why Does Weather Change?', icon: '💧', accentColor: 'emerald', crossLinks: ['p8', 'b8'] },
    { id: 'b8', title: 'Animal Adaptations', subtitle: 'Survival strategies for extreme weather', discipline: 'biology', bigIdea: 8, bigIdeaTitle: 'Why Does Weather Change?', icon: '🦊', accentColor: 'rose', crossLinks: ['p8', 'c8'] },

    // Big Idea 9: "How Do Things Grow?"
    { id: 'p9', title: 'Measuring Change', subtitle: 'Graphs, rates, and scaling', discipline: 'physics', bigIdea: 9, bigIdeaTitle: 'How Do Things Grow?', icon: '📈', accentColor: 'indigo', crossLinks: ['c9', 'b9'] },
    { id: 'c9', title: 'Nutrients & Elements', subtitle: 'The building blocks life needs to grow', discipline: 'chemistry', bigIdea: 9, bigIdeaTitle: 'How Do Things Grow?', icon: '🌱', accentColor: 'emerald', crossLinks: ['p9', 'b9'] },
    { id: 'b9', title: 'Cell Division', subtitle: 'How one cell becomes two', discipline: 'biology', bigIdea: 9, bigIdeaTitle: 'How Do Things Grow?', icon: '🔬', accentColor: 'rose', crossLinks: ['p9', 'c9'] },

    // Big Idea 10: "How Do We Protect Our Planet?"
    { id: 'p10', title: 'Renewable Energy', subtitle: 'Solar, wind, and hydroelectric power', discipline: 'physics', bigIdea: 10, bigIdeaTitle: 'How Do We Protect Our Planet?', icon: '🌍', accentColor: 'indigo', crossLinks: ['c10', 'b10'] },
    { id: 'c10', title: 'Air Pollution', subtitle: 'The invisible blanket warming Earth', discipline: 'chemistry', bigIdea: 10, bigIdeaTitle: 'How Do We Protect Our Planet?', icon: '🏭', accentColor: 'emerald', crossLinks: ['p10', 'b10'] },
    { id: 'b10', title: 'Ecosystems & Biodiversity', subtitle: 'Food webs, species, and the web of life', discipline: 'biology', bigIdea: 10, bigIdeaTitle: 'How Do We Protect Our Planet?', icon: '🐺', accentColor: 'rose', crossLinks: ['p10', 'c10'] },

    // Big Idea 11: "How Do We Stay Healthy?"
    { id: 'p11', title: 'The Pumping Heart', subtitle: 'Blood pressure and flow dynamics', discipline: 'physics', bigIdea: 11, bigIdeaTitle: 'How Do We Stay Healthy?', icon: '🫀', accentColor: 'indigo', crossLinks: ['c11', 'b11'] },
    { id: 'c11', title: 'Acids, Bases & pH', subtitle: 'Chemical balance in the body', discipline: 'chemistry', bigIdea: 11, bigIdeaTitle: 'How Do We Stay Healthy?', icon: '🧪', accentColor: 'emerald', crossLinks: ['p11', 'b11'] },
    { id: 'b11', title: 'Immune Defense', subtitle: 'How your body identifies invaders', discipline: 'biology', bigIdea: 11, bigIdeaTitle: 'How Do We Stay Healthy?', icon: '🛡️', accentColor: 'rose', crossLinks: ['p11', 'c11'] },

    // Big Idea 12: "How Do Hidden Rules Shape Big Patterns?"
    { id: 'p12', title: 'Gravity & Orbits', subtitle: 'Falling sideways through space', discipline: 'physics', bigIdea: 12, bigIdeaTitle: 'How Do Hidden Rules Shape Big Patterns?', icon: '🌌', accentColor: 'indigo', crossLinks: ['c12', 'b12'] },
    { id: 'c12', title: 'Periodic Table Patterns', subtitle: 'Electron structure and element behavior', discipline: 'chemistry', bigIdea: 12, bigIdeaTitle: 'How Do Hidden Rules Shape Big Patterns?', icon: '⚛️', accentColor: 'emerald', crossLinks: ['p12', 'b12'] },
    { id: 'b12', title: 'Natural Selection', subtitle: 'How traits spread across generations', discipline: 'biology', bigIdea: 12, bigIdeaTitle: 'How Do Hidden Rules Shape Big Patterns?', icon: '🦋', accentColor: 'rose', crossLinks: ['p12', 'c12'] },

    // Big Idea 13: "How Does Structure Shape Function?"
    { id: 'p13', title: 'Gears & Pulleys', subtitle: 'How mechanical structure controls force and speed', discipline: 'physics', bigIdea: 13, bigIdeaTitle: 'How Does Structure Shape Function?', icon: '⚙️', accentColor: 'indigo', crossLinks: ['c13', 'b13'] },
    { id: 'c13', title: 'Polymers & Materials', subtitle: 'How molecular structure changes material behavior', discipline: 'chemistry', bigIdea: 13, bigIdeaTitle: 'How Does Structure Shape Function?', icon: '🧵', accentColor: 'emerald', crossLinks: ['p13', 'b13'] },
    { id: 'b13', title: 'Photosynthesis Engine', subtitle: 'How leaf structures convert light into biomass', discipline: 'biology', bigIdea: 13, bigIdeaTitle: 'How Does Structure Shape Function?', icon: '🌿', accentColor: 'rose', crossLinks: ['p13', 'c13'] },

    // Big Idea 14: "How Is Information Coded and Transmitted?"
    { id: 'p14', title: 'Waves & Signals', subtitle: 'Analog and digital information transfer', discipline: 'physics', bigIdea: 14, bigIdeaTitle: 'How Is Information Coded and Transmitted?', icon: '📡', accentColor: 'indigo', crossLinks: ['c14', 'b14'] },
    { id: 'c14', title: 'Chemical Bonding Code', subtitle: 'How electron rules build molecules', discipline: 'chemistry', bigIdea: 14, bigIdeaTitle: 'How Is Information Coded and Transmitted?', icon: '🔗', accentColor: 'emerald', crossLinks: ['p14', 'b14'] },
    { id: 'b14', title: 'DNA & Genetics', subtitle: 'Life\'s four-letter information system', discipline: 'biology', bigIdea: 14, bigIdeaTitle: 'How Is Information Coded and Transmitted?', icon: '🧬', accentColor: 'rose', crossLinks: ['p14', 'c14'] },

    // Big Idea 15: "How Do Systems Find Balance?"
    { id: 'p15', title: 'Pendulum & Resonance', subtitle: 'Oscillation, damping, and timing', discipline: 'physics', bigIdea: 15, bigIdeaTitle: 'How Do Systems Find Balance?', icon: '⏱️', accentColor: 'indigo', crossLinks: ['c15', 'b15'] },
    { id: 'c15', title: 'Chemical Equilibrium', subtitle: 'Dynamic balance in reversible reactions', discipline: 'chemistry', bigIdea: 15, bigIdeaTitle: 'How Do Systems Find Balance?', icon: '⚗️', accentColor: 'emerald', crossLinks: ['p15', 'b15'] },
    { id: 'b15', title: 'Predator-Prey Cycles', subtitle: 'Ecological oscillations and stability', discipline: 'biology', bigIdea: 15, bigIdeaTitle: 'How Do Systems Find Balance?', icon: '🐺', accentColor: 'rose', crossLinks: ['p15', 'c15'] },

    // Big Idea 16: "How Do Magnets Help Us Navigate and Build Machines?"
    { id: 'p16', title: 'Magnets & Navigation', subtitle: 'Compass direction and magnetic fields', discipline: 'physics', bigIdea: 16, bigIdeaTitle: 'How Do Magnets Help Us Navigate and Build Machines?', icon: '🧭', accentColor: 'indigo', crossLinks: ['c16', 'b16'] },
    { id: 'c16', title: 'Magnetic Materials', subtitle: 'Why only some materials respond strongly', discipline: 'chemistry', bigIdea: 16, bigIdeaTitle: 'How Do Magnets Help Us Navigate and Build Machines?', icon: '🧲', accentColor: 'emerald', crossLinks: ['p16', 'b16'] },
    { id: 'b16', title: 'Migration Sensing', subtitle: 'How animals combine navigation cues', discipline: 'biology', bigIdea: 16, bigIdeaTitle: 'How Do Magnets Help Us Navigate and Build Machines?', icon: '🕊️', accentColor: 'rose', crossLinks: ['p16', 'c16'] },

    // Big Idea 17: "How Do Structures Stay Standing?"
    { id: 'p17', title: 'Structures & Loads', subtitle: 'Support geometry and force paths', discipline: 'physics', bigIdea: 17, bigIdeaTitle: 'How Do Structures Stay Standing?', icon: '🏗️', accentColor: 'indigo', crossLinks: ['c17', 'b17'] },
    { id: 'c17', title: 'Construction Materials', subtitle: 'Concrete, steel, and composite behavior', discipline: 'chemistry', bigIdea: 17, bigIdeaTitle: 'How Do Structures Stay Standing?', icon: '🧱', accentColor: 'emerald', crossLinks: ['p17', 'b17'] },
    { id: 'b17', title: 'Bone Strength Design', subtitle: 'How living structures balance mass and strength', discipline: 'biology', bigIdea: 17, bigIdeaTitle: 'How Do Structures Stay Standing?', icon: '🦴', accentColor: 'rose', crossLinks: ['p17', 'c17'] },

    // Big Idea 18: "How Do Rivers Shape the Land?"
    { id: 'p18', title: 'River Flow & Erosion', subtitle: 'Speed-driven transport and deposition', discipline: 'physics', bigIdea: 18, bigIdeaTitle: 'How Do Rivers Shape the Land?', icon: '🌊', accentColor: 'indigo', crossLinks: ['c18', 'b18'] },
    { id: 'c18', title: 'Dissolved River Chemistry', subtitle: 'Invisible ions and watershed chemistry', discipline: 'chemistry', bigIdea: 18, bigIdeaTitle: 'How Do Rivers Shape the Land?', icon: '💧', accentColor: 'emerald', crossLinks: ['p18', 'b18'] },
    { id: 'b18', title: 'River Habitat Webs', subtitle: 'Flow zones and ecological niches', discipline: 'biology', bigIdea: 18, bigIdeaTitle: 'How Do Rivers Shape the Land?', icon: '🐟', accentColor: 'rose', crossLinks: ['p18', 'c18'] },

    // Big Idea 19: "How Does Soil Support Life?"
    { id: 'p19', title: 'Soil Physics', subtitle: 'Porosity, drainage, and aeration', discipline: 'physics', bigIdea: 19, bigIdeaTitle: 'How Does Soil Support Life?', icon: '🪨', accentColor: 'indigo', crossLinks: ['c19', 'b19'] },
    { id: 'c19', title: 'Soil Chemistry', subtitle: 'pH and nutrient availability', discipline: 'chemistry', bigIdea: 19, bigIdeaTitle: 'How Does Soil Support Life?', icon: '🌱', accentColor: 'emerald', crossLinks: ['p19', 'b19'] },
    { id: 'b19', title: 'Soil Biodiversity', subtitle: 'Decomposers and nutrient cycling', discipline: 'biology', bigIdea: 19, bigIdeaTitle: 'How Does Soil Support Life?', icon: '🪱', accentColor: 'rose', crossLinks: ['p19', 'c19'] },

    // Big Idea 20: "How Do Lenses Change What We See?"
    { id: 'p20', title: 'Lens Ray Physics', subtitle: 'Refraction, focus, and magnification', discipline: 'physics', bigIdea: 20, bigIdeaTitle: 'How Do Lenses Change What We See?', icon: '🔍', accentColor: 'indigo', crossLinks: ['c20', 'b20'] },
    { id: 'c20', title: 'Optical Materials', subtitle: 'Refractive index and lens chemistry', discipline: 'chemistry', bigIdea: 20, bigIdeaTitle: 'How Do Lenses Change What We See?', icon: '🧪', accentColor: 'emerald', crossLinks: ['p20', 'b20'] },
    { id: 'b20', title: 'Eye Focusing System', subtitle: 'Accommodation and biological optics', discipline: 'biology', bigIdea: 20, bigIdeaTitle: 'How Do Lenses Change What We See?', icon: '👁️', accentColor: 'rose', crossLinks: ['p20', 'c20'] },

    // Big Idea 21: "How Do Cycles Keep Systems Alive?"
    { id: 'p21', title: 'Tidal Cycles', subtitle: 'Orbital forcing and repeating sea-level change', discipline: 'physics', bigIdea: 21, bigIdeaTitle: 'How Do Cycles Keep Systems Alive?', icon: '🌙', accentColor: 'indigo', crossLinks: ['c21', 'b21'] },
    { id: 'c21', title: 'Carbon Cycle Chemistry', subtitle: 'Reservoir exchange and chemical flux balance', discipline: 'chemistry', bigIdea: 21, bigIdeaTitle: 'How Do Cycles Keep Systems Alive?', icon: '♻️', accentColor: 'emerald', crossLinks: ['p21', 'b21'] },
    { id: 'b21', title: 'Respiration Cycles', subtitle: 'Regulated ATP production and metabolic turnover', discipline: 'biology', bigIdea: 21, bigIdeaTitle: 'How Do Cycles Keep Systems Alive?', icon: '🫁', accentColor: 'rose', crossLinks: ['p21', 'c21'] },

    // Big Idea 22: "How Do Waves Help Us See the Invisible?"
    { id: 'p22', title: 'Seismic Wave Mapping', subtitle: 'Using wave paths to infer hidden layers', discipline: 'physics', bigIdea: 22, bigIdeaTitle: 'How Do Waves Help Us See the Invisible?', icon: '📳', accentColor: 'indigo', crossLinks: ['c22', 'b22'] },
    { id: 'c22', title: 'Spectroscopy Fingerprints', subtitle: 'Element identity from wavelength signatures', discipline: 'chemistry', bigIdea: 22, bigIdeaTitle: 'How Do Waves Help Us See the Invisible?', icon: '🌈', accentColor: 'emerald', crossLinks: ['p22', 'b22'] },
    { id: 'b22', title: 'Ultrasound Imaging', subtitle: 'Echo timing to reconstruct internal structure', discipline: 'biology', bigIdea: 22, bigIdeaTitle: 'How Do Waves Help Us See the Invisible?', icon: '🩺', accentColor: 'rose', crossLinks: ['p22', 'c22'] },

    // Big Idea 23: "How Do Materials Break and Recover?"
    { id: 'p23', title: 'Stress and Fracture', subtitle: 'Fatigue, concentration, and crack growth', discipline: 'physics', bigIdea: 23, bigIdeaTitle: 'How Do Materials Break and Recover?', icon: '🪓', accentColor: 'indigo', crossLinks: ['c23', 'b23'] },
    { id: 'c23', title: 'Corrosion and Protection', subtitle: 'Electrochemical degradation and prevention', discipline: 'chemistry', bigIdea: 23, bigIdeaTitle: 'How Do Materials Break and Recover?', icon: '🧲', accentColor: 'emerald', crossLinks: ['p23', 'b23'] },
    { id: 'b23', title: 'Wound Healing', subtitle: 'Phased tissue repair and regeneration', discipline: 'biology', bigIdea: 23, bigIdeaTitle: 'How Do Materials Break and Recover?', icon: '🩹', accentColor: 'rose', crossLinks: ['p23', 'c23'] },

    // Big Idea 24: "How Do Networks Deliver What Matters?"
    { id: 'p24', title: 'Flow Networks', subtitle: 'Pressure, resistance, and branch throughput', discipline: 'physics', bigIdea: 24, bigIdeaTitle: 'How Do Networks Deliver What Matters?', icon: '🚰', accentColor: 'indigo', crossLinks: ['c24', 'b24'] },
    { id: 'c24', title: 'Reaction Networks', subtitle: 'Pathway bottlenecks and catalytic rerouting', discipline: 'chemistry', bigIdea: 24, bigIdeaTitle: 'How Do Networks Deliver What Matters?', icon: '🧬', accentColor: 'emerald', crossLinks: ['p24', 'b24'] },
    { id: 'b24', title: 'Vascular Transport', subtitle: 'Xylem/phloem pathways and delivery control', discipline: 'biology', bigIdea: 24, bigIdeaTitle: 'How Do Networks Deliver What Matters?', icon: '🌿', accentColor: 'rose', crossLinks: ['p24', 'c24'] },

    // Big Idea 25: "How Can Tiny Changes Cause Big Effects?"
    { id: 'p25', title: 'Chaos in Motion', subtitle: 'Sensitivity to initial conditions', discipline: 'physics', bigIdea: 25, bigIdeaTitle: 'How Can Tiny Changes Cause Big Effects?', icon: '🌀', accentColor: 'indigo', crossLinks: ['c25', 'b25'] },
    { id: 'c25', title: 'Chain Reactions', subtitle: 'Propagation, inhibition, and amplification', discipline: 'chemistry', bigIdea: 25, bigIdeaTitle: 'How Can Tiny Changes Cause Big Effects?', icon: '🔥', accentColor: 'emerald', crossLinks: ['p25', 'b25'] },
    { id: 'b25', title: 'Mutation Cascades', subtitle: 'Small variants scaling into population shifts', discipline: 'biology', bigIdea: 25, bigIdeaTitle: 'How Can Tiny Changes Cause Big Effects?', icon: '🧬', accentColor: 'rose', crossLinks: ['p25', 'c25'] },
    { id: 'p26', title: 'Hot Side, Cold Side', subtitle: 'Warm air rises, cool air rushes in — wind!', discipline: 'physics', bigIdea: 26, bigIdeaTitle: 'How Do We Predict Weather?', icon: '☀️', accentColor: 'indigo', crossLinks: ['c26', 'b26'] },
    { id: 'c26', title: 'Cloud Factory', subtitle: 'Water goes up invisible, comes down as rain', discipline: 'chemistry', bigIdea: 26, bigIdeaTitle: 'How Do We Predict Weather?', icon: '☁️', accentColor: 'emerald', crossLinks: ['p26', 'b26'] },
    { id: 'b26', title: 'Animal Weather Reporters', subtitle: 'Animals sense storms before we do', discipline: 'biology', bigIdea: 26, bigIdeaTitle: 'How Do We Predict Weather?', icon: '🐦', accentColor: 'rose', crossLinks: ['p26', 'c26'] },
    { id: 'p27', title: 'Chew, Squeeze, Push!', subtitle: 'Your body uses forces to break food apart', discipline: 'physics', bigIdea: 27, bigIdeaTitle: 'How Does Food Become Usable Energy?', icon: '⚙️', accentColor: 'indigo', crossLinks: ['c27', 'b27'] },
    { id: 'c27', title: 'The Body\'s Chemistry Set', subtitle: 'Enzymes are molecular scissors that cut food', discipline: 'chemistry', bigIdea: 27, bigIdeaTitle: 'How Does Food Become Usable Energy?', icon: '🧪', accentColor: 'emerald', crossLinks: ['p27', 'b27'] },
    { id: 'b27', title: 'The Food Tube', subtitle: 'Organs team up in a 9-meter pipeline', discipline: 'biology', bigIdea: 27, bigIdeaTitle: 'How Does Food Become Usable Energy?', icon: '🫁', accentColor: 'rose', crossLinks: ['p27', 'c27'] },
    { id: 'p28', title: 'The Body Pump', subtitle: 'How lungs, muscles, and nerves use physics together', discipline: 'physics', bigIdea: 28, bigIdeaTitle: 'How Do Body Systems Work Together?', icon: '⚡', accentColor: 'indigo', crossLinks: ['c28', 'b28'] },
    { id: 'c28', title: 'Chemical Messengers', subtitle: 'How hormones carry signals through your blood', discipline: 'chemistry', bigIdea: 28, bigIdeaTitle: 'How Do Body Systems Work Together?', icon: '🧪', accentColor: 'emerald', crossLinks: ['p28', 'b28'] },
    { id: 'b28', title: 'Team Body', subtitle: 'How your organs work together like a relay team', discipline: 'biology', bigIdea: 28, bigIdeaTitle: 'How Do Body Systems Work Together?', icon: '🫀', accentColor: 'rose', crossLinks: ['p28', 'c28'] },
    { id: 'p29', title: 'Contact Networks', subtitle: 'How one sick person starts a chain of spread', discipline: 'physics', bigIdea: 29, bigIdeaTitle: 'How Do Diseases Spread and Stop?', icon: '🕸️', accentColor: 'indigo', crossLinks: ['c29', 'b29'] },
    { id: 'c29', title: 'Germ Busters', subtitle: 'How soap and disinfectants destroy germs', discipline: 'chemistry', bigIdea: 29, bigIdeaTitle: 'How Do Diseases Spread and Stop?', icon: '🧴', accentColor: 'emerald', crossLinks: ['p29', 'b29'] },
    { id: 'b29', title: 'The Germ Fighters', subtitle: 'How your immune army battles invaders', discipline: 'biology', bigIdea: 29, bigIdeaTitle: 'How Do Diseases Spread and Stop?', icon: '💉', accentColor: 'rose', crossLinks: ['p29', 'c29'] },
    { id: 'p30', title: 'The Medicine Race', subtitle: 'How medicine travels from your stomach to the right place', discipline: 'physics', bigIdea: 30, bigIdeaTitle: 'How Do Medicines Reach the Right Place?', icon: '⚡', accentColor: 'indigo', crossLinks: ['c30', 'b30'] },
    { id: 'c30', title: 'Pill Power', subtitle: 'How coatings control when medicine is released', discipline: 'chemistry', bigIdea: 30, bigIdeaTitle: 'How Do Medicines Reach the Right Place?', icon: '💊', accentColor: 'emerald', crossLinks: ['p30', 'b30'] },
    { id: 'b30', title: 'Lock and Key', subtitle: 'How your cells recognize the right medicine', discipline: 'biology', bigIdea: 30, bigIdeaTitle: 'How Do Medicines Reach the Right Place?', icon: '🔑', accentColor: 'rose', crossLinks: ['p30', 'c30'] },
    { id: 'p31', title: 'Downhill Flow', subtitle: 'How gravity pushes water through a city', discipline: 'physics', bigIdea: 31, bigIdeaTitle: 'How Do Cities Move Water and Waste?', icon: '🏗️', accentColor: 'indigo', crossLinks: ['c31', 'b31'] },
    { id: 'c31', title: 'Clean Water', subtitle: 'How chemicals make dirty water safe to drink', discipline: 'chemistry', bigIdea: 31, bigIdeaTitle: 'How Do Cities Move Water and Waste?', icon: '💧', accentColor: 'emerald', crossLinks: ['p31', 'b31'] },
    { id: 'b31', title: 'Invisible Enemies', subtitle: 'How germs in water make people sick', discipline: 'biology', bigIdea: 31, bigIdeaTitle: 'How Do Cities Move Water and Waste?', icon: '🦠', accentColor: 'rose', crossLinks: ['p31', 'c31'] },
    { id: 'p32', title: 'Particle Drift', subtitle: 'How particle size controls airflow and danger', discipline: 'physics', bigIdea: 32, bigIdeaTitle: 'How Does Air Quality Affect Breathing?', icon: '💨', accentColor: 'indigo', crossLinks: ['c32', 'b32'] },
    { id: 'c32', title: 'Smog Reactions', subtitle: 'How sunlight turns exhaust into dangerous ozone', discipline: 'chemistry', bigIdea: 32, bigIdeaTitle: 'How Does Air Quality Affect Breathing?', icon: '🌫️', accentColor: 'emerald', crossLinks: ['p32', 'b32'] },
    { id: 'b32', title: 'Breathing Under Siege', subtitle: 'How pollution particles damage your lungs', discipline: 'biology', bigIdea: 32, bigIdeaTitle: 'How Does Air Quality Affect Breathing?', icon: '🫁', accentColor: 'rose', crossLinks: ['p32', 'c32'] },

    // Big Idea 33: "How Do Ecosystems Support Human Life?"
    { id: 'p33', title: 'The Energy Ladder', subtitle: 'Sunlight shrinks 90% at every step', discipline: 'physics', bigIdea: 33, bigIdeaTitle: 'How Do Ecosystems Support Human Life?', icon: '🌞', accentColor: 'indigo', crossLinks: ['c33', 'b33'] },
    { id: 'c33', title: 'Nature\'s Recycling Loop', subtitle: 'Atoms get used over and over forever', discipline: 'chemistry', bigIdea: 33, bigIdeaTitle: 'How Do Ecosystems Support Human Life?', icon: '🍂', accentColor: 'emerald', crossLinks: ['p33', 'b33'] },
    { id: 'b33', title: 'Nature\'s Free Gifts', subtitle: 'Clean air, water, and food for free', discipline: 'biology', bigIdea: 33, bigIdeaTitle: 'How Do Ecosystems Support Human Life?', icon: '🐝', accentColor: 'rose', crossLinks: ['p33', 'c33'] },

    // Big Idea 34: "How Do Farms Feed a Growing World?"
    { id: 'p34', title: 'Water on the Move', subtitle: 'Getting water to roots without wasting it', discipline: 'physics', bigIdea: 34, bigIdeaTitle: 'How Do Farms Feed a Growing World?', icon: '💧', accentColor: 'indigo', crossLinks: ['c34', 'b34'] },
    { id: 'c34', title: 'Plant Food Chemistry', subtitle: 'Feeding crops without poisoning rivers', discipline: 'chemistry', bigIdea: 34, bigIdeaTitle: 'How Do Farms Feed a Growing World?', icon: '🧪', accentColor: 'emerald', crossLinks: ['p34', 'b34'] },
    { id: 'b34', title: 'The Farm Team', subtitle: 'Bees, worms, and pests decide the harvest', discipline: 'biology', bigIdea: 34, bigIdeaTitle: 'How Do Farms Feed a Growing World?', icon: '🐝', accentColor: 'rose', crossLinks: ['p34', 'c34'] },

    // Big Idea 35: "How Can We Turn Waste Into Resources?"
    { id: 'p35', title: 'The Sorting Machine', subtitle: 'Magnets, air, and density pull trash apart', discipline: 'physics', bigIdea: 35, bigIdeaTitle: 'How Can We Turn Waste Into Resources?', icon: '🧲', accentColor: 'indigo', crossLinks: ['c35', 'b35'] },
    { id: 'c35', title: 'Melt and Remake', subtitle: 'Why metal recycles forever but plastic does not', discipline: 'chemistry', bigIdea: 35, bigIdeaTitle: 'How Can We Turn Waste Into Resources?', icon: '🔥', accentColor: 'emerald', crossLinks: ['p35', 'b35'] },
    { id: 'b35', title: 'The Compost Crew', subtitle: 'Microbes turn scraps into soil', discipline: 'biology', bigIdea: 35, bigIdeaTitle: 'How Can We Turn Waste Into Resources?', icon: '🪱', accentColor: 'rose', crossLinks: ['p35', 'c35'] },

    // Big Idea 36: "How Do We Make Water Safe to Drink?"
    { id: 'p36', title: 'Trapped by the Filter', subtitle: 'Hole size decides what gets caught', discipline: 'physics', bigIdea: 36, bigIdeaTitle: 'How Do We Make Water Safe to Drink?', icon: '🕳️', accentColor: 'indigo', crossLinks: ['c36', 'b36'] },
    { id: 'c36', title: 'Chlorine Patrol', subtitle: 'Chemistry destroys what filters miss', discipline: 'chemistry', bigIdea: 36, bigIdeaTitle: 'How Do We Make Water Safe to Drink?', icon: '🧴', accentColor: 'emerald', crossLinks: ['p36', 'b36'] },
    { id: 'b36', title: 'Water Detectives', subtitle: 'Growing invisible germs until you can count them', discipline: 'biology', bigIdea: 36, bigIdeaTitle: 'How Do We Make Water Safe to Drink?', icon: '🔬', accentColor: 'rose', crossLinks: ['p36', 'c36'] },

    // Big Idea 37: "How Do We Store Energy for Later?"
    { id: 'p37', title: 'Save It for Later', subtitle: 'Pumping water uphill to store energy', discipline: 'physics', bigIdea: 37, bigIdeaTitle: 'How Do We Store Energy for Later?', icon: '⛰️', accentColor: 'indigo', crossLinks: ['c37', 'b37'] },
    { id: 'c37', title: 'Inside a Battery', subtitle: 'A chemical reaction waiting to happen', discipline: 'chemistry', bigIdea: 37, bigIdeaTitle: 'How Do We Store Energy for Later?', icon: '🔋', accentColor: 'emerald', crossLinks: ['p37', 'b37'] },
    { id: 'b37', title: 'Your Body\'s Battery', subtitle: 'Fast glycogen and huge fat reserves', discipline: 'biology', bigIdea: 37, bigIdeaTitle: 'How Do We Store Energy for Later?', icon: '🍞', accentColor: 'rose', crossLinks: ['p37', 'c37'] },

    // Big Idea 38: "How Do Robots Sense and Act?"
    { id: 'p38', title: 'The Feedback Loop', subtitle: 'Sense, compare, correct, repeat', discipline: 'physics', bigIdea: 38, bigIdeaTitle: 'How Do Robots Sense and Act?', icon: '🔁', accentColor: 'indigo', crossLinks: ['c38', 'b38'] },
    { id: 'c38', title: 'Materials That Sense', subtitle: 'Turning light and heat into electricity', discipline: 'chemistry', bigIdea: 38, bigIdeaTitle: 'How Do Robots Sense and Act?', icon: '📡', accentColor: 'emerald', crossLinks: ['p38', 'b38'] },
    { id: 'b38', title: 'Nature\'s Robots', subtitle: 'Animals ran this loop first', discipline: 'biology', bigIdea: 38, bigIdeaTitle: 'How Do Robots Sense and Act?', icon: '🦇', accentColor: 'rose', crossLinks: ['p38', 'c38'] },

    // Big Idea 39: "How Do Computers Use Logic to Solve Problems?"
    { id: 'p39', title: 'On, Off, Answer', subtitle: 'Switches and gates make every decision', discipline: 'physics', bigIdea: 39, bigIdeaTitle: 'How Do Computers Use Logic to Solve Problems?', icon: '🔌', accentColor: 'indigo', crossLinks: ['c39', 'b39'] },
    { id: 'c39', title: 'The Magic Middle', subtitle: 'Silicon: not quite conductor, not quite insulator', discipline: 'chemistry', bigIdea: 39, bigIdeaTitle: 'How Do Computers Use Logic to Solve Problems?', icon: '🔬', accentColor: 'emerald', crossLinks: ['p39', 'b39'] },
    { id: 'b39', title: 'Brain Circuits', subtitle: 'Neurons fire all-or-nothing, and they learn', discipline: 'biology', bigIdea: 39, bigIdeaTitle: 'How Do Computers Use Logic to Solve Problems?', icon: '🧠', accentColor: 'rose', crossLinks: ['p39', 'c39'] },

    // Big Idea 40: "How Do We Use Data to Know What Is True?"
    { id: 'p40', title: 'Measure It Again', subtitle: 'Every measurement has wiggle room', discipline: 'physics', bigIdea: 40, bigIdeaTitle: 'How Do We Use Data to Know What Is True?', icon: '📏', accentColor: 'indigo', crossLinks: ['c40', 'b40'] },
    { id: 'c40', title: 'The Fair Test', subtitle: 'Change one thing, keep the rest the same', discipline: 'chemistry', bigIdea: 40, bigIdeaTitle: 'How Do We Use Data to Know What Is True?', icon: '⚗️', accentColor: 'emerald', crossLinks: ['p40', 'b40'] },
    { id: 'b40', title: 'Follow the Evidence', subtitle: 'Sample size decides what you can claim', discipline: 'biology', bigIdea: 40, bigIdeaTitle: 'How Do We Use Data to Know What Is True?', icon: '🔍', accentColor: 'rose', crossLinks: ['p40', 'c40'] },

    // Big Idea 41: "How Do Patterns and Probability Guide Decisions?"
    { id: 'p41', title: 'Rolling the Dice', subtitle: 'Many random tries make a reliable pattern', discipline: 'physics', bigIdea: 41, bigIdeaTitle: 'How Do Patterns and Probability Guide Decisions?', icon: '🎲', accentColor: 'indigo', crossLinks: ['c41', 'b41'] },
    { id: 'c41', title: 'Lucky Collisions', subtitle: 'Why reactions need luck as well as energy', discipline: 'chemistry', bigIdea: 41, bigIdeaTitle: 'How Do Patterns and Probability Guide Decisions?', icon: '💥', accentColor: 'emerald', crossLinks: ['p41', 'b41'] },
    { id: 'b41', title: 'Chance and Inheritance', subtitle: 'How probability decides which traits appear', discipline: 'biology', bigIdea: 41, bigIdeaTitle: 'How Do Patterns and Probability Guide Decisions?', icon: '👀', accentColor: 'rose', crossLinks: ['p41', 'c41'] },

    // Big Idea 42: "How Does Sports Science Improve Performance?"
    { id: 'p42', title: 'Follow Through', subtitle: 'Why a longer push sends the ball faster', discipline: 'physics', bigIdea: 42, bigIdeaTitle: 'How Does Sports Science Improve Performance?', icon: '⚽', accentColor: 'indigo', crossLinks: ['c42', 'b42'] },
    { id: 'c42', title: 'Sweat and Salt', subtitle: 'Why water alone does not rehydrate you', discipline: 'chemistry', bigIdea: 42, bigIdeaTitle: 'How Does Sports Science Improve Performance?', icon: '💧', accentColor: 'emerald', crossLinks: ['p42', 'b42'] },
    { id: 'b42', title: 'Rest and Rebuild', subtitle: 'Muscles grow on the days you rest', discipline: 'biology', bigIdea: 42, bigIdeaTitle: 'How Does Sports Science Improve Performance?', icon: '💪', accentColor: 'rose', crossLinks: ['p42', 'c42'] },

    // Big Idea 43: "How Do We Design for Safety and Accessibility?"
    { id: 'p43', title: 'Softening the Blow', subtitle: 'A longer stop means a gentler force', discipline: 'physics', bigIdea: 43, bigIdeaTitle: 'How Do We Design for Safety and Accessibility?', icon: '🛡️', accentColor: 'indigo', crossLinks: ['c43', 'b43'] },
    { id: 'c43', title: 'Materials That Protect', subtitle: 'Why helmet foam works by being crushed', discipline: 'chemistry', bigIdea: 43, bigIdeaTitle: 'How Do We Design for Safety and Accessibility?', icon: '⛑️', accentColor: 'emerald', crossLinks: ['p43', 'b43'] },
    { id: 'b43', title: 'Designed for Everyone', subtitle: 'Why the average person does not exist', discipline: 'biology', bigIdea: 43, bigIdeaTitle: 'How Do We Design for Safety and Accessibility?', icon: '♿', accentColor: 'rose', crossLinks: ['p43', 'c43'] },

    // Big Idea 44: "How Do Everyday Materials Get Their Properties?"
    { id: 'p44', title: 'Bend, Scratch, Break', subtitle: 'Why hard is not the same as tough', discipline: 'physics', bigIdea: 44, bigIdeaTitle: 'How Do Everyday Materials Get Their Properties?', icon: '🔨', accentColor: 'indigo', crossLinks: ['c44', 'b44'] },
    { id: 'c44', title: 'Same Atoms, Different Material', subtitle: 'How carbon makes both pencil lead and diamond', discipline: 'chemistry', bigIdea: 44, bigIdeaTitle: 'How Do Everyday Materials Get Their Properties?', icon: '💎', accentColor: 'emerald', crossLinks: ['p44', 'b44'] },
    { id: 'b44', title: "Nature's Layered Armour", subtitle: 'How a shell beats a solid block of the same mineral', discipline: 'biology', bigIdea: 44, bigIdeaTitle: 'How Do Everyday Materials Get Their Properties?', icon: '🐚', accentColor: 'rose', crossLinks: ['p44', 'c44'] },

    // Big Idea 45: "How Do We Manage Noise and Protect Hearing?"
    { id: 'p45', title: 'Turning Down the Volume', subtitle: 'Why doubling your distance quarters the sound', discipline: 'physics', bigIdea: 45, bigIdeaTitle: 'How Do We Manage Noise and Protect Hearing?', icon: '🔉', accentColor: 'indigo', crossLinks: ['c45', 'b45'] },
    { id: 'c45', title: 'Sound-Soaking Materials', subtitle: 'Why soft panels beat solid walls for echoes', discipline: 'chemistry', bigIdea: 45, bigIdeaTitle: 'How Do We Manage Noise and Protect Hearing?', icon: '🧽', accentColor: 'emerald', crossLinks: ['p45', 'b45'] },
    { id: 'b45', title: 'Inside Your Ear', subtitle: 'The tiny hair cells that never grow back', discipline: 'biology', bigIdea: 45, bigIdeaTitle: 'How Do We Manage Noise and Protect Hearing?', icon: '👂', accentColor: 'rose', crossLinks: ['p45', 'c45'] },

    // Big Idea 46: "How Do Color and Perception Work in Design?"
    { id: 'p46', title: 'Mixing Light', subtitle: 'Why red and green light make yellow', discipline: 'physics', bigIdea: 46, bigIdeaTitle: 'How Do Color and Perception Work in Design?', icon: '🔦', accentColor: 'indigo', crossLinks: ['c46', 'b46'] },
    { id: 'c46', title: 'Why Colours Fade', subtitle: 'What sunlight does to a poster', discipline: 'chemistry', bigIdea: 46, bigIdeaTitle: 'How Do Color and Perception Work in Design?', icon: '🖼️', accentColor: 'emerald', crossLinks: ['p46', 'b46'] },
    { id: 'b46', title: 'How Your Eyes See Colour', subtitle: 'Why three colours are enough', discipline: 'biology', bigIdea: 46, bigIdeaTitle: 'How Do Color and Perception Work in Design?', icon: '👁️', accentColor: 'rose', crossLinks: ['p46', 'c46'] },

    // Big Idea 47: "How Do Species Share Habitats?"
    { id: 'p47', title: 'Room to Live', subtitle: 'Why territory size decides how many fit', discipline: 'physics', bigIdea: 47, bigIdeaTitle: 'How Do Species Share Habitats?', icon: '🌳', accentColor: 'indigo', crossLinks: ['c47', 'b47'] },
    { id: 'c47', title: 'Smell Messages', subtitle: 'How a scent mark works while you sleep', discipline: 'chemistry', bigIdea: 47, bigIdeaTitle: 'How Do Species Share Habitats?', icon: '🦊', accentColor: 'emerald', crossLinks: ['p47', 'b47'] },
    { id: 'b47', title: 'Sharing Without Fighting', subtitle: 'How five bird species share one tree', discipline: 'biology', bigIdea: 47, bigIdeaTitle: 'How Do Species Share Habitats?', icon: '🐦', accentColor: 'rose', crossLinks: ['p47', 'c47'] },

    // Big Idea 48: "How Do We Keep Track of Wildlife?"
    { id: 'p48', title: 'Where to Put the Camera', subtitle: 'Why one camera never finds the whole wood', discipline: 'physics', bigIdea: 48, bigIdeaTitle: 'How Do We Keep Track of Wildlife?', icon: '📷', accentColor: 'indigo', crossLinks: ['c48', 'b48'] },
    { id: 'c48', title: 'Traces in the Water', subtitle: 'Finding an animal you have never seen', discipline: 'chemistry', bigIdea: 48, bigIdeaTitle: 'How Do We Keep Track of Wildlife?', icon: '💧', accentColor: 'emerald', crossLinks: ['p48', 'b48'] },
    { id: 'b48', title: 'Counting What You Cannot See', subtitle: 'Why one count tells you almost nothing', discipline: 'biology', bigIdea: 48, bigIdeaTitle: 'How Do We Keep Track of Wildlife?', icon: '🦋', accentColor: 'rose', crossLinks: ['p48', 'c48'] },

    // Big Idea 49: "How Do We Use Earth Resources Responsibly?"
    { id: 'p49', title: 'The Cost of Digging', subtitle: 'Why the same mine costs more every year', discipline: 'physics', bigIdea: 49, bigIdeaTitle: 'How Do We Use Earth Resources Responsibly?', icon: '⛏️', accentColor: 'indigo', crossLinks: ['c49', 'b49'] },
    { id: 'c49', title: 'From Rock to Metal', subtitle: 'Getting the metal out of a bucket of rock', discipline: 'chemistry', bigIdea: 49, bigIdeaTitle: 'How Do We Use Earth Resources Responsibly?', icon: '🔥', accentColor: 'emerald', crossLinks: ['p49', 'b49'] },
    { id: 'b49', title: 'Healing the Land', subtitle: 'Why putting it back takes decades', discipline: 'biology', bigIdea: 49, bigIdeaTitle: 'How Do We Use Earth Resources Responsibly?', icon: '🌱', accentColor: 'rose', crossLinks: ['p49', 'c49'] },

    // Big Idea 50: "How Do Satellites Help Life on Earth?"
    { id: 'p50', title: 'Eyes in the Sky', subtitle: 'Why no satellite can do everything', discipline: 'physics', bigIdea: 50, bigIdeaTitle: 'How Do Satellites Help Life on Earth?', icon: '🛰️', accentColor: 'indigo', crossLinks: ['c50', 'b50'] },
    { id: 'c50', title: 'Built for Space', subtitle: 'Surviving twenty years with nobody to fix you', discipline: 'chemistry', bigIdea: 50, bigIdeaTitle: 'How Do Satellites Help Life on Earth?', icon: '✨', accentColor: 'emerald', crossLinks: ['p50', 'b50'] },
    { id: 'b50', title: 'Watching Life from Space', subtitle: 'Measuring the home, not the animals', discipline: 'biology', bigIdea: 50, bigIdeaTitle: 'How Do Satellites Help Life on Earth?', icon: '🌍', accentColor: 'rose', crossLinks: ['p50', 'c50'] },

    // --- Level 2 (grades 6-8) ---
    // Appended after every Level 1 lesson so the Level 1 running order is
    // untouched; the hub groups by bigIdea, so it still appears under Big Idea 33.
    { id: 'l2p1', title: 'Force, Mass and Acceleration', subtitle: 'Net force first, then divide', discipline: 'physics', bigIdea: 1, bigIdeaTitle: 'Why Do Things Move?', icon: '🧮', accentColor: 'indigo', crossLinks: ['p1'], level: 2 },
    { id: 'l2c1', title: 'How Much Heat?', subtitle: 'Why water is so stubborn', discipline: 'chemistry', bigIdea: 1, bigIdeaTitle: 'Why Do Things Move?', icon: '🔥', accentColor: 'emerald', crossLinks: ['c1', 'l2p1'], level: 2 },
    { id: 'l2b1', title: 'The Lever in Your Arm', subtitle: 'Why your bicep pulls eight times the load', discipline: 'biology', bigIdea: 1, bigIdeaTitle: 'Why Do Things Move?', icon: '💪', accentColor: 'rose', crossLinks: ['b1', 'l2p1'], level: 2 },
    { id: 'l2p33', title: 'The Energy Pyramid, In Numbers', subtitle: 'Putting arithmetic on the 10% rule', discipline: 'physics', bigIdea: 33, bigIdeaTitle: 'How Do Ecosystems Support Human Life?', icon: '🔺', accentColor: 'indigo', crossLinks: ['p33'], level: 2 },
    { id: 'l2c33', title: 'The Carbon Budget', subtitle: 'Reservoirs, fluxes, and net change', discipline: 'chemistry', bigIdea: 33, bigIdeaTitle: 'How Do Ecosystems Support Human Life?', icon: '⚖️', accentColor: 'emerald', crossLinks: ['c33', 'l2p33'], level: 2 },
    { id: 'l2b33', title: 'The Maths of a Backup Plan', subtitle: 'Putting a probability on biodiversity', discipline: 'biology', bigIdea: 33, bigIdeaTitle: 'How Do Ecosystems Support Human Life?', icon: '🎲', accentColor: 'rose', crossLinks: ['b33', 'l2p33'], level: 2 },
    { id: 'l2p49', title: 'The Energy Cost of Metal', subtitle: 'Why grade beats depth', discipline: 'physics', bigIdea: 49, bigIdeaTitle: 'How Do We Use Earth Resources Responsibly?', icon: '⚙️', accentColor: 'indigo', crossLinks: ['p49'], level: 2 },
];


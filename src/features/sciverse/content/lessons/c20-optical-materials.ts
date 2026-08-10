import { DialogNode } from '../../types';

/**
 * C20 - Optical Materials
 * Big Idea 20: "How Do Lenses Change What We See?"
 * Scenario: How material properties control light bending
 * Target Misconception: "All glass bends light the same way"
 */
export const getC20Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Welcome to the Optical Materials Lab! \ud83e\uddea\n\nYou already know from P20 that lenses bend light through **refraction**. But here\u2019s the question most people never think about: WHY does glass bend light at all? And why do some glasses bend it MORE than others?\n\nThe answer is in the **chemistry of the material itself**. \ud83d\udd2c\n\nEvery transparent material has a property called the **refractive index** (n) \u2014 a number that tells you how much it slows down and bends light compared to vacuum (n = 1.0).\n\n- Air: n = 1.0003 (barely bends)\n- Water: n = 1.33\n- Window glass: n = 1.52\n- Diamond: n = 2.42 (bends A LOT!) \ud83d\udc8e\n\n\ud83e\udd14 Why do you think diamond sparkles so much more than glass?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', refractiveIndex: 1.5 } },
        options: [
            { id: 'just_cut', label: "Diamonds are just cut into special shapes \u2014 the material doesn\u2019t matter much.", nextNodeId: 'misconception' },
            { id: 'high_n', label: "Diamond\u2019s high refractive index bends light much more, creating intense internal reflections and color splitting!", nextNodeId: 'correct', sentiment: 'positive' }
        ]
    },

    'misconception': {
        id: 'misconception',
        speaker: 'AI',
        content: "The cut helps, but the MATERIAL is what makes diamond truly special! \ud83d\udc8e\n\nDiamond\u2019s refractive index (n = 2.42) is nearly DOUBLE that of ordinary glass (n = 1.52). This extreme light-bending creates two spectacular effects:\n\n1. \u2728 **Total internal reflection**: When light tries to exit diamond at a shallow angle, it BOUNCES back inside instead of passing through. This traps light inside the gem, making it sparkle from many angles.\n2. \ud83c\udf08 **Dispersion**: Different colors of light bend by DIFFERENT amounts. Diamond has very high **dispersion**, splitting white light into vivid rainbow \u201cfire.\u201d\n\nA perfectly cut glass crystal won\u2019t sparkle like diamond because glass\u2019s lower refractive index can\u2019t trap and split light the same way!\n\n**Fun fact:** Cubic zirconia (CZ) was invented as a diamond substitute specifically because its refractive index (n = 2.16) is close to diamond\u2019s \u2014 close enough to fool most eyes but not a gemologist\u2019s refractometer! \ud83d\udd0d",
        options: [{ id: 'continue', label: "The refractive index of the material controls how strongly light bends \u2014 not just the shape!", nextNodeId: 'correct' }]
    },

    'correct': {
        id: 'correct',
        speaker: 'AI',
        content: "Exactly! \ud83c\udfaf The chemistry of optical materials determines their refractive index:\n\n- \ud83e\uddea **Atomic density**: More tightly packed atoms \u2192 light interacts more \u2192 higher n\n- \u26a1 **Electron cloud polarizability**: Heavier atoms with loosely held electrons bend light more\n- \ud83c\udf21\ufe0f **Crystal structure**: Ordered atomic arrangements (like diamond\u2019s carbon lattice) vs. amorphous glass\n\nIn the visual, you can see light rays bending as they pass through different materials. The **Refractive Index** slider lets you change the material\u2019s n value \u2014 watch how the bending angle changes!\n\nHigher n = MORE bending at each surface = shorter effective focal length = STRONGER lens! \ud83d\udd2e\n\n**Did you know?** Optical fiber cables use two types of glass with SLIGHTLY different refractive indices \u2014 the core (higher n) traps light through total internal reflection, carrying internet data at the speed of light across oceans! \ud83c\udf10\ud83d\udca1",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'refraction', showAngleLabels: true } },
        options: [
            { id: 'experiment', label: "Let me try different refractive indices!", nextNodeId: 'experiment_prompt' },
            { id: 'checkpoint', label: "Test me with a checkpoint!", nextNodeId: 'checkpoint' }
        ]
    },

    'experiment_prompt': {
        id: 'experiment_prompt',
        speaker: 'AI',
        content: "\ud83d\udd2c **Refractive Index Experiment:**\n\n1. Set n to **1.0** (vacuum/air) \u2192 light passes straight through with NO bending\n2. Set n to **1.33** (water) \u2192 slight bending visible\n3. Set n to **1.52** (glass) \u2192 moderate bending, clear focal point\n4. Set n to **2.42** (diamond) \u2192 extreme bending, very short focal length!\n\n**Prediction challenge:** At what refractive index does total internal reflection start happening at the edges? Watch the light rays carefully as you increase n! \ud83d\udc40",
        options: [{ id: 'to_checkpoint', label: "I see how refractive index controls bending \u2014 bring on the checkpoint!", nextNodeId: 'checkpoint' }]
    },

    'checkpoint': {
        id: 'checkpoint',
        speaker: 'AI',
        content: "\u23f8\ufe0f **Checkpoint \u2014 Think Like A Materials Scientist!**\n\nAn engineer needs to design a lens that\u2019s VERY thin but still bends light strongly (for a slim smartphone camera). \ud83d\udcf1\n\nShould they use low-n glass or high-n glass?\n\n\ud83d\udd17 **Link to P20:** Remember that focal length (bending strength) depends on BOTH lens curvature AND refractive index!",
        options: [
            { id: 'high_n', label: "High-n glass \u2014 it bends light more per unit thickness, so you need less curvature and can make the lens thinner!", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
            { id: 'low_n', label: "Low-n glass \u2014 it\u2019s lighter weight.", nextNodeId: 'checkpoint_wrong' }
        ]
    },

    'checkpoint_wrong': {
        id: 'checkpoint_wrong',
        speaker: 'AI',
        content: "Weight matters, but the OPTICS problem is thickness! \ud83d\udcf1\n\nTo get the same bending power with **low-n glass**, you\u2019d need MORE curvature (a fatter, more bulging lens). That makes the lens THICKER \u2014 exactly what you don\u2019t want in a slim phone.\n\n**High-n glass** bends light more at each surface, so you can achieve the same focal length with a FLATTER, THINNER lens. This is why smartphone camera modules use exotic **high-index glass** and even **crystal materials** (like sapphire covers).\n\n**Snell\u2019s Law** makes this precise: n\u2081 sin(\u03b8\u2081) = n\u2082 sin(\u03b8\u2082). Higher n\u2082 means more bending for the same angle of incidence! \ud83d\udcd0",
        options: [{ id: 'retry', label: "High-n glass bends more per unit thickness \u2014 allowing thinner lenses!", nextNodeId: 'checkpoint_correct' }]
    },

    'checkpoint_correct': {
        id: 'checkpoint_correct',
        speaker: 'AI',
        content: "\u2705 **Perfect!** You\u2019ve identified why materials science is CRITICAL to modern optics.\n\nSmartphone cameras use **aspherical high-index lens elements** \u2014 custom-shaped pieces of high-n glass that achieve extreme light bending in layers only 1-2 mm thick. A typical phone camera stacks 5-7 of these micro-lenses! \ud83d\udcf1\ud83d\udd2c\n\n**Fun fact:** Apple\u2019s iPhone camera lenses use a material called **crystalline sapphire** (n = 1.77) for the cover lens \u2014 it\u2019s the second hardest natural material after diamond! \ud83d\udc8e",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint', showThinLens: true } },
        options: [
            { id: 'discovery', label: "Show me the big discovery!", nextNodeId: 'discovery' },
            { id: 'summary_now', label: "Show summary table first.", nextNodeId: 'summary_table' }
        ]
    },

    'discovery': {
        id: 'discovery',
        speaker: 'AI',
        content: "\ud83c\udf89 **Discovery: Material Chemistry Controls Light!**\n\n| Material | Refractive Index (n) | Key Property |\n|----------|---------------------|-------------|\n| \ud83d\udca8 **Air** | 1.0003 | Baseline \u2014 almost no bending |\n| \ud83d\udca7 **Water** | 1.33 | Mild refraction (straw looks bent!) |\n| \ud83e\udea9 **Window glass** | 1.52 | Standard lenses and windows |\n| \ud83d\udc8e **Sapphire** | 1.77 | Scratch-resistant camera covers |\n| \ud83d\udc8e **Diamond** | 2.42 | Extreme brilliance and fire |\n| \ud83d\udd2c **Silicon** | 3.5 | Used in infrared optics |\n\n| Optical Effect | Cause |\n|---------------|-------|\n| \u2728 **Sparkle** | Total internal reflection from high n |\n| \ud83c\udf08 **Rainbow fire** | Dispersion \u2014 colors bend by different amounts |\n| \ud83d\udd2e **Focusing** | Curved high-n surface converges rays |\n| \ud83c\udf10 **Fiber optics** | Core/cladding n difference traps light |\n\n**Key Insight:** The **refractive index** is a material property determined by atomic structure and electron behavior. It controls every aspect of how light interacts with matter \u2014 from diamond sparkle to fiber-optic internet!",
        options: [
            { id: 'summary', label: "Show the lab data summary.", nextNodeId: 'summary_table' },
            { id: 'reflect', label: "Ask me reflection questions!", nextNodeId: 'reflection_questions' }
        ]
    },

    'summary_table': {
        id: 'summary_table',
        speaker: 'AI',
        content: "\ud83d\udcca **Lab Results Summary:**\n\n| **n Setting** | **Material Equivalent** | **Bending Observed** |\n|---|---|---|\n| n = 1.0 | Air/vacuum | No bending \u2014 straight rays |\n| n = 1.33 | Water | Slight deflection |\n| n = 1.52 | Glass | Clear bending, visible focal point |\n| n = 2.0 | High-index crystal | Strong bending, short focal length |\n| n = 2.42 | Diamond | Extreme refraction, total internal reflection at edges |\n\n| **Design Principle** | **What You Learned** |\n|---|---|\n| Higher n = thinner lens | Same bending power with less curvature |\n| Higher n = more dispersion | Colors split more \u2014 chromatic aberration risk |\n| n difference = trapping | Total internal reflection keeps light inside |",
        options: [
            { id: 'reflect_after_table', label: "Now ask me reflection questions!", nextNodeId: 'reflection_questions' },
            { id: 'to_complete', label: "Wrap up C20.", nextNodeId: 'complete' }
        ]
    },

    'reflection_questions': {
        id: 'reflection_questions',
        speaker: 'AI',
        content: "\ud83e\udde0 **Think Like A Materials Scientist**\n\n1. Why do expensive camera lenses use multiple elements of DIFFERENT glass types? \ud83d\udcf7\n2. How does **fiber optic** cable use refractive index differences to carry internet signals across the ocean? \ud83c\udf10\n3. Why does a **straw** look bent when you put it in a glass of water? \ud83e\udd64\n\n**Real-world connection:** The Laser Interferometer Gravitational-Wave Observatory (LIGO) uses mirrors so precisely polished that their surface roughness is less than 1/3000th of a **proton diameter**. The optical coatings on these mirrors have carefully controlled refractive indices that reflect 99.9999% of laser light! \ud83c\udf1f",
        options: [
            { id: 'reflect_good', label: "Different glass types have different dispersion \u2014 combining them cancels out chromatic aberration so all colors focus to the same point!", nextNodeId: 'reflection_feedback', sentiment: 'positive' },
            { id: 'reflect_bad', label: "More lens elements just means more magnification.", nextNodeId: 'reflection_retry' }
        ]
    },

    'reflection_retry': {
        id: 'reflection_retry',
        speaker: 'AI',
        content: "It\u2019s not about magnification \u2014 it\u2019s about COLOR CORRECTION! \ud83c\udf08\n\nSingle lenses have a problem called **chromatic aberration**: red light bends slightly LESS than blue light (different wavelengths have different n). This means red and blue focus at slightly different points, creating color fringes.\n\nSolution: pair a **crown glass** element (low dispersion) with a **flint glass** element (high dispersion). The two OPPOSITE dispersions cancel out, bringing all colors to the same focal point!\n\nThis is called an **achromatic doublet** \u2014 and it was invented in 1733 by Chester Moore Hall. Every quality camera lens uses this principle! \ud83d\udcf7",
        options: [{ id: 'retry_to_feedback', label: "Combining different glass types cancels chromatic aberration \u2014 achromatic design!", nextNodeId: 'reflection_feedback' }]
    },

    'reflection_feedback': {
        id: 'reflection_feedback',
        speaker: 'AI',
        content: "Outstanding materials science thinking! \ud83c\udf1f\n\nYou understand that optical design isn\u2019t just about SHAPE \u2014 it\u2019s about choosing the RIGHT materials with complementary properties. Modern lens design is a perfect fusion of **physics** (ray optics), **chemistry** (glass composition), and **engineering** (manufacturing precision)! \ud83d\udd2c",
        options: [{ id: 'finish', label: "Finish C20!", nextNodeId: 'complete' }]
    },

    'complete': {
        id: 'complete',
        speaker: 'AI',
        content: "\ud83d\udd17 **Cross-Links**\n- In **P20**, you learned how **lens shape** (curvature, focal length) controls image formation \u2014 now you know the MATERIAL matters just as much! \ud83d\udd2e\n- In **B20**, you\u2019ll see how the **human eye** uses a flexible biological lens with variable refractive properties to focus! \ud83d\udc41\ufe0f\n\n\u2705 **Lesson C20 Complete!**",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});

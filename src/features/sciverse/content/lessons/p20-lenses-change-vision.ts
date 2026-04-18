import { DialogNode } from '../../types';

/**
 * P20 - Lenses Change Vision
 * Big Idea 20: "How Do Lenses Change What We See?"
 * Scenario: How lenses bend light to form images
 * Target Misconception: "Lenses just magnify things"
 */
export const getP20Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Welcome to the Optics Lab! \ud83d\udd2d\n\nLenses are EVERYWHERE: your eyes, cameras, microscopes, telescopes, eyeglasses, projectors, and even the water droplets on a spider web! \ud83d\udd77\ufe0f\n\nBut here\u2019s a common misunderstanding \u2014 most people think lenses just \u201cmake things bigger.\u201d In reality, lenses do something much more fundamental: they **bend light** (a process called **refraction**) to change where an **image** forms.\n\nA **convex lens** (thick in the middle, thin at edges) bends light INWARD toward a single point called the **focal point**. \ud83d\udd06\n\nIn the visual, you can see light rays passing through a lens and converging at the focal point. Try the **Focal Length** slider!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', focalLength: 100 } },
        options: [
            { id: 'just_mag', label: "Isn\u2019t refraction just a fancy word for magnification?", nextNodeId: 'misconception' },
            { id: 'refraction', label: "Refraction bends light at different angles depending on lens shape \u2014 magnification is just one possible result!", nextNodeId: 'correct', sentiment: 'positive' }
        ]
    },

    'misconception': {
        id: 'misconception',
        speaker: 'AI',
        content: "Not quite! **Magnification** is just ONE thing refraction can do. \ud83d\udd0d\n\n**Refraction** = light changing direction when it enters a new material (like glass). A convex lens refracts light inward, and depending on where the object is relative to the **focal point**, you get DIFFERENT results:\n\n- \ud83d\udd0d **Object far away** \u2192 lens creates a SMALLER, inverted (upside-down), real image\n- \ud83d\udd2d **Object at 2F** \u2192 same-size, inverted, real image\n- \ud83d\udd0e **Object close (inside F)** \u2192 LARGER, upright, virtual image (this is magnification!)\n\nSo magnification is just ONE special case of what lenses do. The same lens can shrink, flip, or enlarge an image depending on object distance!\n\n**Fun fact:** Your phone camera uses a lens smaller than a pea to focus light onto a sensor with 12+ million pixels! \ud83d\udcf1",
        options: [{ id: 'continue', label: "Refraction is the fundamental process, magnification is just one outcome!", nextNodeId: 'correct' }]
    },

    'correct': {
        id: 'correct',
        speaker: 'AI',
        content: "Exactly! \ud83c\udfaf Here\u2019s the core optics:\n\n- \ud83d\udd06 **Refraction**: Light bends when passing from air into glass (and vice versa)\n- \ud83d\udd2e **Convex lens**: Converges light rays to a **focal point** (F)\n- \ud83d\udd39 **Focal length** (f): Distance from lens center to focal point \u2014 shorter = stronger bending\n- \ud83d\uddbc\ufe0f **Real image**: Forms where light actually converges (can be projected onto a screen)\n- \ud83d\udc7b **Virtual image**: Forms where light APPEARS to come from (can\u2019t be projected, but your brain sees it)\n\nUse the **Focal Length** slider to change the lens strength. Shorter focal length = MORE bending = stronger lens! Watch how the focal point moves closer to the lens. \ud83d\udd2c\n\n**Did you know?** The Hubble Space Telescope\u2019s primary mirror has a focal length of 57.6 meters \u2014 it bends light so precisely it can resolve objects 0.05 arcseconds apart (that\u2019s like reading a newspaper from 1.6 km away)! \ud83c\udf1f",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'refraction', showRays: true } },
        options: [
            { id: 'experiment', label: "Let me play with the focal length slider!", nextNodeId: 'experiment_prompt' },
            { id: 'checkpoint', label: "Test me with a checkpoint!", nextNodeId: 'checkpoint' }
        ]
    },

    'experiment_prompt': {
        id: 'experiment_prompt',
        speaker: 'AI',
        content: "\ud83d\udd2c **Lens Optics Experiment:**\n\n1. Set **Focal Length** SHORT \u2192 light bends sharply, focal point is close to the lens (strong lens)\n2. Set **Focal Length** LONG \u2192 light bends gently, focal point moves far from the lens (weak lens)\n3. Watch the **light rays** converge \u2014 they all meet at the focal point!\n4. Notice how the **image** changes: position, size, and orientation all shift\n\n**Prediction challenge:** What focal length would you need to focus sunlight into the smallest, hottest point? (Hint: solar concentrators use this principle!) \u2600\ufe0f\ud83d\udd25",
        options: [{ id: 'to_checkpoint', label: "I see how focal length controls bending \u2014 bring on the checkpoint!", nextNodeId: 'checkpoint' }]
    },

    'checkpoint': {
        id: 'checkpoint',
        speaker: 'AI',
        content: "\u23f8\ufe0f **Checkpoint \u2014 Think Like An Optical Engineer!**\n\nYou hold a magnifying glass over a piece of paper on a sunny day and move it up and down until you see a tiny bright dot. \u2600\ufe0f\ud83d\udd25\n\nWhat is that bright dot, and why does it get hot?\n\n\ud83d\udd17 **Link to C20:** The glass material\u2019s **refractive index** determines how strongly it bends light!",
        options: [
            { id: 'focal_point', label: "The bright dot is the focal point \u2014 ALL the sunlight entering the lens is concentrated into one tiny area, concentrating energy!", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
            { id: 'reflection', label: "The lens reflects sunlight into a single beam like a mirror.", nextNodeId: 'checkpoint_wrong' }
        ]
    },

    'checkpoint_wrong': {
        id: 'checkpoint_wrong',
        speaker: 'AI',
        content: "Close, but lenses don\u2019t REFLECT \u2014 they REFRACT! \ud83d\udd06\n\n**Mirrors** reflect light (bounce it off a surface). **Lenses** refract light (bend it as it passes THROUGH the material).\n\nHere\u2019s what happens with the magnifying glass:\n1. \u2600\ufe0f Sunlight hits the entire lens surface (collecting ALL that energy)\n2. \ud83d\udd2e The convex lens refracts (bends) all those rays toward the **focal point**\n3. \ud83d\udd25 All the energy from the full lens area is concentrated into a tiny dot\n4. \ud83c\udf21\ufe0f The energy density at that dot is ENORMOUS \u2014 hot enough to ignite paper!\n\n**Energy concentration** = (Lens area) \u00f7 (Focal point area). A 10 cm lens focusing to a 1 mm dot concentrate energy by a factor of ~10,000! \ud83d\udca5",
        options: [{ id: 'retry', label: "Refraction through a convex lens concentrates all incoming light energy at the focal point!", nextNodeId: 'checkpoint_correct' }]
    },

    'checkpoint_correct': {
        id: 'checkpoint_correct',
        speaker: 'AI',
        content: "\u2705 **Exactly!** You\u2019ve identified the core principle behind **solar concentrators**, **laser focusing**, and even **fiber optic** communications.\n\nThe magnifying glass collects energy from its entire surface area and concentrates it to a point. The shorter the **focal length**, the tighter the focus and the higher the energy density.\n\n**Fun fact:** The world\u2019s largest solar thermal plant (Ivanpah, California) uses 173,500 mirrors focusing sunlight onto three towers, generating enough electricity to power 140,000 homes! \u2600\ufe0f\ud83c\udfe0",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint', showFocalConcentration: true } },
        options: [
            { id: 'discovery', label: "Show me the big discovery!", nextNodeId: 'discovery' },
            { id: 'summary_now', label: "Show summary table first.", nextNodeId: 'summary_table' }
        ]
    },

    'discovery': {
        id: 'discovery',
        speaker: 'AI',
        content: "\ud83c\udf89 **Discovery: Light Bending Powers Our Technology!**\n\n| Concept | What it means |\n|---------|---------------|\n| \ud83d\udd06 **Refraction** | Light bends when entering a different material |\n| \ud83d\udd2e **Convex lens** | Converges light to a focal point |\n| \ud83d\udd39 **Focal length** | Distance to focal point \u2014 shorter = stronger |\n| \ud83d\uddbc\ufe0f **Real image** | Light actually converges (projectable) |\n| \ud83d\udc7b **Virtual image** | Light appears to diverge from a point (not projectable) |\n| \ud83d\udd25 **Energy concentration** | Lens collects light over area, focuses to a point |\n\n| Application | How Lenses Are Used |\n|------------|-------------------|\n| \ud83d\udc41\ufe0f **Human eye** | Cornea + lens focus light onto retina |\n| \ud83d\udcf1 **Camera** | Lens focuses scene onto sensor/film |\n| \ud83d\udd2c **Microscope** | Two lenses compound magnification |\n| \ud83d\udd2d **Telescope** | Large lens collects faint light from space |\n| \ud83d\udc53 **Eyeglasses** | Correct focal length for the eye |\n\n**Key Insight:** Lenses don\u2019t just magnify \u2014 they are **light-steering tools** that form images by controlling where rays converge. The physics of refraction underlies nearly ALL optical technology!",
        options: [
            { id: 'summary', label: "Show the lab data summary.", nextNodeId: 'summary_table' },
            { id: 'reflect', label: "Ask me reflection questions!", nextNodeId: 'reflection_questions' }
        ]
    },

    'summary_table': {
        id: 'summary_table',
        speaker: 'AI',
        content: "\ud83d\udcca **Lab Results Summary:**\n\n| **Focal Length** | **Bending Strength** | **What You Observed** |\n|---|---|---|\n| Short (e.g. 50mm) | \u2b06\ufe0f Strong refraction | Focal point close to lens, tight convergence |\n| Medium (e.g. 100mm) | \u2194\ufe0f Moderate | Balanced focal distance |\n| Long (e.g. 200mm) | \u2b07\ufe0f Gentle refraction | Focal point far from lens, wide convergence |\n\n| **Image Property** | **With Convex Lens** |\n|---|---|\n| \ud83d\uddbc\ufe0f Position | Depends on object distance from F |\n| \ud83d\udccf Size | Can be larger, smaller, or same size |\n| \ud83d\udd04 Orientation | Real images are inverted; virtual images are upright |\n| \ud83d\udd25 Energy density | Shorter focal length = higher concentration |",
        options: [
            { id: 'reflect_after_table', label: "Now ask me reflection questions!", nextNodeId: 'reflection_questions' },
            { id: 'to_complete', label: "Wrap up P20.", nextNodeId: 'complete' }
        ]
    },

    'reflection_questions': {
        id: 'reflection_questions',
        speaker: 'AI',
        content: "\ud83e\udde0 **Think Like An Optical Engineer**\n\n1. Why do cameras with BIGGER lenses take better photos in low light? \ud83d\udcf7\n2. Why do nearsighted people need **concave** lenses (thinner in the middle) instead of convex?\n3. How does a **projector** use a lens to create a huge image on a wall from a tiny LCD screen?\n\n**Real-world connection:** The James Webb Space Telescope uses a 6.5-meter mirror (21 feet!) to collect light from galaxies that are 13.5 BILLION light-years away. Its optics can detect the heat signature of a bumblebee on the Moon! \ud83d\udc1d\ud83c\udf19",
        options: [
            { id: 'reflect_good', label: "Bigger lenses collect more light photons over a larger area, so they can capture dimmer scenes!", nextNodeId: 'reflection_feedback', sentiment: 'positive' },
            { id: 'reflect_bad', label: "Bigger lenses just zoom in more.", nextNodeId: 'reflection_retry' }
        ]
    },

    'reflection_retry': {
        id: 'reflection_retry',
        speaker: 'AI',
        content: "Zoom and light-gathering are actually DIFFERENT properties! \ud83d\udcf7\n\n- **Zoom** (magnification) depends on **focal length** \u2014 longer = more zoom\n- **Light gathering** depends on **lens diameter** (aperture) \u2014 bigger = more photons collected\n\nA large lens acts like a bigger bucket for catching rain \u2014 it collects more **photons** from dim scenes. That\u2019s why professional cameras have those huge, expensive lenses and why astronomical telescopes are measured by mirror DIAMETER.\n\n**The f-number** (like f/1.4, f/2.8) measures the ratio of focal length to aperture diameter. Lower f-number = bigger opening relative to focal length = better low-light performance! \ud83c\udf03",
        options: [{ id: 'retry_to_feedback', label: "Lens diameter determines light-gathering power, focal length determines magnification!", nextNodeId: 'reflection_feedback' }]
    },

    'reflection_feedback': {
        id: 'reflection_feedback',
        speaker: 'AI',
        content: "Excellent optical reasoning! \ud83c\udf1f\n\nYou\u2019ve connected **lens geometry** (diameter, focal length, curvature) to **real-world performance** (light gathering, magnification, image formation). This is exactly how optical engineers design everything from smartphone cameras to space telescopes! \ud83d\udd2d\ud83c\udf0c",
        options: [{ id: 'finish', label: "Finish P20!", nextNodeId: 'complete' }]
    },

    'complete': {
        id: 'complete',
        speaker: 'AI',
        content: "\ud83d\udd17 **Cross-Links**\n- In **C20**, you\u2019ll explore the **material science** behind lenses \u2014 how different glasses and crystals have different **refractive indices** that control light bending! \ud83e\uddea\n- In **B20**, you\u2019ll discover how the **human eye** uses a flexible lens and ciliary muscles to focus \u2014 and what goes wrong in nearsightedness and farsightedness! \ud83d\udc41\ufe0f\n\n\u2705 **Lesson P20 Complete!**",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});

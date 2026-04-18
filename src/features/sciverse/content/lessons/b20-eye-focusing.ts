import { DialogNode } from '../../types';

/**
 * B20 - Eye Focusing
 * Big Idea 20: "How Do Lenses Change What We See?"
 * Scenario: How the eye focuses using accommodation
 * Target Misconception: "Eyes work like cameras with fixed lenses"
 */
export const getB20Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Welcome to the Eye Anatomy Lab! \ud83d\udc41\ufe0f\n\nYour eyes are performing an incredible feat RIGHT NOW as you read this. They\u2019re constantly adjusting focus \u2014 from the screen in front of you to a clock on the wall to a bird outside the window \u2014 all in milliseconds.\n\nCameras need MOTORS to move their lenses for autofocus. But your eye uses a completely different trick: instead of moving the lens, it **changes the lens\u2019s SHAPE**! \ud83d\ude32\n\nThis process is called **accommodation** \u2014 tiny **ciliary muscles** squeeze or relax the flexible **crystalline lens** to change its curvature (and therefore its focal length).\n\n\ud83e\udd14 What happens when you try to read a book that\u2019s too close to your face?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', accommodation: 50 } },
        options: [
            { id: 'just_blurry', label: "It\u2019s just blurry \u2014 your eyes aren\u2019t strong enough to see that close.", nextNodeId: 'misconception' },
            { id: 'accommodation', label: "The ciliary muscles can\u2019t squeeze the lens enough to focus at that short distance \u2014 the focal length can\u2019t get short enough!", nextNodeId: 'correct', sentiment: 'positive' }
        ]
    },

    'misconception': {
        id: 'misconception',
        speaker: 'AI',
        content: "\u201cNot strong enough\u201d is close, but the real explanation is more precise! \ud83d\udd2c\n\nWhen you look at something CLOSE, your **ciliary muscles** contract and squeeze the **crystalline lens** into a rounder shape. Rounder = more curved = shorter **focal length** = focuses closer objects.\n\nBut there\u2019s a LIMIT! The lens can only get so round. The closest distance you can focus is called the **near point** (about 25 cm for young adults).\n\nHere\u2019s the amazing part: your near point changes with age! \ud83d\udcc5\n- Age 10: ~7 cm (can read VERY close)\n- Age 25: ~25 cm\n- Age 45: ~50 cm\n- Age 60: ~100 cm (need reading glasses!)\n\nThis happens because the lens gets STIFFER with age, a condition called **presbyopia** (\u201cold eye\u201d in Greek). The ciliary muscles work fine, but the lens won\u2019t flex anymore!\n\n**Fun fact:** By age 70, the crystalline lens has 3\u00d7 more protein cross-links than at age 20 \u2014 it literally hardens like old rubber! \ud83e\uddf1",
        options: [{ id: 'continue', label: "The lens has a physical limit on how round it can get \u2014 that\u2019s the near point!", nextNodeId: 'correct' }]
    },

    'correct': {
        id: 'correct',
        speaker: 'AI',
        content: "Exactly! \ud83c\udfaf Here\u2019s how eye focusing works:\n\n- \ud83d\udc41\ufe0f **Cornea**: Does ~70% of the light bending (fixed shape, n = 1.376)\n- \ud83d\udd2e **Crystalline lens**: Does the remaining ~30% and is ADJUSTABLE\n- \ud83d\udcaa **Ciliary muscles**: Ring of muscle that controls lens shape\n  - \ud83d\udd34 Contract \u2192 lens gets ROUNDER \u2192 shorter focal length \u2192 focus NEAR\n  - \ud83d\udd35 Relax \u2192 lens gets FLATTER \u2192 longer focal length \u2192 focus FAR\n- \ud83c\udfaf **Retina**: The \u201cscreen\u201d at the back where the focused image lands\n\nIn the visual, you can see the eye cross-section with light rays focusing onto the retina. The **Accommodation** slider changes how much the ciliary muscles squeeze the lens!\n\n**Did you know?** The human eye can distinguish about 10 million different colors and detect a single photon of light in complete darkness! It\u2019s the most sophisticated optical instrument ever evolved. \ud83c\udf1f",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'accommodation', showLensChange: true } },
        options: [
            { id: 'experiment', label: "Let me adjust the accommodation slider!", nextNodeId: 'experiment_prompt' },
            { id: 'checkpoint', label: "Test me with a checkpoint!", nextNodeId: 'checkpoint' }
        ]
    },

    'experiment_prompt': {
        id: 'experiment_prompt',
        speaker: 'AI',
        content: "\ud83d\udd2c **Eye Accommodation Experiment:**\n\n1. Set **Accommodation** LOW \u2192 lens is flat, focused on distant objects \ud83c\udfd4\ufe0f\n2. Set **Accommodation** HIGH \u2192 lens bulges round, focused on near objects \ud83d\udcd6\n3. Watch the **focal point** move \u2014 it should always land ON the retina for clear vision\n4. Notice what happens at MAXIMUM accommodation \u2014 this is the near point limit!\n\n**Try this right now:** Hold your finger at arm\u2019s length, then slowly bring it toward your nose. Notice the exact distance where it goes blurry! That\u2019s YOUR near point. \ud83d\udc46\ud83d\udc41\ufe0f",
        options: [{ id: 'to_checkpoint', label: "I see how the lens shape controls focus distance \u2014 bring on the checkpoint!", nextNodeId: 'checkpoint' }]
    },

    'checkpoint': {
        id: 'checkpoint',
        speaker: 'AI',
        content: "\u23f8\ufe0f **Checkpoint \u2014 Think Like An Ophthalmologist!**\n\nA child is **nearsighted** (myopic) \u2014 they can see close objects clearly but distant objects are blurry. \ud83d\udc53\n\nWhat\u2019s happening inside their eye, and what type of lens corrects it?\n\n\ud83d\udd17 **Link to P20:** Remember the difference between convex (converging) and concave (diverging) lenses!",
        options: [
            { id: 'eyeball_long', label: "Their eyeball is too LONG, so distant light focuses in FRONT of the retina. A concave (diverging) lens spreads the light slightly before it enters, moving the focal point back onto the retina!", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
            { id: 'weak_muscles', label: "Their ciliary muscles are too weak to flatten the lens for distance vision.", nextNodeId: 'checkpoint_wrong' }
        ]
    },

    'checkpoint_wrong': {
        id: 'checkpoint_wrong',
        speaker: 'AI',
        content: "Good thinking about muscles, but myopia is actually a STRUCTURAL problem! \ud83d\udc41\ufe0f\n\nIn **nearsightedness (myopia)**, the eyeball is physically too LONG from front to back. Even when ciliary muscles fully relax and the lens is at its flattest, the focal point still falls SHORT of the retina.\n\n\ud83d\udd34 **Problem**: Light from distant objects converges in FRONT of the retina \u2192 blurry\n\ud83d\udfe2 **Solution**: A **concave lens** (thinner in middle) DIVERGES light slightly before it enters the eye. This pushes the focal point back onto the retina!\n\nThe OPPOSITE condition is **farsightedness (hyperopia)**: eyeball too SHORT \u2192 light focuses BEHIND the retina \u2192 corrected with a **convex lens**.\n\n**Staggering stat:** Myopia rates have DOUBLED worldwide since 1990. In South Korea, 97% of 19-year-olds are now nearsighted! Researchers blame increased screen time and less outdoor light exposure. \ud83d\udcf1\u2192\ud83d\udc53",
        options: [{ id: 'retry', label: "Myopia = long eyeball = focal point too far forward. Concave lens corrects it!", nextNodeId: 'checkpoint_correct' }]
    },

    'checkpoint_correct': {
        id: 'checkpoint_correct',
        speaker: 'AI',
        content: "\u2705 **Exactly!** You\u2019ve diagnosed myopia like a real ophthalmologist.\n\n| Condition | Eye Shape | Focus Error | Correction |\n|-----------|----------|-------------|------------|\n| \ud83d\udd34 **Myopia** (nearsighted) | Too long | In front of retina | Concave (\u2013) lens |\n| \ud83d\udd35 **Hyperopia** (farsighted) | Too short | Behind retina | Convex (+) lens |\n| \ud83d\udfe1 **Presbyopia** (age-related) | Stiff lens | Can\u2019t focus near | Reading glasses (+) |\n| \ud83d\udfe2 **Astigmatism** | Uneven cornea | Blurry at all distances | Cylindrical lens |\n\n**Fun fact:** LASIK surgery reshapes the cornea with a laser to permanently change its curvature \u2014 essentially carving a lens INTO your eye! Over 10 million LASIK procedures have been performed in the U.S. alone. \ud83d\udca5\ud83d\udc41\ufe0f",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint', showCorrection: true } },
        options: [
            { id: 'discovery', label: "Show me the big discovery!", nextNodeId: 'discovery' },
            { id: 'summary_now', label: "Show summary table first.", nextNodeId: 'summary_table' }
        ]
    },

    'discovery': {
        id: 'discovery',
        speaker: 'AI',
        content: "\ud83c\udf89 **Discovery: Your Eyes are Self-Adjusting Optical Instruments!**\n\n| Eye Component | Optical Role |\n|--------------|-------------|\n| \ud83d\udc41\ufe0f **Cornea** | Does 70% of light bending (fixed, n = 1.376) |\n| \ud83d\udd2e **Crystalline lens** | Adjustable 30% \u2014 changes shape for focus |\n| \ud83d\udcaa **Ciliary muscles** | Squeeze lens rounder (near) or let it flatten (far) |\n| \ud83c\udfaf **Retina** | Light-sensitive screen with 120M rods + 6M cones |\n| \ud83d\udca7 **Aqueous/vitreous humor** | Clear fluids (n \u2248 1.34) fill the eye chambers |\n\n| Vision Problem | Cause | Fix |\n|---------------|-------|-----|\n| \ud83d\udd34 **Myopia** | Eyeball too long | Concave lens |\n| \ud83d\udd35 **Hyperopia** | Eyeball too short | Convex lens |\n| \ud83d\udfe1 **Presbyopia** | Lens stiffens with age | Reading glasses |\n| \ud83d\udfe2 **Astigmatism** | Uneven cornea curvature | Cylindrical lens |\n\n**Key Insight:** The human eye is a biological optical system that combines a FIXED high-power lens (cornea) with an ADJUSTABLE fine-tuning lens (crystalline lens). When the system\u2019s geometry is slightly off, corrective lenses restore perfect focus!",
        options: [
            { id: 'summary', label: "Show the lab data summary.", nextNodeId: 'summary_table' },
            { id: 'reflect', label: "Ask me reflection questions!", nextNodeId: 'reflection_questions' }
        ]
    },

    'summary_table': {
        id: 'summary_table',
        speaker: 'AI',
        content: "\ud83d\udcca **Lab Results Summary:**\n\n| **Accommodation Level** | **Lens Shape** | **Focus Distance** | **What You Observed** |\n|---|---|---|---|\n| \ud83d\udd35 Low (relaxed) | Flat | Far (\u221e to 6m) | Light converged far back on retina |\n| \ud83d\udfe1 Medium | Moderate curve | Mid (1-6m) | Focal point shifted forward |\n| \ud83d\udd34 High (contracted) | Round/bulging | Near (25cm-1m) | Tight convergence on retina |\n| \u26a0\ufe0f Maximum | Roundest possible | Near point limit | Lens can\u2019t curve more = blur |\n\n| **Age** | **Near Point** | **Accommodation Range** |\n|---|---|---|\n| 10 years | ~7 cm | Very wide |\n| 25 years | ~25 cm | Normal |\n| 45 years | ~50 cm | Narrowing (presbyopia begins) |\n| 60 years | ~100 cm | Very narrow (reading glasses needed) |",
        options: [
            { id: 'reflect_after_table', label: "Now ask me reflection questions!", nextNodeId: 'reflection_questions' },
            { id: 'to_complete', label: "Wrap up B20.", nextNodeId: 'complete' }
        ]
    },

    'reflection_questions': {
        id: 'reflection_questions',
        speaker: 'AI',
        content: "\ud83e\udde0 **Think Like An Ophthalmologist**\n\n1. Why do people who spend all day looking at screens often develop \u201c**digital eye strain**\u201d? What\u2019s happening to their ciliary muscles? \ud83d\udcf1\n2. Why does looking at **green trees in the distance** help relax tired eyes? \ud83c\udf33\n3. Could a **bionic eye** implant theoretically provide better-than-normal vision? What would it need?\n\n**Real-world connection:** Researchers at Stanford are developing \u201c**autofocal glasses**\u201d that use eye-tracking cameras and electrically adjustable liquid lenses to automatically change focus based on where you\u2019re looking. They mimic natural accommodation but never get \u201cold\u201d! \ud83e\udd13\ud83d\udca1",
        options: [
            { id: 'reflect_good', label: "Staring at screens keeps ciliary muscles contracted for hours \u2014 they fatigue like any overworked muscle. Distant viewing lets them relax!", nextNodeId: 'reflection_feedback', sentiment: 'positive' },
            { id: 'reflect_bad', label: "Screen light damages the retina directly.", nextNodeId: 'reflection_retry' }
        ]
    },

    'reflection_retry': {
        id: 'reflection_retry',
        speaker: 'AI',
        content: "Blue light CAN affect sleep, but eye strain is actually a MUSCLE problem! \ud83d\udcaa\n\nWhen you stare at a screen 40-60 cm away for hours:\n1. **Ciliary muscles** stay CONTRACTED to maintain near focus\n2. Like any muscle held in one position, they fatigue and cramp\n3. When you finally look up, the muscles struggle to relax \u2192 blurry distance vision temporarily\n\nThe **20-20-20 rule** helps: every 20 minutes, look at something 20 feet away for 20 seconds. This lets ciliary muscles relax! \ud83d\udc41\ufe0f\n\nLooking at distant green trees is ideal because:\n- Distance viewing relaxes ciliary muscles \ud83c\udf33\n- Green light is easiest for the eye to focus (lowest chromatic aberration) \ud83d\udfe2\n- Natural scenes promote blink rate (screens reduce blinking by 60%!) \ud83d\ude2e",
        options: [{ id: 'retry_to_feedback', label: "Screen strain is ciliary muscle fatigue from sustained near focus!", nextNodeId: 'reflection_feedback' }]
    },

    'reflection_feedback': {
        id: 'reflection_feedback',
        speaker: 'AI',
        content: "Brilliant biomedical reasoning! \ud83c\udf1f\n\nYou\u2019ve connected **optics** (focal length, accommodation), **biology** (ciliary muscle physiology), and **real-world health** (screen habits, vision correction). This interdisciplinary thinking is exactly what ophthalmologists, optometrists, and biomedical engineers use every day! \ud83d\udc41\ufe0f\ud83d\udd2c\n\n**Key takeaway:** Your eyes are incredible optical instruments \u2014 understanding how they work helps you take better care of them!",
        options: [{ id: 'finish', label: "Finish B20!", nextNodeId: 'complete' }]
    },

    'complete': {
        id: 'complete',
        speaker: 'AI',
        content: "\ud83d\udd17 **Cross-Links**\n- In **P20**, you learned how **lenses bend light** through refraction and focal length \u2014 your eye uses these exact same physics! \ud83d\udd2e\n- In **C20**, you explored how **material refractive index** controls bending strength \u2014 your cornea and lens have carefully tuned refractive indices! \ud83e\uddea\n\n\u2705 **Lesson B20 Complete!**",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});

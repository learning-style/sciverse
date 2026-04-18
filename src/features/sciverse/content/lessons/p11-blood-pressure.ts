import { DialogNode } from '../../types';

/**
 * P11 — The Pumping Heart
 * Big Idea 11: "How Do We Stay Healthy?"
 * Scenario: Blood pressure, heart rate, cardiovascular health
 * Target Misconception: "Blood pressure is just about stress/emotions"
 */
export const getP11Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Welcome to the Cardiology Lab! 🫀\n\nWatch the heart beating in the simulation. Every time it squeezes, it pushes blood through your arteries.\n\nHere's a question: what do you think blood pressure actually measures?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', heartRate: 70, systolic: 120, diastolic: 80 } },
        options: [
            { id: 'stress', label: "How stressed or worried you are.", nextNodeId: 'misconception_stress', sentiment: 'negative' },
            { id: 'force', label: "The force blood pushes on artery walls.", nextNodeId: 'correct_intro', sentiment: 'positive' },
            { id: 'speed', label: "How fast the blood moves.", nextNodeId: 'partial_speed', sentiment: 'neutral' }
        ]
    },

    'misconception_stress': {
        id: 'misconception_stress',
        speaker: 'AI',
        content: "Stress CAN temporarily raise blood pressure — but that's not what blood pressure *is*. 🤔\n\nEven when you're perfectly calm, you still have blood pressure. Without it, blood couldn't reach your brain!\n\nThink of it like water in a hose. What keeps water moving through the hose?",
        options: [
            { id: 'pump', label: "The pump forcing water through.", nextNodeId: 'correct_intro' },
            { id: 'pressure_walls', label: "Pressure from the walls squeezing.", nextNodeId: 'correct_intro' }
        ]
    },

    'partial_speed': {
        id: 'partial_speed',
        speaker: 'AI',
        content: "Blood speed (flow rate) is related, but blood pressure is specifically about **force per unit area** — how hard blood pushes on the walls of arteries. 🩸\n\nImagine you're pressing your hand on a table. Pressure = force ÷ area. The harder you push on the same area, the higher the pressure.",
        options: [
            { id: 'got_it', label: "So blood pressure = blood pushing on artery walls!", nextNodeId: 'correct_intro' }
        ]
    },

    'correct_intro': {
        id: 'correct_intro',
        speaker: 'AI',
        content: "Exactly! **Blood pressure = the force blood exerts on artery walls.**\n\nYou'll see two numbers, like 120/80:\n- **120 = Systolic**: peak pressure when the heart squeezes\n- **80 = Diastolic**: resting pressure between beats\n\nWatch the gauge in the sim — the needle bounces between these two values with each heartbeat! 💓",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'show_gauge', showLabels: true } },
        options: [
            { id: 'what_normal', label: "What counts as 'normal' blood pressure?", nextNodeId: 'normal_range' }
        ]
    },

    'normal_range': {
        id: 'normal_range',
        speaker: 'AI',
        content: "Great question! Doctors classify blood pressure like this:\n\n🟢 **Normal**: below 120/80\n🟡 **Elevated**: 120-129 / below 80\n🔴 **High (Stage 1)**: 130-139 / 80-89\n🚨 **Crisis**: above 180 / above 120\n\nTry the **Heart Rate slider** — see how faster pumping changes the pressure reading!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'interactive', showRanges: true } },
        options: [
            { id: 'tried', label: "I increased rate — pressure went up!", nextNodeId: 'explain_rate' },
            { id: 'tried_low', label: "I lowered rate — pressure dropped.", nextNodeId: 'explain_rate' }
        ]
    },

    'explain_rate': {
        id: 'explain_rate',
        speaker: 'AI',
        content: "Yes! Heart rate directly affects blood pressure. More beats per minute = more pushes per minute = higher average pressure.\n\nThis is why exercise temporarily raises your blood pressure — your muscles demand more oxygen, so your heart pumps harder and faster. 🏃\n\nBut what do you think happens to blood pressure if arteries get narrower with age?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'artery_demo' } },
        options: [
            { id: 'goes_up', label: "Pressure would increase — same flow, smaller opening.", nextNodeId: 'artery_correct' },
            { id: 'goes_down', label: "Pressure would decrease — less room means less blood.", nextNodeId: 'artery_hint' }
        ]
    },

    'artery_hint': {
        id: 'artery_hint',
        speaker: 'AI',
        content: "Think about a garden hose — if you put your thumb over the end to narrow it, does the water slow down or spray harder? 💦\n\nNarrowing increases resistance, so the heart must push harder to move the same blood, raising pressure.",
        options: [
            { id: 'thumb_hose', label: "Ah! Narrower → more pressure!", nextNodeId: 'artery_correct' }
        ]
    },

    'artery_correct': {
        id: 'artery_correct',
        speaker: 'AI',
        content: "Exactly right! This is why **atherosclerosis** (plaque buildup in arteries) is dangerous — it narrows the passages, forcing the heart to work harder. Over time, this strains the heart. 🫀\n\nNow try changing the **artery width** in the sim and watch the pressure spike!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'show_plaque', showArteryControl: true } },
        options: [
            { id: 'explored', label: "I see the pressure spikes with narrow arteries!", nextNodeId: 'summary' }
        ]
    },

    'summary': {
        id: 'summary',
        speaker: 'AI',
        content: "🌟 **Key Takeaways:**\n\n✅ Blood pressure = force on artery walls (not just stress)\n✅ Systolic/diastolic = peak/resting pressure\n✅ Heart rate and artery width both affect pressure\n✅ High BP = heart overworked → heart disease risk\n\n**Physics connection:** Pressure = Force ÷ Area — the same formula used for any fluid in a pipe! Your body IS a physics system. 🔬",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: [
            { id: 'done', label: "Amazing! I understand blood pressure now.", nextNodeId: 'done' }
        ]
    },

    'done': {
        id: 'done',
        speaker: 'AI',
        content: "Outstanding work! You've just learned what cardiologists spend years studying! 🏆\n\nNext up: explore **C11 (Acids & Bases)** to see how body chemistry maintains healthy pH levels, or **B11 (Immune System)** to meet your body's defense army!",
        options: []
    }
});

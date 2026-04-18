import { DialogNode } from '../../types';

/**
 * C21 — Carbon Cycle Chemistry
 * Big Idea 21: "How Do Cycles Keep Systems Alive?"
 */
export const getC21Script = (): Record<string, DialogNode> => ({
    root: {
        id: 'root',
        speaker: 'AI',
        content: 'Carbon atoms move between air, water, rocks, and life, but they never disappear — they just change form and location.\n\nThe visual shows **four reservoirs** constantly exchanging carbon:\n- **Atmosphere** — CO2 gas in the air\n- **Plants/Biomass** — carbon locked in living tissue\n- **Soil + Fuel Carbon** — ancient carbon in soil, rock, and fossil fuels\n- **Ocean** — dissolved carbon in seawater\n\nWhat keeps this exchange going across all four reservoirs?',
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', atmosphericCO2: 45 } },
        options: [
            { id: 'reservoirs', label: 'Chemical reactions drive continuous exchange between reservoirs.', nextNodeId: 'correct', sentiment: 'positive' },
            { id: 'single_store', label: 'Carbon stays mostly in one place.', nextNodeId: 'misconception' }
        ]
    },
    misconception: {
        id: 'misconception',
        speaker: 'AI',
        content: 'Carbon is highly mobile — chemically and physically. CO2 dissolves into seawater, plants convert it into sugar, animals respire it back, and combustion releases stored fossil carbon instantly.\n\nEach reservoir has its own chemical form of carbon (CO2 gas, carbonate ion, organic molecule, hydrocarbon) and reactions continuously interconvert them.\n\nSo cycling is **reaction-driven**, not static storage.',
        options: [{ id: 'cont', label: 'Understood — reactions move carbon between reservoirs.', nextNodeId: 'correct' }]
    },
    correct: {
        id: 'correct',
        speaker: 'AI',
        content: 'Exactly. The key concept is **flux** — the rate of carbon flow between any two reservoirs.\n\n**Flux = amount of carbon transferred per unit time**\n\nIn the visual:\n- **More moving dots** = higher flux on that pathway\n- **Faster dots** = faster transfer rate\n- Flux can be a **source** (adds CO2 to atmosphere) or a **sink** (removes CO2 from atmosphere)\n\nAll four pathways run simultaneously. The atmospheric CO2 level rises or falls depending on whether total sources outweigh total sinks, or vice versa.\n\nUse the **three sliders** in the control box to experiment:\n- 🟢 **Photosynthesis** — controls Step 1 (sink, removes CO2)\n- 🔴 **Combustion** — controls Step 2 (source, adds CO2)\n- 🔵 **Ocean Uptake** — controls Step 4 (sink, removes CO2)\n\nTry raising Ocean Uptake while lowering Combustion — watch the Cycle Health improve!',
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'cycle', exchangeFlux: 60 } },
        options: [
            { id: 'cp', label: 'Next: Walk me through each step.', nextNodeId: 'steps' },
            { id: 'teach', label: 'Teach me key words first.', nextNodeId: 'key_terms' }
        ]
    },
    key_terms: {
        id: 'key_terms',
        speaker: 'AI',
        content: 'Key terms for C21:\n\n**Reservoir** — a storage pool for carbon (atmosphere, ocean, biomass, soil).\n\n**Flux** — how fast carbon moves between two reservoirs (units: GtC/year in real science).\n\n**Source** — a process that adds CO2 to the atmosphere (e.g., combustion, respiration).\n\n**Sink** — a process that removes CO2 from the atmosphere (e.g., photosynthesis, ocean uptake).\n\n**Feedback loop** — when a change in one part of the cycle amplifies or dampens changes elsewhere (e.g., warming releases more soil carbon, which raises CO2, which warms further).',
        options: [{ id: 'steps_from_terms', label: 'Now walk me through each step.', nextNodeId: 'steps' }]
    },
    steps: {
        id: 'steps',
        speaker: 'AI',
        content: 'Here is how carbon moves through the cycle, step by step:\n\n**Step 1 — Photosynthesis (green arrow):** Plants absorb atmospheric CO2 and use sunlight energy to convert it into glucose (C₆H₁₂O₆). This is a carbon **sink** — it removes CO2 from air and locks it in biomass.\n\n**Step 2 — Respiration + Decomposition (yellow arrow):** Living organisms break down organic matter to release energy, returning CO2 to the soil/fuel pool. Dead biomass decomposes similarly. This is a neutral transfer within the biological subsystem.\n\n**Step 3 — Combustion (red arrow):** Burning fossil fuels or biomass breaks carbon-carbon bonds and releases stored carbon as CO2. This is a carbon **source** — it rapidly adds CO2 to the atmosphere.\n\n**Step 4 — Ocean Uptake (blue arrow):** CO2 dissolves into seawater and reacts to form carbonate and bicarbonate ions. Cold, high-pressure deep water absorbs more. This is a carbon **sink** — it removes CO2 from air into the ocean reservoir.',
        options: [{ id: 'checkpoint', label: 'Checkpoint: test my understanding.', nextNodeId: 'checkpoint' }]
    },
    checkpoint: {
        id: 'checkpoint',
        speaker: 'AI',
        content: 'Checkpoint — think carefully:\n\nIf combustion flux doubles but photosynthesis and ocean uptake stay the same, what happens to atmospheric CO2 over time?',
        options: [
            { id: 'co2_rises', label: 'Atmospheric CO2 rises — sources now exceed sinks.', nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
            { id: 'co2_stable', label: 'CO2 stays the same — the cycle self-corrects instantly.', nextNodeId: 'checkpoint_wrong' },
            { id: 'co2_falls', label: 'CO2 falls — more combustion drives more photosynthesis.', nextNodeId: 'checkpoint_wrong2' }
        ]
    },
    checkpoint_wrong: {
        id: 'checkpoint_wrong',
        speaker: 'AI',
        content: 'Not quite. The cycle does have feedback loops, but they operate slowly — over decades to centuries. In the short term, doubling combustion flux adds more CO2 than sinks can remove, so the atmospheric reservoir fills up.\n\nThink of it like a bathtub: if you open the tap wider (source) faster than the drain (sink) can empty, water level rises.',
        options: [{ id: 'retry', label: 'So CO2 rises when sources > sinks.', nextNodeId: 'checkpoint_correct' }]
    },
    checkpoint_wrong2: {
        id: 'checkpoint_wrong2',
        speaker: 'AI',
        content: 'Photosynthesis can increase slightly with extra CO2 (CO2 fertilization effect), but not enough to offset a doubling of combustion. The net result is still a rise in atmospheric CO2.\n\nFeedback loops exist but are partial — they dampen the rise, not eliminate it.',
        options: [{ id: 'retry2', label: 'Understood — CO2 still rises overall.', nextNodeId: 'checkpoint_correct' }]
    },
    checkpoint_correct: {
        id: 'checkpoint_correct',
        speaker: 'AI',
        content: 'Correct. When total source flux > total sink flux, the atmospheric reservoir accumulates CO2.\n\nIn the lab visual, watch the **atmospheric change bar** at the bottom-right:\n- **Red bar growing** = CO2 accumulating (sources winning)\n- **Green bar** = CO2 declining (sinks winning)\n- **Cycle Balance** drops when the system is far from equilibrium\n\nTry these experiments:\n1. Drag **Combustion** to maximum — watch the red bar grow 🔴\n2. Now raise **Ocean Uptake** to maximum — the blue Step 4 arrow thickens and the bar shrinks back 🔵\n3. Raise **Photosynthesis** too — both sinks now fight the source, and Cycle Health climbs 🟢\n\nStep 4 (ocean uptake) is a powerful but often overlooked carbon sink — the ocean absorbs about **25%** of all human CO2 emissions!',
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint', photosynthesisOn: true } },
        options: [{ id: 'disc', label: 'Show me the full summary.', nextNodeId: 'discovery' }]
    },
    discovery: {
        id: 'discovery',
        speaker: 'AI',
        content: 'Discovery: the carbon cycle is a **dynamic chemical balance**, not a fixed state. Stability requires sinks and sources to roughly cancel out over time.\n\n**What makes the cycle healthy?**\n- High photosynthesis flux (green, Step 1) = good\n- High ocean uptake flux (blue, Step 4) = good\n- Low unbalanced combustion flux (red, Step 3) = good\n- Balanced respiration/decomposition (yellow, Step 2) = neutral transfer\n\n**Summary Table:**\n\n| Pathway | Step | Type | Effect on Atmosphere |\n| --- | --- | --- | --- |\n| Photosynthesis | 1 | Sink | Reduces CO2 |\n| Respiration/Decomp | 2 | Transfer | Neutral (within bio pools) |\n| Combustion | 3 | Source | Increases CO2 |\n| Ocean Uptake | 4 | Sink | Reduces CO2 |\n\n**Feedback loops** can amplify or dampen changes — warming releases more soil carbon (positive feedback), while CO2 fertilization boosts plant growth slightly (negative feedback). Neither loop is fast enough to fully offset human combustion on human timescales.',
        options: [{ id: 'done', label: 'Complete C21', nextNodeId: 'complete' }]
    },
    complete: {
        id: 'complete',
        speaker: 'AI',
        content: 'C21 complete. You have covered:\n- Four carbon reservoirs and their chemical forms\n- Flux as the rate of transfer between reservoirs\n- Sources vs sinks and their atmospheric impact\n- Step-by-step cycle walkthrough\n- Feedback loops and system balance\n\nCross-links: **P21** (timing/tidal cycles), **B21** (metabolic cycles), **C22** (chemical equilibrium).',
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});

import { DialogNode } from '../../types';

/**
 * P10 — Renewable Energy: Power the Town
 * Big Idea 10: "How Do We Protect Our Planet?"
 * Scenario: "Power the Town" — choose energy sources to power a small town
 * Target Misconception: "Renewable energy isn't powerful enough to replace fossil fuels"
 */
export const getP10Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Welcome to Power the Town! ⚡🏘️\n\nThis little town needs electricity — homes, schools, hospitals all need power. Right now, **nothing is connected**. It's your job to pick the energy sources!\n\nBut here's the big question: should we burn **fossil fuels** (coal & oil) or use **renewable energy** (solar, wind, water)?\n\nLet's explore each option and see what happens!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
        options: [
            { id: 'fossil_first', label: "Let's try fossil fuels first", nextNodeId: 'fossil_intro' },
            { id: 'renewable_first', label: "Show me the renewable options!", nextNodeId: 'renewable_intro' }
        ]
    },

    'renewable_intro': {
        id: 'renewable_intro',
        speaker: 'AI',
        content: "Love the enthusiasm for clean energy! 🌿⚡\n\n**Renewable energy** comes from sources that **never run out** — sunlight, wind, and water. Unlike fossil fuels (coal and oil), they don't release CO₂ pollution.\n\nHere's a quick preview of our three options:\n- ☀️ **Solar** — turns sunlight into electricity\n- 💨 **Wind** — spinning turbines capture the breeze\n- 🌊 **Hydro** — falling water drives generators\n\nMany people think renewables aren't powerful enough to replace fossil fuels — but let's see if that's true!\n\nLet's start with solar panels! ☀️",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
        options: [
            { id: 'solar', label: "Show me how solar works! ☀️", nextNodeId: 'solar_intro' },
            { id: 'fossil_compare', label: "Wait — what are fossil fuels, exactly?", nextNodeId: 'fossil_intro' }
        ]
    },

    'fossil_intro': {
        id: 'fossil_intro',
        speaker: 'AI',
        content: "Let's start with what most of the world has used for over 100 years: **fossil fuels**! 🏭\n\nCoal and oil are dug up from deep underground. They formed over **millions of years** from ancient dead plants and animals — that's why they're called \"fossil\" fuels.\n\nWhen we burn them, the chemical energy stored inside is released as **heat**, which boils water into steam, which spins a **turbine** connected to a **generator** that makes electricity.\n\nWatch the factory power up the town!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'fossil' } },
        options: [
            { id: 'fossil_problem', label: "The town lit up! But what's that smoke?", nextNodeId: 'fossil_problem' }
        ]
    },

    'fossil_problem': {
        id: 'fossil_problem',
        speaker: 'AI',
        content: "Good eye! 👀 That grey cloud is **CO₂ — carbon dioxide** — a greenhouse gas.\n\nBurning fossil fuels releases CO₂ into the air. This is a HUGE problem:\n\n🌡️ CO₂ traps heat in the atmosphere → **global warming**\n🌧️ It mixes with rain → **acid rain** that damages forests\n💨 Other pollutants cause **smog** that makes it hard to breathe\n\n🔗 *Chemistry (C10) will explore these pollutants in detail!*\n🔗 *Biology (B10) will show how pollution harms ecosystems!*\n\nCan we power the town WITHOUT all this pollution? Let's try **solar energy**! ☀️",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'fossil', showPollution: true } },
        options: [
            { id: 'solar', label: "Show me solar power! ☀️", nextNodeId: 'solar_intro' }
        ]
    },

    'solar_intro': {
        id: 'solar_intro',
        speaker: 'AI',
        content: "Here comes the sun! ☀️\n\n**Solar panels** capture sunlight and turn it directly into electricity. Here's how:\n\n1. Sunlight is made of tiny packets of energy called **photons**\n2. When photons hit the solar panel, they **knock electrons loose** in the material\n3. Those flowing electrons = **electricity!** ⚡\n\nIt's an energy transformation — just like we learned in P3:\n**Light energy → Electrical energy**\n\nNo burning. No smoke. No CO₂! Watch the panels power the town!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'solar' } },
        options: [
            { id: 'solar_limit', label: "Amazing! But what happens at night?", nextNodeId: 'solar_limit' },
            { id: 'wind_next', label: "Cool! What about wind energy?", nextNodeId: 'wind_intro' }
        ]
    },

    'solar_limit': {
        id: 'solar_limit',
        speaker: 'AI',
        content: "Great question! 🌙 At night there's no sunlight, so solar panels can't generate electricity.\n\nThat's one limitation — solar works best during the **daytime** and in **sunny areas**.\n\nBut scientists have solutions! **Batteries** can store extra energy made during the day and release it at night. Still, we might want ANOTHER source to help out.\n\nLet's look at **wind energy** next! 💨",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'solar', showNight: true } },
        options: [
            { id: 'wind', label: "Let's see wind power!", nextNodeId: 'wind_intro' }
        ]
    },

    'wind_intro': {
        id: 'wind_intro',
        speaker: 'AI',
        content: "Feel that breeze? 💨 Let's put it to work!\n\n**Wind turbines** have huge blades that catch the wind. Here's the chain of energy:\n\n1. **Wind** pushes the blades → they spin\n2. The spinning blades turn a **generator** inside the turbine\n3. The generator converts **motion → electricity** ⚡\n\nAnother energy transformation from P3:\n**Kinetic energy (wind) → Electrical energy**\n\nWind is free, clean, and never runs out! Watch the turbines spin!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'wind' } },
        options: [
            { id: 'wind_limit', label: "What if the wind stops blowing?", nextNodeId: 'wind_limit' },
            { id: 'hydro_next', label: "What about water power?", nextNodeId: 'hydro_intro' }
        ]
    },

    'wind_limit': {
        id: 'wind_limit',
        speaker: 'AI',
        content: "Exactly! No wind = no spinning = no electricity. 😐\n\nWind is **intermittent** — it comes and goes. That's why wind farms are built in **windy areas** (hilltops, coastlines, plains).\n\nAnd just like solar, we can use **batteries** or combine wind with OTHER energy sources.\n\nSpeaking of which — there's one renewable source that works **day and night, rain or shine**. Let's check out **hydroelectric power**! 🌊",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'wind', showCalm: true } },
        options: [
            { id: 'hydro', label: "Water power — let's go! 🌊", nextNodeId: 'hydro_intro' }
        ]
    },

    'hydro_intro': {
        id: 'hydro_intro',
        speaker: 'AI',
        content: "Water to the rescue! 🌊🏔️\n\n**Hydroelectric dams** use falling water to generate electricity:\n\n1. A dam holds back a huge reservoir of water up high — that's **potential energy**\n2. When gates open, water **falls** down through pipes — potential → **kinetic energy**\n3. The rushing water spins a **turbine** connected to a **generator**\n4. Generator turns motion into **electricity** ⚡\n\nEnergy chain: **Gravitational PE → Kinetic → Electrical**\n\nHydro is powerful AND reliable — water flows 24/7! Watch the dam in action!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'hydro' } },
        options: [
            { id: 'compare', label: "Let's compare all the options!", nextNodeId: 'compare' }
        ]
    },

    'compare': {
        id: 'compare',
        speaker: 'AI',
        content: "Time for the big comparison! 📊\n\n| Source | Power | Pollution | Works All The Time? | Cost |\n|--------|-------|-----------|---------------------|------|\n| 🏭 Coal/Oil | High | ❌ Lots of CO₂ | ✅ Yes | 💰💰 |\n| ☀️ Solar | Medium | ✅ None | ❌ No (needs batteries) | 💰 |\n| 💨 Wind | Medium | ✅ None | ⚠️ Needs wind | 💰 |\n| 🌊 Hydro | High | ✅ None | ✅ Yes | 💰💰 (dam) |\n\nLook — **renewables CAN match fossil fuels** in power! And when you combine solar + wind + hydro together, they cover each other's weaknesses!\n\nReady for a challenge? 🧠",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'compare' } },
        options: [
            { id: 'checkpoint', label: "Bring on the challenge!", nextNodeId: 'checkpoint' }
        ]
    },

    'checkpoint': {
        id: 'checkpoint',
        speaker: 'AI',
        content: "⏸️ **Checkpoint!**\n\nIt's midnight, the wind has stopped, and the town still needs power. Which renewable energy source can STILL generate electricity right now?\n\n(Think about what each source needs to work!)",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
        options: [
            { id: 'pick_solar', label: "☀️ Solar panels", nextNodeId: 'checkpoint_wrong_solar' },
            { id: 'pick_wind', label: "💨 Wind turbines", nextNodeId: 'checkpoint_wrong_wind' },
            { id: 'pick_hydro', label: "🌊 Hydroelectric dam", nextNodeId: 'checkpoint_correct', sentiment: 'positive' }
        ]
    },

    'checkpoint_wrong_solar': {
        id: 'checkpoint_wrong_solar',
        speaker: 'AI',
        content: "Not quite! ☀️ Solar panels need **sunlight** to knock those electrons loose. At midnight, there's no sunlight!\n\nThe answer is **hydroelectric** 🌊 — water behind the dam has gravitational potential energy day and night. Open the gates, water flows, turbine spins, electricity flows!\n\nThe dam doesn't care if it's dark or calm — gravity never stops working! 💪",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint', reveal: 'hydro' } },
        options: [
            { id: 'discovery', label: "Gravity works 24/7 — clever!", nextNodeId: 'discovery' }
        ]
    },

    'checkpoint_wrong_wind': {
        id: 'checkpoint_wrong_wind',
        speaker: 'AI',
        content: "Close, but the wind has stopped! 💨 No wind means the turbine blades can't spin.\n\nThe answer is **hydroelectric** 🌊 — the dam holds water up high with **gravitational potential energy**. It doesn't need sun or wind — just gravity pulling water downhill!\n\nOpen the gates → water falls → turbine spins → electricity flows, any time of day or night! ⚡",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint', reveal: 'hydro' } },
        options: [
            { id: 'discovery', label: "Water power is always ready!", nextNodeId: 'discovery' }
        ]
    },

    'checkpoint_correct': {
        id: 'checkpoint_correct',
        speaker: 'AI',
        content: "Nailed it! ✅ 🌊\n\n**Hydroelectric power** works at midnight with no wind because it doesn't rely on sunlight or wind — it uses **gravity**!\n\nWater stored behind the dam has **gravitational potential energy**. Open the gates, and gravity pulls the water down → spins the turbine → generates electricity. Any time, any weather!\n\nThat's why smart energy grids **combine** solar, wind, AND hydro together! 🎯",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint', reveal: 'hydro' } },
        options: [
            { id: 'discovery', label: "Mixing sources is the best strategy!", nextNodeId: 'discovery' }
        ]
    },

    'discovery': {
        id: 'discovery',
        speaker: 'AI',
        content: "🎉 **Big Discovery!**\n\n**Renewable energy IS powerful enough to replace fossil fuels!** The trick is using them TOGETHER:\n\n☀️ Solar for sunny days\n💨 Wind for breezy times\n🌊 Hydro for reliable 24/7 baseline power\n🔋 Batteries to store extra energy\n\nAll three convert energy from one form to another — just like we learned in **P3 (Energy Ramp)**!\n\n⚡ **Misconception Busted:** Renewables aren't weak — they're powerful, clean, and when combined, they cover each other's gaps!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
        options: [
            { id: 'complete', label: "Clean energy can power everything!", nextNodeId: 'complete' }
        ]
    },

    'complete': {
        id: 'complete',
        speaker: 'AI',
        content: "🔗 **Big Idea 10 Complete — How Do We Protect Our Planet?**\n\n- Physics (P10) showed how **renewable energy** converts sunlight, wind, and water into clean electricity\n- Chemistry (C10) reveals how fossil fuels create **CO₂, acid rain, and smog**\n- Biology (B10) explores how pollution threatens **ecosystems and biodiversity**\n\nClean Energy + Clean Air + Healthy Ecosystems = A Protected Planet! 🌍💚\n\n✅ **Lesson P10 Complete!**",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});


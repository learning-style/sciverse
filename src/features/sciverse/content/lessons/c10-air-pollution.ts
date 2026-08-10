import { DialogNode } from '../../types';

/**
 * C10 — Air Pollution
 * Big Idea 10: "How Do We Protect Our Planet?"
 * Scenario: "The Invisible Blanket"
 * Target Misconception: "A little pollution doesn't matter"
 */
export const getC10Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Welcome to The Invisible Blanket! 🌍🔥\n\nImagine wrapping yourself in a thin blanket on a cold night — nice and cozy, right? Earth has a blanket too: a thin layer of gases in the atmosphere that keeps the planet warm enough for life.\n\nBut what happens if you keep piling on MORE and MORE blankets? You'd overheat! That's exactly what's happening to our planet. Let's find out why.",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
        options: [
            { id: 'little_bit', label: "A little pollution can't matter that much, right?", nextNodeId: 'misconception', sentiment: 'negative' },
            { id: 'curious', label: "What gases make Earth's blanket?", nextNodeId: 'co2_sources', sentiment: 'positive' },
            { id: 'worried', label: "That sounds dangerous — tell me more!", nextNodeId: 'co2_sources', sentiment: 'neutral' }
        ]
    },

    'misconception': {
        id: 'misconception',
        speaker: 'AI',
        content: "That's a really common idea — but it's actually a **misconception**! 🤔\n\nEvery tiny bit of pollution ADDS UP. Think of it like this: one extra blanket is fine, but add 50 more and you can't breathe. Since the Industrial Revolution, humans have added **billions of tonnes** of extra CO₂ to the atmosphere every year.\n\nA little from each car, factory, and power plant — multiplied by millions — becomes a LOT. Let's see where all that CO₂ comes from!",
        options: [
            { id: 'see_sources', label: "Show me the sources of CO₂!", nextNodeId: 'co2_sources' }
        ]
    },

    'co2_sources': {
        id: 'co2_sources',
        speaker: 'AI',
        content: "🏭 **Where Does CO₂ Come From?**\n\nCarbon dioxide (CO₂) enters the atmosphere mainly when we **burn fossil fuels** — coal, oil, and natural gas.\n\n| Source | What happens | CO₂ released |\n|--------|-------------|---------------|\n| 🏭 Factories | Burn coal/gas for energy | Huge amounts |\n| 🚗 Cars & trucks | Burn petrol/diesel | Every journey |\n| ⚡ Power plants | Burn coal/gas for electricity | 24/7 |\n| 🌲 Deforestation | Trees that absorbed CO₂ are cut | CO₂ released back |\n\nLook at the factory smokestacks pumping CO₂ into the sky. Those tiny molecules are invisible — but they're building up year after year!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'co2_sources' } },
        options: [
            { id: 'to_greenhouse', label: "So what does the CO₂ actually do up there?", nextNodeId: 'greenhouse' }
        ]
    },

    'greenhouse': {
        id: 'greenhouse',
        speaker: 'AI',
        content: "🌡️ **The Greenhouse Effect**\n\nHere's how Earth's blanket works:\n\n1. ☀️ **Sunlight** passes through the atmosphere and warms the ground\n2. 🌍 The warm ground releases **heat** (infrared radiation) back up\n3. 🔴 **CO₂ molecules** catch some of that heat and bounce it BACK down\n4. 🔥 The heat gets **trapped** between the ground and the CO₂ layer\n\nWith a NORMAL amount of CO₂, this keeps Earth at a comfortable temperature. But watch what happens when we add MORE CO₂ — the blanket gets thicker and traps MORE heat!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'greenhouse' } },
        options: [
            { id: 'to_warming', label: "What happens when too much heat is trapped?", nextNodeId: 'warming' }
        ]
    },

    'warming': {
        id: 'warming',
        speaker: 'AI',
        content: "🌡️📈 **Global Warming**\n\nWhen too much CO₂ traps too much heat, the whole planet gets warmer. Even a few degrees makes a HUGE difference:\n\n- 🧊 Ice caps and glaciers **melt** → sea levels rise\n- 🌊 Coastal cities risk **flooding**\n- 🌪️ More extreme **storms**, droughts, and heatwaves\n- 🐾 Animals lose their habitats\n\nSee the thermometer climbing? Earth's average temperature has risen about **1.1°C** since 1900. That might sound small, but it's enough to cause ice sheets to collapse!\n\n🔗 **Link to P10:** Switching from fossil fuels to **renewable energy** (solar, wind) means we burn less coal and oil → LESS CO₂ → the blanket stops getting thicker!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'warming' } },
        options: [
            { id: 'to_acid', label: "Is CO₂ the only pollutant?", nextNodeId: 'acid_rain' }
        ]
    },

    'acid_rain': {
        id: 'acid_rain',
        speaker: 'AI',
        content: "🌧️ **Acid Rain — Another Invisible Threat**\n\nCO₂ isn't the only thing coming out of smokestacks. When factories and cars burn fuel, they also release **sulfur dioxide (SO₂)** and **nitrogen oxides (NOₓ)**.\n\nThese gases rise into clouds and mix with water droplets to form **acid rain** — rain that's more acidic than normal! ☁️💧\n\n**Acid rain damage:**\n- 🌲 Kills trees and strips leaves\n- 🐟 Poisons lakes — fish can't survive\n- 🏛️ Eats away at stone buildings and statues\n\nWatch the SO₂ clouds form and the rain damage the trees below!\n\n🔗 **Link to B10:** Acid rain destroys **ecosystems** — entire forests and lakes can die, taking all their biodiversity with them.",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'acid_rain' } },
        options: [
            { id: 'to_ozone', label: "What about the ozone layer I've heard of?", nextNodeId: 'ozone' }
        ]
    },

    'ozone': {
        id: 'ozone',
        speaker: 'AI',
        content: "🛡️ **The Ozone Layer — Good Ozone vs Bad Ozone**\n\nHere's a twist: ozone (O₃) can be **good** OR **bad** depending on WHERE it is!\n\n| Location | Type | What it does |\n|----------|------|-------------|\n| ☁️ High up (stratosphere) | **Good ozone** | Blocks dangerous UV rays from the Sun |\n| 🏙️ Ground level | **Bad ozone** (smog) | Irritates lungs, harms plants |\n\n**Good ozone** is like a sunscreen for the whole planet. But chemicals called **CFCs** (chlorofluorocarbons) punched a **hole** in it, letting harmful UV rays through — causing sunburn and skin cancer.\n\n**Bad ozone** forms when car exhaust + sunlight react. That's the hazy **smog** you see over big cities! 🌫️\n\n🔗 **Link to B10:** The ozone hole lets extra UV hit **ecosystems** — it damages tiny ocean plankton that many food chains depend on!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'ozone' } },
        options: [
            { id: 'what_cfc', label: "What exactly are CFCs?", nextNodeId: 'cfc_explain' },
            { id: 'to_checkpoint', label: "Let me test what I've learned!", nextNodeId: 'checkpoint' }
        ]
    },

    'cfc_explain': {
        id: 'cfc_explain',
        speaker: 'AI',
        content: "🧪 **CFCs — Chlorofluorocarbons**\n\nCFCs are man-made chemicals that were once used everywhere:\n- ❄️ **Refrigerators & air conditioners** — as the cooling fluid\n- 🧴 **Aerosol spray cans** — hairspray, deodorant, paint\n- 🧽 **Foam packaging** — like styrofoam containers\n\nThey seemed perfect — odourless, non-toxic, non-flammable. But scientists discovered that when CFCs float up to the stratosphere, **UV light breaks them apart**, releasing **chlorine atoms**.\n\nOne chlorine atom can destroy **thousands** of ozone molecules! 😱 That's how the ozone hole formed — mostly over Antarctica.\n\n**Good news:** In 1987, countries signed the **Montreal Protocol** to ban CFCs. The ozone layer is slowly healing! 🎉 It's one of the biggest environmental success stories ever.",
        options: [
            { id: 'to_checkpoint', label: "Let me test what I've learned!", nextNodeId: 'checkpoint' }
        ]
    },

    'checkpoint': {
        id: 'checkpoint',
        speaker: 'AI',
        content: "⏸️ **Checkpoint!**\n\nWhy does MORE CO₂ in the atmosphere make Earth warmer?\n\nThink about the blanket analogy — what exactly is CO₂ doing to the heat?\n\n🔗 **Link to P10:** Remember, fossil fuel power plants are the #1 source of CO₂. Renewable energy produces electricity WITHOUT burning fuel!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
        options: [
            { id: 'correct', label: "CO₂ traps heat that's trying to escape — like extra blankets!", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
            { id: 'wrong_sun', label: "CO₂ makes the Sun hotter.", nextNodeId: 'checkpoint_wrong_sun', sentiment: 'negative' },
            { id: 'wrong_hole', label: "CO₂ makes a hole that lets more sunlight in.", nextNodeId: 'checkpoint_wrong_hole', sentiment: 'negative' }
        ]
    },

    'checkpoint_correct': {
        id: 'checkpoint_correct',
        speaker: 'AI',
        content: "✅ Exactly right! CO₂ molecules **trap heat** (infrared radiation) that the Earth is trying to release back into space.\n\nMore CO₂ = thicker blanket = more heat trapped = planet gets warmer. It's the greenhouse effect in action!\n\nThe Sun's energy stays the SAME — what changes is how much heat gets **kept in** by the CO₂ layer.",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint', correct: true } },
        options: [
            { id: 'to_discovery', label: "Now I get it — the blanket gets thicker!", nextNodeId: 'discovery' }
        ]
    },

    'checkpoint_wrong_sun': {
        id: 'checkpoint_wrong_sun',
        speaker: 'AI',
        content: "Not quite! The Sun's temperature doesn't change because of CO₂. ☀️\n\nThe key is what happens to heat AFTER it reaches Earth. The ground warms up and radiates heat back upward. **CO₂ catches that heat** and bounces it back down — like a blanket trapping your body heat.\n\nMore CO₂ = thicker blanket = more trapped heat = warmer planet! 🌡️",
        options: [
            { id: 'retry', label: "Ah — CO₂ traps heat trying to escape!", nextNodeId: 'discovery' }
        ]
    },

    'checkpoint_wrong_hole': {
        id: 'checkpoint_wrong_hole',
        speaker: 'AI',
        content: "Good thinking, but that's mixing up two different problems! A hole in the **ozone** layer lets UV rays in — that's a separate issue from CO₂.\n\nCO₂ doesn't make a hole. Instead, it acts like a **blanket**: it traps heat that Earth is trying to release into space. More CO₂ = thicker blanket = more trapped heat.\n\nThe Sun sends the same energy either way — CO₂ just keeps more of it from escaping! 🔴",
        options: [
            { id: 'got_it', label: "Got it — CO₂ traps outgoing heat!", nextNodeId: 'discovery' }
        ]
    },

    'discovery': {
        id: 'discovery',
        speaker: 'AI',
        content: "🎉 **Discovery: The Three Faces of Air Pollution!**\n\n| Pollutant | Source | Effect |\n|-----------|--------|--------|\n| CO₂ | Burning fossil fuels | Greenhouse effect → global warming 🌡️ |\n| SO₂ / NOₓ | Factories & cars | Acid rain → kills forests & lakes 🌧️ |\n| CFCs | Old refrigerants & sprays | Ozone hole → UV damage ☀️ |\n| Ground ozone | Car exhaust + sunlight | Smog → breathing problems 🌫️ |\n\n**Key Insight:** These aren't separate problems — they're all connected! Burning fossil fuels causes greenhouse warming AND acid rain AND smog, all at the same time.",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
        options: [
            { id: 'finish', label: "It's all connected to what we burn!", nextNodeId: 'complete' }
        ]
    },

    'complete': {
        id: 'complete',
        speaker: 'AI',
        content: "🔗 **Cross-Links:**\n- **P10 (Renewable Energy):** Every solar panel and wind turbine replaces a fossil fuel plant — that means LESS CO₂, LESS acid rain, and cleaner air. Switching to renewables is the single biggest thing we can do! ⚡🌱\n- **B10 (Ecosystems & Biodiversity):** Air pollution doesn't just affect the sky — acid rain destroys forests, the ozone hole harms ocean plankton, and global warming changes habitats so fast that animals can't adapt. Protecting the air means protecting ALL life on Earth! 🦋🌲\n\n✅ **Lesson C10 Complete!** Now you know why the invisible blanket matters — and what we can do about it!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});


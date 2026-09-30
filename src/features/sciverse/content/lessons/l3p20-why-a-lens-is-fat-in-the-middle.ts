import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 20, physics. A Mechanism lesson: it needs no
 * new apparatus, only the fact that light travels slower in glass, and it derives
 * the (n - 1) that L2C20 had to borrow.
 *
 * P20 said a convex lens bends light to a point and left the shape as a given.
 * L2C20 said power goes with (n - 1) and admitted it was borrowed. This lesson
 * answers both from one idea: every path from the object to the image must take
 * the same time, so the extra glass in the middle exists to delay the short path
 * until it agrees with the long one.
 *
 *   extra optical path a middle ray must lose = r^2 / (2f)
 *   so the extra glass needed = r^2 / (2f (n - 1))
 *
 * Worked on a lens 40 mm across with a 100 mm focal length: the edge ray travels
 * 2.00 mm further through air, so the middle needs 3.85 mm of extra glass at
 * n = 1.52 and only 2.70 mm at n = 1.74 -- which is exactly L2C20's 30% saving,
 * now derived rather than asserted.
 *
 * Still standing: this treats the surfaces as gentle curves and assumes every ray
 * is close to the axis. Rays through the far edge of a big lens need slightly more
 * delay than r^2/(2f) provides, which is spherical aberration, and it is why a
 * fast camera lens is not a single piece of glass.
 */
export function getL3P20Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2C20 gave you a formula it could not justify. It said the power of a lens goes with **(n - 1)**, used that to show a high-index lens is 30% thinner, and told you plainly that the (n - 1) was borrowed.\n\nP20 left something unexplained too. It said a convex lens is fat in the middle and thin at the edges, and that this shape brings light to a point. It never said **why that shape**. Why not the other way round? Why fat in the middle by that particular amount?\n\nBoth answers come from one fact, and it is a fact about time rather than about bending: **light travels slower in glass than in air.** In glass of index n, it travels n times slower.\n\nNow look at a lens edge-on and think about two rays leaving the same distant star, both heading for the same point behind the lens.\n\n- One goes through the **middle** of the lens. Its journey through the air is the **shortest** possible.\n- One goes through the **edge**. It has to travel out and then back in, so its journey through the air is **longer**.\n\nIf both are to arrive at the same point and build the same image, something must be arranged. What?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "They must take the same time, so the middle ray has to be slowed down by exactly as much as the edge ray's longer path costs.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "The middle ray just arrives first -- it is a shorter path, so the image forms slightly earlier there.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "It would arrive first, and that is exactly the problem -- because light is a wave, and a wave that arrives early is a wave out of step.\n\nThink about what an image **is**. Light from one point on the object has to arrive at one point on the image and **add up**. Waves add up when their peaks line up. If the middle ray arrives half a wavelength ahead of the edge ray, its peak lands on the other's trough, and they cancel instead of adding. Arrive at random times and you get no image at all -- just a smear.\n\nSo a sharp image is not merely light landing in the right place. It is light landing in the right place **in step**.\n\nAnd light is fast. A wavelength of visible light is about half a thousandth of a millimetre, so the timing has to be right to within a fraction of that. Nothing about a lens is casual.\n\nThat gives you the design rule, and it is severe: **every path from the object to the image must take the same time**. All the paths, not merely the convenient ones. The edge ray takes a longer route through air. The only way to even that up is to make the middle ray travel through something that slows it down -- and the amount of slowing is not a matter of taste. It is fixed by how much longer the edge path is.\n\nWhich means the shape of a lens is not chosen. **It is calculated.**",
            options: [
                { id: 'cont', label: "So how much longer is the edge path?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "That is geometry, and it is the one piece of algebra in the lesson.\n\nCall the distance from the middle of the lens out to the ray **r**, and the focal length **f**. The middle ray travels straight along the axis for a distance f. The edge ray travels along the hypotenuse of a right triangle with sides f and r, so its length is **√(f² + r²)**.\n\nThe difference is √(f² + r²) - f, and for a lens where r is much smaller than f -- which is every sensible lens -- that comes out very close to:\n\n**extra distance the edge ray travels = r² / (2f)** -- the radius squared, divided by twice the focal length\n\nThat is worth a sanity check, because the approximation is doing real work. For f = 100 mm and r = 20 mm: √(10000 + 400) = 101.98, so the difference is 1.98 mm, and r²/(2f) = 400/200 = 2.00 mm. Close enough, and it gets closer as the lens gets gentler.\n\nNow the glass. Putting a thickness **t** of glass in the middle ray's path delays it by as much as an extra distance **(n - 1) t** of air would -- not **n t**, because the glass **replaces** air that was there before. The path was already t long; it is now n times slower, so the extra is (n - 1) t.\n\n**There is your (n - 1)**, and it comes from replacement rather than from bending.\n\nSet the delay equal to the distance to be made up:\n\n(n - 1) t = r² / (2f)\n\n**extra glass needed in the middle = r² / (2f (n - 1))**",
            options: [
                { id: 'cont', label: "Put a real lens through it.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**A lens 40 mm across -- so r = 20 mm -- with a focal length of 100 mm.**\n\n1. **Extra distance the edge ray travels:** r²/(2f) = 400 / 200 = **2.00 mm**\n2. **In ordinary glass, n = 1.52:** t = 2.00 / 0.52 = **3.85 mm** of extra glass in the middle\n3. **In high-index glass, n = 1.74:** t = 2.00 / 0.74 = **2.70 mm**\n\nSo the same lens needs 3.85 mm of bulge in one material and 2.70 mm in the other. Divide them: 2.70 / 3.85 = **0.70**.\n\n**That is L2C20's number, derived.** It said a 1.74 lens is 70% as thick -- 30% thinner -- and offered no reason beyond a formula it had borrowed. The reason is that the job is to lose a **fixed** amount of time, 2.00 mm worth, and a material that slows light more does it with less glass. The ratio is 0.52/0.74 because that is the ratio of how much each material slows light **compared with the air it replaced**.\n\nAnd now the shape question P20 left open. Why fat in the middle? Because the middle ray has the **shortest** path and therefore needs the **most** delaying. Work out the required thickness at every distance r from the centre and the answer falls off as r² -- which traces out a gentle curve, thickest at the middle, thinning to nothing at the edge.\n\n**A lens is not a shape that happens to focus light. It is a delay, cut in glass.**",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A lens is **50 mm across**, so r = 25 mm, with a focal length of **200 mm**, made of glass with **n = 1.60**.\n\nHow much extra glass does the middle need?",
            options: [
                { id: 'right', label: "About 2.6 mm. r²/(2f) = 625/400 = 1.5625 mm, and 1.5625 / 0.60 = 2.60 mm.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'used_n', label: "About 0.98 mm, from 1.5625 / 1.60.", nextNodeId: 'math_wrong' },
                { id: 'used_d', label: "About 10.4 mm, using the full 50 mm width instead of the radius.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**Dividing by n instead of (n - 1)** throws away the whole point of the derivation. The glass does not add n times the delay -- it **replaces** air that was already delaying the ray a little. Only the difference counts. Test it on a limiting case: glass with n = 1.00 is air, and it can never focus anything. Dividing by n gives a finite thickness, which would mean a lens made of air works. Dividing by (n - 1) gives division by zero -- infinite thickness -- which is the correct way of saying **impossible**.\n\n**Using 50 mm for r** is the commoner slip. r is measured from the **middle of the lens to the ray**, so for a lens 50 mm across it is 25 mm, not 50. And because the formula squares it, using the diameter makes the answer four times too big. Any formula with r² in it deserves a moment's care about which length is meant.\n\n**r²/(2f) = 625 / 400 = 1.5625 mm, and 1.5625 / 0.60 = 2.60 mm.**\n\nNotice that this lens is weaker than the worked one -- 200 mm focal length instead of 100 -- and yet needs a thicker middle, because it is also wider. Both r and f matter, and r matters twice over.",
            options: [
                { id: 'retry', label: "(n - 1), and r is the radius.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "**Try the two dials.** **Lens Radius** in millimetres and **Refractive Index**, with the focal length held at 100 mm.\n\n| Radius | Extra path to lose | Glass at n = 1.52 | Glass at n = 1.74 |\n| --- | --- | --- | --- |\n| 10 mm | 0.50 mm | 0.96 mm | 0.68 mm |\n| 20 mm | 2.00 mm | 3.85 mm | 2.70 mm |\n| 25 mm | 3.13 mm | 6.01 mm | 4.22 mm |\n| 30 mm | 4.50 mm | 8.65 mm | 6.08 mm |\n\nThe radius dial is the one that surprises people. **Double the radius and the thickness quadruples**, because the edge ray's extra journey goes as r². A lens twice as wide is four times as fat in the middle, for the same focal length.\n\nThat single line explains a great deal about real optics:\n\n- **Why big camera lenses are so heavy.** Doubling the diameter to gather four times the light costs four times the glass thickness, and the weight goes up faster still.\n- **Why a strong magnifying glass is small.** A short focal length needs a lot of delay, and keeping the lens narrow is the only way to stop it becoming a sphere.\n- **Why a telescope objective is gently curved.** Its focal length is enormous, so r²/(2f) is small even for a wide lens.\n\nAnd the index dial does what L2C20 said, for the reason this lesson has now given: it changes **how much glass buys a given delay**, and nothing else. The delay required is set by geometry alone and does not care what the lens is made of.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "The delay is geometry; the glass is just how you buy it. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A **Fresnel lens** -- the flat sheet of concentric ridges in a lighthouse, an overhead projector or a credit-card magnifier -- focuses light as strongly as a thick glass lens while being a few millimetres thick overall.\n\nIf a lens works by delaying the middle ray by r²/(2f(n - 1)), how can a flat sheet possibly do the same job?",
            options: [
                { id: 'right', label: "Because light is a wave, a delay of exactly one whole wavelength puts it back in step, so you only ever need the delay to be right to within one wavelength -- the ridges throw away whole wavelengths of glass and keep the remainder.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "The ridges must bend light by reflection rather than refraction, so the thickness rule does not apply to them.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The ridges refract, exactly like any lens surface -- hold a Fresnel magnifier up and you can see each ridge bending light the way a small prism would. Nothing new is happening optically. What is different is **how much delay they bother to provide**.\n\nGo back to why the delay was needed. It was to bring waves into step at the image. And waves are in step not only when the delay is exactly right, but also when it is out by **one whole wavelength**, or two, or any whole number -- because a wave shifted by a full cycle looks identical to one not shifted at all.\n\nSo the delay never had to be 3.85 mm. It had to be 3.85 mm **or 3.85 minus any whole number of wavelengths**. Visible light has a wavelength of about 0.0005 mm, so 3.85 mm of glass is roughly seven thousand wavelengths of delay -- and seven thousand of those are pure waste. Throw them all away and keep only the fraction left over, and you need a few thousandths of a millimetre of glass instead of nearly four.\n\nThat is what the ridges are. Each one is the leftover fraction, and the step between ridges is where a whole wavelength has been discarded.\n\nAnd it shows how much this lesson's framing bought. From P20's \"a convex lens is fat in the middle\", a Fresnel lens is inexplicable -- it is not fat anywhere. From \"a lens is a delay cut in glass\", it is obvious: **keep the delay, discard the whole cycles, and the glass mostly disappears.**\n\nThe price is real: the steps scatter a little light, which is why lighthouses and projectors use Fresnel lenses and cameras do not.",
            options: [
                { id: 'retry', label: "A whole wavelength of delay is the same as none, so most of the glass is optional.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Exactly -- and it is a good test of whether the mechanism was worth deriving. From \"a convex lens is fat in the middle\" a Fresnel lens makes no sense at all. From \"a lens is a delay cut in glass\" it is almost obvious: keep the leftover fraction of the delay, throw away the whole cycles, and nearly all the glass becomes optional.\n\nSo here is what this lesson settled:\n\n- **Why a lens is fat in the middle**: the middle ray has the shortest path, so it needs the most delaying, and the required thickness falls off as r².\n- **Where L2C20's (n - 1) came from**: glass **replaces** air, so only the difference in slowing counts. Divide by n instead and a lens made of air would work.\n- **Why the 1.74 lens is 70% as thick**: the delay to be bought is fixed by geometry, and 0.52/0.74 is the ratio of what each material charges for it.\n- **Why wide lenses are so heavy**: r², so twice the width is four times the bulge.\n- **Why a flat Fresnel sheet works at all**: because only the delay **modulo one wavelength** ever mattered.\n\nAnd one thing is now conspicuously unexplained, which L2C20 also noticed and could not name. If high-index glass is simply better -- thinner for the same delay -- then why does anyone still make lenses from 1.52 glass? There has to be a price, and the derivation here points straight at where to look: this whole argument assumed **one** speed of light in the glass. That is not quite true, and the difference is what you see in a rainbow.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "A lens is a delay, cut in glass!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You derived the shape of a lens from the speed of light.**\n\n- Light travels **n times slower** in glass of index n. That is what the index means\n- An image forms only when light from one point arrives **in step**, so **every path must take the same time**\n- The middle ray has the **shortest** path through air, so it needs the **most** delaying\n- The edge ray's extra journey is √(f² + r²) - f, which for a sensible lens is very close to **r² / (2f)**\n- Checked: at f = 100 mm and r = 20 mm the exact figure is 1.98 mm and the approximation gives 2.00 mm\n- A thickness t of glass delays a ray by as much as **(n - 1) t** of air, because the glass **replaces** air that was already there\n- **That is where L2C20's (n - 1) comes from** -- replacement, not bending. Divide by n instead and a lens made of air would work\n- **extra glass needed = r² / (2f (n - 1))**\n- A 40 mm lens at f = 100 mm: **3.85 mm** of bulge at n = 1.52, **2.70 mm** at n = 1.74, whose ratio is **0.70** -- L2C20's 30% saving, derived\n- The required thickness falls off as **r²**, which traces the curve of a lens. **A lens is a delay, cut in glass**\n- **Double the radius and the bulge quadruples**, which is why big camera lenses are heavy and strong magnifiers are small\n- A **Fresnel lens** works because a delay out by a **whole wavelength** is as good as an exact one, so the whole cycles can be discarded and the glass mostly thrown away\n- Removed: P20's lens shape as a given, and L2C20's borrowed (n - 1)\n- Still standing: this assumes every ray is **close to the axis**. Rays through the far edge of a wide lens need more delay than r²/(2f) provides, which is **spherical aberration** -- and the derivation assumed **one** speed of light in the glass, which is not quite true",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "So what is the price of high-index glass?", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- How Do Lenses Change What We See?**\n\nL2C20 borrowed a formula. Level 3 derives it, from nothing more than the speed of light in glass.\n\n**Summary Table:**\n| Step | The Physics | The Number |\n| --- | --- | --- |\n| Light in glass | travels **n times slower** | that is what n means |\n| An image needs | every path to take the **same time** | or the waves cancel |\n| The middle ray | has the **shortest** path | so it needs the most delay |\n| The edge ray's extra journey | √(f² + r²) - f, near enough **r²/(2f)** | 2.00 mm at r = 20, f = 100 |\n| Glass delays by | **(n - 1) t**, because it replaces air | the source of L2C20's (n - 1) |\n| So the bulge is | **r² / (2f (n - 1))** | 3.85 mm at 1.52, 2.70 at 1.74 |\n| Their ratio | 0.52 / 0.74 | **0.70** -- L2C20's 30%, derived |\n| Shape | thickness falls as **r²** | which is the curve of a lens |\n| Width | **double r, four times the bulge** | why big lenses are heavy |\n| A Fresnel lens | keeps the delay **modulo one wavelength** | flat, and it still focuses |\n| Not explained | that glass has **one** speed of light | Still standing |\n\n**The one line to remember:** a lens is not a shape that happens to focus light -- it is a delay cut in glass, sized to make the short path through the middle take exactly as long as the long path round the edge.\n\n**Up next:** C20 and L2C20 both left a question hanging. High-index glass is thinner, so why is anyone still using ordinary glass? The answer is in the colours, and it is a genuine limit rather than a matter of cost."
        }
    };
}

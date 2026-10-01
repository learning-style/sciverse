import { AssessmentData } from '../../types';

/**
 * Big Idea 22 Assessment -- LEVEL 3 (grades 9-12).
 * Covers L3P22 (rays curve because speed rises with depth; the 103-degree S-wave
 * shadow and a liquid outer core), L3C22 (E(n) = -13.6/n^2, which calculates
 * hydrogen's whole visible spectrum and fails for sodium), L3B22 (an echo is a
 * mismatch in Z = density x speed, and the method works because echoes are faint).
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea22Level3Assessment: AssessmentData = {
    bigIdea: 22,
    level: 3,
    title: 'How Do Waves Help Us See the Invisible?',
    subtitle: 'Level 3 -- The Curve, the Ladder, and the Mismatch',
    icon: '📡',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Why does a seismic ray curve rather than travel in a straight line?',
            options: [
                'Gravity pulls the wave downward as it travels',
                'Speed rises with depth, so the deeper end of a wavefront outruns the shallower end and rotates it',
                'The Earth\'s rotation deflects it',
                'It reflects repeatedly off layers'
            ],
            correctIndex: 1,
            hint: 'A wavefront travelling diagonally has its two ends at different depths.',
            explanation: 'Deeper rock is stiffer and denser, so sound moves faster in it — about 8 km/s near the top of the mantle to 13 km/s at its base. One end of a wavefront moving faster than the other turns the line, and the ray turns with it. Since the deep end is faster, every downward ray is bent back towards the surface.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Hydrogen\'s energy levels are E(n) = −13.6/n² eV. Why do the spectral lines crowd together towards the blue?',
            options: [
                'Because blue light carries more energy',
                'Because 1/n² makes the levels crowd towards zero, so jumps from high levels are nearly the same size',
                'Because the atom gets hotter at higher levels',
                'Because there are more electrons at high levels'
            ],
            correctIndex: 1,
            hint: 'Work out the step from n=1 to 2, then from n=5 to 6.',
            explanation: 'The first step is 10.2 eV; the step from n=5 to n=6 is 0.17 eV — sixty times smaller. The rungs bunch towards zero, so drops from high levels release almost identical energies and their lines pile up towards a limit at 364.7 nm.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Acoustic impedance is Z = density × speed. What makes an ultrasound echo?',
            options: [
                'A large value of Z on the far side',
                'A difference in Z between the two sides — equal impedances make no echo at all',
                'A small value of Z on the near side',
                'Any boundary, regardless of the materials'
            ],
            correctIndex: 1,
            hint: 'How much reflects at a bone-to-bone boundary?',
            explanation: 'Bone-to-bone reflects nothing, because there is no boundary there — it is one continuous material. Air-to-air likewise. There is no such thing as a reflective material, only a mismatched pair: reflected fraction = ((Z₂−Z₁)/(Z₂+Z₁))².'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Beyond 103 degrees of arc, no S-wave is recorded anywhere on Earth. What does that prove, and why?',
            options: [
                'There is a hole at the centre of the Earth',
                'The outer core is liquid, because an S-wave shears material sideways and a liquid has no shear strength',
                'S-waves are simply too weak to travel that far',
                'The core is solid and reflects them all'
            ],
            correctIndex: 1,
            hint: 'What has to happen for a sideways shove to be passed on?',
            explanation: 'An S-wave needs the material to spring back when pushed sideways. A liquid flows instead, so there is nothing to hand the shake onward and the wave dies. A hole is ruled out because P-waves do get through — they reappear beyond 142 degrees, so the core is full of something.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Predict hydrogen\'s red line: an electron falling from n = 3 to n = 2.',
            options: [
                '13.6 × (1/4 − 1/9) = 1.889 eV, so 1240/1.889 = about 656 nm',
                '13.6 × (1/9 − 1/4) = −1.889 eV, so the line is at −656 nm',
                '13.6/3 − 13.6/2 = −2.27 eV',
                '13.6 eV, the full binding energy'
            ],
            correctIndex: 0,
            hint: 'The gap is E(n₂) − E(n₁) = 13.6 × (1/n₁² − 1/n₂²).',
            explanation: 'E(3) = −1.511 eV and E(2) = −3.400 eV, so the drop releases 1.8889 eV, and 1240/1.8889 = 656.5 nm. The measured line is at 656.3 nm — 0.03% out, which is the rounding in 1240 and 13.6. Level 2 could only say the violet jump was 1.60 times the red one \u2014 a ratio with no size attached; here both the size and the wavelength are produced from the atom.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'Soft tissue (Z = 1.63) meets liver (Z = 1.65). How much of the pulse reflects, and what does that tell you about ultrasound images?',
            options: [
                'About 1%, which is a typical organ echo',
                'About 0.0037% — an image is built out of a whisper, four-thousandths of one per cent, hugely amplified',
                'About 50%, since a boundary is a boundary',
                'Nothing, because the two values are so close'
            ],
            correctIndex: 1,
            hint: '(0.02/3.28)², then as a percentage.',
            explanation: '0.02/3.28 = 0.0061, squared is 0.0000372 — that is 0.0037%. The other 99.9963% carries straight on. Every line a scanner draws inside a body is thirty-seven millionths of the pulse, amplified enormously.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'Straight-line geometry turns the 103-degree shadow into a core radius of 3,966 km. The real core is 3,480 km. How should that 14% error be read?',
            options: [
                'As measurement scatter that better data would remove',
                'As physics: the error leans the same way every time, so it is a model fault — and it measures how fast speed rises with depth',
                'As a sign the 103-degree figure is wrong',
                'As a sign the core has no definite edge'
            ],
            correctIndex: 1,
            hint: 'What is the difference between an imprecise measurement and a wrong model?',
            explanation: 'An imprecise measurement scatters; a wrong model leans. Every earthquake gives an answer too big by about the same amount, which is never noise. Run the comparison backwards — how much curvature makes 103 degrees correspond to a 3,480 km core? — and you have measured the speed gradient thousands of kilometres below anything drillable.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Hydrogen\'s Lyman series (ending at n = 1) starts at 121.6 nm and the Paschen series (ending at n = 3) at 1,875 nm. What follows about "every element has a visible fingerprint"?',
            options: [
                'It is a law, since all elements emit visible light',
                'It is a coincidence: only the Balmer series, ending at n = 2, lands between 1.8 and 3.3 eV — shift 13.6 eV slightly and hydrogen would have no visible lines',
                'Lyman and Paschen lines are too faint to see',
                'Only hydrogen has invisible series'
            ],
            correctIndex: 1,
            hint: 'Which series falls in visible light, and how many series are there?',
            explanation: 'Lyman is ultraviolet, Paschen infrared, and there are infinitely many series. Only n₁ = 2 happens to put its jumps in the visible band. The fingerprint Level 2 matched by eye is one family out of many — and instruments that read ultraviolet and infrared are reading the rest of the same ladder.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'A pulse crosses eight soft-tissue boundaries, each reflecting 0.0037%. How much is still travelling, and why does that matter?',
            options: [
                'About 70%, so depth is limited by reflection',
                'About 99.97% — and that is why ultrasound works at all: a strong reflector would show the first boundary brilliantly and nothing behind it',
                'About 0.03%, since the losses multiply away',
                'Exactly 100%, because reflection removes nothing'
            ],
            correctIndex: 1,
            hint: '0.999963 to the eighth power.',
            explanation: '0.0037% is 0.000037 as a fraction, so each boundary passes 0.999963 on and eight give 0.9997. If organ boundaries reflected 50% like a lung, the eighth boundary would see 0.4% of the pulse and deep echoes would drown under shallow ones. Faintness is not the price of the method — it is the method, the same reversal as a cell\'s tiny ATP store making its sensor sharp.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'A galaxy shows hydrogen-like lines at 666.1, 493.4 and 440.5 nm instead of 656.3, 486.1 and 434.0. Is it hydrogen?',
            options: [
                'No — hydrogen\'s levels are fixed, so the lines cannot move',
                'Yes. All three ratios are 1.0150, so the pattern is intact and only the scale changed — a redshift of about 4,500 km/s',
                'No, it must be an element with a similar structure',
                'Impossible to say without more lines'
            ],
            correctIndex: 1,
            hint: 'Divide each observed wavelength by the laboratory one.',
            explanation: '666.1/656.3, 493.4/486.1 and 440.5/434.0 all give 1.0150. A different element would change the pattern — different gaps, different spacings — not rescale it uniformly. Three lines agreeing to four figures on one factor is not coincidence. The pattern identifies the element; the stretch measures the motion.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'Hospitals use gas microbubbles as an ultrasound contrast agent rather than dense, stiff particles. Blood is Z = 1.61. Why are bubbles better on physics alone?',
            options: [
                'Dense particles reflect more, so bubbles must be chosen purely for safety',
                'Because the formula divides by the sum: blood to bone is 6.19/9.41 squared, about 43%, while blood to gas is a ratio of essentially one, over 99.9%',
                'Because bubbles are larger than a wavelength',
                'Because gas transmits sound faster than bone'
            ],
            correctIndex: 1,
            hint: 'Compare ((Z₂−Z₁)/(Z₂+Z₁))² for Z₂ = 7.80 and Z₂ = 0.0004.',
            explanation: 'Going far down beats going somewhat up, because the denominator is the sum: a far side of 7.80 gives a big difference and a big sum, while a far side near zero gives a ratio of essentially one. No solid material can get near zero impedance. "Bone is the strongest reflector" is the slip — bone is the biggest Z, air is the biggest mismatch, and mismatch is what reflects.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'All three Level 3 lessons turn on the same word. What is the shared idea, and what does it imply about these instruments?',
            options: [
                'All three measure energy, so all three need a calibration',
                'All three read a difference — in wave speed, in electron energy, in impedance — so each is blind to sameness and sensitive only to change',
                'All three measure a distance by timing a wave',
                'All three depend on the speed of light'
            ],
            correctIndex: 1,
            hint: 'What would each instrument learn from a perfectly uniform sample?',
            explanation: 'A seismometer learns nothing from rock of constant speed, a spectroscope nothing from evenly spaced levels, a scanner nothing from uniform tissue. Waves do not reveal what is there; they reveal where it changes — which is enough, because what we wanted to know about the Earth, an atom and a body is all a matter of where they change.'
        }
    ]
};

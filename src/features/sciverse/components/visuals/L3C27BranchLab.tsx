import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// Two things to see, and neither is a graph. On the left the slice of bread, sized by
// the starch dial, because the count is simply proportional to it. On the right ONE
// branch point drawn large: a main chain whose joins carry scissor ticks because amylase
// cuts them, and a side chain whose join carries a cross because it cannot. Drawing the
// real spacing is impossible -- 25 beads of chain per branch will not fit legibly -- so
// the picture shows what a branch IS and a share bar beneath it carries how many, which
// is what the spacing dial moves.
const GLU = 180;
const WATER = 18;
const UNIT = GLU - WATER;      // a glucose unit inside a chain, g/mol
const NA = 6.02e23;
const BRANCHED = 0.75;         // about three quarters of starch is the branched kind
const CRUST = '#b45309';
const CRUMB = '#fde68a';
const CHAIN = '#047857';
const CUT = '#0f172a';
const STUCK = '#be123c';

const starchOf = (dial: number): number => Math.max(5, Math.min(40, Math.round(dial)));
const spacingOf = (dial: number): number => Math.max(15, Math.min(40, Math.round(dial)));

export const L3C27BranchLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const grams = starchOf(raw);
        const spacing = spacingOf(raw2);
        const moles = grams / UNIT;
        const bonds = moles * NA;
        const share = BRANCHED / spacing;
        const stuck = bonds * share;
        const power = (x: number) => {
            const e = Math.floor(Math.log10(x));
            const m = x / Math.pow(10, e);
            const sup = String(e).split('').map(d => '⁰¹²³⁴⁵⁶⁷⁸⁹'[Number(d)]).join('');
            return m.toFixed(1) + ' x 10' + sup;
        };

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const left = 26;
        const fullW = Math.max(80, safeRight - 52);
        const band = Math.max(8, artBottom - artTop);

        // ---- the slice of bread: its area goes with the mass, so the eye compares amounts
        const sliceMax = Math.max(10, Math.min(fullW * 0.26, band * 0.62));
        const side = sliceMax * Math.sqrt(grams / 40);
        const sx = left + fullW * 0.145;
        const sy = artTop + band * 0.42;
        const r = Math.max(2, side * 0.22);
        ctx.fillStyle = CRUMB;
        ctx.strokeStyle = CRUST;
        ctx.lineWidth = Math.max(1.5, side * 0.1);
        ctx.beginPath();
        ctx.moveTo(sx - side / 2 + r, sy - side / 2);
        ctx.lineTo(sx + side / 2 - r, sy - side / 2);
        ctx.quadraticCurveTo(sx + side / 2, sy - side / 2, sx + side / 2, sy - side / 2 + r);
        ctx.lineTo(sx + side / 2, sy + side / 2);
        ctx.lineTo(sx - side / 2, sy + side / 2);
        ctx.lineTo(sx - side / 2, sy - side / 2 + r);
        ctx.quadraticCurveTo(sx - side / 2, sy - side / 2, sx - side / 2 + r, sy - side / 2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // ---- one branch point, drawn large
        const cxZone = left + fullW * 0.62;
        const zoneW = fullW * 0.68;
        const beads = 7;
        const bead = Math.max(2.5, Math.min(zoneW / (beads + 2) / 2.2, band * 0.1, 11));
        const step = bead * 2.9;
        const chainY = artTop + band * 0.4;
        const firstX = cxZone - step * (beads - 1) / 2;
        const bx = (i: number) => firstX + step * i;

        // the joins along the chain -- the ones amylase cuts
        ctx.strokeStyle = CHAIN;
        ctx.lineWidth = Math.max(1.4, bead * 0.3);
        for (let i = 0; i < beads - 1; i++) {
            ctx.beginPath();
            ctx.moveTo(bx(i) + bead, chainY);
            ctx.lineTo(bx(i + 1) - bead, chainY);
            ctx.stroke();
        }
        // scissor ticks on them, so "cuttable" is drawn rather than asserted
        if (bead >= 4) {
            ctx.strokeStyle = CUT;
            ctx.lineWidth = 1.3;
            for (let i = 0; i < beads - 1; i++) {
                if (i === 3) continue;             // the branch join is not one of these
                const mx = (bx(i) + bx(i + 1)) / 2;
                const wob = Math.sin(t * 2.4 + i) * 1.1;
                ctx.beginPath();
                ctx.moveTo(mx - 3, chainY - bead * 0.9 + wob);
                ctx.lineTo(mx + 3, chainY - bead * 0.3 + wob);
                ctx.moveTo(mx + 3, chainY - bead * 0.9 + wob);
                ctx.lineTo(mx - 3, chainY - bead * 0.3 + wob);
                ctx.stroke();
            }
        }

        // the side chain, hanging off the middle bead
        const stemX = bx(3);
        const stemStep = step * 0.86;
        ctx.strokeStyle = STUCK;
        ctx.lineWidth = Math.max(1.4, bead * 0.3);
        ctx.beginPath();
        ctx.moveTo(stemX, chainY + bead);
        ctx.lineTo(stemX, chainY + stemStep - bead);
        ctx.stroke();
        for (let k = 1; k <= 2; k++) {
            ctx.strokeStyle = CHAIN;
            ctx.beginPath();
            ctx.moveTo(stemX + (k - 1) * stemStep + bead, chainY + stemStep);
            ctx.lineTo(stemX + k * stemStep - bead, chainY + stemStep);
            ctx.stroke();
        }
        // a cross on the branch join: amylase cannot touch it
        if (bead >= 4) {
            const my = chainY + stemStep / 2;
            ctx.strokeStyle = STUCK;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(stemX - 4, my - 4);
            ctx.lineTo(stemX + 4, my + 4);
            ctx.moveTo(stemX + 4, my - 4);
            ctx.lineTo(stemX - 4, my + 4);
            ctx.stroke();
        }

        // the glucose units themselves
        const dot = (gx: number, gy: number) => {
            ctx.fillStyle = CHAIN;
            ctx.beginPath();
            ctx.arc(gx, gy, bead, 0, Math.PI * 2);
            ctx.fill();
        };
        for (let i = 0; i < beads; i++) dot(bx(i), chainY);
        for (let k = 0; k <= 2; k++) dot(stemX + k * stemStep, chainY + stemStep);

        // ---- how many of all the joins are that kind
        const barY = Math.min(artBottom - 4, chainY + stemStep + bead + 16);
        const barW = Math.max(30, zoneW * 0.8);
        const barX = cxZone - barW / 2;
        const barH = Math.max(4, Math.min(band * 0.07, 10));
        if (barY + barH <= artBottom) {
            ctx.fillStyle = '#d1fae5';
            ctx.fillRect(barX, barY, barW, barH);
            ctx.fillStyle = STUCK;
            ctx.fillRect(barX, barY, Math.max(1.5, barW * share * 6), barH);
            ctx.strokeStyle = '#475569';
            ctx.lineWidth = 1;
            ctx.strokeRect(barX, barY, barW, barH);
        }

        if (band >= 92) {
            outlineText(ctx, grams + ' g starch', left + 2, sy + side / 2 + 13,
                'bold 10px monospace', CRUST, 'left', fullW * 0.45);
            outlineText(ctx, 'amylase cuts these', cxZone, Math.max(artTop + 9, chainY - bead - 9),
                'bold 10px monospace', CUT, 'center', zoneW);
            outlineText(ctx, 'cannot cut', stemX + bead + 4,
                Math.min(artBottom - 2, chainY + stemStep + bead + 2),
                'bold 10px monospace', STUCK, 'left',
                Math.max(20, left + fullW - (stemX + bead + 4)));
            if (barY + barH + 15 <= artBottom) {
                outlineText(ctx, (share * 100).toFixed(1) + '% are branches',
                    barX, barY + barH + 11, 'bold 10px monospace', STUCK, 'left', barW + 40);
            }
        }

        outlineText(ctx, '180 - 18 = 162 g per mole',
            safeRight / 2, stageBottom - 34, 'bold 12px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, grams + ' / 162 x 6.02 x 10²³',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', CHAIN, 'center', safeRight - 30);

        fitText(ctx, power(bonds) + ' bonds', safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Counting the joins in starch', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, share / 0.06)),
                caption: 'Joins Amylase Cannot Cut',
                low: 'nearly all cuttable',
                high: '5% of joins stuck',
                stops: [CHAIN, '#fcd34d', STUCK] as [string, string, string],
            },
            note: grams + ' g of starch is ' + grams + '/162 = ' + moles.toFixed(3)
                + ' mol of glucose units, so about ' + power(bonds)
                + ' joins. With a branch every ' + spacing + ' units, '
                + (share * 100).toFixed(1) + '% of them are the sideways kind -- about '
                + power(stuck) + ' that amylase can never cut.',
        };
    };

    return (
        <LabCanvas
            title="Where the Bond Count Comes From"
            readout={({ raw }) => starchOf(raw) + ' g of starch'}
            controlLabel="Starch"
            controlKey="starchGrams"
            controlMin={5}
            controlMax={40}
            controlInitial={15}
            controlDisplay={raw => starchOf(raw) + ' g'}
            control2={{
                label: 'Branch Spacing',
                key: 'branchSpacing',
                min: 15,
                max: 40,
                initial: 25,
                display: raw => 'every ' + spacingOf(raw) + ' units',
            }}
            accent="emerald"
            sky={['#ecfdf5', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="How Does Food Become Usable Energy?"
            completeNote="An enzyme is a shape, not an effort!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};

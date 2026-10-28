import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// Two materials meeting, and one number: how much of the pulse turns round. Named
// tissues rather than a bare impedance dial, because 0.0004 to 7.80 MRayl means
// nothing until it is air against bone.
//
// A reader reported that the words did not change with the dials and that the canvas
// insisted there was no echo. The second footer was a CONSTANT -- 'equal on both sides
// and there is no echo at all' -- printed whatever the dials said, so at the opening
// setting of soft tissue against liver it flatly contradicted the line above it, which
// read 0.0037%. There is an echo in 56 of the 64 dial combinations; only the 8 where
// both sides pick the same tissue have none. Both footers are now computed.
//
// Every string was also far too long to render. At the common 240px panel five of the
// seven were shrunk to 8-10px by outlineText and two still overflowed, so the lab was a
// wall of illegible type. The budget is about 32 characters at 11px and 29 at 12px, and
// nothing here exceeds it now.
const TISSUES: [string, number][] = [
    ['air', 0.0004], ['lung', 0.26], ['fat', 1.38], ['water', 1.48],
    ['soft tissue', 1.63], ['liver', 1.65], ['muscle', 1.70], ['bone', 7.80],
];
const ROSE = '#e11d48';
const WALL = '#7f1d1d';

// air is 0.0004 MRayl, and two decimal places turn that into a flat 0.00
const fmt = (z: number): string => z < 0.01 ? z.toFixed(4) : z.toFixed(2);

const pick = (dial: number): [string, number] =>
    TISSUES[Math.max(0, Math.min(TISSUES.length - 1, Math.round(dial)))];

const reflectPct = (z1: number, z2: number): number =>
    Math.pow((z2 - z1) / (z2 + z1), 2) * 100;

// The echoes this has to show run from 0.0037% to 99.9%, so the gauge is stretched
// across seven powers of ten. The lesson says so.
const meterFrac = (pct: number): number =>
    Math.max(0, Math.min(1, (Math.log(Math.max(pct, 1e-5)) / Math.LN10 + 5) / 7));

export const L3B22ImpedanceLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const [nearName, z1] = pick(raw);
        const [farName, z2] = pick(raw2);
        const pct = reflectPct(z1, z2);
        const passed = 100 - pct;
        const same = Math.abs(z2 - z1) < 1e-9;
        const wall = pct > 20;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = Math.max(6, artBottom - artTop);
        // the caption and the three rows under the boxes come out of the height that
        // exists; a floor on the box silently overran a phone-height stage
        const CAP = usable >= 46 ? 14 : 0;
        const ROW = 13;
        const rows = Math.max(0, Math.min(3, Math.floor((usable - 30 - CAP) / ROW)));
        const TAIL = rows * ROW;
        const boxH = Math.max(4, Math.min(96, usable - CAP - TAIL));
        const blockH = CAP + boxH + TAIL;
        const top = artTop + Math.max(0, (usable - blockH) / 2);
        const boxTop = top + CAP;
        const midY = boxTop + boxH / 2;

        const left = 18;
        const fullW = Math.max(100, safeRight - 36);
        const half = fullW / 2;

        // the two materials, pale for low impedance and dark for high
        const shade = (z: number) => {
            const f = Math.max(0, Math.min(1, Math.log(Math.max(z, 0.0004) / 0.0004) / Math.log(7.8 / 0.0004)));
            const tone = Math.round(255 - f * 120);
            return 'rgb(' + tone + ',' + Math.round(tone * 0.86) + ','
                + Math.round(tone * 0.9) + ')';
        };
        ctx.fillStyle = shade(z1);
        ctx.fillRect(left, boxTop, half, boxH);
        ctx.fillStyle = shade(z2);
        ctx.fillRect(left + half, boxTop, half, boxH);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        ctx.strokeRect(left, boxTop, fullW, boxH);
        // the boundary: the only place anything happens
        ctx.strokeStyle = same ? '#cbd5e1' : '#0f172a';
        ctx.lineWidth = same ? 1 : 2.5;
        if (same) ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(left + half, boxTop); ctx.lineTo(left + half, boxTop + boxH);
        ctx.stroke();
        ctx.setLineDash([]);

        // in, back and on, each as thick as its share
        const thick = (share: number) => Math.max(1.2, Math.min(8, 1.2 + share * 7));
        const march = (t * 40) % 24;
        ctx.strokeStyle = ROSE;
        ctx.lineWidth = thick(1);
        ctx.beginPath();
        ctx.moveTo(left + 4, midY - 9);
        ctx.lineTo(left + half - 4, midY - 9);
        ctx.stroke();
        ctx.lineWidth = thick(pct / 100);
        ctx.strokeStyle = wall ? WALL : ROSE;
        ctx.beginPath();
        ctx.moveTo(left + half - 4 - march * 0.2, midY + 9);
        ctx.lineTo(left + 4, midY + 9);
        ctx.stroke();
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = thick(passed / 100);
        ctx.beginPath();
        ctx.moveTo(left + half + 4, midY - 9);
        ctx.lineTo(left + fullW - 4, midY - 9);
        ctx.stroke();

        // the rule in words, so the two footers below are a worked instance of it
        if (CAP > 0) {
            outlineText(ctx, 'echo = (difference / sum)²', safeRight / 2, top + 10,
                'bold 11px monospace', '#334155', 'center', safeRight - 24);
        }
        // the name and the value on separate rows: together they need 16 characters,
        // which does not fit the half-width either side of the boundary
        const rowY = (i: number) => boxTop + boxH + 11 + i * ROW;
        if (rows >= 1) {
            outlineText(ctx, nearName, left + half / 2, rowY(0),
                'bold 11px monospace', '#0f172a', 'center', half);
            outlineText(ctx, farName, left + half + half / 2, rowY(0),
                'bold 11px monospace', '#0f172a', 'center', half);
        }
        if (rows >= 2) {
            outlineText(ctx, fmt(z1), left + half / 2, rowY(1),
                'bold 11px monospace', '#334155', 'center', half);
            outlineText(ctx, fmt(z2), left + half + half / 2, rowY(1),
                'bold 11px monospace', '#334155', 'center', half);
        }
        if (rows >= 3) {
            outlineText(ctx, same ? 'no boundary: no echo'
                : pct < 0.01 ? 'faint: the pulse goes deeper'
                    : pct < 5 ? 'a boundary you can see'
                        : pct < 60 ? 'a wall: the image stops'
                            : 'nothing gets in: no scan',
                safeRight / 2, rowY(2),
                'bold 12px monospace', same ? '#64748b' : (wall ? WALL : ROSE), 'center', safeRight - 24);
        }

        outlineText(ctx, 'difference ' + fmt(Math.abs(z2 - z1)) + ', sum ' + fmt(z1 + z2),
            safeRight / 2, stageBottom - 34, 'bold 12px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, same ? 'equal sides, so no echo'
            : '(' + fmt(Math.abs(z2 - z1)) + ' / ' + fmt(z1 + z2) + ')² = ' + pct.toFixed(4) + '%',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace',
            same ? '#64748b' : ROSE, 'center', safeRight - 30);

        fitText(ctx, 'reflects ' + pct.toFixed(4) + '%', safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Blind to sameness', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: meterFrac(pct),
                caption: 'Pulse Reflected (stretched)',
                low: 'faint: you see deeper',
                high: 'total: no scan',
                stops: ['#fff1f2', '#fda4af', ROSE] as [string, string, string],
            },
            note: nearName + ' at ' + z1.toFixed(2) + ' meeting ' + farName + ' at '
                + z2.toFixed(2) + ' MRayl reflects ' + pct.toFixed(4)
                + '% of the pulse. ' + (same
                    ? 'Equal impedances make no echo at all.'
                    : 'The rest carries on deeper.'),
        };
    };

    return (
        <LabCanvas
            title="Why There Is an Echo at All"
            readout={({ raw }) => 'A pulse in ' + pick(raw)[0]}
            controlLabel="Near Side"
            controlKey="nearZ"
            controlMin={0}
            controlMax={7}
            controlInitial={4}
            controlDisplay={raw => pick(raw)[1].toFixed(2) + ' MRayl (' + pick(raw)[0] + ')'}
            control2={{
                label: 'Far Side',
                key: 'farZ',
                min: 0,
                max: 7,
                initial: 5,
                display: raw => pick(raw)[1].toFixed(2) + ' MRayl (' + pick(raw)[0] + ')',
            }}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="How Do Waves Help Us See the Invisible?"
            completeNote="No mismatch, no echo!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};

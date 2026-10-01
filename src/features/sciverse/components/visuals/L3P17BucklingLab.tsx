import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const E = 30000;           // N/mm2, the stiffness of concrete
const CRUSH_STRESS = 30;   // N/mm2
const INDIGO = '#4338ca';
const BEND = '#b91c1c';

const heightOf = (dial: number): number => Math.max(2, Math.min(10, Math.round(dial * 2) / 2));
const widthOf = (dial: number): number => Math.max(100, Math.min(400, Math.round(dial / 10) * 10));
const bucklingOf = (mm: number, metres: number): number => {
    const I = Math.pow(mm, 4) / 12;
    const L = metres * 1000;
    return (Math.PI * Math.PI * E * I) / (L * L) / 1000;   // kN
};

export const L3P17BucklingLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const metres = heightOf(raw);
        const mm = widthOf(raw2);
        const buckle = bucklingOf(mm, metres);
        const crush = (CRUSH_STRESS * mm * mm) / 1000;
        const buckles = buckle < crush;
        const governs = Math.min(buckle, crush);

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const labelTail = Math.max(16, Math.min(24, usable * 0.12));
        const colH = Math.max(40, Math.min(usable - labelTail - 8, usable * 0.74));
        const blockH = colH + labelTail;
        const top = artTop + Math.max(0, (usable - blockH) / 2);
        const colW = Math.max(6, Math.min(safeRight * 0.22, (mm / 400) * safeRight * 0.22));
        const cx = safeRight / 2;

        // the column, bowed when buckling is the failure that arrives first
        const bow = buckles ? Math.min(colW * 2.2, (1 - buckle / crush) * colW * 3 + 6) : 0;
        ctx.fillStyle = buckles ? '#fee2e2' : '#e0e7ff';
        ctx.strokeStyle = buckles ? BEND : INDIGO;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx - colW / 2, top);
        ctx.quadraticCurveTo(cx - colW / 2 + bow, top + colH / 2, cx - colW / 2, top + colH);
        ctx.lineTo(cx + colW / 2, top + colH);
        ctx.quadraticCurveTo(cx + colW / 2 + bow, top + colH / 2, cx + colW / 2, top);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        outlineText(ctx, 'height ' + metres.toFixed(1) + ' m, width ' + mm + ' mm', cx,
            Math.min(top + colH + labelTail, artBottom),
            'bold 11px monospace', '#334155', 'center', safeRight - 30);
        outlineText(ctx, buckles ? 'it buckles' : 'it crushes', cx, top + colH / 2 + 4,
            'bold 11px monospace', buckles ? BEND : INDIGO, 'center', safeRight * 0.5);

        outlineText(ctx, 'buckling ' + buckle.toFixed(0) + ' kN, crushing '
            + crush.toFixed(0) + ' kN, so it fails at ' + governs.toFixed(0) + ' kN',
            safeRight / 2, stageBottom - 34, 'bold 12px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, buckles
            ? 'buckling comes first: height is squared, and underneath'
            : 'crushing comes first: this column is short enough',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', buckles ? BEND : INDIGO,
            'center', safeRight - 30);

        fitText(ctx, 'it fails at ' + governs.toFixed(0) + ' kN', safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Two failures, and the lower one wins', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, crush / (buckle + crush))),
                caption: 'Which Failure Comes First',
                low: 'crushing',
                high: 'buckling',
                stops: ['#eef2ff', '#fcd34d', BEND] as [string, string, string],
            },
            note: 'A ' + mm + ' mm column ' + metres.toFixed(1)
                + ' m tall buckles at ' + buckle.toFixed(0)
                + ' kN and crushes at ' + crush.toFixed(0) + ' kN, so it fails at '
                + governs.toFixed(0) + ' kN by ' + (buckles ? 'buckling' : 'crushing'),
        };
    };

    return (
        <LabCanvas
            title="When Tall Columns Bend"
            readout={({ raw }) => 'A column ' + heightOf(raw).toFixed(1) + ' m tall'}
            controlLabel="Column Height"
            controlKey="bucklingHeight"
            controlMin={2}
            controlMax={10}
            controlInitial={3}
            controlDisplay={raw => heightOf(raw).toFixed(1) + ' m'}
            control2={{
                label: 'Column Width',
                key: 'bucklingWidth',
                min: 100,
                max: 400,
                initial: 200,
                display: raw => widthOf(raw) + ' mm',
            }}
            accent="indigo"
            sky={['#eef2ff', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="When Tall Columns Bend"
            completeNote="Height squared, and stiffness not strength!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};

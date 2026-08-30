import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** How many litres must be filtered before this animal's traces turn up.
 *  Common animals shed constantly; a single otter that swam past once barely
 *  registers, so it sits at the far end of the slider. */
const TRACES: { icon: string; name: string; litres: number }[] = [
    { icon: '🐸', name: 'frog', litres: 1 },
    { icon: '🐟', name: 'fish', litres: 3 },
    { icon: '🦆', name: 'duck', litres: 7 },
    { icon: '🦗', name: 'dragonfly', litres: 14 },
    { icon: '🦎', name: 'newt', litres: 25 },
    { icon: '🦦', name: 'otter', litres: 40 },
];

export const C48TraceLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, t, stageTop, stageBottom }: LabScene) => {
        const litres = Math.round(raw);
        const found = TRACES.filter(a => litres >= a.litres);

        const jarW = Math.min(150, safeRight * 0.28);
        const jarX = 56;
        const jarTop = stageTop + 44;
        const jarBottom = stageBottom - 54;
        const jarH = Math.max(120, jarBottom - jarTop);

        // The jar
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 3;
        ctx.strokeRect(jarX, jarTop, jarW, jarH);

        // Water, rising with the amount tested
        const fill = litres / 50;
        const waterTop = jarBottom - jarH * fill;
        ctx.fillStyle = 'rgba(56,189,248,0.35)';
        ctx.fillRect(jarX + 2, waterTop, jarW - 4, jarBottom - waterTop);
        ctx.strokeStyle = '#0284c7';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(jarX + 2, waterTop);
        ctx.lineTo(jarX + jarW - 2, waterTop);
        ctx.stroke();

        // Floating traces -- more water holds more of them
        const specks = Math.round(6 + fill * 60);
        for (let i = 0; i < specks; i++) {
            const px = jarX + 8 + ((i * 37) % (jarW - 16));
            const drift = ((i * 53) % 100) / 100;
            const py = waterTop + 8 + ((drift * (jarBottom - waterTop - 14) + t * 14) % Math.max(10, jarBottom - waterTop - 14));
            ctx.fillStyle = 'rgba(15,23,42,0.45)';
            ctx.beginPath();
            ctx.arc(px, py, 1.8, 0, Math.PI * 2);
            ctx.fill();
        }
        outlineText(ctx, 'tiny bits floating', jarX + jarW / 2, jarBottom + 20, 'bold 12px monospace');

        // What the filter caught
        const listX = jarX + jarW + 40;
        const rowH = Math.min(34, (jarH - 10) / TRACES.length);
        ctx.textAlign = 'left';
        TRACES.forEach((a, i) => {
            const y = jarTop + 18 + i * rowH;
            const got = litres >= a.litres;
            ctx.globalAlpha = got ? 1 : 0.28;
            ctx.font = '18px serif';
            ctx.fillText(a.icon, listX, y + 5);
            ctx.font = got ? 'bold 14px monospace' : '14px monospace';
            ctx.fillStyle = got ? '#166534' : '#475569';
            ctx.fillText(a.name, listX + 28, y + 4);
            if (!got) {
                ctx.font = '11px monospace';
                ctx.fillStyle = '#64748b';
                ctx.fillText(`needs ${a.litres} litres`, listX + 110, y + 4);
            }
            ctx.globalAlpha = 1;
        });
        ctx.textAlign = 'center';

        fitText(ctx, `${found.length} of ${TRACES.length} kinds caught in the filter`,
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Rare animals leave the fewest traces, so they turn up last',
            safeRight / 2, 118, safeRight - 24, 13);

        const note = litres < 7
            ? 'A small jar catches the common animals only.'
            : litres < 25
                ? 'More water tested, and rarer animals start turning up.'
                : 'A bucketful, and even a single otter that swam past is caught.';
        return {
            meter: {
                fraction: found.length / TRACES.length,
                caption: 'Kinds of Animal Found',
                low: 'Almost none',
                high: 'Nearly all',
            },
            note,
        };
    };

    return (
        <LabCanvas
            title="Traces in the Water"
            readout={({ raw }) => `${Math.round(raw)} litres of pond water put through the filter`}
            controlLabel="Water Tested"
            controlKey="waterTested"
            controlMin={1}
            controlMax={50}
            controlInitial={5}
            controlDisplay={raw => `${Math.round(raw)} litres`}
            accent="emerald"
            sky={['#f0f9ff', '#f8fafc']}
            completeTitle="C48 Complete!"
            completeSubtitle="How Do We Keep Track of Wildlife?"
            completeNote="Animals leave traces, and traces do not last!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};

import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** Same stretch of country every frame, so only the dot size is changing. */
const ground = (nx: number, ny: number): string => {
    // A river winding across
    const river = 0.58 + 0.11 * Math.sin(nx * 6.5);
    if (Math.abs(ny - river) < 0.045) return '#38bdf8';
    // A road: thin enough that only fine dots can show it
    const road = 0.28 + 0.03 * nx;
    if (Math.abs(ny - road) < 0.008) return '#57534e';
    // Forest and fields
    const n = Math.abs(Math.sin(nx * 12.9898 + ny * 78.233) * 43758.5453 % 1);
    const patch = Math.sin(nx * 4.1) * Math.cos(ny * 5.3);
    if (patch > 0.05 && n > 0.25) return n > 0.6 ? '#14532d' : '#166534';
    return n > 0.55 ? '#a3a375' : n > 0.3 ? '#84cc16' : '#bef264';
};

export const B50DetailLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, stageTop, stageBottom }: LabScene) => {
        const metres = Math.max(1, Math.round(raw));
        const top = stageTop + 34;
        const bottom = stageBottom - 42;
        const h = bottom - top;
        // Each screen block is one dot of the satellite picture.
        const block = 2 + Math.sqrt(metres / 1000) * 38;

        for (let y = top; y < bottom; y += block) {
            for (let x = 0; x < safeRight; x += block) {
                const nx = (x + block / 2) / safeRight;
                const ny = (y + block / 2 - top) / h;
                ctx.fillStyle = ground(nx, Math.min(1, Math.max(0, ny)));
                ctx.fillRect(x, y, block + 0.6, block + 0.6);
            }
        }

        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 2;
        ctx.strokeRect(0, top, safeRight, h);

        outlineText(ctx, `one dot of the picture, covering ${metres} metres of real ground`,
            safeRight / 2, stageBottom - 18, 'bold 13px monospace');

        const verdict = metres >= 400
            ? 'Whole forests only. The road is far too thin to show.'
            : metres >= 90
                ? 'The shape of the forest and the river, but no road yet.'
                : metres >= 20
                    ? 'Individual fields, and the new road cut through the forest.'
                    : 'Sharp enough to pick out single trees.';

        fitText(ctx, `Each dot covers ${metres} metre${metres === 1 ? '' : 's'}`,
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, verdict, safeRight / 2, 118, safeRight - 24, 13);

        const note = metres >= 400
            ? 'Coarse, but this satellite looks every day -- perfect for watching a country turn green.'
            : metres >= 90
                ? 'Enough to watch a forest shrink or grow back over the years.'
                : metres >= 20
                    ? 'Fine enough to spot a new road. This one returns only every few days.'
                    : 'The sharpest pictures come from low satellites, which rarely come back.';
        return {
            meter: {
                fraction: 1 - Math.sqrt(metres / 1000),
                caption: 'How Much Detail',
                low: 'Whole forests only',
                high: 'Single trees',
            },
            note,
        };
    };

    return (
        <LabCanvas
            title="Watching Life from Space"
            readout={({ raw }) => `Every dot in the picture covers ${Math.max(1, Math.round(raw))} metres of ground`}
            controlLabel="Picture Detail"
            controlKey="pictureDetail"
            controlMin={1}
            controlMax={1000}
            controlInitial={1000}
            controlDisplay={raw => `${Math.max(1, Math.round(raw))} metres per dot`}
            accent="rose"
            sky={['#f0fdf4', '#f8fafc']}
            completeTitle="B50 Complete!"
            completeSubtitle="How Do Satellites Help Life on Earth?"
            completeNote="Satellites measure the home, not the animals!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};

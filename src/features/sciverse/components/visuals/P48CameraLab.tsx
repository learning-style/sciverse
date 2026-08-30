import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** Kinds of species is a group of animals with the same icon. */
interface Resident {
    kind: number;
    icon: string;
    /** Position across the wood, 0..1 in each direction. */
    nx: number;
    ny: number;
}

const KINDS: { icon: string; count: number }[] = [
    { icon: '🐁', count: 9 }, { icon: '🐦', count: 7 }, { icon: '🐛', count: 6 },
    { icon: '🐿', count: 5 }, { icon: '🦌', count: 4 }, { icon: '🐇', count: 4 },
    { icon: '🦊', count: 3 }, { icon: '🦇', count: 3 }, { icon: '🦡', count: 2 },
    { icon: '🦉', count: 2 }, { icon: '🦔', count: 1 }, { icon: '🦆', count: 1 },
];

/** Fixed scatter, so the wood looks the same every frame and every visit. */
const RESIDENTS: Resident[] = (() => {
    let seed = 20480;
    const next = (): number => {
        seed = (seed * 1103515 + 12345) % 2147483648;
        return seed / 2147483648;
    };
    const out: Resident[] = [];
    KINDS.forEach((k, kind) => {
        for (let i = 0; i < k.count; i++) {
            out.push({ kind, icon: k.icon, nx: 0.04 + next() * 0.92, ny: 0.06 + next() * 0.88 });
        }
    });
    return out;
})();

export const P48CameraLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, stageTop, stageBottom }: LabScene) => {
        const cameras = Math.round(raw);
        const woodX = 46;
        const woodY = stageTop + 36;
        const woodW = safeRight - 92;
        const woodH = Math.max(140, stageBottom - woodY - 62);

        // The wood
        ctx.fillStyle = '#dcfce7';
        ctx.fillRect(woodX, woodY, woodW, woodH);
        ctx.strokeStyle = '#166534';
        ctx.lineWidth = 3;
        ctx.strokeRect(woodX, woodY, woodW, woodH);

        // Cameras laid out on as square a grid as the number allows, so adding
        // cameras spreads them rather than bunching them in one corner.
        const cols = Math.ceil(Math.sqrt(cameras));
        const rows = Math.ceil(cameras / cols);
        const radius = Math.max(26, Math.min(woodW, woodH) * 0.13);
        const spots: { x: number; y: number }[] = [];
        for (let i = 0; i < cameras; i++) {
            const c = i % cols;
            const r = Math.floor(i / cols);
            spots.push({
                x: woodX + (woodW * (c + 0.5)) / cols,
                y: woodY + (woodH * (r + 0.5)) / rows,
            });
        }

        // Which kinds any camera can see
        const seen = new Set<number>();
        RESIDENTS.forEach((a: Resident) => {
            const ax = woodX + a.nx * woodW;
            const ay = woodY + a.ny * woodH;
            if (spots.some(s => Math.hypot(s.x - ax, s.y - ay) <= radius)) seen.add(a.kind);
        });

        // What each camera watches
        spots.forEach(s => {
            ctx.fillStyle = 'rgba(37,99,235,0.14)';
            ctx.beginPath();
            ctx.arc(s.x, s.y, radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#2563eb';
            ctx.lineWidth = 2;
            ctx.stroke();
        });

        // The animals: bright where a camera can reach them, faint where not
        RESIDENTS.forEach((a: Resident) => {
            const ax = woodX + a.nx * woodW;
            const ay = woodY + a.ny * woodH;
            const found = spots.some(s => Math.hypot(s.x - ax, s.y - ay) <= radius);
            ctx.globalAlpha = found ? 1 : 0.3;
            ctx.font = '19px serif';
            ctx.textAlign = 'center';
            ctx.fillText(a.icon, ax, ay + 6);
            ctx.globalAlpha = 1;
        });

        // The cameras themselves, drawn last so nothing covers them
        spots.forEach(s => {
            ctx.font = '17px serif';
            ctx.textAlign = 'center';
            ctx.fillText('📷', s.x, s.y + 6);
        });

        outlineText(ctx, 'each circle is what one camera can watch',
            safeRight / 2, stageBottom - 24, 'bold 13px monospace');

        const total = KINDS.length;
        fitText(ctx, `${seen.size} of ${total} kinds found`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'The wood never changes -- only how much of it you watch',
            safeRight / 2, 118, safeRight - 24, 13);

        const note = cameras <= 2
            ? 'One or two spots watched. Most of the wood is missed.'
            : cameras <= 10
                ? 'More cameras, spread out, and more kinds turn up.'
                : 'Nearly every kind found. New cameras now add only rare animals.';
        return {
            meter: {
                fraction: seen.size / total,
                caption: 'Kinds of Animal Found',
                low: 'Almost none',
                high: 'Nearly all',
            },
            note,
        };
    };

    return (
        <LabCanvas
            title="Where to Put the Camera"
            readout={({ raw }) => `${Math.round(raw)} camera${Math.round(raw) === 1 ? '' : 's'} watching this wood`}
            controlLabel="Number of Cameras"
            controlKey="cameras"
            controlMin={1}
            controlMax={24}
            controlInitial={3}
            controlDisplay={raw => `${Math.round(raw)} cameras`}
            accent="indigo"
            sky={['#f0fdf4', '#f8fafc']}
            completeTitle="P48 Complete!"
            completeSubtitle="How Do We Keep Track of Wildlife?"
            completeNote="More samples, spread out, gives a truer picture!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};

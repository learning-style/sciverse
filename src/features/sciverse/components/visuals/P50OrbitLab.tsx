import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const EARTH_RADIUS_KM = 6400;

export const P50OrbitLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, t, stageTop, stageBottom }: LabScene) => {
        const km = Math.round(raw);
        const groundY = stageBottom - 54;
        const ceiling = stageTop + 34;
        // Square-rooted so 400 km is still visible next to 36,000 km. The
        // readout always gives the true number.
        const satY = groundY - Math.sqrt(km / 36000) * (groundY - ceiling);

        // The ground, drawn in blocks. Coarser blocks from further away.
        const block = Math.max(3, Math.min(34, 3 + (km / 36000) * 40));
        for (let x = 0; x < safeRight; x += block) {
            const shade = ((Math.floor(x / block) * 37) % 5) / 5;
            ctx.fillStyle = shade > 0.55 ? '#4d7c0f' : shade > 0.25 ? '#65a30d' : '#a3a375';
            ctx.fillRect(x, groundY, block + 0.6, stageBottom - groundY);
        }

        // The patch of ground this satellite can see at once
        const share = Math.min(1, Math.sqrt(km / 36000) * 1.15);
        const halfPatch = (safeRight / 2) * share;
        const cx = safeRight / 2;
        ctx.fillStyle = 'rgba(56,189,248,0.20)';
        ctx.beginPath();
        ctx.moveTo(cx, satY + 10);
        ctx.lineTo(cx - halfPatch, groundY);
        ctx.lineTo(cx + halfPatch, groundY);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#0284c7';
        ctx.lineWidth = 2;
        ctx.stroke();

        // The satellite, drifting sideways to show it is going round
        const drift = Math.sin(t * 0.35) * 5;
        ctx.fillStyle = '#334155';
        ctx.fillRect(cx - 10 + drift, satY - 8, 20, 16);
        ctx.fillStyle = '#1d4ed8';
        ctx.fillRect(cx - 30 + drift, satY - 5, 17, 10);
        ctx.fillRect(cx + 13 + drift, satY - 5, 17, 10);

        outlineText(ctx, 'the patch of ground it can see at once', cx, groundY - 12, 'bold 13px monospace');

        // One lap: the further out, the longer it takes.
        const laps = 90 * Math.pow((EARTH_RADIUS_KM + km) / (EARTH_RADIUS_KM + 400), 1.5);
        const lapText = laps < 120
            ? `${Math.round(laps)} minutes for one lap`
            : `about ${Math.round(laps / 60)} hours for one lap`;

        fitText(ctx, `${km.toLocaleString()} kilometres up -- ${lapText}`, cx, 94, safeRight - 24, 16);
        fitText(ctx, 'Higher up sees far more ground at once, but far less detail',
            cx, 118, safeRight - 24, 13);

        const note = km < 2000
            ? 'Low and sharp. But it whizzes past and may not return for days.'
            : km < 20000
                ? 'Higher now. A wider patch of ground, and a coarser picture.'
                : 'One lap takes about a day, so it hangs over the same spot -- but the picture is coarse.';
        return {
            meter: {
                fraction: 1 - Math.sqrt(km / 36000),
                caption: 'How Sharp the Picture Is',
                low: 'Coarse',
                high: 'Very sharp',
            },
            note,
        };
    };

    return (
        <LabCanvas
            title="Eyes in the Sky"
            readout={({ raw }) => `Flying ${Math.round(raw).toLocaleString()} kilometres above the ground`}
            controlLabel="Orbit Height"
            controlKey="orbitHeight"
            controlMin={300}
            controlMax={36000}
            controlInitial={400}
            controlDisplay={raw => `${Math.round(raw).toLocaleString()} km up`}
            accent="indigo"
            sky={['#e0f2fe', '#f8fafc']}
            completeTitle="P50 Complete!"
            completeSubtitle="How Do Satellites Help Life on Earth?"
            completeNote="Low for detail, high for never looking away!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};

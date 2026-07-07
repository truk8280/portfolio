type TimeGraphProps = {
  // Remaining time (in seconds) recorded at each tick.
  data: number[];
  // The configured starting time (in seconds) — drawn as the "start" line.
  start: number;
};

// Clock label, e.g. 2:05 / 0:30 / 10:00.
function formatClock(sec: number) {
  const rounded = Math.max(0, Math.round(sec));
  const min = Math.floor(rounded / 60);
  const s = rounded % 60;
  return `${min}:${s.toString().padStart(2, "0")}`;
}

// SVG viewBox geometry (scales fluidly to the container width).
const W = 640;
const H = 260;
const PAD_L = 52;
const PAD_R = 16;
const PAD_T = 20;
const PAD_B = 32;
const INNER_W = W - PAD_L - PAD_R;
const INNER_H = H - PAD_T - PAD_B;
// y = 0 (time's up) is the final line, pinned to the bottom of the plot.
const BASE_Y = PAD_T + INNER_H;
// Keep the top extreme off the edge so the peak point never clips.
const PLOT_H = INNER_H * 0.9;
// Ceiling for the y axis: capped at 60 minutes.
const Y_MAX = 60 * 60;

function TimeGraph({ data, start }: TimeGraphProps) {
  const n = data.length;
  // Axis spans from 0 (final) up to the highest of the start line or any
  // recorded time, but never past the 60m cap.
  const maxVal = Math.min(Y_MAX, Math.max(1, start, ...data));
  const latest = n > 0 ? data[n - 1] : start;

  // Map a tick index (0-based) to an x pixel; ticks span the full width.
  const xPos = (i: number) =>
    n <= 1 ? PAD_L + INNER_W / 2 : PAD_L + (i / (n - 1)) * INNER_W;
  // Map a time (seconds) to a y pixel, clamped between the final floor and cap.
  const yPos = (sec: number) =>
    BASE_Y - (Math.min(maxVal, Math.max(0, sec)) / maxVal) * PLOT_H;

  const linePoints = data.map((d, i) => `${xPos(i)},${yPos(d)}`).join(" ");
  const startY = yPos(start);

  return (
    <section className="w-full">
      <p className="mb-4 font-mono text-lg text-accent">// drift</p>
      <h2 className="mb-1 text-xl font-medium text-primary">Time drift</h2>
      <p className="mb-6 text-sm text-secondary">
        Remaining time at each tick, from the start line down toward the final
        line at zero.
      </p>

      {n === 0 ? (
        <div className="flex h-40 items-center justify-center rounded-md border border-line bg-surface font-mono text-xs text-muted">
          start the timer to plot the drift
        </div>
      ) : (
        <>
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="h-auto w-full rounded-md border border-line bg-surface"
            role="img"
            aria-label={`Remaining time over ${n} tick${n === 1 ? "" : "s"}, currently ${formatClock(latest)}`}
          >
            {/* Start line = the configured starting time. */}
            <line
              x1={PAD_L}
              y1={startY}
              x2={W - PAD_R}
              y2={startY}
              style={{ stroke: "var(--color-line)" }}
              strokeDasharray="4 4"
            />
            <text
              x={PAD_L - 8}
              y={startY + 4}
              textAnchor="end"
              style={{ fill: "var(--color-muted)", fontSize: 11 }}
            >
              {formatClock(start)}
            </text>
            <text
              x={W - PAD_R}
              y={startY - 5}
              textAnchor="end"
              style={{ fill: "var(--color-secondary)", fontSize: 10 }}
            >
              start
            </text>

            {/* Final line = 0, the bottom of the plot. */}
            <line
              x1={PAD_L}
              y1={BASE_Y}
              x2={W - PAD_R}
              y2={BASE_Y}
              style={{ stroke: "var(--color-line)" }}
            />
            <text
              x={PAD_L - 8}
              y={BASE_Y + 4}
              textAnchor="end"
              style={{ fill: "var(--color-muted)", fontSize: 11 }}
            >
              0:00
            </text>
            <text
              x={W - PAD_R}
              y={BASE_Y - 5}
              textAnchor="end"
              style={{ fill: "var(--color-secondary)", fontSize: 10 }}
            >
              final
            </text>

            {/* Remaining-time line + per-tick points. */}
            <polyline
              points={linePoints}
              fill="none"
              style={{ stroke: "var(--color-accent)" }}
              strokeWidth={2}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            {data.map((d, i) => (
              <circle
                key={i}
                cx={xPos(i)}
                cy={yPos(d)}
                r={2.5}
                style={{ fill: "var(--color-accent)" }}
              />
            ))}

            {/* X axis endpoints. */}
            <text
              x={PAD_L}
              y={H - 10}
              textAnchor="start"
              style={{ fill: "var(--color-muted)", fontSize: 11 }}
            >
              tick 1
            </text>
            <text
              x={W - PAD_R}
              y={H - 10}
              textAnchor="end"
              style={{ fill: "var(--color-muted)", fontSize: 11 }}
            >
              tick {n}
            </text>
          </svg>

          <p className="mt-3 font-mono text-xs text-secondary">
            current:{" "}
            <span className="text-accent tabular-nums">
              {formatClock(latest)}
            </span>{" "}
            remaining over {n} tick{n === 1 ? "" : "s"}
          </p>
        </>
      )}
    </section>
  );
}

export default TimeGraph;

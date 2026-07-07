"use client";

import { useEffect, useState } from "react";
import { clampCore, rollModifier } from "@/utils/modifiers";
import {
  BASE_TICK_MS,
  DEFAULT_STEP,
  type Modifier,
  type TimerCore,
} from "@/types/modifiers";

function formatClock(totalSec: number) {
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${pad(min)}:${pad(sec)}`;
}

function toInt(value: string, max: number) {
  const n = parseInt(value, 10);
  if (Number.isNaN(n)) return 0;
  return Math.min(max, Math.max(0, n));
}

function Timer() {
  const [minStr, setMinStr] = useState("10");
  const [secStr, setSecStr] = useState("0");

  const [remaining, setRemaining] = useState(10 * 60);
  const [tickMs, setTickMs] = useState(BASE_TICK_MS);
  const [running, setRunning] = useState(false);
  const [events, setEvents] = useState<Modifier[]>([]);

  const configuredTotal = toInt(minStr, 999) * 60 + toInt(secStr, 59);
  const finished = remaining <= 0;
  const isPristine =
    !running && remaining === configuredTotal && tickMs === BASE_TICK_MS;

  const startPauseLabel = running
    ? "Pause"
    : !finished && remaining !== configuredTotal
      ? "Resume"
      : "Start";

  // Run the countdown loop while the timer is active.
  useEffect(() => {
    if (!running) return;

    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;
    let core: TimerCore = { remainingSec: remaining, tickMs };

    const tick = () => {
      if (cancelled) return;

      const mod = rollModifier();
      core = clampCore(mod.apply(core));

      setRemaining(core.remainingSec);
      setTickMs(core.tickMs);
      if (mod.id !== DEFAULT_STEP.id) {
        setEvents((prev) => [mod, ...prev].slice(0, 6));
      }

      if (core.remainingSec <= 0) {
        setRunning(false);
        return;
      }
      timeoutId = setTimeout(tick, core.tickMs * (mod.delayFactor ?? 1));
    };

    timeoutId = setTimeout(tick, core.tickMs);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
    // Re-run only when the run state flips; ticks update core in-closure.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  const reconfigure = (nextMin: string, nextSec: string) => {
    setMinStr(nextMin);
    setSecStr(nextSec);
    setRemaining(toInt(nextMin, 999) * 60 + toInt(nextSec, 59));
    setTickMs(BASE_TICK_MS);
    setEvents([]);
  };

  const handleStartPause = () => setRunning((r) => !r);
  const handleReset = () => {
    setRunning(false);
    setRemaining(configuredTotal);
    setTickMs(BASE_TICK_MS);
    setEvents([]);
  };

  return (
    <div className="flex flex-col items-start gap-6">
      <div>
        <p className="font-mono text-lg text-accent">// chaos countdown</p>
      </div>

      <div className="flex items-end gap-3 font-mono text-sm text-secondary">
        <label className="flex flex-col gap-1">
          minutes
          <input
            type="number"
            min={0}
            max={999}
            value={minStr}
            disabled={running}
            onChange={(e) => reconfigure(e.target.value, secStr)}
            className="w-20 rounded-md border border-line bg-surface px-2 py-1.5 text-primary tabular-nums disabled:opacity-50"
          />
        </label>
        <span className="pb-2 text-primary">:</span>
        <label className="flex flex-col gap-1">
          seconds
          <input
            type="number"
            min={0}
            max={59}
            value={secStr}
            disabled={running}
            onChange={(e) => reconfigure(minStr, e.target.value)}
            className="w-20 rounded-md border border-line bg-surface px-2 py-1.5 text-primary tabular-nums disabled:opacity-50"
          />
        </label>
      </div>

      <div
        className={`font-mono text-6xl font-medium tabular-nums ${
          finished ? "text-accent" : "text-primary"
        }`}
        aria-live="off"
        role="timer"
      >
        {formatClock(remaining)}
      </div>

      <div className="font-mono text-xs text-muted">
        tick: {(tickMs / 1000).toFixed(2)}s{finished && " · time's up"}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleStartPause}
          disabled={!running && finished}
          className="rounded-md border border-green-600 px-4 py-2 font-mono text-sm text-accent no-underline transition-colors hover:border-accent hover:text-accent-hover disabled:cursor-not-allowed disabled:opacity-50 hover:cursor-pointer"
        >
          {startPauseLabel}
        </button>
        <button
          type="button"
          onClick={handleReset}
          disabled={isPristine}
          className="rounded-md border border-line px-4 py-2 font-mono text-sm text-secondary transition-colors hover:text-primary disabled:cursor-not-allowed disabled:text-disabled disabled:hover:text-disabled hover:cursor-pointer"
        >
          Reset
        </button>
      </div>

      {events.length > 0 && (
        <ul className="m-0 flex list-none flex-col gap-1 p-0 font-mono text-xs text-secondary">
          {events.map((mod, i) => (
            <li key={`${mod.id}-${i}`} className={i === 0 ? "text-accent" : ""}>
              → {mod.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Timer;

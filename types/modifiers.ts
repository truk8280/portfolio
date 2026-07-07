// Core timer state that the tick loop mutates:
//   remainingSec — whole seconds left on the clock
//   tickMs       — how long a second lasts (in ms)
export type TimerCore = { remainingSec: number; tickMs: number };

export type Modifier = {
  id: string;
  label: string;
  chance: number;
  apply: (s: TimerCore) => TimerCore;
  delayFactor?: number;
};

// Timing constants for the countdown loop.
export const BASE_TICK_MS = 1000;
export const MIN_TICK_MS = 25; // floor so repeated halving can't freeze/hammer the loop
export const MAX_TICK_MS = 60_000; // ceiling so repeated doubling can't stall it

export const MODIFIERS: Modifier[] = [
  {
    id: "add-sec",
    label: "+1 second",
    chance: 0.15,
    apply: (s) => ({ ...s, remainingSec: s.remainingSec + 1 }),
  },
  {
    id: "add-min",
    label: "+1 minute",
    chance: 0.05,
    apply: (s) => ({ ...s, remainingSec: s.remainingSec + 60 }),
  },
  {
    id: "sub-min",
    label: "-1 minute",
    chance: 0.05,
    apply: (s) => ({ ...s, remainingSec: s.remainingSec - 60 }),
  },
  {
    id: "freeze",
    label: "freeze for 5 ticks",
    chance: 0.03,
    apply: (s) => s, // clock unchanged; only the wait to the next tick grows
    delayFactor: 5,
  },
  {
    id: "double-time",
    label: "double time left",
    chance: 0.05,
    apply: (s) => ({ ...s, remainingSec: s.remainingSec * 2 }),
  },
  {
    id: "halve-time",
    label: "halve time left",
    chance: 0.05,
    apply: (s) => ({ ...s, remainingSec: Math.floor(s.remainingSec / 2) }),
  },
  {
    id: "swap",
    label: "swap minutes ↔ seconds",
    chance: 0.01,
    apply: (s) => {
      const min = Math.floor((s.remainingSec % 3600) / 60);
      const sec = s.remainingSec % 60;
      return { ...s, remainingSec: sec * 60 + min };
    },
  },
  {
    id: "round-min",
    label: "round to nearest minute",
    chance: 0.01,
    apply: (s) => {
      const min = Math.floor(s.remainingSec / 60);
      const sec = s.remainingSec % 60;
      return { ...s, remainingSec: sec >= 30 ? (min + 1) * 60 : min * 60 };
    },
  },
  {
    id: "fast",
    label: "tick halved",
    chance: 0.01,
    apply: (s) => ({ tickMs: s.tickMs / 2, remainingSec: s.remainingSec - 1 }),
  },
  {
    id: "slow",
    label: "tick doubled",
    chance: 0.01,
    apply: (s) => ({ tickMs: s.tickMs * 2, remainingSec: s.remainingSec - 1 }),
  },
];

// The fallthrough: a normal countdown of one second.
export const DEFAULT_STEP: Modifier = {
  id: "tick",
  label: "-1 second",
  chance: 0,
  apply: (s) => ({ ...s, remainingSec: s.remainingSec - 1 }),
};

import {
  DEFAULT_STEP,
  MAX_TICK_MS,
  MIN_TICK_MS,
  MODIFIERS,
  type Modifier,
  type TimerCore,
} from "@/types/modifiers";

// Weighted pick across the modifier table; rng injectable for testing.
export function rollModifier(rng: () => number = Math.random): Modifier {
  const r = rng();
  let cumulative = 0;
  for (const mod of MODIFIERS) {
    cumulative += mod.chance;
    if (r < cumulative) return mod;
  }
  return DEFAULT_STEP;
}

// Keep the core within sane bounds after any modifier runs.
export function clampCore(s: TimerCore): TimerCore {
  return {
    remainingSec: Math.max(0, s.remainingSec),
    tickMs: Math.min(MAX_TICK_MS, Math.max(MIN_TICK_MS, s.tickMs)),
  };
}

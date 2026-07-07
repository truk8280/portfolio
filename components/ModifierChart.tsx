import { DEFAULT_STEP, MODIFIERS } from "@/types/modifiers";

type Row = { id: string; label: string; chance: number; chaos: boolean };

function ModifierChart() {
  const modifierTotal = MODIFIERS.reduce((sum, m) => sum + m.chance, 0);
  const normalChance = 1 - modifierTotal;

  const rows: Row[] = [
    ...MODIFIERS.map((m) => ({
      id: m.id,
      label: m.label,
      chance: m.chance,
      chaos: true,
    })),
    {
      id: DEFAULT_STEP.id,
      label: "normal countdown",
      chance: normalChance,
      chaos: false,
    },
  ].sort((a, b) => b.chance - a.chance);

  return (
    <section className="w-full">
      <p className="mb-4 font-mono text-lg text-accent">// odds</p>
      <h2 className="mb-1 text-xl font-medium text-primary">
        Modifier probabilities
      </h2>
      <p className="mb-6 text-sm text-secondary">
        Every tick rolls once against this table.
      </p>

      <ul className="m-0 flex list-none flex-col p-0 font-mono text-sm">
        {rows.map((row) => (
          <li
            key={row.id}
            className="flex items-center justify-between gap-4 border-b-[0.5px] border-line py-2 last:border-b-0"
          >
            <span className="text-secondary">{row.label}</span>
            <span
              className={`tabular-nums ${row.chaos ? "text-accent" : "text-muted"}`}
            >
              {Math.round(row.chance * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ModifierChart;

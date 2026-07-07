"use client";

import { useCallback, useState } from "react";
import Timer from "@/components/Timer";
import ModifierChart from "@/components/ModifierChart";
import TimeGraph from "@/components/TimeGraph";

function TimerBoard() {
  const [history, setHistory] = useState<number[]>([]);
  const [start, setStart] = useState(10 * 60);

  const recordPoint = useCallback(
    (remaining: number) => setHistory((prev) => [...prev, remaining]),
    [],
  );
  const resetGraph = useCallback((startTotal: number) => {
    setStart(startTotal);
    setHistory([]);
  }, []);

  return (
    <div className="flex flex-col gap-12">
      <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2">
        <Timer onPoint={recordPoint} onReset={resetGraph} />
        <ModifierChart />
      </div>
      <TimeGraph data={history} start={start} />
    </div>
  );
}

export default TimerBoard;

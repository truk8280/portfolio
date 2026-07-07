import Timer from "@/components/Timer";
import ModifierChart from "@/components/ModifierChart";

export default function TimerPage() {
  return (
    <section className="mx-auto w-full max-w-3xl lg:max-w-5xl pt-16 px-4 md:px-6">
      <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2">
        <Timer />
        <ModifierChart />
      </div>
    </section>
  );
}

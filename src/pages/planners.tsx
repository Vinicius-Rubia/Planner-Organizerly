import { PlannerItem } from "@/components/planner-item";
import { usePlanner } from "@/contexts/planner-context";

export function Planners() {
  const { planners } = usePlanner();

  return (
    <div className="flex items-center gap-4 flex-wrap">
      {planners.map((study) => (
        <PlannerItem key={study.id} planner={study} />
      ))}
    </div>
  );
}

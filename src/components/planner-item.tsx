import { usePlanner } from "@/contexts/planner-context";
import { useStudy } from "@/contexts/study-context";
import { IPlanner } from "@/interfaces";
import { toastInformation } from "@/utils/toast-information";
import { format, max } from "date-fns";
import { MoreVertical, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { ConfirmAction } from "./confirm-action";
import { TotalCompletion } from "./total-completion";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { UpdatePlannerTitleDialog } from "./update-planner-title-dialog";

interface PlannerItemProps {
  planner: IPlanner;
}

export function PlannerItem({ planner }: PlannerItemProps) {
  const { removePlanner } = usePlanner();
  const { getStudiesByPlanner } = useStudy();

  const studies = getStudiesByPlanner(planner.id);
  const maxDate = studies.length > 0 && max(studies.map((study) => study.dateToStudy));
  const totalHours = studies.reduce((acc, value) => acc + value.totalHours, 0);

  const deletePlanner = () => {
    toastInformation(
      "🗑️ Plano de estudos excluído com sucesso!",
      "Seu plano de estudos foi excluído. Você não poderá mais vê-lo."
    );
    removePlanner(planner.id);
  };

  return (
    <div className="relative border px-8 py-4 rounded-md shadow flex flex-wrap items-center gap-8 min-w-[300px] max-w-[520px]">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild className="absolute top-4 right-4">
          <Button size="icon" variant="outline" className="size-6">
            <MoreVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <UpdatePlannerTitleDialog planner={planner} />
          <DropdownMenuSeparator />
          <ConfirmAction
            title="Tem certeza que desta ação?"
            description="Ao excluir o planos de estudos não poderá ser desfeito. Clique em continuar caso deseja prosseguir."
            actionSubmit={deletePlanner}
          >
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="!text-red-600 hover:!bg-red-100"
            >
              Excluir
              <DropdownMenuShortcut>
                <Trash />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </ConfirmAction>
        </DropdownMenuContent>
      </DropdownMenu>
      <TotalCompletion totalCompleted={planner.totalCompleted} />
      <div className="w-[250px]">
        <h3 className="font-semibold text-lg mb-4">{planner.title}</h3>
        <div className="text-sm space-y-2">
          <p>
            Total de horas:{" "}
            <strong>
              {totalHours === 0 ? "N/A" : totalHours}
            </strong>
          </p>
          <p>
            Data de conclusão:{" "}
            <strong>
              {/* {planner.dateCompleted
                ? format(planner.dateCompleted, "dd/MM/yyyy")
                : "N/A"} */}
              {maxDate
                ? format(maxDate, "dd/MM/yyyy")
                : "N/A"}
                {/* {format(maxDate, "dd/MM/yyyy")} */}
            </strong>
          </p>
          <Button size="sm" asChild>
            <Link to={planner.id}>Acessar</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

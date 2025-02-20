import { ConfirmAction } from "@/components/confirm-action";
import { CreateStudyDialog } from "@/components/create-study-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useStudy } from "@/contexts/study-context";
import { EStudyStatus } from "@/enums";
import { toastInformation } from "@/utils/toast-information";
import { format } from "date-fns";
import { ArrowLeft, MoreVertical, NotepadText, Trash } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export function PlannerDetails() {
  const { getStudiesByPlanner, removeStudy } = useStudy();
  const { plannerId } = useParams<{ plannerId: string }>();

  if (!plannerId) {
    return;
  }

  const studies = getStudiesByPlanner(plannerId);

  const getBadgeStatus = (status: EStudyStatus) => {
    switch (status) {
      case EStudyStatus.COMPLETED:
        return "completed";
      case EStudyStatus.IN_PROGRESS:
        return "inProgress";
      case EStudyStatus.LATE:
        return "late";
      case EStudyStatus.POSTPONED:
        return "postponed";
      case EStudyStatus.PAUSED:
        return "paused";
      default:
        return "pending";
    }
  };

  const deleteStudy = (id: string) => {
    toastInformation(
      "🗑️ Estudo excluído com sucesso!",
      "Seu estudo foi excluído. Você não poderá mais vê-lo."
    );
    removeStudy(id);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <Button asChild size="sm">
          <Link to="/">
            <ArrowLeft />
          </Link>
        </Button>
        <CreateStudyDialog />
      </div>
      {studies.length > 0 ? (
        <div className="flex items-center gap-4 flex-wrap mt-4">
          {studies.map((study) => (
            <div
              key={study.id}
              className="w-[500px] gap-2 border p-4 rounded-md shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{study.title}</h3>
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="outline" className="size-6">
                      <MoreVertical />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Começar</DropdownMenuItem>
                    <DropdownMenuItem>Concluir</DropdownMenuItem>
                    <DropdownMenuItem>Adiar</DropdownMenuItem>
                    <DropdownMenuItem>Pausar</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <ConfirmAction
                      title="Tem certeza que desta ação?"
                      description="Ao excluir o seu estudo não poderá ser desfeito. Clique em continuar caso deseja prosseguir."
                      actionSubmit={() => deleteStudy(study.id)}
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
              </div>
              <p className="text-sm h-20">{study.description}</p>

              <Separator />
              <div className="mt-4 text-sm space-y-1 mb-4">
                <p>
                  Estudar em:{" "}
                  <strong>{format(study.dateToStudy, "dd/MM/yyyy")}</strong>
                </p>
                <p>
                  Horas de estudo: <strong>{study.totalHours}h</strong>
                </p>
              </div>
              <Badge variant={getBadgeStatus(study.status)}>
                {study.status}
              </Badge>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center flex-wrap justify-center gap-4 text-center text-muted-foreground bg-primary-foreground rounded-md mt-4 p-10">
          <NotepadText />
          <p>Não existe nenhum card ainda. Comece criando o primeiro.</p>
        </div>
      )}
    </div>
  );
}

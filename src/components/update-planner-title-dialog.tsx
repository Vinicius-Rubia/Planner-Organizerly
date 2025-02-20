import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { usePlanner } from "@/contexts/planner-context";
import { IPlanner } from "@/interfaces";
import { CreatePlannerSchema } from "@/schemas/create-planner-schema";
import { CreatePlannerSchemaType } from "@/types";
import { toastInformation } from "@/utils/toast-information";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

interface UpdatePlannerTitleDialogProps {
  planner: IPlanner;
}

export function UpdatePlannerTitleDialog({ planner }: UpdatePlannerTitleDialogProps) {
  const { updatePlannerTitle } = usePlanner();
  const [openDialog, setOpenDialog] = useState(false);

  const form = useForm<CreatePlannerSchemaType>({
    resolver: zodResolver(CreatePlannerSchema),
    defaultValues: {
      title: planner.title,
    },
  });

  useEffect(() => {
    form.reset({ title: planner.title });
  }, [planner.title, form]);

  const handleUpdatePlannerTitleSubmit = ({ title }: CreatePlannerSchemaType) => {
    updatePlannerTitle(planner.id, title);
    handleOpenDialog(false);
    toastInformation(
      "✅ Plano de estudos editado com sucesso!",
      "Seu plano de estudos foi editado com êxito."
    );
  };

  const handleOpenDialog = (open: boolean) => {
    setOpenDialog(open);
    form.reset();
  };

  return (
    <Dialog open={openDialog} onOpenChange={handleOpenDialog}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          Editar
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdatePlannerTitleSubmit)}
            className="space-y-6"
          >
            <DialogHeader>
              <DialogTitle>Edite seu plano de estudos</DialogTitle>
              <DialogDescription>
                Preencha os campos abaixo para editar seu plano de estudos.
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Título do plano de estudos"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Editar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

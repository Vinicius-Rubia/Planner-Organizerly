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
import { CreatePlannerSchema } from "@/schemas/create-planner-schema";
import { CreatePlannerSchemaType } from "@/types";
import { toastInformation } from "@/utils/toast-information";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

export function CreatePlannerDialog() {
  const { createPlanner } = usePlanner();
  const [openDialog, setOpenDialog] = useState(false);

  const form = useForm<CreatePlannerSchemaType>({
    resolver: zodResolver(CreatePlannerSchema),
    defaultValues: {
      title: "",
    },
  });

  const handleCreatePlannerSubmit = ({ title }: CreatePlannerSchemaType) => {
    createPlanner(title);
    handleOpenDialog(false);
    toastInformation(
      "✅ Plano de estudos criado com sucesso!",
      "Seu plano de estudos foi criado, você pode começá-lo quando quiser."
    );
  };

  const handleOpenDialog = (open: boolean) => {
    setOpenDialog(open);
    form.reset();
  };

  return (
    <Dialog open={openDialog} onOpenChange={handleOpenDialog}>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <Plus />
          Novo plano de estudos
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreatePlannerSubmit)}
            className="space-y-6"
          >
            <DialogHeader>
              <DialogTitle>Crie um plano de estudos</DialogTitle>
              <DialogDescription>
                Preencha os campos abaixo para criar seu plano de estudos.
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
              <Button type="submit">Criar plano de estudos</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

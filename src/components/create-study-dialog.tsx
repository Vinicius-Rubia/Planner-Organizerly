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
import { useStudy } from "@/contexts/study-context";
import { cn } from "@/lib/utils";
import { CreateStudySchema } from "@/schemas/create-study-schema";
import { CreateStudySchemaType } from "@/types";
import { toastInformation } from "@/utils/toast-information";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Calendar } from "./ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Textarea } from "./ui/textarea";

export function CreateStudyDialog() {
  const { createStudy } = useStudy();
  const { updateDetails } = usePlanner();
  const [openDialog, setOpenDialog] = useState(false);

  const { plannerId } = useParams<{ plannerId: string }>();

  if (!plannerId) {
    return;
  }

  const form = useForm<CreateStudySchemaType>({
    resolver: zodResolver(CreateStudySchema),
    defaultValues: {
      title: "",
      description: "",
      total_hours: 2,
    },
  });

  const handleCreateStudySubmit = (data: CreateStudySchemaType) => {
    createStudy({
      title: data.title,
      description: data.description,
      plannerId,
      totalHours: data.total_hours,
      dateToStudy: data.date_to_study,
    });

    updateDetails(plannerId, data.total_hours, data.date_to_study);
    handleOpenDialog(false);
    toastInformation(
      "✅ Estudo criado com sucesso!",
      "Seu estudo foi criado, você pode começar a estudá-la quando quiser."
    );
  };

  const handleOpenDialog = (open: boolean) => {
    setOpenDialog(open);
    form.reset();
  };

  return (
    <Dialog open={openDialog} onOpenChange={handleOpenDialog}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus />
          Novo item
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreateStudySubmit)}
            className="space-y-6"
          >
            <DialogHeader>
              <DialogTitle>Crie um estudo novo</DialogTitle>
              <DialogDescription>
                Preencha os campos abaixo para criar seu estudo.
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Título do estudo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={6}
                      placeholder="Descrição do estudo"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date_to_study"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Estudar em</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "dd/MM/yyyy")
                          ) : (
                            <span>Escolha uma data</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        locale={ptBR}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="total_hours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Horas de estudo</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Número de horas"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Criar estudo</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

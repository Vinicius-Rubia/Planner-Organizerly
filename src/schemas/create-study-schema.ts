import { z } from "zod";

export const CreateStudySchema = z.object({
  title: z.string().min(1, {
    message: "Informe um título para seu estudo.",
  }),
  description: z
    .string()
    .min(10, {
      message: "Descrição precisa ter no mínimo 10 caracteres.",
    })
    .max(400, {
      message: "Descrição não pode ter mais de 400 caracteres.",
    }),
  date_to_study: z.date({
    required_error: "Informe uma data.",
  }),
  total_hours: z.coerce.number().min(1, {
    message: "Informe as horas de etudo.",
  }),
});

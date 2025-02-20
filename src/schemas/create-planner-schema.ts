import { z } from "zod";

export const CreatePlannerSchema = z.object({
  title: z.string().min(1, {
    message: "Informe um título para seu plano de estudos.",
  }),
});

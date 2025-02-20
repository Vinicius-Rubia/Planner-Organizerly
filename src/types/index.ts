import { CreatePlannerSchema } from "@/schemas/create-planner-schema";
import { CreateStudySchema } from "@/schemas/create-study-schema";
import { z } from "zod";

export type CreateStudySchemaType = z.infer<typeof CreateStudySchema>;
export type CreatePlannerSchemaType = z.infer<typeof CreatePlannerSchema>;

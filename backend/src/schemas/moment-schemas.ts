import { z } from "zod";

export const CreateMomentBodySchema = z.object({
  title: z.string().min(1),
  story: z.string().min(1),
  imageUrl: z.url(),
  visitedDate: z.string(),
  visitedLocation: z.array(z.string()).optional()
});

export const CreateMomentResponseSchema = z.object({
    id: z.string(),
    title: z.string(),
    story: z.string(),
    imageUrl: z.url(),
    visitedDate: z.string(),
    visitedLocation: z.array(z.string()).optional(),
});
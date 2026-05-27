import { z } from "zod";

export const CreateMomentBodySchema = z.object({
  title: z.string().min(1),
  story: z.string().min(1),
  imageUrl: z.url(),
  visitedDate: z.string(),
  isFavorite: z.boolean().optional(),
  visitedLocation: z.array(z.string()).optional()
});

export const UpdateMomentBodySchema = z.object({
  title: z.string().min(1).optional(),
  story: z.string().min(1).optional(),
  imageUrl: z.url().optional(),
  visitedDate: z.string().optional(),
  isFavorite: z.boolean().optional(),
  visitedLocation: z.array(z.string()).optional()
});

export const MomentResponseSchema = z.object({
    id: z.string(),
    title: z.string(),
    story: z.string(),
    imageUrl: z.url(),
    visitedDate: z.string(),
    isFavorite: z.boolean(),
    visitedLocation: z.array(z.string()).optional(),
});

export type Moments = z.infer<typeof MomentResponseSchema>;
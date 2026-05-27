import { z } from "zod";

export const MomentSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  story: z.string().min(1),
  imageUrl: z.url(),
  visitedDate: z.string(),
  isFavorite: z.boolean().optional(),
  visitedLocation: z.array(z.string()).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  userId: z.string(),
});

export type Moment = z.infer<typeof MomentSchema>;

export const MomentCreateSchema = MomentSchema.omit({ 
  id: true,
  createdAt: true,
  updatedAt: true
});

export type MomentCreateInput = z.infer<typeof MomentCreateSchema>;

export const MomentUpdateSchema = MomentCreateSchema.partial();

export type MomentUpdateInput = z.infer<typeof MomentUpdateSchema>;

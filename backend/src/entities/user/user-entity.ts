import z from "zod";

export const UserSchema = z.object({
  id: z.uuid().optional(),
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(6),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export type User = z.infer<typeof UserSchema>;

export const UserCreateSchema = UserSchema.omit({ 
  id: true,
  createdAt: true,
  updatedAt: true
});

export type UserCreateInput = z.infer<typeof UserCreateSchema>;
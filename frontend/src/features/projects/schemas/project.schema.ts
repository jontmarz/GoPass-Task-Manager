import { z } from 'zod';

export const projectSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres').max(255),
  description: z
    .string()
    .max(1000, 'La descripción no puede superar los 1000 caracteres')
    .optional(),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;
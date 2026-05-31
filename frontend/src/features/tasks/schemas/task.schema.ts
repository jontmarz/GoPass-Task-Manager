import { z } from 'zod';

export const taskFormSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres').max(255),
  description: z
    .string()
    .max(1000, 'La descripción no puede superar los 1000 caracteres')
    .optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).default('MEDIUM'),
  dueDate: z.string().optional().nullable(),
});

export type TaskFormInputs = z.infer<typeof taskFormSchema>;

// This is the type for the data sent to the API
export type TaskFormValues = TaskFormInputs & { projectId: string };
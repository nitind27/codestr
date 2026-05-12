import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['admin', 'manager', 'user', 'viewer']),
  department: z.string().optional(),
  phone: z
    .string()
    .regex(/^\+?[\d\s\-()]{7,15}$/, 'Invalid phone number')
    .optional()
    .or(z.literal('')),
});

export const updateUserSchema = createUserSchema.partial().extend({
  status: z.enum(['active', 'inactive', 'suspended', 'pending']).optional(),
});

export type CreateUserFormData = z.infer<typeof createUserSchema>;
export type UpdateUserFormData = z.infer<typeof updateUserSchema>;

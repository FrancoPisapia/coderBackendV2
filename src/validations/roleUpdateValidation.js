import z from 'zod';

const roleUpdateValidation = z.object({
  id: z.string().max(24),
  name: z.string().min(1).max(35),
  permissions: z.array()
});

export default roleUpdateValidation;
import z from 'zod';

const cartCreateValidation = z.object({
  products: z.array(
    z.object({
      _id: z.string().max(24),
      quantity: z.number(),
    })
  ),
});


export default cartCreateValidation;
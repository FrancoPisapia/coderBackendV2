import z from 'zod';
import idValidation from '../share/idValidation.js';
import cartCreateValidation from '../cart/cartCreateValidation.js'

const cartUpdateValidation = z.object({
  idValidation,
  cartCreateValidation
});


export default cartUpdateValidation;
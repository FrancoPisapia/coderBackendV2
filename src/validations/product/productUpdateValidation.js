import z from 'zod';
import idValidation from '../share/idValidation.js';
import productCreateValidation from '../product/productCreateValidation.js'

const productUpdateValidation = z.object({
  idValidation,
  productCreateValidation
});

export default productUpdateValidation;
import productCreateValidation from "../validations/product/productCreateValidation.js";

import idValidation from "../validations/share/idValidation.js";
import productUpdateValidation from '../validations/product/productUpdateValidation.js';

import container from "../../container.js";

class ProductManager{
    constructor()
    {
        this.productRepository = container.resolve('ProductRepository');
    }

    async paginate(criteria)
    {
      return this.productRepository.paginate(criteria);
    }

    async getOne (id)
    {
        await idValidation.parseAsync({id})
        return this.productRepository.getOne(id)
    }

    async create (data,owner)
    {
        await productCreateValidation.parseAsync(data);
        const dto = {
            ...data,
            owner
          };
        return this.productRepository.create(dto,owner);
        
    }

    async updateOne (id,data)
    {
        await productUpdateValidation.parseAsync({...data,id})
        return this.productRepository.updateOne(id,data)
    }

    async deleteOne(id,role,owner)
    {
        await idValidation.parseAsync({id})

        const existingProduct = await this.getOne(id);


        if (role === 'admin' || existingProduct.owner === owner) {

            return this.productRepository.deleteOne(id)
        } else {
            const error = new Error('Unauthorized: You do not have permission to delete this product');
            throw error;
          }
          
        
    }

    // async addImageById(id,data)
    // {

    //     return this.productDao.addImageById(id,data)
    // }

}

export default ProductManager
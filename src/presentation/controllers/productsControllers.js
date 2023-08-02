import ProductManager from "../../domain/managers/productsManager.js";
import uploader from "../middlewares/multer.js";
import { developmentLogger } from "../../shared/logger.js"

const logger = process.env.NODE_ENV === 'production' ? null : developmentLogger

// class ProductController
// {
//     static list = async (req,res)=>{

//         const manager = new ProductManager();

//         const products = await manager.find();

//         res.send ({status:'succeed',products})
//     }
// }


export const list = async  (req, res, next) =>
{
  try
  {
    const { limit, page } = req.query;

    const manager = new ProductManager();
    const product = await manager.paginate({ limit, page });
    
    res.send({ status: 'success', product: product.docs, ...product, docs: undefined });
  }
  catch (e)
  {
		next(e);
	}
};

export const getOne= async (req,res,next) =>{

    try
    {
    
    const {id} = req.params;

    const manager = new ProductManager();

    const product = await manager.getOne(id);
    logger?.info(`Product received with ID ${id}`);
    res.send ({status:'succeed',product});
    }
    catch (e)
    {
        next (e)
    }

}

export const save = async (req,res,next) =>{

    try{

    const manager = new ProductManager();
    const email = req.user.email
    const product = await manager.create(req.body,email);
    
    logger?.info(`Product created with ID ${product.id}`);
    res.send ({status:'succeed',product, message:'Product created'});
    }
    catch (e)
    {
        next(e)
    }
}


export const update = async ( req,res,next)=>{

    try 
    {
        const {id} = req.params

        const manager = new ProductManager();
    
        const result = await manager.updateOne(id, req.body);

        logger?.info(`Product updated with ID ${id}`);
    
        res.send({ status: 'success', result, message: 'Product updated' })
    }
    catch (e)
    {
        next(e)
    }

}

export const deleteOne = async (req,res,next) =>{

    try
    {

    const {id} = req.params

    const manager = new ProductManager();
    const email = req.user.email
    const role = req.user.role
    const result = await manager.deleteOne(id,role,email);
    logger?.info(`Product deleted with ID ${id}`);
    res.send({ status: 'success', result, message: 'Product deleted' });

    }
    catch (e)
    {
        next (e)
    }
}

// export const addImageById = async (req,res)=>
// {

//     const {id} = req.params;

//     const file = req.file;

//     const manager = new ProductManager();

//     const result = await manager.addImageById(id,'aaa') ;

    
// }

//export default ProductController
import CartManager from "../../domain/managers/cartsManager.js";
import UserManager from "../../domain/managers/userManager.js";
import { developmentLogger } from "../../shared/logger.js";

const logger = process.env.NODE_ENV === 'production' ? null : developmentLogger;


class CartController {
    static list = async  (req, res) =>
    {
        const manager = new CartManager();
  
        const carts = await manager.find();

        logger?.info("Cart list retrieved");
        res.send({ status: 'success', carts });
    };
}

export const getOne= async (req,res,next) =>
{
    try
    {
    const {id} = req.params;

    const manager = new CartManager();

    const cart = await manager.getOne(id);

    logger?.info(`Cart retrieved with ID ${id}`);

    res.send ({status:'succeed',cart});
    }
    catch (e)
    {
        next(e)
    }

}

export const createOne= async (req,res,next) =>
{
    try
    {
    
    const userManager = new UserManager();
    const manager = new CartManager();

    const cart = await manager.createOne();


    const userId = req.user.id;
    
    // Agregar el ID del carrito al usuario
    //userManager.addCart(userId, cart.id);

    logger?.info(`Cart created with ID ${cart.id}`);

    res.send ({status:'succeed',cart})
    }

    catch(e)
    {
        next (e)
    }
}

export const update= async (req,res,next) =>
{
    try
    {
    const {id} = req.params;

    const manager = new CartManager();

    const cart = await manager.updateOne(id,req.body);

    logger?.info(`Cart updated with ID ${id}`);


    res.send ({status:'succeed',cart, message:'Carrito actuializado'});
    }
    catch (e)
    {
        next (e)
    }

}


    export const addProduct = async (req, res,next) =>
{
    try
    {
    const { cid,pid } = req.params;

    const email = req.user.email
    const role = req.user.role
    const roleName=role.name

    const manager = new CartManager();

    const product = await manager.addProduct(cid,pid,roleName,email);

    logger?.info(`Product ${pid} added to cart ${cid}`);

    res.send({ status: 'success',product, message: 'Cart updated' })  
    }
    catch (e)
    {
        next (e)
    }
};

export const modifyQuantity = async (req, res,next) => {

    try{

    
    const { cid, pid } = req.params;
    const { quantity } = req.body;
  
    const manager = new CartManager();
    await manager.modifyQuantity(cid, pid, quantity);

    logger?.info(`Quantity modified for product ${pid} in cart ${cid}`);

  
    res.status(200).json({ success: true });
    }
    catch (e)
    {
        next (e)
    }
}

export const deleteOne = async (req,res,next) =>{

try {


    const {id} = req.params

    const manager = new CartManager();

    const result = await manager.deleteOne(id);

    logger?.info(`Cart deleted with ID ${id}`);

    res.send({ status: 'success', result, message: 'Cart deleted' })
    }
    catch (e)
    {
        next (e)
    }
}

export const deleteOneProduct = async (req,res,next) =>
{
    try{

   
    const { cid,pid } = req.params;

    const manager = new CartManager();
  
    const cart = await manager.deleteOneProduct(cid,pid);

    logger?.info(`Product ${pid} deleted from cart ${cid}`);

    res.send({ status: 'success', cart, message: 'Cart updated' })
    }
    catch (e)
    {
        next (e)
    }
}


export default CartController
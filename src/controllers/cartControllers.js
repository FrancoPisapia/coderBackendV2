import CartManager from "../managers/cartsManager.js";
import cartUpdateValidation from "../validations/cart/cartUpdateValidation.js";
import idValidation from "../validations/idValidation.js";
import idValidationCartProduct from "../validations/idValidationCart-Products.js";
import UserManager from "../managers/userManager.js";

class CartController {
    static list = async  (req, res) =>
    {
        const manager = new CartManager();
  
        const carts = await manager.find();
        res.send({ status: 'success', carts });
    };
}

export const getOne= async (req,res,next) =>
{
    try
    {

    await idValidation.parseAsync(req.params);
    const {id} = req.params;

    const manager = new CartManager();

    const cart = await manager.getOne(id);

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
    userManager.addCart(userId, cart.id);

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

    await cartUpdateValidation.parseAsync({...req.params,...req.body});

    const {id} = req.params;

    const manager = new CartManager();

    const cart = await manager.updateOne(id,req.body);

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

    await idValidationCartProduct.parseAsync({...req.params});

    const { cid,pid } = req.params;

    const manager = new CartManager();

    const product = await manager.addProduct(cid,pid);

    res.send({ status: 'success',product, message: 'Cart updated' })  
    }
    catch (e)
    {
        next (e)
    }
};

export const modifyQuantity = async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
  
    const manager = new CartManager();
    await manager.modifyQuantity(cid, pid, quantity);
  
    res.status(200).json({ success: true });
}

export const deleteOne = async (req,res) =>{
    const {id} = req.params

    const manager = new CartManager();

    const result = await manager.deleteOne(id);

    res.send({ status: 'success', result, message: 'Cart deleted' })
}

export const deleteOneProduct = async (req,res) =>
{
    const { cid,pid } = req.params;

    const manager = new CartManager();
  
    const cart = await manager.deleteOneProduct(cid,pid);

    res.send({ status: 'success', cart, message: 'Cart updated' })
}


export default CartController
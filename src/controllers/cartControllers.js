import CartManager from "../managers/cartsManager.js";

class CartController {
    static list = async  (req, res) =>
    {
        const manager = new CartManager();
  
        const carts = await manager.find();
        res.send({ status: 'success', carts });
    };
}

export const getOne= async (req,res) =>{
    const {id} = req.params;

    const manager = new CartManager();

    const cart = await manager.getOne(id);

    res.send ({status:'succeed',cart})

}

export const createOne= async (req,res) =>{


    const manager = new CartManager();

    const cart = await manager.createOne();

    res.send ({status:'succeed',cart})

}

export const update= async (req,res) =>{

    const {id} = req.params

    const manager = new CartManager();

    const cart = await manager.updateOne(id,req.body);

    res.send ({status:'succeed',cart, message:'Carrito actuializado'})

}


    export const addProduct = async (req, res) =>
{
  const { cid,pid } = req.params;

  const manager = new CartManager();

  const product = await manager.addProduct(cid,pid);

  res.send({ status: 'success',product, message: 'Cart updated' })
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
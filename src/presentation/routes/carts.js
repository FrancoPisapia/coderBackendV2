//import {ProductManager,CartManager} from '../dao/fileSystem/Managers.js';
import express from 'express'
// import { cartModel } from '../dao/models/cartsModels.js';
// import { productsModel } from '../dao/models/productsModels.js';
import CartController, { addProduct, createOne, deleteOne, deleteOneProduct, getOne, modifyQuantity, update, } from '../controllers/cartControllers.js';
import { purchaseCart } from '../controllers/ticketConstroller.js';
import auth from '../middlewares/auth.js';
import authorization from '../middlewares/authorizacion.js';

const app = express();
const routerCart = express.Router(); 
app.use(express.urlencoded({extended:true}))


routerCart.get('/',CartController.list);
routerCart.get('/:id',getOne);
routerCart.post('/',auth,authorization('createCart'),createOne);
routerCart.post('/:cid/product/:pid',auth,authorization('addProduct'),addProduct);
routerCart.put('/:id',auth,authorization('updateCart'),update)
routerCart.put('/:cid/product/:pid',auth,authorization('modifyQuantity'),modifyQuantity);
routerCart.delete('/:id',auth,authorization('deleteOne'),deleteOne);
routerCart.delete('/:cid/product/:pid',auth,authorization('deleteOneProduct'),deleteOneProduct);
routerCart.post('/:cid/purchease',auth,purchaseCart)






  export default routerCart
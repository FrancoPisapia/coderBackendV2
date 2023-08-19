import express from 'express'
import { deleteOne, getOne, save, update, list} from '../controllers/productsControllers.js';
import auth from '../middlewares/auth.js';
import authorization from '../middlewares/authorizacion.js';


const app = express();
const routerProduct = express.Router(); 
app.use(express.urlencoded({extended:true}))


routerProduct.get('/', list);
routerProduct.get('/:id',getOne)
routerProduct.post('/',auth, authorization('saveProduct'),save)
routerProduct.put('/:id',auth, authorization('updateProduct'),update)
routerProduct.delete('/:id',auth, authorization('deleteProduct'),deleteOne)
//routerProduct.put('/imagen/:id',uploader.single('file') ,addImageById);

  export default routerProduct
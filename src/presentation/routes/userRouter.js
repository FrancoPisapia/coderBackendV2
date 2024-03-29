import { Router } from 'express';
import auth from '../middlewares/auth.js';
import { list, deleteOne, getOne, save, update, deleteInactiveUsers} from '../controllers/userControllers.js';
import authorization from '../middlewares/authorizacion.js';
import { get } from 'mongoose';


const userRouter = Router();

userRouter.get('/', auth, authorization('getUsers'), list);
userRouter.get('/:id', auth, authorization('getUser'), getOne);
userRouter.post('/', save);
userRouter.put('/:id', auth, authorization('updateUser'), update);
userRouter.delete('/:id', auth, authorization('deleteUser'), deleteOne);

export default userRouter;
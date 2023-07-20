import { Router } from 'express';
import { changePassword2, sendEmail } from "../controllers/emailController.js";
import auth from '../middlewares/auth.js';

const emailRouter = Router();

emailRouter.get('/', sendEmail);
emailRouter.put('/',auth ,changePassword2);



export default emailRouter;
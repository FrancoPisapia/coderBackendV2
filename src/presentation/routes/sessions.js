import express from 'express'
//import { changePassword2, sendEmail } from '../controllers/emailController.js';
import { login, current, signup, forgotPassword, changePassword } from '../controllers/sessionController.js';
import auth from '../middlewares/auth.js'


const app = express();
const routerSessions = express.Router(); 
app.use(express.urlencoded({extended:true}));



//*****Endpoints ******/
;

routerSessions.post('/login', login);
routerSessions.get('/current', auth, current);
routerSessions.post('/signup', signup);
routerSessions.post('/password', forgotPassword);
routerSessions.put('/password', auth, changePassword);

//To Use mailHog replace the last thwo endpoints
// routerSessions.post('/password', sendEmail);
// routerSessions.put('/password', auth, changePassword2);


export default routerSessions;

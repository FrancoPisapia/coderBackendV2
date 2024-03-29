import express from 'express';
import cookieParser from 'cookie-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';
import { swaggerOptions } from './swaggerOptions.js';
import __dirname from '../../shared/direname.js'
import productsRouter from '../routes/products.js'
import cartsRouter from '../routes/carts.js';
import userRouter from '../routes/userRouter.js';
import roleRouter from '../routes//roleRouter.js';
import routerSessions from '../routes/sessions.js';
import emailRouter from '../routes/emailRouter.js';
import errorHandler from '../middlewares/errorHandler.js';
import { addLogger } from '../middlewares/logger.js';


const specs = swaggerJSDoc(swaggerOptions)

class AppExpress
{
    init()
    {
        this.app = express();
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(addLogger)
        this.app.use(cookieParser());
    
    }

    build()
    {
        this.app.use('/api/products', productsRouter);
        this.app.use('/api/carts', cartsRouter);
        this.app.use('/api/sessions', routerSessions);
        this.app.use('/api/user',userRouter);
        this.app.use('/api/roles',roleRouter);
        this.app.use('/api/email', emailRouter);
        this.app.use('/apidocs',swaggerUiExpress.serve,swaggerUiExpress.setup(specs))
        this.app.use(errorHandler)
        
        
    }

    callback()
    {
        return this.app;
    }

    close()
    {
        this.server.close();
    }

    listen()
    {
        const port = process.env.PORT || 5000
        {
            this.server = this.app.listen(port,() => {
            console.log(`Server listening on port ${port}`);
            
            });
            
            return this.server;
        }
    }
}

export default AppExpress;
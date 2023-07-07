import { faker } from '@faker-js/faker';
import chai from "chai";
import supertest from "supertest";
import initServer from './index.js'
import container from '../container.js'

const expect = chai.expect;
let jwt = "";

describe("Testing Auth Endpoints Success", () => {
    before(async function () {
        const { app, db } = await initServer();
        const application = app.callback();
        this.requester = supertest.agent(application);
        this.app = app;
        this.db = db;
        this.payload = {};
        this.productID = "644712d8e1f10a2db3207513";
    });
    after(function () {
        this.db.drop();
        this.db.close();
        this.requester.app.close(() => {
            console.log('Conexión cerrada');
        });
    });

    beforeEach(async function () {
        this.timeout(2000);
        await new Promise(resolve => setTimeout(resolve, 500));
    });

    it("Leer producto /api/products", function () {
        const productRepository = container.resolve('ProductRepository');
        
        return this.requester
            .get("/api/products")
            .then(result => {
                const { status } = result;
                expect(status).to.be.equals(200);
            });
    });



    it('Leer un producto /api/products/644712d8e1f10a2db3207513', function ()
    {

        return this.requester
            .get(`/api/products/${this.productID}`)
            .then(result =>
            {
                const { status,_body  } = result;
                
                const product = _body.product
                
                expect(status).to.be.equals(200);
                expect(product.id).to.be.equals(this.productID)

            }
        );
    });
    
    // it('Login de admin',function()
    // {
    //     this.payload = 
    //     {
    //       email:"Franco.pisapia123@gmail.com",
    //       password: "123456"
    //     }

    //     return this.requester
    //         .post('/api/sessions/login')
    //         .send(payload)
    //         .then(result =>
    //         {
    //             const { _body, status } = result;

    //             expect(status).to.be.equals(200);
    //             expect(_body.message).to.be.equals("Login success!");

    //             jwt = _body.accessToken;
    //         }
    //     );
    // })

    // it('Crear un producto /api/products', function ()
    // {
    //     this.product = {
    //         title: 'Test Product',
    //         description: 'This is a test product',
    //         code: '1234567',
    //         price: 10.99,
    //         stock: 100,
    //         category: 'Test',
    //         thumbnail: 'https://example.com/image.jpg',
    //       };


    //     return this.requester
    //         .post(`/api/products`)
    //         .set('Authorization', `Bearer ${jwt}`)
    //         .send(this.product)
    //         .then(result =>
    //         {
    //             const { status } = result;
    //             expect(status).to.be.equals(201);
    //             expect(result.title).to.be.equals(this.product.title)

    //         }
    //     );
    // });

    // it('Actualizar un producto /api/products', function ()
    // {


    //     return this.requester
    //         .put(`/api/products/${this.productID}`)
    //         .set('Authorization', `Bearer ${jwt}`)
    //         .send(this.product)
    //         .then(result =>
    //         {
    //             const { status } = result;
    //             expect(status).to.be.equals(201);
    //             expect(result.title).to.be.equals(this.product.title)

    //         }
    //     );
    // });
})


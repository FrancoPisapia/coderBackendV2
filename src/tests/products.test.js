import { faker } from '@faker-js/faker';
import chai from "chai";
import supertest from "supertest";
import initServer from './index.js'

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

    it('Leer producto /api/products', function ()
    {

        return this.requester
            .get('/api/products')
            .then(result =>
            {
                const { status } = result;
                expect(status).to.be.equals(201);

            }
        );
    });
})

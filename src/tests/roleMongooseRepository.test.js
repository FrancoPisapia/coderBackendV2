import dotenv from "dotenv";
dotenv.config();

import { faker } from '@faker-js/faker';
import DbFactory from "../data/factories/dbFactory.js";
import chai from "chai";

const expect = chai.expect;

const db = DbFactory.create(process.env.DB);

import RoleMongooseRepository from "../data/repositories/mongoose/roleMongooseRepository.js";


describe("Testing Role Mongoose Repository", () => {
    before(function () {
        db.init("mongodb+srv://francopisapia405:uPTbiSDQYTlKc3wm@codercluster.xlmgp1b.mongodb.net/?retryWrites=true&w=majority");
        this.roleRepository = new RoleMongooseRepository();
    });
    after(function () {
        db.drop();
        db.close();
    });
    beforeEach(function () {
        this.timeout(5000);
    });
    it('El repositorio debe ser una instancia de RoleMongooseRepository', function () {
        expect(this.roleRepository instanceof RoleMongooseRepository).to.be.ok;
    });

    // it('El repositorio debe devolver un arreglo', function () {

    //     return this.roleRepository
    //         .paginate({ limit: 5, page: 1 })
    //         .then(result =>
    //         {

    //             expect(Array.isArray(result.role)).to.be.equals(true);
    //             expect(result.pagination.limit).to.be.equals(5);
    //         }
    //     );
    // });


    //*****ESTE ANDA ******/

    // it('The repository should be able to create a role', function (done) {
    
    //     const role = {
    //         name: 'algo',
    //         permissions: ['a','b'],
    //     };
    
    //     this.roleRepository.create(role)
    //         .then(result => {
    //             expect(result.name).to.be.equals(role.name);
    //             done(); 
    //         })
    //         .catch(error => done(error)); // Pass any errors to done()
    // });






    // it('The repository should be able to update a user', function () {
    //     const updatedData = {
    //         firstName: 'Updated First Name',
    //         lastName: 'Updated Last Name',
    //     };

    //     return this.roleRepository
    //         .updateOne('6494b72470838cf325bed1d4', updatedData)
    //         .then(result => {
    //             expect(result.firstName).to.be.equals(updatedData.firstName);
    //             expect(result.lastName).to.be.equals(updatedData.lastName);
    //         });
    // });

    // it('The repository should be able to delete a user', function () {
    //     const userId = '649f4a5ce3523c8b9aa8770d';

    //     return this.roleRepository
    //         .deleteOne(userId)
    //         .then(result => {
    //             expect(result.acknowledged).to.be.equals(true);
    //         });
    // });

    // it('The repository should be able to get a user by ID', function () {
    //     const userId = '649f47a8f2e8ce8149ab8e9e'

    //     return this.roleRepository
    //         .getOne(userId)
    //         .then(result => {
    //             console.log(result.id);
    //             expect(result).to.be.an('object');
    //             expect(result.firstName).to.be.equals('Nolan');
    //             expect(result.id).to.be.equals(userId);
    //         });
    // });

})
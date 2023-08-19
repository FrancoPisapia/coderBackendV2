import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';
import DbFactory from '../data/factories/dbFactory.js';
import chai from 'chai';

dotenv.config();

const expect = chai.expect;

const db = DbFactory.create(process.env.DB);

import UserMongooseRepository from "../data/repositories/mongoose/userMongooseRepository.js";


describe("Testing User Mongoose Repository", () => {
    before(function () {
        db.init(process.env.MONGO_DB_URI);
        this.userRepository = new UserMongooseRepository();
    });
    after(function () {

        db.drop();
        db.close();
        
    });
    beforeEach(function () {
        this.timeout(5000);
    });
    it('El repositorio debe ser una instancia de UserMongooseRepository', function () {
        expect(this.userRepository instanceof UserMongooseRepository).to.be.ok;
    });

    it('El repositorio debe devolver un arreglo', function () {
        this.timeout(5000)
        return this.userRepository
            .paginate({ limit: 5, page: 1 })
            .then(result =>
            {

                expect(Array.isArray(result.users)).to.be.equals(true);
                expect(result.pagination.limit).to.be.equals(5);
            }
        );
    });


    it('The repository should be able to create a user', function (done) {
        this.timeout(5000)
    
        const user = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            age: 18,
            isAdmin: false,
            password: 12345678
        };

    
        this.userRepository.create(user)
            .then(result => {
                
                expect(result.firstName).to.be.equals(user.firstName);
                expect(result.email).to.be.equals(user.email);
                done(); // Call done() to indicate the test has completed
            })
            .catch(error => done(error)); // Pass any errors to done()
    });

    it('The repository should be able to update a user', function () {
        const updatedData = {
            firstName: 'Updated First Name',
            lastName: 'Updated Last Name',
        };


        return this.userRepository
            .updateOne('64a9a5d04c0f01b4b01fae9d', updatedData)
            .then(result => {
                expect(result.firstName).to.be.equals(updatedData.firstName);
                expect(result.lastName).to.be.equals(updatedData.lastName);
            });
    });

    it('The repository should be able to delete a user', function () {
        const userId = '64a9aaed1409f0f864984766';

        return this.userRepository
            .deleteOne(userId)
            .then(result => {
                expect(result.acknowledged).to.be.equals(true);
            });
    });

    it('The repository should be able to get a user by ID', function () {
        const userId = '64a9a5d04c0f01b4b01fae9d'

        return this.userRepository
            .getOne(userId)
            .then(result => {
                const { id } = result;
                const idAsString = id.toString();
                
                expect(result).to.be.an('object');
                expect(idAsString).to.be.equals(userId);
                
                
            });
    });

})
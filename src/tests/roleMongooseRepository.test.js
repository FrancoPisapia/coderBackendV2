import dotenv from 'dotenv';
dotenv.config();
import DbFactory from '../data/factories/dbFactory.js';
import chai from 'chai';

const expect = chai.expect;

const db = DbFactory.create(process.env.DB);

import RoleMongooseRepository from "../data/repositories/mongoose/roleMongooseRepository.js";


describe("Testing Role Mongoose Repository", () => {
    before(function () {
        db.init(process.env.MONGO_DB_URI);
        this.roleRepository = new RoleMongooseRepository();
    });
    after(function () {
        db.drop();
        //db.close();
    });
    beforeEach(function () {
        this.timeout(5000);
    });
    it('El repositorio debe ser una instancia de RoleMongooseRepository', function () {
        expect(this.roleRepository instanceof RoleMongooseRepository).to.be.ok;
    });

    it('El repositorio debe devolver un arreglo', function () {

        return this.roleRepository
            .paginate({ limit: 5, page: 1 })
            .then(result =>
            {   
                expect(Array.isArray(result.roles)).to.be.equals(true);
                expect(result.pagination.limit).to.be.equals(5);
            }
        );
    });


    //*****ESTE ANDA ******/

    it('The repository should be able to create a role', function (done) {
    
        const role = {
            name: 'algo',
            permissions: ['a','b'],
        };
    
        this.roleRepository.create(role)
            .then(result => {
                expect(result.name).to.be.equals(role.name);
                done(); 
            })
            .catch(error => done(error)); // Pass any errors to done()
    });






    it('The repository should be able to update a role', function () {
        const updatedData = {
            name: 'Role actualizado',
            permissions: ['c','d'],
        };

        return this.roleRepository
            .updateOne('64a88fff3f792071ab5396b5', updatedData)
            .then(result => {
                expect(result.name).to.be.equals(updatedData.name);
                expect(JSON.stringify(result.permissions)).to.be.equals(JSON.stringify(updatedData.permissions));
            });
    });

    it('The repository should be able to delete a role', function () {
        const userId = '64a0604abebb7f7582591620';

        return this.roleRepository
            .deleteOne(userId)
            .then(result => {
                expect(result.acknowledged).to.be.equals(true);
            });
    });

    it('The repository should be able to get a role by ID', function () {
        const roleId = '6494b9ec1405764b428f7a97'

        return this.roleRepository
            .getOne(roleId)
            .then(result => {
                const { id } = result;
                const idAsString = id.toString();
                expect(idAsString).to.be.equals(roleId);
                expect(result).to.be.an('object');
            });
    });

})
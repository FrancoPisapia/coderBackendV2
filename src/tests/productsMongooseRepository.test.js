import dotenv from "dotenv";
dotenv.config();

import { faker } from '@faker-js/faker';
import DbFactory from "../data/factories/dbFactory.js";
import chai from "chai";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

const expect = chai.expect;

const db = DbFactory.create(process.env.DB);

import ProductMongooseRepository from "../data/repositories/mongoose/productsMongooseRepository.js";
import productModel from '../data/models/mongoose/productsModels.js'


describe('Testing Product Mongoose Repository', () => {
    before(function () {
      db.init(process.env.MONGO_DB_URI); 
      this.productRepository = new ProductMongooseRepository();
    });
  
    after(function () {
      db.drop();
      //db.close();
    });
  
    beforeEach(function () {
      this.timeout(5000);
    });
  
    it('The repository should be an instance of ProductMongooseRepository', function () {
      expect(this.productRepository).to.be.an.instanceOf(ProductMongooseRepository);
    });
  
    it('The repository should be able to create a product', function () {
     const product = {
        title: 'Test Product',
        description: 'This is a test product',
        code: '12345678',
        price: 10.99,
        stock: 100,
        category: 'Test',
        thumbnail: 'https://example.com/image.jpg',
      };
  
      return this.productRepository
        .create(product)
        .then(result => {
          expect(result).to.be.an('object');
          expect(result.title).to.equal(product.title);
          expect(result.description).to.equal(product.description);
          expect(result.code).to.equal(product.code);
          expect(result.price).to.equal(product.price);
          expect(result.stock).to.equal(product.stock);
          expect(result.category).to.equal(product.category);
          expect(result.thumbnail).to.equal(product.thumbnail);
        });
    });


    it('The repository should be able to update a product', function () {

      const productId = '64a75ed349b05a500e6f1bf8';
      const updatedData = {
        title: 'Updated Test Product',
        description: 'This is an updated test product',
      };
  
      return this.productRepository
        .updateOne(productId, updatedData)
        .then(result => {
          expect(result).to.be.an('object');
          expect(result.title).to.equal(updatedData.title);
          expect(result.description).to.equal(updatedData.description);
        });
    });

      // it('The repository should be able to delete a product', function () {
      //   const productId = '64a75d48fdfac82893c053fa'; // Reemplaza con el ID de un producto existente en tu base de datos
    
      //   return this.productRepository
      //     .deleteOne(productId)
      //     .then(result => {
      //       expect(result.acknowledged).to.equal(true);
      //     });
      // });
    
})
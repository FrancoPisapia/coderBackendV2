import mongoose, { Schema } from 'mongoose';

const cartsCollection = 'carts';

const cartsSchema = new mongoose.Schema({

    products:{
      type:[
          {
              _id:{
                  type:mongoose.Schema.Types.ObjectID,
                  ref:'products',
              },
              quantity:{type: Number,required: true}
          }
      ],
      default:[]
  }
});

cartsSchema.pre('find', function (){
    this.populate(['products']);
})

const cartModel = mongoose.model(cartsCollection,cartsSchema);

export default cartModel
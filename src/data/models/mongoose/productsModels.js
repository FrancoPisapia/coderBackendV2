
import mongoose, {Schema} from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const productsCollection = 'products';

const productsSchema = new mongoose.Schema({
    
    title: { type: Schema.Types.String, required: true },
    description: { type: Schema.Types.String, required: true },
    code:{type:Schema.Types.String,require:true, unique: true },
    price:{type:Schema.Types.Number,require:true},
    stock:{type:Schema.Types.Number,require:true},
    category:{type: Schema.Types.String,require:true},
    thumbnail:{type: Schema.Types.String},
    owner: { type: String, ref: 'User', default: 'admin' }

    
});

productsSchema.plugin(mongoosePaginate)


const productModel = mongoose.model(productsCollection,productsSchema);


 export default productModel
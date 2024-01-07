import mongoose from "mongoose";

const Schema  = mongoose.Schema;

//Schema for our model here PetDetail is a class which is passed in PetSchema 
const PetSchema = new mongoose.Schema({
    petDetail: { 
        name: { 
            type: String, 
            required: true 
        },
        type: { 
            type: String, 
            required: true 
        },
        breed: { 
            type: String, 
            required: true 
        },
        age: { 
            type: Number, 
            required: true 
        },
        imageUrl:{
            type: String,
            required: true
        }
    },
    status: { 
        type: String, 
        enum: ['available', 'adopted', 'fostered'], 
        required: true
    },
    imageURL: { type: String }
});
const PetModel = mongoose.model('Pet', PetSchema);
export default PetModel;
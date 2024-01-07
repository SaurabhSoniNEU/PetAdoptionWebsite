import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const shelterSchema = new Schema({
         id: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        locationId: {
            type: Number,
            required: true
        },
        contactInformation: {
            type: String,
            required: true
        },
        operatingHours: {
            type: String,
            required: true
        },
        imageUrl:{
            type: String,
            required: true
        }
},
{
   versionKey: false
});

const shelterModel = mongoose.model('shelter', shelterSchema);

export default shelterModel;

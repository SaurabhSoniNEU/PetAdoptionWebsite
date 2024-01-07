import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const recordSchema = new Schema({
        petId: {
            type: Number,
            required: true
        },
        vaccineName: {
            type: String,
            required: true
        },
        dateAdministered: {
            type: Date,
            required: true
        }
},
{
   versionKey: false
});

const vaccinationRecordModel = mongoose.model('record', recordSchema);

export default vaccinationRecordModel;
import Record from '../models/vaccination-record.js';

export const search = async (params = {}) => {
   const vaccinationRecords = await Record.find(params).exec();
   return vaccinationRecords;
}

export const save = async (newRecord) => {
   const record = new Record(newRecord);
   return await record.save();
}

export const findById = async (id) => {
    const record = await Record.findById(id).exec();
    return record;
 }

 export const update = async (updatedRecord, id) => {
    const record = await Record.findByIdAndUpdate(id, updatedRecord).exec();
    return record;
 }

 export const remove = async (id) => {
    return await Record.findByIdAndDelete(id).exec();
 }
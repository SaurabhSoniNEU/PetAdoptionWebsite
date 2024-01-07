import Shelter from '../models/shelter.js';


export const search = async (params = {}) => {
   const shelters = await Shelter.find(params).exec();
   return shelters;
}

export const save = async (newShelter) => {
   const shelter = new Shelter(newShelter);
   return await shelter.save();
}

export const findById = async (id) => {
    const shelter = await Shelter.findById(id).exec();
    return shelter;
 }

 export const update = async (updatedShelter, id) => {
    const shelter = await Shelter.findByIdAndUpdate(id, updatedShelter).exec();
    return shelter;
 }

 export const remove = async (id) => {
    return await Shelter.findByIdAndDelete(id).exec();
 }
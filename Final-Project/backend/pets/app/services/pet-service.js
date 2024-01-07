import PetModel from '../models/petDetail.js'

//For list of pets
export const search = async (params = {}) => {
        const petInfo = await PetModel.find(params).exec();
        return petInfo;
}

//For finding pet by id
export const findById = async (petId) => {
    const petInfo = await PetModel.findById(petId).exec();
    return petInfo;
}

//For adding new pet
export const save = async (newPet) => {
    const pet = new PetModel(newPet);
    return await pet.save();
}

//For updating pet by id
export const update = async (petId, updatedPet) => {
    const petInfo = await PetModel.findByIdAndUpdate(petId, updatedPet, { new: true }).exec();
    return petInfo;
}

//For deleting pet by id
export const remove = async (petId) => {
    return await PetModel.findOneAndDelete({ _id: petId }).exec();
}
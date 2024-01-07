import * as petService from '../services/pet-service.js'
import multer from 'multer';
import { setResponse,setErrorResponse } from './response-handler.js'

//For list of pets
export const find = async (request, response) => {
    try {
        const params = {...request.body};
        const pets = await petService.search(params);
        setResponse(pets, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
}

//For finding pet by id
export const findById = async (request, response) => {
    try {
        const petId = request.params.petId;
        const pet = await petService.findById(petId);
        setResponse(pet, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
}

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, '../images'); // Specify the path where images will be stored
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname); // Use the original file name as the image file name
//     }
// });

// const upload = multer({ storage: storage });


// export const post = async (request, response) => {
//     try {
//         const newPet = { ...request.body, image: request.file.filename }; // Add image filename to newPet
//         const pet = await petService.save(newPet);
//         setResponse(pet, response);
//     } catch (err) {
//         setErrorResponse(err, response);
//     }
// };


//For adding new pet
export const post = async (request, response) => {
    try {
        const newPet = { ...request.body };
        console.log(newPet);
        const pet = await petService.save(newPet);
        setResponse(pet, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
}


//For updating pet by id
export const put = async (request, response) => {
    try {
        const petId = request.params.petId;
        const updatedPet = {...request.body};
        const pet = await petService.update(petId, updatedPet);
        setResponse(pet, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
}

//For deleting pet by id
export const remove = async (request, response) => {
    try {
        const petId = request.params.petId;
        await petService.remove(petId);
        setResponse({ message: 'Pet deleted successfully' }, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
}
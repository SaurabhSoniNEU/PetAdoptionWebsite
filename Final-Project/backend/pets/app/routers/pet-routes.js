import express from 'express';
import * as petController from '../controllers/pet-controller.js'

const router = express.Router();

//When we're fetching data normally using '/pets'
router.route('/')
    .get(petController.find)
    .post(petController.post);

//When we're fetching data by id using '/pets/:petId'
router.route('/:petId')
    .get(petController.findById)
    .put(petController.put)
    .delete(petController.remove);

export default router;
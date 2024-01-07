import express from 'express';

import * as shelterController from '../controllers/shelter-controller.js';

const router = express.Router();

router.route('/')
   .get(shelterController.find)
   .post(shelterController.post);

router.route('/:id')
   .get(shelterController.get)
   .put(shelterController.put)
   .delete(shelterController.remove);

export default router;
import express from 'express';

import * as vaccinationRecordController from '../controllers/vaccination-record-controller.js';

const router = express.Router();

router.route('/')
   .get(vaccinationRecordController.find)
   .post(vaccinationRecordController.post);

router.route('/:id')
   .get(vaccinationRecordController.get)
   .put(vaccinationRecordController.put)
   .delete(vaccinationRecordController.remove);

export default router;
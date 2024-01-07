import * as vaccinationService from '../services/vaccination-record-service.js';

import { setResponse, setErrorResponse } from './response-handler.js'

export const find = async (request, response) => {
     try {
        //clone object using spread operator
         const params = {...request.query};
         const records = await vaccinationService.search(params);
         response.status(200)
             .json(records);
     } catch (err) {
          response.status(500)
               .json ({
                   code: "ServiceError",
                   message: "Error occured while processing your request."
               })
     }
}

export const post = async (request, response) =>
{
      try {
        const newrecords = {...request.body};
        const records = await vaccinationService.save(newrecords);
        setResponse(records, response);
      } 
      catch(err)
      {
        setErrorResponse(err, response);
      }
}

export const get = async (request, response) => {
 try{
      const id= request.params.id;
      const record = await vaccinationService.findById(id);
      setResponse(record, response);
 } catch (err) {
     setErrorResponse(err, response);
 }
}

export const put = async (request, response) => {
    try{
        const id= request.params.id;
        const updatedRecord = {...request.body};
        const record = await vaccinationService.update(updatedRecord, id);
        setResponse(record, response);
   } catch (err) {
       setErrorResponse(err, response);
   }
}

export const remove =async (request, response) => {
    try{
        const id= request.params.id;
        const record = await vaccinationService.remove(id);
        setResponse({}, response);
   } catch (err) {
       setErrorResponse(err, response);
   }
}
import * as shelterService from '../services/shelter-service.js';

import { setResponse, setErrorResponse } from './response-handler.js'

export const find = async (request, response) => {
     try {
        //clone object using spread operator
         const params = {...request.query};
         const shelters = await shelterService.search(params);
         response.status(200)
             .json(shelters);
     } catch (err) {
          response.status(500)
               .json ({
                   code: "ServiceError",
                   message: "Error occurred while processing your request."
               })
     }
}

export const post = async (request, response) =>
{
      try {
        const newShelter = {...request.body};
        const shelter = await shelterService.save(newShelter);
        setResponse(shelter, response);
      } 
      catch(err)
      {
        setErrorResponse(err, response);
      }
}

export const get = async (request, response) => {
 try{
      const id= request.params.id;
      const shelter = await shelterService.findById(id);
      setResponse(shelter, response);
 } catch (err) {
     setErrorResponse(err, response);
 }
}

export const put = async (request, response) => {
    try{
        const id= request.params.id;
        const updatedShelter = {...request.body};
        const shelter = await shelterService.update(updatedShelter, id);
        setResponse(shelter, response);
   } catch (err) {
       setErrorResponse(err, response);
   }
}

export const remove =async (request, response) => {
    try{
        const id= request.params.id;
        const shelter = await shelterService.remove(id);
        setResponse({}, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
}
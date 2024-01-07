import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import registerRouter from './routes/index.js'
import models from './models/index.js';

const initialize = (app) => {

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded());
    mongoose.connect('mongodb+srv://mucharladonald:xT0L2q4tAOwotAWw@lecture9.krolxw4.mongodb.net/vaccinationRecorddb?retryWrites=true&w=majority');
    registerRouter(app);

}

export default initialize;
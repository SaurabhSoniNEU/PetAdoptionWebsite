import express from 'express';
import initialize from './app/app.js';

//Initialize & assign a port number to listen
const app = express();
const port = 3002;

initialize(app);

app.listen(port, ()=>console.log(`Server is listening at ${port}`));
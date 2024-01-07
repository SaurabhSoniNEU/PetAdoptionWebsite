import express from 'express';

import initialize from './app/app.js';

const app = express();

const port = 4000;

initialize(app);

app.listen(port, () => console.log('Server is listening at port 4000'));
//app.get('/', (request, response) => response.send('Hello World'));

//app.listen(3000, () => console.log('Server is listening at port 3000'));
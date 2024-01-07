import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import petRouter from './app/routers/pet-routes.js'
import router from './app/routers/shelter-routes.js'
 
 
//Using dotenv for safe config 
dotenv.config();
const app = express();
const port = process.env.PORT || 4000;
const corsOptions = {
  origin: "*",
};
 
// database connection
mongoose.set("strictQuery", false);
  
const connect = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING_SAURABH, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
 
    console.log("MongoDB database connected");
  } catch (err) {
    console.log("MongoDB database connection failed");
  }
};
 
// middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use('/pets',petRouter);
app.use('/shelter', router )

//Initialize & assign a port number to listen
app.listen(port, () => {
  connect();
  console.log("server listening on port", port);
});
 
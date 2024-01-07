import petRouter from './pet-routes.js'

//index file which will initialize all the functions of pet routes
export default(app)=>{
    app.use('/pets',petRouter);
}
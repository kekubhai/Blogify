const path=require("path");
const express=require('express');
const userRoutes=require('./routes/user');
const mongoose=require('mongoose');

const app =express()
const PORT =8000;
mongoose.connect('mongodb://localhost:27017/blogify').then((e)=> console.log("MongoDb Connected"));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({extended:false}));

app.get("/",(req,res)=>{
    res.render("home");
});
app.use('user', userRoutes);

app.listen(PORT,()=> console.log(`Server Started at PORT :${PORT}`));
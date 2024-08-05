const path=require("path");
const express=require('express');
const userRoutes=require('./routes/user');

const app =express()
const PORT =8000;
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/",(req,res)=>{
    res.render("home");
});
app.use('user', userRoutes);

app.listen(PORT,()=> console.log(`Server Started at PORT :${PORT}`));
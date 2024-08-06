const express=require("express");
const router=express.Router();
const User=require('../models/user')

router.get("./signin", (res,req)=>{
    return res.render("signin");
});
router.get("./signup", (res,req)=>{
    return res.render("signup");
});

router.post('/signin.ejs',async (req,res)=>{
    const {email,password}=req.body;
    const user= User.matchPassword(email,password);
console.log('User', user)
return res.redirect("/");

})
router.post("/signup.ejs", async(res,req)=>{
    const{fullName,email,password}=req.body;
    await User.create({
        fullName,
        email,
        password,
    });
    return res.redirect("/");
});


module.exports=router;

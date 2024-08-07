const express=require("express");
const router=express.Router();
const User=require('../models/user')

router.get("./signin", (res,req)=>{
    return res.render("signin");
});
router.get("/signup", (res,req)=>{
    return res.render("signup");
});

router.post("/signin",async (req,res)=>{
    const {email,password}=req.body;
    try{
        const token=  await User.matchPasswordAndGenerateToken(email,password);

    }
    catch(error){
        return res.render("signin",{
            error:"Incorrect Password",
        })
    }
    
return res.cookie('token',token).redirect("/");

})
router.post("/signup", async(res,req)=>{
    const{fullName,email,password}=req.body;
    await User.create({
        fullName,
        email,
        password,
    });
    return res.redirect("/");
});


module.exports=router;

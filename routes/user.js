const express=require("express");
const router=express.Router();

router.get("./signin", (res,req)=>{
    return res.render("signin");
});
router.get("./signup", (res,req)=>{
    return res.render("signup");
});
router.post("/signup", async(res,req)=>{
    const{fullname,email,password}=req.body;
    await User.create({
        fullname,
        email,
        password,
    });
    return res.direct("/");
});


module.exports=router;

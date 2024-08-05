const {Schema,model}=require("mongoose");
 const {createHmac,randomBytes}= import('node:crypto');

const userSchema=new Schema({

    full:{ 
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    salt:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        unique:true,
    },
    profileImageURl:{
    type:String,
    default:"/public/images/admin.png",
},
role:{
    type:String,
    enum: ["USER", "ADMIN"],
    default: "USER",
}

},
{timestamps:true}
);
userSchema.pre('save', function(next){
    const user=this;
    if(!user.isModified("password")) return;

    const salt=randomBytess(16).toString();
    const hashPassword= createHmac('sha256',salt )
    .update(user.password)
    .digest("hex");

    this.salt=salt;
    this.password=hashPassword;

    next();

})
const User =model('user',userSchema);

module.exports =User;
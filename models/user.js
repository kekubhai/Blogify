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

    const salt='someRandomsalt';
    const hashPassword= createHmac('sha256',salt )
    .update(user.password)
    .digest("hex");

    this.salt=salt;
    this.password=hashPassword;

    next();

});

userSchema.static('matchPassword', async function(email,password){ 
    const user= await this.findOne({email});
    if(!user) throw new Error('user Not Found');
    const salt= randomBytes(16).toString();
    const hashedPassword=user.password;


    const userProvidedHash=createHmac("sha256",salt)
    .update(password)
    .digest("hex");
    if(hashedPassword != userProvidedHash)
        throw new Error("Incorrect Password");


    return { ...user,password:undefined,salt:undefined};
});
const User =model('user',userSchema);

module.exports =User;
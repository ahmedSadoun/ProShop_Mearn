import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'


const userShcema=mongoose.Schema({
    name :{
        type :String ,
        required:true
    },
    email :{
        type :String ,
        required:true,
        unique:true
    },
    password :{
        type :String ,
        required:true
    },
    isAdmin :{
        type :Boolean ,
        required:true,
        default:false
    },
},{timestamps:true})
userShcema.methods.matchPassword=async function(enteredPasswrod){
    return await bcrypt.compare(enteredPasswrod , this.password)
}
userShcema.pre('save',async function(next){
    //if there is no modification in the password then pass , do nothing to the password . 
    if(!this.isModified('password')){
        next()
    }
    const salt=await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt )
})

const User=mongoose.model('User',userShcema)
export default User

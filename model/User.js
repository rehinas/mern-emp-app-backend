const mongoose=require('mongoose');
const schema=mongoose.Schema({
    usertype:String,
    name:{
     type:String,
     required:true,
    },
    password:{
        type:String,
        required:true
    }


})

const emp=mongoose.model('Signin',schema);
module.exports=emp;
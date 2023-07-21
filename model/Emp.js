const mongoose=require('mongoose');
const schema=mongoose.Schema({
    name:{
     type:String,
     required:true,
    },

    address:{type:String,
        required:true,

    },
    email:
    {type:String,
      required:true,
    },

    phn:{type:Number,
        required:true,
    },
    salary:{
      type:Number,
      required:true
    }
})

const emp=mongoose.model('admin',schema);
module.exports=emp;
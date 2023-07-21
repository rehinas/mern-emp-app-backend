const mongoose=require("mongoose");
mongoose.connect('mongodb+srv://rehinas:rehi@cluster0.rkmimmv.mongodb.net/emp_app')
.then(()=>{
    console.log("db is connected successfully!")
})
.catch(err=>console.log("error connectiong",err))
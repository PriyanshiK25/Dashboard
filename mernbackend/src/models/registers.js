const mongoose=require("mongoose");

const studentSchema=new mongoose.Schema({
    username :{
        type:String,
        required:true

    },
    email :{
        type:String,
        required:true,
        unique:true

    },
    pass :{
        type:String,
        required:true

    },
    re_pass :{
        type:String,
        required:true

    }

})

const Register = new mongoose.model("Register",studentSchema);

module.exports = Register;
const mongoose=require("mongoose");

const companySchema=new mongoose.Schema({
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

const CRegister = new mongoose.model("CRegister",companySchema);

module.exports = CRegister;
const mongoose=require("mongoose");

const detailSchema=new mongoose.Schema({
    Fname : {
        type:String,
        required:true

    },
    
    Lname :{
        type:String,
        required:true
    },
    USN :{
        type:String,
        required:true,
        unique:true
    },

    Num :{
        type:String,
        required:true
    },

    Email :{
        type:String,
        required:true,
        unique:true
    },
    DOB :{
        type:String,
        required:true,
        
    },
    Cursem :{
        type:String,
        required:true

    },
    Branch :{
        type:String,
        required:true

    },

    Percentage :{
        type:String,
        required:true,
        
    },
    Puagg :{
        type:String,
        required:true

    },
    Beagg :{
        type:String,
        required:true

    },

    
    Backlogs :{
        type:String,
        required:true,
        
    },
    History :{
        type:String,
        required:true

    }

})

const Detail = new mongoose.model("Detail",detailSchema);

module.exports = Detail;




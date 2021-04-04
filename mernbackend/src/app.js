
const express =require("express");
const app = express();
const path =require("path");
const hbs=require("hbs");
const ejs=require("ejs");
require("./db/conn");

const Register = require("./models/registers");
const CRegister = require("./models/cregisters");
const Detail = require("./models/details");

//const { Resolver} = require("dns");
const{json}=require("express");
const { RSA_NO_PADDING } = require("constants");
const port = process.env.PORT || 8000;

const static_path=path.join(__dirname, "../public");
const template_path=path.join(__dirname,"../templates/views");
const partials_path=path.join(__dirname,"../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(static_path));

app.set("view engine", "hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);
app.set("view engine", "ejs");
//app.use(express.static('views/images')); 

app.get("/",(req,res)=> {
    res.render("index.hbs")
});

app.get("/fetch",(req,res)=> {
    Detail.find({},function(err,details){
        res.render("fetch.ejs",{
            detailList: details
        })
    })
})
app.get("/register",(req,res)=>
{
    res.render("register"); 
})
////company register
app.get("/cregister",(req,res)=>
{
    res.render("cregister"); 
})
app.post("/cregister",async(req,res)=>{
    try {
        const password = req.body.pass;
        const cpassword = req.body.re_pass;

        if(password === cpassword ){
            const companyReg = new CRegister({
                username:req.body.username,
                email:req.body.email,
                pass:req.body.pass,
                re_pass:req.body.re_pass

            })

            const registered = await companyReg.save();
            res.status(201).render("index");
      

        }else{
            res.send("Your password is incorrect");
        }

    } catch (error) {
    res.status(400).send(error);
    }

})
///company login
app.get("/clogin",(req,res)=>
{
    res.render("clogin"); 
})
//
app.post("/clogin",async(req,res)=>
{
try {
    const email=req.body.your_name;
    const password=req.body.your_pass;

    const check_email= await CRegister.findOne({email:email});
   // console.log(check_email.pass);
   // console.log(password);
   if(check_email.pass===password)
    {
        res.status(201).render("index");
    }
    else
    {
        res.send("chutiye ho kya tumhara nhi hai to kyu marne aaye ho yha");
    }

} catch (error) {
    res.status(400).send("invalid login details");
}
})
app.get("/login",(req,res)=>
{
    res.render("login.hbs"); 
})

app.post("/register",async(req,res)=>{
    try {
        const password = req.body.pass;
        const cpassword = req.body.re_pass;

        if(password === cpassword ){
            const studentReg = new Register({
                username:req.body.username,
                email:req.body.email,
                pass:req.body.pass,
                re_pass:req.body.re_pass

            })

            const registered = await studentReg.save();
            res.status(201).render("login");
      

        }else{
            res.send("Chutiye ho kya password bhi nhi shi daal pa rhe")
        }

    } catch (error) {
    res.status(400).send(error);
    }

})
app.post("/login",async(req,res)=>
{
try {
    const email=req.body.your_name;
    const password=req.body.your_pass;

    const check_email= await Register.findOne({email:email});
    //console.log(check_email.pass);
   // console.log(password);
   if(check_email.pass===password)
    {
        res.status(201).render("slogin.hbs");
    }
    else
    {
        res.send("chutiye ho kya tumhara nhi hai to kyu marne aaye ho yha");
    }

} catch (error) {
    res.status(400).send("invalid login details");
}
})

app.get("slogin",(req,res)=> {
    res.render("slogin.hbs")
});

app.get("/detail",(req,res)=> {
    res.render("detail.hbs")
});

app.post("/detail",async(req,res)=>{
    try {
        console.log(req.body.Fname);
        
        
            const studentDetails = new Detail({

                Fname:req.body.Fname,
                Lname:req.body.Lname,
                USN:req.body.USN,
                Num:req.body.Num,
                Email:req.body.Email,
                DOB:req.body.DOB,
                Cursem:req.body.Cursem,
                Branch:req.body.Branch,
                Percentage:req.body.Percentage,
                Puagg:req.body.Puagg,
                Beagg:req.body.Beagg,
                Backlogs:req.body.Backlogs,
                History:req.body.History

                
            })
            const registerD = await studentDetails.save();
            res.status(201).render("slogin.hbs");

    } catch (error) {
    res.status(400).send(error);
    }

})

app.listen(port, ()=>{
    console.log(`server is running at port no ${port}`);
})
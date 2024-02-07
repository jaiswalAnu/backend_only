//import the model
const Todo=require("../models/Todo");
//define route handler
exports.createtodo=async(req,res)=>{
    try{
        //extract title and descreation from reaest body
         const {title,description}=req.body;
         //create a new todo and insert in db
         const response=await Todo.create({title,description}); 
         //send a json respone with a succes flag
         res.status(200).json(
            {
                success:true,
                data:response,
                message:'Entry Created Successfully'

            }
         );

    }
    catch(err){
        console.error(err);
        console.log(err);
        res.status(500)
        .json({
            success:false,
            data:"internal server error",
            message:errmessage,
        })

    }
}
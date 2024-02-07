const Todo=require("../models/Todo");
exports.getTodos=async(req,res)=>{
    try{
        const todos=await Todo.find({});
        res.status(200)
        .json({
            success:true,
            data:todos,
            message:"Enter Todo Data is Fetched",
        });
    }
    catch(err){
        console.error(err);
        // console.log(err);
        res.status(500)
        .json({
            success:false,
            error:err.message,
            // data:"internal server error",
            message:'Server Error',
        });

}
} 

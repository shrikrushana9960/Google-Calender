const mongoose=require('mongoose');

const DB=process.env.DATABASE;

exports.dbConnect=()=>{
    mongoose.connect(DB,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>{
        console.log('DB Connected Sucessfully')
    }).catch((e)=>{
        console.log(e)
    })
}
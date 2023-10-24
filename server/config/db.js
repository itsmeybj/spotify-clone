import mongoose from "mongoose";

console.log(process.env.DB_CONNECT);

mongoose.connect(process.env.DB_CONNECT).then(()=>{
    console.log('connected!!!');
}).catch((err)=>{
    console.log(`error while connection.. ${err}`);
})



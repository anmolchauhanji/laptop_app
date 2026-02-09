import mongoose from "mongoose";

const connectDB = async()=>{
    try {
      await mongoose.connect(process.env.MONGO_URI, {
  dbName: "laptopKart"
});
console.log("connected");    
} catch (e) {
        console.log("db not conected" , e);
         
    }
}



export default connectDB
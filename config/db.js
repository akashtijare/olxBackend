const mongoose = require("mongoose")
require('dotenv').config()


const shoeSchema = new  mongoose.Schema({
    name: String,
  description: String,
  category: String,
  image: String,
  location: String,
  postedAt: Date,
  price: String,
})




const ShoeModel = mongoose.model("shoesData", shoeSchema)


const connection = mongoose.connect(process.env.MONGO_URL)



module.exports={connection,ShoeModel};



const express =  require("express");
const { connection } = require("mongoose");


require('dotenv').config()

const cors = require("cors");
const { shoeRouter } = require("./Routers/shoe.router");

const PORT = process.env.PORT||8000

const app = express();



app.use(express.json())
app.use(cors({
    origin : "*"
}))


app.get("/",(req,res)=>{
    res.send({message:"base url"})
})

 app.use("",shoeRouter)



app.listen(PORT, async()=>{


    try {
        await connection
        console.log("connected")
    } catch (error) {
        console.log(error)
    }
    console.log("listening")
})
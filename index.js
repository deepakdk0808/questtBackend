const express=require('express')
const app=express()
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const cors = require("cors");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const bookRoute = require("./routes/book");
const cartRoute = require("./routes/cart");


dotenv.config()
app.use(express.json())
app.use(cors());
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute);
app.use("/api/books", bookRoute);
app.use("/api/carts", cartRoute);



mongoose
.connect(
process.env.MONGO_URL
)
.then(()=>{
    console.log("DB Success")
})
.catch((err)=>{
    console.log(err)
})

const port=process.env.PORT_NO 

app.listen(port || 4040 ,()=>{
    console.log(`listening to ${port}`)
})
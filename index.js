const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoute = require("./routes/user")
const dotenv = require("dotenv");

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("DB connect successfull"))
    .catch((err)=>{console.log(err);});

app.use("/api", userRoute);


app.listen(5000, ()=>{
    console.log("server is running");
});


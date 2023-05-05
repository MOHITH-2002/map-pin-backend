const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
//importng routes

const MapPinsRoutes = require('./routes/mapPins.js');
const UsersRoutes = require('./routes/users.js');





app.use(express.json());
app.use(cors());
const port = process.env.PORT || 8800;
mongoose.set('strictQuery', false);
mongoose.connect(process.env.API_MONGO,{useNewUrlParser:true}).then(()=>{
    console.log("mongodb is connected to server");
}).catch((err)=>{
    console.log(err);
})

app.get('/', (req, res) =>{
    res.send("hello");
})

// using routes
app.use("/pins",MapPinsRoutes); /// "/pins/" note any name you can give
app.use("/users",UsersRoutes); /// "/users/"note any name you can give



app.listen(port, function (){

  console.log("server is connected");
})
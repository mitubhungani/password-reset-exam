const express = require('express');
const path = require('path');
const dbConnect = require('./config/db');
const userRouter = require('./router/user.router');

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get('/',(req,res)=>{
    res.render('index')
})

app.use('/user',userRouter)

app.listen(8090,()=>{
    console.log('Server is running on port 8090');
    dbConnect()
})
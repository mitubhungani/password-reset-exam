const express = require("express");
const path = require("path");
const Cookies = require("cookie-parser");
const dbConnect = require("./config/db");
const userRouter = require("./router/user.router");
const User = require("./model/user.model");

const app = express();
app.use(Cookies());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", async (req, res) => {
    let {id} =req.cookies
    let user = await User.findById(id)
    console.log("user",user);
    res.render("index", {user})
    
});

app.use("/user", userRouter);

app.listen(8090, () => {
  console.log("Server is running on port 8090");
  dbConnect();
});

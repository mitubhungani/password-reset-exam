const User = require("../model/user.model");
const sendMail = require("../service/mailservice");

const getUser = async (req, res) => {
  try {
    let user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const userFindById = async (req, res) => {
  try {
    let { userId } = req.params;
    let user = await User.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    } else {
      let { email } = req.body;
      let isExist = await User.findOne({ email: email });
      if (isExist) {
        return res.status(400).json({ error: "Email already exists" });
      } else {
        let user = await User.create(req.body);
        res.status(201).json(user);
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    let isExist = await User.findOne({ email: email });
    console.log("isExist", isExist);

    if (!isExist) {
      return res.send("Not Found");
    }

    if (isExist.password != password) {
      return res.send("Not Found");
    }
    res.cookie("id", isExist.id);
    console.log("id", isExist.id);
    return res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const signupPage = (req, res) => {
  res.render("signup");
};

const loginPage = (req, res) => {
  res.render("login");
};

const sendMails = async (req, res) => {
    try {
        const { to, subject, html } = req.body;
        await sendMail(to,subject,html);
        res.send(`Mail Send To: ${to}`);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

let otps = new Map();

const sendOtp = async (req, res)=>{
    const {email} = req.body;
    let isExist = await User.findOne({email:email})
    if(!isExist){
        return res.send('user not found')
    }
    try {
        let otp = Math.round(Math.random() *1000000)
        otps.set(otp,email)

        let html = `<h1>OTP for password reset is ${otp}</h1>`
        await sendMail(email,'password reset',html)
        res.redirect("/user/reset-password");
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

const varifyOtp = async (req, res)=>{
    const {otp,password} = req.body

    let data = otps.get(Number(otp))
    if(!data){
        return res.send('Invalid OTP')
    }

    let user =await User.findOne({email:data})
console.log(user);

    user.password=password
    await user.save()
    console.log("updated",user);
    
    
    res.send('Password reset successfully')
}

module.exports = {
  getUser,
  userFindById,
  createUser,
  loginUser,
  signupPage,
  loginPage,
  sendMails,
  sendOtp,
  varifyOtp
};

const User = require("../model/user.model");

const getUser =async(req,res)=>{
    try {
        let user = await User.find()
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const userFindById = async(req,res)=>{
    try {
        let {userId}= req.params
        let user =await User.findById(userId)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const createUser = async(req,res)=>{
    try {
        let {username, email,password} = req.body
        if(!username || !email || !password){
            return res.status(400).json({error: "All fields are required"})
        }else{
            let {email} =req.body
            let isExist = await User.findOne({email:email})
            if(isExist){
                return res.status(400).json({error: "Email already exists"})
            }else{
                let user =await User.create(req.body)
                res.status(201).json(user)
            }
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const loginUser = async(req,res)=>{
    try {
        let{email,password}= req.body
        let user = await User.findOne({email:email})
        if(!user){
            return res.status(401).json({error: "Invalid credentials"})
        }

        if(user.password !== password){
            return res.status(401).json({error: "Invalid credentials"})
        }
        res.render('index',{user})
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

const signupPage = (req,res)=>{
    res.render('signup')
}

const loginPage =  (req,res)=>{
    res.render('login')
}

module.exports= {getUser,userFindById,createUser,loginUser,signupPage,loginPage}
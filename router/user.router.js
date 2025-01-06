const { Router } = require("express");
const { getUser, userFindById, createUser, loginUser, signupPage, loginPage, sendMails, sendOtp, varifyOtp } = require("../controller/user.controller");

const userRouter = Router()

userRouter.get('/reset-password', (req, res) => {
    res.render('resetpassword')
})

userRouter.get('/login',loginPage)
userRouter.get('/signup',signupPage)

userRouter.get('/',getUser)
userRouter.get('/:id',userFindById)
userRouter.post('/signup',createUser)
userRouter.post('/login',loginUser)
userRouter.post('/mail',sendMails)
userRouter.post('/send-otp',sendOtp)
userRouter.post('/reset-password',varifyOtp)

module.exports = userRouter;
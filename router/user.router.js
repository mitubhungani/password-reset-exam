const { Router } = require("express");
const { getUser, userFindById, createUser, loginUser, signupPage, loginPage } = require("../controller/user.controller");

const userRouter = Router()

userRouter.get('/login',loginPage)
userRouter.get('/signup',signupPage)

userRouter.get('/',getUser)
userRouter.get('/:id',userFindById)
userRouter.post('/signup',createUser)
userRouter.post('/login',loginUser)

module.exports = userRouter;
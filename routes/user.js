import express from 'express'
import { signup } from '../controller/user.js'
import { userSignUpValidator } from '../validator/index.js'

const router = express.Router()

router.post('/signup', userSignUpValidator, signup)

export default router

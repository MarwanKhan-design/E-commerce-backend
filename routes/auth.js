import express from 'express'
import { signup, signin, signout, requireSignin } from '../controller/auth.js'
import { userSignUpValidator } from '../validator/index.js'

const router = express.Router()

router.post('/signup', userSignUpValidator, signup)
router.post('/signin', signin)
router.get('/signout', signout)

export default router

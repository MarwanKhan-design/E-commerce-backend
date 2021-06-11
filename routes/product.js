import express from 'express'
import { isAdmin, isAuth, requireSignin } from '../controller/auth.js'
import { create } from '../controller/product.js'
import { userById } from '../controller/user.js'

const router = express.Router()

router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, create)

router.param('userId', userById)

export default router

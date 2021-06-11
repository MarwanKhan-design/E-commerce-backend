import express from 'express'
import { isAdmin, isAuth, requireSignin } from '../controller/auth.js'
import { create } from '../controller/category.js'
import { userById } from '../controller/user.js'

const router = express.Router()

router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create)

router.param('userId', userById)

export default router

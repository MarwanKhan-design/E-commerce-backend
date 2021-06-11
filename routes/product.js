import express from 'express'
import { isAdmin, isAuth, requireSignin } from '../controller/auth.js'
import { create, productById, read } from '../controller/product.js'
import { userById } from '../controller/user.js'

const router = express.Router()

router.get('/product/read/:productId', read)
router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, create)

router.param('userId', userById)
router.param('productId', productById)

export default router

import express from 'express'
import { sayHi } from '../controller/user.js'

const router = express.Router()

router.get('/', sayHi)

export default router

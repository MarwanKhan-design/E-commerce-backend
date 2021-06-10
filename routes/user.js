import express from 'express'
import { requireSignin, isAuth, isAdmin } from '../controller/auth.js'
import { userById } from '../controller/user.js'

const router = express.Router()

router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res) => {
  res.json({
    user: req.profile,
  })
})

router.param('userId', userById)

export default router

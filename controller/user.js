import User from '../model/user.js'
import { errorHandler } from '../helpers/dbErrorHandler.js'

export const signup = (req, res) => {
  // console.log('req body', req.body)
  const user = new User(req.body)
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) })
    }
    user.salt = undefined
    user.hashed_password = undefined
    res.json({ user })
  })
}

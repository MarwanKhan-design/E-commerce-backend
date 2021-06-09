import User from '../model/user.js'
import { errorHandler } from '../helpers/dbErrorHandler.js'
import jwt from 'jsonwebtoken' // to generate signed token
import expressJwt from 'express-jwt' // for authorization check

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

export const signin = (req, res) => {
  // find user based on email
  const { email, password } = req.body
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res
        .status(400)
        .json({ error: 'User with that email does not exist, Please signup' })
    }
    // matching email and password
    // create authenticate method in user model
    if (!user.authenticate(password)) {
      return res.status(401).json({ error: "Email and password don't match" })
    }
    // generate a signed token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    // persist the token as 't' in cookie with expiry date
    res.cookie('t', token, { expire: new Date() + 9999 })
    //  return res with user and token in frontend
    const { _id, name, email, role } = user
    return res.json({ token, user: { _id, email, name, role } })
  })
}

export const signout = (req, res) => {
  res.clearCookie('t')
  res.json({ message: 'Signout successful' })
}

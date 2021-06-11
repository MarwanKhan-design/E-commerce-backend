import Category from '../model/category.js'
import { errorHandler } from '../helpers/dbErrorHandler.js'

export const create = (req, res) => {
  const category = new Category(req.body)
  category.save((err, data) => {
    if (err) {
      res.status(400).json({ error: errorHandler(err) })
    }
    res.json(data)
  })
}

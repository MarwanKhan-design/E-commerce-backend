import Product from '../model/product.js'

import formidable from 'formidable'
import _ from 'lodash'

import fs from 'fs'
import { errorHandler } from '../helpers/dbErrorHandler.js'

export const create = (req, res) => {
  let form = formidable.IncomingForm()
  form.keepExtensions = true

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json('Image could not be uploaded')
    }
    // Check for all fields

    const { name, description, price, quantity, category, shipping } = fields

    if (
      !name ||
      !description ||
      !price ||
      !quantity ||
      !category ||
      !shipping
    ) {
      res.status(400).json({ error: 'All Fields are required' })
    }

    let product = new Product(fields)

    if (files.photo) {
      if (files.photo.size > 1000000) {
        res.status(400).json({ error: 'Image should be less then 1mb in size' })
      }
      product.photo.data = fs.readFileSync(files.photo.path)
      product.photo.contentType = files.photo.type
    }
    product.save((err, result) => {
      if (err) {
        res.status(400).json({ error: errorHandler(err) })
      }
      res.json(result)
    })
  })
}

export const productById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err || !product) {
      res.status(400).json({
        error: 'Product not found',
      })
    }
    req.product = product
    next()
  })
}

export const read = (req, res) => {
  req.product.photo = undefined
  return res.json(req.product)
}

// Imports

import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import expressValidator from 'express-validator'

// Import routes

import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'
import categoryRoutes from './routes/category.js'
import productRoutes from './routes/product.js'

// App

const app = express()

dotenv.config()

// Database

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database Connected'))

// Middleware
app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(expressValidator())

// Routes

app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', categoryRoutes)
app.use('/api', productRoutes)

const port = process.env.PORT || 8000

// Listeners

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

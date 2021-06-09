// Imports

import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRoutes from './routes/user.js'

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

// Routes

app.use('/api', userRoutes)

const port = process.env.PORT || 8000

// Listeners

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

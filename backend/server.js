import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import connectDB from './config/db.js'

import authRouter from './routes/authRoutes.js'
import benefitRouter from './routes/benefitRoutes.js'
import claimRouter from './routes/claimRoutes.js'
import aiRouter from './routes/aiRoutes.js'

import errorMiddleware from './middleware/errorMiddleware.js'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/benefits', benefitRouter)
app.use('/api/claims', claimRouter)
app.use('/api/ai', aiRouter)

app.get('/', (req, res) => {
  res.send('🚀 ProPerks API running')
})

app.use(errorMiddleware)

const startServer = async () => {
  try {
    await connectDB()

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error(error.message)
    process.exit(1)
  }
}

startServer()
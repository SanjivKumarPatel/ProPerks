import express from 'express'
import { getAIAdvice } from '../controllers/aiController.js'
import protect from '../middleware/authMiddleware.js'

const aiRouter = express.Router()

aiRouter.post('/advice', protect, getAIAdvice)

export default aiRouter
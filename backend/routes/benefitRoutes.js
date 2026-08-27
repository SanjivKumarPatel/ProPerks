import express from 'express'
import { getBenefits, getBenefit } from '../controllers/benefitController.js'
import protect from '../middleware/authMiddleware.js'

const benefitRouter = express.Router()

benefitRouter.get('/', protect, getBenefits)
benefitRouter.get('/:id', protect, getBenefit)

export default benefitRouter
import express from 'express'
import { claimBenefit, getMyClaims } from '../controllers/claimController.js'
import protect from '../middleware/authMiddleware.js'

const claimRouter = express.Router()

claimRouter.post('/:benefitId', protect, claimBenefit)
claimRouter.get('/', protect, getMyClaims)

export default claimRouter
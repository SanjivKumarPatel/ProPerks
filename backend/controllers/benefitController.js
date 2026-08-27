import asyncHandler from '../middleware/asyncHandler.js'
import Benefit from '../models/Benefit.js'

// @desc    Get all active benefits
// @route   GET /api/benefits
// @access  Private
export const getBenefits = asyncHandler(async (req, res) => {

  const benefits = await Benefit.find({ isActive: true })

  res.status(200).json({ success: true, benefits })
})

// @desc    Get single benefit
// @route   GET /api/benefits/:id
// @access  Private
export const getBenefit = asyncHandler(async (req, res) => {

  const benefit = await Benefit.findById(req.params.id)

  if (!benefit) {
    const error = new Error('Benefit not found')
    error.statusCode = 404
    throw error
  }

  res.status(200).json({ success: true, benefit })
})
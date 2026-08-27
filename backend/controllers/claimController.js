import asyncHandler from '../middleware/asyncHandler.js'
import Claim from '../models/Claim.js'
import Benefit from '../models/Benefit.js'

// @desc    Claim a benefit
// @route   POST /api/claims/:benefitId
// @access  Private
export const claimBenefit = asyncHandler(async (req, res) => {

  const userId = req.user.id
  const { benefitId } = req.params

  const benefit = await Benefit.findById(benefitId)

  if (!benefit) {
    const error = new Error('Benefit not found')
    error.statusCode = 404
    throw error
  }

  const existingClaim = await Claim.findOne({ user: userId, benefit: benefitId })

  if (existingClaim) {
    const error = new Error('Benefit already claimed')
    error.statusCode = 400
    throw error
  }

  const claim = await Claim.create({ user: userId, benefit: benefitId })

  res.status(201).json({ success: true, message: 'Benefit claimed successfully', claim })
})

// @desc    Get logged in user's claimed benefits
// @route   GET /api/claims
// @access  Private
export const getMyClaims = asyncHandler(async (req, res) => {

  const userId = req.user.id
  const claims = await Claim.find({ user: userId }).populate('benefit')
  res.status(200).json({ success: true, claims })
})
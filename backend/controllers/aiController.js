import asyncHandler from '../middleware/asyncHandler.js'
import Benefit from '../models/Benefit.js'
import Claim from '../models/Claim.js'
import { aiResponse } from '../config/ai.js'

// @desc    Get AI advice about benefits and claims
// @route   POST /api/ai/advice
// @access  Private
export const getAIAdvice = asyncHandler(async (req, res) => {

  const userId = req.user.id
  const { question } = req.body

  if (!question || !question.trim()) {
    const error = new Error('Please enter a question')
    error.statusCode = 400
    throw error
  }

  const benefits = await Benefit.find({ isActive: true })
  const claims = await Claim.find({ user: userId }).populate('benefit')

  const benefitData = benefits.map((benefit) => ({
    title: benefit.title,
    description: benefit.description,
    category: benefit.category
  }))

  const claimedBenefits = claims.map((claim) => claim.benefit?.title).filter(Boolean)

  const prompt = `
You are the ProPerks AI Benefit Advisor.

Answer only questions related to the user's benefits and claims.

Available benefits:
${JSON.stringify(benefitData)}

Benefits already claimed by the user:
${claimedBenefits.length ? claimedBenefits.join(', ') : 'No benefits claimed yet'}

User question:
${question}

Give a clear, simple and helpful answer.
If the question is unrelated to benefits or claims, politely explain that you can help with benefits and claims.
`

  const response = await aiResponse(prompt)

  res.status(200).json({ success: true, response })
})
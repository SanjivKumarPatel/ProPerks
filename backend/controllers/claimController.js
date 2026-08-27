const asyncHandler = require('../middleware/asynchandler');
const Claim = require('../models/Claim');
const Benefit = require('../models/Benefit');

// @desc    Claim a benefit
// @route   POST /api/claims/:benefitId
// @access  Private
const claimBenefit = asyncHandler(async (req, res) => {
  const { benefitId } = req.params;

  const benefit = await Benefit.findById(benefitId);
  if (!benefit) {
    res.status(404);
    throw new Error('Benefit not found');
  }

  const alreadyClaimed = await Claim.findOne({
    userId: req.user._id,
    benefitId,
  });

  if (alreadyClaimed) {
    res.status(400);
    throw new Error('You have already claimed this benefit');
  }

  const claim = await Claim.create({
    userId: req.user._id,
    benefitId,
  });

  const populatedClaim = await claim.populate('benefitId');

  res.status(201).json({ success: true, claim: populatedClaim });
});

// @desc    Get logged-in user's claims
// @route   GET /api/claims
// @access  Private
const getMyClaims = asyncHandler(async (req, res) => {
  const claims = await Claim.find({ userId: req.user._id })
    .populate('benefitId')
    .sort({ createdAt: -1 });

  res.status(200).json({ success: true, claims });
});

// @desc    Remove a claim
// @route   DELETE /api/claims/:claimId
// @access  Private
const removeClaim = asyncHandler(async (req, res) => {
  const { claimId } = req.params;

  const claim = await Claim.findById(claimId);

  if (!claim) {
    res.status(404);
    throw new Error('Claim not found');
  }

  if (claim.userId.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to remove this claim');
  }

  await claim.deleteOne();

  res.status(200).json({ success: true, message: 'Claim removed' });
});

module.exports = { claimBenefit, getMyClaims, removeClaim };

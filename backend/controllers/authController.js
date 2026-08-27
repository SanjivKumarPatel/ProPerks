import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import asyncHandler from '../middleware/asyncHandler.js'
import User from '../models/User.js'

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body

  if (!name || !email || !password) {
    const error = new Error('Name, email and password are required')
    error.statusCode = 400
    throw error
  }

  const existingUser = await User.findOne({
    email: email.toLowerCase().trim()
  })

  if (existingUser) {
    const error = new Error('User already exists')
    error.statusCode = 409
    throw error
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await User.create({
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password: hashedPassword,
    role: role || 'User'
  })

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role
    },
    process.env.JWT_SECRET
  )

  res.status(201).json({ success: true, message: 'User registered successfully', token, user })
})

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    const error = new Error('Email and password are required')
    error.statusCode = 400
    throw error
  }

  const user = await User.findOne({
    email: email.toLowerCase().trim()
  })

  if (!user) {
    const error = new Error('Invalid credentials')
    error.statusCode = 401
    throw error
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    const error = new Error('Invalid credentials')
    error.statusCode = 401
    throw error
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role
    },
    process.env.JWT_SECRET
  )

  res.status(200).json({ success: true, message: 'Login successful', token, user })
})

// @desc    Get logged in user profile
// @route   GET /api/auth/profile
// @access  Private
export const getProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id

  const user = await User.findById(userId)

  if (!user) {
    const error = new Error('User not found')
    error.statusCode = 404
    throw error
  }

  res.status(200).json({ success: true, user })
})

// @desc    Update logged in user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id
  const { name, email, password } = req.body

  if (!name || !email) {
    const error = new Error('Name and email are required')
    error.statusCode = 400
    throw error
  }

  const existingUser = await User.findOne({
    email: email.toLowerCase().trim(),
    _id: { $ne: userId }
  })

  if (existingUser) {
    const error = new Error('Email already in use')
    error.statusCode = 409
    throw error
  }

  const user = await User.findById(userId)

  if (!user) {
    const error = new Error('User not found')
    error.statusCode = 404
    throw error
  }

  user.name = name.trim()
  user.email = email.toLowerCase().trim()

  if (password && password.trim()) {
    user.password = await bcrypt.hash(password, 10)
  }

  await user.save()

  res.status(200).json({ success: true, message: 'Profile updated successfully', user })
})
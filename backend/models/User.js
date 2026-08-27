import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true, minlength: 2, maxlength: 30},
    email: {type: String, required: true, lowercase: true, trim: true, unique: true, index: true, match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']},
    role: {type: String, required: true, enum: ['User', 'Admin'], default: 'User'},
    password: {type: String, required: true, minlength: 6}
}, {timestamps: true})

const User = mongoose.model('User', userSchema)

export default User
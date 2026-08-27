import mongoose from 'mongoose'

const benefitSchema = new mongoose.Schema({
    title: {type: String, required: true, trim: true},
    description: {type: String, required: true, trim: true},
    category: {type: String, required: true, trim: true},
    isActive: {type: Boolean, default: true}
  }, { timestamps: true })

const Benefit = mongoose.model('Benefit', benefitSchema)

export default Benefit
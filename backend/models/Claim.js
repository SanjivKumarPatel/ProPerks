import mongoose from 'mongoose'

const claimSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  benefit: {type: mongoose.Schema.Types.ObjectId, ref: 'Benefit', required: true}
}, {timestamps: true})

const Claim = mongoose.model('Claim', claimSchema)

export default Claim
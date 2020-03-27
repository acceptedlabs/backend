const mongoose = require('mongoose')
const Schema = mongoose.Schema

const repliesSchema = new Schema({
	text: { type: String, required: true },
	post: { type: mongoose.Types.ObjectId, required: true, ref: 'Post' },
	user: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
	votes: {
		upvotes: { type: Number, required: true, default: 0 },
		downvotes: { type: Number, required: true, default: 0 },
	},
})

module.exports = mongoose.model('Replies', repliesSchema)

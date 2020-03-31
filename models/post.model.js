const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
	title: { type: String, required: true },
	text: { type: String, required: true },
	replies: [{ type: mongoose.Types.ObjectId, ref: 'Replies' }],
	user: { type: String, required: true, ref: 'User' },
	datetime: { type: Date, required: true },
	votes: {
		upvotes: { type: Number, required: true, default: 0 },
		downvotes: { type: Number, required: true, default: 0 },
	},
})

module.exports = mongoose.model('Post', postSchema)

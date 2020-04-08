const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
	title: { type: String, required: true },
	body: { type: String, required: true },
	datetime: { type: Date, required: true },
	replies: [{ type: mongoose.Types.ObjectId, ref: 'Reply' }],
	upvotes: [{ type: String, ref: 'User' }],
	downvotes: [{ type: String, ref: 'User' }],
	tag: { type: String, required: true },
	user: { type: String, ref: 'User' },
})

module.exports = mongoose.model('Post', postSchema)
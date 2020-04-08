const mongoose = require('mongoose')

const replySchema = new mongoose.Schema({
	parentPost: { type: mongoose.Types.ObjectId, required: true, ref: 'Post' },
	datetime: { type: Date, required: true },
	replies: [{type: mongoose.Types.ObjectId, ref: 'Reply'}],
	body: { type: String, required: true },
	upvotes: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
	downvotes: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
	user: { type: mongoose.Types.ObjectId, ref: 'User' },
})

module.exports = mongoose.model('Reply', replySchema)
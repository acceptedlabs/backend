const mongoose = require('mongoose')

const replySchema = new mongoose.Schema({
	datetime: { type: Date, required: true },
	replies: [{type: mongoose.Types.ObjectId, ref: 'Reply'}],
	body: { type: String, required: true },
	upvotes: [{ type: String, ref: 'User' }],
	downvotes: [{ type: String, ref: 'User' }],
	user: { type: String, ref: 'User' },
})

module.exports = mongoose.model('Reply', replySchema)
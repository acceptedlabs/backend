const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
	title: { type: String, required: true },
	body: { type: String, required: true },
	datetime: { type: Date, required: true },
	replies: [{ type: mongoose.Types.ObjectId, ref: 'Reply' }],
	upvotes: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
	downvotes: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
	tag: { type: String, required: true },
	user: { type: mongoose.Types.ObjectId, ref: 'User' },
})

module.exports = mongoose.model('Post', postSchema)

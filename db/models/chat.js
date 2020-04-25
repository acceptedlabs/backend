const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
	user: {
		type: String,
		ref: 'User',
		required: true,
	},
	datetime: { type: String, required: true },
	body: { type: String, required: true },
})

const chatSchema = new mongoose.Schema({
	users: [{
		type: String,
		ref: 'User',
		required: true,
	}],
	messages: [messageSchema],
	closed: { type: Boolean, required: true },
	subject: { type: String, required: true },
})

module.exports = mongoose.model('Chat', chatSchema)
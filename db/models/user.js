const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	_id: { type: String, required: true },
	onboardingInfo: {
		name: { type: String, required: true },
		mentorMentee: { type: String, required: true },
		fieldStudy: { type: String, required: true },
		intendedMajor: { type: String, required: true },
		gradYear: { type: Number, required: true },
		race: { type: String, required: true },
		gender: { type: String, required: true },
		finaid: { type: Boolean, required: true },
		schoolTypes: {
			ivy: { type: Boolean, required: true },
			stateFlagships: { type: Boolean, required: true },
			otherState: { type: Boolean, required: true },
			otherPrivate: { type: Boolean, required: true },
		},
	},
	posts: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Post' }],
	replies: [
		{ type: mongoose.Types.ObjectId, required: true, ref: 'Reply' },
	],
})

module.exports = mongoose.model('User', userSchema)
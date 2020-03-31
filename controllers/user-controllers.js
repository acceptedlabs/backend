const HttpError = require('../errors/http-error')
const User = require('../models/user.model')

const checkIfOnboarded = async (req, res, next) => {
	const exists = await User.exists({ _id: req.user.sub })
	res.send(exists)
}


const onboard = async (req, res, next) => {
	// get user ID
	const userID = req.user.sub

	// get data from the body
	const {
		name,
		mentorMentee,
		fieldStudy,
		intendedMajor,
		gradYear,
		race,
		gender,
		finaid,
		schoolTypes,
	} = req.body

	//check if user already exist
	let existingUser
	try {
		existingUser = await User.findOne({ _id: userID })
	} catch (err) {
		return next(
			new HttpError('Onboarding failed, please try again later', 500),
		)
	}

	if (existingUser) {
		return next(
			new HttpError(
				'User has already been onboarded.',
				422,
			),
		)
	}

	const createdUser = new User({
		_id: userID,
		onboardingInfo: {
			name,
			mentorMentee,
			fieldStudy,
			intendedMajor,
			gradYear,
			race,
			gender,
			finaid,
			schoolTypes,
		},
		posts: [],
		replies: [],
	})

	try {
		await createdUser.save()
	} catch (err) {
		console.log(err)
		return next(
			new HttpError('Onboarding failed, please try again later', 500),
		)
	}

	res.status(201).json({
		createdUser,
	})
}

module.exports = {onboard, checkIfOnboarded}

const HttpError = require('../errors/http-error')
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')

const onboard = async (req, res, next) => {
	//get the token from the headers
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]

	if (!token)
		return res.status(401).json({ msg: 'No token, authorizaton denied' })

	const auth_id = jwt.decode(token).sub

	//get data from the body
	const { is_onboarded, onboardingInfo } = req.body

	const {
		name,
		mentorMentee,
		fieldStudy,
		intendedMajor,
		gradYear,
		race,
		gender,
		finAid,
		schoolTypes,
	} = onboardingInfo

	//check if user already exist
	let existingUser
	try {
		existingUser = await User.findOne({ auth_id: auth_id })
	} catch (err) {
		return next(
			new HttpError('Signing up failed, please try again later', 500),
		)
	}

	if (existingUser) {
		return next(
			new HttpError(
				'User already existed, please try sign in instead',
				422,
			),
		)
	}

	const createdUser = new User({
		auth_id,
		is_onboarded,
		onboardingInfo: {
			name,
			mentorMentee,
			fieldStudy,
			intendedMajor,
			gradYear,
			race,
			gender,
			finAid,
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
			new HttpError('Signing up failed, please try again later', 500),
		)
	}

	res.status(201).json({
		createdUser,
	})
}

exports.onboard = onboard

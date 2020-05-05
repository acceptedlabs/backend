const { pick } = require('../util')
const { MongoError } = require('mongodb')

let Mutation = {}

Mutation.createUser = async (_, { info }, { dataSources, user }) => {
	const pickKeys = [
		'name',
		'username',
		'role',
		'fieldOfStudy',
		'intendedMajor',
		'gradYear',
		'race',
		'gender',
		'applyFinaid',
	]
	const newUser = pick(info, ...pickKeys)
	newUser.auth0ID = user.sub
	newUser.applyingTo = {
		ivy: info.applyingTo.includes('ivy'),
		stateFlagships: info.applyingTo.includes('stateFlagships'),
		otherState: info.applyingTo.includes('otherState'),
		otherPrivate: info.applyingTo.includes('otherPrivate'),
	}
	try {
		const res = await dataSources.users.create(newUser)
		if (!res.ops || !res.ops.length === 1) throw Error('Accepted Mongo validation error: Invalid ops variable')
		return res.ops[0]
	} catch (err) {
		console.log(err)
		if (err instanceof MongoError && err.code === 11000) {
			throw Error('User already exists.')
		}
	}
	return null
}

Mutation.createPost = async (_, { title, body, tag }, { dataSources, user }) => {
	const foundUser = await dataSources.users.findByAuth0ID(user.sub)
	if (!foundUser) throw Error('User does not exist.')
	const newPost = {
		title,
		body,
		timestamp: Math.floor(new Date().getTime() / 1000),
		comments: [],
		upvotes: [foundUser._id],
		downvotes: [],
		author: foundUser._id,
		tag,
	}
	try {
		const res = await dataSources.posts.create(newPost)
		if (!res.ops || !res.ops.length === 1) throw Error('Accepted Mongo validation error: Invalid ops variable')
		console.log(res.ops)
		return res.ops[0]
	} catch (err) {
		console.log(err)
	}
	return null
}


module.exports = Mutation
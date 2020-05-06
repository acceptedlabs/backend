const { pick, unixNow } = require('../util')
const { ObjectId, MongoError } = require('mongodb')

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
			return new Error('User already exists.')
		}
	}
	return null
}

Mutation.createPost = async (_, { title, body, tag }, { dataSources, user }) => {
	const foundUser = await dataSources.users.findByAuth0ID(user.sub)
	if (!foundUser) return new Error('User does not exist.')
	const newPost = {
		title,
		body,
		timestamp: unixNow(),
		comments: [],
		upvotes: [foundUser._id],
		downvotes: [],
		author: foundUser._id,
		tag,
	}
	try {
		const res = await dataSources.posts.create(newPost)
		if (!res.ops || !res.ops.length === 1) throw Error('Accepted Mongo validation error: Invalid ops variable')
		return res.ops[0]
	} catch (err) {
		console.log(err)
	}
	return null
}

Mutation.vote = async (_, { id, objectType, direction }, { dataSources, user }) => {
	// TODO: make it possible to vote on comments too
	if (objectType !== 'POST') return new Error('NotImplementedError')
	const foundUser = await dataSources.users.findByAuth0ID(user.sub)
	if (!foundUser) return new Error('User does not exist.')
	const res = await dataSources.posts.vote(id, direction, foundUser._id)
	return res
}

Mutation.reply = async (_, { id, objectType, body }, { dataSources, user }) => {
	// TODO: make it possible to reply to comments too
	if (objectType !== 'POST') return new Error('NotImplementedError')
	const foundUser = await dataSources.users.findByAuth0ID(user.sub)
	if (!foundUser) return new Error('User does not exist.')
	const foundPost = await dataSources.posts.findOneById(ObjectId(id))
	if (!foundPost) return new Error('Post does not exist.')
	const newComment = {
		timestamp: unixNow(),
		comments: [],
		text: body,
		parent: foundPost._id,
		upvotes: [foundUser._id],
		downvotes: [],
		author: foundUser._id,
	}
	newComment._id = await dataSources.comments.create(newComment).insertedId
	await dataSources.posts.addComment(foundPost._id, newComment._id)
	foundPost.comments.push(newComment)
	return foundPost
}

Mutation.createChat = async (_, { ids, subject }, { dataSources, user }) => {
	if (ids.length > 1) return new Error('NotSupportedError')
	else if (ids.length === 0) return new Error('NotEnoughArgumentsError')
	const foundUser = await dataSources.users.findByAuth0ID(user.sub)
	if (!foundUser) return new Error('Current user does not exist.')
	const otherFoundUser = await dataSources.users.findOneById(ObjectId(ids[0]))
	if (!otherFoundUser) return new Error('Other user does not exist.')
	const newChat = {
		members: [foundUser._id, otherFoundUser._id],
		messages: [],
		closed: false,
		subject,
	}
	newChat._id = await dataSources.chats.create(newChat).insertedId
	return newChat
}

Mutation.sendChatMessage = async (_, { id, body }, { dataSources, user }) => {
	const foundUser = await dataSources.users.findByAuth0ID(user.sub)
	if (!foundUser) return new Error('Current user does not exist.')
	const foundChat = await dataSources.chats.findOneById(ObjectId(id))
	if (!foundChat) return new Error('Chat does not exist.')
	const newMessage = {
		parentThread: foundChat._id,
		author: foundUser._id,
		timestamp: unixNow(),
		text: body,
	}
	newMessage._id = await dataSources.messages.create(newMessage)
	await dataSources.chats.addMessage(foundChat._id, newMessage._id)
	return newMessage
}

module.exports = Mutation
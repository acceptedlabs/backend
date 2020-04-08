const mongoose = require('mongoose')
const User = require('../models/user.model')
const Post = require('../models/post.model')
const Replies = require('../models/reply.model')
const HttpError = require('../errors/http-error')

const getPostById = async (req, res, next) => {
	const postId = req.params.pid

	let post
	try {
		post = await Post.findById(postId)
	} catch (err) {
		return next(
			new HttpError('Something went wrong, could not find a post', 500),
		)
	}

	if (!post) {
		return next(
			new HttpError('Could not find a post for the provided id', 500),
		)
	}

	res.json({ post: post.toObject({ getters: true }) })
}

const getRepliesByPostId = async (req, res, next) => {
	const postId = req.params.pid

	let replies
	try {
		replies = await Replies.find({ post: postId })
	} catch (err) {
		return next(
			new HttpError('Fail to get replies, please try again later', 500),
		)
	}

	if (!replies || replies.length === 0) {
		return next(
			new HttpError(
				'Could not find replies for the provided user id',
				404,
			),
		)
	}

	res.json({ replies: replies.map(rep => rep.toObject({ getters: true })) })
}

const newPost = async (req, res, next) => {
	const userID = req.user.sub
	const { title, body, tag } = req.body

	// check if the user making the post exists
	let existingUser
	try {
		existingUser = await User.findById(userID)
	} catch (err) {
		return next(
			new HttpError('Create new post failed, please try again', 500),
		)
	}

	if (!existingUser) {
		return next(
			new HttpError('Could not find the user for the provided id', 400),
		)
	}


	const createdPost = new Post({
		title,
		body,
		datetime: new Date(),
		replies: [],
		upvotes: [],
		downvotes: [],
		tag,
		user: existingUser.id,
	})

	try {
		const sess = await mongoose.startSession()
		sess.startTransaction()
		await createdPost.save({ session: sess })
		existingUser.posts.push(createdPost)
		await existingUser.save()
		await sess.commitTransaction({ session: sess })
	} catch (err) {
		console.error(err)
		return next(
			new HttpError('Create new post failed, please try again', 500),
		)
	}

	res.status(201).json({ post: createdPost })
}

const votePost = async (req, res, next) => {
	const { direction } = req.body
	const postId = req.params.pid

	//check if post exist
	let post
	try {
		post = await Post.findById(postId)
	} catch (err) {
		return next(
			new HttpError(
				'Something went wrong, please try again later',
				500,
			),
		)
	}

	//vote or upvotes
	direction === 1 ? (post.votes.upvotes += 1) : (post.votes.downvotes += 1)

	try {
		await post.save()
	} catch (err) {
		return next(
			new HttpError(
				'Something went wrong, please try again later',
				500,
			),
		)
	}

	res.status(200).json({ post: post.toObject({ getters: true }) })
}

exports.getPostById = getPostById
exports.getRepliesByPostId = getRepliesByPostId
exports.newPost = newPost
exports.votePost = votePost

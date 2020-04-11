/* eslint-disable no-unused-vars */
const aggregations = require('../db/aggregations')

const resolvers = {
	Query: {
		posts: async (parent, args, { models }) => {
			const posts = await models.Post.find({})
			return posts
		},

		postsHotTen: async (parent, args, { models }) => {
			const posts = await models.Post.aggregate(aggregations.hotnessPaginated(10, 0))
			console.log(posts)
			return posts
		},

		postsHot: async (parent, args, { models }) => {
			const limit = args.limit && args.limit <= 50 ? args.limit : 10
			const skip = limit * (args.page - 1)
			const posts = await models.Post.aggregate(aggregations.hotnessPaginated(limit, skip))
			return posts
		},

		postById: async (parent, args, { models }) => {
			const post = await models.Post.findOne({ _id: args.id })
			return post
		},
		isOnboarded: async (parent, args, { models, user }) => {
			const exists = await models.User.exists({ _id: user.sub })
			return exists
		},
		curUser: async (parent, args, { models, user }) => {
			const foundUser = await models.User.findOne({ _id: user.sub })
			return foundUser
		},
	},
	Post: {
		id: parent => parent._id,
		title: parent => parent.title,
		body: parent => parent.body,
		datetime: parent => `${Math.floor(parent.datetime.getTime() / 1000)}`,
		replies: async (parent, args, { models }) => {
			return parent.replies.map(reply => models.Reply.findById(reply))
		},
		upvotes: parent => parent.upvotes.length,
		downvotes: parent => parent.downvotes.length,
		tag: parent => parent.tag,
		user: async (parent, args, { models }) => await models.User.findById(parent.user),
		myVote: async (parent, args, { models, user }) => {
			if (!user) return null
			const alreadyUpvoted = parent.upvotes.some(vote => vote === user.sub)
			if (alreadyUpvoted) return 1
			const alreadyDownvoted = parent.downvotes.some(vote => vote === user.sub)
			if (alreadyDownvoted) return -1
			return null
		},
	},
	Reply: {
		id: parent => parent._id,
		datetime: parent => `${Math.floor(parent.datetime.getTime() / 1000)}`,
		replies: async (parent, args, { models }) => {
			return parent.replies.map(reply => models.Reply.findById(reply))
		},
		body: parent => parent.body,
		upvotes: parent => parent.upvotes.length,
		downvotes: parent => parent.downvotes.length,
		user: async (parent, args, { models }) => await models.User.findById(parent.user),
	},
	User: {
		id: parent => parent._id,
		onboardingInfo: parent => ({
			name: parent.onboardingInfo.name,
			mentorMentee: parent.onboardingInfo.mentorMentee,
			fieldStudy: parent.onboardingInfo.fieldStudy,
			intendedMajor: parent.onboardingInfo.intendedMajor,
			gradYear: parent.onboardingInfo.gradYear,
			race: parent.onboardingInfo.race,
			gender: parent.onboardingInfo.gender,
			finaid: parent.onboardingInfo.finaid,
			applyIvy: parent.onboardingInfo.schoolTypes.ivy,
			applyStateFlagships: parent.onboardingInfo.schoolTypes.stateFlagships,
			applyOtherState: parent.onboardingInfo.schoolTypes.otherState,
			applyOtherPrivate: parent.onboardingInfo.schoolTypes.otherPrivate,
		}),
		posts: async (parent, args, { models }) => {
			return parent.posts.map(post => models.Post.findById(post))
		},
		replies: async (parent, args, { models }) => {
			return parent.replies.map(reply => models.Reply.findById(reply))
		},
	},
	Mutation: {
		forumPost: async (parent, args, { models, user }) => {
			const foundUser = await models.User.findById(user.sub)
			if (!foundUser) return new Error('User doesn\'t exist.')
			const newPost = new models.Post({
				title: args.title,
				body: args.body,
				datetime: new Date(),
				replies: [],
				upvotes: [],
				downvotes: [],
				tag: args.tag,
				user: foundUser,
			})
			foundUser.posts.push(newPost)
			await newPost.save()
			await foundUser.save()
			return newPost
		},
		onboard: async (parent, args, { models, user }) => {
			const { name, mentorMentee, fieldStudy, intendedMajor, gradYear, race, gender, finaid } = args.info
			const exists = await models.User.exists({ _id: user.sub })
			if (exists) return new Error('User has already been onboarded.')
			const newUser = new models.User({
				_id: user.sub,
				onboardingInfo: {
					name,
					mentorMentee,
					fieldStudy,
					intendedMajor,
					gradYear,
					race,
					gender,
					finaid,
					schoolTypes: {
						ivy: args.info.applyIvy,
						stateFlagships: args.info.applyStateFlagships,
						otherState: args.info.applyOtherState,
						otherPrivate: args.info.applyOtherPrivate,
					},
				},
			})
			await newUser.save()
			return newUser
		},
		votePost: async (parent, args, { models, user }) => {
			const foundPost = await models.Post.findById(args.id)
			const foundUser = await models.User.findById(user.sub)
			if (!foundPost) return new Error('No such post found.')
			if (!foundUser) return new Error('User doesn\'t exist.')
			const alreadyUpvoted = foundPost.upvotes.some(vote => vote === foundUser.id)
			const alreadyDownvoted = foundPost.downvotes.some(vote => vote === foundUser.id)
			// If you've already done that action, then return the post and that's it
			if ((alreadyUpvoted && !args.downvote) || (alreadyDownvoted && args.downvote)) return foundPost
			else {
				if (args.downvote) {
					if (alreadyUpvoted) foundPost.upvotes.pull(foundUser)
					foundPost.downvotes.push(foundUser)
				} else {
					if (alreadyDownvoted) foundPost.downvotes.pull(foundUser)
					foundPost.upvotes.push(foundUser)
				}
			}
			await foundPost.save()
			return foundPost
		},
		voteReply: async (parent, args, { models, user }) => {
			const foundReply = await models.Reply.findById(args.id)
			const foundUser = await models.User.findById(user.sub)
			if (!foundReply) return new Error('No such reply found.')
			if (!foundUser) return new Error('User doesn\'t exist.')
			const alreadyUpvoted = foundReply.upvotes.some(vote => vote === foundUser.id)
			const alreadyDownvoted = foundReply.downvotes.some(vote => vote === foundUser.id)
			// If you've already done that action, then return the post and that's it
			if ((alreadyUpvoted && !args.downvote) || (alreadyDownvoted && args.downvote)) return foundPost
			else {
				if (args.downvote) {
					if (alreadyUpvoted) foundReply.upvotes.pull(foundUser)
					foundReply.downvotes.push(foundUser)
				} else {
					if (alreadyDownvoted) foundReply.downvotes.pull(foundUser)
					foundReply.upvotes.push(foundUser)
				}
			}
			await foundReply.save()
			return foundReply
		},
		replyToPost: async (parent, args, { models, user }) => {
			const foundPost = await models.Post.findById(args.id)
			const foundUser = await models.User.findById(user.sub)
			if (!foundPost) return new Error('No such post found.')
			if (!foundUser) return new Error('User doesn\'t exist.')
			const newReply = new models.Reply({
				datetime: new Date(),
				replies: [],
				body: args.body,
				upvotes: [],
				downvotes: [],
				user: foundUser,
			})
			foundPost.replies.push(newReply)
			foundUser.replies.push(newReply)
			await newReply.save()
			await foundPost.save()
			await foundUser.save()
			return newReply
		},
		replyToReply: async (parent, args, { models, user }) => {
			const foundReply = await models.Reply.findById(args.id)
			const foundUser = await models.User.findById(user.sub)
			if (!foundReply) return new Error('No such reply found.')
			if (!foundUser) return new Error('User doesn\'t exist.')
			const newReply = new models.Reply({
				datetime: new Date(),
				replies: [],
				body: args.body,
				upvotes: [],
				downvotes: [],
				user: foundUser,
			})
			foundReply.replies.push(newReply)
			foundUser.replies.push(newReply)
			await newReply.save()
			await foundReply.save()
			await foundUser.save()
			return newReply
		},
	},
}

module.exports = resolvers
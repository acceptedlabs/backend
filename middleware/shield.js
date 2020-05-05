/* eslint-disable no-unused-vars */
const { rule, shield, allow } = require('graphql-shield')

const isAuthenticated = rule({ cache: 'contextual' })(
	async (parent, args, ctx, info) => {
		if (ctx.tokenError) {
			if (ctx.tokenError === 'JsonWebTokenError') return new Error('401-TokenMalformed')
			if (ctx.tokenError === 'TokenExpiredError') return new Error('401-TokenExpired')
		}
		if (ctx.user == null || !ctx.user.sub) return new Error('401-AuthNeeded')
		return true
	},
)

const permissions = shield({
	Query: {
		hotPosts: allow,
		post: isAuthenticated,
		isOnboarded: isAuthenticated,
		curUser: isAuthenticated,
		chatMessages: isAuthenticated,
	},
	Mutation: {
		createUser: isAuthenticated,
		createPost: isAuthenticated,
		vote: isAuthenticated,
		reply: isAuthenticated,
		createChat: isAuthenticated,
		sendChatMessage: isAuthenticated,
	},
	Post: {
		myVote: isAuthenticated,
	},
}, {
	debug: process.env.NODE_ENV === 'development',
})

module.exports = permissions
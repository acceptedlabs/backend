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
		posts: allow,
		postById: allow,
		isOnboarded: isAuthenticated,
		curUser: isAuthenticated,
		postsHotTen: allow,
		postsHot: allow,
	},
	Mutation: {
		onboard: isAuthenticated,
		forumPost: isAuthenticated,
		votePost: isAuthenticated,
		voteReply: isAuthenticated,
		replyToPost: isAuthenticated,
		replyToReply: isAuthenticated,
		createChat: isAuthenticated,
		sendChatMessage: isAuthenticated,
	},
}, {
	debug: process.env.NODE_ENV === 'development',
})
  
module.exports = permissions
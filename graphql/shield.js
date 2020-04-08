/* eslint-disable no-unused-vars */
const { rule, shield, allow } = require('graphql-shield')

const isAuthenticated = rule({ cache: 'contextual' })(
	async (parent, args, ctx, info) => {
		if (ctx.user === null) return new Error('401: Unauthorized')
		else return true
	},
)

const permissions = shield({
	Query: {
		curUser: isAuthenticated,
		posts: allow,
		isOnboarded: isAuthenticated,
	},
	Mutation: {
		forumPost: isAuthenticated,
		onboard: isAuthenticated,
		votePost: isAuthenticated,
	},
	Post: isAuthenticated,
}, {
	debug: true,
})
  
module.exports = permissions
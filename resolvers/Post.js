const { ObjectId } = require('mongodb')
let Post = {}

Post.id = (parent) => {
	const pid = parent._id
	if (pid instanceof ObjectId) return pid.toHexString()
	else return pid
}

Post.upvotes = (parent) => parent.upvotes.length
Post.downvotes = (parent) => parent.downvotes.length
Post.author = (parent, _, { dataSources }) => dataSources.users.collection.findOneById(parent.author)

Post.myVote = async (parent, _, { dataSources, user }) => {
	const foundUser = await dataSources.users.findByAuth0ID(user.sub)
	if (!foundUser) return null
	const id = JSON.stringify(foundUser._id)
	if (parent.upvotes.map(x => JSON.stringify(x)).includes(id)) return 'UP'
	else if (parent.downvotes.map(x => JSON.stringify(x)).includes(id)) return 'DOWN'
	else return 'RESET'
}

Post.__isTypeOf = (obj) => {
	return Object.prototype.hasOwnProperty.call(obj, 'tag')
}

module.exports = Post
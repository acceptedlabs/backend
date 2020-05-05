let Post = {}

Post.id = (parent, _, __) => parent._id

Post.upvotes = (parent, _, __) => parent.upvotes.length
Post.downvotes = (parent, _, __) => parent.downvotes.length
Post.author = (parent, _, { dataSources }) => dataSources.users.collection.findOneById(parent.author)

Post.myVote = async (parent, _, { dataSources, user }) => {
	const foundUser = await dataSources.users.findByAuth0ID(user.sub)
	if (!foundUser) return null
	const id = JSON.stringify(foundUser._id)
	if (parent.upvotes.map(x => JSON.stringify(x)).includes(id)) return 'UP'
	else if (parent.downvotes.map(x => JSON.stringify(x)).includes(id)) return 'DOWN'
	else return 'RESET'
}

module.exports = Post
let Query = {}


Query.hotPosts = (_, { page, limit }, { dataSources }) => {
	const lim = (limit && limit <= 50) ? limit : 10
	const skip = lim * (page - 1)
	return dataSources.posts.hot(lim, skip)
}

Query.post = (_, { id }, { dataSources }) => {
	return dataSources.posts.findOneById(id)
}

// TODO: implement isOnboarded
Query.isOnboarded = () => {
	return true
}

// TODO: implement curUser
Query.curUser = () => {
	return null
}

// TODO: implement chatMessages
Query.chatMessages = (_, { id }, { dataSources }) => {
	return []
}

module.exports = Query
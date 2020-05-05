const { MongoDataSource } = require('apollo-datasource-mongodb')
const { ObjectId } = require('mongodb')

class ForumObject extends MongoDataSource {
	async vote(_postID, direction, _userID) {
		const postID = ObjectId(_postID), userID = ObjectId(_userID)
		const post = await this.findOneById(postID)
		if (!post) throw Error('Post does not exist.')
		const isUpvoted = post.upvotes.some(x => x.equals(userID)),
			isDownvoted = post.downvotes.some(x => x.equals(userID))
		let ops = []
		const addOp = (action, arr) => {
			if (arr === 'upvotes') {
				if (action === '$push') post.upvotes.push(userID)
				else if (action === '$pull') post.upvotes = post.upvotes.filter(x => !x.equals(userID))
			} else if (arr === 'downvotes') {
				if (action === '$push') post.downvotes.push(userID)
				else if (action === '$pull') post.downvotes = post.downvotes.filter(x => !x.equals(userID))
			}
			ops.push(
				this.collection.updateOne(
					{ _id: postID },
					{ [action]: { [arr]: userID } },
				),
			)
		}
		switch (direction) {
			case 'UP':
				if (!isUpvoted) addOp('$push', 'upvotes')
				if (isDownvoted) addOp('$pull', 'downvotes')
				break
			case 'DOWN':
				if (!isDownvoted) addOp('$push', 'downvotes')
				if (isUpvoted) addOp('$pull', 'upvotes')
				break
			case 'RESET':
			default:
				if (isUpvoted) addOp('$pull', 'upvotes')
				if (isDownvoted) addOp('$pull', 'downvotes')
		}
		await Promise.all(ops)
		return post
	}
}

module.exports = ForumObject
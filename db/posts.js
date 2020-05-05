const { ObjectId } = require('mongodb')
const { hotness } = require('./aggregations')
const ForumObject = require('./forum-object')

class Posts extends ForumObject {
	async hot(limit, skip) {
		const res = await this.collection.aggregate(hotness(limit, skip))
		const next = await res.next()
		res.close()
		return next ? next : []
	}
	create(data) {
		return this.collection.insertOne(data)
	}
	addComment(_postID, _commentID) {
		const postID = ObjectId(_postID), commentID = ObjectId(_commentID)
		return this.collection.updateOne({ _id: postID }, { '$push': { comments: commentID } })
	}
}

module.exports = Posts
const ForumObject = require('./forum-object')

class Comments extends ForumObject {
	create(data) {
		return this.collection.insertOne(data)
	}
}

module.exports = Comments
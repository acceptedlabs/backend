const { MongoDataSource } = require('apollo-datasource-mongodb')

class Chats extends MongoDataSource {
	create(data) {
		return this.collection.insertOne(data)
	}
}

module.exports = Chats
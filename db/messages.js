const { MongoDataSource } = require('apollo-datasource-mongodb')

class Messages extends MongoDataSource {
	create(data) {
		return this.collection.insertOne(data)
	}
}

module.exports = Messages
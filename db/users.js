const { MongoDataSource } = require('apollo-datasource-mongodb')

class Users extends MongoDataSource {
	async createUser(data) {
		return this.collection.insertOne(data)
	}
	userReducer(user) {
		return {
			id: user._id,
			...user,
		}
	}
}

module.exports = Users
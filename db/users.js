const { MongoDataSource } = require('apollo-datasource-mongodb')

class Users extends MongoDataSource {
	create(data) {
		return this.collection.insertOne(data)
	}
	findByAuth0ID(auth0ID, ...rest) {
		return this.collection.findOne({ auth0ID }, rest)
	}
	userReducer(user) {
		return {
			id: user._id,
			...user,
		}
	}
}

module.exports = Users
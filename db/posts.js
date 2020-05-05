const { MongoDataSource } = require('apollo-datasource-mongodb')
const { hotness } = require('./aggregations')

class Posts extends MongoDataSource {
	async hot(limit, skip) {
		const res = await this.collection.aggregate(hotness(limit, skip))
		const next = await res.next()
		res.close()
		return next ? next : []
	}
	create(data) {
		return this.collection.insertOne(data)
	}
}

module.exports = Posts
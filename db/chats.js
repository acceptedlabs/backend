const { MongoDataSource } = require('apollo-datasource-mongodb')
const { ObjectId } = require('mongodb')

class Chats extends MongoDataSource {
	create(data) {
		return this.collection.insertOne(data)
	}
	addMessage(_chatID, _messageID) {
		const chatID = ObjectId(_chatID), messageID = ObjectId(_messageID)
		return this.collection.updateOne({ _id: chatID }, { '$push': { messages: messageID } })
	}
}

module.exports = Chats
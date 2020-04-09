const mongoose = require('mongoose')

const Post = require('./models/post')
const Reply = require('./models/reply')
const User = require('./models/user')
const connectionStr = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_DOMAIN}/${process.env.MONGO_DB}?retryWrites=true&w=majority`

mongoose.Promise = global.Promise

const connect = () => mongoose.connect(connectionStr, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
})
  
const models = {
	Post,
	Reply,
	User,
}

module.exports = { 
	connect,
	models,
}
require('dotenv').config()

const express = require('express')
const { ApolloServer } = require('apollo-server-express')

const typeDefs = require('./schema')
const { applyMiddleware } = require('graphql-middleware')
const { makeExecutableSchema } = require('graphql-tools')
const shield = require('./middleware/shield')
const validateToken = require('./middleware/auth-client')


const { MongoClient } = require('mongodb')
const Users = require('./db/users')
const Posts = require('./db/posts')
const client = new MongoClient('mongodb://localhost:27017/test', {
	useUnifiedTopology: true,
})
client.connect()

// ensure appropriate indices exist
client.db().collection('users').createIndex({})

const resolvers = require('./resolvers')

const schema = applyMiddleware(
	makeExecutableSchema({
		typeDefs,
		resolvers,
	}),
	shield,
)

const context = async ({ req }) => {
	var parsedToken = null
	let tokenError


	if (req.headers && (req.headers.authorization || req.headers.Authorization)) {
		const token = req.headers.authorization || req.headers.Authorization
		const validation = await validateToken(token)
		tokenError = validation.error ? validation.error.name : null
		parsedToken = token ? (validation).decoded : null
	}

	return {
		tokenError,
		user: parsedToken,
	}
}

const server = new ApolloServer({
	context,
	schema,
	dataSources: () => {
		console.log('data source created')
		return {
			users: new Users(client.db().collection('users')),
			posts: new Posts(client.db().collection('posts')),
		}
	},
})

const app = express()
const morgan = require('morgan')
app.use(morgan('dev'))
server.applyMiddleware({ app })


app.listen({ port: 4000 }, () =>
	console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
)

module.exports = app
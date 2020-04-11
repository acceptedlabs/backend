require('dotenv').config()
const { GraphQLServer } = require('graphql-yoga')

const { connect, models } = require('./db')
const validateToken = require('./auth-client')
const db = connect()

const resolvers = require('./graphql/resolvers')
const permissions = require('./graphql/shield')

const context = async req => {
	var parsedToken = null
	let tokenError

	if (req.request.headers && req.request.headers.authorization) {
		const { authorization: token } = req.request.headers
		const validation = await validateToken(token)
		tokenError = validation.error ? validation.error.name : null
		parsedToken = token ? (validation).decoded : null
	}

	return {
		models,
		db,
		tokenError,
		user: parsedToken,
	}
}

const server = new GraphQLServer({
	typeDefs: './graphql/schema.graphql',
	resolvers,
	context,
	middlewares: [permissions],
})
server.start({
	port: process.env.PORT || 5000,
},
({ port}) => {
	const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev'
	console.log(`Running ${env} version.`)
	console.log(`Server is running on :${port}.`)
},
)
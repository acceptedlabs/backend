const jwt = require('express-jwt')
// const jwtAuthz = require('express-jwt-authz') // not needed
const jwksRsa = require('jwks-rsa')

const checkJwt = jwt({
	secret: jwksRsa.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: 'https://accepted.auth0.com/.well-known/jwks.json',
	}),
	audience: 'https://api.accepted.tech/',
	issuer: 'https://accepted.auth0.com/',
	algorithms: ['RS256'],
})

module.exports = checkJwt

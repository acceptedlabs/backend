const { pick } = require('../util')

let Mutation = {}

// TODO: add auth0 auth to this to add deduplication
Mutation.createUser = async (_, { info }, { dataSources, user }) => {
	const pickKeys = [
		'name',
		'username',
		'role',
		'fieldOfStudy',
		'intendedMajor',
		'gradYear',
		'race',
		'gender',
		'applyFinaid',
	]
	const newUser = pick(info, ...pickKeys)
	newUser.auth0ID = user.sub
	newUser.applyingTo = {
		ivy: info.applyingTo.includes('ivy'),
		stateFlagships: info.applyingTo.includes('stateFlagships'),
		otherState: info.applyingTo.includes('otherState'),
		otherPrivate: info.applyingTo.includes('otherPrivate'),
	}
	try {
		const res = await dataSources.users.createUser(newUser)
		// console.log(res)
		if (!res.ops || !res.ops.length === 1) throw Error('Accepted Mongo validation error: Invalid ops variable')
		return res.ops[0]
	} catch (err) {
		console.error(err)
	}
	return null
}



module.exports = Mutation
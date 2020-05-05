function pick(o, ...props) {
	return Object.assign({}, ...props.map(prop => ({ [prop]: o[prop] })))
}

function unixNow() {
	return Math.floor(new Date().getTime() / 1000)
}

module.exports = { pick, unixNow }
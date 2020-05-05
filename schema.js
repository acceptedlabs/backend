const { gql } = require('apollo-server-express')

module.exports = gql`
type Chat {
	id: ID!
	members: [User]!
	messages: [ChatMessage]!
	closed: Boolean!
	subject: String!
}

type ChatMessage {
	author: User!
	timestamp: String!
	text: String!
}

type User {
	id: ID!
	name: String!
	username: String!
	auth0ID: String!
	role: UserRole!
	fieldOfStudy: FieldOfStudy!
	intendedMajor: String!
	gradYear: Int!
	race: Race!
	gender: Gender!
	applyFinaid: Boolean!
	applyingTo: SchoolTypes!
	currentChats: [Chat]!
}

type SchoolTypes {
	ivy: Boolean!
	stateFlagships: Boolean!
	otherState: Boolean!
	otherPrivate: Boolean!
}

enum UserRole {
	MENTOR
	MENTEE
}

enum FieldOfStudy {
	HUMANITIES
	SOCIAL_SCIENCES
	NATURAL_SCIENCES
	FORMAL_SCIENCES
	APPLIED_SCIENCES
	OTHER
}

enum Race {
	WHITE
	BLACK
	AMERICAN_INDIAN
	ASIAN
	PAC_ISLANDER
}

enum Gender {
	MALE
	FEMALE
	OTHER
}

type Comment {
	id: ID!
	timestamp: String!
	replies: [Comment]!
	text: String!
	upvotes: Int!
	downvotes: Int!
	author: User!
}

type Post {
	id: ID!
	title: String!
	body: String!
	timestamp: String!
	comments: [Comment]!
	upvotes: Int!
	downvotes: Int!
	author: User!
	tag: String!
	myVote: VoteDirection!
}

type Query {
	hotPosts(page: Int!, limit: Int): [Post]!
	post(id: ID!): Post
	
	isOnboarded: Boolean!
	curUser: User

	chatMessages(id: ID!): [ChatMessage]!
}

type Mutation {
	createUser(info: createUserInput!): User
	createPost(title: String!, body: String!, tag: String!): Post!
	vote(objectType: ForumObjectType!, direction: VoteDirection!): ForumObjectResult
	reply(objectType: ForumObjectType!, body: String!): ForumObjectResult
	createChat(ids: [ID]!, subject: String!): Chat
	sendChatMessage(id: ID!, body: String!): ChatMessage
}

union ForumObjectResult = Comment | Post

input createUserInput {
	name: String!
	username: String!
	role: UserRole!
	fieldOfStudy: FieldOfStudy!
	intendedMajor: String!
	gradYear: Int!
	race: Race!
	gender: Gender!
	applyFinaid: Boolean!
	applyingTo: [String]!
}

enum ForumObjectType {
	POST
	COMMENT
}

enum VoteDirection {
	UP
	DOWN
	RESET
}
`
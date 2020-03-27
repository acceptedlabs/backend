Schema for a post:
	title: String
	id: ObjectId (set my Mongo)
	text: String
	replies: [{Object}]
		replies format: {id: ObjectId, text: String, user: UserID, votes: [upvotes: Number, downvotes: Number]}
	user: UserID
	datetime: Date
	votes: [upvotes: Number, downvotes: Number]


POST /forum
	- make a new forum post
	- JSON request body: contains the following
		- title: String
		- text: String (Markdown)
		- tag: String
	- Headers
		Authorization: `Bearer $JWT`
	- it should set the datetime automatically, and should srt the upvotes and downvotes to 0 each
	- replies should be an empty array
	- userID should be parsed from JWT
	- Returns
		HTTP 201 if post created
		HTTP 400 if no token or missing item from request body
		HTTP 500 for all other uncaught errors

GET /forum/:id
	- get a forum post by id
	- no request body needed
	- return everything but replies
	- Headers
		Authorization: `Bearer $JWT`
	- Returns
		HTTP 200 & post content as JSON if post exists
		HTTP 400 if no token
		HTTP 404 if no such post exists
		HTTP 500 for all other uncaught errors

GET /forum/:id/replies
	- return a forum post's replies
	- no request body needed
	- Headers
		Authorization: `Bearer $JWT`
	- Returns
		HTTP 200 & replies as JSON if post exists
		HTTP 400 if no token
		HTTP 404 if no such post exists
		HTTP 500 for all other uncaught errors

POST /forum/:id/votes
	- upvote or downvote a post (a user should be able to do this only once per post)
	- JSON request body: contains the following
		- direction: Number (1 or -1, representing an upvote or downvote)
	- Returns
		HTTP 200 if vote cast successfully
		HTTP 400 if no token
		HTTP 404 if no such post exists
		HTTP 500 for all other uncaught errors
	- Headers
		Authorization: `Bearer $JWT`
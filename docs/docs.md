# Accepted: Backend Docs

## Schemas
*Note*: All values are required unless explicitly specified.

### Post 
| Key          | Value                     |
|--------------|---------------------------|
| `_id`        | `ObjectId` (set by Mongo) |
| `title`      | `String`                  |
| `body`       | `String`                  |  
| `datetime`   | `Date`                    |
| `replies`    | `[Reply]` (ref)           |
| `upvotes`    | `[User]`  (ref)           |
| `downvotes`  | `[User]`  (ref)           |
| `tag`        | `String`                  |
| `user`       | `User`    (ref)           |

### User
| Key                                         | Value                    |
|---------------------------------------------|--------------------------|
| `_id`                                       | `String` (custom)        |
| `onboardingInfo.name`                       | `String`                 |
| `onboardingInfo.mentorMentee`               | `String`                 |  
| `onboardingInfo.fieldStudy`                 | `Date`                   |
| `onboardingInfo.intendedMajor`              | `String`                 |
| `onboardingInfo.gradYear`                   | `Number`                 |
| `onboardingInfo.race`                       | `String`                 |
| `onboardingInfo.gender`                     | `String`                 |
| `onboardingInfo.finaid`                     | `String`                 |
| `onboardingInfo.schoolTypes.ivy`            | `String`                 |
| `onboardingInfo.schoolTypes.stateFlagships` | `String`                 |
| `onboardingInfo.schoolTypes.otherState`     | `String`                 |
| `onboardingInfo.schoolTypes.otherPrivate`   | `String`                 |
| `posts`                                     | `Post`   (ref)           |
| `replies`                                   | `Reply`  (ref)           |

### Reply
| Key          | Value                       |
|--------------|-----------------------------|
| `_id`        | `ObjectId` (set by Mongo)   |
| `parentPost` | `Reply`    (ref)            |
| `replies`    | `[Reply]`  (ref, optional)  |
| `body`       | `String`                    |
| `upvotes`    | `[User]`  (ref)             |
| `downvotes`  | `[User]`  (ref)             |
| `user`       | `User`    (ref)             |


## Actions

### Forum

#### `POST /forum`
##### Description
Makes a new forum post.
Datetime is set to the time the request was processed.
Upvotes and downvotes are initially zero.
##### Body (JSON)
```javascript
{
    title: String,
    text: String,   // markdown
    tag: String,
}
```
##### Headers
- Authorization: `Bearer $JWT`
##### Return Status
| HTTP Status | Reason                                     |
|-------------|--------------------------------------------|
| `201`       | Post created                               |
| `400`       | No token or missing item from request body |
| `500`       | Uncaught error in the server.              |


#### `GET /forum/:id`
##### Description
Gets a forum post by ID.
##### Body (JSON)
*No body needed*
##### Headers
- Authorization: `Bearer $JWT`
##### Return Body
```javascript
// TODO: document this
```
##### Return Status
| HTTP Status | Reason                                     |
|-------------|--------------------------------------------|
| `200`       | Post found; post returned in body          |
| `400`       | No token found                             |
| `404`       | No post exists with that ID                |
| `500`       | Uncaught error in the server.              |


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
# GraphQL Schema Docs
*Generated using `graphql-markdown`.*

<details>
  <summary><strong>Table of Contents</strong></summary>

  * [Query](#query)
  * [Mutation](#mutation)
  * [Objects](#objects)
    * [OnboardingInfo](#onboardinginfo)
    * [Post](#post)
    * [Reply](#reply)
    * [User](#user)
  * [Inputs](#inputs)
    * [OnboardingInput](#onboardinginput)
  * [Scalars](#scalars)
    * [Boolean](#boolean)
    * [ID](#id)
    * [Int](#int)
    * [String](#string)

</details>

## Query
<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>posts</strong></td>
<td valign="top">[<a href="#post">Post</a>]!</td>
<td>

 Displays all posts in the forum. 

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>postById</strong></td>
<td valign="top"><a href="#post">Post</a></td>
<td>

 Returns a post by ID. If not found, returns null. 

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td>

 The ID of the post to search for. 

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>isOnboarded</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td>

 **[Auth Needed]** Returns whether or not the user is onboarded. 

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>curUser</strong></td>
<td valign="top"><a href="#user">User</a></td>
<td></td>
</tr>
</tbody>
</table>

## Mutation
<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>onboard</strong></td>
<td valign="top"><a href="#user">User</a>!</td>
<td>

 **[Auth Needed]** Onboard the user with the given information. 

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">info</td>
<td valign="top"><a href="#onboardinginput">OnboardingInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>forumPost</strong></td>
<td valign="top"><a href="#post">Post</a>!</td>
<td>

 **[Auth Needed]** Post to the forum. Returns the created Post. 

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">title</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

 The title for the post. 

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">body</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

 The body for the post, in Markdown. 

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">tag</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

 The tag for the post. 

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>votePost</strong></td>
<td valign="top"><a href="#post">Post</a>!</td>
<td>

 **[Auth Needed]** Vote on a forum post. 

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td>

 The ID of the post to vote on. 

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">downvote</td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td>

 Whether or not to downvote the post. If `false`, will upvote the post. 

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>voteReply</strong></td>
<td valign="top"><a href="#post">Post</a>!</td>
<td>

 **[Auth Needed]** Vote on a forum reply. 

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td>

 The ID of the reply to vote on. 

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">downvote</td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td>

 Whether or not to downvote the reply. If `false`, will upvote the reply. 

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>replyToPost</strong></td>
<td valign="top"><a href="#reply">Reply</a>!</td>
<td>

 **[Auth Needed]** Create a top-level reply to a forum post. 

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td>

 The ID of the post to reply to. 

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">body</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

 The body for the reply, in Markdown. 

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>replyToReply</strong></td>
<td valign="top"><a href="#reply">Reply</a>!</td>
<td>

 **[Auth Needed]** Create a nested reply to a forum reply. 

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td>

 The ID of the reply to reply to. 

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">body</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

 The body for the reply, in Markdown. 

</td>
</tr>
</tbody>
</table>

## Objects

### OnboardingInfo

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

 The user's first name. 

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>mentorMentee</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

 Mentor or mentee status of the user. 

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>fieldStudy</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

 The user's general field of study. 

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>intendedMajor</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

 The user's intended major. 

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>gradYear</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

 The user's graduation year from their current program. 

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>race</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

 The user's racial identity. 

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>gender</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

 The user's gender identity. 

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>finaid</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td>

 Whether or not the user will apply for financial aid. 

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>applyIvy</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td>

 Whether or not the user will apply to the Ivy League. 

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>applyStateFlagships</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td>

 Whether or not the user will apply to state flagships. 

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>applyOtherState</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td>

 Whether or not the user will apply to other state schools. 

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>applyOtherPrivate</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td>

 Whether or not the user will apply to other private schools. 

</td>
</tr>
</tbody>
</table>

### Post

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td>

 The autogenerated Mongo ID of the post. 

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>title</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

 The user-supplied post title. 

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>body</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

 The Markdown body of the post. 

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>datetime</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

 The UTC Unix timestamp of the post. 

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>replies</strong></td>
<td valign="top">[<a href="#reply">Reply</a>]!</td>
<td>

 A list of replies to this specific post. 

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>upvotes</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

 The number of upvotes on this post. 

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>downvotes</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

 The number of downvotes on this post. 

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>tag</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

 The tag categorization of this post. 

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>user</strong></td>
<td valign="top"><a href="#user">User</a></td>
<td>

 The user that created this post. Can be `null` if the user doesn't exist anymore. 

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>myVote</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td>

**[Auth Optional]** The user's vote for this post.
Returns null if unauthenticated or not voted on.
Otherwise, returns -1 if downvoted, 1 if upvoted.

</td>
</tr>
</tbody>
</table>

### Reply

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td>

 The autogenerated Mongo ID of the reply. 

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>datetime</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

 The UTC Unix timestamp of the post. 

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>replies</strong></td>
<td valign="top">[<a href="#reply">Reply</a>]!</td>
<td>

 Children replies for this reply. 

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>body</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

 The Markdown body of the post. 

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>upvotes</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

 The number of upvotes on this post. 

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>downvotes</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

 The number of downvotes on this post. 

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>user</strong></td>
<td valign="top"><a href="#user">User</a></td>
<td>

 The user that created this post. Can be `null` if the user doesn't exist anymore. 

</td>
</tr>
</tbody>
</table>

### User

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td>

 The Auth0-generated ID for the user. 

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>onboardingInfo</strong></td>
<td valign="top"><a href="#onboardinginfo">OnboardingInfo</a></td>
<td>

 The user's onboarding data. 

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>posts</strong></td>
<td valign="top">[<a href="#post">Post</a>]!</td>
<td>

 The user's post history. 

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>replies</strong></td>
<td valign="top">[<a href="#reply">Reply</a>]!</td>
<td>

 The user's reply history. 

</td>
</tr>
</tbody>
</table>

## Inputs

### OnboardingInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

 The user's first name. 

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>mentorMentee</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

 Mentor or mentee status of the user. 

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>fieldStudy</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

 The user's general field of study. 

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>intendedMajor</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

 The user's intended major. 

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>gradYear</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

 The user's graduation year from their current program. 

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>race</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

 The user's racial identity. 

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>gender</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

 The user's gender identity. 

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>finaid</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td>

 Whether or not the user will apply for financial aid. 

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>applyIvy</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td>

 Whether or not the user will apply to the Ivy League. 

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>applyStateFlagships</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td>

 Whether or not the user will apply to state flagships. 

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>applyOtherState</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td>

 Whether or not the user will apply to other state schools. 

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>applyOtherPrivate</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td>

 Whether or not the user will apply to other private schools. 

</td>
</tr>
</tbody>
</table>

## Scalars

### Boolean

The `Boolean` scalar type represents `true` or `false`.

### ID

The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.

### Int

The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.

### String

The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.


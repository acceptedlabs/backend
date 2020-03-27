const router = require('express').Router()
const forumControllers = require('../controllers/forum-controllers')

//get a forum post by its id
router.get('/:pid', forumControllers.getPostById)

//get a forum post's replies by post id
router.get('/:pid/replies', forumControllers.getRepliesByPostId)

//create a new post
router.post('/', forumControllers.newPost)

//vote a particular post
router.patch('/:pid/votes', forumControllers.votePost)

module.exports = router

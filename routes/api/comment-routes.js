const router = require('express').Router();
const {
    addComment,
    removeComment,
    addReply,
    removeReply
} = require('../../controllers/comment-controller');

// /api/comments/<pizzaId>
//Remember that the callback function of a route method has req 
//and res as parameters, so we don't have to explicitly pass 
//any arguments to addReply.

//This is a PUT route, instead of a POST, because technically we're
// not creating a new reply resource. Instead, we're just updating 
//the existing comment resource. This is also reflected in the 
//endpoint, because we make no reference to a reply resource.
router
    .route('/:pizzaId/:commentId')
    .put(addReply)
    .delete(removeComment)

// /api/comments/<pizzaId>/<commentId>
// Remember that after deleting a particular comment, you need 
//to know exactly which pizza that comment originated from.
router.route('/:pizzaId/:commentId/:replyId').delete(removeReply);

module.exports = router;
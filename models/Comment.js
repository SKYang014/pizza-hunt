const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const CommentSchema = new Schema({
    writtenBy: {
        type: String
    },
    commentBody: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // a getter is typically a special type of function that 
        //takes the stored data you are looking to retrieve and 
        //modifies or formats it upon return.
        //With this get option in place, every time we retrieve 
        //a pizza, the value in the createdAt field will be 
        //formatted by the dateFormat() function and used instead 
        //of the default timestamp value. This way, we can use the 
        //timestamp value for storage, but use a prettier version 
        //of it for display.
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    toJSON: {
        virtuals: true,
        getters: true
    },
});

const Comment = model('Comment', CommentSchema);

module.exports = Comment;
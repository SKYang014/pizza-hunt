const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReplySchema = new Schema(
    {
        // set custom id to avoid confusion with parent comment _id
        //Here we'll need a unique identifier instead of the default _id 
        //field that is created, so we'll add a custom replyId field. 
        replyId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        replyBody: {
            type: String,
            required: true
        },
        writtenBy: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

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
    //associate replies with comments
    // the CommentSchema to have the replies field populated with 
    //an array of data that adheres to the ReplySchema definition
    replies: [ReplySchema]
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

//a virtual for CommentSchema to get the total reply count
CommentSchema.virtual('replyCount').get(function () {
    return this.replies.length;
});

const Comment = model('Comment', CommentSchema);

module.exports = Comment;
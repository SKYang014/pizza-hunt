//We could import the entire mongoose library, but we only need to worry 
//about the Schema constructor and model function, so we'll just import them
const { Schema, model } = require('mongoose');

//we don't have to use special imported data types for the type definitions
//we simply instruct the schema that this data will adhere to the built-in 
//JavaScript data types, including strings, Booleans, numbers, and so on
const PizzaSchema = new Schema({
    pizzaName: {
        type: String
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    size: {
        type: String,
        default: 'Large'
    },
    //Notice the empty brackets [] in the toppings field. This indicates an 
    //array as the data type. You could also specify Array in place of the 
    //brackets.
    toppings: [],
    comments: [
        {
            //we need to tell Mongoose to expect an ObjectId and to tell it 
            //that its data comes from the Comment model. We'll do this by 
            //updating the comments field of the model
            type: Schema.Types.ObjectId,
            //The ref property is especially important because it tells 
            //the Pizza model which documents to search to find the right comments.
            ref: 'Comment'
        }
    ]
},
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);
// get total count of comments and replies on retrieval
//Virtuals allow you to add virtual properties to a document that aren't stored 
//in the database. They're normally computed values that get evaluated when 
//you try to access their properties
PizzaSchema.virtual('commentCount').get(function () {
    //Here we're using the .reduce() method to tally up the total of every 
    //comment with its replies. In its basic form, .reduce() takes two parameters, 
    //an accumulator and a currentValue. Here, the accumulator is total, and 
    //the currentValue is comment. As .reduce() walks through the array, it 
    //passes the accumulating total and the current value of comment into the 
    //function, with the return of the function revising the total for the 
    //next iteration through the array.
    return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});
// create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// export the Pizza model
module.exports = Pizza;
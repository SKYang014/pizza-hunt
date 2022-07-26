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
    toppings: []
});

// create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// export the Pizza model
module.exports = Pizza;
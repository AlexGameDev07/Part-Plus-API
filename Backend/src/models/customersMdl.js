/**
 * name
 * email
 * password
 * phone
 * age
 */

import {Schema, model} from 'mongoose';

const CustomerMdl = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50,
        validate: {
            validator: function(v) {
                return /^[a-zA-Z\s]+$/.test(v);
            },
            message: props => `${props.value} is not a valid name!`
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function(v) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024,

    },
    phone: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function(v) {
                return /^\d{4}-\d{4}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number! (number without spaces, dashes, or parentheses)`
        }
    },
    age: {
        type: Number,
        required: true,
        min: 0,
        max: 120,
        validate: {
            validator: function(v) {
                return Number.isInteger(v);
            },
            message: props => `${props.value} is not a valid age!`
        }
    }
}, {
    timestamps: true,
    strict: false
});


export default model('Customers', CustomerMdl);
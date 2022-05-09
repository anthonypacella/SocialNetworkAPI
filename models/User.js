const { Schema, Types } = require('mongoose');
const thoughtSchema = require('./Thought');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            require: true,
            unique: true,
            validate: [validateEmail, "Please enter a valid email address"]
        },
        thoughts: [thoughtSchema.id],
        friends: [userSchema.id]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: true,
    }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

module.exports = userSchema;
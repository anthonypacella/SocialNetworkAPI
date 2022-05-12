const mongoose = require('mongoose');
const { Schema, Types, model } = require('mongoose');
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
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email address"]
        },
        thoughts: [
            {   type: Schema.Types.ObjectId,
                ref: 'thought'
            }
            ],
        friends: [
            {   type: Schema.Types.ObjectId,
                ref: 'friendId'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});


module.exports = mongoose.models.User || model('User', userSchema);
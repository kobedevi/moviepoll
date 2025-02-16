const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { LikedMovie } = require('./LikedMovie');

// schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    }
});

userSchema.pre(['remove', 'deleteMany'] , function() {
    const user = this;
    return LikedMovie.remove({userId: user._id});
});

userSchema.methods = {
    createToken : function() {
        const user = this;
        return jwt.sign({_id:user.id}, process.env.JWT_SECRET, {
            expiresIn: 60 *120,
        });
    }
};

const User = mongoose.model('User', userSchema);

// model
module.exports = {
    User,
    userSchema,
}
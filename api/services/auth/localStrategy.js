const LocalStrategy = require('passport-local');
const { User } = require('../../models/User');


const localStrategy = new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'username'
    }, async(username, password, done) => {
        try {
            let user = await User.findOne({username});
            if(!user) {
                const tempuser = new User({username});
                user = await tempuser.save();
            }
            return done(null, user);
        } catch(e) {
            return done(e, null);
        }
    }
)
module.exports = localStrategy;
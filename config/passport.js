const { User } = require('../models');
const GoogleStrategy = require('passport-google-oauth20').Strategy

module.exports = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    }, async (accessToken, refreshToken, profile, done) => {
        const newUser = {
            authId: profile.id,
            displayName: profile.displayName,
            // firstName: profile.name.givenName,
            // lastName: profile.name.familyName,
            image: profile.photos[0].value
        };

        try {
            let user = (await User.findOne({
                where: { authId: profile.id },
            })).toJSON();

            if (!user) {
                user = await User.create(newUser);
            }

            return done(null, user);
        } catch (error) {
            console.log(error.message);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user.authId);
    });

    passport.deserializeUser(async (authId, done) => {
        try {
            const user = await User.findOne({ where: { authId } });
            done(null, user.toJSON());
        } catch (error) {
            done(error, null)
        }
    });
}
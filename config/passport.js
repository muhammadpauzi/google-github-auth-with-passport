const { User } = require('../models');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require('passport-github2').Strategy;

module.exports = (passport) => {
    const callback = async (accessToken, refreshToken, profile, done) => {
        const newUser = {
            authId: profile.id,
            displayName: profile.displayName,
            image: profile.photos[0].value
        };

        try {
            let user = await User.findOne({
                where: { authId: profile.id },
            });

            if (!user) {
                user = await User.create(newUser);
            }

            return done(null, user.toJSON());
        } catch (error) {
            console.log(error.message);
            return done(error, null);
        }
    }

    // google
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    }, callback));
    // github
    passport.use(new GithubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: '/auth/github/callback'
    }, callback));

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
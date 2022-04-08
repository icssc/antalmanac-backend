const passport = require('passport')
const { OAuth2Strategy: GoogleStrategy , VerifyOptions } = require('passport-google-oauth')
// var FacebookStrategy = require('passport-facebook').Strategy;
// var GitHubStrategy = require('passport-github').Strategy
;
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

/**
 * Configuration for Google Strategy
 */
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: (process.env.NODE_ENV == 'production' ? process.env.PRODUCTION_DOMAIN : '') + '/api/auth/google/callback'
        },
        function (accessToken, refreshToken, profile, done) {
            let email = '';
            // get the first registered email
            if (profile.emails && profile.emails.length > 0) {
                email = profile.emails[0].value;
            }
            var userData = {
                id: profile.id,
                email: email,
                name: profile.displayName,
                picture: profile._json.picture
            };
            done(null, userData);
        }
    )
);

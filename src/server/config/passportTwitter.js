import { twitter } from '../config/social';
import TwitterStrategy from 'passport-twitter';

export const passportTwitter = (passport) => {
    passport.serializeUser( (user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser( (id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        })
    });


    passport.use(new TwitterStrategy({
            consumerKey: twitter.moonwalkId,
            consumerSecret: twitter.moonwalkSecret,
            callbackURL: twitter.callbackURL
        },
        (token, tokenSecret, profile, done) => {
            User.findOne({ 'twitter.id' : profile.id }, (err, user) => {
                if (err) { return done(err); }
                // user found, login & return user
                if(user) { return done(null, user) }
                // if no user, then create one
                else {
                    let newUser                 = new User();

                    // set all of the user data that we need
                    newUser.twitter.id          = profile.id;
                    newUser.twitter.token       = token;
                    newUser.twitter.username    = profile.username;
                    newUser.twitter.displayName = profile.displayName;

                    // save our user into the database
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        }
    ));
};
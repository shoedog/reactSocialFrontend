import passport from 'passport';
import { twitter } from '../social';
import TwitterStrategy from 'passport-twitter';

export const passportTwitter = (passport) => {


    passport.use(new TwitterStrategy({
            consumerKey: twitter.moonwalkId,
            consumerSecret: twitter.moonwalkSecret,
            callbackURL: twitter.callbackURL
        },
        (token, tokenSecret, profile, done) => {
            var providerData = profile._json;
            providerData.token = token;
            providerData.tokenSecret = tokenSecret;

            // Create the user OAuth profile
            var providerUserProfile = {
                displayName: profile.displayName,
                username: profile.username,
                provider: 'twitter',
                providerIdentifierField: 'id_str',
                providerData: providerData
            };

            console.log(providerUserProfile);
        }
    ));
};
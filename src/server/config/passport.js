import passport from 'passport';

export const serializeUser = passport.serializeUser( (user, done) => {
    done(null, user.id);
});

export const deserializeUser = passport.deserializeUser( (id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    })
});

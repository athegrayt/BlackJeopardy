const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require('../config/keys');

const User = mongoose.model('users');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => {
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
			proxy: true,
		},
		async (accessToken, refreshToken, profile, done) => {
			const existingUser = await User.findOne({ googleID: profile.id })
				if (existingUser) {
					console.log('existingUser');
					return done(null, existingUser);
				} 
				const user = await new User({
					googleID: profile.id,
					email: profile.emails[0].value,
				}).save();
				console.log('newUser');
				done(null, user);
			}
	)
);

passport.use(
	new JwtStrategy(opts, (jwt_payload, done) => {
		const user = User.findById(jwt_payload.id)
		try{
			if (user) {
						return done(null, user);
					}
					return done(null, false);
		}catch(err){
				console.log(err)
			} 
	})
);


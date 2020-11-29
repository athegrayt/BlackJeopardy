const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const keys = require('../config/keys');

const User = mongoose.model('users');

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
		},
		(accessToken, refreshToken, profile, done) => {
			User.findOne({ googleID: profile.id }).then((existingUser) => {
				if (existingUser) {
					//already have record of User
					done(null, existingUser);
				} else {
					//make new record
					new User({ googleID: profile.id, email: profile.email })
						.save()
						.then((user) => done(null, user));
				}
			});
		}
	)
);
passport.use(
	new FacebookStrategy(
		{
			clientID: keys.facebookClientID,
			clientSecret: keys.facebookClientSecret,
			callbackURL: '/auth/facebook/callback',
			profileFields: ['id', 'displayName', 'photos', 'email'],
		},
		(accessToken, refreshToken, profile, done) => {
			User.findOne({ facebookID: profile.id }).then((existingUser) => {
				if (existingUser) {
					console.log('user exisits facebook');
					//already have record of User
					done(null, existingUser);
				} else {
					console.log('user does not exisits facebook');
					//make new record
					new User({ facebookID: profile.id, email: profile.email })
						.save()
						.then((user) => done(null, user));
				}
			});
		}
	)
);

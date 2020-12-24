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
	new FacebookStrategy(
		{
			clientID: keys.facebookClientID,
			clientSecret: keys.facebookClientSecret,
			callbackURL: '/auth/facebook/callback',
			profileFields: ['id', 'displayName', 'photos', 'email'],
			proxy: true,
		},
		async (accessToken, refreshToken, profile, done) => {
			console.log(`profile.id: ${profile.id}`);
			console.log(profile);
			const existingUser = await User.findOne({ facebookID: profile.id })
				if (existingUser) {
					return done(null, existingUser);
				}
					const user = await new User({ facebookID: profile.id }).save()
					done(null, user)
			}
	)
);

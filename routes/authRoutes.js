const passport = require('passport')
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');
const keys = require('../config/keys')
const validationRegisterInput =  require("../validation/register")
const validationLoginInput =  require("../validation/login")
const User = mongoose.model('users')

module.exports = (app) => {

    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email'],
        })
    );
    app.get('/auth/google/callback', passport.authenticate('google'), 
    (req, res)=>{
    res.redirect('/dashboard');    
    });
    
    app.get('/api/logout', (req,res)=>{
        req.logout()
        res.redirect('/login')
    })

    app.get('/api/current-user', (req, res) => {
			res.send(req.user);
        });
        
    app.post('/api/users/register', async (req, res) => {
			try{
            const { errors, isValid } = validationRegisterInput(req.body);
			if (!isValid) {
				
                return res.status(400).json(errors);
			}

			const user = await User.findOne({ email: req.body.email });
			if (user) {
				return res.status(400).json({ email: 'Email already exisits' });
			}
			const newUser = await new User({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password,
			});
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, async (err, hash) => {
					try {
						if (err) throw err;
						newUser.password = hash;
						const user = await newUser.save();
						res.json(user);
					} catch (err) {
						console.log(err);
					}
				});
			});
            }catch(err){
                console.log(err);
            }

		});

    app.post('/api/users/login', async (req, res) => {
			try{
				console.log(req.body);
			if(req.body.data){
				const payload = {
					id: req.body.data._id,
					name: req.body.data.name,
				};
				// Sign token
				jwt.sign(
					payload,
					keys.secretOrKey,
					{
						expiresIn: 31556926, // 1 year in seconds
					},
					(err, token) => {
						res.json({
							success: true,
							token: 'Bearer ' + token,
							userID: req.body.data._id,
						});
					}
				);
			}else if (!req.body.data) {
				const { errors, isValid } = await validationLoginInput(req.body);
				// Check validation
				if (!isValid) {
					console.log(errors)
					return res.status(400).json(errors);
				}
				const email = await req.body.email;
				const password = await req.body.password;
				// Find user by email
				const user = await User.findOne({ email });
				console.log('user',user)
				// Check if user exists
				if (!user) {
					return res.json({ error: 'Email not found' });
					// return res.status(404).json({ email: 'Email not found' });
				}
				// Check password
				const isMatch = await bcrypt.compare(password, user.password);
				console.log('isMatch', isMatch)
				if (isMatch) {
					// User matched
					// Create JWT Payload
					const payload = {
						id: user.id,
						name: user.name,
					};
					console.log(payload)
					// Sign token
					jwt.sign(
						payload,
						keys.secretOrKey,
						{
							expiresIn: 31556926, // 1 year in seconds
						},
						(err, token) => {
							res.json({
								success: true,
								token: 'Bearer ' + token,
								userID: user.id,
							});
						}
					);
				}else {
				return res.status(400).json({ password: 'Password incorrect' });
			}
		}
		}catch(err){
                console.log(err);
            }
		});


}

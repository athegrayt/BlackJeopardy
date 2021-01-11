const mongoose = require('mongoose');
const keys = require('../config/keys');
const routeMethods = require('./util/routeMethods');
const requireLogin = require('../middlewares/requireLogin')
const Person = mongoose.model('person');
const MovieQuote = mongoose.model('movieQuote');
const SNL = mongoose.model('snl');
const CurrentGame = mongoose.model('curGame')

module.exports = (app) => {
	app.get('/jeopardy/new-game', async (req, res) => {
		try {
			const personFacts = await Person.find({
			    value:[200,400,600]
			})
			const movieQuotes = await MovieQuote.find({
				value: [200, 400, 600],
			});
			const snlQuotes = await SNL.find({
				value: [200, 400, 600],
			});
			let ans = {
				mq: {},
				snl: {},
				person: {},
			};
			const mq200 = movieQuotes
            .filter((obj) => obj.value === 200)
            .map((movie) => routeMethods.organizeMovieData(movie));
            ans.mq[200] = routeMethods.randomNum(mq200);
            
			const mq400 = movieQuotes
            .filter((obj) => obj.value === 400)
            .map((movie) => routeMethods.organizeMovieData(movie));
			ans.mq[400] = routeMethods.randomNum(mq400);
			const mq600 = movieQuotes
            .filter((obj) => obj.value === 600)
            .map((movie) => routeMethods.organizeMovieData(movie));
			ans.mq[600] = routeMethods.randomNum(mq600);
			const snl200 = snlQuotes
            .filter((obj) => obj.value === 200)
            .map((joke) => routeMethods.organizeSNLData(joke));
			ans.snl[200] = routeMethods.randomNum(snl200);
			const snl400 = snlQuotes
            .filter((obj) => obj.value === 400)
            .filter((obj) => obj.value === 400)
            .map((joke) => routeMethods.organizeSNLData(joke));
			ans.snl[400] = routeMethods.randomNum(snl400);
			const snl600 = snlQuotes
            .filter((obj) => obj.value === 600)
            .filter((obj) => obj.value === 600)
            .map((joke) => routeMethods.organizeSNLData(joke));
			ans.snl[600] = routeMethods.randomNum(snl600);
			const person200 = personFacts
            .filter((obj) => obj.value === 200)
            .map((person) => routeMethods.organizePersonData(person));
			ans.person[200] = routeMethods.randomNum(person200);
			const person400 = personFacts
            .filter((obj) => obj.value === 400)
            .map((person) => routeMethods.organizePersonData(person));
            ans.person[400] = routeMethods.randomNum(person400);
			const person600 = personFacts
            .filter((obj) => obj.value === 600)
            .map((person) => routeMethods.organizePersonData(person));
            ans.person[600] = routeMethods.randomNum(person600);
            
            const movieTitles = movieQuotes.map(movie => movie.quote[0].title)
            routeMethods.altAnswerGenerator(ans.mq, movieTitles);
            const personNames = personFacts.map(person => person.facts.name)
            routeMethods.altAnswerGenerator(ans.person, personNames);
            const snlAnswers = snlQuotes.map(item => item.quote.answer)
            routeMethods.altAnswerGenerator(ans.snl, snlAnswers);
            
			

			res.send(ans);
		} catch (err) {
			console.log(err);
		}
    });
    
    app.post('/jeopardy/current-game', async (req,res)=> {
		const {mq, snl, person, _user ,curScore} = req.body
		
		const curGame = await CurrentGame.findOne({
			_user
		})
		if(curGame){
			const curGameUpdate = await CurrentGame.findOneAndUpdate(
				{ _user },
				{
					mq,
					snl,
					person,
					score: +curScore
				}
			);
			try {
				curGameUpdate.save();
			} catch (err) {
				res.status(422).send(err);
			}
		}else{
			const curGameInit = new CurrentGame({
				mq,
				snl,
				person,
				_user,
			});
			try {
				curGameInit.save();
			} catch (err) {
				res.status(422).send(err);
			}
		}
		
        
    })
    app.get('/jeopardy/current-game/:_user', async (req,res)=> {
		const {_user} = await req.params
		
		try{
		const currentGame = await CurrentGame.findOne({
			_user,
		});
		
			res.send(currentGame);
		}catch(err){
			res.status(422).send(err);
		}
        
    })

};

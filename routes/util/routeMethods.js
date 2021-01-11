
function organizeMovieData(movie) {
	const movieOrganized = {};
	//may need to delete the 'replace'
	const quote = movie.quote[0].quote.replace(/["]/g, ' ').trim();
	movieOrganized.question = `In this movie, ${movie.quote[0].speaker} says, ${quote}`;
	movieOrganized.answer = `${movie.quote[0].title}`;
	return movieOrganized;
}
function organizeSNLData(joke) {
	let snl = {};
	snl.question = joke.quote.question;
	snl.answer = joke.quote.answer;
	return snl;
}
function organizePersonData(person) {
	const answer = person.facts.name;
	const lastName = answer.slice(answer.lastIndexOf(' '), answer.length).trim();
	let question = null;
	if (person.facts.didYouKnow[0]) {
		question = person.facts.didYouKnow[0].replace(answer, 'this person');
		question = question.slice(0, question.indexOf('.') + 1);
		if (question.includes(lastName)) {
			question = question.replace(lastName, 'this person').trim();
		}
		question = question.charAt(0).toUpperCase() + question.slice(1);
	} else {
		question = person.facts.image;
	}
	return { question, answer };
}
function randomNum(db) {
	return db[Math.floor(Math.random(db) * db.length)];
}

function altAnswerGenerator(category, list) {
	let answerAlt1 = list.filter((item) => item !== category[200].answer);
	answerAlt1 = randomNum(answerAlt1);
	let answerAlt2 = list.filter(
		(item) => item !== category[200].answer && item !== answerAlt1
	);
	answerAlt2 = randomNum(answerAlt2);
	category[200].answerAlt1 = answerAlt1;
	category[200].answerAlt2 = answerAlt2;
	let answerAlt3 = list.filter(
		(item) =>
			item !== category[400].answer &&
			item !== answerAlt1 &&
			item !== answerAlt2
	);
	answerAlt3 = randomNum(answerAlt3);
	let answerAlt4 = list.filter(
		(item) =>
			item !== category[400].answer &&
			item !== answerAlt1 &&
			item !== answerAlt2 &&
			item !== answerAlt3
	);
	answerAlt4 = randomNum(answerAlt4);
	category[400].answerAlt1 = answerAlt3;
	category[400].answerAlt2 = answerAlt4;
	let answerAlt5 = list.filter(
		(item) =>
			item !== category[600].answer &&
			item !== answerAlt1 &&
			item !== answerAlt2 &&
			item !== answerAlt3 &&
			item !== answerAlt4
	);
	answerAlt5 = randomNum(answerAlt5);
	let answerAlt6 = list.filter(
		(item) =>
			item !== category[600].answer &&
			item !== answerAlt1 &&
			item !== answerAlt2 &&
			item !== answerAlt3 &&
			item !== answerAlt4 &&
			item !== answerAlt5
	);
	answerAlt6 = randomNum(answerAlt6);
	category[600].answerAlt1 = answerAlt5;
	category[600].answerAlt2 = answerAlt6;
}

exports.organizeMovieData = organizeMovieData;
exports.organizeSNLData = organizeSNLData;
exports.organizePersonData = organizePersonData;
exports.randomNum = randomNum;
exports.altAnswerGenerator = altAnswerGenerator;



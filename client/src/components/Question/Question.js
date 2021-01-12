import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom'
import Modal from '../UI/Modal/Modal'
import * as actions from '../../store/actions/jeopardyActions';
import * as classes from './Question.module.css';
import TabBar from '../../hoc/Layouts/Tabbar/TabBar';
import QuestionButton from '../UI/Buttons/Question/QuestionButton';
import shuffle from '../../utils/shuffle';

class Question extends Component {
	state={
		redirect: false,
		ansType: null, 
	}

	updateGameBoard = (gameTile, ans) => {
		const{type} = ans
		const gameBoardTile=gameTile.split('.')
		let updatedGameBoard = { mq:this.props.mq,snl: this.props.snl, person: this.props.person };
		for (let category in updatedGameBoard) {
			if (category === gameBoardTile[0]){
				updatedGameBoard[category][gameBoardTile[1]] = false
			} 
		}
		let curScore =
			type === 'ans'
				? this.props.score + (+gameBoardTile[1]) 
				: this.props.score - (+gameBoardTile[1]);
		this.props.updateJeopardy(curScore, updatedGameBoard, this.props._user);
		this.setState({verifyAns: true, ansType: type})
		setTimeout(() => this.setState({ verifyAns: false, redirect: true }), 1500);
	};

	render() {
		let redirect = this.state.redirect ? <Redirect to='/jeopardy'></Redirect> : null
		const { catName, gameTile } = this.props.location;
		let { question } = this.props.location.info;
		const { answer, answerAlt1, answerAlt2 } = this.props.location.info;
		let answers = [
			{ answer, type: 'ans' },
			{ answer: answerAlt1, type: 'alt' },
			{ answer: answerAlt2, type: 'alt' },
		];
		const shuffledArr = shuffle(answers);
		let ansPrompt = catName.includes('People') ? 'Who is...' : 'What is...';
		if (question.includes('.jpg')) {
			question = (
				<img src={question} alt={answer} style={{ maxWidth: '50%' }} />
			);
		}
		let verifiedAns=null
		if(this.state.ansType){
			verifiedAns =
				this.state.ansType === 'ans' ? (
					<Modal show={this.state.verifyAns}>
						<p className={classes.response}>That's Correct!</p>
					</Modal>
				) : (
					<Modal show={this.state.verifyAns}>
						<p className={classes.response}>
							Sorry, the answer that we were looking for was:
						</p>
						<p className={classes.response}>{answer}</p>
					</Modal>
				);
		}
		const JeopAnswers = shuffledArr.map((ans, i) => {
			return(
				<Fragment>
					<QuestionButton
						key={ans.answer}
						clicked={() => this.updateGameBoard(gameTile, ans )}>
						{ans.answer}
					</QuestionButton>
				</Fragment>
			)
		});
		let prompt = this.state.ansType ? null : (
			<div className={classes.container}>
				<div className={classes.question}>{question}</div>
				<h3>{ansPrompt}</h3>
				<div className={classes.answers}>{JeopAnswers}</div>
			</div>
		);

		return (
			<TabBar question={true}>
				{prompt}
				{verifiedAns}
				{redirect}
			</TabBar>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		mq: state.jeop.curGame.mq,
		snl: state.jeop.curGame.snl,
		person: state.jeop.curGame.person,
		score: state.jeop.score,
		_user: state.auth.user.id,
	};
};

export default connect(mapStateToProps, actions)(Question);

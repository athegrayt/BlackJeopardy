import React, { Component, useContext, useState} from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom'
import Modal from '../UI/Modal/Modal'
import correctGIF from '../../assets/gif/giphy.gif'
import incorrectGIF from '../../assets/gif/incorrectGIF.gif'
import * as actions from '../../store/actions/jeopardyActions';
import * as classes from './Question.module.css';
import TabBar from '../../hoc/Layouts/Tabbar/TabBar';
import shuffle from '../../utils/shuffle';
import globalStateContext from '../../context/global-state-context';

const Question =(props)=> {
	const context = useContext(globalStateContext)
	const {curGame, user, score, updateJeopardy} = context
	const [redirect, setRedirect] = useState(false)
	const [ansType, setAnsType] = useState()
	const [verifyAns, setVerifyAns] = useState()
	
	const updateGameBoard = (gameTile, ans) => {
		const{type} = ans
		const gameBoardTile=gameTile.split('.')
		let updatedGameBoard = { mq: curGame.mq ,snl: curGame.snl,person: curGame.person };
		for (let category in updatedGameBoard) {
			if (category === gameBoardTile[0]) {
				updatedGameBoard[category][gameBoardTile[1]] = false
			} 
		}
		let curScore =
			type === 'ans'
				? score + (+gameBoardTile[1]) 
				: score - (+gameBoardTile[1]);
		updateJeopardy(curScore, updatedGameBoard, user.id);
		setVerifyAns(true)
		setAnsType(type)
		setTimeout(() => {
			setVerifyAns(false)
			setRedirect(true)
		}, 2000);
	};

		const { catName, gameTile, info } = props.location;
		let { question } = info;
		const { answer, answerAlt1, answerAlt2 } = info;
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
		if(ansType){
			verifiedAns =
				ansType === 'ans' ? (
					<Modal show={verifyAns}>
						<img src={correctGIF} alt='correct'></img>
						<h5 style={{ color: '#060ce9' }}>Correct!</h5>
					</Modal>
				) : (
					<Modal show={verifyAns}>
						<img src={incorrectGIF} alt='correct'></img>
						<h5 style={{ color: '#060ce9' }} className={classes.response}>
							Correct answer was:
						</h5>
						<h6 className={classes.response}>{answer}</h6>
					</Modal>
				);
		}
		const JeopAnswers = shuffledArr.map((ans, i) => {
			return (
				<div className={classes.btn}
					key={ans.answer}
					onClick={() => updateGameBoard(gameTile, ans)}>
					{ans.answer}
				</div>
			);
		});

		return (
			<TabBar question={true}>
				{!ansType && (
					<div className={classes.container}>
						<div className={classes.question}>{question}</div>
						<h5>{ansPrompt}</h5>
						<div className={classes.answers}>{JeopAnswers}</div>
					</div>
				)}
				{verifiedAns}
				{redirect && <Redirect to='/jeopardy'></Redirect>}
			</TabBar>
		);
	}



export default Question;

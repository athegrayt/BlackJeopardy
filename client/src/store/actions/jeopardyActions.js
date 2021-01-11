import {
	SET_NEW_GAME,
	UPDATE_CUR_TAB,
    SET_CURRENT_GAME,
    SET_GAME_QUESTIONS, 
} from './actionTypes';
import axios from 'axios'


export const updateCurTab = (curTab, jeop) => {
	return{
		type: UPDATE_CUR_TAB,
		curTab, 
		jeop
	}
}

export const setGameQuestions = (mq, snl, person) => {
    return{
        type: SET_GAME_QUESTIONS,
        mq,snl, person
    }
}

export const fetchGameQuestions = () => async dispatch =>{
    try {
        const questions = await axios.get('/jeopardy/new-game')
        dispatch(setGameQuestions(questions.data.mq, questions.data.snl, questions.data.person))
    } catch (error) {
        console.log(error)
    }
}

export const setNewGame = () => {
    return{
        type: SET_NEW_GAME,
        mq: {200: true, 400: true, 600: true},
        snl: {200: true, 400: true, 600: true},
        person: {200: true, 400: true, 600: true}
    }
}

export const setCurrentGame = (mq, snl, person, score) =>{
    return{
        type: SET_CURRENT_GAME,
        mq, snl, person, newGame: false, score: +score
    }
}

export const fetchCurrentGame = (id) => async dispatch =>{
    try {
        const curGame = await axios.get(`/jeopardy/current-game/${id}`);
        if(curGame.data){
            dispatch(setCurrentGame(curGame.data.mq, curGame.data.snl, curGame.data.person))
        }else{
            dispatch(setNewGame())
        }
    } catch (error) {
        console.log(error);
    }
}

export const updateJeopardy = (type, score, gameboard, _user ) =>async dispatch=>{
    const { mq, snl, person } = gameboard
    let curScore = type === 'ans' ? score : -score
    dispatch(setCurrentGame(mq, snl, person, curScore))
    axios.post('/jeopardy/current-game', { mq, snl, person, _user, curScore });
}
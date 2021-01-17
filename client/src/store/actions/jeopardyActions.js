import {
	SET_NEW_GAME,
	UPDATE_CUR_TAB,
    SET_CURRENT_GAME,
    SET_GAME_QUESTIONS,
    UPDATE_RECORDS 
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

export const newGameInit = (score, newGame, mq, snl, person) => {
    return{
        type: SET_NEW_GAME,
        score,
        newGame,
        mq,
        snl,
        person
    }
}
export const setNewGame = (_user)=> async dispatch =>{
        const score= 0
        const newGame= true
        const mq= {200: true, 400: true, 600: true}
        const snl= {200: true, 400: true, 600: true}
        const person= {200: true, 400: true, 600: true}
    axios.post('/jeopardy/current-game', {  _user });
    dispatch(newGameInit(score, newGame, mq, snl, person));
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
        if(curGame.data.mq){
            dispatch(setCurrentGame(curGame.data.mq, curGame.data.snl, curGame.data.person, curGame.data.score))
        }else{
            dispatch(setNewGame())
        }
    } catch (error) {
        console.log(error);
    }
}

export const updateJeopardy = (score, gameboard, _user) =>async dispatch=>{
    const { mq, snl, person } = gameboard
    dispatch(setCurrentGame(mq, snl, person, score))
    axios.post('/jeopardy/current-game', { mq, snl, person, _user, score });
}

export const setRecords = (records) => {
    return{
        type: UPDATE_RECORDS,
        records
    }
}

export const updateRecords = (_user, records) => async dispatch => {
    axios.post('jeopardy/records',{ _user, records});     
    dispatch(setRecords(records))
}

export const setRecordsInit = (id) => async dispatch => {
   const pastRecords = await axios.get(`jeopardy/records/${id}`)
   console.log(pastRecords);
   let records = pastRecords.data ? pastRecords.data : []
   dispatch(setRecords(records))
}
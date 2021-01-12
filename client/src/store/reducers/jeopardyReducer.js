import {SET_CURRENT_GAME,SET_NEW_GAME, SET_GAME_QUESTIONS, UPDATE_RECORDS} from '../actions/actionTypes'

const initialState={
   score: 0, 
   newGame: true
}

const jeopardyReducer = (state = initialState, action) => {
    switch (action.type){
        case SET_GAME_QUESTIONS:
            return{
                ...state, 
                questions:{
                    mq: action.mq,
                    snl: action.snl,
                    person: action.person,
                }
            }
        case SET_NEW_GAME:
            return {
                    ...state,
                    score: action.score,
                    newGame: action.newGame,
                    curGame: {
                        mq: action.mq,
                        snl: action.snl,
                        person: action.person,
                    }
                    }
        case SET_CURRENT_GAME:
            return{
                    ...state,
                    score: action.score,
                    newGame: action.newGame,
                    curGame: {
                        mq: action.mq,
                        snl: action.snl,
                        person: action.person,
                    },
            }
        case UPDATE_RECORDS:
            return{
                    ...state,
                    records: action.records
            }
        default:
            return state
    }
}

export default jeopardyReducer;
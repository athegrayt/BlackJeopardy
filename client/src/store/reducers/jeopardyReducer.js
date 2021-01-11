import {SET_CURRENT_GAME,SET_NEW_GAME, SET_GAME_QUESTIONS} from '../actions/actionTypes'

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
                    score: 0,
                    newGame: true,
                    curGame: {
                        mq: action.mq,
                        snl: action.snl,
                        person: action.person,
                    }
                    }
        case SET_CURRENT_GAME:
            const updatedScore = state.score+action.score;
            return{
                    ...state,
                    score: updatedScore,
                    newGame: action.newGame,
                    curGame: {
                        mq: action.mq,
                        snl: action.snl,
                        person: action.person,
                    },
            }
        default:
            return state
    }
}

export default jeopardyReducer;
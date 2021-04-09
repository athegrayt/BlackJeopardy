import { SET_CURRENT_USER, USER_LOADING, SET_CURRENT_GAME,SET_NEW_GAME, SET_GAME_QUESTIONS, UPDATE_RECORDS, GET_ERRORS} from '../store/actions/actionTypes'
import { setCurrentUser, userLoading, getError, setGameQuestions, setNewGame, updateRecords, setCurrentGame } from './global-state-actions'

const globalStateReducer = (state , action) => {
	switch (action.type) {
		case SET_CURRENT_USER:
			return setCurrentUser(action.isAuthenticated,action.user,state)
		case USER_LOADING:
			return userLoading(action.loading, state)
		case GET_ERRORS:
            return getError(action.error, state)
        case SET_GAME_QUESTIONS:
            return setGameQuestions(action.mq, action.snl ,action.person, state)
        case SET_NEW_GAME:
            return setNewGame(state)
        case SET_CURRENT_GAME:
            return setCurrentGame(action.score, action.newGame, action.mq, action.snl, action.person,state)
        case UPDATE_RECORDS:
            return updateRecords(action.records, state)
		default:
			return state;
	}
};

export default globalStateReducer;
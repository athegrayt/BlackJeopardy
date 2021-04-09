import { combineReducers } from 'redux';
import {reducer as reduxForm} from 'redux-form'
// import authReducer from './authReducer';
import tabBarReducer from './tabBarReducer'
import jeopardyReducer from './jeopardyReducer'
import errorReducer from './errorReducer'

export default combineReducers({
	form: reduxForm,
	// auth: authReducer,
	tabBar: tabBarReducer,
	jeop: jeopardyReducer,
	err: errorReducer
});

import axios from 'axios'
import setAuthToken from '../../utils/setAuthToken'
import jwt_decode from "jwt-decode"
import {FETCH_USER, UPDATE_CUR_TAB, GET_ERRORS, SET_CURRENT_USER, USER_LOADING} from './actionTypes'


export const fetchUser = () => 
    async (dispatch)=>{
		
		let decoded, currentTime
		const token = await localStorage.jwtToken;
        const res = await axios.get('/api/current-user')

			if(res.data){
			dispatch({
				type: FETCH_USER,
				payload: res.data,
			})
			}else if (token) {
				setAuthToken(token);
				decoded = await jwt_decode(token)
				dispatch(setCurrentUser(decoded));
				currentTime = await Date.now() / 1000;
				if (decoded.exp < currentTime){
				dispatch(logoutUser());
				window.location.href = "./login";
				}
		}
			}

		
export const handleToken = (token) => async dispatch =>{
	const res = await axios.post('/api/stripe', token)
	dispatch({
		type: FETCH_USER, 
		payload: res.data
	}) 
}		

export const registerUser = (userData, history) => (dispatch) => {
	axios
		.post('/api/users/register', userData)
		.then((res) => history.push('/game-choice')) 
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};

export const loginUser = (userData, history) => async dispatch => {
	try{
		const res = await axios.post('/api/users/login', userData)
		const { token } = await res.data;
		localStorage.setItem('jwtToken', token);
		setAuthToken(token);
		const decoded = jwt_decode(token);
		dispatch(setCurrentUser(decoded));
		history.push('/dashboard');

	}catch(err){
		console.log(err.response.data)
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data,
		})
	} 
		
};

export const setCurrentUser = (decoded) => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded,
	};
};

export const setUserLoading = () => {
	return {
		type: USER_LOADING,
	};
};

export const logoutUser = () => (dispatch) => {
	if(localStorage.jwtToken){
		localStorage.removeItem('jwtToken');
		setAuthToken(false);
		dispatch(setCurrentUser({}));
	}else{
		axios.get('/api/logout')
		dispatch(setCurrentUser({}));
	}
};

export const updateCurTab = (curTab, jeop) => {
	console.log({curTab, jeop})
	return{
		type: UPDATE_CUR_TAB,
		curTab, 
		jeop
	}
}
import { useReducer } from 'react'
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from "jwt-decode"
import { GET_ERRORS, SET_CURRENT_USER, SET_NEW_GAME,
    SET_CURRENT_GAME,
    SET_GAME_QUESTIONS,
    UPDATE_RECORDS } from '../store/actions/actionTypes'
import globalStateReducer from './global-state-reducer'
import GlobalStateContext from './global-state-context'

const GlobalState = (props) => {
    const isAuthenticated = null
    const user = {}
    const questions = {
            mq: null,
            snl: null,
            person: null,
    }
    const score = null
    const records = null
    const newGame= null
    const curGame= {
            mq: null,
            snl: null,
            person: null,
                    }
    const loading = false
    const error = null
    const [globalState, dispatch] = useReducer(globalStateReducer, {
        isAuthenticated,
        user,
        questions,
        score,
        records,
        newGame,
        curGame,
        loading,
        error
    })



    const fetchUser = async (user) => {
        try {
            const token = await localStorage.jwtToken;
            const res = await axios.get('/api/current-user')
            console.log({token, res});
            if (res.data) {
                    console.log('res.data',res.data)
                    dispatch({type: SET_CURRENT_USER, isAuthenticated: (res.data && true), user: res.data});
                }else if (token) {
                    setAuthToken(token);
                    let decoded = await jwt_decode(token)
                    dispatch({type: SET_CURRENT_USER, isAuthenticated: (decoded && true), user: decoded});
                    const currentTime = await Date.now() / 1000;
                    if (decoded.exp < currentTime){
                    dispatch(logoutUser());
                    window.location.href = "./login";
                    }
            }
        } catch(err){
            console.log(err)
        }
} 
	
const auth = async (userData, isSignin, history) =>{
	try{
            const res = isSignin ? await axios.post('/api/users/login', userData) : await axios.post('/api/users/register', userData)
        console.log(res)
        if (res.data.error) {
            return dispatch({type: GET_ERRORS, error: res.data.error})
        }
            const { token } = await res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch({type: SET_CURRENT_USER, isAuthenticated: (decoded && true), user: decoded});
            history.push('/dashboard');
        
    } catch (err) {
        console.log(err)	
	} 
		
};

const logoutUser = () => (dispatch) => {
	if(localStorage.jwtToken){
		localStorage.removeItem('jwtToken');
		setAuthToken(false);
		dispatch({type: SET_CURRENT_USER, isAuthenticated: false, user: null});
	}else{
		axios.get('/api/logout')
		dispatch({type: SET_CURRENT_USER, isAuthenticated: false, user: null});
	}
};

    const setError = () => {
     dispatch({type: GET_ERRORS, error: null})
 }

/************************* */


const fetchGameQuestions = async () =>{
    try {
        const questions = await axios.get('/jeopardy/new-game')
        console.log(questions)
        dispatch({type: SET_GAME_QUESTIONS, mq: questions.data.mq, snl: questions.data.snl, person: questions.data.person})
    } catch (error) {
        console.log(error)
    }
}

const setNewGame = (_user) =>{
    axios.post('/jeopardy/current-game', {  _user });
    dispatch({type: SET_NEW_GAME});
}

const fetchCurrentGame = async (id) =>{
    try {
        const curGame = await axios.get(`/jeopardy/current-game/${id}`);
        console.log({curGame});
        if (curGame.data.mq) {
            dispatch({type: SET_CURRENT_GAME, mq: curGame.data.mq, snl: curGame.data.snl, person: curGame.data.person, score: curGame.data.score})
        }else{
            dispatch({type: SET_NEW_GAME, });
        }
    } catch (error) {
        console.log(error);
    }
}

const updateJeopardy = (score, gameboard, _user)=>{
    console.log('updateJeopardy', score, gameboard, _user)
    const { mq, snl, person } = gameboard
    dispatch({type: SET_CURRENT_GAME,mq, snl, person, score})
    axios.post('/jeopardy/current-game', { mq, snl, person, _user, score });
}

const updateRecords = (_user, records) => {
    axios.post('jeopardy/records',{ _user, records});     
    dispatch({type: UPDATE_RECORDS,records})
}

const setRecordsInit = async (id) => {
   const pastRecords = await axios.get(`jeopardy/records/${id}`)
   console.log(pastRecords);
   let records = pastRecords.data ? pastRecords.data : []
   dispatch({type: UPDATE_RECORDS,records})
}
    
    let context = {
       isAuthenticated: globalState.isAuthenticated,
        user: globalState.user,
        questions: globalState.questions,
        score: globalState.score,
        records: globalState.records,
        newGame: globalState.newGame,
        curGame: globalState.curGame,
        loading: globalState.loading,
        error: globalState.error,
        fetchUser,
        auth,
        logoutUser,
        setError,
        fetchGameQuestions,
        setNewGame,
        fetchCurrentGame,
        updateJeopardy,
        updateRecords,
        setRecordsInit,
    }
 
    return(
    <GlobalStateContext.Provider value={context}>
        {props.children}
    </GlobalStateContext.Provider>
 )   
}
export default GlobalState
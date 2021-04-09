import { createContext } from 'react'

export default createContext({
    isAuthenticated : false,
	user : {},
	loading: false,
	questions : {
                    mq: null,
                    snl: null,
                    person: null,
    },
    score : null,
    records : null,
    newGame: null,
    curGame: {
                        mq: null,
                        snl: null,
                        person: null,
                    },
	fetchUser: ()=>{},
    auth: ()=>{},
    logoutUser: ()=>{},
    setError: ()=>{},
    fetchGameQuestions: ()=>{},
    setNewGame: ()=>{},
    fetchCurrentGame: ()=>{},
    updateJeopardy: ()=>{},
    updateRecords: ()=>{},
    setRecordsInit: ()=>{},
})
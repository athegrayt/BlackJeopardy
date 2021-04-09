
export const setCurrentUser= (isAuthenticated, user, state)=>{	
	console.log({isAuthenticated, user})
    const userInfo = user._id ? user._id : user
    return {
			...state,
			isAuthenticated,
            user: userInfo, 
            loading: false
        }
		};

export const userLoading = (state ) => {
    return{
        ...state,
        loading: true
    }
    
}
export const getError = (error, state ) => {
    return{
        ...state,
        error,
        loading: false
    }
    
}
		
/******************* */


export const setGameQuestions = (mq, snl, person, state) => {
    const gameQuestions = {mq, snl, person}
    return {
        ...state, 
        questions:gameQuestions
    }
}        

export const setNewGame = (state) => {
    return {
            ...state,
            score: 0,
            newGame: true,
            curGame: {
                mq: {200: true, 400: true, 600: true},
                snl: {200: true, 400: true, 600: true},
                person: {200: true, 400: true, 600: true}
            }
            }
}        

export const setCurrentGame = (score, newGame, mq, snl, person, state) => {
    return{
            ...state,
            score,
            newGame,
            curGame: {
                mq,
                snl,
                person,
            },
    }
}

export const updateRecords = (records, state) => {
    return{
            ...state,
            records
    }
}
        


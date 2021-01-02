
import {GET_ERRORS} from '../actions/actionTypes.js'

const initialState=null

const errorReducer =(state=initialState, action) => {
    switch(action.type){
        case GET_ERRORS:
            console.log('GET_ERROR');
            console.log(action.payload);
            return action.payload
        default:
            return state
    }
}

export default errorReducer;
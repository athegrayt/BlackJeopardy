import {UPDATE_CUR_TAB} from '../actions/actionTypes'

const initialState={
	jeopardy: false,
	icons:{
		home: false, 
		records: false, 
		settings: false, 
	}
}

const tabBarReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_CUR_TAB:
		const updateTabState = {...state.icons}
			for(let icon in updateTabState){
				updateTabState[icon]= false
				if(icon === action.curTab){
				updateTabState[icon]= true
				}
			} 
			return {jeopardy: action.jeop,icons:updateTabState, question: false}
		default:
			return state;
	}
};

export default tabBarReducer;

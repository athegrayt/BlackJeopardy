import React from 'react'
import TabBar from '../../hoc/Layouts/Tabbar/TabBar'
import {connect} from 'react-redux'
import * as actions from '../../store/actions'
// import * as classes from './Jeopardy.module.css'
    
const Jeopardy = (props) =>{
   props.onCurTab(null, true)
   return(
      <TabBar>
         <h3>Jeopardy</h3>
      </TabBar>
   );
    
};

const mapStateToProps = state => {
   return{
   }
}

const mapDispatchToProps = (dispatch) => {
	return {
		onCurTab: (curTab, jeop) => dispatch(actions.updateCurTab(curTab, jeop)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Jeopardy);
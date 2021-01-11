import React from 'react'
import TabBar from '../../hoc/Layouts/Tabbar/TabBar'
import {connect} from 'react-redux'
import  {updateCurTab} from '../../store/actions/jeopardyActions'
import { logoutUser } from '../../store/actions/authActions';
 

const UserSettings = (props) =>{
   props.onCurTab(props.location.icon);
   return(
<TabBar>
    <h3>UserSettings</h3>
    <button class="waves-effect waves-light btn red" onClick={()=>props.onLogOut()}>Logout</button>
</TabBar>
   );
    
};

const mapDispatchToProps = dispatch => {
   return {
         onLogOut: ()=>dispatch(logoutUser()),
         onCurTab: (icon)=>dispatch(updateCurTab(icon))
		};
}

export default connect(null, mapDispatchToProps)(UserSettings);
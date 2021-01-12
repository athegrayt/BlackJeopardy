import React from 'react'
import TabBar from '../../hoc/Layouts/Tabbar/TabBar'
import {connect} from 'react-redux'
import  {updateCurTab} from '../../store/actions/jeopardyActions'
import { logoutUser } from '../../store/actions/authActions';
import LogoutButton from '../UI/Buttons/Login/LoginButton';
import * as classes from './UserSettings.module.css'
 

const UserSettings = (props) =>{
   props.onCurTab(props.location.icon);
   return(
<TabBar>
   <h3 style={{margin: '32px'}}>We are sad to see you go... 😢 </h3>
    <div className={classes.settings}>
       <LogoutButton clicked={()=>props.onLogOut()}>Logout</LogoutButton>
       </div>
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
import React from 'react'
import TabBar from '../../hoc/Layouts/Tabbar/TabBar'
import {connect} from 'react-redux'
import * as actions from '../../store/actions'
 

const UserSettings = (props) =>{
   props.updateCurTab(props.location.icon);
   return(
<TabBar>
    <h3>UserSettings</h3>
    <button class="waves-effect waves-light btn red" onClick={()=>props.logoutUser()}>Logout</button>
</TabBar>
   );
    
};
export default connect(null, actions)(UserSettings);
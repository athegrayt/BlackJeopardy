import React from 'react'
import {connect} from 'react-redux'
import TabBar from '../../hoc/Layouts/Tabbar/TabBar';
import * as classes from './UserRecords.module.css'
import * as actions from '../../store/actions'
    
const UserRecords = (props) =>{
   props.updateCurTab(props.location.icon);
    return(
       <TabBar>
           <h3>UserRecords</h3>
       </TabBar>
   );
    
};
export default connect(null, actions)(UserRecords);
import React, {useContext} from 'react'
import TabBar from '../../hoc/Layouts/Tabbar/TabBar'
import LogoutButton from '../../components/UI/Buttons/Login/LoginButton';
import * as classes from './Settings.module.css'
import globalStateContext from '../../context/global-state-context';
 
const UserSettings = (props) =>{
   const context = useContext(globalStateContext)
   const {logoutUser}=context
   return (
<TabBar icon={'settings'}>
   <h3 style={{margin: '32px'}}>We are sad to see you go... 😢 </h3>
    <div className={classes.settings}>
       <LogoutButton clicked={()=>logoutUser()}>Logout</LogoutButton>
       </div>
</TabBar>
   );
    
};


export default UserSettings;
import React from 'react'
import * as classes from './LoginButton.module.css'

    
const LoginButton = (props) =>{
   return (
			<button
				disabled={props.disabled}
				className={classes.btn}
				onClick={props.clicked}>
				{props.children}
			</button>
		);
    
};
export default LoginButton;
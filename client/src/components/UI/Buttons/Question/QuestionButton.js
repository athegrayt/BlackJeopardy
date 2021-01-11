import React from 'react'
import * as classes from './QuestionButton.module.css'

    
const QuestionButton = (props) =>{
   return (
			<button
				disabled={props.disabled}
				className={classes.btn}
				onClick={props.clicked}>
				{props.children}
			</button>
		);
    
};
export default QuestionButton;
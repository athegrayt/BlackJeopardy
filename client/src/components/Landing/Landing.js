import React from 'react';
import LoginButton from '../UI/Buttons/Login/LoginButton';
import image from '../../assets/images/BlackJeopardy.jpg';
import Login from '../../hoc/Layouts/Login/Login'
import * as classes from './Landing.module.css'
const Landing = (props) => {
	console.log(props);
	return (
		<Login>
			<div className={classes.content}>
				<h5>Validate your "Black Card" with Black Jeopardy</h5>
				<img className={classes.imagebg} src={image} alt='background'></img>
				<LoginButton clicked={() => props.history.push('/login')}>
					Let's Play
				</LoginButton>
			</div>
		</Login>
	);
};

export default Landing;

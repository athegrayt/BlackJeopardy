import React from 'react';
import LoginButton from '../../components/UI/Buttons/Login/LoginButton';
import image from '../../assets/images/BlackJeopardy.jpg';
import Login from '../../hoc/Layouts/Login/Login'
import * as classes from './Landing.module.css'
const Landing = (props) => {
	return (
		<Login>
			<div className={classes.img}>
				<h5>Experience the Saturday Night Live inspired Black Jeopardy</h5>
				<img className={classes.imagebg} src={image} alt='background'></img>
			</div>
				<LoginButton clicked={() => props.history.push('/login')}>
					Let's Play
				</LoginButton>
		</Login>
	);
};

export default Landing;

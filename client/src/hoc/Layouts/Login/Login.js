import React, {Component} from 'react'
import logo from '../../../assets/images/blackJeopardyLogo.png';
import * as classes from './Login.module.css';
    
class Login extends Component{
	render(){
		return (
			<div className={classes.gradientbg}>
				<main className={classes.main}>
					<img className={classes.logo} src={logo} alt='logo'></img>
					<div className={classes.content}>{this.props.children}</div>
				</main>
			</div>
		);
	}
};

export default (Login);
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import Input from '../../components/UI/Input/Input';
import googleSignIn from '../../assets/google_signin_buttons/web/1x/btn_google_signin_dark_normal_web.png'
import LoginButton from '../../components/UI/Buttons/Login/LoginButton';
import Login from '../../hoc/Layouts/Login/Login'
import * as classes from './Auth.module.css' 
import {signInFields, signUpFields} from './authFields';
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/authActions'
// import validateEmails from '../../utils/validateEmails';

class UserAuth extends Component {
	state = {
		signIn: true,
	};

	

	componentDidMount(){
		if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
	}
	componentDidUpdate(){
		if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
	}

	signUpHandler = () => {
		const curMode = this.state.signIn;
		this.setState({ signIn: !curMode });
	};

	onSubmit=(values)=>{
		this.state.signIn
			? this.props.loginUser(values, this.props.history)
			: this.props.registerUser(values, this.props.history);
	}

	renderInput(authFields) {
		return authFields.map(({ label, name, type }) => {
			let error = null
			if(this.props.errors){
				error= this.props.errors[name] 
			}
			return (
				<Field
					key={name}
					component={Input}
					type={type}
					label={label}
					name={name}
					error={error}
				/>
			);
		});
	}

	render() {
		let btnText = 'Register';
		let authText = 'Already have an account?';
		let signInToggle = 'Sign In';
		let authFields = signUpFields;
		if (this.state.signIn) {
			btnText = 'Sign In';
			authText = `Don't have an account?`;
			signInToggle = 'Sign Up';
			authFields = signInFields;
		}

		return (
			<Login>
				<form onSubmit={this.props.handleSubmit(this.onSubmit)}>
					{this.renderInput(authFields)}
					<p style={{fontSize: `18px` }}>
						Or continue with
					</p>
					<ul>
						<li>
							<a href='/auth/google'>
								<img src={googleSignIn} alt='Google SignIn' />
							</a>
						</li>
					</ul>
					<LoginButton type='submit'>{btnText}</LoginButton>
				</form>
				<p style={{ maginBottom: '32px', fontSize: `18px` }}>
					{authText}{' '}
					<span
						onClick={this.signUpHandler}
						style={{ color: '#8D2AB5', cursor: 'pointer' }}>
						{signInToggle}
					</span>
				</p>
			</Login>
		);
	}
}

const mapStateToProps = ({auth, err}) => ({
	auth,
	errors: err
})

export default connect(mapStateToProps, actions)(reduxForm({
	form: 'authForm',
	destroyOnUnmount: false,
})(withRouter(UserAuth)));

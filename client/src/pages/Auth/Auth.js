import React, { useEffect, useState, useContext } from 'react';
import {useForm} from 'react-hook-form'
import {withRouter, useHistory} from 'react-router-dom'
import globalStateContext from '../../context/global-state-context';
import * as classes from './Auth.module.css' 
import Login from '../../hoc/Layouts/Login/Login'
import {signInFields, signUpFields} from './authFields';
import Input from '../../components/UI/Input/Input';
import googleSignIn from '../../assets/google_signin_buttons/web/1x/btn_google_signin_dark_normal_web.png'
import LoginButton from '../../components/UI/Buttons/Login/LoginButton';

const Auth = (props)=> {
	const context = useContext(globalStateContext)
	const {isAuthenticated, auth, error, setError} = context
	const [signIn, setSignIn] = useState(true)
	const {register, handleSubmit} = useForm()
	let history = useHistory()
	let authFields = signIn ?signInFields : signUpFields

	useEffect(()=>{
		if (isAuthenticated) {
     history.push("/dashboard")
		}
	}, [isAuthenticated])

	
	const renderInput= authFields.map(({ label, name, type }, i) => {
			return (
				<Input
					key={`${name}${i}`}
					type={type}
					label={label}
					name={name}
					register={register({
						required: true,
						error: ()=>!error
					})}
				/>
			);
		});
		let btnText = signIn ? 'Sign In' : 'Register'
		let authText = signIn ?`Don't have an account?` : 'Already have an account?'
		let signInToggle = signIn ?'Sign Up':'Sign In'
		
	const onsubmit = (values) => {
		console.log('onsubmit')	
		auth(values, signIn, props.history)
		}
		const cssClasses = [classes.authPage, !signIn && classes.register].join(' ');
		return (
			<Login>
				<form
					className={cssClasses}
					onSubmit={handleSubmit((values)=>onsubmit(values))}>
					{renderInput}
					{error && <p style={{color: 'red'}}>{error}</p>}
					<p style={{ fontSize: `18px` }}>Or continue with</p>
					<div>
							<a href='/auth/google'>
								<img src={googleSignIn} alt='Google SignIn' />
							</a>
					</div>
					<LoginButton type='submit'>{btnText}</LoginButton>
				<p style={{ marginBottom: '32px', fontSize: `18px` }}>
					{authText}{' '}
					<span
							onClick={() => {
								setError()
								setSignIn(!signIn)
							}}
						style={{ color: '#8D2AB5', cursor: 'pointer' }}>
						{signInToggle}
					</span>
				</p>
				</form>
			</Login>
		);
	}


export default withRouter(Auth);

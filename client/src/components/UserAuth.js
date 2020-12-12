import React from 'react'
import googleSignIn from '../assets/google_signin_buttons/web/2x/btn_google_signin_dark_normal_web@2x.png'    
const UserAuth = (props) =>{
   return (
			<ul>
				<li>
					<a href='/auth/google'>
						<img src={googleSignIn} alt='Google SignIn' />
					</a>
				</li>
				<li>
					<a href='/auth/facebook'>
						<div
							class='fb-login-button'
							data-size='large'
							data-button-type='continue_with'
							data-layout='default'
							data-auto-logout-link='false'
							data-use-continue-as='false'
							data-width=''></div>
					</a>
				</li>
			</ul>
		);
    
};
export default UserAuth;
import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

    
const Landing = (props) =>{
   const authenticated = props.auth ? '/jeopardy' : '/auth';
    return (
			<div>
				<Link to={authenticated} className='waves-effect waves-light btn-large'>
					User vs CPU
				</Link>
				<Link to={authenticated} className='waves-effect waves-light btn-large'>
					User vs User
				</Link>
				<Link
					to={'/jeopardy'}
					className='waves-effect waves-light red btn-large'>
					Play as Guest
				</Link>
			</div>
		);
    
};

const mapStateToProps = ({auth}) => {
    return {auth}
}

export default connect(mapStateToProps)(Landing);
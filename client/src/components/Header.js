import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import * as actions from '../actions'
import Payments from './Payments';

class Header extends Component{
  
  renderContent(){
    console.log(this.props.auth);
    switch(this.props.auth){
      case null:
        return 
      case false:
        return (
        <li>
          <a href="/auth">Login</a>
        </li>)
        default:
          return [
						<li key='1'>
							<Payments />
						</li>,
						<li key='3' style={{ margin: '0 10px' }}>
							Credits: {this.props.auth.credits}
						</li>,
						<li key='2'>
							<a href='/api/logout'>Logout</a>
						</li>,
					];
					
    }
  }
  
  render(){
        return(
    <nav>
        <div class="nav-wrapper">
        <Link to={'/'} class="brand-logo">Logo</Link>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
        {this.renderContent()}
      </ul>
    </div>
  </nav>
        )
    }
}

const mapStateToProps = ({auth}) =>{
  return {auth}
}

export default connect(mapStateToProps, actions)(Header);
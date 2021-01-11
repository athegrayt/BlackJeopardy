import React, { Component } from 'react';
import logo from '../../../assets/images/blackJeopardyLogo.png';
import {FaHome, FaClipboard, FaCog} from 'react-icons/fa'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import * as classes from './TabBar.module.css';

class TabBar extends Component {
	
	render() {
		let logoBJ = this.props.question ? null : (
			<Link
				to={{
					pathname: '/dashboard',
					icon: 'home',
				}}>
				<img className={classes.logo} src={logo} alt='logo'></img>
			</Link>
		);
		let gradient = this.props.jeop ? classes.gradientJeop : classes.gradientbg 
		let homeIconClass = this.props.homeIcon ? classes.selected : classes.unselected
		let recordIconClass = this.props.recordIcon ? classes.selected : classes.unselected
		let settingsIconClass = this.props.settingsIcon ? classes.selected : classes.unselected
		return (
			<div className={gradient}>
				<main className={classes.content}>
					{logoBJ}
					{this.props.children}
				</main>
				<div className={classes.tabBar}>
					<div className={classes.icons}>
						<Link
							to={{
								pathname: '/dashboard',
								icon: 'home',
							}}>
							<FaHome className={homeIconClass} />
						</Link>
						<Link
							to={{
								pathname: '/user-records',
								icon: 'records',
							}}>
							<FaClipboard className={recordIconClass} />
						</Link>
						<Link
							to={{
								pathname: '/user-settings',
								icon: 'settings',
							}}>
							<FaCog className={settingsIconClass} />
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return{
		homeIcon: state.tabBar.icons.home, 
		recordIcon: state.tabBar.icons.records, 
		settingsIcon: state.tabBar.icons.settings, 
		jeop: state.tabBar.jeopardy,
	}
}
export default connect(mapStateToProps)(TabBar);

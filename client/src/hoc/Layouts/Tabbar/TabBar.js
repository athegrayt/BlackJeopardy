import React, { useState } from 'react';
import logo from '../../../assets/images/blackJeopardyLogo.png';
import {FaHome, FaClipboard, FaCog} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import * as classes from './TabBar.module.css';

const TabBar =(props)=> {
	const {icon, question} = props	
	let logoBJ = !question && (
			<Link
				to={{
					pathname: '/dashboard',
					icon: 'home',
				}}>
				<img className={classes.logo} src={logo} alt='logo'></img>
			</Link>
		); 
 
		return (
			<div className={props.jeop ? classes.gradientJeop : classes.gradientbg}>
				<main className={classes.content}>
					{logoBJ}
					{props.children}
				</main>
				<div className={classes.tabBar}>
					<div className={classes.icons}>
						<Link
							to={{
								pathname: '/dashboard',
								icon: 'home',
							}}>
							<FaHome className={icon === 'home' ? classes.selected : classes.unselected} />
						</Link>
						<Link
							to={{
								pathname: '/user-records',
								icon: 'records',
							}}>
							<FaClipboard className={icon === 'record' ? classes.selected : classes.unselected} />
						</Link>
						<Link
							to={{
								pathname: '/user-settings',
								icon: 'settings',
							}}>
							<FaCog className={icon === 'settings' ? classes.selected : classes.unselected} />
						</Link>
					</div>
				</div>
			</div>
		);
	}


export default TabBar;

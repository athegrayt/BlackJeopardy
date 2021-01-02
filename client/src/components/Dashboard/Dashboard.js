import React from 'react';
import TabBar from '../../hoc/Layouts/Tabbar/TabBar';
import * as actions from '../../store/actions';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as classes from './Dashboard.module.css';

const Dashboard = (props) => {
	props.onCurTab(props.location.icon);
	return (
		<TabBar>
			<div className={classes.dashboard}>
				<h3>Select Game</h3>
				<Link to='/jeopardy' className={classes.btn}>
					<p>New Game</p>
				</Link>
				<Link to='/jeopardy' className={classes.btn}>
					<p>Current Game</p>
				</Link>
			</div>
		</TabBar>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		onCurTab: (curTab, jeop) => dispatch(actions.updateCurTab(curTab, jeop)),
	};
};

export default connect(null, mapDispatchToProps)(Dashboard);

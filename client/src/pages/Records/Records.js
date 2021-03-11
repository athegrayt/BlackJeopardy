import React from 'react';
import { connect } from 'react-redux';
import TabBar from '../../hoc/Layouts/Tabbar/TabBar';
import * as classes from './Records.module.css';
import * as actions from '../../store/actions/jeopardyActions';

const Records = (props) => {
	props.updateCurTab(props.location.icon);
	let records = props.records.length > 0 ? (
		<div className={classes.records}>
			{props.records
				.sort((a, b) => b.score - a.score)
				.map((record, i) => (
					<div key={`${i}:${record.date}`} className={classes.score}>
						<p>{new Date(record.date).toLocaleDateString()}</p>
						<p>{record.score}</p>
					</div>
				))}
		</div>
	) : (
		<p style={{color: '#060CE9'}}>Play a full game to add your first score!</p>
	);

	return (
		<TabBar>
			<div className={classes.userRecords}>
				<h3>High Scores</h3>
				{records}
			</div>
		</TabBar>
	);
};

const mapStateToProps = (state) => {
	return {
		records: state.jeop.records,
	};
};

export default connect(mapStateToProps, actions)(Records);

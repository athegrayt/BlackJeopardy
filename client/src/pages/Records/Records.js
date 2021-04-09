import React, {useContext} from 'react';
import TabBar from '../../hoc/Layouts/Tabbar/TabBar';
import * as classes from './Records.module.css';
import globalStateContext from '../../context/global-state-context';

const Records = (props) => {
	const context = useContext(globalStateContext)
	const {records} = context
	
	return (
		<TabBar icon={'record'}>
			<div className={classes.userRecords}>
				<h3>High Scores</h3>
				{records.length > 0 ? (
		<div className={classes.records}>
			{records
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
	)}
			</div>
		</TabBar>
	);
};


export default Records;

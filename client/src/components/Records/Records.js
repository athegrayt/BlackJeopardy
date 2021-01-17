import React from 'react'
import {connect} from 'react-redux'
import TabBar from '../../hoc/Layouts/Tabbar/TabBar';
import * as classes from './Records.module.css'
import * as actions from '../../store/actions/jeopardyActions'
    
const Records = (props) =>{
   props.updateCurTab(props.location.icon);
   console.log(props.records)
   let records = props.records ? props.records.sort((a,b)=>b.score-a.score).map((record, i) => (
			<div key={`${i}:${record.date}`} className={classes.score}>
				<p>{new Date(record.date).toLocaleDateString()}</p>
				<p>{record.score}</p>
			</div>
		)) : <p>Play a full game to get your first score!</p>
    return (
			<TabBar>
				<div className={classes.userRecords}>
					<h3>High Scores</h3>
					<div className={classes.records}>
					{records}
					</div>
				</div>
			</TabBar>
		);
    
};

const mapStateToProps = state => {
	return{
		records: state.jeop.records
	}
}

export default connect(mapStateToProps, actions)(Records);
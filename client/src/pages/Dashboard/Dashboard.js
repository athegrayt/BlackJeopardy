import React, {useEffect, useContext} from 'react';
import TabBar from '../../hoc/Layouts/Tabbar/TabBar';
import globalStateContext from '../../context/global-state-context'
import { Link } from 'react-router-dom';
import * as classes from './Dashboard.module.css';

const Dashboard =()=> {
	const context = useContext(globalStateContext)
	const {newGame, user, fetchCurrentGame, fetchGameQuestions, setRecordsInit, setNewGame} = context
	
	useEffect(() => {
		fetchGameQuestions()
		fetchCurrentGame(user.id);
		setRecordsInit(user.id);
	 }, [])

		return (
			<TabBar icon={'home'}>
				<div className={classes.dashboard}>
					<h3>Select Game</h3>
					<Link
						to='/jeopardy'
						className={classes.btn}
						onClick={() => setNewGame(user.id)}>
						<p>New</p>
					</Link>
					<Link
						to={newGame ? '#' : '/jeopardy'}
						className={newGame ? classes.btnDisabled : classes.btn}
						onClick={() =>
							fetchCurrentGame(user.id)
						}>
						<p>Current</p>
					</Link>
				</div>
			</TabBar>
		);
	
}

export default Dashboard;

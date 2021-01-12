import React, {Component} from 'react';
import TabBar from '../../hoc/Layouts/Tabbar/TabBar';
import * as actions from '../../store/actions/jeopardyActions';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as classes from './Dashboard.module.css';

class Dashboard extends Component {
	componentDidMount(){
		this.props.updateCurTab(this.props.location.icon || "home");
		this.props.fetchGameQuestions()
		this.props.fetchCurrentGame(this.props.auth.user.id);
		this.props.setRecordsInit(this.props.auth.user.id);
	}
	
	render(){
		let curGameBTNClass = this.props.jeop.newGame ? classes.btnDisabled : classes.btn
		return (
			<TabBar>
				<div className={classes.dashboard}>
					<h3>Select Game</h3>
					<Link
						to='/jeopardy'
						className={classes.btn}
						onClick={() => this.props.setNewGame(this.props.auth.user.id)}>
						<p>New Game</p>
					</Link>
					<Link
						to={this.props.jeop.newGame ? '#' : '/jeopardy'}
						className={curGameBTNClass}
						onClick={() =>
							this.props.fetchCurrentGame(this.props.auth.user.id)
						}>
						<p>Current Game</p>
					</Link>
				</div>
			</TabBar>
		);
	}
}

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		onCurTab: (curTab, jeop) => dispatch(actions.updateCurTab(curTab, jeop)),
// 	};
// };
const mapStateToProps = ({auth, jeop}) => {
	return{
		auth,
		jeop
	}
}

// const mapDispatchToProps = dispatch => {
// 	return{
// 		onCurTab: (icon) => dispatch()
// 	}
// }

export default connect(mapStateToProps, actions)(Dashboard);

import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './store/actions';
import Dashboard from './components/Dashboard/Dashboard'
import UserAuth from './components/UserAuth/UserAuth'
import Landing from './components/Landing/Landing'
import Jeopardy from './components/Jeopardy/Jeopardy'
import UserSettings from './components/UserSettings/UserSettings'
import UserRecords from './components/UserRecords/UserRecords'
import PrivateRoute from './hoc/PrivateRoutes/PrivateRoutes'
   

const Question = () => <h2>Question</h2>


 
class App extends Component {
   componentDidMount(){
	this.props.fetchUser();

}

   render(){
		return (
			<div>
					<BrowserRouter>
						<Switch>
							<Route exact path='/' component={Landing}/>
							<Route path='/login' component={UserAuth} />
							<PrivateRoute exact path='/jeopardy' component={Jeopardy} />
							<PrivateRoute path='/jeopardy/question' component={Question} />
							<PrivateRoute path='/user-records' component={UserRecords} />
							<PrivateRoute path='/user-settings' component={UserSettings}/>
							<PrivateRoute exact path='/dashboard' component={Dashboard}/>
						</Switch>
					</BrowserRouter>
				</div>
				);
   }
 
};
const mapStateToProps = (state) => ({
	auth: state.auth,
});
export default connect(mapStateToProps, actions)(App);
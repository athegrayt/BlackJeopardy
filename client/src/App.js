import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/authActions';
import Dashboard from './pages/Dashboard/Dashboard'
import Auth from './pages/Auth/Auth'
import Landing from './pages/Landing/Landing'
import Jeopardy from './pages/Jeopardy/Jeopardy'
import Question from './components/Question/Question'
import Settings from './pages/Settings/Settings'
import Records from './pages/Records/Records'
import PrivateRoute from './hoc/PrivateRoutes/PrivateRoutes'
   
 
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
							<Route path='/login' component={Auth} />
							<PrivateRoute exact path='/jeopardy' component={Jeopardy} />
							<PrivateRoute path='/jeopardy/question' component={Question} />
							<PrivateRoute path='/user-records' component={Records} />
							<PrivateRoute path='/user-settings' component={Settings}/>
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
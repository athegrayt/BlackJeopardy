import React, { useEffect, useContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard'
import Auth from './pages/Auth/Auth'
import Landing from './pages/Landing/Landing'
import Jeopardy from './pages/Jeopardy/Jeopardy'
import Question from './components/Question/Question'
import Settings from './pages/Settings/Settings'
import Records from './pages/Records/Records'
import PrivateRoute from './hoc/PrivateRoutes/PrivateRoutes'
import globalStateContext from './context/global-state-context';
   
 
const App =(props)=>{
	const context = useContext(globalStateContext)
	const {fetchUser, isAuthenticated} = context
	useEffect(() => {
	   fetchUser()
   }, [])
	
		return (
			<div>
					<BrowserRouter>
						<Switch>
							<Route exact path='/' component={Landing}/>
							<Route path='/login' component={Auth} />
							<PrivateRoute isAuthenticated={isAuthenticated} exact path='/jeopardy' component={Jeopardy} />
							<PrivateRoute isAuthenticated={isAuthenticated} path='/jeopardy/question' component={Question} />
							<PrivateRoute isAuthenticated={isAuthenticated} path='/user-records' component={Records} />
							<PrivateRoute isAuthenticated={isAuthenticated} path='/user-settings' component={Settings}/>
							<PrivateRoute isAuthenticated={isAuthenticated} exact path='/dashboard' component={Dashboard}/>
						</Switch>
					</BrowserRouter>
				</div>
				);
   
};

export default App;
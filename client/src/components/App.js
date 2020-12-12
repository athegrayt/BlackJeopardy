import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './Header';
import UserAuth from './UserAuth'
import Landing from './Landing'
   
const Jeopardy = () => <h2>Jeopardy</h2>
const Question = () => <h2>Question</h2>
const Record = () => <h2>Record</h2>
 
class App extends Component {
   componentDidMount(){
       this.props.fetchUser();
   }
    render(){
       return(
          <div className="container">
              <BrowserRouter>
              <div>
              <Header />
                  <Route exact path='/' component={Landing}/>
                  <Route exact path='/jeopardy' component={Jeopardy}/>
                  <Route path='/auth' component={UserAuth}/>
                  <Route path='/jeopardy/question' component={Question}/>
                  <Route path='/jeopardy/user-record' component={Record}/>
              </div>
              </BrowserRouter>
          </div>
      );
   }
 
};
export default connect(null, actions)(App);
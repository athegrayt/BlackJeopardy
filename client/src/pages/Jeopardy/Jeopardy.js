import React, {Component} from 'react'
import classname from 'classnames'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/jeopardyActions'
import * as classes from './Jeopardy.module.css'
import TabBar from '../../hoc/Layouts/Tabbar/TabBar'
import Modal from '../../components/UI/Modal/Modal'
    
class Jeopardy extends Component{
   state={
      redirect: false,
      gameOver: false
   }
   componentDidMount(){
      this.props.updateCurTab(null, true);
      let records = [...this.props.jeop.records].concat({
				score: this.props.jeop.score,
				date: Date.now(),
			});
   
      let gameOver = true
      for(let category in this.props.jeop.curGame){
         for (let value in this.props.jeop.curGame[category]) {
                  if(this.props.jeop.curGame[category][value] ===true){
                     gameOver = false
                  }
                  
					}
      }
      if(gameOver){
        this.setState({gameOver: true})
        this.props.updateRecords(this.props.auth.user.id, records)
        this.props.setNewGame(this.props.auth.user.id)
         setTimeout(
						() => this.setState({  redirect: true }),
						1500
					);
      }
   }
   
   render(){
      let gameOver = this.state.gameOver ? <Modal show={this.state.gameOver}>
						<p className={classes.response}>Thanks for playing!</p>
					</Modal> : null
      let redirect = this.state.redirect ? <Redirect to='/dashboard'></Redirect> : null
      const gameBoard = []
      const categories =[]
      for(let category in this.props.jeop.curGame){
         let catName = ''
         if(category === 'mq'){
            catName = 'Movie Quotes'
         }else if(category === 'snl'){
            catName = 'SNL'
         }else{
            catName = 'Iconic People'
         }
         categories.push(
            <div key={catName} className={classname(classes.item, classes.category)}>{catName}</div>
         )
         const values = Object.entries(this.props.jeop.curGame[`${category}`])
         const info = Object.values(this.props.jeop.questions[`${category}`])
         values.forEach((value,i) => {
            if(value[0]!== "_id"){
            let gameBoardClass = classes.gameBoard 
            let link = {
                     pathname: '/jeopardy/question',
                     info: info[i],
                     gameTile: `${category}.${value[0]}`,
                     catName,
                  }  
            if (!value[1]){
               gameBoardClass = classes.disabled;
               link = '#'
            }
                     gameBoard.push(
                        <Link
                           key={`${category}.${value[0]}`}
                           className={classname(classes.item, gameBoardClass)}
                           to={link}>
                           {value[0]}
                        </Link>
                     );}
         })  
     }
      return (
            <TabBar>
               <div className={classes.container}>
                  <div className={classname(classes.item, classes.score)}>Current Score:{' '}{this.props.jeop.score}xp</div>
                  {categories}
                  <div className={classes.gameValues}>
                  {gameBoard}
                  </div>
                  </div>
                  {redirect}
                  {gameOver}
            </TabBar>
         );
   }
    
};

const mapStateToProps = ({jeop, auth}) => {
   return{
      jeop, auth
   }
}

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		onCurTab: (curTab, jeop) => dispatch(actions.updateCurTab(curTab, jeop)),
// 	};
// };
export default connect(mapStateToProps, actions)(Jeopardy);
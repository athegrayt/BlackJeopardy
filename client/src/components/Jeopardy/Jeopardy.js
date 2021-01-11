import React from 'react'
import TabBar from '../../hoc/Layouts/Tabbar/TabBar'
import classname from 'classnames'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/jeopardyActions'
import * as classes from './Jeopardy.module.css'
    
const Jeopardy = (props) =>{
   props.updateCurTab(null, true);
   const gameBoard = []
   const categories =[]
   for(let category in props.jeop.curGame){
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
      const values = Object.entries(props.jeop.curGame[`${category}`])
      const info = Object.values(props.jeop.questions[`${category}`])
      values.forEach((value,i) => {
         let gameBoardClass = classes.gameBoard 
         let link = {
						pathname: '/jeopardy/question',
						info: info[i],
						gameTile: `${category}.${value[0]}`,
						catName,
               } 
         let tileValue = value[0] 
         if (!value[1]){
            gameBoardClass = null
            link = '#'
            tileValue = null
         }
						gameBoard.push(
							<Link
								key={`${category}.${value[0]}`}
								className={classname(classes.item, gameBoardClass)}
								to={link}>
								{tileValue}
							</Link>
						);
      })  
  }
   return (
			<TabBar>
				<div className={classes.container}>
               <div className={classname(classes.item, classes.score)}>Current Score:{' '}{props.jeop.score}xp</div>
               {categories}
               <div className={classes.gameValues}>
               {gameBoard}
               </div>
               </div>
			</TabBar>
		);
    
};

const mapStateToProps = ({jeop}) => {
   return{
      jeop
   }
}

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		onCurTab: (curTab, jeop) => dispatch(actions.updateCurTab(curTab, jeop)),
// 	};
// };
export default connect(mapStateToProps, actions)(Jeopardy);
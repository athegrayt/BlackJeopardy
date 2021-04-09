import React, {useContext, useEffect, useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import * as classes from './Jeopardy.module.css'
import TabBar from '../../hoc/Layouts/Tabbar/TabBar'
import Modal from '../../components/UI/Modal/Modal'
import globalStateContext from '../../context/global-state-context'
    
const Jeopardy =(props)=>{
   const [redirect, setRedirect] = useState(false)
   const [gameOver, setGameOver] = useState(false)
   const context = useContext(globalStateContext)
   const { records, score, curGame, user, questions, updateRecords, setNewGame } = context
   useEffect(() => {
      let updatedRecords = [...records].concat({
            score,
            date: Date.now(),
         });
      let endOfGame = true
      for(let category in curGame){
         for (let value in curGame[category]) {
                  if(curGame[category][value] ===true){
                     endOfGame=false
                  }
  
               }
      }
      if(endOfGame){
        setGameOver(true)
        updateRecords(user.id, updatedRecords)
        setNewGame(user.id)
      setTimeout(
                  () => setRedirect(true),
                  1500
               );
      }
    }, [])
     
      const gameBoard = []
      const categories =[]
      for(let category in curGame){
         let catName = ''
         if(category === 'mq'){
            catName = 'Movie Quotes'
         }else if(category === 'snl'){
            catName = 'SNL'
         }else{
            catName = 'Iconic People'
         }
         categories.push(
            <div key={catName} className={[classes.item, classes.category].join(' ')}>{catName}</div>
         )
         const values = Object.entries(curGame[`${category}`])
         const info = Object.values(questions[`${category}`])
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
                           className={[classes.item, gameBoardClass].join(' ')}
                           to={link}>
                           {value[0]}
                        </Link>
                     );}
         })  
     }
      return (
            <TabBar jeop={true}>
               <div className={classes.container}>
                  <div className={[classes.item, classes.score].join(' ')}>Current Score:{' '}{score}xp</div>
                  {categories}
                  <div className={classes.gameValues}>
                  {gameBoard}
                  </div>
                  </div>
                  {redirect && <Redirect to='/dashboard'></Redirect>}
                  {gameOver && <Modal show={gameOver}>
						<p className={classes.response}>Thanks for playing!</p>
					</Modal>}
            </TabBar>
         );
    
};

export default Jeopardy;
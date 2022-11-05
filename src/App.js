import './App.css';
import Dice from './Dice';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'



function App() {

  const generateNewDie = () => {
    return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
    }
  }

  const allNewDice = ()=>{
    const newDice = []
    for (let i=0; i<10; i++ ){
      newDice.push(generateNewDie())
    }
    return newDice
  }

  const [allDices, setAllDices] = useState(allNewDice())

  const [tenzies, steTenzies] = useState(false)

  useEffect(() => {
    const allHeld = allDices.every(dice=> dice.isHeld)
    const allSameValue = allDices.every(dice => dice.value === allDices[0].value)
    if(allHeld && allSameValue){
      steTenzies(true)
      console.log("you won")
    }
  }, [allDices])
  
  
  const rollDice = ()=>{
    if(!tenzies){
      setAllDices(prevAllDice=>prevAllDice.map(dice=>{
        return dice.isHeld ? 
            dice : 
            generateNewDie()
      }))
    } else {
      steTenzies(false)
      setAllDices(allNewDice())
    }
    
  }

  const hold = (id) => {
    setAllDices(prevAllDice=>prevAllDice.map(dice => {
        return dice.id === id ? {...dice, isHeld: !dice.isHeld} : dice
      })
    )
  }
  return (
    <div className='app'>
      <h1>Tenzies</h1>
      <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='app-dice'>
        {allDices.map(dice=>(
        <Dice 
          key={dice.id} 
          value={dice.value} 
          selected={dice.isHeld}
          onClick={()=>hold(dice.id)}
        />
        ))}
      </div>
      {
        tenzies ? 
        <>
          <Confetti className='celeb'/>
          <button className='roll' onClick={rollDice}>New Game</button>
        </>
        :
        <button className='roll' onClick={rollDice}>Roll</button>
      }
    </div>
  );
}

export default App;

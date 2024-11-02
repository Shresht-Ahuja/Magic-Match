import './App.css';
import SingleCard from './single_card.js'
import { useState } from 'react';
import { useEffect } from 'react';

const cardImgs = [
  {"src": "./images/monsters-01.png", matched: false},
  {"src": "./images/monsters-02.png", matched: false},
  {"src": "./images/monsters-03.png", matched: false},
  {"src": "./images/monsters-07.png", matched: false},
  {"src": "./images/monsters-09.png", matched: false},
  {"src": "./images/monsters-11.png", matched: false}
]

function App() {
  const[cards, setCards] = useState([])
  const[turns, setTurns] = useState(0)
  const[choice1, setChoice1] = useState(null)
  const[choice2, setChoice2] = useState(null)
  const[disabled, setDisabled] = useState(false)

  const shuffleCards = () => {
    const shuffled = [...cardImgs, ...cardImgs]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random()}))

      setChoice1(null)
      setChoice2(null)
      setCards(shuffled)
      setTurns(0)
  }
  //console.log(cards, turns)

  const handleChoice = (card) => {
      if(choice1)
        {setChoice2(card)}
        else{
           setChoice1(card)
        }
  }

  useEffect(() => {
    
    if(choice1 && choice2){
      setDisabled(true)
      if(choice1.src === choice2.src){
        //console.log("The cards match")
        setCards(prevCards => {
          return(
            prevCards.map(card => {
              if(card.src === choice1.src){
                return{...card, matched: true}
              }
              else{
                return card
              }
            })
          )
        })
        resetTurn()
      }
      else{
        //console.log("cards do not match")
        setTimeout(() => resetTurn(),
        1000
      )
      }
    }

  }, 
  [choice1, choice2]) // dependencies are choice1 and choice2 so that everytime they change the func inside useEffect gets activated
  console.log(cards)

  const resetTurn = () => {
    setChoice1(null)
    setChoice2(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className="App">
      <h1>MAGIC MATCH</h1> 
      <button onClick={shuffleCards}><span>New Game</span></button>
      <p>Turns: {turns}</p>

      <div className='cardGrid'>
        {cards.map(card => (
          <SingleCard 
          key={card.id} 
          card={card}
          handleChoice={handleChoice}
          flipped={card === choice1 || card === choice2 || card.matched}
          disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

import { useEffect, useState } from "react"
import { GameHeader } from "./components/GameHeader"
import { Card } from "./components/Card"
import { WinMessage } from "./components/WinMessage"

const CardValues = [
"🦊",
"🦌",
"🦬",
"🦭",
"🦦",
"🦥",
"🦜",
"🦩",
"🦊",
"🦌",
"🦬",
"🦭",
"🦦",
"🦥",
"🦜",
"🦩"
]

function App() {
const [cards , setCards] = useState([]) 
const [flippedCards , setFlippedCards] = useState([])
const [matchedCards , setMatchedCards] = useState([])
const [score , setScore] = useState(0)
const [moves , setMoves] = useState(0)
const [islocked , setIsLocked] = useState(false)

const shuffleArray = (array) => {
  const shuffled = [...array];
  for(let i =shuffled.length - 1; i > 0 ; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled
}

function initializeGame () {

  const shuffled = shuffleArray(CardValues)

  const finalCards = shuffled.map((value,index) => ({
id:index,
value,
isFlipped:false,
isMatched:false
  }))
  
  setCards(finalCards)
  setFlippedCards([])
  setMatchedCards([])
  setScore(0)
  setMoves(0)
  setIsLocked(false)
}

useEffect(() => {
  initializeGame()
},[])

function handleClick (card) {
  if(card.isFlipped || card.isMatched || islocked){
    return
  }

  const newCards = cards.map((c) => {
    if(c.id === card.id){
      return{...c,isFlipped:true}
    }else{
      return c
    }
  })
  
  setCards(newCards)
setFlippedCards((prev) => [...prev,card.id])

if(flippedCards.length === 1) {
  setIsLocked(true)
  const firstCard = cards.find(c => c.id === flippedCards[0])

  if(firstCard.value === card.value){
    setTimeout(() => {
      setScore((prev) => prev+1)

      setMatchedCards((prev) => [...prev,firstCard.id,card.id])
      
      setCards((prev) => 
      prev.map((c) => {
        if(c.id === card.id || c.id === firstCard.id){
          return{...c,isMatched:true}
        }else{
          return c
        }
      })
      )
      setIsLocked(false)
setFlippedCards([])
    },500)
  }else{
    setTimeout(() => {
      const flippedBackCards = newCards.map((c) => {
        if(flippedCards.includes(c.id) || c.id===card.id){
          return{...c,isFlipped:false}
        }else{
          return c
        }
      })
      setCards(flippedBackCards)
      setIsLocked(false)
      setFlippedCards([])
    },1000)
  }
}

setMoves((prev) => prev +1)
}

const WinVerify = matchedCards.length === CardValues.length

  return (
   <div className="app">

    <GameHeader score={score} moves={moves} onReset={initializeGame}/>
    
   {WinVerify && <WinMessage moves={moves} />}
    
    <div className="cards-grid">{
      cards.map((card) => (
        <Card card={card} onClick={handleClick}/>
      ))
      }
  </div>

   </div>
  )
}

export default App

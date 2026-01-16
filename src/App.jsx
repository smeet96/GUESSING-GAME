import { useEffect, useState } from "react"
import { GameHeader } from "./components/GameHeader"
import { Card } from "./components/Card"

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


function initializeGame () {

  const finalCards = CardValues.map((value,index) => ({
id:index,
value,
isFlipped:false,
isMatched:false
  }))
  
  setCards(finalCards)
}

useEffect(() => {
  initializeGame()
},[])

function handleClick (card) {
  if(card.isFlipped || card.isMatched){
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
  const firstCard = cards.find(c => c.id === flippedCards[0])

  if(firstCard.value === card.value){
    setTimeout(() => {
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
setFlippedCards([])
    },500)
  }
}
}

  return (
   <div className="app">

    <GameHeader score={3} moves={10}/>
    
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

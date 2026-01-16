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

import { GameHeader } from "./components/GameHeader"
import { Card } from "./components/Card"
import { WinMessage } from "./components/WinMessage"
import { useGameLogic } from "./hooks/useGameLogic"

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
const {cards,score,moves,handleClick,WinVerify,initializeGame} = useGameLogic(CardValues)

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

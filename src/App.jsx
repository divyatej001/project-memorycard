import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import backImage from './assets/card_back.jpg';
import '../src/components/Winbox';
import Winbox from '../src/components/Winbox';

const imageCards = [
  { "name": "combusken", "url": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/256.png" },
  { "name": "marshtomp", "url": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/259.png" },
  { "name": "grovyle", "url": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/253.png" },
  /*{ "name": "blaziken", "url": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/257.png" },
  { "name": "swampert", "url": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/260.png" },
  { "name": "sceptile", "url": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/254.png" },
  { "name": "latios", "url": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/381.png" },
  { "name": "latias", "url": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/380.png" },
  { "name": "groudon", "url": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/383.png" },
  { "name": "kyogre", "url": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/382.png" },
  { "name": "rayquaza", "url": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/384.png" }*/
];

const TOTAL_CARDS = imageCards.length;


function App() {
  const [cards, setCards] = useState([]);
  const [count, setCount] = useState(0);
  const [clickedCards, setClickedCards] = useState(new Set());
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [flip, setFlip] = useState(false);

  /*useEffect(() => {
    shuffleCards(); // Shuffle cards on initial render
  }, []);*/
  
  const gameReset = ()=>{
    setCount(0);
    setClickedCards(new Set());
    setGameOver(false);
    setFlip(false);
  }
  
  const shuffleCards = ()=>{
    const imageCardsshuffled = [...imageCards];
    for(let i=imageCardsshuffled.length-1;i>0;i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [imageCardsshuffled[i], imageCardsshuffled[randomIndex]] = [imageCardsshuffled[randomIndex], imageCardsshuffled[i]];
    }
    setCards(imageCardsshuffled);
  }

  const cardOnclick = (name)=> {
    if (!gameOver && !clickedCards.has(name)) {
      setCount(count + 1);
      setClickedCards(new Set(clickedCards).add(name));
      setFlip(true);
      setTimeout(() => {
        shuffleCards();
        setFlip(false);
      }, 1000);
      if(count+1===TOTAL_CARDS)
        setGameWon(true);
    } else {
      setGameOver(true);
    }
    
  }  


  return (
    <>
      <div className='App'>
        <h1>Pokemon Memory Card Game</h1>
        <button onClick={()=>{gameReset();shuffleCards();}}>Start New Game</button>
        <h2>Score : {count}</h2>
        <div className='card-box'>
          {cards.map(card=>(
            <div className={`card ${flip ? 'flipped' : ''}`} key={card.name} onClick={() => cardOnclick(card.name)}>
              <div>
                  <img className='front' src={card.url} alt={card.name} />
                  <img className='back' src={backImage} alt='back of the card'/>
              </div>
            </div>
          ))}
        </div>
        {gameWon||gameOver ? <Winbox count={count} gameOver={gameOver} gameReset={gameReset}/> : null}
      </div>
    </>
  )
}

export default App

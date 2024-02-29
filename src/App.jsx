import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import backImage from './assets/card_back.jpg';
import '../src/components/Winbox';
import Winbox from '../src/components/Winbox';
import flipSound from './assets/flip_sound.mp3'
import Loading from '../src/components/Loading';

let imageCards = [];

const TOTAL_CARDS = 10;
let BEST_SCORE = 0;


function App() {
  const [cards, setCards] = useState([]);
  const [count, setCount] = useState(0);
  const [clickedCards, setClickedCards] = useState(new Set());
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [flip, setFlip] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const flipAudio = new Audio(flipSound);
  const [isLoading, setIsLoading] = useState(false);
  const TOTAL_POKEMONS = 721;
  BEST_SCORE = Math.floor(Math.max(BEST_SCORE, count));

  useEffect(() => {
    if (flip) {
      flipAudio.play();
    }
  }, [flip]);

  const generateIds = async()=>{
    const ids = [];
    for(let i=0; i<10; i++) {
      const id = Math.floor(Math.random() * ((TOTAL_POKEMONS-1)+1) + 1);
      ids.push(id);
    }
    return ids;
  }

  const getPokemon = async () => {
    const ids = await generateIds();
    const pokelist = [];
    for (const id of ids) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const pokemonData = await response.json();
      const { name, sprites } = pokemonData;
      const frontDefaultSprite = sprites.front_default;
      pokelist.push({ name, frontDefaultSprite });
      //console.log(pokelist);
    }
    return pokelist;
  }  

  const setPokemon = async ()=>{
    const list = await getPokemon();
    imageCards = [...list];
  }
  
  const gameReset = async()=>{
    setIsLoading(true);
    setCount(0);
    //console.log(list);
    await setPokemon();
    setClickedCards(new Set());
    setGameOver(false);
    setGameWon(false);
    setFlip(false);
    setIsOpen(false);
    shuffleCards();
    setIsLoading(false);
  }
  
  const shuffleCards = async()=>{
    const imageCardsshuffled = [...imageCards];
    for(let i=imageCardsshuffled.length-1;i>0;i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [imageCardsshuffled[i], imageCardsshuffled[randomIndex]] = [imageCardsshuffled[randomIndex], imageCardsshuffled[i]];
    }
    setCards(imageCardsshuffled);
  }

  const cardOnclick = async(name)=> {
    if (!gameOver && !clickedCards.has(name)) {
      setCount(count+1);
      if(count+1===TOTAL_CARDS)
        setGameWon(true);
      setClickedCards(new Set(clickedCards).add(name));
      setFlip(true);
      await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for .5 second
      shuffleCards();
      await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for .5 second
      setFlip(false);

    } else {
        setGameOver(true);
    }
    
  }  


  return (
    <>
      <div className='App'>
        <h1>Pokemon Memory Card Game</h1>
        <button onClick={()=>{gameReset()}}>Start New Game</button>
        <h2>Score: {count}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;High Score: {BEST_SCORE}</h2>
        <div className='card-box'>
          {cards.map(card=>(
            <div className={`card ${flip ? 'flipped' : ''}`} key={card.name} onClick={() => cardOnclick(card.name)}>
              <div className='card-inner'>
                  <img className='front' src={card.frontDefaultSprite} alt={card.name} />
                  <img className='back' src={backImage} alt='back of the card'/>
              </div>
            </div>
          ))}
        </div>
        {gameWon||gameOver ? <Winbox count={count} gameOver={gameOver} gameReset={gameReset} isOpen={true}/> : null}
        {isLoading && <Loading isLoading={isLoading}/> }
      </div>
    </>
  )
}

export default App

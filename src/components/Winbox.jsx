import React, { useState } from "react";
import Modal from './Modal.jsx'
import './Winbox.css';

export default function GameWinModal  ({ count,gameOver,gameReset,isOpen }) {

    const CloseModal = ()=> {
        gameReset();
    }
    return isOpen ? (
        <Modal>
            <div className="win-box">
                <h1>{gameOver ? "Too bad!!!" : "Congrats!!!"}</h1>
                <h2>{gameOver ? "You lost." : "You've won the game."}</h2>
                <iframe src={gameOver ? "https://giphy.com/embed/tlKTIYel9FlTO" : "https://giphy.com/embed/MhHXeM4SpKrpC" } width="480" height={gameOver ? "360" : "269"} allowFullScreen></iframe>
                <h2>Your score is {count}</h2>
                <button onClick={CloseModal}>Start Again</button>
            </div>   
        </Modal>
    ) : ''
}

import React from "react";
import Modal from "./Modal";
import './Loading.css';

export default function Loading({isLoading}) {
    return isLoading ? (
        <Modal>
            <div className="loading">
                <img src='../src/assets/pokeball.png'/>
                <h2>Loading...</h2>
            </div>
        </Modal> 
    ) : null;
}
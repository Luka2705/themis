import './App.css';
import React from 'react';
import svg from './img/illustration-4.png';

function Landing() {
    return (
        <div className="App">
            <div className="text">
                <h1 className='title'>Welcome to Themis</h1>
                <p>Your personal Bill-Management System</p>
                <a className="button" href="/login">Let's start the Journey</a>
            </div>
            <img className="backgroundImage" src={svg} alt="background"></img>

        </div >
    );
}

export default Landing;

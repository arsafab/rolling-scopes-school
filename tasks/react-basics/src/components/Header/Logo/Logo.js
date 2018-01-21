import React from 'react';
import Img from './logo.png';
import './logo.css';

function Logo() {
    return (
        <img
            src={Img}
            alt="To Do List"
            className="logo"
        />
    );
}

export default Logo;

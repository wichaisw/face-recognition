import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import owl from './owl.png';

function Logo() {
  return(
    <div className="ma4 mt0">
      <Tilt className="Tilt logo br2 shadow-2" options={{ max : 30 }} style={{ height: 150, width: 150 }} >
        <div className="Tilt-inner">    
            <img src={owl} alt="owl-logo"/>
        </div>
      </Tilt>
      <div className="absolute">
        Icons made by
        <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a><br />from
        <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
      </div>
    </div>
  )
}

export default Logo;
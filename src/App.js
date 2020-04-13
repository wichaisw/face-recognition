import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Particles from 'react-particles-js';

const particlesOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 350
      }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onclick: {
        enable: true,
        mode: "push"
      }
    }
  }
}

function App() {
  return (
    <div className="App">
      <Particles
        params={particlesOptions} 
        className="particles"
      />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
      {/* 
      <FaceRecognition /> */}


      Icons made by
      <footer>
        <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from
        <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
      </footer>
    </div>
  );
}

export default App;

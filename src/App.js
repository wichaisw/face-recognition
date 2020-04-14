import React, { useState, useEffect } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: '2359209e1dd240c5b8a1ad9a9c7c0dad'
});

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
  // doesn't work because of z-index
  // interactivity: {
  //   detect_on: "canvas",
  //   events: {
  //     onclick: {
  //       enable: true,
  //       mode: "push"
  //     }
  //   }
  // }
}

function App() {
  
  const [input, setInput] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    setImgUrl(imgUrl)
    console.log(`useEffect ${imgUrl}`)
    fetchData()
  }, [imgUrl])

  const onInputChange = (event) => {
    setInput(event.target.value);
    console.log(event.target.value);
  }

  const fetchData = () => {
    app.models.predict(
      "a403429f2ddf4b49b307e318f00e528b",
      imgUrl)
      .then(
        function(response) {
          // do something with response
          console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
        },
        function(err) {
          // there was an error
          console.log(err);
        }
    );
  }

  const onButtonSubmit = () => {
    setImgUrl(input)
    console.log("onButtonSubmit");
  }

  // const onButtonSubmit = () => {
  //   setImgUrl(input)
  //   console.log("click");
  //   app.models.predict(
  //     "a403429f2ddf4b49b307e318f00e528b",
  //     imgUrl)
  //     .then(
  //       function(response) {
  //         // do something with response
  //         console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
  //       },
  //       function(err) {
  //         // there was an error
  //         console.log(err);
  //       }
  //   );
  // }

  return (
    <div className="App">
      <Particles
        params={particlesOptions} 
        className="particles"
      />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit} />
      <FaceRecognition imgUrl={imgUrl} />


      Icons made by
      <footer>
        <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from
        <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
      </footer>
    </div>
  );
}

export default App;

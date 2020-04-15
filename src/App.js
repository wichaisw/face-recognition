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
  
  const [input, setInput] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [box, setBox] = useState({});

  useEffect(() => {
    console.log(`useEffect ${imgUrl}`)
    fetchData()
  }, [imgUrl])

  const calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    console.log(clarifaiFace);
    const image = document.getElementById("inputImage")
    const width = Number(image.width)
    const height = Number(image.height)

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  const displayFaceBox = (boxPosition) => {
    console.log(`boxPosition ${boxPosition}`);
    setBox(boxPosition)
  }

  const onInputChange = (event) => {
    setInput(event.target.value);
    console.log(event.target.value);
  }

  const fetchData = () => {
    app.models.predict(
      //Clarifai.FACE_DETECT_MODEL
      "a403429f2ddf4b49b307e318f00e528b",
      imgUrl)
      .then(response => displayFaceBox(calculateFaceLocation(response)))
      .catch(err => console.log(err)
    );
  }

  const onButtonSubmit = () => {
    setImgUrl(input)
    console.log("onButtonSubmit");
  }

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
      <FaceRecognition imgUrl={imgUrl} box={box} />
    </div>
  );
}

export default App;

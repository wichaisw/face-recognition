import React, { useState, useEffect } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
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
  const [route, setRoute] = useState("signIn");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    entries: '',
    joined: ''
  })

// invoke only once, equals to componentDidMount
// useEffect(() => {
//   console.log('componentDidMount')
//   fetch('http://localhost:8000/')
//     .then(response => response.json())
//     .then(data => console.log(data))
// }, [])

  useEffect(() => {
    console.log(`useEffect ${imgUrl}`)
    
    app.models.predict(
      //Clarifai.FACE_DETECT_MODEL
      "a403429f2ddf4b49b307e318f00e528b",
      imgUrl)
      .then(response => {
        if(response) {
          fetch('http://localhost:8000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              setUser({...user,
              entries: count})
            })
        }
        displayFaceBox(calculateFaceLocation(response))
      })
      .catch(err => console.log('fetch clarifai',err)
    );
  }, [imgUrl])

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    })
  }

  const onRouteChange = (route) => {
    if(route === "signOut") {
      setIsSignedIn(false);
    } else if(route === "home") {
      setIsSignedIn(true);
    }
    setRoute(route);
  }

  const calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
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
    setBox(boxPosition)
  }

  const onInputChange = (event) => {
    setInput(event.target.value);
  }

  // const fetchData = () => {

  // }

  const onButtonSubmit = () => {
    setImgUrl(input)
  }

  return (
    <div className="App">
      <Particles
        params={particlesOptions} 
        className="particles"
      />
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      { route === "home"
        ? <>
        <Logo />
        <Rank name={user.name} entries={user.entries} />
        <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit} />
        <FaceRecognition imgUrl={imgUrl} box={box} />        
        </>
        : (route === "signIn"
          ? <SignIn onRouteChange={onRouteChange} loadUser={loadUser} />
          : <Register onRouteChange={onRouteChange} loadUser={loadUser} />
        )
      }
    </div>
  );
}

export default App;

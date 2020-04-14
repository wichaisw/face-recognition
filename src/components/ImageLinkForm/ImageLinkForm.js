import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = (props) => {
  return(
    <div>
      <p className="f3">
        {"The Minerva's owl can detect faces in pictures."}
      </p>
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input 
            type="text" 
            className="f4 p2 w-70 center" 
            onChange={props.onInputChange} 
          />
          <button 
            className="form__button w-30 grow f4 link ph3 pv2 dib white"
            onClick={props.onButtonSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  )
}

export default ImageLinkForm;
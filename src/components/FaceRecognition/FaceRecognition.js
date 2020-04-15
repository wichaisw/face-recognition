import React from 'react';
import './FaceRecognition.css';

function FaceRecognition(props) {
  const { box, imgUrl } = props;

  return(
    <div className="center ma z-index--2">
      <div className="pa3 absolute mt">
        <img id="inputImage" src={imgUrl} alt="" width="500px" height="auto" />
        <div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div>
      </div>
    </div>
  )
}

export default FaceRecognition;
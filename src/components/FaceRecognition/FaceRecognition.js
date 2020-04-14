import React from 'react'

function FaceRecognition(props) {
  return(
    <div className="center ma">
      <div>
        <img src={props.imgUrl} alt="" width="500px" height="auto" />
      </div>
    </div>
  )
}

export default FaceRecognition;
import React from 'react';

const Navigation = ( {onRouteChange} ) => {
  return (
    <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
      <p 
        onClick={() => onRouteChange("signIn")}
        className='f3 link dim black underline pa3 pointer z-index--2'
      >
        Sign Out
      </p>
    </nav>
  );
}

export default Navigation;
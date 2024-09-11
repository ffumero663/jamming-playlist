import React from 'react';

function Header(){

  const divStyle = {
    margin: 0,
    border: '2px solid white',
    backgroundColor: 'white',

  }

  const style = {
    textAlign: 'center',
    color: '#9b59b6',
    fontSize: '65px'
  }

  const mmLetter = {
    color: '#ff79c6',
  }
  return(
    <div style={divStyle}>

    <h1 style={style}>Ja<span style={mmLetter}>mm</span>ing</h1>
    
    </div>
  );

};

export default Header;
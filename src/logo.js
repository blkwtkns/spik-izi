import React, { Component } from 'react';

export default class Logo extends Component {

  render(){
    var style = {
      fontSize: '2em',
      // textAlign: 'center',
      display: 'block',
      width: '80%',
      // height: '10%',
      borderBottom: 'thin solid #eeeeee'
    }  

    var speakStyle = {
      color: '#FF5733' 
    }

    var infoStyle = {
    
    }

    return(
    <div id='logo' style={style}>
      <h1 style={speakStyle}>Spik-Izi</h1>
      <h2 style = {infoStyle}>Type in a phrase to find its phonetic and etymological info!</h2>
    </div>
    );
  }
}


import React, { Component } from 'react';

export default class JumboPhon extends Component {

  render(){
    var style = {
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'center',
      width: '80%',
      marginBottom: '100%',
      alignItems: 'center',
    }  
    var proStyle = {
      fontSize: '6rem',
      color: 'red',
      width: '100%',
      height: '4rem'
    }
    var partStyle = {
      fontSize: '3rem',
      color: 'green',
      width: '100%',
      height: '2rem'
    }
    var defStyle = {
      fontSize: '4rem',
      width: '100%',
    }
    var etyStyle = {
      fontSize: '2rem',
      width: '100%',
      height: '2rem',
      color: 'orange'
    }
    
    return(
      <div id='JumboPhon' style={style}>
        <div id='pronunciation'>
          <h1 style={proStyle}> {this.props.transcript[0]} </h1>
        </div>
        <div id='speechPart'>        
          <h1 style ={partStyle}> {this.props.transcript[3]} </h1> 
        </div>
        <div id='definition'>        
          <h1 style ={defStyle}> {this.props.transcript[1]} </h1> 
        </div>
        <div id='etymology'>        
          <h1 style ={etyStyle}> {this.props.etymology} </h1> 
        </div>
      </div>
    );
  }
}

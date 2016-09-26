import React, { Component } from 'react';

export default class PhonemeInput extends Component {
  

  render(){
    var style = {
      margin: '0 auto',
      textAlign: 'center',
      width: '60%',
      height: '3rem',
      border: 'thin solid #000000',
      borderRadius: '5px',
      marginBottom: '2%'
    }  

    var formStyle = {
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'center',
      width: '80%',
      height: '5rem',
      borderBottom: 'thin solid #eeeeee',
      marginTop: '5%'
    }

    var subStyle = {
      margin: 'auto',
      textAlign: 'center',
      width: '10%',
      height: '3rem',
      borderRadius: '3px',
      borderStyle: 'none',
      marginBottom: '1%',
      backgroundColor: '#2CB9E8',

    }

    return(
      <form className="PhonemeInput" style={formStyle}>
        <input type="text" style={style} placeholder='speak' value={this.props.value || ''} onChange={this.props.onChange}/>
        <input type="submit" style={subStyle} value="Submit" onClick={this.props.onClick}/>
      </form>
    );
  }
}



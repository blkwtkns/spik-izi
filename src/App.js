import React, {
  Component
}
from 'react';
import xml2js from 'xml2js';
import axios from 'axios';
import Logo from './logo';
import PhonemeInput from './PhonemeInput';
import JumboPhon from './jumboPhon';
import $ from 'lodash';

export
default class App extends Component {
  constructor() {
    super()
    this.state = {
      random: {
        randoUrl: '?random=true',
        definition: '',
        partOfSpeech: '',
        word: ''
      },
      words: [],
      etymologies: []
    };
    this.wordInput = this.wordInput.bind(this);
    this.getPhone = this.getPhone.bind(this);
    this.randomWord = this.randomWord.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getEty = this.getEty.bind(this);
  }

  onChange(e) {
    e.preventDefault();
    let value = e.target.value;
    this.setState({
      words: [],
      etymologies: [],
      value: value
    });
  }

  wordInput(input) {
    let stateObj;
    console.log('word input', input.data.results)
    if (input.data.results) {
      stateObj = {
        pronunciation: input.data.pronunciation.all || input.data.pronunciation,
        definition: input.data.results[0].definition,
        types: input.data.results[0].hasTypes,
        speechPart: input.data.results[0].partOfSpeech,
        synonyms: input.data.results[0].synonyms,
        typeOf: input.data.results[0].typeOf,
      }
    } else {
      stateObj = {
        pronunciation: input.data.pronunciation.all || input.data.pronunciation
      }
    }
    this.setState({
      words: this.state.words.concat([stateObj])
    })
  }

  randomWord(input) {
    this.setState({
      random: {
        word: input.data.word,
        definition: input.data.results[0].definition,
        speechPart: input.data.results[0].partOfSpeech
      }
    })
  }

  getPhone(stateCb, word = this.state.random.randoUrl) {
    this.serverRequest = axios
      .get('https://wordsapiv1.p.mashape.com/words/' + word, {
        headers: {
          'X-Mashape-Key': '5krdpfZ1aJmshDkdqtO4n9smKKZpp1fkLWfjsnVjlmbwdnKMZh',
          'Accept': 'application/json'
        }
      })
      .then((result) => {
        stateCb(result);
      })

    // this.serverRequest = axios
    // .get('https://watson-api-explorer.mybluemix.net/text-to-speech/api/v1/pronunciation?text=' + word + '&voice=en-US_MichaelVoice&format=ipa')
    // .then((result) => {
    // console.log('2nd get', result.data.pronunciation)
    // let addPropToWord = this.state.words[this.state.words.length - 1];
    // addPropToWord.pronunciation = result.data.pronunciation;
    // this.setState({
    // words: this.state.words.splice(this.state.words.length - 1, 1, addPropToWord)
    // })
    // })

  }

  getEty(word) {
    // this.serverRequest = axios
    // .get('http://api.wordnik.com:80/v4/word.json/' + word + '/etymologies?api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5')
    // .then((result) => {
    // var parseString = xml2js.parseString;
    // var xmlArrs = result.data.map((arr) => {
    // return arr;
    // });

    // parseString($.flattenDeep(xmlArrs), (err, result) => {
    // console.log(result);
    // if (result !== undefined || result !== null) {
    // this.setState({
    // etymologies: this.state.etymologies.concat([{
    // ety: result.ety._
    // }])
    // })
    // }
    // })
    // })

    console.log('ety happening?')
    this.serverRequest = axios
      .put('/ety', {
        data: {
          word: word
        }
      })
      .then((result) => {
        console.log('ety post', result)
        this.setState({
          etymologies: this.state.etymologies.concat([{
            ety: result.data
          }])
        })
      })

  }

  onSubmit(e) {
    e.preventDefault();
    let submitValues = this.state.value.split(' ');
    submitValues.forEach((ele) => {
      this.getPhone(this.wordInput, ele);
      this.getEty(ele);
      var msg = new SpeechSynthesisUtterance(ele);
      msg.volume = 1;
      window.speechSynthesis.speak(msg);
    })
  }

  componentDidMount() {
    this.onSubmit(e);
  }

  render() {
    var style = {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      // height: '100%',
      width: '100%',
      // fontSize: '14px'
    }


    let wordComponentArr = this.state.words.map((word, id) => {
      return <JumboPhon key = {
        id
      }
      etymology = {
        this.state.etymologies[id].ety
      }
      transcript = {
        Object.keys(word).map(key => word[key])
      }
      /> 
    })

    return ( <
        div className = 'test'
        style = {
          style
        } >
        <
        Logo / >
        <
        PhonemeInput value = {
          this.state.value
        }
        onChange = {
          this.onChange
        }
        onClick = {
          this.onSubmit
        }
        / > {
        wordComponentArr
      } <
      /div >
  );
}
}

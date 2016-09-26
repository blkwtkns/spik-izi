var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
const etymologies = require('etymonline');
const express = require('express');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})

app.put('/ety', (req, res) => {
  // console.log(req.body.data.word)
  // console.log(etymologies.find(e => e.word === req.body.data.word));
  if(etymologies.find(e => e.word === req.body.data.word).etymology){
    res.send(etymologies.find(e => e.word === req.body.data.word).etymology);
  }
})

app.listen(3000);

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  proxy: {
    '*': 'http://localhost:3000'
  }
}).listen(3001, 'localhost', function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at http://localhost:3001/');
});



var bodyParser = require('body-parser');
var express = require('express');
var jwtParser = require('express-jwt');
var jwt = require('jsonwebtoken');
var SECRET = require('./secret.js');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.post('/register', (req, res) => {
  var username = req.body.username;
  var password = req.body.password;

  // ... store user info in db

  // create token for this user
  var token = jwt({username}, SECRET)

  // create object to send back
  var responseBody = {token};

  res.json(responseBody);
});

app.get('/profile', jwtParser({secret: SECRET}), (err, req, res, next) => {
  if (err) {
    res.json(null);
  } else {
    var responseBody = {
      req.user.username,
      personalGreeting: 'Welcome developer!'
    };
    res.json(responseBody);
  }
});

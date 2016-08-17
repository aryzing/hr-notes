# JWT

Three fields

- Header
- Claims
- Signature

Header and Claims are stringified JSON object. Signature is the **digest** of the previous two strings and the **secret**. A JWT consists of the string formed by `base64url` encoding all three strings joined with `.` separator.

```
<base64url-encoded header>.<base64url-encoded claims>.<base64url-encoded signature>
```

An example JWT:

```
eyjhbgcioijiuzi1niisinr5cci6ikpxvcj9.eyjzdwiioiixmjm0nty3odkwiiwibmftzsi6ikpvag4grg9liiwiywrtaw4ionrydwv9.tjva95orm7e2cbab30rmhrhdcefxjoyzgefonfh7hgq
```

Note that the **header** and **claims** objects is always readable, they just need to be decoded. However, the information they contain is only considered valid when their contents match the hash using the server known secret.

The header must specify the **type** and the **hashing algorithm**:
```js
{
  "typ": "JWT",
  "alg": "HS256"
}
```

Note that since this object is always readable, JWT parsers will be able to determine the authenticity of a token using the appropriate algorithm and the server's secret.

# JWT workflow

When a user succesfuly identifies themselves, the server will create a token with relevant information and send it to the user.

As mentioned, the token is represented as a string of text. It is usually sent back in the **response body** of the POST request where the user sent identifying information. An example reponse could look like

```javascript
{
  token: '<header>.<claims>.<signature>',
  username: 'Aryzing',
  name: 'Eduard',
  favColor: 'Turquoise',
  theme: `Monokai`
}
```

Technically, all of the sibling keys to `token` could have been made part of the claims object. However, it is often more convenient to provide it as seperate keys. Only data critical to server operations that needs to be authentic should be stored in the token itself. For convinience, some of this data can **also** be provided as a separate key.

Upon receiving the token, the client must store it somewhere. The client that receives the token, usually a superset of `XMLHttpRequest`, must then find a means to **store** the token information (and process any other additional information in the response).

A popular option is to use local storage. Data can be stored and retrieved from local storage using `getItem` and `setItem`:

```javascript
localStorage.setItem('token', token);
var tkn = localStorage.getItem('token');
```

Local storage is essentially a permanent hash table tied to a specific domain.

When the client wants to send a request to a protected route, the token should be included in the authorization header:

```
Authorization: Bearer <token>
```

As an example, for both jQuery using `$.ajax` ([docs](http://api.jquery.com/jquery.ajax/)), and Angular using `$http` ([docs](https://docs.angularjs.org/api/ng/service/$http)) this can be done by setting the headers object.

```javascript
headers: {
  Authorization: 'Bearer ' + tkn
}
```

When using json web tokens, signing out a user is as simple as deleting the token from local storage:
```js
  localStorage.removeItem('token');
```

# Implementing barebones JWT using Node, Express, and jQuery

To implement a simple SPA that uses JWT, the backend will use Node and Express. The middleware that will handle the JWTs is `express-jwt`. For the front-end, some light-weight jQuery will be used.

## Server

Available on NPM is `express-jwt`. This package provides a middleware to extract a JWT from the Authorization header. The function accepts a single configuration object. At least provide the `secret`! The token claims are then by default attached to `req.user`.

```sh
npm install -S express-jwt
```

As with any middleware, it may be used either on a per route basis, or used in all requests:

```javascript
var jwtParser = require('express-jwt');

// on all requests
app.use(jwtParser({secret: 'area51'}));

// on a per route basis
app.get('/patients', jwtParser({secret}), (err, req, res, next) => {
  if (err) {
    // jwt not valid
  }
})
```

Instead of having to type out the whole middleware invocation, it may be more practical to factor it out:

```javascript
var auth = jwtParser({secret});
```

Note that by using `jwt`, it is **expected that a token be present**. If a token is not found, an **error** will be passed into the next middleware.

Auth0's `jsonwebtoken` will be used to create tokens to send back to the client. In its most basic form, the `sign` function can be used with two arguments: the payload/claims object and the key.

```javascript
var jwt = require('jsonwebtoken');
var token = jwt.sign({user: 'aryzing'}, 'shhh this is secret');
```

The token can then be bundled with other data and sent back to the client:

```javascript
var responseBody = {
  token,
  username: 'aryzing',
  personalGreeting: 'Welcome developer'
}
res.json(responseBody);
```

For this example, the server will have three routes:

- `/` Accepts GET requests
- `/register` accepts POST requests. Will return a JWT.
- `/profile` protected route. Only accepts GET requests

The full server-side code could be:

```javascript
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
      username: req.user.username,
      personalGreeting: 'Welcome developer!'
    };
    res.json(responseBody);
  }
});
```

## Client

The strategy for the client will be to have two main divs: one for the registration form and one for the user profile. By default, both will be hidden. If a token is present in local storage, the profile info will be displayed. Otherwise, the registration form will be shown.

### Registration

A simple, two field form will suffice: username and password.

```html
<div class="register">
  <h1>Register</h1>
  <form class="register-form">
    <label>Username: <input type="text" name="username"></label>
    <label>Password: <input type="password" name="password"></label>
    <button type="submit" value="Register">
  </form>
</div>
```

Some jQuery will be needed to modify the behavior of the form and handle the response:

```javascript
$('.register-form').submit((e) => {
  e.preventDefault();
  var $inputs = $('.register-form :input');
  var values = {};
  $inputs.each(function() {
      values[this.name] = $(this).val();
  });

  $.ajax({
    type: 'POST',
    url: '/register',
    data: values,
    dataType: 'json'
  }).done((data) => {
    // store token in local storage
    localStorage.setItem('token', data.token);
  });
});
```

With the token stored locally, the app can now access protected routes by setting up the appropriate header:

```js
$.ajax({
  type: 'GET',
  url: '/profile',
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
}).done((data) => {
  var username = data.username;
  var greeting = data.personalGreeting;
  // modify ui accordingly
});
```

# Conclusion

JWTs are a light-weight and secure authentication mechanism that do not require the server to keep track of actively authenticated users. They are easy to handle, and combined with local storage, offer a powerful alternative to cookies.

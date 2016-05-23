# Express authentication
All express middleware have access to `req` and `res`, can perform actions based on their contents, and modify them.

When using module `session`, Express modifies the request object to include session info. So no functions need to be called to access that info, it is simply available as a property to the request object.

# Body parser
* [`body-parser` npm manual](https://www.npmjs.com/package/body-parser).
* [`body-parser` github](https://github.com/expressjs/session#express-session).

On `body-parser`: The required object allows for the creation of different middlewares:
```js
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
```

These middlwares may be injected into the whole app,
```js
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// or even
app.use(bodyParser());
```
or on a per route basis:
```js
// POST /login gets urlencoded bodies
app.post('/login', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  res.send('welcome, ' + req.body.username)
})

// POST /api/users gets JSON bodies
app.post('/api/users', jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  // create user in req.body
})
```

**Question** When there are various body-parsing middlewares used, how is the appropriate one selected? They each look at the `Content-Type` header in the request to determine whether they know how to handle the content.

# Express session
It is very important to understand that the only info sent to the user is an encrypted session ID (sid). When the user makes a request, the session middleware decripts the id an populates the `req.session` object with all the values previously stored on `session`. Information there contained is all stored server side.

```js
var session = require('express-session')
app.use(session({
  // options
  secret: 'We are building an amazing app!',
  cookie: { maxAge: 60 * 1000 }, // 1 minute
  // https://github.com/expressjs/session#resave
  resave: true,
  // https://github.com/expressjs/session#saveuninitialized
  saveUninitialized: true
}));
```

The default values added by the session middleware are:
```js
req.session.id;
req.session.cookie;
req.sessionID;
```

## Handling session expiration and termination

When a cookie times out, it is removed from the store. So if a user submits a new request with a cookie that is no longer in the store, the session middleware will populate `req.session` with new values (issue a new sid). Any values associated to the expired cookie are deleted form the store.

A cookie may also be forcibly removed from the store (together with all attached values) by issuing `session.destroy`.
```js
req.session.destroy(function(err) {
  // cannot access session here
});
```

Upon authentication, we may want to give the user a new cookie. This can be done with `session.regenerate`.
```js
req.session.regenerate(function(err) {
  // will have a new session here
});
```

## A few quick examples
Attaching per-session values.
```js
// before routes
app.use(session{/*...opts...*/});
// later ...
app.get('/route', function(req, res, next) {
  if (!req.session.number) {
    req.session.number = Math.random();
  }
  next();
});
```

Logging out a user.
```js
app.get('/logout', function(req, res, next) {
  req.session.destroy()
  next();
})
```

It is usually not necessary to extend the cookie timeout of sessions manually. They are automatically `touch`ed when they are seen again. I guess the only thing needed to learn is how to set up a session upon user authentication.

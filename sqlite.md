# SQLite
[API Wiki](https://github.com/mapbox/node-sqlite3/wiki/API),

Node installation
```bash
npm install -D sqlite3
```

Instantiating the DB:
```js
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(path);

// Remember to close the connection after usage
db.close();
```

When using sqlite in node, to allow chaining, methods may return either a `database`, `statement`.

Statements need to be `run` and `finalize`d
```js
var stmt = db.prepare("insert into users (username) values ('Edu');");
stmt.run();
stmt.finalize();
```

It may also be necessary to enclose all database interactions in:
```js
db.serialize(function() {
  db.all('SELECT * from users', (err, results) => {
    console.log(results)
  });
  db.all('SELECT * from urls', (err, results) => {
    console.log(results)
  });
  db.close();
});
```

# Interacting with Bookshelf + Knex
[Stack Abuse Post](http://stackabuse.com/bookshelf-js-a-node-js-orm/)

Bookshelf is DB ORM (Object-relational mapping) tool.

Knex is a DB interaction tool: performs DB operations and queries.

With Bookshelf, you can create models. Models are objects that interact with data from the DB, but themselves need not match the schema of a row. In other words, models interact with the data of a table to create an object that is somehow related to a table, but does not necessarily represent a table entry.

For example, a model can have functions attached to it that perform actions on the retrieved data on the table to populate other fields in the model.

The **only required field** is `tableName`. This tells the model with which table it should interact.

```js
var User = bookshelf.Model.extend({  
  tableName: 'users',
  hasTimestamps: true,

  verifyPassword: function(password) {
      return this.get('password') === password;
  },
  {
    byEmail: function(email) {
      return this.forge().query({where:{ email: email }}).fetch();
    }
  }
});
```

Note that in the above code there are two functions. The first is part of the first object passed in as argument to `extend`, making it an instance function. The second function is the only property of the second argument, which is directly attached to the constructor, i.e., `User.byEmail(/*...*/);`.

Just a friendly reminder, models' properties can be interacted with using `get` and `set`.

To save a model instance to the DB:
```js
var user = new User();  
user.set('name', 'Joe');  
user.set('email', 'joe@example.com');  
user.set('age', 28);

user.save().then(function(u) {  
    console.log('User saved:', u.get('name'));
});
```

The `forge` method creates a new instance of a model without having to explicitly use `new Modelname()`, but does not save it to the DB. It can be used to conveniently create a new model instance with available data,
```js
Model.forge({/*...*/});
```
to be used in a search query or an insertion (`save`) operation:
```js
// Insertion
Model.forge({/*...*/}).save().then((u) => {/*...*/});
// Search
Model.forge({/*...*/}).query(/*...*/).fetchAll().then((col) => {/*...*/});
```

**Note** Fetch fetches a model from the database, using any attributes currently set on the model to form a select query. In other words, `query` must be **chain-inserted before** `fetch`, or else all table entries will be returned.

**Important note on fetching**:
* `fetch` Fetches a model from the database, using any *attributes currently set on the model* to form a select query. [man](http://bookshelfjs.org/#Model-instance-fetch).
* `fetchAll` Fetches a collection of models from the database, using any *query parameters currently set on the model* to form a select query. Returns a promise, which will resolve with the fetched collection. [man](http://bookshelfjs.org/#Model-instance-fetchAll).

When using `fetchAll`, the results will be stored under `.models` from the named promise argument:
```js
User.forge().query({/*...*/}).fetchAll().then(function(collection) {
  console.log(collection.models); // models is an array
});
```

A final note on `this`:
* In first argument to constructor, points a model instance of that constructor.
* In second argument to constructor, points to the constructor instance.

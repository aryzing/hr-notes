var Bookshelf = require('bookshelf');
var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: "./mydb.sqlite"
  },
  // http://knexjs.org/#Builder-insert
  useNullAsDefault: true
});
var db = require('bookshelf')(knex);

db.knex.schema.hasTable('Users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('Users', function (user) {
      user.increments('id').primary();
      user.string('username');
      user.string('password');
      user.string('email');
      user.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);

      var User = db.Model.extend({
        tableName: 'Users',
        hasTimestamps: true,
      });

      // save user
      User.forge({
        username: 'Edu',
        password: 'TopSecret',
        email: 'edu@edu.com'
      }).save()
      .then(function(u) {
        console.log('User saved: ', u.get('username'));
      });

      User.forge({
        username: 'Edu2',
        password: 'TopSecret2',
        email: 'edu@edu.com'
      }).save()
      .then(function(u) {
        console.log('User saved: ', u.get('username'));
      });

      User.forge({
        username: 'Javi',
        password: 'EvenMoreSecret',
        email: 'javi@barda.com'
      }).save()
      .then(function(u) {
        console.log('User saved: ', u.get('username'));
      });


      User.forge({email: 'javi@barda.com'}).fetch().then(function(results) {
        console.log(results);
      });
    });
  }
});

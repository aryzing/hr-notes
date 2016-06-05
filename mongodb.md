# MongoDB
[Ubuntu installation](https://docs.mongodb.com/v3.0/tutorial/install-mongodb-on-ubuntu/).

For Ubuntu 16.04, use [this guide](https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-16-04).

To start, stop, and restart the `mongod` service:
```sh
sudo service mongod start
sudo service mongod stop
sudo service mongod restart
```

# Vocabulary
MongoDB stores *documents* in *collection*. Collections are stored in a *database*. A document has several *fields*.

# Operations

To operate on a database, either enter the url somewhere, or issue a `use` command.

Assuming some type of ORM:
```js
var db = ORM.connect('mongo://localhost:21027/users')
```

From mongoDB shell prompt:
```sh
use db
```

A database need not be "declared" before using it. Mongo will create it if necessary upon use.

After issuing a `use` command, `db` will point to the database.

# Using mongodb Node driver

https://docs.mongodb.com/getting-started/node/insert/

# Intro

Find background and motivation to say

# Coding

Start by going to grapheneDB.com

Ireland > Sandbox > Name? ibelieveneo

# Cypher

* Declarative

# Installation on local machines?

# Usage

Install package

```sh
npm install neo4j-driver -S
```

1. Ask the database object for a new driver.
2. Ask the driver object for a new session.
3. Ask the session object to create a transaction.
4. Use the transaction object to run statements. It returns an object representing the result.
5. Process the result.
6. Close the session.

```js
var neo4j = require('neo4j-driver').v1;

var driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "x0treme8"));
var session = driver.session();
session
  .run("CREATE (a:Person {name:'Arthur', title:'King'})")
  .then(function() {
    return session.run( "MATCH (a:Person) WHERE a.name = 'Arthur' RETURN a.name AS name, a.title AS title" )
  })
  .then(function(result) {
    console.log( result.records[0].get("title") + " " + result.records[0].get("name") );
    session.close();
    driver.close();
  }
```

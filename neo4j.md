# neo4j

# Installation Ubuntu 16.04 LTS

Neo4j requires Java, so first we must install Java.

```sh
# informational output may appear, just press ENTER
sudo add-apt-repository ppa:webupd8team/java

sudo apt-get update
sudo apt-get install oracle-java8-installer -y
```

Then we must set this install of java as default:

```sh
sudo update-java-alternatives --jre --set java-8-oracle
```

That's it for Java.

Now, lets proceed with Neo4j

```sh
wget -O - https://debian.neo4j.org/neotechnology.gpg.key | sudo apt-key add -
echo 'deb http://debian.neo4j.org/repo stable/' | sudo tee /etc/apt/sources.list.d/neo4j.list
sudo apt-get update
sudo apt-get install neo4j -y
```

# Tutorial

From [Neo4j online training][https://neo4j.com/online_training/graphdatabases/?aliId=V2h5IERvIFlvdSBDYXJlL2Z1Y2tvZmZub3dAZ21haWwuY29t]

Built-in tutorial available at `localhost:7474`. Type in command `:play movie graph` to get started.

Note: While going through the tutorial, you may be signed out if you take a lot of time between queries. Simply issue a new `:server connect` command and log back in.

# Quick create a node

Create

```cypher
create (edu:User {username: 'aryzing', email: 'ebardaji@gmail.com'})
create (edu)-[:KNOWS]->(js:AUK {name: 'JavaScript', file: 'js.md'})
create (edu)-[:KNOWS]->(git:AUK {name: 'git', file: 'git.md'})
create (edu)-[:KNOWS]->(html:AUK {name: 'html', file: 'html.md'})

create (js)-[:DG]->(gClass:Group {name: "Deps for class"})-[:D]->(class:AUK {name: "JS Classes", file: "classes.md"})
create (gDefer:Group {name: "Group for defer attribute"})
create (js)-[:DG]->(gDefer)
create (html)-[:DG]->(gDefer)
create (defer:AUK {name: "defer attribute", file: "defer.md"})
create (gDefer)-[:D]->(defer)
```

Delete everything:

```cypher
match (n1)-[r]-(n2), (n3)
delete n1, n2, n3, r
```

Match everything:

```cypher
match (n1)-[r]-(n2), (n3)
return n1, n2, n3, r
```

Match all connected:

```cypher
match (n1)-[r]-(n2)
return n1, n2, r
```

# Driver

http://neo4j.com/docs/api/javascript-driver/current/

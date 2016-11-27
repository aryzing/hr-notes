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

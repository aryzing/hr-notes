Graph databases address one of the great macroscopic business trends of today: leveraging complex and dynamic relationships in highly connected data to generate insight and competitive advantage.

the ability to understand and analyze vast graphs of highly connected data will be key in determining which companies outperform their competitors over the coming decade.

Connected data is data whose interpretation and value requires us first to understand the ways in which its constituent elements are related.

More often than not, to generate this understanding, we need to name and qualify the connections between things.

Graphs represent entities as nodes and the ways in which those entities relate to the world as relationships.

https://www.gartner.com/doc/2081316

Gartner graphs: social, intent, consumption, interest, and mobile

https://aojajena.wordpress.com/2013/08/12/six-graphs-of-big-data/

design for queryability mindset.

To validate that the graph supports the kinds of queries we expect to run on it, we must describe those queries.

# Continue

From thinking:

* Best way to create schema is from a mock graph
* We can join domains. Not sure what this really means, or how to control the domain merger.

# Pitfalls

* Failing to realize that domain data should be a node instead of a relationship

# From `:play cypher` tutorial

Queries explain paths.

Successful paths traverse nodes through relationships. All valid paths are part of the results pool. The result of the query is then constructed from the data available in this pool.

Results are presented in rows, so there is one row per matched path.

# Neo4j manual

http://neo4j.com/docs/developer-manual/3.1/

# Dgraph

Tour: https://tour.dgraph.io/

For fresh start, delete all containers and `dgraph` test dir:

```sh
docker rm $(docker ps -aq)
sudo rm -rf ~/dgraph
mkdir ~/dgraph # watch out if keeping 1million.tar.gz in here
```

Commands to get started,

```sh
mkdir -p ~/dgraph

# Run dgraphzero
docker run -it -p 5080:5080 -p 6080:6080 -p 8080:8080 -p 9080:9080 -p 8000:8000 -v ~/dgraph:/dgraph --name dgraph dgraph/dgraph dgraph zero

# In another terminal, now run dgraph
docker exec -it dgraph dgraph server --memory_mb 2048 --zero localhost:5080

# Run ratel(Dgraph UI)
docker exec -it dgraph dgraph-ratel
```

Load up db with example data from

* https://tour.dgraph.io/intro/3/
* https://tour.dgraph.io/intro/4/

Ratel at http://localhost:8081/

# Tour

## Intro

Graphs describe objects and the interconnections between them.

In a graph, the objects are called nodes and the relationships are called edges or predicates.

Every query has a name. The result is labeled with same name (in returned json).

## Basic

```graphql+-
{
  find_michael(func: eq(name@., "Michael")) {
    uid
    name@.
    age
  }
}
```

Use `func: ...` to match nodes

Use the `eq` function for equality

Personal interpretation: `func: eq(arg1, arg2)` effectively means, "I'm going to use a function, specifically the eq function, for the `find_michael` query."

> The result is the matched nodes and listed outgoing edges from those nodes

The names provided in between `{ ... }` are the outgoing edges.

`uid` is not an edge, but can be returned in a query.

> A query is executed against a graph and the result is a subset of the queried graph, or some manipulation or calculation based on the queried graph.

It seems edges can "point straight to values" or "point to other nodes". If points to value, returns the value. If points to node, will only return values if queried for properties of that node.

^ Related with something I read about properties being edges with only incoming edges.

Example, first query will not produce anything for `owns_pet`, but second will

```graphql+-
{
  find_michael1(func: eq(name@., "Michael")) {
    name@.
    owns_pet
  }

  find_michael2(func: eq(name@., "Michael")) {
    name@.
    owns_pet {
      name@.
    }
  }
}
```

### Data types and Schema

Some edges return value, some are edges to other nodes

Schema tells us how to interpret an edge

```graphql+-
schema(pred: [name, age, friend, owns_pet]) {
  type
  index
}
```

Returned json, truncated to `age` and `friend`

```json
{
  "data": {
    "schema": [
      {
        "predicate": "age",
        "type": "int",
        "index": true
      },
      {
        "predicate": "friend",
        "type": "uid"
      }
    ]
  }
}
```

I take it that if `type` is `uid`, then it's an edge connected to a node. Any other data type means the edge is "connected to that value directly".

> There are two kinds of nodes in a graph, [...] nodes and values. [...] A value can't have any edges coming out of it.

Available types are `int`, `float`, `string`, `bool`, `id`, `dateTime`, `geo`, and `uid` (another node).

### Language support

Strings can be stored in multiple languages uising `@lang` annotations.

Queries can search in multiple languages using `@lang1:...:langN` to specify the preference order for returned languages.

### Queries describe graphs

> The braces `edge_name { ... }` in the query signify nested blocks where the edges inside the block are matched against nodes found by following the edge that begins the block. We continue nesting the query as we follow edges from node to node.

### Functions and filtering

> Nodes are filtered based on functions applied to the node's outgoing edges.

> [...] filters can be applied to any node in the query.

Syntax: `edge_name @filter(<func>(edge_name, value))`

**Functions can only be applied to indexed predicates**

Example,

```graphql+-
{
  michaels_friends_filter(func: allofterms(name, "Michael")) {
    name
    age
    friend @filter(ge(age, 27)) {
      name@.
      age
    }
  }
}
```

Some common filtering functions are `allOfTerms`, `anyOfTerms`, `eq`, `ge`, `le`, `gt`, `lt`.

Can also use logical connectives `AND`, `OR`, and `NOT`.

Results can be ordered `(orderasc: age)` or `(orderdesc: age)`

### Pagination

* `first: N` Return first `N` results
* `offset: N` Skip the first `N` results
* `after: uid` Return results after `uid`

```graphql+-
{
  michael_friends_first(func: allofterms(name, "Michael")) {
    name
    age
    friend (orderasc: name@., offset: 1, first: 2)
  }
}
```

Note, these go in the same parenthesis as ordering commands, while the filtering directives go in their own parenthesis. Filter vs result manipulation.

### Count

To count number of outgoing edges,

```graphql+-
{
  michael_number_friends(func: allofterms(name, "Michael")) {
    name
    age
    count(friend)
  }
}
```

### How Dgraph Search Works

> Dgraph needs a place to start searching, that's the root node.

> At root, we use `func: ...`

> Dgraph needs to build an index on values that are to be searched in this way

... otherwise, the query will be slow as will need to traverse all or many nodes.

`func: ...` only accepts a single function

```graphql+-
{
  lots_of_friends(func: ge(count(friend), 2)) @filter(ge(age, 20) AND lt(age, 30)) {
    name@.
    age
    friend {
        name@.
    }
  }
}
```

### Has

Function `has(edge_name)` returns nodes that have an outgoing edge of the given name.

```graphql+-
{
  have_friends(func: has(friend)) {
    name@.
    age
    number_of_friends : count(friend)
  }
}
```

### Alias

Edge names in the result json are the same as in the query. For example, using `count(friends)` in the query will produce a `"count(friends)"` key in the result.

All queries on edges can be aliased with `alias : <real_query>`

```graphql+-
{
  michael_number_friends(func: allofterms(name, "Michael")) {
    persons_name : name
    age
    number_of_friends : count(friend)
  }
}
```

### Cascade

> The `@cascade` directive removes any nodes that don't have all matching edges in the query [... or ...] nodes where a filter inside a block returns no results.

```graphql+-
{
  michael_friends_with_pets(func: allofterms(name, "Michael")) @cascade {
    name
    age
    friend {
      name@.
      owns_pet
    }
  }

  # friends of michael that don't have friends over the age of 27 are not
  # included
  michael_friends(func: allofterms(name, "Michael")) @cascade {
    name
    age
    friend {
      name@.
      friend @filter(ge(age, 27)) {
        name@.
        age
      }
    }
  }
}
```

### Normalize

The `@normalize` directive flattens the result

## Schema

### Adding and mutating schema

Dgraph stores a schema describing the types of predicates

Reminder: filters can only be applied to indexed predicates.

```graphql+-
industry: string @index(term) .
boss_of: uid .
```

### Adding data

```graphql+-
{
  set {
    _:company1 <name> "CompanyABC" .
    _:company2 <name> "The other company" .

    _:company1 <industry> "Manufacturing" .
    _:company1 <industry> "Fabricated Metal" .
    _:company1 <industry> "Machinery" .

    _:company2 <industry> "Manufacturing" .
    _:company2 <industry> "High Tech" .

    _:jack <works_for> _:company1 .
    _:ivy <works_for> _:company1 .
    _:zoe <works_for> _:company1 .

    _:jose <works_for> _:company2 .
    _:alexei <works_for> _:company2 .

    _:ivy <boss_of> _:jack .

    _:alexei <boss_of> _:jose .
  }
}
```

* Syntax `_:node_name` to refer to _blank_ nodes
* Syntax `<edge>` to create an edge
* The input language is triples in the W3C standard RDF N-Quad format.
* https://docs.dgraph.io/query-language/#mutations-1
* https://www.w3.org/RDF/

### Reverse edges

```graphql+-
boss_of: uid @reverse .
```

**Not working for me**

### Exercise: Integrate existing data

Need to have ids enclosed in `<id>` in order to create edges to existing nodes.

```graphql+-
{
  set {
    <0x6> <boss_of> <0x7> . # michael
    <0x6> <works_for> <0xe> .

    <0x7> <works_for> <0xe> . # sarah
  }
}
```

Note! Don't forget the periods at the end!

### Delete

(Not working)

```graphql+-
{
  delete {
    # Delete a single triple
    <0x1c3eb> <name> "Steven" .
    <0x1c3eb> <age> "38" .

    # Delete all triples for a given edge
    <0x1c3eb> <friend> * .

    # Delete all triples for a given node
    <0x1c3eb> * * .
  }
}
```

### Predicate Query

The edge keyowrd `_predicate_` returns all outgoing edges

```graphql+-
{
  company(func: allofterms(name@., "CompanyABC")) {
    _predicate_
  }
}
```

Returns

```json
{
  "_predicate_": [
    "name",
    "industry"
  ]
}
```

### Expand All

`expand(_all_)`, other than this, not sure how to make it work.

## More Data

We can start from scratch in this section

https://tour.dgraph.io/moredata/1/

To query for everything about the shema,

```gql
schema {}
```

## Blockvars

### Multiple Named Query Blocks

There can be multiple queries in the same block.

> If a block is labelled with `var`, no results are returned for that query.

The returned JSON returns distinct results for each query, but the ratel visualization finds the overlap between them.

### Query Variables

```gql
var_name as some_block { ... }
```

Variables can be used in:

* the same query in a child of the defining block
* in another query

```gql
{
  A as not_a_real_query(...) {
    B as some_edge @filter(...) { # can't use C or B in this filter
      C as ... {
        # A, B and C here
      }

      # A, B and C here
    }

    # A, B and C can be used in any blocks here
  }

  # A, B and C can be used in any other query block
}
```

Variables evaluate to all `uid`s matched in the query block they are defined, they are lists of `uid`s.

Error to define variable and not use it.

### Query Variables in child block

#

# Changing state depending on state

When an event occurs, we may want to change the state of the graph. However, the new state could be function of the old state and the event.

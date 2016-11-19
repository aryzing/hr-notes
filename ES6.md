[From MDN][mdn-iterables], new additions to the language include not only built-ins and syntax, but protocols too. Protocols can be implemented by any object respecting conventions.

It seems that everything involving Symbol is in a realm of its own. `Symbol.iterator` does indeed access the `@@iterator` method, but it is like a language construct method, "under the hood" namesapce, not directly intended to be used by programmers for "habitual" programming, if that makes sense.

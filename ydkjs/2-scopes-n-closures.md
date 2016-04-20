# Scopes & Closures
## What is Scope?
* **Scope**: Rules for storing and retrieving a variable's value.
* Three main characters: *Engine*, *Compiler*, *Scope*.
* **LHS Lookup**: Looking for a variable's container to store a value.
* **RHS Lookup**: Asking scope for value of a given variable.
* Compiler handles both declaration and value definition of functions, there is no LHS lookup by Engine of function values.
* When a variable is not fund, an error of type `ReferenceError` is thrown.
* When variable found but something impossible is asked of it (run a non function, property reference on `null`/`undefined`) engine throws a different error: `TypeError`.
* Note, `ReferenceError` means variable not found (scope resolution failure), `TypeError` means it was found, but can't perform requested action (illegal action failure).
* Don't think of function "assignments" as LHS. They are handled by the compiler. *I presume code is written by the compiler "in place" to be directly executed.*
* RHS lookups on function names work just like any other variable type.

## Lexical Scope
* Lexical scopes are those created during lexing.
* They are solely defined by the position of blocks in the (author-time) written code.
* Non-global shadowed variables cannot be accessed.
* No matter where or how a function is called, it's scope is defined by where it was defined.

## Function vs. Block Scope
* JS has function-based scope.
* **Principle of Least Privilege** aka *Least Authority* aka *Least Exposure*: in software design expose only what is minimally necessary.
* Note, the name of an IIFE does not get added to the enclosing scope.
* Anonymous functions have no useful name to display in stack traces.
* Anonymous functions can not be recursive.
* Anonymous functions make code less readable.
* `catch` clause is block scoped.
* ES6 introduces `let` that defines variables in scope local to any current block.
* ES6 also introduces `const` for defining variables who's value can only be assigned once.
* Note, inline functions, such as callbacks, are have access to the enclosing scope too.

## Hoisting
* Variable declarations are hoisted, and declaration plus assignment statements are treated as two independant statements.
* Function declarations are hoisted, but function expressions are not.
* Function expression names are not available to the scope.
* Function declarations names have priority over `var` declarations with same name.
* While subsequent `var` declarations with same name are ignored, subsequent function declarations with same name override previous function declarations.
What truly surprised me from this chapter is that named function expressions are not hoisted, and they can not be referenced by name anywhere in the scope. I guess that being named solves recursion problems. While names of declared functions can be used anywhere in the scope, names of variables that are assigned a function expression can only be run after the line where the assignment occurs, or else they contain `undefined`.
* Is there any reason other than recursion to name a function expression?
* Where does this name live?
Inline function expressions have access to the enclosing scope, but they may not be called from the enclosing scope.

## Scope Closure
Although it is not explicitly explained in the text, the closure/scope for a function called outside its execution context is unique and created by a given execution of the enclosing function. HR notes scope (lexical scope) vs scope (execution context).
* Module code pattern is composed by a function returning an enclosed function or other object with access with functions that have a closure over the enclosing function's scope.
Towards the end of the chapter, talks about "homemade" modules (the module pattern), as well as compiler-recognized modules using keywords `import`, `module`, and `from`. In node, I have already seen these keywords used. Are they ES6 compliant? Do they work as explained here?

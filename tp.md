# Setup and stuff to look into

* Atom configuration files
* Sagas + anything on ponyfoo
* Promises

## Promises

https://promisesaplus.com/

## Sagas

Seperate thread solely responsible for side effects.

`redux-saga` is redux middleware. Thread can be started, paused, and cancelled from app with redux actions, has access to state, and can itself dispatch actions.

Uses ES6 Generators.

## ES6 Iterators - ponyfoo

Two new protocols ES6: **Iterators** and **Iterables**. Iterable protocol allows you to define "under the hood" behavior of JS iteration on iterable objects. Modifies `@@iterator` method.

Protocols aka conventions.

[From MDN][mdn-iterables], new additions to the language include not only  built-ins and syntax, but protocols too. Protocols can be implemented by any object respecting conventions.

Example: **Iterable protocol** and **Iterator protocol**. These look like two different protocols, but they seem to be closely related.

To be iterable, but implement `@@iterator` method (or be in prototype). In other words, must have a key with the name `@@iterator`. This key name is accessible via the constant `Symbol.iterator`.

Why can't I just declare this property like

```js
var a = {};
a["@@iterator"] = () => {/*...*/};
```

It seems that everything involving Symbol is in a realm of its own. `Symbol.iterator` does indeed access the `@@iterator` method, but it is like a language construct method, "under the hood" namesapce, not directly intended to be used by programmers for "habitual" programming, if that makes sense.

So, comming back to the discussion, an object can be made to conform to the iterable protocol by defining the `@@iterator` "language"/"under the hood" property, which is not the same as the `a["@@iterator"]` property.

Going back to MDN article.

An iteration function must be defined at the `@@iterator` key of an object, which is referenced using the constant `Symbol.iterator`.

The function is a zero arguments function that returns an object conforming to the iterator protocol.

On loop, the `@@iterator` method is called and the returned iterator is used to obtain values to be iterated.

So, up to here, the explanation of how and under which key to create the iterator function **is** the iterable protcol, meaning that this is what is necessary to make an object iterable.

Now, we will explain the iterator protocol, which defines how the object returned by the iterator function is used to defin the iteration sequence.

"An object is an iterator when it implements a `next()` method with the following semantics"

`next()` must return an object with two properties: `done` and `value`.

Small recap: The `@@iterator` method must return an object with a `next()` method that must return an object with two properties: `done` and `value`.

If any part of this does not work as expected, an error will emerge: "TypeError: iterator.next() returned a non-object value".

Looking into a few examples.

Example1: "Some iterators are in turn iterables". All this means is that iterators, which are just objects with a `next()` methods that operates according to the iterator convention, also have their `@@iterator` function defined too.

In the MDN article, there is a value whose type is `[object Array Iterator]`. I don't know if I myself can create a value with this type, or a similar one. To test this, I created the following script with the expectationt that the typeof would be something like `[object Iterator]`, but unfortunately it did not work.

```js
var a = {};

a[Symbol.iterator] = function () {
  return {
    next: function () {
      return {
        done: true
      };
    },
  };
};

typeof a; // object
```

I believe this is because the array iterator is a builtin, and thus `typeof` yields a value to that reflects the builtin nature of those iterators.

MDN article gets more intense during the builtin section. Going back to ponyfoo.

ponyfoo

The `@@iterator` methtod is called once when an object is to be iterated over. The iterator key must be accessed using square brackets because it's a *computed property*.

Very good paragraph from ponyfoo:

> You can use `for..of` to iterate over any object that adheres to the iterable protocol. In ES6, that includes arrays, any objects with an user-defined `[Symbol.iterator]` method, generators, DOM node collections from `.querySelectorAll` and friends, etc. If you just want to “cast” any iterable into an array, a couple of terse alternatives would be using the spread operator and `Array.from`.

Two examples of why iterators are very useful:

1. Libraries such as lo-dash can implement their utility functions using constructs native to the language.
2. Array-like objects, such as argument lists or jQuery wrapped DOM nodes can be easily iterated over.

From 2, if jQuery implemented iterator protocol, code could look something like

```js
for (let list of $('ul')) {
  // list is a matched `ul` DOM node wrapped in jQuery
  for (let item of list.find('li')) {
    // item is `li` node child of the outer for's `ul`.
    console.log(item);
  }
}
```

Iterators are *lazy in nature*. Sequence is accessed one item at a time. Of course it is, the `next()` function is executed everytime the next value in the iteration is necessary. This also opens the door to infinite series of values being valid series too.

Small incursion into infinite loops.

Simple, just never say that `done` is true. This can work for loops if we inted a loop to be infinite, but will not be useful when using the spread operator for example. `[...foo]` will stall program.

Finished ponyfoo article.

## ES6 Generators - ponyfoo

Can declare a *generator function* which returns *generator objects* which are iterable: `Array.from(g)`, `[...g]`, `for value of g`.

These functions declare a special kind of iterator. These iterators can suspend execution while retaining context.

A generator object is both iterable and iterator. Code excerpt from ponyfoo, explanation below.

```js
function* generator () {
  yield 'f'
  yield 'o'
  yield 'o'
}

var g = generator()
// a generator object g is built using the generator function
typeof g[Symbol.iterator] === 'function'
// it's an iterable because it has an @@iterator
typeof g.next === 'function'
// it's also an iterator because it has a .next method
g[Symbol.iterator]() === g
// the iterator for a generator object is the generator object itself
console.log([...g])
// <- ['f', 'o', 'o']
console.log(Array.from(g))
// <- ['f', 'o', 'o']
```

`g` is an interator, and the values of the iteration it provides are those yielded by the generator function. `g` is akin to an object with `.next()` method, and the values `.next()` would return are the yielded ones.

`g` is also iterable. This means that object `g` not only has something similar to a `.next()` method, but it also has a `@@iterator` method. This method must return an iterator, and it turns out the iterator it returns is `g` itself.

Going back to the generator function, between `yield` statements it can perform other operations. These are known as side effects.

The yield operator can be used with an asterisk, `yield*`, meaning that instead of returning the value it is given, it should instead treat the value as an iterable and have that object's `@@iterator` method provide the next values in the sequence.

To understand how values are provided by generator functions, each time a `next()` method is run, the generator function resumes execution where it left off. This means that a subsequent yield may be hit, or the end of the function may be reached, meaning that the result of `next().done` would be true.

Context is preserved across suspensions of a generator function. The four scenarios that will suspend execution are

* `yield` expression returning the next value.
* `return` statement returning the last value.
* `throw` statement halts execution.
* Reaching the end of the generator function, making `{done: true}`.

One note:
* They are "yield expressions", not "yield statements".

Lets dive a little deeper into generators

To consider: other methods (`.return()` and `.throw()`) as well as possibility of sending values into the generator (`.next(value)`).

Minor revelation: the keyword `yield` has been specifically created to be used with generators. I previously was mixing it up with `await`, so I though there were more purposes for it, and was not concentrating fully on its use.

Most generators are used using an inversion of control pattern, meaning that the values to iterate over, and thus the generator function as a whole, is what is passed into a function that handles the iteration.

> Letting the library deal with the flow control means you can just worry about whata you want to iterate over, and delegate how to iterate over it.

And now, let get into async.

Wow, it is pretty awesome. Basically, with the yield operator, we can create the following async pattern:

1. Pass generator function to consumer library with values we want processed.
2. The consumer library will iterate pop out the first value, take some action, and when done, can then call `.next()` method of the iterable generator object to process the next value. The "processing" of the value can be async, the generator function does not care, it simply produces the next desirable value in the sequence when requested and leaves the library to its processing.

In short, the most important aspect of generators is the control flow code that decides when to call `g.next()`.

What about error handling?

In async flow, if the ajax request fails,

```js
if (err) {
  g.throw(err)
}
```

But what exactly does this do? What happens if we omitted this statement, or just returned the function? I believe this will be a tricky one to find out!

Well, I think it wasn't that hard. All it means is that this error is as if after the last `yield` expression it stopped on, a line was magically inserted that trows an error.

The following is code that illustrates code that would have the same behavior as a `g.throw(err)` after having called `g.next()` twice.

```js
function* seq () {
  yield 1
  yield 2
  throw "Big fat error" // this line gets "inserted"
  yield 3
  yield 4
}
```

So now, if we want to handle the error, we have to wrap every yield expression in a `try / catch` block.

Finally, `g.return()` finalizes the sequence without any errors. I'm assuming it can take an argument that indicates the final value of the generator.

Attention! The convention with generators is that the iterator returns {done: true} when we are **passed** the final value. The behavior of having a `return` statement in the generator (as well as using `g.return()`) is that the iterator object's `next().done` will be true, so even if a value is returned, in most cases it will be ignored. It should be ignored. That is the behavior of the builtin functions that deal with iterators.

## Sagas

Official recommended articles  by Sagas creator:

* [ES6 Generators - Gajus Kuizinas][1]
* [ES6 Generators - Kyle Simpson][2]
* [ES6 Generators - Axel Rauschmayer][3]

Comparison of thunk and saga middleware: Thunk uses the `typeof` (presumably, or similar)  of the object to determine if it must deal with it, whereas Saga uses the type field of the action to determine if it must deal with it.

### First tutorial

[Beginner Tutorial][beginnertut].

The `delay` from `redux-saga` returns a Promise that resolves in the given amount of milliseconds. The Sagas middleware is designed to wait for Promises to resolve, and will halt the generator function for the specified amount of time.

Saga middleware uses `put` from `redux-saga/effects` to dispatch actions.

`put` is an example of an *Effect*. Effects are provided functions that tell the middleware what to do, halting the generator until the Effect is fulfilled.

Summary. Not necessarily in this order, but this is so far what I have done:

* Import tools from the Saga library to bootstrap the generators/sagas
* Run the bootstrapping code
* Import the sagas root
* Group all sagas in a root saga as an array
* Use redux tools to connect the saga middleware
* Create saga that actually performs what I waant
* Create listener saga

I'm surprised that we have to  "bootstrap" the generators. I wonder if it's because I'm not understanding the yielding mechanism properly.

As I understand it now, the body of a generator function executes up to the yield *and* "returns" (to the generator's `.next()`) its value. Perhaps, the body executes up to the yield, but only returns the value at the "beginning of the execution". Lets try it out.

```js
function* gen () {
  console.log('I have started executing');
  yield 1;
  console.log('After 1');
  yield 2;
  console.log('After 2');
}

var g = gen();

console.log('Starting');
console.log(g.next().value);
console.log('After A');
console.log(g.next().value);
console.log('After B');
console.log(g.next().value);
console.log('After C');
console.log(g.next().value);
console.log('After D');
```

Nope. My mental model was correct. It works as I understood it the first time. That is, the function only runs when a generator object created from it has its `.next()` method called. It runs up to and including the yield expression, and the value of that expression is what is accessible via the `.value` property.

Although not strictly related to sagas, I will now test what happens when we have two generator objects created form the same function. I believe that there will be two different execution contexts. Lets see.

```js
function* gen () {
  console.log('I have started executing');
  yield 1;
  console.log('After 1');
  yield 2;
  console.log('After 2');
}

var g = gen();
var h = gen();

console.log(g.next().value); // 1
console.log(h.next().value); // 1
```

Testing

Recommended testing practice, my opinions on it.

Ok, so, when testing, what we are testing are the yielded values of the generators. Depending on what is he yielded value, it can be easier or harder to test for it.

For example, if it returns a primitive value (string, number, undefined, ...) it is easy to test for. If it returns something a bit more complicated, like an object, it is harder, but still doable.

However, what if we are returning a "Promise that resolves after 1 second" !!!. How in the hell are we going to test for that? Moreover, we, the developer, have created this Promise through a `redux-saga` utility and have no idea how this was done.

So, specifically to be able to test easily, `redux-saga` has introduced intermediary functions called *effects* that describe what is about to happen. These effects are functions that  return objects that describe what is about to happen.

Objects are not the easiest of things to test against, but can be feasable using a deepequals library.

To get these easy to test objects, we already must build the generator functions with testing in mind, such as:

```js
import { put, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';

export function* incrementAsync() {
  yield call(delay, 1000); // --> {CALL: {fn: delay, args: [1000]}}
  yield put({type: 'INCREMENT'}); // --> {PUT: {type: 'INCREMENT'}}
}
```

Moreover, we don't even have to write out the objects in the tests, we can use the very same function calls in the yield expressions to produce them, and then use a deepequals library.

Conceptually, this looks something like:

* Create the generators using the functions that instruct the operations to take place by returning descriptive objects.
* I believe that when calling a function, since its name is received in plain text, it must know interpret the function name to correspond to one in the `redux-saga` library. ASIDE
* In the tests, use a deep equals library in conjuction with the the imported `redux-saga` effects that produce the objects.
* Test any other value normally.

Ok, up to here I can understand this too. But now, how does it work with async calls to the server?

We will get into an example shortly, first, there are two versions of defining the root saga: yielding an array of the saga watchers or creating a root saga with one yield per watcher.

The two main saga middlewaare processing mdoes are

* `takeEvery`
* `takeLatest`

Saga = Generator > yield POJO aka *Effect*.

Can the middleware accept other values, or POJOs that dont give it specific instructions? Is there even a point doing that?

> To create Effects, you use functions provided by the library in the `redux-saga/effects` package.

A popular yielded effect is a Promise. Promises play well with generators and Sagas. I am seeing similarities b/w yielding and promises, I wonder if they are constructed atop the same underlying code.

Again: sagas middleware is prepared to receive promises: it does not call `.next()` until they are resolved. So, AJAX APIs  that return promises are ideal candidates to use with  Sagas.

But earlier we already saw that it was hard to test against Promises. If the promises were produced by tools within `redux-saga`, then that's no problem, because the library provides wrapper functions that return POJOs. But what happens when the promises are from other libraries external to `redux-saga` like `axios`?

Well, we don't actually test "thoroughly", instead all we do is test whether the api call is instructed to be made and that the arguments are correct.

```js
import Api from 'path/to/api'
import { call } from 'redux-saga/effects'

function* fetchProducts() {
  const products = yield call(Api.fetch, '/products', arg2, arg3, /* ... */ argN);
}
```

`call` will return an object that looks like

```js
{
  CALL: {
    fn: Api.fetch,
    args: ['./products']
  }
}
```

So, the point it to deepequals test this object, and call it a day if it matches. Theres no testing that the call actually ocurred.

This uses the philosophy that we test that the function is written to do what we want. Later, we can test that the response gets processed correctly in a different test. But there is no all-encompassing tests the complete flow.

With this approach, we are relying that the person responsible for the descriptor function has thoroughly tested it and that it works. I have my reservations on the approach, but it does make it so that the package that each function comes from is the one responsible for its correct behavior. By testing the complete flow, we are perhaps testing more that what is required.

To provide a context, we can use the effects:
* `yield call([obj, obj.method], arg1, arg2, /*...*/ argN)`
* `yield apply(obj, obj.method, [arg1, arg2, /*...*/ argN])`

CPS (Continuation Passing Style) supported with `cps` aka Node error-first callbacks.








Lets do a brief recap of what I remember from iterables, iterators, and generators.

An object can be made iterable by defining its `@@iterator` method.

This method is a function that returns an object with a `next()` method, that returns an object with two keys: `done` and `value`.

Generators: generator functions and generator objects. The objects are the iterators of the function, meaning they have a `.next()` method. The value of the object returned is computed in the generator function body.

```js
function* gen() {
  var i = 0;
  while (true) {
    console.log(`before yield: ${value}`);
    var value = yield i;
    console.log(`after yield: ${value}`);
    i++;
  }
}

var g = gen();

var result;

result = g.next();
// before yield: undefined
// {value: 0, done: false}

result = g.next();
// after yield: undefined <-- wtf?
// before yield: undefined <-- wtf?
// {value: 1, done: false}

result = g.next();
// after yield: undefined <-- wtf?
// before yield: undefined <-- wtf?
// {value: 2, done: false}

result = g.next('hello');
// after yield: hello
// before yield: hello
// {value: 3, done: false}

result = g.next();
// after yield: undefined
// before yield: undefined
// {value: 4, done: false}
```

With this we conclude that the yield expression evaluates to undefined. Do not confuse the yield expression with the expression that is the argument of the yield operator.

You can assign a value to the yield expression by passing that value in the `.next(value)` method.

Because `.next()` method is inspired from an iterable object, I wonder what happens if this method is called on an iterator that does not come from a generator, that is, one that is the result of defining `@@iterator`.

I believe that under this scenario, you could define what happens to the incoming argument. Most language constructs will continue to call it without an argument, such as `for..of` or the `...spread` operator.

Thank me, this was necessary.









Now I can continue, and in fact understand, what it means to mock the following products.

```js
function* fetchProducts() {
  const products = yield call(Api.fetch, '/products');
  yield put({type: 'PRODUCTS_RECEIVED', products})
}
```

Mocking a response is so easy! All you have to do is provide the value of the products as the value of the yield expression using `.next(products)`.

important: so the behavior of Saga, is that when a generator yields a promise, it calls `.next(resultOfPromise)`, and that is why we can expect to have the result of a promise be the value of the yield expression. amazing.

Truly, what matters, is how the library consuming generators uses the `.next()` method.

In other words, previously I didn't really know how the value of the Promise made its way to the assigned variable when going through Saga, I never made the connection. Now it's clear how that happens.

Going back to the philosophical debate I was having earlier. What the author of Sagas proposes is that each package test its own functions. While this seems sound, there is some redundancy lost when testing an entire workflow. Which means, that it might be harder to detect a non-working function from a package. Will meditate more later.

QUESTION: what are exactly the rules Saga uses to assign an object value to a yielded function that returns a Promise.

Something to remember: Well, what yield expression argument can Saga consume? It can consume

* a Promise (remember `delay()`)
* an Effect (a function that tells it what to do)
* the Effect can be a function that returns a promise
* can the call effect consume a function other than one that returns a promise?

## Advanced Sagas

Up to this point I have more or less understood most of what I have read. But now I am becoming saturated. Why? My knowledge of generators is recent and not always at 100%. Also, I am not entirely familiar with how Saga consumes generators. For example, I don't understand how it is able to consume one, or a root with several yielded, or a root with a single yield of an array.

I have already proved myself that my understanding was not perfect with the case of passing values to next. However, after having solved that issue, lets assume that now I'm in a good enough shape.

The next hurdle, then, understanding how the Saga consumes generators which are listeners, and how these work to call other generators.

```js
// style 1 - single function
sagaMiddleware.run(function* gen () {
  console.log('hi');
});
// style 2 - root with single yield
function* genW1 () {
  yield takeEvery('AT', gen1)
}
sagaMiddleware.run(function* rootGen () {
  yield [
    genW1(), // g1. This is a watcher.
    genW2(), // g2. This is a watcher.
  ];
});
// style 3 - root with multiple yields
sagaMiddleware.run(function* rootGen () {
  yield takeEvery('AT1', gen1);
  yield takeEvery('AT2', gen2);
});

// QUESTION what about
sagaMiddleware.run(function* rootGen () {
  yield genW1();
  yield genW2();
});
```

Now I'm beginning to see that it makes sense to initialize the root generator/saga with `.run(rootSaga)`. I believe this causes the Saga library to run through everything and configure itself to listen for whatever it needs to. There doesn't seem to be logic that would require this generator to run more than once after everything is configured. Having declared the watchers, what does get run whenever an action is dispatched are the `genX` for which there are watchers.

* `genWX` runs once to configure middleware.
* `genX` runs on each matched watcher.

The only two things I need to finally nail are the rules governing the watchers (how to set them up) and the "watched" generators (how to use them with Effects, Promises, patterns, control flow, etc). In the latter is where I believe greatly understanding generators will be necessary.

Starting from the Beginner Tutorial again.

The terms used to distinguish the role of generators are **worker saga** and **watcher saga**.

> Sagas are implemented as Generator functions that *yield* objects to the redux-saga middleware.

Can also yield Promises. Waits for them to finish before continuing.

> Effects are POJOs which contain instructions to be fulfilled by the middleware.

Ok, then don't call the functions that return them Effects too. I guess they could be called Effect Creators.

> [...] `rootSaga` [...] is responsible for starting our other Sagas.

Responsible for starting watcher sagas.

```js
function* root () {
  // yielded array makes all start in parallel.
  yield [
    watcher1(), // gWatcher1
    watcher2(), // gWatcher2
    watcherN()  // gWatcher3
  ];
}
```

> Instead of doing yield delay(1000), we're now doing yield call(delay, 1000). What's the difference?

Using a yielded expression that evaluates to an object (Effect) or a Promise. Nothing special related to the yielding itself happens because we are yielding a Promise. Promises are just another object.

This [StackOverflow post][post] might be useful.

However, calling function now has to deal with the Promise. The Sagas middleware deals with it by not `.next()` before the promise is resolved.

For testing purposes, it is harder to test against promises.

> In the second case, the yield expression `call(delay, 1000)` is what gets passed to the caller of `next`.

Which is much easier to test for, being an object. Moreover, it tells us that we can pass both Promises to the calling middleware function, as well as functions that return Promises.

NO. A Promise is an object. `call` returns an object that tells the middleware what to do (what function to run), but the value that gets yielded is still an object. Yielding a function, means yielding a value that's a function. It may work, but we can't make this assumption yet with the info provided.

Also, it seems that when using `call`, the middleware is prepared to handle functions that return promises (will hold on calling next until the Promise resolves, will call `.next(resolve_value)`, and will call `.throw(msg)` if it fails). If not a promise, it will probably call `.next(ret_val)` with the function's return value.

> We want to test our `incrementAsync` Saga

It appears we only test the workers, or maybe they're just first on the list of things to test.

```js
import { call, put } from 'redux-saga/effects'

export function* fetchData(action) {
  // workers get fed the action
   try {
      const data = yield call(Api.fetchUser, action.payload.url)

      yield put({type: "FETCH_SUCCEEDED", data})
   } catch (error) {
      yield put({type: "FETCH_FAILED", error})
   }
}
```

From the previous code we can learn

* saga workers get fed the action
* promimses

```js
// use them in parallel
export default function* rootSaga() {
  yield takeEvery('FETCH_USERS', fetchUsers)
  yield takeEvery('CREATE_USER', createUser)
}
```

The difference b/w this and the previous example is that here there are no watchers, and the configuration is written right here. I suspect that I might even be able to yield a watcher here too. Not sure about `yield*`, maybe even that too if fed `watcher()`. Will have to look at docs and rethink what this means.

```js
function* fetchProducts() {
  const products = yield Api.fetch('/products')
  console.log(products)
}
```

From expressions like these, we can assume that resolved Promises give their value back to the generator function.

> Declarative effects

Saying what is going to be done in an object, rather than doing it. Easy to test against.

<<<<<<< HEAD
> function `cps` can be used to handle Node style [error first] functions

Example: `const content = yield cps(readFile, '/path/to/file');`

> create an Object to instruct the middleware that we need to dispatch some action, and let the middleware perform the real dispatch.

No need to mock `dispatch` and easier to test. Can use

```js
import { call, put } from 'redux-saga/effects'

function* fetchProducts() {
  const products = yield call(Api.fetch, '/products');
  yield put({type: 'PRODUCTS_RECEIVED', products})
}
```

> We can catch errors inside the Saga using the [...] `try/catch` syntax.

This is only the syntax, `try { /*yields*/ } catch(error) { /*more yields*/}`. It is also convenient to know when/how the middleware throws. For example, on Promimse rejection, or perhaps on some other error. Promise rejection is pretty typical example.

Lets look at the syntax in more detail.

```js
function* fetchProducts() {
  try {
    const products = yield call(Api.fetch, '/products')
    yield put({ type: 'PRODUCTS_RECEIVED', products })
  }
  catch(error) {
    yield put({ type: 'PRODUCTS_REQUEST_FAILED', error })
  }
}
```

When using .throw(error), the value goes into catch's argument

> Not forced to handle your API errors inside try/catch blocks. You can also make your API service return a normal value with some error flag on it.

Lets take a look at the sample function they propose:

```js
function fetchProductsApi() {
  return Api.fetch('/products')
    .then(response => ({ response }))
    .catch(error => ({ error }))
}
```

What is the difference between yielding `call(fetchProductsApi)` and `call(Api.fetch, '/products')`. In both cases, the middleware receives an object instructing it to execute a function that returns a Promise.

In the first case, the condition of resolving or failing Promise is left to the Api, and thus, this then affects how the middleware behaves.

In the second, the promise will always resolve. Meaning that the middleware will always act as if the promise resolved, and we can then handle any error flags back in the worker saga.

We can tie this with something like

```js
function* fetchProducts() {
  const { response, error } = yield call(fetchProductsApi)
  if (response)
    yield put({ type: 'PRODUCTS_RECEIVED', products: response })
  else
    yield put({ type: 'PRODUCTS_REQUEST_FAILED', error })
}
```

> triggering Side Effects from inside a Saga is always done by yielding some declarative Effect. (You can also yield Promise directly, but this will make testing difficult

Good summary up to this point

> What a Saga does is actually compose all those Effects together to implement the desired control flow.

Note that in Saga parlance, the Effect is used to refer the objects yielded both watcher sagas (that define saga config) and worker sagas (that define saga actions).

> `take` [...] makes it possible to build complex control flow by allowing total control of the action observation process.

Small reminder of previously used `yield takeEvery('AT', worker)`.

> Using `takeEvery('*')` [...] we can catch all dispatched actions

Great for loggers

```js
import { takeEvery } from 'redux-saga'
import { put, select } from 'redux-saga/effects'

function* watchAndLog() {
  yield takeEvery('*', function* logger(action) {
    const state = yield select()

    console.log('action', action)
    console.log('state after', state)
  })
}
```

Small reminder: worker saga receives action that caused it to get executed as input argument.

> Now let's see how to use the take Effect to implement the same flow as above

```js
import { take } from 'redux-saga/effects'
import { put, select } from 'redux-saga/effects'

function* watchAndLog() {
  while (true) {
    const action = yield take('*')
    const state = yield select()

    console.log('action', action)
    console.log('state after', state)
  }
}
```

To begin with, this seems a bit weird. Why? because this is a watcher, and so far I have thought as watchers as used to configure behavior of middleware. If this watcher never ends, then it never ends configuring behavior.

Perhaps, *all* watchers get executed each time an action is dispatched. If they contain a matching `take` or `takeEvery`, the middleware continues executing them to completion. Otherwise, calls the `.return()` on them. This could work.

> The resulting behavior of the call Effect is the same as when the middleware suspends the Generator until a Promise resolves.

So it seems that watchers with `takeEvery` may only run once, while those with `take` suspend until match. So `take` watchers can be safely called in an infinite loop.

QUESTION. Can we have `takeEvery` in an infinite loop? Will it crash?

> In the case of takeEvery the invoked tasks have no control on when they'll be called. They will be invoked again and again on each matching action. They also have no control on when to stop the observation.

The behavior is predefined and will always follow the same logic for he same actions.

> In the case of take the control is inverted. Instead of the actions being pushed to the handler tasks, the Saga is pulling the action by itself. It looks as if the Saga is performing a normal function call action = getNextAction() which will resolve when the action is dispatched.

From here I infer that `action = getNextAction()` means that the value of a `yield take()` expression will be the matched action.

> application [will] display a congratulation message then terminate. This means the Generator will be garbage collected and no more observation will take place.

```js
import { take, put } from 'redux-saga/effects'

function* watchFirstThreeTodosCreation() {
  for (let i = 0; i < 3; i++) {
    const action = yield take('TODO_CREATED')
  }
  yield put({type: 'SHOW_CONGRATULATION'})
}
```

So its like having a listener that goes away after the appropriate actions have been dispatched.

How would I do this with reducers? Well, I would have a reducer that modified state of a variable each time a note is added. After x times, the value would change and the appropriate component would load.

The advantage of using this approach is that we have a function for this functionality, and don't have to rely on the reducer so much to perform as complex changes to state.

But the main advantage is being able to code async actions in a sync style.

For example,

```js
function* loginFlow() {
  while (true) {
    yield take('LOGIN')
    // ... perform the login logic
    yield take('LOGOUT')
    // ... perform the logout logic
  }
}
```

This is code represents what is meant by pulling future actions.

Login and logout logic first attempt:

```js
import { take, call, put } from 'redux-saga/effects'
import Api from '...'

function* authorize(user, password) {
  try {
    const token = yield call(Api.authorize, user, password)
    yield put({type: 'LOGIN_SUCCESS', token})
    return token
  } catch(error) {
    yield put({type: 'LOGIN_ERROR', error})
  }
}

function* loginFlow() {
  while (true) {
    const {user, password} = yield take('LOGIN_REQUEST')
    const token = yield call(authorize, user, password)
    if (token) {
      yield call(Api.storeItem, {token})
      yield take('LOGOUT')
      yield call(Api.clearItem, 'token')
    }
  }
}
```

> can also use [`call`] to invoke other Generator functions.

In code above to retrieve token. Also note that when processing a generator, the expression assigned to the yield expression by the middleware is the return value of the generator.

> Suppose that when the `loginFlow` is waiting [...] the user clicks on the Logout button causing a LOGOUT action to be dispatched.

There will not be a `take` listening for a LOGOUT, and it will be missed.

> `call` is a blocking Effect.

Middleware waits for its function to return before calling `.next()` on that generator.

> we do not only want `loginFlow` to execute the authorization call, but also watch for an eventual LOGOUT action that may occur in the middle of this call. That's because LOGOUT is *concurrent* to the authorize call.

Logout is **concurrent**.

> To express non-blocking calls, the library provides [...] `fork`.

Then, the login logic to store the token must be in the forked function.

A few issues:
* What if the user clicks logout and then the server returns succesfully.
* What if the user clicks logout and then the server returns error.
* What if we force multiple logouts. Will that spawn/spam multiple login forks? No. There is a protecting `take` before the `fork`.
* But the same way that the user logs out and then the server returns, what if we go around this cycle multiple times, will that spam login requests? Will we get multiple alerts after the last logout that we have failed logins?

> `yield cancel(task)`

The answer to my issues. So my mental model was correct: the forked processes would remain active in memory and `put`ting actions and would continue to inconsistent state.

> Suppose that when we receive a `LOGIN_REQUEST` action, our reducer sets some `isLoginPending` flag to true so it can display some message or spinner in the UI. [...] Fortunately, the cancel Effect won't brutally kill our authorize task, it'll instead give it a chance to perform its cleanup logic. The cancelled task can handle any cancellation logic (as well as any other type of completion) in its `finally` block. Since a finally block execute on any type of completion (normal return, error, or forced cancellation), there is an Effect cancelled which you can use if you want handle cancellation in a special way:

```js
import { take, call, put, cancelled } from 'redux-saga/effects'
import Api from '...'

function* authorize(user, password) {
  try {
    const token = yield call(Api.authorize, user, password)
    yield put({type: 'LOGIN_SUCCESS', token})
    yield call(Api.storeItem, {token})
    return token
  } catch(error) {
    yield put({type: 'LOGIN_ERROR', error})
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}
```

> When we yield an array of effects, the generator is blocked until all the effects are resolved or as soon as one is rejected.

```js
import { call } from 'redux-saga/effects'

function* () {
  const [users, repos]  = yield [
    call(fetch, '/users'),
    call(fetch, '/repos')
  ];
}
```

>using `yield*` will cause the JavaScript runtime to spread the whole sequence.

In relation to code. No clue what this means.

```js
function* playLevel1() { ... }
function* playLevel2() { ... }
function* playLevel3() { ... }

function* game() {
  const score1 = yield* playLevel1()
  yield put(showScore(score1))

  const score2 = yield* playLevel2()
  yield put(showScore(score2))

  const score3 = yield* playLevel3()
  yield put(showScore(score3))
}
```

Subsequent `(g = game()).next()` will come from `(p = playLevelX()).next()`.

Longer version: `g.next() === game().next()` from `p.next() === playLevel()[@@iterator]().next() === playLevel().next()`.

> Yielding to an array of nested generators will start all the sub-generators in parallel, wait for them to finish, then resume with all the results

The keyword here is **nested**. I believe this means as seen

```js
function* mainSaga(getState) {
  const results = yield [call(task1), call(task2), call(taskN)]
  yield put(showResults(results))
}
```

In a previous example the rootSaga took an array of generator objects. Here its taking an array of effects. What does this mean?

> In fact, yielding Sagas is no different than yielding other effects (future actions, timeouts, etc). This means you can combine those Sagas with all the other types using the effect combinators.

???

> `yield cancel(task)` will trigger a cancellation on `subtask`, which in turn will trigger a cancellation on `subtask2`.

```js
function* main() {
  const task = yield fork(subtask)
  // ...
  // later
  yield cancel(task)
}

function* subtask() {
  // ...
  yield call(subtask2) // currently blocked on this call
  // ...
}

function* subtask2() {
  // ...
  yield call(someApi) // currently blocked on this call
  // ...
}
```

> Cancellation propagates downward. [...] Returned values and uncaught errors propagates upward

Makes sense.

> cancellation propagates [as well to] joiners of a task

Don't know what a `join` effect does yet.

> `yield cancel(task)` doesn't wait for the cancelled task to finish

> A Saga terminates only after it terminates its own body of instructions and all attached forks are themselves terminated

A Saga will block its caller until any forks it created have finished, and it has finished its own body.

Small clarification: maybe its body is already finished (no more statements left to execute). But it won't "return" to its parent until the forks are done.

> [Forks are like parallel tasks]

These two snippets are equivalent

```js
yield fork(saga1);
yield fork(saga2);
yield call(saga3);

// vs

yield [call(saga2), call(saga2), call(saga3)]; // aka parallel EFfect
```

> uncaught error will cause the parallel Effect to cancel all the other pending Effects.

If one fails, all others are cancelled.

> a Saga aborts as soon as its main body of instructions throws an error or an uncaught error was raised by one of its attached forks.

Aaaaand the error value of the parent will be the same as that uncaught by a child. Just to be clear, failed fork => failed parent w/ same error code => parent can't catch fork child's error => error caught by parent of first blocking saga in ancestry.

> Detached forks live in their own execution context. [...] Detached forks behave like root Sagas.

> Channels generalize [`take` and `put`] Effects to communicate with external event sources or between Sagas themselves.

Don't really understand how this explanation is useful. I can't make much sense of this from what I've seen up to now. This is misplaced

However, what is important, is knowing that this section is going to talk about

* `actionChannel` Effect
* `eventChannel` factory
* `channel` factory

> Canonical example [of **watch-and-fork** pattern]

```js
import { take, fork } from 'redux-saga/effects'

function* watchRequests() {
  while (true) {
    const { payload } = yield take('REQUEST')
    yield fork(handleRequest, payload)
  }
}
```

This watcher saga forks a worker saga each time a `'REQUEST'`action is dispatched.

> `redux-saga` provides a helper Effect `actionChannel` [that will] process [actions] serially

`actionChannel` will not process the next received action until done with the previous by queuing incoming actions.

> rewrite

```js
import { take, actionChannel, call, ... } from 'redux-saga/effects'

function* watchRequests() {
  // 1- Create a channel for request actions
  const requestChan = yield actionChannel('REQUEST')
  while (true) {
    // 2- take from the channel
    const { payload } = yield take(requestChan)
    // 3- Note that we're using a blocking call
    yield call(handleRequest, payload)
  }
}
```

`take` ensures that the Saga is blocked until a new action arrives, and `call` ensures that the Saga is blocked while processing the current action.

> [The] `eventChannel` [factory] creates a Channel for events from event sources other than the Redux Store

And here I stopped taking notes on channels

# Recipes

Will talk about four recipes

* Throttling
* Debouncing
* Retrying XHR calls
* Undo

## Throttling

```js
import { throttle } from 'redux-saga'

function* handleInput(input) {
  // ...
}

function* watchInput() {
  yield throttle(500, 'INPUT_CHANGED', handleInput, ...args)
}
```

`handleInput` will fire at most once every 500ms period *and* it guarantees that the **trailing action will be processed**.

## Debouncing

> To debounce a sequence, put the `delay` in the forked task

and cancel it if a new action arrives before the delay finishes.

```js
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

function* handleInput(input) {
  // debounce by 500ms
  yield call(delay, 500)
  // ...
}

function* watchInput() {
  let task
  while (true) {
    const { input } = yield take('INPUT_CHANGED')
    if (task) {
      yield cancel(task)
    }
    task = yield fork(handleInput, input)
  }
}
```

> Example above could be rewritten with `redux-saga` `takeLatest` helper:


```js
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

function* handleInput({ input }) {
  // debounce by 500ms
  yield call(delay, 500)
  ...
}

function* watchInput() {
  // will cancel current running handleInput task
  yield takeLatest('INPUT_CHANGED', handleInput);
}
```

## Retrying XHR calls

> use a for loop with a delay:

```js
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

function* updateApi(data) {
  for(let i = 0; i < 5; i++) {
    try {
      const apiResponse = yield call(apiRequest, { data });
      return apiResponse;
    } catch(err) {
      if(i < 5) {
        yield call(delay, 2000);
      }
    }
  }
  // attempts failed after 5x2secs
  throw new Error('API request failed');
}

export default function* updateResource() {
  while (true) {
    const { data } = yield take('UPDATE_START');
    try {
      const apiResponse = yield call(updateApi, data);
      yield put({
        type: 'UPDATE_SUCCESS',
        payload: apiResponse.body,
      });
    } catch (error) {
      yield put({
        type: 'UPDATE_ERROR',
        error
      });
    }
  }
}
```

Furthermore, by using `takeLatest` and an `'UPDATE_RETRY'` we can continue to retry while informing the user.

```js
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

function* updateApi(data) {
  while (true) {
    try {
      const apiResponse = yield call(apiRequest, { data });
      return apiResponse;
    } catch(error) {
      yield put({
        type: 'UPDATE_RETRY',
        error
      })
      yield call(delay, 2000);
    }
  }
}

function* updateResource({ data }) {
  const apiResponse = yield call(updateApi, data);
  yield put({
    type: 'UPDATE_SUCCESS',
    payload: apiResponse.body,
  });
}

export function* watchUpdateResource() {
  yield takeLatest('UPDATE_START', updateResource);
}
```

## Undo

The undo strategy discussed here is a one-time undo implemented purely in sagas using `delay` and `cancel`. It does not use `redux-store` to implement this version of undo.

```js
import {  take, put, call, fork, cancel, cancelled } from 'redux-saga/effects'
import { takeEvery, delay } from 'redux-saga'
import { updateThreadApi, actions } from 'somewhere'

function* onArchive() {
  try {
      const thread = { id: 1337, archived: true }
      // show undo UI element
      yield put(actions.showUndo())
      // optimistically mark the thread as `archived`
      yield put(actions.updateThread(thread))
      // allow user time to active the undo action
      yield call(delay, 5000)
      // hide undo UI element
      yield put(actions.hideUndo())
      // make the API call to apply the changes remotely
      yield call(updateThreadApi, thread)
  } finally {
    if (yield cancelled()) {
      // revert thread to previous state
      yield put(actions.updateThread({ id: 1337, archived: false }))
    }
  }
}

function* main() {
  while (true) {
    // listen for every `ARCHIVE_THREAD` action in a non-blocking manner.
    const onArchiveTask = yield takeEvery(ARCHIVE_THREAD, onArchive)
    // wait for the user to activate the undo action;
    yield take(UNDO)
    // and then cancel the fetch task
    yield cancel(onArchiveTask)
  }
}
```

Remember that `takeEvery` returns the object to cancel the task.

# What is the middleware prepared to receive, and how does it deal with what it receives

```js
function* gen() {
  var variable = yield exp1;
  //             ^--exp2--^

  /*
  exp1 aka
    yield operand
    yield operand expression
    yield argument
    yield argument expression
    yield X value
  exp2 aka
    yield expression
    yield expression value
    yield value
  */
}
```

Everything that happens starts with the root generator. This root generator is the entry point to configure the middleware. The `.run()` function runs through the generator, so it must be made to have a non-infinite body, or else the app will stall.

Next, the root the root app can `yield` objects, and the middleware treats these no differently than objects yielded by "child" generators.

**Object (POJO)** objects constructed in a particual way are understood by the middleware as instructions to execute. These interpreted objects, in Saga parlance, are called **Effects**. Some effects instruct to run **blocking calls**, meaning that newly dispatched actions are not processed by the generator that yields them. If it receives an object that it is unable to interpret, it will simply return the object as the yield value.

For testing purposes, it is recommended that only POJOs be yielded.

**Promise** waits for the promise to complete. On completion, calls `.next(value)` if fulfilled or `.throw(error)` if rejected. Therefore, yielding a Promise blocks the generator.

**Function** (non-generator function) executes the function and passes its return value to the parent generator `.next(func())`.

**Object (Generator)** Generator objects are run to completion. Just as expected.

**Array** Values in array are processed in parallel. If they are Effects, they are interpreted and processed.

**Note on return values** When a function returns, generator or otherwise, the return value is given to parent generator `.next(ret_val)`.

**Note on using yield\***
As far as the middleware is concerned, it is as if the yielded generator's body was in its parent.

# Tutorials

Ported tutorials from redux

## counter-vanilla

Webpack can be inserted as middleware in Express, so no need for an additional port.

Uses a utility called `sagaMonitor`.

[The sagaMonitor interface][sagamonitor]

Can be activated/added with
```js
const sagaMiddleware = createSagaMiddleware({sagaMonitor})
```

To see the history of actions processed by Saga middleware, type `$$LogSagas()`. It is not a live logger.

Discussion of Saga logger on github.
## counter
## cancellable-counter
## Shopping Cart example
## async example

<!-- link sources -->

[mdn-iterables]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Iteration_protocols
[1]: http://gajus.com/blog/2/the-definitive-guide-to-the-javascript-generators
[2]: https://davidwalsh.name/es6-generators
[3]: http://www.2ality.com/2015/03/es6-generators.html
[beginnertut]: https://yelouafi.github.io/redux-saga/docs/introduction/BeginnerTutorial.html
[post]: http://stackoverflow.com/questions/33947850
[sagamonitor]: https://yelouafi.github.io/redux-saga/docs/api/index.html#sagamonitor

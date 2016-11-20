# Promises

Notes from https://promisesaplus.com/

> `then` may be called multiple times on the same promise.

```js
function iReturnAPromise() {/*...*/}

var p = iReturnAPromise()

p.then(() => (/*...*/), () => (/*...*/)) // onFulfilled1 onRejected1
p.then(() => (/*...*/), () => (/*...*/)) // onFulfilled2 onRejected2
```

> `then` must return a promise.

```js
promise2 = promise1.then(onFulfilled, onRejected);
```

> If either `onFulfilled` or `onRejected` returns a value `x`, run the Promise Resolution Procedure `[[Resolve]](promise2, x)`

> If either `onFulfilled` or `onRejected` throws an exception `e`, `promise2` must be rejected with `e` as the reason.

> If `onFulfilled` is not a function and `promise1` is fulfilled, `promise2` must be fulfilled with the same value as `promise1`.

> If `onRejected` is not a function and `promise1` is rejected, `promise2` must be rejected with the same reason as `promise1`.

Promise resolution procedure `[[Resolve]](promise, x)`:

> If `x` is a thenable, it attempts to make `promise` adopt the state of `x`, under the assumption that `x` behaves at least somewhat like a promise. Otherwise, it fulfills `promise` with the value `x`.

# Button to remove auth info

Type:

```js
export const REMOVE_AUTH_INFO = 'REMOVE_AUTH_INFO'
```

Action Creator:

```js
export function removeAuthInfo() {
  return {
    type: REMOVE_AUTH_INFO,
  }
}
```

Reducer:

```js
function reducer(state, action) {
  switch action.type {
    case 'REMOVE_AUTH_INFO': {
      return {isAuthenticated: false}
    }
  }
}

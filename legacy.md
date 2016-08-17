# What to study
React : v
React Router
React Redux



# Legacy

CommonJS
Imports
Bundling
Reducers
Webpack

# Objective: find where to put the chat

Component structure, starts with `Root`
* Provider
 * Router

# Routing
Packages for routing: `react-router` and `react-router-redux`. Usage:
```js
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);
```

Names specified in packages: `browserHistory`, `syncHistoryWithStore`.

# Look into
* `const` keyword: how does it affect variables of primitive and non-primitive values.

A few tricks learned:

# Making classes conditional
```js
<div className={this.props.someVale ? "large" : "normal"}
```
# Making children conditional
```js
{!isAuthenticated &&
  <Login
    errorMessage={errorMessage}
    onLoginClick={creds => dispatch(loginUser(creds))}
  />
}

{isAuthenticated &&
  <Logout onLogoutClick={() => dispatch(logoutUser())} />
}
```
# ownProps
Refers to the props passed to a container component. If `<Container />` was created with `connect()`, then calling it with the props
```js
<Container msg="Hello World!" />
```
Will make msg available in `ownProps` in `mapXToProps`:

```js
const mapStateToProps = (state, ownProps) => {
  return {
    mostCommonGreeting: ownProps.msg // Hello World!
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  // also available here! ownProps.msg == "Hello World!"
  return {};
};
```

# Children of containers must be declared in components
Container usage with children:
```jsx
<Container>
  <p>Went for a morning run, then coded!</p>
</Container>
```

Container definition with `connect()`:
```jsx
import Component from './Component';
const mapStateToProps = (state, ownProps) => ({});
const mapDispatchToProps = (dispatch, ownProps) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Component);
```

Component definition:
```jsx
const Component = ({children}) => (
  <div>
    <h1>Today's summary</h1>
    {children}
  </div>
)
```

# Thunk
By using this specific middleware, an action creator can **return a function** instead of an action object. This way, the action creator becomes a **thunk**.

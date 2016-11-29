# Sane approach to modals

Objectives:

* Have a generic ok/cancel modal
* Have a consistent look and feel across all modals

# Try 1

Will focus on generic ok/cancel modal

```js
<OkCancel />

class OkCancel extends Component {
  render() {
    const { headerText, bodyText, yesAction, cancelAction } = this.props
    return (
      <div>
        <div className="header">{headerText}</div>
        <div className="body">{bodyText}</div>
        <button onClick={yesAction}>Yes</button>
        <button onClick={cancelAction}>Cancel</button>
      </div>
    )
  }
}
```

Somewhere

yes/no dispatches action to say yes which will then be intercepted by the approprite saga.

```js

function* flow() {
  yield take(action0)
  yield put(action1)
  yield fork(something)
  yield take(cancel)
  var response = yield call(showModalX, "header text", "body text")
  if (response) {
    // ... do stuff
  } else {
    // ... do other stuff
  }
}

function* showModalX(header, body) {
  put({type: 'SHOW_YES_CANCEL_MODAL', header, body})
  take()
}
```

# Documentation

# Creating a Modal

1. Choose a name for your modal. Examples: "Login", "Warning", "Updates".

2. Write this name as an exported constant in [`src/client/constants/modals.js`](src/client/constants/modals.js).

3. Create a component and/or container for your modal. Files related to your component should go into `/src/client/components/modals` and/or `/src/client/containers/modals`. Note that your modal component will be inserted (we'll see how later) inside another component already taking care of basic modal appearance and functionality (gray transparent backdrop, fade-in animation, and full screen). Your modal will be the body of this already provided modal.

3. Create a component and/or container for your modal. Files related to your component should go into `/src/client/components/modals` and/or `/src/client/containers/modals`. Note that your modal will be the child of another component that already takes care of basic modal appearance and functionality (gray transparent backdrop, fade-in animation, and full screen) so you can concentrate on creating the elements unique to your modal.

4. Add a named export **with the same name as the exported name constant** for your modal. If your modal is intended to be used as a **presentational component**, the named export will go in
 [`/src/client/components/modals/index.js`](/src/client/components/modals/index.js).
If your modal is intended to be used as a **container component**, add the named export in [`/client/containers/modals/index.js`](/client/containers/modals/index.js).

Thats it! To show and hide modal, dispatch actions with the following signature:

```js
dispatch({
  type: 'SHOW_MODAL',
  payload: {
    name: '<MODAL_NAME>', // Same name defined in constants file
    props: '<MODAL_PROPS>' // Data potentially used by modal
  }
})

dispatch({
  type: 'HIDE_MODAL',
})
```

The props object, if supplied, will be passed to your modal,

```js
render() {
  return (
    <div>
      <YourModal {...props}
    </div>
  )
}
```

# How it works

```js
import modalComponents from '/src/client/components/modals'
import modalContainers from '/src/client/containers/modals'
import modalNames from '/src/client/constants/modals'

// contains all classes/functions of modal containers/componets
// assuming containers take precedence over components with same name
const modals = {...modalComponents, ...modalContainers}

class Modal extends Component {
  componentDidMount() {

  }
  componentWillUnmount() {

  }
  render() {
    const { name } = this.props
    const ModalToDisplay = modals[name]
    return {ModalToDisplay && <ModalToDisplay />}
  }
}
```

## Removing a Modal

1. Remove the modal name from `/client/constants/modals.js`.
2. Delete the modal's named exports (if existing) from `src/client/components/modals/index.js`.
2. Delete the modal's named exports (if existing) from `src/client/containers/modals/index.js`.
2. Delete the modal's component and/or container directories.
3. Delete any sagas involving this modal.

The Modal component is desigend to be located somewhere near the root of the document. This is because it By at the top, we mean not deeply nested, or with an ancestor at coords 0,0 to be relative. If none exist, the <html> tag itself will work, but if it's deeply nested and there is an ancestor with its top left corner not at position 0,0, then it not be easy to align.

Why? because it is very hard to make a deeply nested element fill the entire screen: it would require

The suggested css to apply to the top-most div of the modal element is something like

```css
.modal {
  position: fixed;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(215, 215, 215, 0.7)
}
```

that goes with the modal component

```js
class Modal extends Component {
  render() {
    return (
      <div className="modal">
      </div>
    )
  }
}
```

This only creates a component that occupies the entire visible screen area. Next, we will want to add some content. occupy the entire screen and have a typical gray, semi-transparent background.

Next, we will want to display

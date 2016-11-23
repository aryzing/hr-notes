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

## TL;DR Creating a Modal

1. Chose a name for your modal. Examples: "Login", "Warning", "Updates".
2. Write this name as an exported constant in file `/client/constants/modals.js`
3. Create a component and/or container for the modal content. This content will be inserted (we'll see how later) inside another component already taking care of basic modal appearance and functionality (gray transparent backdrop, fade-in animation, and full screen) so you don't have to worry about that.
3. Add your modal component and/or container as a named export **with the same name as the exported name constant** in `/client/components/modals/index.js` and/or `/client/containers/modals/index.js`. [Clarifying Note].

3.not Take a quick look at the imports of file `/client/components/Modal/Modal.jsx`. It imports both the constants where we named our modal, as well as the modals

```js
import modalComponents from '/src/client/components/modals'
import modalContainers from '/src/client/containers/modals'

// contains all classes/functions of modal containers/componets
// assuming containers take precedence over components with same name
const modals = {...modalComponents, ...modalContainers}
```

<a name="note"></a>
**Clarifying note** If your modal only has a comp
## TL;DR Removing a Modal

1. Remove the modal name from `/client/constants/modals.js`.
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

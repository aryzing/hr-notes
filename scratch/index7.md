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

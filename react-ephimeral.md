# React Ephimeral

The state of a react element is maintained as long as it's class is maintained.

When "re-rendering", a given component maintains it's state if the class that governs its rendering is identical `===` to that in the previous render.

A component only "re-renders" when it's state changes.

```js
import React, { Component } from 'react'

function Factory(i) {
  return class Ephimeral extends Component {
    constructor() {
      super()

      this.state = {
        number: i
      }

      this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
      this.setState({
        number: this.state.number + 1
      })
    }

    render() {
      return (
        <div>
          <div>Number: {this.state.number}</div>
          <div onClick={this.handleClick}>Increment Number</div>
        </div>
      )
    }
  }
}

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      version: 0
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState({
      version: this.state.version + 1
    })
  }

  render() {
    return (
      <div>
        <div>Version: {this.state.version}</div>
        {React.createElement(Factory(this.state.version))}
        <div onClick={this.handleClick}>Increment Version</div>
      </div>
    )
  }
}
```

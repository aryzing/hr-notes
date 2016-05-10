class WillItBreak extends React.Component {
  constructor() {
    super()
  }
  render() {
    return (
      <div>
        <h1>Do you think this will break?</h1>
        <Chicken />
      </div>
    );
  }
}

class Chicken extends React.Component {
  constructor() {
    super()
  }
  render() {
    return (
      <div>
        <p>The chicken lays an:</p>
        <Egg />
      </div>
    );
  }
}
class Egg extends React.Component {
  constructor() {
    super()
  }
  render() {
    return (
      <div>
        <p>The egg turns into a:</p>
        <Chicken />
      </div>
    );
  }
}

ReactDOM.render(<WillItBreak />, document.getElementById('app'));

// spoiler: it does break

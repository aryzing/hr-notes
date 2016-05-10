class Inner extends React.Component {
  render() {
    return (
      <p>test</p>
    );
  }
}

class Outer extends React.Component {
  render() {
    var paragraphs = [];
    for (var i = 0; i < 4; i++) {
      paragraphs.push(<Inner key={i}/>);
    }
    var result = (
      <div>
        {paragraphs}
        <NoExtend />
      </div>
    );
    return result;
  }
}

class NoExtend {
  render() {
    return (
      <p>Was not extended</p>
    );
  }
}

ReactDOM.render(<Outer />, document.getElementById('app'));

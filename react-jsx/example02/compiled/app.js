'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WillItBreak = function (_React$Component) {
  _inherits(WillItBreak, _React$Component);

  function WillItBreak() {
    _classCallCheck(this, WillItBreak);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(WillItBreak).call(this));
  }

  _createClass(WillItBreak, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'h1',
          null,
          'Do you think this will break?'
        ),
        React.createElement(Chicken, null)
      );
    }
  }]);

  return WillItBreak;
}(React.Component);

var Chicken = function (_React$Component2) {
  _inherits(Chicken, _React$Component2);

  function Chicken() {
    _classCallCheck(this, Chicken);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Chicken).call(this));
  }

  _createClass(Chicken, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'p',
          null,
          'The chicken lays an:'
        ),
        React.createElement(Egg, null)
      );
    }
  }]);

  return Chicken;
}(React.Component);

var Egg = function (_React$Component3) {
  _inherits(Egg, _React$Component3);

  function Egg() {
    _classCallCheck(this, Egg);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Egg).call(this));
  }

  _createClass(Egg, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'p',
          null,
          'The egg turns into a:'
        ),
        React.createElement(Chicken, null)
      );
    }
  }]);

  return Egg;
}(React.Component);

ReactDOM.render(React.createElement(WillItBreak, null), document.getElementById('app'));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2FwcC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNLFc7OztBQUNKLHlCQUFjO0FBQUE7O0FBQUE7QUFFYjs7Ozs2QkFDUTtBQUNQLGFBQ0U7QUFBQTtRQUFBO1FBQ0U7QUFBQTtVQUFBO1VBQUE7QUFBQSxTQURGO1FBRUUsb0JBQUMsT0FBRDtBQUZGLE9BREY7QUFNRDs7OztFQVh1QixNQUFNLFM7O0lBYzFCLE87OztBQUNKLHFCQUFjO0FBQUE7O0FBQUE7QUFFYjs7Ozs2QkFDUTtBQUNQLGFBQ0U7QUFBQTtRQUFBO1FBQ0U7QUFBQTtVQUFBO1VBQUE7QUFBQSxTQURGO1FBRUUsb0JBQUMsR0FBRDtBQUZGLE9BREY7QUFNRDs7OztFQVhtQixNQUFNLFM7O0lBYXRCLEc7OztBQUNKLGlCQUFjO0FBQUE7O0FBQUE7QUFFYjs7Ozs2QkFDUTtBQUNQLGFBQ0U7QUFBQTtRQUFBO1FBQ0U7QUFBQTtVQUFBO1VBQUE7QUFBQSxTQURGO1FBRUUsb0JBQUMsT0FBRDtBQUZGLE9BREY7QUFNRDs7OztFQVhlLE1BQU0sUzs7QUFjeEIsU0FBUyxNQUFULENBQWdCLG9CQUFDLFdBQUQsT0FBaEIsRUFBaUMsU0FBUyxjQUFULENBQXdCLEtBQXhCLENBQWpDIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFdpbGxJdEJyZWFrIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKVxuICB9XG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGgxPkRvIHlvdSB0aGluayB0aGlzIHdpbGwgYnJlYWs/PC9oMT5cbiAgICAgICAgPENoaWNrZW4gLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuY2xhc3MgQ2hpY2tlbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKClcbiAgfVxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxwPlRoZSBjaGlja2VuIGxheXMgYW46PC9wPlxuICAgICAgICA8RWdnIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5jbGFzcyBFZ2cgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpXG4gIH1cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8cD5UaGUgZWdnIHR1cm5zIGludG8gYTo8L3A+XG4gICAgICAgIDxDaGlja2VuIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblJlYWN0RE9NLnJlbmRlcig8V2lsbEl0QnJlYWsgLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKSk7XG4iXX0=
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Inner = function (_React$Component) {
  _inherits(Inner, _React$Component);

  function Inner() {
    _classCallCheck(this, Inner);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Inner).apply(this, arguments));
  }

  _createClass(Inner, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'p',
        null,
        'test'
      );
    }
  }]);

  return Inner;
}(React.Component);

var Outer = function (_React$Component2) {
  _inherits(Outer, _React$Component2);

  function Outer() {
    _classCallCheck(this, Outer);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Outer).apply(this, arguments));
  }

  _createClass(Outer, [{
    key: 'render',
    value: function render() {
      var paragraphs = [];
      for (var i = 0; i < 4; i++) {
        paragraphs.push(React.createElement(Inner, { key: i }));
      }
      var result = React.createElement(
        'div',
        null,
        paragraphs,
        React.createElement(NoExtend, null)
      );
      return result;
    }
  }]);

  return Outer;
}(React.Component);

var NoExtend = function () {
  function NoExtend() {
    _classCallCheck(this, NoExtend);
  }

  _createClass(NoExtend, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'p',
        null,
        'Was not extended'
      );
    }
  }]);

  return NoExtend;
}();

ReactDOM.render(React.createElement(Outer, null), document.getElementById('app'));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2FwcC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNLEs7Ozs7Ozs7Ozs7OzZCQUNLO0FBQ1AsYUFDRTtBQUFBO1FBQUE7UUFBQTtBQUFBLE9BREY7QUFHRDs7OztFQUxpQixNQUFNLFM7O0lBUXBCLEs7Ozs7Ozs7Ozs7OzZCQUNLO0FBQ1AsVUFBSSxhQUFhLEVBQWpCO0FBQ0EsV0FBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLENBQXBCLEVBQXVCLEdBQXZCLEVBQTRCO0FBQzFCLG1CQUFXLElBQVgsQ0FBZ0Isb0JBQUMsS0FBRCxJQUFPLEtBQUssQ0FBWixHQUFoQjtBQUNEO0FBQ0QsVUFBSSxTQUNGO0FBQUE7UUFBQTtRQUNHLFVBREg7UUFFRSxvQkFBQyxRQUFEO0FBRkYsT0FERjtBQU1BLGFBQU8sTUFBUDtBQUNEOzs7O0VBYmlCLE1BQU0sUzs7SUFnQnBCLFE7Ozs7Ozs7NkJBQ0s7QUFDUCxhQUNFO0FBQUE7UUFBQTtRQUFBO0FBQUEsT0FERjtBQUdEOzs7Ozs7QUFHSCxTQUFTLE1BQVQsQ0FBZ0Isb0JBQUMsS0FBRCxPQUFoQixFQUEyQixTQUFTLGNBQVQsQ0FBd0IsS0FBeEIsQ0FBM0IiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgSW5uZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxwPnRlc3Q8L3A+XG4gICAgKTtcbiAgfVxufVxuXG5jbGFzcyBPdXRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICB2YXIgcGFyYWdyYXBocyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICBwYXJhZ3JhcGhzLnB1c2goPElubmVyIGtleT17aX0vPik7XG4gICAgfVxuICAgIHZhciByZXN1bHQgPSAoXG4gICAgICA8ZGl2PlxuICAgICAgICB7cGFyYWdyYXBoc31cbiAgICAgICAgPE5vRXh0ZW5kIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn1cblxuY2xhc3MgTm9FeHRlbmQge1xuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxwPldhcyBub3QgZXh0ZW5kZWQ8L3A+XG4gICAgKTtcbiAgfVxufVxuXG5SZWFjdERPTS5yZW5kZXIoPE91dGVyIC8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJykpO1xuIl19
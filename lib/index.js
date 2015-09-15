'use strict';

var ReactPgr = React.createClass({
  displayName: 'ReactPgr',

  propTypes: {
    pages: React.PropTypes.number.isRequired,
    visible: React.PropTypes.number,
    onChange: React.PropTypes.func.isRequired
  },
  componentDidUpdate: function componentDidUpdate(props, state) {
    if (props.current !== this.state.current) {
      this.props.onChange(this.state.current);
    }
  },
  getDefaultProps: function getDefaultProps() {
    return {
      visible: 5
    };
  },
  getInitialState: function getInitialState() {
    return {
      current: 1
    };
  },
  selectPage: function selectPage(page, event) {
    if (event) {
      event.preventDefault();
    }
    this.setState({ current: page });
  },
  onNext: function onNext(event) {
    event.preventDefault();
    if (this.state.current) {
      this.selectPage(this.state.current + 1);
    }
  },
  onPrevious: function onPrevious(event) {
    event.preventDefault();
    if (this.state.current > 1) {
      this.selectPage(this.state.current - 1);
    }
  },
  iterator: function iterator(currentStep) {
    return Array.apply(null, Array(this.props.visible)).map(function (x, index) {
      return currentStep + index + 1;
    });
  },
  render: function render() {
    var currentStep = 0,
        pageNumbers = [];

    if (this.state.current > this.props.visible && this.state.current < this.props.pages) {
      currentStep = this.state.current - this.props.visible + 1;
    } else if (this.state.current === this.props.pages) {
      currentStep = this.state.current - this.props.visible;
    }

    pageNumbers = this.iterator(currentStep);

    return React.createElement(
      'ul',
      { className: 'pagination' },
      React.createElement(
        'li',
        { className: this.state.current === 1 ? 'disabled' : '' },
        React.createElement(
          'a',
          { href: '#', onClick: this.onPrevious },
          React.createElement(
            'span',
            { 'aria-hidden': 'true' },
            '«'
          )
        )
      ),
      pageNumbers.map(function (page) {
        return React.createElement(
          'li',
          { key: page,
            className: this.state.current === page ? 'active' : '' },
          React.createElement(
            'a',
            { href: '#' },
            page
          )
        );
      }, this),
      React.createElement(
        'li',
        { className: this.state.current === this.props.pages ? 'disabled' : '' },
        React.createElement(
          'a',
          { href: '#', onClick: this.onNext },
          React.createElement(
            'span',
            { 'aria-hidden': 'true' },
            '»'
          )
        )
      )
    );
  }
});
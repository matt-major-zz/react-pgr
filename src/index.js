var ReactPgr = React.createClass({
  propTypes: {
    pages: React.PropTypes.number.isRequired,
    visible: React.PropTypes.number,
    onChange: React.PropTypes.func.isRequired
  },
  /**
   * Run when the DOM Component is flushed
   *
   * @param {*} props - The Previous Props of the Component
   * @param {*} state - The Previous State of the Component
   */
  componentDidUpdate: function (props, state) {
    if ( props.current !== this.state.current ) {
      this.props.onChange(this.state.current);
    }
  },
  /**
   * Get the Default Props for the Component
   */
  getDefaultProps: function () {
    return {
      visible: 5
    };
  },
  /**
   * Get the Initial State of the Component
   */
  getInitialState: function () {
    return {
      current: 1
    };
  },
  /**
   * Set the Page Selected
   *
   * @param {number} page - The Page Number
   * @param {*} event - The Page Change Event
   */
  selectPage: function (page, event) {
    if ( event ) {
      event.preventDefault();
    }
    this.setState({current: page});
  },
  /**
   * Trigger the Next Page
   *
   * @param {*} event - The Page Change Event
   */
  onNext: function (event) {
    event.preventDefault();
    if ( this.state.current ) {
      this.selectPage(this.state.current + 1);
    }
  },
  /**
   * Trigger the Previous Page
   *
   * @param {*} event - The Page Change Event
   */
  onPrevious: function (event) {
    event.preventDefault();
    if ( this.state.current > 1 ) {
      this.selectPage(this.state.current - 1);
    }
  },
  /**
   * Generate the Available Page Numbers
   *
   * @param {number} currentStep - The Current Step of the Component to Interate From
   */
  iterator: function (currentStep) {
    return Array.apply(null, Array(this.props.visible)).map(function (x, index) {
      return currentStep + index + 1;
    });
  },
  /**
   * Render the Component
   */
  render: function () {
    var currentStep = 0,
        pageNumbers = [];

    if ( this.state.current > this.props.visible && this.state.current < this.props.pages ) {
      currentStep = this.state.current - this.props.visible + 1;
    } else if ( this.state.current === this.props.pages ) {
      currentStep = this.state.current - this.props.visible;
    }

    pageNumbers = this.iterator(currentStep);

    return(
      <ul className={'pagination'}>
        <li className={this.state.current === 1 ? 'disabled' : ''}>
          <a href="#" onClick={this.onPrevious}>
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {pageNumbers.map(function (page) {
          return (
            <li key={page}
                className={this.state.current === page ? 'active' : ''}>
              <a href="#">{page}</a>
            </li>
          );
        }, this)}
        <li className={this.state.current === this.props.pages ? 'disabled' : ''}>
          <a href="#" onClick={this.onNext}>
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    );
  }
});

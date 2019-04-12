import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WaterfallViz from '../WaterfallViz';
import WaterfallConfig from '../WaterfallConfig';

class WaterfallContainer extends Component {
  state = {
    displayConfig: true,
    country: null,
    group: null,
    year: null,
  };

  toggleView = () => {
    this.setState(state => ({ displayConfig: !state.displayConfig }));
  };

  handleChange = diff => {
    this.setState({ ...diff });
  };

  render() {
    return (
      <div>
        <span>
          <button
            onClick={this.toggleView}
            type="primary"
            shape="circle"
            icon="search"
          >
            switch
          </button>
        </span>
        {this.state.displayConfig ? (
          <WaterfallConfig handleChange={this.handleChange} />
        ) : (
          <WaterfallViz {...this.props} />
        )}
      </div>
    );
  }
}

WaterfallContainer.propTypes = {};

export default WaterfallContainer;

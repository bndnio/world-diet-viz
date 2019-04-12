import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WaterfallViz from '../WaterfallViz';
import WaterfallConfig from '../WaterfallConfig';

class WaterfallContainer extends Component {
  state = {
    country: null,
    group: null,
    year: null,
  };

  handleChange = diff => {
    this.setState({ ...diff });
  };

  render() {
    return (
      <div>
        WaterfallContainer
        <WaterfallConfig />
        <WaterfallViz {...this.props} />
      </div>
    );
  }
}

WaterfallContainer.propTypes = {};

export default WaterfallContainer;

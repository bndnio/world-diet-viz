import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WaterfallViz from '../WaterfallViz';

class WaterfallContainer extends Component {
  render() {
    return (
      <div>
        WaterfallContainer
        <WaterfallViz {...this.props} />
      </div>
    );
  }
}

WaterfallContainer.propTypes = {};

export default WaterfallContainer;

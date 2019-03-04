import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withData } from '../../DataContext/withData';

class SimpleViz extends Component {
  render() {
    return <div>I'm a SimpleViz!</div>;
  }
}

SimpleViz.propTypes = {};

export default withData(SimpleViz);

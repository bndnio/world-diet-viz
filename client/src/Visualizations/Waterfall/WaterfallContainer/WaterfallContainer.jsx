import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withData } from '../../../Contexts/DataContext/withData';
import WaterfallViz from '../WaterfallViz';
import WaterfallConfig from '../WaterfallConfig';

class WaterfallContainer extends Component {
  state = {
    displayConfig: true,
    country: null,
    group: null,
    year: null,
    data: [],
  };

  toggleView = () => {
    this.setState(state => ({ displayConfig: !state.displayConfig }));
  };

  handleChange = diff => {
    this.setState({ ...diff });
    const { country, group, year } = { ...this.state, ...diff };

    let nextData = null;
    if (!!country && !!group && !!year) {
      nextData = this.props.data.data.map(d => [
        d.year,
        d.countries
          .filter(c => c.country === country)[0]
          .items.filter(item => item.name === group)[0].value,
      ]);
    }
    this.setState({ data: nextData });
  };

  render() {
    const { data, ...config } = this.state;
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
          <WaterfallConfig handleChange={this.handleChange} {...config} />
        ) : (
          <WaterfallViz {...this.props} data={data} />
        )}
      </div>
    );
  }
}

WaterfallContainer.propTypes = {};

export default withData(WaterfallContainer);

import React, { Component } from 'react';
import { withData } from '../../../Contexts/DataContext/withData';
import WaterfallViz from '../WaterfallViz';
import WaterfallConfig from '../WaterfallConfig';

class WaterfallContainer extends Component {
  state = {
    displayConfig: true,
    country: null,
    group: null,
    data: [],
  };

  componentDidUpdate(prevProps) {
    if (prevProps.data.data !== this.props.data.data) this.filterData();
  }

  toggleView = () => {
    this.setState(state => ({ displayConfig: !state.displayConfig }));
  };

  handleChange = async diff => {
    await this.setState({ ...diff });
    this.filterData();
  };

  filterData = () => {
    const { country, group } = this.state;
    let nextData = [];
    if (!!country && !!group) {
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
          <WaterfallViz {...this.props} {...config} data={data} />
        )}
      </div>
    );
  }
}

WaterfallContainer.propTypes = {};

export default withData(WaterfallContainer);

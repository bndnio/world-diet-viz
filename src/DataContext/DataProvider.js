import * as React from 'react';
import { DataContext } from './data-context';

export default class DataProvider extends React.Component {
  constructor() {
    super();
    this.state = {
      setDate: this.setData,
      allData: [],
    };
  }

  setData = nextData => {
    // save data to state
    this.setState({ ...nextData });
  };

  render() {
    return (
      <DataContext.Provider value={this.state}>
        {this.props.children}
      </DataContext.Provider>
    );
  }
}

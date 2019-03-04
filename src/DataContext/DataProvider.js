import * as React from 'react';
import { DataContext } from './theme-context';

export default class ThemeProvider extends React.Component {
  constructor() {
    super();
    this.state = {
      setDate: this.setData,
      allData: [],
    };
  }

  setData = ({ nextData }) => {
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

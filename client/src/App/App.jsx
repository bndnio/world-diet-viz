import React, { Component } from 'react';
import './App.css';
import VisualizationContainer from '../Components/VisualizationContainer';
import DataProvider from '../Contexts/DataContext/DataProvider';

class App extends Component {
  render() {
    return (
      <DataProvider>
        <div className="App">
          <VisualizationContainer />
        </div>
      </DataProvider>
    );
  }
}

export default App;

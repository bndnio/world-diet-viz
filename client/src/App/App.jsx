import React, { Component } from 'react';
import './App.css';
import VisualizationContainer from '../Components/VisualizationContainer';
import DataProvider from '../Contexts/DataContext/DataProvider';
import InteractionProvider from '../Contexts/InteractionContext/InteractionProvider';

class App extends Component {
  render() {
    return (
      <DataProvider>
        <InteractionProvider>
          <div className="App">
            <VisualizationContainer />
          </div>
        </InteractionProvider>
      </DataProvider>
    );
  }
}

export default App;

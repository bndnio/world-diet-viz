import * as React from 'react';
import { InteractionContext } from './interaction-context';

export default class InteractionProvider extends React.Component {
  constructor() {
    super();
    this.state = {
      setFields: this.setFields,
      fields: {
        availableYears: [],
        availableCountries: [],
        selectedYear: null,
        selectedCountry: null,
        hoveredYear: null,
        hoveredCountry: null,
      },
    };
  }

  setFields = nextFieldsDiff => {
    // save Interaction to state
    this.setState(state => ({
      fields: { ...state.fields, ...nextFieldsDiff },
    }));
  };

  render() {
    return (
      <InteractionContext.Provider value={this.state}>
        {this.props.children}
      </InteractionContext.Provider>
    );
  }
}

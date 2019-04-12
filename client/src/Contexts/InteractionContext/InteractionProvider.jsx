import * as React from 'react';
import { InteractionContext } from './interaction-context';

export default class InteractionProvider extends React.Component {
  constructor() {
    super();
    this.state = {
      setInteraction: this.setInteraction,
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

  setInteraction = nextInteractionDiff => {
    // save Interaction to state
    this.setState(state => ({
      interaction: { ...state.interaction, ...nextInteractionDiff },
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

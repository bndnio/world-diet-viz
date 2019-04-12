import * as React from 'react';
import { InteractionContext } from './interaction-context';

export default class InteractionProvider extends React.Component {
  constructor() {
    super();
    this.state = {
      setInteraction: this.setInteraction,
      interaction: [],
    };
  }

  setInteraction = nextInteraction => {
    // save Interaction to state
    this.setState({ interaction: nextInteraction });
  };

  render() {
    return (
      <InteractionContext.Provider value={this.state}>
        {this.props.children}
      </InteractionContext.Provider>
    );
  }
}

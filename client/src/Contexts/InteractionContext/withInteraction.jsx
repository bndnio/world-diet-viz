import * as React from 'react';
import { InteractionContext } from './interaction-context';

export function withInteraction(Component) {
  return function InteractionComponent(props) {
    return (
      <InteractionContext.Consumer>
        {interactionProps => (
          <Component {...props} interaction={interactionProps} />
        )}
      </InteractionContext.Consumer>
    );
  };
}

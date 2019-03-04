import * as React from 'react';

export const DataContext = React.createContext(
  // default values used by a Consumer when it does not have a
  // matching Provider above it in the tree, useful for testing
  {
    setData: () => {},
    allData: []
  }
);

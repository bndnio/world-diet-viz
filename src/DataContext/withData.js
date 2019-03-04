import * as React from "react";
import { DataContext } from "./data-context";

export function withData(Component) {
  return function DataComponent(props) {
    return (
      <DataContext.Consumer>
        {dataProps => <Component {...props} data={dataProps} />}
      </DataContext.Consumer>
    );
  };
}

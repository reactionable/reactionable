import { PropsWithChildren, ReactElement } from "react";
import { BrowserRouter } from "react-router-dom";
import { RouterComponentProps, RouterComponent } from "./RouterComponent";

export function BrowserRouterComponent(
  props: PropsWithChildren<RouterComponentProps>
): ReactElement {
  return (
    <BrowserRouter>
      <RouterComponent {...props} />
    </BrowserRouter>
  );
}

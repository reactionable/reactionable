import { PropsWithChildren, ReactElement } from "react";
import { MemoryRouter } from "react-router";
import { RouterComponentProps, RouterComponent } from "./RouterComponent";

export function MemoryRouterComponent(
  props: PropsWithChildren<RouterComponentProps>
): ReactElement {
  return (
    <MemoryRouter>
      <RouterComponent {...props} />
    </MemoryRouter>
  );
}

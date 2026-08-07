import type { PropsWithChildren, ReactElement } from "react";
import { BrowserRouter } from "react-router";
import { RouterComponent, type RouterComponentProps } from "./RouterComponent";

export function BrowserRouterComponent(
	props: PropsWithChildren<RouterComponentProps>,
): ReactElement {
	return (
		<BrowserRouter>
			<RouterComponent {...props} />
		</BrowserRouter>
	);
}

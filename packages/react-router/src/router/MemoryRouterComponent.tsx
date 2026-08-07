import type { PropsWithChildren, ReactElement } from "react";
import { MemoryRouter } from "react-router";
import { RouterComponent, type RouterComponentProps } from "./RouterComponent";

export function MemoryRouterComponent(
	props: PropsWithChildren<RouterComponentProps>,
): ReactElement {
	return (
		<MemoryRouter>
			<RouterComponent {...props} />
		</MemoryRouter>
	);
}

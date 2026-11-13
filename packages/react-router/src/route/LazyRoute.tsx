import { lazyLoad } from "@reactionable/core";
import type {
	ComponentType,
	LazyExoticComponent,
	ReactElement,
	ReactNode,
} from "react";
import { Route, type RouteProps } from "react-router";

export type ILazyRouteProps = Omit<RouteProps, "component"> & {
	key?: string;
	component?: LazyExoticComponent<ComponentType>;
};

export function renderLazyRouteElement({
	component,
	element,
}: {
	component?: LazyExoticComponent<ComponentType>;
	element?: ReactElement;
}): ReactElement {
	let rendered: ReactNode = <></>;
	if (component) {
		const Component = lazyLoad(component);
		rendered = <Component />;
	} else if (element) {
		rendered = element;
	}

	return <>{rendered}</>;
}

export function renderLazyRoute({
	component,
	index,
	key,
	...routeProps
}: ILazyRouteProps): ReactElement {
	const element = routeProps.element ?? renderLazyRouteElement({ component });
	if (index) {
		return (
			<Route
				{...routeProps}
				key={key}
				index
				element={element}
				children={undefined}
			/>
		);
	}
	return <Route {...routeProps} key={key} index={index} element={element} />;
}

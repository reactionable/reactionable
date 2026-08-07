import {
	Children,
	cloneElement,
	type PropsWithChildren,
	type ReactElement,
} from "react";

export type IEnhanceChildrenProps = { enhance: Record<string, unknown> };
export const EnhanceChildren = (
	props: PropsWithChildren<IEnhanceChildrenProps>,
): ReactElement => {
	const { children, enhance } = props;

	const newChildren = Children.map(children, (child) => {
		if (typeof child === "object" && child !== null && "type" in child) {
			return cloneElement(child, { ...enhance });
		}
		return child;
	});

	return <>{newChildren}</>;
};

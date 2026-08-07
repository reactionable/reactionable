import type { Theme } from "@mui/material";
import { deepmerge } from "@mui/utils";
import type { IBodyProps as ICoreBodyProps } from "@reactionable/core";
import type { ComponentType, PropsWithChildren, ReactElement } from "react";

import {
	type IResponsiveContainerProps,
	ResponsiveContainer,
} from "../responsive-container/ResponsiveContainer";

export type IBodyProps = ICoreBodyProps & IResponsiveContainerProps;
export type BodyComponent = ComponentType<IBodyProps>;

export function Body({
	component = "main",
	sx,
	...props
}: PropsWithChildren<IBodyProps>): ReactElement {
	return (
		<ResponsiveContainer
			{...props}
			component={component}
			sx={deepmerge(
				{
					minHeight: (theme: Theme) => `calc(100% - ${theme.spacing(18)}px)`,
				},
				sx,
			)}
		/>
	);
}

import { useRouterContext } from "@reactionable/core";
import type { ReactElement } from "react";
import { Button, type ButtonProps } from "react-bootstrap";

export const ButtonLink = (props: ButtonProps): ReactElement => {
	const { RouterLink } = useRouterContext();
	return <RouterLink Component={Button} {...props} />;
};

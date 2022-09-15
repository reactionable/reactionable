import { useRouterContext } from "@reactionable/core";
import { ReactElement } from "react";
import { Button, ButtonProps } from "react-bootstrap";

export const ButtonLink = (props: ButtonProps): ReactElement => {
  const { RouterLink } = useRouterContext();
  return <RouterLink Component={Button} {...props} />;
};

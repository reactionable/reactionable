import { Theme, createStyles, makeStyles } from "@material-ui/core";
import { IBodyProps as ICoreBodyProps } from "@reactionable/core/lib/ui/layout/body/Body";
import clsx from "clsx";
import { ComponentType, PropsWithChildren, ReactElement } from "react";

import {
  IResponsiveContainerProps,
  ResponsiveContainer,
} from "../responsive-container/ResponsiveContainer";

export type IBodyProps = ICoreBodyProps & IResponsiveContainerProps;
export type BodyComponent = ComponentType<IBodyProps>;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      minHeight: `calc(100% - ${theme.spacing(17)}px)`,
    },
  })
);

export function Body({
  classes: overrideClasses,
  component = "main",
  ...props
}: PropsWithChildren<IBodyProps>): ReactElement {
  const classes = useStyles();
  const bodyClasses = {
    main: clsx(classes.main, overrideClasses?.main),
    ...overrideClasses,
  };

  return <ResponsiveContainer {...props} component={component} classes={bodyClasses} />;
}

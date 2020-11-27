import Button from "@material-ui/core/Button/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  Delete as DeleteCore,
  IDeleteProps as ICoreDeleteProps,
} from "@reactionable/core/lib/crud/delete/Delete";
import React, { Children, PropsWithChildren, ReactElement } from "react";

import { IIconProps, Icon } from "../../icon/Icon";

export interface IDeleteProps<Data = unknown> extends ICoreDeleteProps<Data> {
  icon?: IIconProps;
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: theme.spacing(1),
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
    "&:disabled": {
      backgroundColor: theme.palette.error.light,
    },
  },
}));

export function Delete<Data = unknown>({
  children,
  icon = DeleteIcon,
  ...props
}: PropsWithChildren<IDeleteProps<Data>>): ReactElement {
  const classes = useStyles();
  if (!children || !Children.count(children)) {
    children = (
      <Button classes={classes} variant="contained" title={props.title || ""}>
        <Icon {...icon} />
      </Button>
    );
  } else if (typeof children === "string") {
    children = (
      <Button
        classes={classes}
        variant="contained"
        title={props.title || children}
        startIcon={icon ? <Icon {...icon} /> : undefined}
      >
        {children}
      </Button>
    );
  } else if (icon) {
    children = (
      <>
        <Icon {...icon} />
        {children}
      </>
    );
  }
  return <DeleteCore<Data> {...props}>{children}</DeleteCore>;
}

import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import {
  Delete as DeleteCore,
  IDeleteProps as ICoreDeleteProps,
} from "@reactionable/core/lib/crud/delete/Delete";
import { Children, PropsWithChildren, ReactElement } from "react";

import { IIconProps, Icon } from "../../icon/Icon";

export interface IDeleteProps<Data = unknown> extends ICoreDeleteProps<Data> {
  icon?: IIconProps;
}

export function Delete<Data = unknown>({
  children,
  icon = { icon: DeleteIcon },
  ...props
}: PropsWithChildren<IDeleteProps<Data>>): ReactElement {
  if (!children || !Children.count(children)) {
    children = (
      <Button
        sx={{
          marginLeft: (theme) => theme.spacing(1),
          backgroundColor: (theme) => theme.palette.error.main,
          color: (theme) => theme.palette.error.contrastText,
          "&:hover": {
            backgroundColor: (theme) => theme.palette.error.dark,
          },
          "&:disabled": {
            backgroundColor: (theme) => theme.palette.error.light,
          },
        }}
        variant="contained"
        title={props.title || ""}
      >
        {Boolean(icon) && <Icon {...icon} />}
      </Button>
    );
  } else if (typeof children === "string") {
    children = (
      <Button
        variant="contained"
        title={props.title || children}
        sx={{
          marginLeft: (theme) => theme.spacing(1),
          backgroundColor: (theme) => theme.palette.error.main,
          color: (theme) => theme.palette.error.contrastText,
          "&:hover": {
            backgroundColor: (theme) => theme.palette.error.dark,
          },
          "&:disabled": {
            backgroundColor: (theme) => theme.palette.error.light,
          },
        }}
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

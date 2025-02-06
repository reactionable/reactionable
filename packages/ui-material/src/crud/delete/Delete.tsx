import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { Delete as DeleteCore, IDeleteProps as ICoreDeleteProps } from "@reactionable/core";
import { Children, PropsWithChildren, ReactElement } from "react";

import { IIconProps, Icon } from "../../icon/Icon";
import { Theme, SxProps } from "@mui/material/styles";

export interface IDeleteProps<Data = unknown> extends ICoreDeleteProps<Data> {
  icon?: IIconProps;
}

export function Delete<Data = unknown>({
  children,
  icon = { icon: DeleteIcon },
  ...props
}: PropsWithChildren<IDeleteProps<Data>>): ReactElement {
  const sx: SxProps<Theme> = {
    marginLeft: (theme) => theme.spacing(1),
    backgroundColor: (theme) => theme.palette.error.main,
    color: (theme) => theme.palette.error.contrastText,
    "&:hover": {
      backgroundColor: (theme) => theme.palette.error.dark,
    },
    "&:disabled": {
      backgroundColor: (theme) => theme.palette.error.light,
    },
  };

  if (!children || !Children.count(children)) {
    children = (
      <Button sx={sx} variant="contained" title={props.title || ""}>
        <Icon {...icon} />
      </Button>
    );
  } else if (typeof children === "string") {
    children = (
      <Button
        sx={sx}
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

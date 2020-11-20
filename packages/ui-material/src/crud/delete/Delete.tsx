import Button from "@material-ui/core/Button/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  Delete as DeleteCore,
  IDeleteProps as ICoreDeleteProps,
} from "@reactionable/core/lib/crud/delete/Delete";
import React, { PropsWithChildren, ReactElement, ReactNode } from "react";

import { IIconProps, Icon } from "../../icon/Icon";

export interface IDeleteProps<Data = unknown> extends ICoreDeleteProps<Data> {
  label?: ReactNode;
  icon?: IIconProps;
}

export function Delete<Data = unknown>({
  label,
  icon = DeleteIcon,
  ...props
}: PropsWithChildren<IDeleteProps<Data>>): ReactElement {
  return (
    <DeleteCore<Data> {...props}>
      <Button
        color="secondary"
        variant="contained"
        title={props.title || ""}
        startIcon={<Icon {...icon} />}
      >
        {label}
      </Button>
    </DeleteCore>
  );
}

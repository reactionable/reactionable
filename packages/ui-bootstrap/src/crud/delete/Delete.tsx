import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import {
  Delete as DeleteCore,
  IDeleteProps as ICoreDeleteProps,
} from "@reactionable/core/lib/crud/delete/Delete";
import { PropsWithChildren, ReactElement, ReactNode } from "react";
import Button from "react-bootstrap/Button";

import { IIconProps, Icon } from "../../icon/Icon";

export interface IDeleteProps<Data = unknown> extends ICoreDeleteProps<Data> {
  label?: ReactNode;
  icon?: IIconProps;
}

export function Delete<Data = unknown>({
  label,
  icon = { icon: faTrashAlt },
  ...props
}: PropsWithChildren<IDeleteProps<Data>>): ReactElement {
  return (
    <DeleteCore<Data> {...props}>
      <Button variant="danger" title={props.title || ""}>
        {icon && <Icon className={label ? "me-2" : ""} {...icon} />}
        {label}
      </Button>
    </DeleteCore>
  );
}

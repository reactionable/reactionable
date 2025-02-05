import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Delete as DeleteCore, IDeleteProps as ICoreDeleteProps } from "@reactionable/core";
import { PropsWithChildren, ReactElement } from "react";
import Button from "react-bootstrap/Button";

import { IIconProps, Icon } from "../../icon/Icon";

export interface IDeleteProps<Data = unknown> extends ICoreDeleteProps<Data> {
  icon?: IIconProps;
}

export function Delete<Data = unknown>({
  icon = { icon: faTrashAlt },
  children,
  ...props
}: PropsWithChildren<IDeleteProps<Data>>): ReactElement {
  return (
    <DeleteCore<Data> {...props}>
      <Button variant="danger" title={props.title || ""}>
        {icon && <Icon className={children ? "me-2" : ""} {...icon} />}
        {children}
      </Button>
    </DeleteCore>
  );
}

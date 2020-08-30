import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import {
  Delete as DeleteCore,
  IDeleteProps as ICoreDeleteProps,
} from '@reactionable/core/lib/crud/delete/Delete';
import React, { PropsWithChildren, ReactNode } from 'react';
import Button from 'react-bootstrap/Button';

export interface IDeleteProps<Data> extends ICoreDeleteProps<Data> {
  label?: ReactNode;
  icon?: FontAwesomeIconProps;
}

export function Delete<Data>({
  label,
  icon = { icon: faTrashAlt },
  ...props
}: PropsWithChildren<IDeleteProps<Data>>) {
  return (
    <DeleteCore<Data> {...props}>
      <Button variant="danger" title={props.title || ''}>
        {icon && <FontAwesomeIcon className={label ? 'mr-2' : ''} {...icon} />}
        {label}
      </Button>
    </DeleteCore>
  );
}

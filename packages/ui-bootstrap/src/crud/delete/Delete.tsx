import React, { PropsWithChildren } from 'react';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Delete as DeleteCore, IDeleteProps as ICoreDeleteProps } from '@reactionable/core';

export interface IDeleteProps<Data> extends ICoreDeleteProps<Data> {
  label?: string;
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
        <FontAwesomeIcon className="mr-2" {...icon} />
        {label}
      </Button>
    </DeleteCore>
  );
}

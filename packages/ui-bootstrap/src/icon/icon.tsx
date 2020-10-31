import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import React from 'react';

export type IIconProps = FontAwesomeIconProps;

export function Icon(props: IIconProps) {
  return <FontAwesomeIcon {...props} />;
}

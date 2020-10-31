import MaterialIcon, { IconProps } from '@material-ui/core/Icon';
import { SvgIconTypeMap } from '@material-ui/core/SvgIcon/SvgIcon';
import React from 'react';
import { ReactElement, isValidElement } from 'react';

export type IIconProps = ReactElement<SvgIconTypeMap<{}, 'svg'>['props']> | IconProps;

export function Icon(props: IIconProps) {
  return isValidElement(props) ? props : <MaterialIcon {...props} />;
}

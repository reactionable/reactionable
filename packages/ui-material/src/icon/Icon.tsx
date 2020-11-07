import SvgIcon from '@material-ui/core/SvgIcon/SvgIcon';
import React, { ComponentProps } from 'react';

type IIconPropsWithIcon = ComponentProps<typeof SvgIcon> & { icon: typeof SvgIcon };
type IIconPropsWithMaybeIcon = Omit<IIconPropsWithIcon, 'icon'> &
  Partial<Pick<IIconPropsWithIcon, 'icon'>>;
export type IIconProps = typeof SvgIcon | IIconPropsWithMaybeIcon;

function isIconPropsWithIcon(props: IIconProps): props is IIconPropsWithIcon {
  return (props as IIconPropsWithIcon).icon !== undefined;
}

export function Icon(props: IIconProps) {
  if (isIconPropsWithIcon(props)) {
    const { icon: IconComponent, ...iconProps } = props as IIconPropsWithIcon;
    return <IconComponent {...iconProps} />;
  }

  const IconComponent = props as typeof SvgIcon;
  return <IconComponent />;
}

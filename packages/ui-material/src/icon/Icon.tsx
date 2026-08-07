import type SvgIcon from "@mui/material/SvgIcon";
import type { ComponentProps, ReactElement } from "react";

export type IIconProps = ComponentProps<typeof SvgIcon> & {
	icon: typeof SvgIcon;
};

export function Icon(props: IIconProps): ReactElement {
	const { icon: IconComponent, ...iconProps } = props;
	return <IconComponent {...iconProps} />;
}

import {
	FontAwesomeIcon,
	type FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import type { ReactElement } from "react";

export type IIconProps = FontAwesomeIconProps;

export function Icon(props: IIconProps): ReactElement {
	return <FontAwesomeIcon {...props} />;
}

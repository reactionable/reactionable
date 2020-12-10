import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { ReactElement } from "react";

export type IIconProps = FontAwesomeIconProps;

export function Icon(props: IIconProps): ReactElement {
  return <FontAwesomeIcon {...props} />;
}

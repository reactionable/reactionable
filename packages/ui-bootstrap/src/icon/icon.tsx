import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import React, { ReactElement } from "react";

export type IIconProps = FontAwesomeIconProps;

export function Icon(props: IIconProps): ReactElement {
  return <FontAwesomeIcon {...props} />;
}

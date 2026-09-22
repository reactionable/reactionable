import type { StyledComponent } from "@emotion/styled";
import { styled, type Theme } from "@mui/material/styles";
import type { MUIStyledCommonProps } from "@mui/system";
import type { ComponentProps } from "react";

export const DrawerHeader: StyledComponent<
	MUIStyledCommonProps<Theme>,
	ComponentProps<"div">
> = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

import type { StyledComponent } from "@emotion/styled";
import MuiDrawer, { type DrawerProps } from "@mui/material/Drawer";
import { styled, type Theme } from "@mui/material/styles";
import type { MUIStyledCommonProps } from "@mui/system";

import { closedMixin, drawerWidth, openedMixin } from "./Mixins";

export const Drawer: StyledComponent<
	DrawerProps & MUIStyledCommonProps<Theme> & { open: boolean }
> = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})<{
	open: boolean;
}>(({ theme, open }) => ({
	width: drawerWidth(theme),
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme),
	}),
}));

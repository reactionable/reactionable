import type { StyledComponent } from "@emotion/styled";
import MuiAppBar, {
	type AppBarProps as MuiAppBarProps,
} from "@mui/material/AppBar";
import { styled, type Theme } from "@mui/material/styles";
import type { MUIStyledCommonProps } from "@mui/system";

import { drawerWidth } from "./Mixins";

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}
export const AppBar: StyledComponent<
	AppBarProps & MUIStyledCommonProps<Theme>
> = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth(theme),
		width: `calc(100% - ${drawerWidth(theme)}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

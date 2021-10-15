import MuiDrawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";

import { closedMixin, drawerWidth, openedMixin } from "./Mixins";

export const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })<{
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

import type { INavItemProps } from "../../../nav/NavItem";
import { createNavItemsContextProvider } from "../../../nav/NavItemsContextProvider";
import type { INavItemsProviderProps } from "../../../nav/NavItemsProviderProps";
import type { IHeaderProps } from "./Header";

const { NavItemsContextProvider, useNavItemsContext } =
	createNavItemsContextProvider<IHeaderProps<INavItemProps>>();

export const HeaderContextProvider = NavItemsContextProvider;

export function useHeaderContext<
	HeaderProps extends IHeaderProps<INavItemProps>,
>(): INavItemsProviderProps<HeaderProps> {
	return useNavItemsContext();
}

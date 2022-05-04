import { INavItemProps } from "../../../nav/NavItem";
import { createNavItemsContextProvider } from "../../../nav/NavItemsContextProvider";
import { INavItemsProviderProps } from "../../../nav/NavItemsProviderProps";
import { IHeaderProps } from "./Header";

const { NavItemsContextProvider, useNavItemsContext } =
  createNavItemsContextProvider<IHeaderProps<INavItemProps>>();

export const HeaderContextProvider = NavItemsContextProvider;

export function useHeaderContext<
  HeaderProps extends IHeaderProps<INavItemProps>
>(): INavItemsProviderProps<HeaderProps> {
  return useNavItemsContext();
}

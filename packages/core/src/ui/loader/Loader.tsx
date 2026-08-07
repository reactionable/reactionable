import type {
	ComponentType,
	LazyExoticComponent,
	PropsWithChildren,
} from "react";

import { keyFromSelector, useTranslation } from "../../i18n/I18n";
import { withSuspense } from "../suspense/Suspense";

export type ILoaderProps = Record<string, unknown>;
export type LoaderComponent = ComponentType<ILoaderProps>;

export const Loader: LoaderComponent = () => {
	const { t } = useTranslation("common");
	return <>{t(keyFromSelector(($) => $.Loading, { ns: "common" }))}</>;
};

export function lazyLoad<Component extends ComponentType = ComponentType>(
	ComponentToLoad: LazyExoticComponent<Component>,
) {
	// biome-ignore lint: lazy wrappers forward arbitrary child props to the loaded component.
	return (props: PropsWithChildren<any>): ReturnType<typeof withSuspense> => {
		return withSuspense(<ComponentToLoad {...props} />);
	};
}

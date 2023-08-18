import { ComponentType, LazyExoticComponent, PropsWithChildren } from "react";

import { useTranslation } from "../../i18n/I18n";
import { withSuspense } from "../suspense/Suspense";

export type ILoaderProps = Record<string, unknown>;
export type LoaderComponent = ComponentType<ILoaderProps>;

export const Loader: LoaderComponent = () => {
  const { t } = useTranslation("common");
  return <>{t("Loading")}</>;
};

export function lazyLoad<Component extends ComponentType = ComponentType>(
  ComponentToLoad: LazyExoticComponent<Component>
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (props: PropsWithChildren<any>): ReturnType<typeof withSuspense> => {
    return withSuspense(<ComponentToLoad {...props} />);
  };
}

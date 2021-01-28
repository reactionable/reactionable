import { useTranslation } from "@reactionable/core/lib/i18n/I18n";
import { ILoaderProps as ICoreLoaderProps } from "@reactionable/core/lib/ui/loader/Loader";
import {
  IUseLoaderProps as ICoreUseLoaderProps,
  IUseLoader,
  useLoader as useLoaderCore,
} from "@reactionable/core/lib/ui/loader/useLoader";
import { ReactElement } from "react";
import Spinner from "react-bootstrap/Spinner";

export type ILoaderProps = ICoreLoaderProps & {
  overlay?: boolean;
};

export const Loader = ({ overlay = true }: ILoaderProps): ReactElement => {
  const { t } = useTranslation();
  const spinnerElement = (
    <Spinner animation="grow" role="status" variant="primary">
      <span className="sr-only">{t("Loading")}</span>
    </Spinner>
  );
  if (!overlay) {
    return spinnerElement;
  }
  return (
    <div
      className="spinner--overlay"
      style={{
        width: "100%",
        height: "100%",
        position: "fixed",
        top: "50%",
        left: "50%",
      }}
    >
      {spinnerElement}
    </div>
  );
};

export type IUseLoaderProps = ICoreUseLoaderProps & ILoaderProps;

export const useLoader: IUseLoader<IUseLoaderProps> = (props = {}) => {
  return useLoaderCore({ ...props, Component: Loader });
};

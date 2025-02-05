import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import {
  useTranslation,
  ILoaderProps as ICoreLoaderProps,
  IUseLoaderProps as ICoreUseLoaderProps,
  IUseLoader,
  useLoader as useLoaderCore,
} from "@reactionable/core";
import { ReactElement } from "react";

export type ILoaderProps = ICoreLoaderProps & {
  overlay?: boolean;
};

export const Loader = ({ overlay = true }: ILoaderProps): ReactElement => {
  const { t } = useTranslation("common");
  const spinnerElement = <CircularProgress title={t("Loading") ?? undefined} />;
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

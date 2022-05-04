import { ComponentType, Context, PropsWithChildren, createContext, useContext } from "react";

type IProviderExtraProps = Record<string, unknown>;

type IProviderComponent<ExtraProps extends IProviderExtraProps = IProviderExtraProps> =
  ComponentType<Partial<ExtraProps>>;

export type IProviderProps<ExtraProps extends IProviderExtraProps = IProviderExtraProps> = {
  Component?: IProviderComponent<ExtraProps>;
} & ExtraProps;

export type ICreateProviderResult<ProviderProps extends IProviderProps> = {
  Context: Context<ProviderProps>;
  ContextProvider: ComponentType<ProviderProps>;
  useContext: () => ProviderProps;
};

export function createProvider<ProviderProps extends IProviderProps = IProviderProps>(
  props: ProviderProps
): ICreateProviderResult<ProviderProps> {
  const CreatedContext = createContext<ProviderProps>(props);

  const ContextProvider = ({ Component, children, ...props }: PropsWithChildren<ProviderProps>) => {
    if (Component) {
      const ProviderComponent = Component;
      children = <ProviderComponent {...props}>{children}</ProviderComponent>;
    }

    return (
      <CreatedContext.Provider value={props as ProviderProps}>{children}</CreatedContext.Provider>
    );
  };

  const useCreatedContext = () => {
    return useContext<ProviderProps>(CreatedContext);
  };

  return {
    Context: CreatedContext,
    ContextProvider,
    useContext: useCreatedContext,
  };
}

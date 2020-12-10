import { ComponentType, Context, PropsWithChildren, createContext, useContext } from "react";

type IProviderExtraProps = Record<string, unknown>;
export type IProviderProps<ExtraProps extends IProviderExtraProps = IProviderExtraProps> = {
  Component?: ComponentType;
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

  const ContextProvider = ({ children, Component, ...props }: PropsWithChildren<ProviderProps>) => {
    if (Component) {
      const ProviderComponent = Component as ComponentType;
      children = <ProviderComponent {...props}>{children}</ProviderComponent>;
    }

    return (
      <CreatedContext.Provider value={{ ...props, Component } as ProviderProps}>
        {children}
      </CreatedContext.Provider>
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

import React, { ComponentType, Context, PropsWithChildren, createContext, useContext } from 'react';

export type IProviderProps<ExtraProps extends Object = {}> = {
  Component?: ComponentType<any>;
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
  const ContextProvider = ({ children, ...props }: PropsWithChildren<ProviderProps>) => {
    if (props.Component) {
      const ProviderComponent = props.Component as ComponentType<any>;
      children = <ProviderComponent>{children}</ProviderComponent>;
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

import { LazyExoticComponent, PropsWithChildren, ReactElement } from "react";

import { IFormData, IFormValues } from "../form/Form";
import { IFormButtonProps } from "../form/FormButton";
import { IRouteProps } from "../router/Route";
import { useRouterContext } from "../router/Router";
import { IModalProps } from "../ui/modal/Modal";
import { ICreateProps } from "./create/Create";
import { ListComponent } from "./list/List";
import { IUseListOptions, IUseListResult } from "./list/useList";
import { ReadComponent } from "./read/Read";
import { IUseReadOptions, IUseReadResult } from "./read/useRead";
import { IUpdateProps } from "./update/Update";

export interface ICrudProp<Data extends IFormData = IFormData> {
  name: string;
  listComponent?: LazyExoticComponent<ListComponent<Data>>;
  readComponent?: LazyExoticComponent<ReadComponent<Data>>;
  routes?: Array<IRouteProps>;
  privateRoute?: boolean;
}

export function Crud<Data extends IFormData = IFormData>({
  name,
  listComponent,
  readComponent,
  routes = [],
  privateRoute = true,
}: PropsWithChildren<ICrudProp<Data>>): ReactElement | null {
  const { renderRoutes, useRouteMatch } = useRouterContext();
  const match = useRouteMatch();
  if (!match) {
    return null;
  }

  const idParam = `:${name.charAt(0).toLowerCase() + name.slice(1)}Id`;

  // Add CRUD path prefix to given routes
  routes = routes.map((route) => {
    route.path = `${match.path}/${idParam}/${route.path}`;
    return route;
  });

  if (listComponent) {
    routes.push({
      exact: true,
      path: match.path,
      component: listComponent,
      privateRoute: privateRoute,
    });
  }

  if (readComponent) {
    routes.push({
      exact: true,
      path: `${match.path}/${idParam}`,
      component: readComponent,
      privateRoute: privateRoute,
    });
  }

  return renderRoutes(routes);
}

export type IUseCrudConfigResult<
  Values extends IFormValues = IFormValues,
  Data extends IFormData = IFormData,
  FormButtonProps extends IFormButtonProps = IFormButtonProps,
  ModalProps extends IModalProps = IModalProps
> = {
  onCreate: ICreateProps<Values, Data, FormButtonProps, ModalProps>["form"]["onSubmit"];
  onUpdate: IUpdateProps<Values, Data, FormButtonProps, ModalProps>["form"]["onSubmit"];
  onDelete: (id: string | number) => Promise<unknown>;
  useRead: (variables?: IUseReadOptions<Data>["variables"]) => IUseReadResult<Data>;
  useList: (variables?: IUseListOptions<Data>["variables"]) => IUseListResult<Data>;
  initialValues: ICreateProps<Values, Data, FormButtonProps, ModalProps>["form"]["initialValues"];
  validationSchema: ICreateProps<
    Values,
    Data,
    FormButtonProps,
    ModalProps
  >["form"]["validationSchema"];
  formChildren: ICreateProps<Values, Data, FormButtonProps, ModalProps>["form"]["children"];
};

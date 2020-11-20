import { LazyExoticComponent, PropsWithChildren, ReactElement } from "react";

import { IFormData } from "../form/Form";
import { IRouteProps } from "../router/Route";
import { useRouterContext } from "../router/Router";
import { ICreateProps } from "./create/Create";
import { IDeleteProps } from "./delete/Delete";
import { ListComponent } from "./list/List";
import { IUseListQuery } from "./list/useList";
import { ReadComponent } from "./read/Read";
import { IUseReadQuery } from "./read/useRead";
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
  CreateProps extends ICreateProps = ICreateProps,
  UpdateProps extends IUpdateProps = IUpdateProps,
  DeleteProps extends IDeleteProps = IDeleteProps,
  UseReadQuery extends IUseReadQuery = IUseReadQuery,
  UseListQuery extends IUseListQuery = IUseListQuery
> = {
  onCreate: CreateProps["form"]["onSubmit"];
  onUpdate: UpdateProps["form"]["onSubmit"];
  onDelete: DeleteProps["onConfirm"];
  useRead: UseReadQuery;
  useList: UseListQuery;
  validationSchema: CreateProps["form"]["validationSchema"];
  formChildren: CreateProps["form"]["children"];
};

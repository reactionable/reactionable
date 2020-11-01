import { LazyExoticComponent, PropsWithChildren } from 'react';

import { IRouteProps } from '../router/Route';
import { useRouterContext } from '../router/Router';
import { ListComponent } from './list/List';
import { ReadComponent } from './read/Read';

export interface ICrudProp<Data> {
  name: string;
  listComponent?: LazyExoticComponent<ListComponent<Data>>;
  readComponent?: LazyExoticComponent<ReadComponent<Data>>;
  routes?: Array<IRouteProps>;
  privateRoute?: boolean;
}

export function Crud<Data>({
  name,
  listComponent,
  readComponent,
  routes = [],
  privateRoute = true,
}: PropsWithChildren<ICrudProp<Data>>) {
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

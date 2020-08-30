import React, { LazyExoticComponent, PropsWithChildren } from 'react';
import { Switch, useRouteMatch } from 'react-router-dom';

import { IRouteProps, renderRoute } from '../nav/route/Route';
import { IUseLayoutProps } from '../ui/layout/Layout';
import { ListComponent } from './list/List';
import { ReadComponent } from './read/Read';

export interface ICrudProp<Data, LP extends IUseLayoutProps = IUseLayoutProps> {
  name: string;
  listComponent?: LazyExoticComponent<ListComponent<Data>>;
  readComponent?: LazyExoticComponent<ReadComponent<Data>>;
  routes?: Array<IRouteProps<LP>>;
  privateRoute?: boolean;
  layout?: LP;
}

export function Crud<Data, LP extends IUseLayoutProps>({
  name,
  listComponent,
  readComponent,
  routes = [],
  privateRoute = true,
  layout,
}: PropsWithChildren<ICrudProp<Data, LP>>) {
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

  return (
    <Switch>
      {routes.map((route) => renderRoute<LP>({ layout, ...route }))}
    </Switch>
  );
}

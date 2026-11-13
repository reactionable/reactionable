# React Router integration

Use `useRouterProviderProps()` from `@reactionable/react-router` to configure the
router on `App`. It supplies client-side navigation, links, route matching and
route rendering through the core router context.

## Nested and private routes

Route paths are relative to their parent. Use `/*` when a component renders its
own descendant routes, including `Crud`. An index route has `index: true` and no
path. `privateRoute: true` protects either kind of route.

```tsx
const routes = [
  { index: true, component: Home },
  { path: "items/*", component: Items, privateRoute: true },
  { component: NotFound },
];
```

Components in route definitions are created with `React.lazy`. The last entry
above supplies the fallback for unknown URLs and for navigation state containing
`notFoundError`.

When composing React Router elements directly, put `PrivateRoute` in a pathless
layout route. It renders an `Outlet` for an authenticated user and redirects an
anonymous user to `/`.

```tsx
<Route element={<PrivateRoute />}>
  <Route path="items/*" element={<Items />} />
</Route>
```

## CRUD routes

```tsx
<Crud
  name="Item"
  listComponent={ListItems}
  readComponent={ReadItem}
  routes={[{ path: "notes/*", component: Notes }]}
/>
```

Mounted at `items/*`, this creates `/items`, `/items/:itemId` and
`/items/:itemId/notes/*`. Custom routes inherit the CRUD privacy setting unless
explicitly overridden. Route definitions are reusable and are not modified by
rendering.

## Route matching and navigation

`useRouteMatch<{ itemId: string }>()` returns an object with `params`, `path`,
`url` and `isIndex`. For `/items/42`, `params.itemId` is `"42"` and both `path`
and `url` are `/items/42`. Paths contain resolved parameter values and exclude
query strings and fragments. `isIndex` indicates whether the current location's
pathname equals this resolved path; it does not identify an `index` declaration.

This replaces the old expectation that `path` contains a route pattern such as
`/items/:itemId`. Define descendant routes with relative paths instead of
concatenating `match.path`. Read identifiers from `match.params`.

For navigation, use `useRouter().push()` or the `useRouter` hook supplied by
`useRouterContext()`. Both use React Router navigation without reloading the page.

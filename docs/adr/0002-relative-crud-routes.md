# Relative CRUD routes and resolved route matches

- Status: accepted
- Date: 2026-11-13

## Context

Migrating MyEasySchool exposed invalid route composition in the React Router
adapter: index routes were discarded, private routes repeated their path and
fallback components were placed directly inside `Routes`. `useRouteMatch`
returned raw parameters despite declaring a structured match result. The core
router context also retained browser navigation instead of React Router
navigation.

## Decision

Use relative paths for CRUD routes and pathless layouts for private routes.
Preserve index declarations, render fallbacks through a wildcard route and keep
caller-owned route definitions immutable. Both router hooks use the same React
Router navigation and match implementation.

A match contains parameters and a resolved pathname. `path` and `url` contain
actual parameter values, not the old parameterized route pattern. Applications
must define descendant paths relatively and read identifiers from `params`.
MyEasySchool will migrate to this contract rather than retaining a compatibility
layer.

## Consequences

Consumers that concatenate the old route pattern must migrate. The public
[React Router guide](../usage/react-router.md) documents the contract and examples.
Behavior tests cover index, nested CRUD, private, fallback and context navigation
routes without contacting an identity service or application backend.

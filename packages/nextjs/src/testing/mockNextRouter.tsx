import type { NextRouter } from "next/router";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useRouter = window.jest ? jest.spyOn(require("next/router"), "useRouter") : undefined;

const mockUseNextRouter = useRouter;

export function createMockRouter(overrides: Partial<NextRouter>): NextRouter {
  return {
    basePath: "",
    pathname: "/",
    route: "/",
    query: {},
    asPath: "/",
    back: () => {
      return;
    },
    beforePopState: () => {
      return;
    },
    prefetch: async () => {
      return;
    },
    push: async () => true,
    reload: () => {
      return;
    },
    replace: async () => true,
    forward: () => {
      return;
    },
    events: {
      on: () => {
        return;
      },
      off: () => {
        return;
      },
      emit: () => {
        return;
      },
    },
    isFallback: false,
    isLocaleDomain: false,
    isReady: true,
    defaultLocale: "en",
    isPreview: false,
    ...overrides,
  };
}

/**
 * Mock the `useRouter()` hook and return the mocked router instance.
 */
export default function mockNextRouter(overrides: Partial<NextRouter> = {}) {
  const mockRouter = createMockRouter(overrides);
  mockUseNextRouter?.mockReturnValue(mockRouter);
  return mockRouter;
}

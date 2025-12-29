import { jest as jestGlobals } from "@jest/globals";
import { format, TextEncoder } from "util";

const originalConsoleError = global.console.error;

global.console.error = function (...args: unknown[]) {
  originalConsoleError(...args);
  const errorMessage = args.length ? format(args.shift(), ...args) : "";
  throw new Error(errorMessage);
};

if (typeof global.TextEncoder === "undefined") {
  (global as unknown as { TextEncoder: typeof TextEncoder }).TextEncoder = TextEncoder;
}

if (typeof (globalThis as unknown as { jest?: typeof jestGlobals }).jest === "undefined") {
  (globalThis as unknown as { jest: typeof jestGlobals }).jest = jestGlobals;
}

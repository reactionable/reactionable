import { format } from "util";

const error = global.console.error;

global.console.error = function (...args: unknown[]) {
  error(...args);
  const errorMessage = args.length ? format(args.shift(), ...args) : "";
  throw new Error(errorMessage);
};

export interface IError extends Error {
  code?: number;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function isIError(arg: unknown): arg is IError {
  return (
    arg && typeof arg === "object" && arg["name"] !== undefined && arg["message"] !== undefined
  );
}

export function printError(error?: IError): string | undefined {
  return error ? error.message : undefined;
}

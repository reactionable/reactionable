export interface IError extends Error {
  code?: number;
}

export function isIError(arg: unknown): arg is IError {
  return !!(
    arg &&
    typeof arg === "object" &&
    Object.prototype.hasOwnProperty.call(arg, "name") &&
    Object.prototype.hasOwnProperty.call(arg, "message")
  );
}

export function printError(error?: IError): string | undefined {
  return error ? error.message : undefined;
}

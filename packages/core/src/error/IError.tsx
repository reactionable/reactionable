export interface IError extends Error {
  code?: number;
}

export function isIError(arg: unknown): arg is IError {
  return !!(arg && typeof arg === "object" && "name" in arg && "message" in arg);
}

export function printError(error?: IError): string | undefined {
  return error ? error.message : undefined;
}

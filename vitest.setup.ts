import "@testing-library/jest-dom/vitest";
import { format, TextEncoder } from "node:util";
import { vi } from "vitest";

const originalConsoleError = globalThis.console.error;

globalThis.console.error = (...args: unknown[]) => {
	originalConsoleError(...args);
	const errorMessage = args.length ? format(args.shift(), ...args) : "";
	throw new Error(errorMessage);
};

if (typeof globalThis.TextEncoder === "undefined") {
	(
		globalThis as typeof globalThis & { TextEncoder: typeof TextEncoder }
	).TextEncoder = TextEncoder;
}

if (typeof globalThis.jest === "undefined") {
	(globalThis as typeof globalThis & { jest: typeof vi }).jest = vi;
}

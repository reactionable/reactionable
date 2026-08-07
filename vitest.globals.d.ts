import type { MockInstance } from "vitest";

declare global {
	const jest: typeof import("vitest").vi;

	namespace jest {
		type SpyInstance = MockInstance;
	}
}

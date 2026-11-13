import { Amplify } from "aws-amplify";

export const configure = (
	config: Parameters<typeof Amplify.configure>[0],
): void => Amplify.configure(config);

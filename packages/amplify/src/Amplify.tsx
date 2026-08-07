import { Amplify, type ResourcesConfig } from "aws-amplify";

export const configure = (config: ResourcesConfig): void =>
	Amplify.configure(config);

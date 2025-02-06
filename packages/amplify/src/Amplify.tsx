import { Amplify, ResourcesConfig } from "aws-amplify";

export const configure = (config: ResourcesConfig): void => Amplify.configure(config);

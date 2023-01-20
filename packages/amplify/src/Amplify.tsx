import { Amplify } from "aws-amplify";

export const configure = (config: unknown): unknown => Amplify.configure(config);

import "i18next";

import common from "./locales/en/common.json";
import identity from "./locales/en/identity.json";

export const defaultNamespace = "common";

declare module "i18next" {
    interface CustomTypeOptions {
        defaultNS: typeof defaultNamespace;
        enableSelector: "optimize";
        resources: {
            common: typeof common;
            identity: typeof identity;
        };
    }
}

export { };
import React, { ReactElement } from "react";

import { Link } from "../../src/router/Link";

export default {
  title: "Core/Components/Router",
  parameters: {
    info: { inline: true },
    options: { showPanel: true },
    component: Link,
  },
};

export const SimpleLink = (): ReactElement => {
  return <Link href="#">Simple Link</Link>;
};

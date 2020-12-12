import { ReactElement } from "react";

import { NotFound } from "./NotFound";

export default {
  title: "Core/Components/UI/Layout/NotFound",
  parameters: { component: NotFound },
};

export const BasicNotFound = (): ReactElement => {
  return <NotFound />;
};

import { ReactElement } from "react";

import { Link, useLink } from "./Link";

export default {
  title: "UI Bootstrap/Components/Link",
  parameters: { component: Link },
};

export const BasicLink = (): ReactElement => {
  return <Link href="/test">test</Link>;
};

export const UseLink = (): ReactElement => {
  return useLink({
    href: "/test",
    children: "test",
  });
};

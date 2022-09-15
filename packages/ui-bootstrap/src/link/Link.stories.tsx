import { ReactElement } from "react";

import { ButtonLink } from "./ButtonLink";
import { Link, useLink } from "./Link";

export default {
  title: "UI Bootstrap/Components/Link",
  parameters: { component: Link },
};

export const BasicLink = (): ReactElement => {
  return <Link href="/test">test</Link>;
};
export const BasicButtonLink = (): ReactElement => {
  return (
    <ButtonLink href="/test" variant="danger">
      Test
    </ButtonLink>
  );
};

export const UseLink = (): ReactElement => {
  return useLink({
    href: "/test",
    children: "test",
  });
};

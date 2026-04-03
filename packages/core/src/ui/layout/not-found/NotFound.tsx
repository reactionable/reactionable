import { ReactElement } from "react";

import { keyFromSelector, useTranslation } from "../../../i18n/I18n";
import { useUIContext } from "../../UI";

export type INotFoundProps = Record<string, unknown>;
export function NotFound(): ReactElement {
  const { t } = useTranslation("common");
  const { useLink } = useUIContext();
  const homepageLink = useLink({
    href: "/",
    children: t(keyFromSelector(($) => $["Go To Homepage"], { ns: "common" })),
  });

  return (
    <div>
      <h1>{t(keyFromSelector(($) => $["Not found"], { ns: "common" }))}</h1>
      <p>
        {t(
          keyFromSelector(
            ($) =>
              $[
                "The page you are looking for might have been removed, or had its name changed, or is temporarily unavailable"
              ],
            { ns: "common" }
          )
        )}
      </p>
      <p>{homepageLink}</p>
    </div>
  );
}

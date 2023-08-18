import { ReactElement } from "react";

import { useTranslation } from "../../../i18n/I18n";
import { useUIContext } from "../../UI";

export type INotFoundProps = Record<string, unknown>;
export function NotFound(): ReactElement {
  const { t } = useTranslation("common");
  const { useLink } = useUIContext();
  const homepageLink = useLink({ href: "/", children: t("Go To Homepage") });

  return (
    <div>
      <h1>{t("Not found")}</h1>
      <p>
        {t(
          "The page you are looking for might have been removed, or had its name changed, or is temporarily unavailable"
        )}
      </p>
      <p>{homepageLink}</p>
    </div>
  );
}

import React, { ReactElement } from "react";

import { useTranslation } from "../../../i18n/I18n";
import { Link } from "../../../router/Link";

export type INotFoundProps = Record<string, unknown>;
export function NotFound(): ReactElement {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("Not found")}</h1>
      <p>
        {t(
          "The page you are looking for might have been removed, or had its name changed, or is temporarily unavailable"
        )}
      </p>
      <p>
        <Link href="/">{t("Go To Homepage")}</Link>
      </p>
    </div>
  );
}

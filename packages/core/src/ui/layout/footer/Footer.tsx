import React, { ComponentType, PropsWithChildren, ReactElement, ReactNode } from "react";

import { useTranslation } from "../../../i18n/I18n";

export interface IFooterProps {
  brand?: ReactNode | string;
  sponsor?: boolean;
}
export type FooterComponent<FooterProps extends IFooterProps = IFooterProps> = ComponentType<
  FooterProps
>;

export function Footer<FooterProps extends IFooterProps = IFooterProps>({
  sponsor = true,
  ...props
}: PropsWithChildren<FooterProps>): ReactElement {
  return (
    <footer>
      <div>
        <CopyrightFooter {...props} />
      </div>
      {sponsor && (
        <div>
          <SponsorFooter />
        </div>
      )}
    </footer>
  );
}

export function CopyrightFooter<FooterProps extends IFooterProps = IFooterProps>({
  brand,
}: PropsWithChildren<Pick<FooterProps, "brand">>): ReactElement {
  const { t } = useTranslation();

  const currentYear = new Date().getFullYear();
  return (
    <>
      {t("Copyright")} &copy; {currentYear} {brand}
    </>
  );
}

export const SponsorFooter = (): ReactElement => {
  const { t } = useTranslation();
  return (
    <>
      <span title={t("Powered by")}>{t("⚡ by")} </span>
      <a
        href="https://reactionable.github.io/reactionable/"
        rel="noreferrer"
        target="_blank"
        title={t("Reactionable - An effective toolkit for React")}
      >
        Reactionable
      </a>
    </>
  );
};

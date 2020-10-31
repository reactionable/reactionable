import React, { ComponentType, PropsWithChildren, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
export interface IFooterProps {
  brand?: ReactNode | string;
  sponsor?: boolean;
}
export type FooterComponent<FooterProps extends IFooterProps = IFooterProps> = ComponentType<
  FooterProps
>;

export function Footer<FooterProps extends IFooterProps = IFooterProps>({
  brand,
  sponsor = true,
}: PropsWithChildren<FooterProps>) {
  const { t } = useTranslation();

  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div>
        {t('Copyright')} &copy; {currentYear} {brand}
      </div>
      {sponsor && (
        <div>
          <SponsorFooter />
        </div>
      )}
    </footer>
  );
}

export const SponsorFooter = () => {
  const { t } = useTranslation();
  return (
    <>
      <span title={t('Powered by')}>⚡ by </span>
      <a
        href="https://github.com/reactionable/reactionable"
        target="_blank"
        title={t('Reactionable - An effective toolkit for React')}
      >
        Reactionable
      </a>
    </>
  );
};

import React, { FC, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
export interface IFooterProps {
  brand?: ReactElement | string;
  sponsor?: boolean;
}
export type FooterComponent<F extends IFooterProps = IFooterProps> = FC<F>;

export const Footer: FooterComponent = ({ brand, sponsor = true }) => {
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
};

export const SponsorFooter: FC<{}> = ({}) => {
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

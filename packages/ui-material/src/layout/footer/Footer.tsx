import Grid from '@material-ui/core/Grid/Grid';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {
  IFooterProps as ICoreFooterProps,
  SponsorFooter,
} from '@reactionable/core/lib/ui/layout/footer/Footer';
import React, { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';

export type IFooterProps = ICoreFooterProps &
  Omit<DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>, 'onSelect' | 'ref'>;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: '60px',
      lineHeight: '60px',
    },
  })
);

export function Footer({ brand, sponsor = true, ...footerProps }: PropsWithChildren<IFooterProps>) {
  const { t } = useTranslation();
  const classes = useStyles();

  const currentYear = new Date().getFullYear();

  return (
    <footer className={classes.footer} {...footerProps}>
      <Grid container direction="row" justify="space-between" alignItems="center">
        <Grid item>
          {t('Copyright')} &copy; {currentYear} {brand}
        </Grid>
        {sponsor && (
          <Grid item>
            <SponsorFooter />
          </Grid>
        )}
      </Grid>
    </footer>
  );
}

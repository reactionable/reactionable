import Grid from "@material-ui/core/Grid/Grid";
import createStyles from "@material-ui/core/styles/createStyles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useTranslation } from "@reactionable/core/lib/i18n/I18n";
import {
  IFooterProps as ICoreFooterProps,
  SponsorFooter,
} from "@reactionable/core/lib/ui/layout/footer/Footer";
import React, { DetailedHTMLProps, HTMLAttributes, PropsWithChildren, ReactElement } from "react";

export type IFooterProps = ICoreFooterProps &
  Omit<DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>, "onSelect" | "ref">;

const useStyles = makeStyles(() =>
  createStyles({
    footer: {
      position: "absolute",
      bottom: 0,
      width: "100%",
      height: "60px",
      lineHeight: "60px",
    },
  })
);

export function Footer({
  brand,
  sponsor = true,
  ...footerProps
}: PropsWithChildren<IFooterProps>): ReactElement {
  const { t } = useTranslation();
  const classes = useStyles();

  const currentYear = new Date().getFullYear();

  return (
    <footer className={classes.footer} {...footerProps}>
      <Grid container direction="row" justify="space-between" alignItems="center">
        <Grid item>
          {t("Copyright")} &copy; {currentYear} {brand}
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

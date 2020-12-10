import Grid from "@material-ui/core/Grid/Grid";
import createStyles from "@material-ui/core/styles/createStyles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {
  CopyrightFooter,
  IFooterProps as ICoreFooterProps,
  SponsorFooter,
} from "@reactionable/core/lib/ui/layout/footer/Footer";
import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren, ReactElement } from "react";

import { ResponsiveContainer } from "../responsive-container/ResponsiveContainer";

export type IFooterProps = ICoreFooterProps &
  Omit<DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>, "onSelect" | "ref">;

const useStyles = makeStyles((theme) =>
  createStyles({
    footer: {
      position: "absolute",
      bottom: theme.spacing(2),
    },
  })
);

export function Footer({
  brand,
  sponsor = true,
  ...footerProps
}: PropsWithChildren<IFooterProps>): ReactElement {
  const classes = useStyles();

  return (
    <ResponsiveContainer
      component="footer"
      maxWidth="xl"
      className={classes.footer}
      {...footerProps}
    >
      <Grid container direction="row" justify="center" alignItems="center" spacing={4}>
        <Grid item>
          <CopyrightFooter brand={brand} />
        </Grid>
        {sponsor && (
          <Grid item>
            - <SponsorFooter />
          </Grid>
        )}
      </Grid>
    </ResponsiveContainer>
  );
}

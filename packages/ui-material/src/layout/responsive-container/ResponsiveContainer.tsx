import { Container } from "@material-ui/core";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { ComponentProps, ElementType, ReactElement } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      marginTop: theme.spacing(4),
      [theme.breakpoints.down("xs")]: {
        padding: theme.spacing(3, 0),
      },
    },
  })
);

export type IResponsiveContainerProps = Partial<ComponentProps<typeof Container>> & {
  component?: ElementType;
};

export const ResponsiveContainer = ({
  children,
  ...props
}: IResponsiveContainerProps): ReactElement => {
  const classes = useStyles();

  return (
    <Container maxWidth="xl" className={classes.main} {...props}>
      {children || <></>}
    </Container>
  );
};

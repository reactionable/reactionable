import Container from "@mui/material/Container";
import { deepmerge } from "@mui/utils";
import { ComponentProps, ElementType, ReactElement } from "react";

export type IResponsiveContainerProps = Partial<ComponentProps<typeof Container>> & {
  component?: ElementType;
};

export const ResponsiveContainer = ({
  children,
  ...props
}: IResponsiveContainerProps): ReactElement => {
  return (
    <Container
      maxWidth="xl"
      {...props}
      sx={deepmerge(
        {
          marginTop: (theme) => theme.spacing(4),
        },
        props.sx
      )}
    >
      {children || <></>}
    </Container>
  );
};

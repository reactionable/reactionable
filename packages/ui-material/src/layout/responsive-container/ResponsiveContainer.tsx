import { Container } from "@mui/material";
import { deepmerge } from "@mui/utils";
import { ComponentProps, ElementType, ReactElement } from "react";

export type IResponsiveContainerProps = Partial<ComponentProps<typeof Container>> & {
  component?: ElementType;
};

export const ResponsiveContainer = ({
  children,
  sx,
  ...props
}: IResponsiveContainerProps): ReactElement => {
  return (
    <Container
      maxWidth="xl"
      sx={deepmerge(
        {
          marginTop: (theme) => theme.spacing(4),
        },
        sx
      )}
      {...props}
    >
      {children || <></>}
    </Container>
  );
};

import type { Theme } from "@mui/material";
import Grid from "@mui/material/Grid";
import {
	CopyrightFooter,
	type IFooterProps as ICoreFooterProps,
	SponsorFooter,
} from "@reactionable/core";
import type {
	DetailedHTMLProps,
	HTMLAttributes,
	PropsWithChildren,
	ReactElement,
} from "react";

import { ResponsiveContainer } from "../responsive-container/ResponsiveContainer";

export type IFooterProps = ICoreFooterProps &
	Omit<
		DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
		"onSelect" | "ref"
	>;

export function Footer({
	brand,
	sponsor = true,
	...footerProps
}: PropsWithChildren<IFooterProps>): ReactElement {
	return (
		<ResponsiveContainer
			component="footer"
			maxWidth="xl"
			sx={{
				marginTop: (theme: Theme) => theme.spacing(1),
			}}
			{...footerProps}
		>
			<Grid
				container
				direction="row"
				spacing={4}
				sx={{
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Grid>
					<CopyrightFooter brand={brand} />
				</Grid>
				{sponsor && (
					<Grid>
						<SponsorFooter />
					</Grid>
				)}
			</Grid>
		</ResponsiveContainer>
	);
}

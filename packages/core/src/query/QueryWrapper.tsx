import { type ReactElement, type ReactNode, useEffect, useState } from "react";

import type { IError } from "../error/IError";
import type { IUseErrorAlertResult } from "../ui/alert/ErrorAlert";
import type { IUseWarningAlertResult } from "../ui/alert/WarningAlert";
import type { IUseLoaderResult } from "../ui/loader/useLoader";
import { useUIContext } from "../ui/UI";
import type { IData } from "./Query";

function isNotEmptyData<Data extends IData = IData>(
	data: unknown,
): data is Data {
	if (Array.isArray(data)) {
		return data.length > 0;
	}

	if (data && typeof data === "object") {
		return Object.keys(data).length > 0;
	}

	return data !== null && data !== undefined;
}

export type IQueryWrapperChildrenProps<Data extends IData = IData> = Omit<
	IQueryWrapperProps<Data>,
	"children" | "data"
> &
	Required<Pick<IQueryWrapperProps<Data>, "data">> & {
		setLoading: IUseLoaderResult["setLoading"];
		setErrorAlert: IUseErrorAlertResult["setErrorAlert"];
		setWarningAlert: IUseWarningAlertResult["setWarningAlert"];
	};

export type IQueryWrapperProps<Data extends IData = IData> = {
	loading: boolean;
	data?: Data;
	error?: IError;
	noData?: ReactNode;
	children: (props: IQueryWrapperChildrenProps<Data>) => ReactNode;
};

export function QueryWrapper<Data extends IData = IData>({
	children,
	data,
	...props
}: IQueryWrapperProps<Data>): ReactElement {
	const { loading, error, noData } = props;
	const { useLoader, useErrorAlert, useWarningAlert } = useUIContext();
	const { loader, setLoading } = useLoader({ loading });
	const { warningAlert, setWarningAlert } = useWarningAlert();
	const { errorAlert, setErrorAlert } = useErrorAlert();
	const [childrenData, setChildrenData] = useState<ReactNode>();

	useEffect(() => {
		setLoading(loading);
		setErrorAlert(!loading && error ? error : undefined);

		let displayChildren: ReactNode;
		const hasData = isNotEmptyData<Data>(data);
		if (data && hasData && !loading && !error) {
			displayChildren = children({
				data,
				setLoading,
				setErrorAlert,
				setWarningAlert,
				...props,
			});
		}
		setChildrenData(displayChildren);

		setWarningAlert(
			error || loading || !noData || hasData ? undefined : noData,
		);
	}, [loading, error, data]);

	return (
		<>
			{loader}
			{errorAlert}
			{warningAlert}
			{childrenData}
		</>
	);
}

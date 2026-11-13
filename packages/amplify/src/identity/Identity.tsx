import { Authenticator, type AuthenticatorProps } from "@aws-amplify/ui-react";
import {
	IdentityContextProvider as CoreIdentityContextProvider,
	useIdentityContext as coreUseIdentityContext,
	useIdentityProviderProps as coreUseIdentityProviderProps,
	type IIdentityProviderProps as ICoreIdentityProviderProps,
	type IIdentityProviderValue as ICoreIdentityProviderValue,
	type IUser as ICoreUser,
	useQuery,
} from "@reactionable/core";
import {
	type AuthUser,
	getCurrentUser,
	signIn,
	signOut,
} from "aws-amplify/auth";
import {
	type ComponentType,
	type PropsWithChildren,
	type ReactElement,
	useEffect,
} from "react";

export type IUser = ICoreUser & {
	id: string;
	username: string;
};

const dataToUser = (data?: AuthUser): IUser | null => {
	if (!data) {
		return null;
	}
	return {
		id: data.userId,
		username: data.username,
	};
};

function AuthenticatedUser({ user }: { user?: AuthUser }) {
	const { setUser } = useIdentityContext();
	useEffect(() => {
		if (user) setUser(dataToUser(user));
	}, [user, setUser]);
	return null;
}

function AuthComponent(props: AuthenticatorProps) {
	return (
		<Authenticator {...props}>
			{({ user }) => <AuthenticatedUser user={user} />}
		</Authenticator>
	);
}

async function fetchCurrentUser(): Promise<IUser | null> {
	try {
		return dataToUser(await getCurrentUser());
	} catch (error) {
		if (error instanceof Error && error.name === "UserUnAuthenticatedException")
			return null;
		throw error;
	}
}

export type IIdentityProviderProps = ICoreIdentityProviderProps<IUser> &
	Omit<AuthenticatorProps, "children">;
export type IIdentityProviderValue = ICoreIdentityProviderValue<IUser> &
	AuthenticatorProps;

export const useIdentityProviderProps = (
	props: Partial<IIdentityProviderProps> = {},
): IIdentityProviderProps => {
	return {
		...coreUseIdentityProviderProps<IUser>(),
		useFetchUser: () =>
			useQuery<IUser | null, { user?: IUser | null }>({
				variables: { user: props.user },
				handleQuery: async ({ variables }) =>
					variables?.user !== undefined ? variables.user : fetchCurrentUser(),
			}),
		displayName: (user) => user.username,
		identityProvider: "Amplify",
		logout: async () => await signOut(),
		login: async (values) => {
			const result = await signIn(values);

			if (result.isSignedIn) {
				const user = dataToUser(await getCurrentUser());
				if (user) {
					return user;
				}
			}

			throw new Error("No user retrieved from signIn");
		},
		AuthComponent,
		...props,
	};
};

export function useIdentityContext(): IIdentityProviderValue {
	return coreUseIdentityContext();
}

export function withIdentityContext(
	Component: ComponentType,
	identityProviderProps?: Partial<IIdentityProviderProps>,
): ReactElement {
	return (
		<IdentityContextProvider
			{...useIdentityProviderProps(identityProviderProps)}
		>
			<Component />
		</IdentityContextProvider>
	);
}

export const IdentityContextProvider = (
	props?: PropsWithChildren<Partial<IIdentityProviderProps>>,
): ReactElement => {
	return (
		<CoreIdentityContextProvider<IUser> {...useIdentityProviderProps(props)} />
	);
};

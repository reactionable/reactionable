import './config';

import { useIdentityContext } from '@reactionable/core';
import React from 'react';

import { IdentityContextProvider, SignUp } from '../src/identity/Identity';

export default {
  title: 'Amplify/Identity',
  parameters: { info: { inline: true } },
  component: IdentityContextProvider,
};

export const UseIdentityContext = () => {
  const Authentication = () => {
    const { component, user } = useIdentityContext();
    return (
      <>
        <p>User signed-in: {user ? user.displayName() : 'No user'}</p>
        {component}
      </>
    );
  };

  return (
    <IdentityContextProvider>
      <Authentication />
    </IdentityContextProvider>
  );
};

export const HideSignUpForm = () => {
  const Authentication = () => {
    const { component } = useIdentityContext();
    return component;
  };

  return (
    <IdentityContextProvider hide={[SignUp]}>
      <Authentication />
    </IdentityContextProvider>
  );
};

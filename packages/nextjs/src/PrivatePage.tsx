import { useIdentityContext, useTranslation } from '@reactionable/core';
import { useUIContext } from '@reactionable/core/lib/ui/UI';
import Router from 'next/router';
import React, { PropsWithChildren, useEffect } from 'react';

export type IPrivatePageProps = {
  redirectTo?: string;
};
export function PrivatePage({ children, redirectTo = '/' }: PropsWithChildren<IPrivatePageProps>) {
  const { user } = useIdentityContext();
  const { t } = useTranslation();
  const { errorAlert } = useUIContext().useErrorAlert({
    children: t('You are not allowed to reach this page'),
  });

  useEffect(() => {
    if (!user) {
      Router.push(redirectTo);
    }
  }, [redirectTo, user]);

  return <>{user ? children : errorAlert}</>;
}

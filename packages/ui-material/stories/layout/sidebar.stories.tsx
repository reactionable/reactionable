import Button from '@material-ui/core/Button/Button';
import Paper from '@material-ui/core/Paper/Paper';
import SaveIcon from '@material-ui/icons/Save';
import { generatePath, useRouteMatch } from '@reactionable/core';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Sidebar, setSidebarNavItems } from '../../src/layout/sidebar/Sidebar';
import { UIContextProvider } from '../../src/UI';

export default {
  title: 'UI Material/Layout/Sidebar',
  parameters: { info: { inline: true }, component: Sidebar },
};

const SampleComponent: FC = () => {
  const { t } = useTranslation();
  const match = useRouteMatch();

  setSidebarNavItems([
    {
      href: generatePath(`${match.path}/sample`, match.params),
      title: t('Go to sample page'),
      icon: SaveIcon,
      children: t('Sample'),
    },
  ]);

  return (
    <Paper elevation={3}>
      <h1>Hello, world!</h1>
      <p>
        This is a simple hero unit, a simple jumbotron-style component for calling extra attention
        to featured content or information.
      </p>
      <p>
        <Button color="primary">Learn more</Button>
      </p>
    </Paper>
  );
};

export const SimpleSidebar = () => (
  <UIContextProvider>
    <Sidebar>
      <SampleComponent />
    </Sidebar>
  </UIContextProvider>
);

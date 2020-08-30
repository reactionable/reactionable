import React from 'react';

import { Notification } from '../../src/ui/notification/Notification';

export default {
  title: 'Core/UI/Notification',
  parameters: { info: { inline: true }, component: Notification },
};

export const notification = () => (
  <Notification title="Simple notification" children={<>Simple notification content</>} />
);

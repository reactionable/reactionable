import React from 'react';
import { Alert } from '../../src/ui/alert/Alert';

export default { title: 'Core/UI/Alert', parameters: { info: { inline: true }, component: Alert } };

export const SimpleAlert = () => <Alert children={<>test alert</>} />;

import '@testing-library/jest-dom/extend-expect';

import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import useTheme from '@material-ui/core/styles/useTheme';
import { i18nTestInstance } from '@reactionable/core/src/tests/I18n';
import { useUIContext } from '@reactionable/core/src/ui/UI';
import { render } from '@testing-library/react';
import React from 'react';

import { UIContextProvider, useUIProviderProps } from './UI';

describe('UI', () => {
  beforeAll(i18nTestInstance);
  describe('UIContextProvider', () => {
    it('should render without crashing', async () => {
      render(<UIContextProvider {...useUIProviderProps()}>test</UIContextProvider>);
    });

    it('should initialize a theme with given options', async () => {
      const primaryColor = '#FF0000';

      const TestComponent = () => {
        const theme = useTheme();
        return <div data-testid="test-color">{theme.palette.primary.main}</div>;
      };
      const { getByTestId } = render(
        <UIContextProvider
          {...useUIProviderProps()}
          theme={{ palette: { primary: { main: primaryColor } } }}
        >
          <TestComponent />
        </UIContextProvider>
      );

      const testColor = getByTestId('test-color');
      expect(testColor).toBeDefined();
      expect(testColor).toHaveTextContent(primaryColor);
    });

    it('should initialize a theme with a given theme', async () => {
      const primaryColor = '#FF0000';
      const theme = createMuiTheme({ palette: { primary: { main: primaryColor } } });

      const TestComponent = () => {
        const theme = useTheme();
        return <div data-testid="test-color">{theme.palette.primary.main}</div>;
      };
      const { getByTestId } = render(
        <UIContextProvider {...useUIProviderProps()} theme={theme}>
          <TestComponent />
        </UIContextProvider>
      );

      const testColor = getByTestId('test-color');
      expect(testColor).toBeDefined();
      expect(testColor).toHaveTextContent(primaryColor);
    });

    it('should use UI hook', async () => {
      const TestComponent = () => {
        const { useLoader } = useUIContext();
        const { loader } = useLoader({ isLoading: true });
        return <>{loader}</>;
      };
      render(
        <UIContextProvider {...useUIProviderProps()}>
          <TestComponent />
        </UIContextProvider>
      );
    });
  });
});
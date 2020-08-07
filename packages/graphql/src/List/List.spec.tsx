import React from 'react';
import { gql } from '@apollo/react-hooks';
import { renderHook } from '@testing-library/react-hooks';
import { MockedProvider } from '@apollo/client/testing';
import { useListCallback } from './List';

describe('List', () => {
  describe('useListCallback', () => {
    const testsData = [
      { id: 'test-id-1', name: 'Buck' },
      { id: 'test-id-2', name: 'Sam' },
    ];
    const getTestsQuery = `query GetTests { tests { id, name } }`;
    const mocks = [
      {
        request: {
          query: gql`
            ${getTestsQuery}
          `,
        },
        result: {
          data: {
            tests: testsData,
          },
        },
      },
    ];

    const wrapper = ({ children }: any) => (
      <MockedProvider mocks={mocks}>{children}</MockedProvider>
    );

    it('should get fetched data', async () => {
      const { result, waitForNextUpdate } = renderHook(() => useListCallback(getTestsQuery), {
        wrapper,
      });

      expect(result.current.data).toEqual([]);

      await waitForNextUpdate();

      expect(result.current.data).toEqual(testsData);
    });

    it('should update loading state to true when data is fetched', async () => {
      const { result, waitForNextUpdate } = renderHook(() => useListCallback(getTestsQuery), {
        wrapper,
      });

      expect(result.current.isLoading).toBe(true);

      await waitForNextUpdate();

      expect(result.current.isLoading).toBe(false);
    });
  });
});

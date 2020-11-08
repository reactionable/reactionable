import { gql } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import { renderHook } from '@testing-library/react-hooks';
import React from 'react';

import { useReadQuery } from './Read';

describe('Read', () => {
  describe('useReadQuery', () => {
    const testId = 'test-id';
    const testData = { id: testId, name: 'Buck' };
    const getTestQuery = `query GetTest($id: String) { test(id: $id){ id, name } }`;
    const mocks = [
      {
        request: {
          query: gql`
            ${getTestQuery}
          `,
          variables: {
            id: testId,
          },
        },
        result: {
          data: {
            test: testData,
          },
        },
      },
    ];

    const wrapper = ({ children }: any) => (
      <MockedProvider mocks={mocks}>{children}</MockedProvider>
    );

    it('should get fetched data', async () => {
      const { result, waitForNextUpdate } = renderHook(
        () => useReadQuery(getTestQuery, { variables: { id: testId } }),
        { wrapper }
      );

      expect(result.current.data).toBeUndefined();

      await waitForNextUpdate();

      expect(result.current.data).toEqual(testData);
    });

    it('should update loading state to true when data is fetched', async () => {
      const { result, waitForNextUpdate } = renderHook(
        () => useReadQuery(getTestQuery, { variables: { id: testId } }),
        { wrapper }
      );

      expect(result.current.isLoading).toBe(true);

      await waitForNextUpdate();

      expect(result.current.isLoading).toBe(false);
    });
  });
});

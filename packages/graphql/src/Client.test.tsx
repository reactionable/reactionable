import { MockedProvider } from "@apollo/client/testing";
import { render } from "@testing-library/react";

import { GraphqlProvider } from "./Client";

describe("Client", () => {
  describe("GraphqlProvider", () => {
    it("should render without crashing", () => {
      const result = render(
        <MockedProvider mocks={[]} addTypename={false}>
          <GraphqlProvider uri="http://test.com/" initialState={{}} />
        </MockedProvider>
      );
      expect(result).toBeTruthy();
    });
  });
});
